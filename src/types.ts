export type ServiceType = 'fb_insta_ads' | 'seo_growth' | 'speed_cro' | 'all_in_one';

export interface Lead {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone?: string;
  websiteUrl?: string;
  service: ServiceType;
  budget: string;
  message: string;
  createdAt: string;
  status: 'New' | 'Qualified' | 'Proposal Sent';
}

export interface CaseStudy {
  id: string;
  client: string;
  niche: string;
  primaryService: string;
  keyMetric: string;
  metricLabel: string;
  summary: string;
  challenge: string;
  strategy: string[];
  results: {
    label: string;
    value: string;
    change: string;
  }[];
  tagColor: string;
}

export interface AuditResult {
  url: string;
  speedScore: number;
  seoScore: number;
  mobileScore: number;
  trackingHealth: 'Configured' | 'Missing CAPI' | 'No Pixel Detected';
  issuesFound: string[];
  quickWins: string[];
}

export interface DatabaseDiagnostics {
  engine: string;
  databaseFile: string;
  fileSizeKb: string;
  stats: {
    leadsCount: number;
    auditsCount: number;
    logsCount: number;
  };
  tables: {
    name: string;
    sql: string;
  }[];
  recentLogs: {
    id: number;
    method: string;
    endpoint: string;
    query_summary: string;
    duration_ms: number;
    created_at: string;
  }[];
}
