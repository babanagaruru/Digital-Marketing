import { CaseStudy } from './types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'glow-botanics',
    client: 'GlowBotanics Skincare',
    niche: 'E-Commerce / Beauty DTC',
    primaryService: 'Facebook & Instagram Ads Scaling',
    keyMetric: '4.8x',
    metricLabel: 'Blended Return on Ad Spend (ROAS)',
    summary: 'Restructured fragmented Meta ad sets into a unified Advantage+ catalog with user-generated video hooks and retargeting dynamic product ads.',
    challenge: 'High customer acquisition cost ($48 CPA) and saturated audience fatigue across Instagram feed ads.',
    strategy: [
      'Engineered a 3-second hook testing framework across 14 creator UGC variations',
      'Deployed Meta Conversions API (CAPI) with first-party cookie deduplication',
      'Built a high-converting VIP bundles landing page reducing drop-off'
    ],
    results: [
      { label: 'Monthly Revenue', value: '$84,200', change: '+310%' },
      { label: 'Cost Per Acquisition (CPA)', value: '$19.40', change: '-59%' },
      { label: 'Meta Ad ROAS', value: '4.8x', change: '+140%' }
    ],
    tagColor: 'from-pink-500 to-rose-600'
  },
  {
    id: 'nordic-outdoors',
    client: 'Nordic Gear Co.',
    niche: 'Outdoor Equipment & Apparel',
    primaryService: 'Technical SEO & Organic Ranking',
    keyMetric: '+240%',
    metricLabel: 'Organic Traffic Lift in 5 Months',
    summary: 'Executed an aggressive on-page overhaul, fixed duplicate collection URLs, and built high-intent programmatic buying guides.',
    challenge: 'Trapped on page 2-3 for core product search queries; lost crawl budget due to faceted navigation bloat.',
    strategy: [
      'Resolved canonicalization loops and automated schema markup for 450+ SKU products',
      'Targeted 120 long-tail buyer-intent commercial keywords with comparison hubs',
      'Acquired 35 niche-relevant editorial backlinks from outdoor lifestyle publications'
    ],
    results: [
      { label: 'Google 1st Page Keywords', value: '184 keywords', change: '+180%' },
      { label: 'Organic Monthly Sessions', value: '62,400', change: '+240%' },
      { label: 'SEO Attributed Sales', value: '$46,000/mo', change: '+195%' }
    ],
    tagColor: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'urban-roast',
    client: 'UrbanRoast Coffee Subscriptions',
    niche: 'Food & Beverage / Subscription',
    primaryService: 'Website Boosting & Conversion Rate (CRO)',
    keyMetric: '98/100',
    metricLabel: 'Mobile Core Web Vitals Score',
    summary: 'Optimized page load speed from 4.8s down to 0.7s, streamlined checkout to 2 steps, and cut bounce rate by nearly half.',
    challenge: 'Mobile bounce rate was 68% because hero banner scripts and unoptimized fonts delayed First Contentful Paint.',
    strategy: [
      'Deferred non-critical JavaScript, optimized WebP images, and preloaded vital hero fonts',
      'Redesigned checkout funnel removing friction points and adding 1-click Express Pay',
      'Cleaned up unneeded third-party tracking snippets delaying DOM Interactive'
    ],
    results: [
      { label: 'Mobile Page Speed', value: '0.7s', change: '85% faster' },
      { label: 'Mobile Bounce Rate', value: '31%', change: '-54%' },
      { label: 'Store Checkout Conversion', value: '4.1%', change: '+48%' }
    ],
    tagColor: 'from-amber-500 to-orange-600'
  }
];

export const SERVICES_LIST = [
  {
    id: 'fb_insta_ads',
    title: 'Facebook & Instagram Paid Ads',
    subtitle: 'High-ROAS Product Promotion & Scaling',
    icon: 'Share2',
    description: 'Data-driven paid media campaigns on Meta (Facebook & Instagram) engineered for direct product sales, profitable scaling, and low customer acquisition costs.',
    badge: 'Paid Acquisition',
    accent: 'blue',
    features: [
      'Meta Pixel & Conversions API (CAPI) Server-Side tracking',
      'Creative testing framework (3s Hooks, UGC, Carousel & Story ads)',
      'Custom & Lookalike audience modeling based on LTV data',
      'Retargeting funnels with Dynamic Product Ads (DPA)',
      'Weekly ROAS & CAC performance dashboards in Looker Studio'
    ],
    deliverables: 'Full Ad Account Management, Creative Briefs, Audience Strategy, Daily Optimization'
  },
  {
    id: 'seo_growth',
    title: 'Search Engine Optimization (SEO)',
    subtitle: 'Sustainable Organic Search Dominance',
    icon: 'Search',
    description: 'Strategic organic ranking systems that put your brand and products on Google Page 1 for high-intent buyer searches without paying per click.',
    badge: 'Organic Search',
    accent: 'emerald',
    features: [
      'Complete Technical SEO audit (Crawlability, Indexing, Schema.org)',
      'High-intent commercial keyword mapping for product category pages',
      'On-page content optimization & semantic search integration',
      'Authority-building manual outreach & white-hat backlink acquisition',
      'Google Search Console & Google Analytics 4 revenue attribution'
    ],
    deliverables: 'Technical SEO Fixes, Keyword Strategy, On-Page Overhauls, Monthly Keyword Ranking Reports'
  },
  {
    id: 'speed_cro',
    title: 'Website Boosting & Speed Optimization',
    subtitle: 'Core Web Vitals & Conversion Lift',
    icon: 'Zap',
    description: 'Transform sluggish websites into lightning-fast conversion machines. Higher PageSpeed means lower bounce rates, higher Google rankings, and more completed checkouts.',
    badge: 'Performance & CRO',
    accent: 'amber',
    features: [
      'Core Web Vitals optimization (LCP under 1.2s, INP < 100ms, zero CLS)',
      'Next-gen image formatting (WebP/AVIF), lazy loading, and asset minification',
      'Script purging, critical CSS inlining, and CDN cache rule tuning',
      'Mobile checkout friction elimination & conversion rate optimization (CRO)',
      'A/B tested CTA button placements & trust badge positioning'
    ],
    deliverables: 'Speed Optimization Protocol, Lighthouse 90+ Guarantee, Funnel CRO Audit'
  }
];

export const TESTIMONIALS = [
  {
    name: 'Elena Vance',
    role: 'Founder, Lumina Organics',
    quote: 'Our Meta ROAS jumped from 1.8x to 4.2x within 45 days. The creative testing framework completely revitalized our customer acquisition pipeline.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    stat: '4.2x ROAS'
  },
  {
    name: 'Marcus Thorne',
    role: 'Head of Growth, SolFit Apparel',
    quote: 'Fixing our Core Web Vitals speed dropped our bounce rate immediately. Combined with the on-page SEO work, our organic revenue doubled in 3 months.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    stat: '+114% Organic Revenue'
  },
  {
    name: 'Sophie Chen',
    role: 'E-commerce Director, Veloce Goods',
    quote: 'The lead generation funnel and tracking accuracy gave our team clear visibility into our true marketing attribution. Absolute professional.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    stat: '-42% Blended CPA'
  }
];

export const INITIAL_LEADS = [
  {
    id: 'lead-1',
    name: 'Sarah Jenkins',
    businessName: 'Aura Lifestyle Co.',
    email: 'sarah@auralifestyle.io',
    phone: '+1 (555) 234-5678',
    websiteUrl: 'https://auralifestyle.example.com',
    service: 'all_in_one' as const,
    budget: '$3,000 - $5,000/mo',
    message: 'Looking to launch our spring activewear line with Meta Ads and fix our Shopify mobile load speed.',
    createdAt: '2 hours ago',
    status: 'Qualified' as const
  },
  {
    id: 'lead-2',
    name: 'David Keller',
    businessName: 'Revive Health Tech',
    email: 'david@revivehealth.co',
    phone: '+1 (555) 987-6543',
    websiteUrl: 'https://revivehealth.example.com',
    service: 'fb_insta_ads' as const,
    budget: '$5,000 - $10,000/mo',
    message: 'We need high-converting Instagram Reels and Advantage+ catalog ads for our wellness supplements.',
    createdAt: 'Yesterday',
    status: 'Proposal Sent' as const
  }
];
