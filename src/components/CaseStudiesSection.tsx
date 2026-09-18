import React, { useState } from 'react';
import { TrendingUp, ArrowUpRight, CheckCircle2, Star, Quote } from 'lucide-react';
import { CASE_STUDIES, TESTIMONIALS } from '../data';

export const CaseStudiesSection: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(CASE_STUDIES[0].id);

  const activeCase = CASE_STUDIES.find(c => c.id === selectedCaseId) || CASE_STUDIES[0];

  return (
    <section id="case-studies" className="py-20 bg-slate-900/30 relative border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-950/80 border border-pink-700/50 text-xs font-semibold text-pink-300 mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Proven Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 font-['Space_Grotesk']">
            Real Case Studies: From Ad Spend to Bankable Revenue
          </h2>
          <p className="text-base text-slate-300">
            Measurable results across Facebook/Instagram advertising, organic Google search positions, and lightning-fast site optimization.
          </p>
        </div>

        {/* Case Studies Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {CASE_STUDIES.map((cs) => {
            const isSelected = cs.id === selectedCaseId;
            return (
              <button
                key={cs.id}
                onClick={() => setSelectedCaseId(cs.id)}
                className={`text-left p-5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border-indigo-500 shadow-xl shadow-indigo-950/50 scale-[1.02]'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>{cs.niche}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded bg-gradient-to-r ${cs.tagColor} text-white`}>
                    {cs.keyMetric}
                  </span>
                </div>
                <div className="text-lg font-bold text-white font-['Space_Grotesk'] mb-1">
                  {cs.client}
                </div>
                <div className="text-xs text-indigo-400 font-medium">
                  {cs.primaryService}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Case Study Deep Dive Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 mb-16 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950 text-indigo-300 border border-indigo-800/60 mb-2">
                  {activeCase.niche} • {activeCase.primaryService}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Space_Grotesk']">
                  {activeCase.client}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
                  {activeCase.summary}
                </p>
              </div>

              {/* Challenge & Strategy */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-1">
                  The Problem / Bottleneck:
                </div>
                <p className="text-xs sm:text-sm text-slate-300">
                  {activeCase.challenge}
                </p>
              </div>

              <div>
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-3">
                  Strategic Execution Deployed:
                </div>
                <div className="space-y-2.5">
                  {activeCase.strategy.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Verified Results Column */}
            <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-800">
                Verified Outcome Metrics
              </div>

              <div className="space-y-3">
                {activeCase.results.map((res, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400">{res.label}</div>
                      <div className="text-xl font-extrabold text-white font-mono mt-0.5">
                        {res.value}
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2.5 py-1 rounded-lg">
                      {res.change}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-[11px] text-slate-500 text-center">
                Metrics tracked via Meta Ads Manager, GA4, Google Search Console, and Google PageSpeed Insights.
              </div>
            </div>
          </div>
        </div>

        {/* Client Testimonials */}
        <div className="pt-6">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
              What Founders & Heads of Growth Say
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 italic mb-4 leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-full object-cover border border-slate-700"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">{t.name}</div>
                      <div className="text-[11px] text-slate-400">{t.role}</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800/50">
                    {t.stat}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
