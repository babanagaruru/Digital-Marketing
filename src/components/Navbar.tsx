import React, { useState } from 'react';
import { Sparkles, Inbox, Briefcase, Menu, X, ArrowRight, Zap, Target } from 'lucide-react';

interface NavbarProps {
  leadCount: number;
  backendConnected?: boolean;
  onOpenInbox: () => void;
  onOpenInterviewGuide: () => void;
  onScrollToContact: () => void;
  onScrollToAudit: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  leadCount,
  backendConnected = true,
  onOpenInbox,
  onOpenInterviewGuide,
  onScrollToContact,
  onScrollToAudit
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Status */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold tracking-tight text-white font-['Space_Grotesk']">
                    Apex<span className="text-indigo-400">Digital</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-950/80 text-indigo-300 border border-indigo-700/50">
                    Growth Studio
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Available for Projects & Full-Time</span>
                </div>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a href="#services" className="hover:text-white transition-colors">
              Services
            </a>
            <a href="#case-studies" className="hover:text-white transition-colors">
              Results & Case Studies
            </a>
            <button 
              onClick={onScrollToAudit} 
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer text-slate-300"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Free Site Audit
            </button>
            <a href="#calculator" className="hover:text-white transition-colors">
              ROI Calculator
            </a>
          </nav>

          {/* Action CTAs & Interview Cheatsheet */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Database & Backend Status Pill */}
            <button
              id="db-status-pill"
              onClick={onOpenInbox}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                backendConnected
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/50'
                  : 'bg-amber-950/60 border-amber-500/40 text-amber-300'
              }`}
              title="Click to open SQLite Database Inspector"
            >
              <span className={`w-2 h-2 rounded-full ${backendConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
              <span>{backendConnected ? 'SQLite DB Live' : 'Local Fallback'}</span>
            </button>

            {/* Interview Guide Button */}
            <button
              id="interview-guide-btn"
              onClick={onOpenInterviewGuide}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-950/70 border border-purple-500/40 text-purple-200 hover:bg-purple-900/60 hover:border-purple-400 transition-all shadow-sm cursor-pointer"
              title="Click to view talking points and STAR interview script"
            >
              <Briefcase className="w-3.5 h-3.5 text-purple-400" />
              <span>Interview Guide</span>
              <span className="bg-purple-500/30 text-purple-200 text-[10px] px-1.5 py-0.2 rounded font-mono">Backend</span>
            </button>

            {/* Lead Inbox Drawer Trigger */}
            <button
              id="lead-inbox-btn"
              onClick={onOpenInbox}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:border-slate-600 transition-colors relative cursor-pointer"
              title="View captured leads dashboard"
            >
              <Inbox className="w-3.5 h-3.5 text-slate-400" />
              <span>Leads</span>
              {leadCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-indigo-600 text-white">
                  {leadCount}
                </span>
              )}
            </button>

            {/* Main Contact CTA */}
            <button
              id="nav-consultation-btn"
              onClick={onScrollToContact}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-md shadow-indigo-600/30 transition-all transform active:scale-95 cursor-pointer"
            >
              <span>Get Free Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenInterviewGuide}
              className="p-2 text-xs font-medium bg-purple-950/60 border border-purple-700/50 text-purple-300 rounded-lg flex items-center gap-1"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Interview Guide</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800 space-y-3 pb-6">
            <div className="flex flex-col space-y-2 text-base font-medium">
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-900"
              >
                Services (FB/IG Ads, SEO, Speed)
              </a>
              <a
                href="#case-studies"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-900"
              >
                Case Studies & Results
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onScrollToAudit();
                }}
                className="text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-900 flex items-center gap-2"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                Free Website & SEO Audit
              </button>
              <a
                href="#calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-900"
              >
                Ad ROI Calculator
              </a>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInbox();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-sm font-medium"
              >
                <Inbox className="w-4 h-4" />
                <span>View Captured Leads ({leadCount})</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onScrollToContact();
                }}
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm"
              >
                Request Strategy Proposal
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
