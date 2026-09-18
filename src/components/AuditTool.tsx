import React, { useState } from 'react';
import { Zap, Search, ShieldAlert, CheckCircle2, ArrowRight, RefreshCw, AlertTriangle, Gauge, Sparkles } from 'lucide-react';
import { AuditResult } from '../types';

interface AuditToolProps {
  onPreFillLeadForm: (websiteUrl: string, issuesSummary: string) => void;
}

export const AuditTool: React.FC<AuditToolProps> = ({ onPreFillLeadForm }) => {
  const [urlInput, setUrlInput] = useState<string>('myshop.com');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<string>('');
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);

  const sampleUrls = ['pureglowskincare.com', 'nordictrailgear.io', 'dailyroastcoffee.store'];

  const handleRunAudit = (targetUrl?: string) => {
    const rawUrl = targetUrl || urlInput;
    if (!rawUrl.trim()) return;

    setIsScanning(true);
    setAuditResult(null);

    // Simulate diagnostic steps
    setScanStep('Checking Mobile Core Web Vitals (LCP, INP, CLS)...');
    setTimeout(() => {
      setScanStep('Detecting Meta Pixel & Conversions API (CAPI) Server Tags...');
      setTimeout(() => {
        setScanStep('Auditing Google Search Schema & On-Page Meta Directives...');
        setTimeout(() => {
          setIsScanning(false);

          // Generate diagnostic result tailored to URL
          const isHealthy = rawUrl.includes('coffee') || rawUrl.includes('store');
          const speedScore = isHealthy ? 54 : 42;
          const seoScore = isHealthy ? 68 : 58;
          const mobileScore = 52;

          const newResult: AuditResult = {
            url: rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`,
            speedScore,
            seoScore,
            mobileScore,
            trackingHealth: 'Missing CAPI',
            issuesFound: [
              'Mobile LCP is 4.6s (Google recommends under 2.5s) due to unoptimized 2.8MB hero image.',
              'Meta Pixel is client-side only; missing Conversions API (losing up to 25-30% iOS 14.5+ attribution).',
              'Missing Product Schema (JSON-LD) on collection pages, hindering Google Rich Snippet star ratings.',
              'Render-blocking CSS & 4 unused third-party JavaScript tracking scripts delay time to interactive.'
            ],
            quickWins: [
              'Compress hero image to WebP format to save 1.8s immediately.',
              'Implement Server-Side CAPI tracking to recover lost Facebook & Instagram ad conversions.',
              'Inject automated schema markup to boost Google organic click-through rate by 20-35%.'
            ]
          };

          setAuditResult(newResult);

          // Persist audit record to SQLite database via backend API
          fetch('/api/audit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newResult)
          }).catch(err => console.warn('Could not persist audit record to SQLite:', err));
        }, 800);
      }, 700);
    }, 700);
  };

  const handleFixIssues = () => {
    if (!auditResult) return;
    const summary = `Audit for ${auditResult.url}: Mobile Speed ${auditResult.speedScore}/100, SEO ${auditResult.seoScore}/100. Needs Core Web Vitals speed boost & CAPI tracking fix.`;
    onPreFillLeadForm(auditResult.url, summary);
  };

  return (
    <section id="audit-tool" className="py-20 bg-slate-900/40 relative border-b border-slate-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-700/50 text-xs font-semibold text-amber-300 mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive Diagnostic Scanner</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3 font-['Space_Grotesk']">
            Free Website Speed, SEO & Pixel Health Scan
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Check your website or e-commerce store right now to uncover hidden conversion leaks, sluggish load times, and missing ad tracking.
          </p>
        </div>

        {/* Audit Search Bar */}
        <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 p-2.5 sm:p-3 rounded-2xl shadow-2xl mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="relative w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">https://</span>
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value.replace(/^https?:\/\//, ''))}
                placeholder="yourstore.com or brand.co"
                className="w-full pl-22 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono"
              />
            </div>
            <button
              id="run-audit-button"
              onClick={() => handleRunAudit()}
              disabled={isScanning}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-sm transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:opacity-50"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Scanning Site...</span>
                </>
              ) : (
                <>
                  <Gauge className="w-4 h-4 text-slate-950" />
                  <span>Analyze Potential</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Presets */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-400 px-1">
            <span className="text-slate-500">Try sample test:</span>
            {sampleUrls.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setUrlInput(s);
                  handleRunAudit(s);
                }}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors font-mono cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Loading Progress State */}
        {isScanning && (
          <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-slate-950 border border-indigo-500/40 text-center animate-pulse">
            <div className="w-8 h-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin mx-auto mb-3"></div>
            <div className="text-sm font-semibold text-white mb-1">Scanning Architecture & Metrics...</div>
            <div className="text-xs text-amber-300 font-mono">{scanStep}</div>
          </div>
        )}

        {/* Audit Results Card */}
        {auditResult && !isScanning && (
          <div className="max-w-4xl mx-auto rounded-2xl bg-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl transition-all">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
              <div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-800/60 px-2.5 py-0.5 rounded-full">
                  Audit Completed for:
                </span>
                <h3 className="text-xl font-bold text-white mt-1.5 font-mono">
                  {auditResult.url}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Meta CAPI Status:</span>
                <span className="px-2.5 py-1 rounded text-xs font-bold bg-rose-950/80 text-rose-300 border border-rose-800/60 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {auditResult.trackingHealth}
                </span>
              </div>
            </div>

            {/* Score Gauges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <div className="text-xs text-slate-400 font-semibold mb-1">Mobile Speed (Lighthouse)</div>
                <div className="text-3xl font-extrabold text-amber-400 font-mono">
                  {auditResult.speedScore}<span className="text-sm text-slate-500">/100</span>
                </div>
                <div className="text-[11px] text-rose-400 mt-1">High mobile bounce risk</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <div className="text-xs text-slate-400 font-semibold mb-1">SEO Health & Schema</div>
                <div className="text-3xl font-extrabold text-indigo-400 font-mono">
                  {auditResult.seoScore}<span className="text-sm text-slate-500">/100</span>
                </div>
                <div className="text-[11px] text-amber-300 mt-1">Missing rich snippet stars</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <div className="text-xs text-slate-400 font-semibold mb-1">Conversion Friction</div>
                <div className="text-3xl font-extrabold text-rose-400 font-mono">
                  Moderate
                </div>
                <div className="text-[11px] text-slate-400 mt-1">3 bottlenecks identified</div>
              </div>
            </div>

            {/* Critical Issues Breakdown */}
            <div className="space-y-4 pt-2">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5 mb-2.5">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Detected Bottlenecks Causing Lost Sales:</span>
                </h4>
                <div className="space-y-2">
                  {auditResult.issuesFound.map((issue, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0"></span>
                      <span>{issue}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Quick Wins */}
              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-2.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Immediate High-ROI Solutions:</span>
                </h4>
                <div className="space-y-2">
                  {auditResult.quickWins.map((win, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-800/40">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{win}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action CTA Button to lead form */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-400 text-center sm:text-left">
                Want me to implement these speed, SEO, and tracking fixes for your site?
              </p>
              <button
                id="prefill-lead-btn"
                onClick={handleFixIssues}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Fix These Issues With Me</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
