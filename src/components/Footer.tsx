import React from 'react';
import { Target, ArrowUp, Briefcase, Mail, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenInterviewGuide: () => void;
  onOpenInbox: () => void;
  onScrollToContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenInterviewGuide,
  onOpenInbox,
  onScrollToContact
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                <Target className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white font-['Space_Grotesk']">
                Apex<span className="text-indigo-400">Digital</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Performance marketing studio specializing in paid Meta (Facebook & Instagram) ads, sustainable technical SEO, and Core Web Vitals speed optimization for high-growth brands.
            </p>
            <div className="pt-1 flex items-center gap-2 text-emerald-400 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Available for Hire & Contract Opportunities</span>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 font-['Space_Grotesk']">
              Core Services
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Meta Ads (FB & Instagram)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Advantage+ Catalog & CAPI
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Technical SEO & Keyword Mapping
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Website Boosting & Core Web Vitals
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Conversion Rate Optimization (CRO)
                </a>
              </li>
            </ul>
          </div>

          {/* Interactive Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 font-['Space_Grotesk']">
              Interactive Tools
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#audit-tool" className="hover:text-white transition-colors">
                  Free Site Speed & SEO Scanner
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">
                  Ad ROAS & Revenue Calculator
                </a>
              </li>
              <li>
                <button onClick={onOpenInbox} className="hover:text-white transition-colors cursor-pointer text-left">
                  Lead Generation Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenInterviewGuide}
                  className="text-purple-400 hover:text-purple-300 font-semibold transition-colors cursor-pointer text-left flex items-center gap-1"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Interview Cheatsheet</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Consultation CTA */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-['Space_Grotesk']">
              Ready to Accelerate?
            </h4>
            <p className="text-xs text-slate-400">
              Get an honest review of your ad accounts, landing page speed, and keyword gaps.
            </p>
            <button
              onClick={onScrollToContact}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shadow-md shadow-indigo-600/30 cursor-pointer"
            >
              Get Free Growth Audit
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} ApexDigital Growth Studio. Built as a Personal Portfolio Project.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenInterviewGuide}
              className="text-xs text-purple-300 hover:text-purple-200 transition-colors cursor-pointer"
            >
              Interview Presentation Guide
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
