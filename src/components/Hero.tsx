import React from 'react';
import { ArrowRight, CheckCircle2, TrendingUp, Search, Zap, ShieldCheck, Play, Award } from 'lucide-react';

interface HeroProps {
  onScrollToContact: () => void;
  onScrollToAudit: () => void;
  onOpenInterviewGuide: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToContact,
  onScrollToAudit,
  onOpenInterviewGuide
}) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-800/60 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950">
      {/* Glow ambient background circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-pink-500/10 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-amber-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-semibold text-slate-200 mb-6 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-indigo-400"></span>
            <span>Meta Certified Paid Media & Organic Search Strategist</span>
            <span className="text-slate-500">•</span>
            <span className="text-indigo-400">CRO & Speed Specialist</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6">
            Scale Product Sales with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
              High-ROAS Meta Ads
            </span>
            , Rank on Page 1 & Boost Site Speed.
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto font-normal">
            I help e-commerce stores and high-growth brands acquire customers profitably on{' '}
            <strong className="text-white font-semibold">Facebook & Instagram</strong>, capture organic intent via{' '}
            <strong className="text-white font-semibold">Technical SEO</strong>, and slash bounce rates with{' '}
            <strong className="text-white font-semibold">sub-second website boosting</strong>.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              id="hero-contact-cta"
              onClick={onScrollToContact}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-base shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/40 transition-all transform active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>Get Free Growth Audit & Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-audit-cta"
              onClick={onScrollToAudit}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-white font-semibold text-base transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Run Live Speed & SEO Scan</span>
            </button>
          </div>

          {/* Fast trust metrics checklist */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Meta Advantage+ & CAPI Verified</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>White-Hat Google Page-1 Ranking</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Core Web Vitals 90+ Guarantee</span>
            </div>
          </div>
        </div>

        {/* Live Metrics Showcase Banner */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm hover:border-indigo-500/50 transition-colors">
            <div className="flex items-center justify-between text-indigo-400 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="text-xs font-mono font-semibold bg-indigo-950/80 px-2 py-0.5 rounded text-indigo-300">
                PROVEN
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk']">
              4.2x Avg
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">
              Meta Ads ROAS for E-Commerce
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm hover:border-emerald-500/50 transition-colors">
            <div className="flex items-center justify-between text-emerald-400 mb-2">
              <Search className="w-5 h-5" />
              <span className="text-xs font-mono font-semibold bg-emerald-950/80 px-2 py-0.5 rounded text-emerald-300">
                ORGANIC
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk']">
              +240%
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">
              Avg 6-Month Organic Traffic Lift
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm hover:border-amber-500/50 transition-colors">
            <div className="flex items-center justify-between text-amber-400 mb-2">
              <Zap className="w-5 h-5" />
              <span className="text-xs font-mono font-semibold bg-amber-950/80 px-2 py-0.5 rounded text-amber-300">
                PERFORMANCE
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk']">
              &lt; 0.9s
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">
              Largest Contentful Paint (LCP)
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm hover:border-purple-500/50 transition-colors">
            <div className="flex items-center justify-between text-purple-400 mb-2">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs font-mono font-semibold bg-purple-950/80 px-2 py-0.5 rounded text-purple-300">
                CLIENTS
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk']">
              $3.8M+
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">
              Attributed Direct Product Revenue
            </div>
          </div>
        </div>

        {/* Quick Interview Highlight Banner */}
        <div className="mt-8 max-w-3xl mx-auto p-3.5 rounded-xl bg-purple-950/30 border border-purple-800/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 text-purple-200">
            <Award className="w-4 h-4 text-purple-400 shrink-0" />
            <span>
              <strong>Presenting this in an interview?</strong> Click the guide to see talking points, STAR framework, and technical FAQs.
            </span>
          </div>
          <button
            onClick={onOpenInterviewGuide}
            className="shrink-0 px-3 py-1.5 rounded-lg bg-purple-900/80 hover:bg-purple-800 text-purple-200 font-medium text-xs border border-purple-600/40 transition-colors cursor-pointer"
          >
            Open Interview Cheatsheet
          </button>
        </div>
      </div>
    </section>
  );
};
