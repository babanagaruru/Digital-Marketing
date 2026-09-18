import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { AuditTool } from './components/AuditTool';
import { RoiCalculator } from './components/RoiCalculator';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { ContactLeadForm } from './components/ContactLeadForm';
import { LeadInboxModal } from './components/LeadInboxModal';
import { InterviewGuideModal } from './components/InterviewGuideModal';
import { Footer } from './components/Footer';
import { Lead, ServiceType } from './types';
import { INITIAL_LEADS } from './data';

export default function App() {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [backendConnected, setBackendConnected] = useState<boolean>(true);
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [isInterviewGuideOpen, setIsInterviewGuideOpen] = useState(false);
  const [preFilledData, setPreFilledData] = useState<{
    websiteUrl?: string;
    message?: string;
    service?: ServiceType;
  } | null>(null);

  // Fetch persisted leads from SQLite backend on component mount
  const fetchLeadsFromBackend = async () => {
    try {
      const res = await fetch('/api/leads');
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json();
        if (data.leads && Array.isArray(data.leads) && data.leads.length > 0) {
          setLeads(data.leads);
        }
        setBackendConnected(true);
      } else {
        // Running on static hosting like GitHub Pages without an active Express container
        setBackendConnected(false);
        try {
          const saved = localStorage.getItem('apexdigital_leads');
          if (saved) setLeads(JSON.parse(saved));
        } catch (e) {}
      }
    } catch (err) {
      // Offline or static hosting environment
      setBackendConnected(false);
      try {
        const saved = localStorage.getItem('apexdigital_leads');
        if (saved) setLeads(JSON.parse(saved));
      } catch (e) {
        // Ignore localStorage read errors
      }
    }
  };

  useEffect(() => {
    fetchLeadsFromBackend();
  }, []);

  // Sync to localStorage as client fallback cache
  useEffect(() => {
    try {
      localStorage.setItem('apexdigital_leads', JSON.stringify(leads));
    } catch (e) {
      // Ignore cache write error
    }
  }, [leads]);

  const handleAddLead = (newLead: Lead) => {
    setLeads(prev => [newLead, ...prev.filter(l => l.id !== newLead.id)]);
  };

  const handleUpdateLeadStatus = async (id: string, newStatus: 'New' | 'Qualified' | 'Proposal Sent') => {
    // Optimistic UI update
    setLeads(prev =>
      prev.map(item => (item.id === id ? { ...item, status: newStatus } : item))
    );

    // Persist status change to SQLite database
    try {
      await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (err) {
      console.warn('Could not sync status change to backend:', err);
    }
  };

  const handleDeleteLead = async (id: string) => {
    // Optimistic UI removal
    setLeads(prev => prev.filter(item => item.id !== id));

    // Delete in SQLite database
    try {
      await fetch(`/api/leads/${id}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.warn('Could not delete lead on backend:', err);
    }
  };

  const handleResetDatabase = async () => {
    try {
      const res = await fetch('/api/database/reset', { method: 'POST' });
      if (res.ok) {
        await fetchLeadsFromBackend();
      }
    } catch (err) {
      console.warn('Could not reset database:', err);
      setLeads(INITIAL_LEADS);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectServiceForContact = (serviceKey: ServiceType) => {
    setPreFilledData({
      service: serviceKey,
      message: `I'm interested in getting started with ${
        serviceKey === 'fb_insta_ads'
          ? 'Facebook & Instagram Ads'
          : serviceKey === 'seo_growth'
          ? 'SEO & Organic Growth'
          : serviceKey === 'speed_cro'
          ? 'Website Speed Boosting & CRO'
          : 'an All-in-One Growth Plan'
      }.`
    });
    scrollToSection('contact');
  };

  const handlePreFillLeadForm = (websiteUrl: string, issuesSummary: string) => {
    setPreFilledData({
      websiteUrl,
      message: issuesSummary,
      service: 'all_in_one'
    });
    scrollToSection('contact');
  };

  const handlePlanSelected = (roiMessage: string) => {
    setPreFilledData(prev => ({
      ...prev,
      message: roiMessage
    }));
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans']">
      {/* Top Navbar with Real-time DB indicator */}
      <Navbar
        leadCount={leads.length}
        backendConnected={backendConnected}
        onOpenInbox={() => setIsInboxOpen(true)}
        onOpenInterviewGuide={() => setIsInterviewGuideOpen(true)}
        onScrollToContact={() => scrollToSection('contact')}
        onScrollToAudit={() => scrollToSection('audit-tool')}
      />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* Hero with Value Proposition & Live Numbers */}
        <Hero
          onScrollToContact={() => scrollToSection('contact')}
          onScrollToAudit={() => scrollToSection('audit-tool')}
          onOpenInterviewGuide={() => setIsInterviewGuideOpen(true)}
        />

        {/* 3 Core Services: Meta Ads, SEO, Speed Boosting */}
        <ServicesSection
          onSelectServiceForContact={handleSelectServiceForContact}
        />

        {/* Interactive Site Speed, SEO & Pixel Audit Scanner */}
        <AuditTool
          onPreFillLeadForm={handlePreFillLeadForm}
        />

        {/* Interactive ROI & ROAS Forecasting Calculator */}
        <RoiCalculator
          onPlanSelected={handlePlanSelected}
        />

        {/* Real Case Studies & Verified Results */}
        <CaseStudiesSection />

        {/* High-Intent Lead Generation Contact Form */}
        <ContactLeadForm
          onLeadSubmitted={handleAddLead}
          preFilledData={preFilledData}
        />
      </main>

      {/* Footer with Links & Interview CTA */}
      <Footer
        onOpenInterviewGuide={() => setIsInterviewGuideOpen(true)}
        onOpenInbox={() => setIsInboxOpen(true)}
        onScrollToContact={() => scrollToSection('contact')}
      />

      {/* Interactive In-App Modals */}
      <LeadInboxModal
        isOpen={isInboxOpen}
        onClose={() => setIsInboxOpen(false)}
        leads={leads}
        backendConnected={backendConnected}
        onUpdateLeadStatus={handleUpdateLeadStatus}
        onDeleteLead={handleDeleteLead}
        onResetDatabase={handleResetDatabase}
      />

      <InterviewGuideModal
        isOpen={isInterviewGuideOpen}
        onClose={() => setIsInterviewGuideOpen(false)}
      />
    </div>
  );
}
