import React, { useState } from 'react';
import { X, Briefcase, Award, CheckCircle2, MessageSquare, ChevronRight, BookOpen, Lightbulb, Target, ArrowUpRight, Database, Server, Code2, ShieldCheck, Cpu } from 'lucide-react';

interface InterviewGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InterviewGuideModal: React.FC<InterviewGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'pitch' | 'star' | 'backend' | 'questions' | 'demo'>('backend');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-gradient-to-r from-purple-950/70 via-slate-900 to-indigo-950/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/30 text-purple-300 border border-purple-500/40 flex items-center justify-center shadow-lg">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
                  How to Present This in an Interview
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-purple-900/80 text-purple-200 border border-purple-700/50">
                  Full-Stack Cheatsheet
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Word-for-word scripts, backend database architecture, and STAR interview answers
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-3 border-b border-slate-800 bg-slate-900/50 flex flex-wrap gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('pitch')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'pitch'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-900/50'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>30s Elevator Pitch</span>
          </button>

          <button
            onClick={() => setActiveTab('backend')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'backend'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-900/50'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>Backend, DB & Python Guide</span>
            <span className="bg-emerald-500/30 text-emerald-200 text-[10px] px-1 rounded">HOT</span>
          </button>

          <button
            onClick={() => setActiveTab('star')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'star'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-900/50'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>STAR Method Breakdown</span>
          </button>

          <button
            onClick={() => setActiveTab('questions')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'questions'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-900/50'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Tricky Technical Q&A</span>
          </button>

          <button
            onClick={() => setActiveTab('demo')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'demo'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-900/50'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Live Screen-Share Demo</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-300 leading-relaxed">
          {/* TAB: BACKEND & DATABASE EXPLAINER */}
          {activeTab === 'backend' && (
            <div className="space-y-6">
              {/* Highlight Box */}
              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-700/50 space-y-2">
                <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
                  <Server className="w-4 h-4 text-indigo-400" />
                  <span>How to Explain the Backend in 60 Seconds</span>
                </div>
                <p className="text-xs sm:text-sm text-white italic">
                  "I engineered a full-stack RESTful architecture. The frontend is built in React and communicates over HTTP with an Express backend API. All captured marketing leads, audit diagnostics, and telemetry logs are persistently stored in an embedded SQLite database using ACID-compliant transactions and parameterized prepared statements to prevent SQL injection. In addition, I designed an equivalent Python FastAPI microservice to demonstrate backend framework flexibility."
                </p>
              </div>

              {/* Architecture Diagram */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  System Architecture Flow
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center">
                    <span className="font-bold text-white text-sm mb-1">1. Client Layer</span>
                    <span className="text-indigo-400 font-mono">React 19 + Vite</span>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Lead generation forms, site speed audit tool, and pipeline state management
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center">
                    <span className="font-bold text-white text-sm mb-1">2. REST API Layer</span>
                    <span className="text-purple-400 font-mono">Express (or Python FastAPI)</span>
                    <p className="text-[11px] text-slate-400 mt-1">
                      JSON body parsing, route handlers, input validation, and query latency logger
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center">
                    <span className="font-bold text-white text-sm mb-1">3. Storage Layer</span>
                    <span className="text-emerald-400 font-mono">SQLite 3 (WAL Mode)</span>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Durable relational tables on disk: `leads`, `audits`, and `query_logs`
                    </p>
                  </div>
                </div>
              </div>

              {/* Node.js vs Python Comparison */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Node.js Express vs. Python FastAPI: The Interview Comparison
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-700/50">
                    Both Implemented
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="p-2.5">Criteria</th>
                        <th className="p-2.5 text-indigo-300">Node.js (Express + TypeScript)</th>
                        <th className="p-2.5 text-amber-300">Python (FastAPI + Pydantic)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      <tr>
                        <td className="p-2.5 font-semibold text-white">Concurrency Model</td>
                        <td className="p-2.5">Single-threaded event loop with non-blocking async I/O</td>
                        <td className="p-2.5">Asynchronous ASGI (`asyncio` + `uvicorn`)</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-semibold text-white">Schema Validation</td>
                        <td className="p-2.5">Manual checks or Zod schemas in middleware</td>
                        <td className="p-2.5">Automatic strict type validation via Pydantic models</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-semibold text-white">API Documentation</td>
                        <td className="p-2.5">Requires Swagger JSDoc or manual OpenAPI configuration</td>
                        <td className="p-2.5">Auto-generates interactive Swagger UI at `/docs`</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-semibold text-white">Best Use Case</td>
                        <td className="p-2.5">Unified full-stack teams, shared TypeScript types, real-time websockets</td>
                        <td className="p-2.5">AI/ML integration, predictive churn modeling, automated copy pipelines</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-850 text-xs text-slate-300">
                  <strong className="text-white block mb-1">What to tell the interviewer:</strong>
                  "I implemented the primary deployment in Node.js/Express with SQLite to keep an end-to-end TypeScript codebase. However, because modern growth marketing platforms frequently connect to Python-based machine learning pipelines for automated ad copy generation and predictive customer lifetime value, I also wrote the parallel microservice in Python using FastAPI (`/backend_python/main.py`)."
                </div>
              </div>

              {/* Database Schema Breakdown */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Database Schema & Persistence Details
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <strong className="text-white block">Table: `leads`</strong>
                    <p className="text-slate-400 text-[11px]">
                      Stores client inquiries with columns: <code>id</code> (PK), <code>name</code>, <code>business_name</code>, <code>email</code>, <code>phone</code>, <code>website_url</code>, <code>service</code>, <code>budget</code>, <code>status</code>, and timestamps.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <strong className="text-white block">Table: `audits`</strong>
                    <p className="text-slate-400 text-[11px]">
                      Logs site speed, SEO scores, Meta CAPI tracking status, and JSON-serialized bottlenecks for every scanned URL.
                    </p>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                  <strong className="text-emerald-400 block mb-0.5">Security: SQL Injection Prevention</strong>
                  We use parameterized queries (e.g. <code>db.prepare('INSERT INTO leads VALUES (?, ?...)').run(data)</code>). Parameter markers treat user input strictly as literal values rather than executable SQL code.
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: 30-Second Pitch */}
          {activeTab === 'pitch' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-800/40">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                  When the interviewer asks: "Tell me about this project..."
                </span>
                <p className="text-base text-white font-medium italic">
                  "I built ApexDigital as a high-converting digital marketing growth engine designed to solve the three biggest problems e-commerce brands face today: high Facebook/Instagram acquisition costs, slow mobile load speeds that destroy conversions, and underutilized organic SEO traffic. It features a persistent SQLite backend, live diagnostic audit tool, and a lead pipeline dashboard."
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                  Key Points to Emphasize in 30 Seconds:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <strong className="text-indigo-400 block text-xs mb-1">1. Paid Acquisition (Meta)</strong>
                    <p className="text-xs text-slate-300">
                      Advantage+ creative testing, UGC hook variations, and Conversions API (CAPI) server tracking to beat iOS privacy drop-offs.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <strong className="text-emerald-400 block text-xs mb-1">2. Technical SEO & Content</strong>
                    <p className="text-xs text-slate-300">
                      Product schema markup, fixing faceted navigation crawl waste, and high-intent buyer comparison hubs.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <strong className="text-amber-400 block text-xs mb-1">3. Website Speed & Full-Stack</strong>
                    <p className="text-xs text-slate-300">
                      Sub-second Core Web Vitals optimization and a real RESTful API persisting qualified leads into SQLite database.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STAR Framework */}
          {activeTab === 'star' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-indigo-950 flex items-center justify-center border border-indigo-800">S</span>
                  <span>Situation</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 pl-7">
                  "Many e-commerce and DTC founders spend thousands on Facebook and Instagram ads, but struggle with high customer acquisition costs because their landing pages take 4+ seconds to load and they have zero server-side attribution tracking."
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-purple-950 flex items-center justify-center border border-purple-800">T</span>
                  <span>Task</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 pl-7">
                  "My goal was to build a cohesive full-stack growth platform combining high-converting paid media strategies, technical SEO, an automated website speed audit scanner, and a persistent lead generation pipeline."
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-amber-950 flex items-center justify-center border border-amber-800">A</span>
                  <span>Action</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 pl-7">
                  "I designed the full-stack architecture using React for interactive diagnostics, Express with Node/TypeScript for the REST API, and SQLite with WAL journaling for durable storage. I also created an equivalent Python FastAPI microservice to demonstrate cross-language backend expertise."
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-emerald-950 flex items-center justify-center border border-emerald-800">R</span>
                  <span>Result</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 pl-7">
                  "The application captures qualified inbound leads, persists them safely in a relational database with sub-2ms query times, and provides a live Database Inspector console to monitor SQL queries and stage changes in real time."
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: Questions & Answers */}
          {activeTab === 'questions' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-indigo-400">
                  Q1: "How do you protect your backend and database from SQL Injection?"
                </div>
                <p className="text-xs sm:text-sm text-slate-300">
                  <strong className="text-white">Sample Answer:</strong> "We strictly avoid string concatenation in SQL queries. Every write and read operation uses parameterized prepared statements (e.g. <code>db.prepare('INSERT INTO leads VALUES (?, ?...)')</code>). The SQLite engine compiles the SQL blueprint first, treating parameter markers exclusively as data literals, rendering SQL injection impossible. We also perform runtime type validation on the Express and Pydantic layers."
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-emerald-400">
                  Q2: "Why choose SQLite instead of MongoDB or PostgreSQL for this application?"
                </div>
                <p className="text-xs sm:text-sm text-slate-300">
                  <strong className="text-white">Sample Answer:</strong> "For this architecture, SQLite provides zero-latency in-process querying with zero network roundtrip overhead and true ACID durability. In production, if we scaled horizontally across multiple container replicas, we would migrate to managed PostgreSQL (such as Google Cloud SQL or Supabase) with an ORM like Drizzle or Prisma, utilizing connection pooling with PgBouncer."
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-amber-400">
                  Q3: "Why did you build both a Node.js Express and a Python FastAPI backend?"
                </div>
                <p className="text-xs sm:text-sm text-slate-300">
                  <strong className="text-white">Sample Answer:</strong> "Node.js Express provides a clean, unified TypeScript codebase between the client and server. However, digital marketing engineering frequently interfaces with Python-based machine learning systems for automated copywriting, image generation, and predictive attribution. Building the parallel microservice in Python FastAPI shows I can architect and ship production services in both ecosystems."
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-purple-400">
                  Q4: "How would you handle a traffic surge of 20,000 form submissions per minute?"
                </div>
                <p className="text-xs sm:text-sm text-slate-300">
                  <strong className="text-white">Sample Answer:</strong> "Direct synchronous database writes during a viral spike can saturate database locks. I would decouple ingestion by pushing lead payloads into a message broker or queue like Redis with BullMQ or AWS SQS. The API returns an immediate 202 Accepted response, and a worker pool processes and writes the records to PostgreSQL in controlled batches."
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: Live Demo Script */}
          {activeTab === 'demo' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-800/40">
                <span className="text-xs font-bold text-purple-300 uppercase tracking-wider block mb-1">
                  Step-by-Step Screen-Sharing Playbook:
                </span>
                <p className="text-xs sm:text-sm text-slate-200">
                  Follow these 5 quick steps when sharing your screen in an interview to demonstrate end-to-end full-stack mastery.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <div>
                    <strong className="text-white text-xs sm:text-sm block">Start at the Hero & Metrics</strong>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Showcase clear commercial positioning: 4.8x ROAS on Meta Ads, +240% organic SEO lift, and sub-0.9s website speed boosting.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <div>
                    <strong className="text-white text-xs sm:text-sm block">Run the Live Diagnostic Site Audit</strong>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Type a sample URL into the Audit Tool. Highlight how it detects missing Meta Conversions API (CAPI) tags and logs the result to SQLite.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <div>
                    <strong className="text-white text-xs sm:text-sm block">Submit a Real Lead into the Database</strong>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Scroll to the Contact Form and submit a inquiry. Note the immediate HTTP POST request to <code>/api/leads</code>.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">4</span>
                  <div>
                    <strong className="text-white text-xs sm:text-sm block">Open the Lead Pipeline Dashboard</strong>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Click the 'Leads' button in the navbar. Show the lead stage selector ('New' ➔ 'Qualified'), and click 'Export CSV'.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-rose-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">5</span>
                  <div>
                    <strong className="text-white text-xs sm:text-sm block">Switch to the "Live SQLite Database Inspector" Tab</strong>
                    <p className="text-xs text-slate-400 mt-0.5">
                      This is your clincher: click the second tab in the modal to display the actual SQL table schemas, file size, and live millisecond query telemetry!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs text-slate-400">
          <span className="text-purple-300 font-medium">✨ Click any tab above to access scripts, architecture diagrams, and STAR answers.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
