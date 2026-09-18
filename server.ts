import express, { Request, Response, NextFunction } from 'express';
import path from 'node:path';
import { createServer as createViteServer } from 'vite';
import { db, initDatabase, seedDatabase, logQuery, getDatabaseDiagnostics } from './server/db.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize SQLite database & tables
  initDatabase();

  // Middleware
  app.use(express.json());

  // Performance & Query timing logger middleware for API routes
  app.use('/api', (req: Request, res: Response, next: NextFunction) => {
    const start = performance.now();
    res.on('finish', () => {
      const duration = Number((performance.now() - start).toFixed(2));
      const summary = `${req.method} ${req.originalUrl} [${res.statusCode}]`;
      logQuery(req.method, req.originalUrl, summary, duration);
    });
    next();
  });

  // -----------------------------
  // REST API ENDPOINTS
  // -----------------------------

  // 1. Health check & Database Status
  app.get('/api/health', (req: Request, res: Response) => {
    const diag = getDatabaseDiagnostics();
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: {
        type: 'SQLite3',
        status: 'connected',
        file: diag.databaseFile,
        size: diag.fileSizeKb,
        stats: diag.stats
      },
      environment: process.env.NODE_ENV || 'development'
    });
  });

  // 2. GET /api/leads - Fetch all captured marketing leads
  app.get('/api/leads', (req: Request, res: Response) => {
    try {
      const { status, search } = req.query;
      let sql = 'SELECT * FROM leads WHERE 1=1';
      const params: any[] = [];

      if (status && status !== 'all') {
        sql += ' AND status = ?';
        params.push(status);
      }

      if (search && typeof search === 'string') {
        sql += ' AND (name LIKE ? OR business_name LIKE ? OR email LIKE ?)';
        const searchPattern = `%${search}%`;
        params.push(searchPattern, searchPattern, searchPattern);
      }

      sql += ' ORDER BY datetime(created_at) DESC';

      const stmt = db.prepare(sql);
      const rows = stmt.all(...params) as any[];

      // Format to camelCase for frontend compatibility
      const formattedLeads = rows.map(r => ({
        id: r.id,
        name: r.name,
        businessName: r.business_name,
        email: r.email,
        phone: r.phone || undefined,
        websiteUrl: r.website_url || undefined,
        service: r.service,
        budget: r.budget,
        message: r.message,
        status: r.status,
        createdAt: r.created_at
      }));

      res.json({
        success: true,
        count: formattedLeads.length,
        leads: formattedLeads
      });
    } catch (err: any) {
      console.error('Error fetching leads:', err);
      res.status(500).json({ success: false, error: 'Database query failed', message: err.message });
    }
  });

  // 3. POST /api/leads - Store a new lead from the contact form
  app.post('/api/leads', (req: Request, res: Response) => {
    try {
      const { name, businessName, email, phone, websiteUrl, service, budget, message } = req.body;

      // Validation
      if (!name || typeof name !== 'string' || !name.trim()) {
        res.status(400).json({ success: false, error: 'Client name is required.' });
        return;
      }
      if (!email || typeof email !== 'string' || !email.includes('@')) {
        res.status(400).json({ success: false, error: 'A valid email address is required.' });
        return;
      }
      if (!businessName || typeof businessName !== 'string' || !businessName.trim()) {
        res.status(400).json({ success: false, error: 'Brand or business name is required.' });
        return;
      }

      const id = `lead-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      const createdAt = new Date().toISOString();
      const status = 'New';

      const insertStmt = db.prepare(`
        INSERT INTO leads (id, name, business_name, email, phone, website_url, service, budget, message, status, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      insertStmt.run(
        id,
        name.trim(),
        businessName.trim(),
        email.trim().toLowerCase(),
        phone ? phone.trim() : null,
        websiteUrl ? websiteUrl.trim() : null,
        service || 'all_in_one',
        budget || '$1,500 - $3,500 / month',
        message ? message.trim() : 'Website consultation request',
        status,
        createdAt,
        createdAt
      );

      const createdLead = {
        id,
        name: name.trim(),
        businessName: businessName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : undefined,
        websiteUrl: websiteUrl ? websiteUrl.trim() : undefined,
        service: service || 'all_in_one',
        budget: budget || '$1,500 - $3,500 / month',
        message: message ? message.trim() : 'Website consultation request',
        status,
        createdAt
      };

      res.status(201).json({
        success: true,
        message: 'Lead recorded successfully in SQLite database.',
        lead: createdLead
      });
    } catch (err: any) {
      console.error('Error creating lead:', err);
      res.status(500).json({ success: false, error: 'Failed to persist lead in database', message: err.message });
    }
  });

  // 4. PATCH /api/leads/:id - Update lead qualification status
  app.patch('/api/leads/:id', (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const allowedStatuses = ['New', 'Qualified', 'Proposal Sent', 'Closed'];
      if (!allowedStatuses.includes(status)) {
        res.status(400).json({ success: false, error: `Invalid status. Must be one of: ${allowedStatuses.join(', ')}` });
        return;
      }

      const stmt = db.prepare(`
        UPDATE leads 
        SET status = ?, updated_at = ? 
        WHERE id = ?
      `);

      const result = stmt.run(status, new Date().toISOString(), id);

      if (result.changes === 0) {
        res.status(404).json({ success: false, error: 'Lead not found in database.' });
        return;
      }

      res.json({
        success: true,
        message: `Lead ${id} status updated to "${status}"`,
        updatedStatus: status
      });
    } catch (err: any) {
      console.error('Error updating lead status:', err);
      res.status(500).json({ success: false, error: 'Database update failed', message: err.message });
    }
  });

  // 5. DELETE /api/leads/:id - Remove lead from database
  app.delete('/api/leads/:id', (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const stmt = db.prepare('DELETE FROM leads WHERE id = ?');
      const result = stmt.run(id);

      if (result.changes === 0) {
        res.status(404).json({ success: false, error: 'Lead not found.' });
        return;
      }

      res.json({
        success: true,
        message: `Lead ${id} deleted from database.`
      });
    } catch (err: any) {
      console.error('Error deleting lead:', err);
      res.status(500).json({ success: false, error: 'Database deletion failed', message: err.message });
    }
  });

  // 6. POST /api/audit - Store website speed & SEO audit in database
  app.post('/api/audit', (req: Request, res: Response) => {
    try {
      const { url, speedScore, seoScore, mobileScore, trackingHealth, issuesFound, quickWins } = req.body;

      if (!url) {
        res.status(400).json({ success: false, error: 'URL is required for audit recording.' });
        return;
      }

      const id = `audit-${Date.now()}`;
      const createdAt = new Date().toISOString();

      const stmt = db.prepare(`
        INSERT INTO audits (id, website_url, speed_score, seo_score, mobile_score, tracking_health, issues_json, quick_wins_json, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      stmt.run(
        id,
        url,
        speedScore || 0,
        seoScore || 0,
        mobileScore || 0,
        trackingHealth || 'Pending',
        JSON.stringify(issuesFound || []),
        JSON.stringify(quickWins || []),
        createdAt
      );

      res.status(201).json({
        success: true,
        message: 'Audit diagnostics logged in database.',
        auditId: id
      });
    } catch (err: any) {
      console.error('Error saving audit:', err);
      res.status(500).json({ success: false, error: 'Failed to record audit', message: err.message });
    }
  });

  // 7. GET /api/database/inspector - Deep database inspection for interview demonstration
  app.get('/api/database/inspector', (req: Request, res: Response) => {
    try {
      const diagnostics = getDatabaseDiagnostics();
      res.json({
        success: true,
        diagnostics
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Inspection failed', message: err.message });
    }
  });

  // 8. POST /api/database/reset - Re-seed initial database
  app.post('/api/database/reset', (req: Request, res: Response) => {
    try {
      db.exec('DELETE FROM leads;');
      db.exec('DELETE FROM audits;');
      seedDatabase();
      res.json({
        success: true,
        message: 'Database reset to default seed records.'
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Reset failed', message: err.message });
    }
  });

  // -----------------------------
  // VITE MIDDLEWARE & STATIC ASSETS
  // -----------------------------
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ApexDigital Server running with SQLite database at http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
