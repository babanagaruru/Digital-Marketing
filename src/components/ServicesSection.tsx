import React, { useState } from 'react';
import { Share2, Search, Zap, CheckCircle2, ArrowRight, Layers, Sliders, BarChart3, HelpCircle } from 'lucide-react';
import { SERVICES_LIST } from '../data';

interface ServicesSectionProps {
  onSelectServiceForContact: (serviceKey: 'fb_insta_ads' | 'seo_growth' | 'speed_cro' | 'all_in_one') => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForContact }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredServices = activeTab === 'all' 
    ? SERVICES_LIST 
    : SERVICES_LIST.filter(s => s.id === activeTab);

  return (
    <section id="services" className="py-20 bg-slate-950 relative border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/50 text-xs font-semibold text-indigo-300 mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Full-Stack Growth Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 font-['Space_Grotesk']">
            Three Pillars of High-Performing Digital Marketing
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Most agencies only do one thing well. I unify paid acquisition, organic traffic, and website speed to eliminate revenue leakage at every stage of the funnel.
          </p>

          {/* Quick Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              All Services (3)
            </button>
            <button
              onClick={() => setActiveTab('fb_insta_ads')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'fb_insta_ads'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              📱 Facebook & Instagram Ads
            </button>
            <button
              onClick={() => setActiveTab('seo_growth')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'seo_growth'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              🔍 SEO Ranking & Authority
            </button>
            <button
              onClick={() => setActiveTab('speed_cro')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'speed_cro'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              ⚡ Website Boosting & CRO
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => {
            const isAds = service.id === 'fb_insta_ads';
            const isSEO = service.id === 'seo_growth';
            const isSpeed = service.id === 'speed_cro';

            const borderHover = isAds
              ? 'hover:border-blue-500/60'
              : isSEO
              ? 'hover:border-emerald-500/60'
              : 'hover:border-amber-500/60';

            const badgeBg = isAds
              ? 'bg-blue-950/80 text-blue-300 border-blue-700/50'
              : isSEO
              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/50'
              : 'bg-amber-950/80 text-amber-300 border-amber-700/50';

            const iconBg = isAds
              ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
              : isSEO
              ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white'
              : 'bg-gradient-to-br from-amber-500 to-orange-600 text-white';

            return (
              <div
                key={service.id}
                className={`relative flex flex-col justify-between rounded-2xl bg-slate-900/60 border border-slate-800 p-7 transition-all duration-300 ${borderHover} hover:shadow-xl hover:shadow-slate-950/80`}
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center shadow-lg`}>
                      {isAds && <Share2 className="w-6 h-6" />}
                      {isSEO && <Search className="w-6 h-6" />}
                      {isSpeed && <Zap className="w-6 h-6" />}
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${badgeBg}`}>
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-white mb-1 font-['Space_Grotesk']">
                    {service.title}
                  </h3>
                  <div className="text-xs font-semibold text-slate-400 mb-3">
                    {service.subtitle}
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 mb-6 pt-4 border-t border-slate-800/80">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Key Technical Deliverables:
                    </div>
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer / CTA */}
                <div className="pt-4 border-t border-slate-800/60 mt-4">
                  <div className="text-xs text-slate-400 mb-3">
                    <strong className="text-slate-200">Deliverables:</strong> {service.deliverables}
                  </div>
                  <button
                    onClick={() => onSelectServiceForContact(service.id as any)}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Inquire About {service.badge}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Growth Synergy Box */}
        <div className="mt-14 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900/50 border border-indigo-800/40 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase">
                The 3-In-1 Growth Flywheel
              </span>
              <h4 className="text-xl sm:text-2xl font-bold text-white font-['Space_Grotesk']">
                Why Paid Ads + SEO + Speed Optimization Belong Together
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Running Meta Ads to a slow website increases your bounce rate and burns ad budget. 
                Optimizing website speed doubles the conversion rate of your paid ads, while SEO drives perpetual organic customers that lower your overall blended customer acquisition cost (CAC).
              </p>
            </div>
            <button
              onClick={() => onSelectServiceForContact('all_in_one')}
              className="shrink-0 px-6 py-3 rounded-xl bg-white text-slate-950 font-bold text-sm hover:bg-slate-200 transition-colors shadow-lg cursor-pointer"
            >
              Get All-in-One Growth Plan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
