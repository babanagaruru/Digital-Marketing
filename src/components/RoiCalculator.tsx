import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, Sparkles, Zap, ArrowRight } from 'lucide-react';

interface RoiCalculatorProps {
  onPlanSelected: (details: string) => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onPlanSelected }) => {
  const [adSpend, setAdSpend] = useState<number>(3500);
  const [aov, setAov] = useState<number>(65);
  const [currentConvRate, setCurrentConvRate] = useState<number>(1.8);

  // Growth formulas
  const projectedRoas = 3.9;
  const estimatedPaidRevenue = Math.round(adSpend * projectedRoas);
  const estimatedOrders = Math.round(estimatedPaidRevenue / aov);
  
  // Speed boost effect: Google studies show 0.1s faster mobile site improves e-comm conversion by ~8-10%, sub-second boosts lift conversions ~25%
  const speedBoostLift = 1.25; 
  const boostedRevenue = Math.round(estimatedPaidRevenue * speedBoostLift);
  const incrementalFromSpeed = boostedRevenue - estimatedPaidRevenue;

  const handleApplyEstimate = () => {
    const message = `Calculated Growth Estimate: $${adSpend.toLocaleString()}/mo Ad Spend @ $${aov} AOV. Aiming for ~$${boostedRevenue.toLocaleString()}/mo blended revenue with speed optimization.`;
    onPlanSelected(message);
  };

  return (
    <section id="calculator" className="py-20 bg-slate-950 relative border-b border-slate-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/50 text-xs font-semibold text-emerald-300 mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>ROI Forecasting Model</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3 font-['Space_Grotesk']">
            Estimate Your Revenue Lift & Ad ROAS
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            See how combining Meta Ads (Facebook & Instagram) with website speed boosting multiplies your sales pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Ad Spend Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-indigo-400" />
                  Monthly Meta Ad Budget:
                </label>
                <span className="text-base font-bold text-white font-mono bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
                  ${adSpend.toLocaleString()} / mo
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="25000"
                step="500"
                value={adSpend}
                onChange={(e) => setAdSpend(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                <span>$1,000/mo (Starter)</span>
                <span>$10,000/mo</span>
                <span>$25,000+/mo (Scale)</span>
              </div>
            </div>

            {/* AOV Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-200">
                  Average Order Value (AOV):
                </label>
                <span className="text-base font-bold text-white font-mono bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
                  ${aov}
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="250"
                step="5"
                value={aov}
                onChange={(e) => setAov(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                <span>$20</span>
                <span>$125</span>
                <span>$250</span>
              </div>
            </div>

            {/* Conversion Rate */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-200">
                  Current Website Conversion Rate:
                </label>
                <span className="text-base font-bold text-white font-mono bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
                  {currentConvRate}%
                </span>
              </div>
              <input
                type="range"
                min="0.8"
                max="4.0"
                step="0.1"
                value={currentConvRate}
                onChange={(e) => setCurrentConvRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                <span>0.8% (Sluggish)</span>
                <span>2.0% (Average)</span>
                <span>4.0% (Top Tier)</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400">
              <strong className="text-slate-200">Formula Note:</strong> Projections assume disciplined Advantage+ Catalog campaigns, 3-second UGC video hook testing, and Core Web Vitals speed optimization to under 1.0s.
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5 bg-gradient-to-b from-indigo-950/70 via-slate-900 to-slate-950 border border-indigo-500/40 rounded-2xl p-6 sm:p-7 shadow-2xl relative">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Projected Growth Potential</span>
            </div>

            <div className="mb-5">
              <div className="text-xs text-slate-400 font-medium">Estimated Monthly Sales Generated</div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk'] tracking-tight">
                ${boostedRevenue.toLocaleString()}
              </div>
              <div className="text-xs text-emerald-400 font-semibold mt-0.5">
                Target Return on Ad Spend: {projectedRoas}x ROAS
              </div>
            </div>

            <div className="space-y-3 py-4 border-t border-slate-800/80 text-xs sm:text-sm">
              <div className="flex justify-between items-center text-slate-300">
                <span>Estimated Customer Orders:</span>
                <span className="font-bold text-white font-mono">{estimatedOrders} orders</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Ad Revenue Baseline:</span>
                <span className="font-bold text-slate-200 font-mono">${estimatedPaidRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-emerald-300 bg-emerald-950/40 p-2 rounded-lg border border-emerald-800/40">
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Speed & CRO Lift (+25%):
                </span>
                <span className="font-bold font-mono">+${incrementalFromSpeed.toLocaleString()}/mo</span>
              </div>
            </div>

            <button
              onClick={handleApplyEstimate}
              className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
            >
              <span>Apply This Goal to Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
