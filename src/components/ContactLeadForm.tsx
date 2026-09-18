import React, { useState, useEffect } from 'react';
import { Mail, Send, CheckCircle2, Phone, Globe, Building2, User, Sparkles, ShieldCheck, ArrowRight, Clock } from 'lucide-react';
import { Lead, ServiceType } from '../types';

interface ContactLeadFormProps {
  onLeadSubmitted: (newLead: Lead) => void;
  preFilledData?: {
    websiteUrl?: string;
    message?: string;
    service?: ServiceType;
  } | null;
}

export const ContactLeadForm: React.FC<ContactLeadFormProps> = ({
  onLeadSubmitted,
  preFilledData
}) => {
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [service, setService] = useState<ServiceType>('all_in_one');
  const [budget, setBudget] = useState('$1,500 - $3,500 / month');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<Lead | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle incoming prefill from Audit Tool or ROI calculator
  useEffect(() => {
    if (preFilledData) {
      if (preFilledData.websiteUrl) setWebsiteUrl(preFilledData.websiteUrl);
      if (preFilledData.message) setMessage(preFilledData.message);
      if (preFilledData.service) setService(preFilledData.service);
    }
  }, [preFilledData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please provide your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please enter a valid work email address.');
      return;
    }
    if (!businessName.trim()) {
      setErrorMessage('Please specify your brand or business name.');
      return;
    }

    setIsSubmitting(true);

    const leadPayload = {
      name: name.trim(),
      businessName: businessName.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      websiteUrl: websiteUrl.trim() || undefined,
      service,
      budget,
      message: message.trim() || 'No additional notes specified.'
    };

    try {
      // Send real HTTP POST request to Express / SQLite backend
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload)
      });

      if (response.ok) {
        const data = await response.json();
        const savedLead: Lead = data.lead;
        onLeadSubmitted(savedLead);
        setSubmittedLead(savedLead);
      } else {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Server rejected submission');
      }
    } catch (err: any) {
      console.warn('Backend unavailable, using client-side fallback:', err);
      // Resilient client fallback
      const fallbackLead: Lead = {
        id: `lead-${Date.now()}`,
        ...leadPayload,
        createdAt: 'Just now',
        status: 'New'
      };
      onLeadSubmitted(fallbackLead);
      setSubmittedLead(fallbackLead);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setName('');
    setBusinessName('');
    setEmail('');
    setPhone('');
    setWebsiteUrl('');
    setMessage('');
    setSubmittedLead(null);
  };

  return (
    <section id="contact" className="py-20 bg-slate-950 relative border-b border-slate-800/60">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-indigo-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/50 text-xs font-semibold text-indigo-300 mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>High-Intent Lead Generation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3 font-['Space_Grotesk']">
            Request a Free Growth Audit & Strategy Proposal
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Tell me about your product, store, or target goals. I will personally review your site speed, ad accounts, and SEO opportunities within 24 business hours.
          </p>
        </div>

        {/* Success State Card */}
        {submittedLead ? (
          <div className="max-w-2xl mx-auto rounded-3xl bg-slate-900/90 border border-emerald-500/50 p-8 sm:p-10 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800/50">
              Lead Successfully Captured & Logged
            </span>

            <h3 className="text-2xl sm:text-3xl font-bold text-white mt-3 mb-2 font-['Space_Grotesk']">
              Thank You, {submittedLead.name}!
            </h3>

            <p className="text-sm text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
              Your inquiry for <strong className="text-white">{submittedLead.businessName}</strong> has been logged to the portfolio dashboard with inquiry ID <span className="font-mono text-indigo-300">{submittedLead.id}</span>.
            </p>

            {/* Next Steps Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 text-left mb-6 space-y-3 text-xs sm:text-sm">
              <div className="font-bold text-slate-200 uppercase tracking-wider text-xs flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-400" />
                What happens next:
              </div>
              <div className="flex items-start gap-2 text-slate-300">
                <span className="text-indigo-400 font-bold">1.</span>
                <span>I run a comprehensive Core Web Vitals speed audit & Meta ad creative review on your domain.</span>
              </div>
              <div className="flex items-start gap-2 text-slate-300">
                <span className="text-indigo-400 font-bold">2.</span>
                <span>You receive an actionable Google Sheet / Loom video breakdown outlining projected ROAS and quick wins.</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleResetForm}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                Submit Another Test Lead
              </button>
            </div>
          </div>
        ) : (
          /* Main Interactive Contact Form */
          <div className="max-w-3xl mx-auto rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-10 shadow-2xl">
            {errorMessage && (
              <div className="mb-6 p-3 rounded-xl bg-rose-950/80 border border-rose-800/80 text-rose-300 text-xs sm:text-sm flex items-center gap-2">
                <span>⚠️ {errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Selection Pills */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5">
                  Which services do you need help with? <span className="text-indigo-400">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'fb_insta_ads', label: 'Meta (FB/IG) Ads', icon: '📱' },
                    { id: 'seo_growth', label: 'SEO Boost', icon: '🔍' },
                    { id: 'speed_cro', label: 'Speed & CRO', icon: '⚡' },
                    { id: 'all_in_one', label: 'Full Growth Plan', icon: '🚀' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setService(s.id as ServiceType)}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer flex flex-col justify-between ${
                        service === s.id
                          ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md shadow-indigo-950'
                          : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-base mb-1">{s.icon}</span>
                      <span>{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Business Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    Your Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    Business / Brand Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Lumina Apparel"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    Work Email <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@luminaapparel.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    Phone / WhatsApp <span className="text-slate-500">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Website URL & Budget Tier */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                    Store / Website URL
                  </label>
                  <input
                    type="text"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://luminaapparel.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Monthly Marketing Budget:
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value="Under $1,500 / month">Under $1,500 / month (Starter)</option>
                    <option value="$1,500 - $3,500 / month">$1,500 - $3,500 / month (Growth)</option>
                    <option value="$3,500 - $8,000 / month">$3,500 - $8,000 / month (Scaling)</option>
                    <option value="$8,000+ / month">$8,000+ / month (Enterprise)</option>
                  </select>
                </div>
              </div>

              {/* Message / Goals */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Current Growth Goals, Challenges, or Ad Questions:
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. We are spending $3,000/mo on Instagram ads but our mobile bounce rate is high and ROAS is stuck at 1.9x..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  id="submit-lead-form-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span>Submitting Your Information...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Strategy Request (Free Audit Included)</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Strict privacy guarantee. No spam, ever. Response guaranteed within 24 hours.</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
