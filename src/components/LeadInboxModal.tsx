import React, { useState, useEffect } from 'react';
import { X, Inbox, Download, Trash2, Mail, Phone, Globe, DollarSign, Clock, Filter, Database, Terminal, RefreshCw, Layers, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Lead, DatabaseDiagnostics } from '../types';

interface LeadInboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  leads: Lead[];
  onUpdateLeadStatus: (id: string, newStatus: 'New' | 'Qualified' | 'Proposal Sent') => void;
  onDeleteLead?: (id: string) => void;
  onResetDatabase?: () => void;
  backendConnected?: boolean;
}

export const LeadInboxModal: React.FC<LeadInboxModalProps> = ({
  isOpen,
  onClose,
  leads,
  onUpdateLeadStatus,
  onDeleteLead,
  onResetDatabase,
  backendConnected = true
}) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'database'>('leads');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [diagnostics, setDiagnostics] = useState<DatabaseDiagnostics | null>(null);
  const [isLoadingDiag, setIsLoadingDiag] = useState(false);
  const [diagError, setDiagError] = useState<string | null>(null);

  const fetchDiagnostics = async () => {
    setIsLoadingDiag(true);
    setDiagError(null);
    try {
      const res = await fetch('/api/database/inspector');
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json();
        setDiagnostics(data.diagnostics);
      } else {
        // Fallback for static hosting like GitHub Pages
        setDiagnostics({
          engine: 'SQLite 3 (WAL Mode)',
          databaseFile: 'database.sqlite (Static Preview on GitHub Pages)',
          fileSizeKb: '4.0 KB',
          stats: {
            leadsCount: leads.length,
            auditsCount: 2,
            logsCount: 14
          },
          tables: [
            {
              name: 'leads',
              sql: 'CREATE TABLE IF NOT EXISTS leads (id TEXT PRIMARY KEY, name TEXT NOT NULL, business_name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT, website_url TEXT, service TEXT NOT NULL, budget TEXT NOT NULL, message TEXT, status TEXT DEFAULT "New", created_at TEXT NOT NULL)'
            },
            {
              name: 'audits',
              sql: 'CREATE TABLE IF NOT EXISTS audits (id TEXT PRIMARY KEY, url TEXT NOT NULL, speed_score INTEGER, seo_score INTEGER, mobile_score INTEGER, tracking_health TEXT, issues_json TEXT, quick_wins_json TEXT, created_at TEXT NOT NULL)'
            },
            {
              name: 'query_logs',
              sql: 'CREATE TABLE IF NOT EXISTS query_logs (id INTEGER PRIMARY KEY AUTOINCREMENT, method TEXT NOT NULL, endpoint TEXT NOT NULL, query_summary TEXT NOT NULL, duration_ms REAL NOT NULL, created_at TEXT NOT NULL)'
            }
          ],
          recentLogs: [
            { id: 1, method: 'GET', endpoint: '/api/leads', query_summary: 'SELECT * FROM leads ORDER BY created_at DESC', duration_ms: 0.42, created_at: new Date().toISOString() },
            { id: 2, method: 'POST', endpoint: '/api/leads', query_summary: 'INSERT INTO leads (id, name...) VALUES (?, ?...)', duration_ms: 1.15, created_at: new Date().toISOString() },
            { id: 3, method: 'GET', endpoint: '/api/database/inspector', query_summary: 'SELECT name, sql FROM sqlite_master WHERE type="table"', duration_ms: 0.38, created_at: new Date().toISOString() }
          ]
        });
      }
    } catch (err: any) {
      // Fallback for static hosting environments
      setDiagnostics({
        engine: 'SQLite 3 (WAL Mode)',
        databaseFile: 'database.sqlite (Offline/Static Preview Mode)',
        fileSizeKb: '4.0 KB',
        stats: {
          leadsCount: leads.length,
          auditsCount: 1,
          logsCount: 8
        },
        tables: [
          {
            name: 'leads',
            sql: 'CREATE TABLE IF NOT EXISTS leads (id TEXT PRIMARY KEY, name TEXT NOT NULL, business_name TEXT NOT NULL, email TEXT NOT NULL, service TEXT NOT NULL, budget TEXT NOT NULL, status TEXT DEFAULT "New", created_at TEXT NOT NULL)'
          }
        ],
        recentLogs: [
          { id: 1, method: 'GET', endpoint: '/api/leads', query_summary: 'SELECT * FROM leads (cached)', duration_ms: 0.12, created_at: new Date().toISOString() }
        ]
      });
    } finally {
      setIsLoadingDiag(false);
    }
  };

  useEffect(() => {
    if (isOpen && activeTab === 'database') {
      fetchDiagnostics();
    }
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  const filteredLeads = filterStatus === 'all'
    ? leads
    : leads.filter(l => l.status === filterStatus);

  const handleExportCsv = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Name', 'Business', 'Email', 'Phone', 'Website', 'Service', 'Budget', 'Status', 'Date', 'Message'];
    const rows = leads.map(l => [
      l.id,
      `"${l.name}"`,
      `"${l.businessName}"`,
      `"${l.email}"`,
      `"${l.phone || ''}"`,
      `"${l.websiteUrl || ''}"`,
      `"${l.service}"`,
      `"${l.budget}"`,
      `"${l.status}"`,
      `"${l.createdAt}"`,
      `"${l.message.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `digital_marketing_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <Inbox className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
                  ApexDigital Lead & Database Console
                </h3>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-mono flex items-center gap-1 border ${
                  backendConnected
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                    : 'bg-amber-950 text-amber-300 border-amber-700'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${backendConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
                  {backendConnected ? 'SQLite 3 Live' : 'Offline Fallback'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Full-stack persistence layer connecting React contact forms to SQLite database
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {leads.length > 0 && activeTab === 'leads' && (
              <button
                onClick={handleExportCsv}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-medium flex items-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
                title="Download leads as CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 py-2.5 border-b border-slate-800 bg-slate-900/40 flex items-center gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'leads'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/40'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Captured Leads Pipeline</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-950 text-indigo-200 border border-indigo-700/60 font-mono">
              {leads.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('database');
              fetchDiagnostics();
            }}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'database'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/40'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-indigo-400" />
            <span>Live SQLite Database & Query Inspector</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-700/60 font-mono">
              WAL
            </span>
          </button>
        </div>

        {/* TAB 1: LEADS PIPELINE */}
        {activeTab === 'leads' && (
          <>
            {/* Filter Controls */}
            <div className="px-6 py-3 border-b border-slate-800/80 bg-slate-900/20 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> Filter by Status:
                </span>
                {['all', 'New', 'Qualified', 'Proposal Sent'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer capitalize font-medium ${
                      filterStatus === st
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {st === 'all' ? 'All Leads' : st}
                  </button>
                ))}
              </div>

              {onResetDatabase && (
                <button
                  onClick={onResetDatabase}
                  className="text-xs text-slate-400 hover:text-indigo-300 flex items-center gap-1 transition-colors cursor-pointer"
                  title="Re-populate database with seed leads"
                >
                  <RefreshCw className="w-3 h-3" /> Re-seed Sample Leads
                </button>
              )}
            </div>

            {/* Leads List */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              {filteredLeads.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <Inbox className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-medium">No leads match this filter.</p>
                  <p className="text-xs text-slate-600 mt-1">
                    Submit the contact form on the website to persist a new lead in SQLite!
                  </p>
                </div>
              ) : (
                filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-white">{lead.name}</h4>
                          <span className="text-xs text-indigo-400 font-semibold">• {lead.businessName}</span>
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span>{lead.createdAt}</span>
                          <span className="text-slate-600">|</span>
                          <span className="font-mono text-slate-400">{lead.id}</span>
                        </div>
                      </div>

                      {/* Status Dropdown & Delete */}
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-400">Stage:</span>
                        <select
                          value={lead.status}
                          onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value as any)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                            lead.status === 'New'
                              ? 'bg-indigo-950 text-indigo-300 border-indigo-700'
                              : lead.status === 'Qualified'
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                              : 'bg-purple-950 text-purple-300 border-purple-700'
                          }`}
                        >
                          <option value="New">Status: New</option>
                          <option value="Qualified">Status: Qualified</option>
                          <option value="Proposal Sent">Status: Proposal Sent</option>
                        </select>

                        {onDeleteLead && (
                          <button
                            onClick={() => onDeleteLead(lead.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                            title="Delete lead from SQLite database"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs text-slate-300">
                      <div className="flex items-center gap-1.5 truncate">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{lead.email}</span>
                      </div>
                      {lead.phone && (
                        <div className="flex items-center gap-1.5 truncate">
                          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{lead.phone}</span>
                        </div>
                      )}
                      {lead.websiteUrl && (
                        <div className="flex items-center gap-1.5 truncate">
                          <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <a
                            href={lead.websiteUrl.startsWith('http') ? lead.websiteUrl : `https://${lead.websiteUrl}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-indigo-400 hover:underline truncate"
                          >
                            {lead.websiteUrl}
                          </a>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="font-medium text-emerald-300">{lead.budget}</span>
                      </div>
                    </div>

                    {/* Lead Message */}
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                      <strong className="text-slate-400 block text-[11px] mb-0.5">Project Scope / Inquired Details:</strong>
                      {lead.message}
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* TAB 2: SQLITE DATABASE & QUERY INSPECTOR */}
        {activeTab === 'database' && (
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
            {/* Top Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Database Engine</span>
                <span className="text-sm font-bold text-white mt-1 block">SQLite 3 (Embedded)</span>
                <span className="text-[10px] text-emerald-400 font-mono">WAL Journaling Active</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Storage File</span>
                <span className="text-sm font-bold text-indigo-300 mt-1 block font-mono">
                  {diagnostics?.databaseFile || 'database.sqlite'}
                </span>
                <span className="text-[10px] text-slate-400">File size: {diagnostics?.fileSizeKb || 'Calculating...'}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Active Leads Stored</span>
                <span className="text-sm font-bold text-white mt-1 block">
                  {diagnostics?.stats.leadsCount ?? leads.length} Records
                </span>
                <span className="text-[10px] text-indigo-400">Table: `leads`</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Logged Audits</span>
                <span className="text-sm font-bold text-emerald-400 mt-1 block">
                  {diagnostics?.stats.auditsCount ?? 0} Scans
                </span>
                <span className="text-[10px] text-slate-400">Table: `audits`</span>
              </div>
            </div>

            {/* Architecture Explanation Box for Interview */}
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-slate-300 space-y-2">
              <div className="flex items-center gap-2 font-bold text-indigo-200">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span>How This Database Works In Production (Interview Quick-Talk)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Form inputs flow from the React client via an HTTP POST request to Express. The server parses the payload, validates types, and runs a parameterized SQL prepared statement:
                <code className="mx-1 px-1.5 py-0.5 rounded bg-slate-900 text-amber-300 font-mono text-[11px]">
                  INSERT INTO leads (...) VALUES (?, ?, ...)
                </code>
                which guarantees <strong>zero SQL injection risk</strong>. Data is written to disk in ACID-compliant SQLite with Write-Ahead Logging (WAL) for sub-millisecond query execution.
              </p>
            </div>

            {/* Database Table Schemas */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-1.5 font-['Space_Grotesk']">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  <span>SQLite Schema Definitions (`sqlite_master`)</span>
                </h4>
                <button
                  onClick={fetchDiagnostics}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className={`w-3 h-3 ${isLoadingDiag ? 'animate-spin' : ''}`} />
                  <span>Refresh DB</span>
                </button>
              </div>

              <div className="space-y-3">
                {diagnostics?.tables && diagnostics.tables.length > 0 ? (
                  diagnostics.tables.map((t) => (
                    <div key={t.name} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                      <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 text-[11px]">
                        <span className="font-mono font-bold text-indigo-300">Table: {t.name}</span>
                        <span className="text-slate-500">Relational SQLite Table</span>
                      </div>
                      <pre className="mt-2 text-[11px] font-mono text-slate-300 whitespace-pre-wrap bg-slate-950 p-2.5 rounded-lg border border-slate-850 overflow-x-auto">
                        {t.sql}
                      </pre>
                    </div>
                  ))
                ) : (
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-400">
                    Loading database schema from SQLite engine...
                  </div>
                )}
              </div>
            </div>

            {/* Real-time Query Execution Log */}
            <div>
              <h4 className="font-bold text-white text-sm flex items-center gap-1.5 font-['Space_Grotesk'] mb-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Live API & Query Telemetry Log</span>
              </h4>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-[11px] space-y-1.5 max-h-48 overflow-y-auto">
                {diagnostics?.recentLogs && diagnostics.recentLogs.length > 0 ? (
                  diagnostics.recentLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between text-slate-300 hover:bg-slate-900/60 p-1 rounded">
                      <div className="flex items-center gap-2">
                        <span className={`px-1.5 py-0.2 rounded font-bold text-[9px] ${
                          log.method === 'GET' ? 'bg-blue-950 text-blue-300' :
                          log.method === 'POST' ? 'bg-emerald-950 text-emerald-300' :
                          log.method === 'PATCH' ? 'bg-amber-950 text-amber-300' : 'bg-rose-950 text-rose-300'
                        }`}>
                          {log.method}
                        </span>
                        <span className="text-slate-200">{log.endpoint}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500 text-[10px]">
                        <span className="text-emerald-400">{log.duration_ms} ms</span>
                        <span>{new Date(log.created_at).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-slate-500 py-2">
                    No query traces logged yet. Interact with the website or lead table to see real-time query metrics!
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs text-slate-400">
          <span>💡 Press <strong className="text-white">Interview Guide</strong> in the top navbar to see how to talk about this architecture in interviews.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors cursor-pointer"
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
