import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';

const DB_FILE = path.join(process.cwd(), 'database.sqlite');

// Initialize SQLite database instance
export const db = new DatabaseSync(DB_FILE);

// Enable WAL mode (Write-Ahead Logging) for optimal concurrency and performance
try {
  db.exec('PRAGMA journal_mode = WAL;');
  db.exec('PRAGMA synchronous = NORMAL;');
} catch (e) {
  console.warn('PRAGMA setup note:', e);
}

// Initialize tables
export function initDatabase() {
  const schema = `
    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      business_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      website_url TEXT,
      service TEXT NOT NULL,
      budget TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'New',
      created_at TEXT NOT NULL,
      updated_at TEXT
    );

    CREATE TABLE IF NOT EXISTS audits (
      id TEXT PRIMARY KEY,
      website_url TEXT NOT NULL,
      speed_score INTEGER NOT NULL,
      seo_score INTEGER NOT NULL,
      mobile_score INTEGER NOT NULL,
      tracking_health TEXT,
      issues_json TEXT,
      quick_wins_json TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS query_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      method TEXT NOT NULL,
      endpoint TEXT NOT NULL,
      query_summary TEXT,
      duration_ms REAL NOT NULL,
      created_at TEXT NOT NULL
    );
  `;

  db.exec(schema);

  // Check if leads table has data; if empty, insert seed data
  const countRow = db.prepare('SELECT COUNT(*) as count FROM leads').get() as { count: number } | undefined;
  if (!countRow || countRow.count === 0) {
    seedDatabase();
  }
}

export function seedDatabase() {
  const insertStmt = db.prepare(`
    INSERT INTO leads (id, name, business_name, email, phone, website_url, service, budget, message, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const initialLeads = [
    {
      id: 'lead-1',
      name: 'Sarah Jenkins',
      business_name: 'Aura Lifestyle Co.',
      email: 'sarah@auralifestyle.io',
      phone: '+1 (555) 234-5678',
      website_url: 'https://auralifestyle.example.com',
      service: 'all_in_one',
      budget: '$3,000 - $5,000/mo',
      message: 'Looking to launch our spring activewear line with Meta Ads and fix our Shopify mobile load speed.',
      status: 'Qualified',
      created_at: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'lead-2',
      name: 'David Keller',
      business_name: 'Revive Health Tech',
      email: 'david@revivehealth.co',
      phone: '+1 (555) 987-6543',
      website_url: 'https://revivehealth.example.com',
      service: 'fb_insta_ads',
      budget: '$5,000 - $10,000/mo',
      message: 'We need high-converting Instagram Reels and Advantage+ catalog ads for our wellness supplements.',
      status: 'Proposal Sent',
      created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'lead-3',
      name: 'Marcus Vance',
      business_name: 'Nordic Roast Co.',
      email: 'marcus@nordicroast.com',
      phone: '+1 (555) 345-6789',
      website_url: 'https://nordicroast.example.com',
      service: 'speed_cro',
      budget: '$1,500 - $3,500/mo',
      message: 'Mobile load time is 4.6s. High bounce rates on collection pages; need Core Web Vitals optimization.',
      status: 'New',
      created_at: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  for (const lead of initialLeads) {
    insertStmt.run(
      lead.id,
      lead.name,
      lead.business_name,
      lead.email,
      lead.phone,
      lead.website_url,
      lead.service,
      lead.budget,
      lead.message,
      lead.status,
      lead.created_at,
      lead.updated_at
    );
  }
}

// Log query execution for database inspector
export function logQuery(method: string, endpoint: string, query_summary: string, duration_ms: number) {
  try {
    const stmt = db.prepare(`
      INSERT INTO query_logs (method, endpoint, query_summary, duration_ms, created_at)
      VALUES (?, ?, ?, ?, ?)
    `);
    stmt.run(method, endpoint, query_summary, duration_ms, new Date().toISOString());

    // Keep query logs bounded to latest 100 entries
    db.exec(`
      DELETE FROM query_logs WHERE id NOT IN (
        SELECT id FROM query_logs ORDER BY id DESC LIMIT 100
      )
    `);
  } catch (e) {
    // Silently ignore logging errors
  }
}

// Get database diagnostics for demonstration / interview view
export function getDatabaseDiagnostics() {
  const leadsCount = (db.prepare('SELECT COUNT(*) as count FROM leads').get() as any)?.count ?? 0;
  const auditsCount = (db.prepare('SELECT COUNT(*) as count FROM audits').get() as any)?.count ?? 0;
  const logsCount = (db.prepare('SELECT COUNT(*) as count FROM query_logs').get() as any)?.count ?? 0;

  const schemaInfo = db.prepare(`
    SELECT name, sql FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'
  `).all();

  const recentLogs = db.prepare(`
    SELECT * FROM query_logs ORDER BY id DESC LIMIT 15
  `).all();

  let fileSizeKb = 0;
  try {
    const stats = fs.statSync(DB_FILE);
    fileSizeKb = Math.round(stats.size / 1024);
  } catch (e) {
    fileSizeKb = 0;
  }

  return {
    engine: 'SQLite 3 (Embedded Relational Database with WAL Mode)',
    databaseFile: path.basename(DB_FILE),
    fileSizeKb: `${fileSizeKb} KB`,
    stats: {
      leadsCount,
      auditsCount,
      logsCount
    },
    tables: schemaInfo,
    recentLogs
  };
}
