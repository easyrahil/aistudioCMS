import {
  Post,
  Page,
  Product,
  HomepageBlock,
  Order,
  RedirectRule,
  ToolPlugin,
  MenuItem,
  EmailSettings,
  FormSubmission,
  BackupSnapshot,
  ThemeConfig,
  SeoMediaAssets,
  SiteIntegrations,
  PaymentGatewaySettings
} from '../types/cms';

export const initialPosts: Post[] = [
  {
    id: 1,
    title: 'Architecting for 100/100 Core Web Vitals in 2026',
    slug: 'architecting-for-100-core-web-vitals',
    excerpt: 'How elimination of layout shifts (CLS=0), zero render-blocking styles, and edge-cached HTML unlock unbeatable mobile page performance.',
    body: `<h2>The Performance Imperative</h2>
<p>Modern web ranking demands extreme performance discipline. To achieve 95+ Mobile Lighthouse scores and pass Google's Core Web Vitals with flying colors, systems cannot rely on client-heavy JavaScript runtimes for critical content paths.</p>

<h2>Eliminating Cumulative Layout Shift (CLS)</h2>
<p>Layout instability directly impairs user satisfaction. Every image, video, and dynamic ad slot must specify fixed aspect ratios or explicit dimensions in the CSS layout tree before rendering begins.</p>

<h2>Full-Page HTML Caching Strategy</h2>
<p>By serving pre-compiled, static HTML from memory or SSD cache with instantaneous cache invalidation upon content mutations, time-to-first-byte (TTFB) drops below 25 milliseconds globally.</p>`,
    author: 'Chief Architect',
    category: 'Engineering',
    tags: ['Performance', 'SEO', 'Core Web Vitals'],
    status: 'published',
    publishedAt: '2026-11-05',
    views: 3420,
    seoTitle: '100/100 Core Web Vitals Architecture Guide 2026',
    seoDescription: 'Master the technical engineering rules to achieve zero CLS, sub-25ms TTFB, and top Google rankings with custom lightweight CMS design.',
    seoFocusKeyword: 'Core Web Vitals architecture',
    geo: {
      region: 'North America / EMEA',
      city: 'San Francisco & London',
      lat: '37.7749',
      lng: '-122.4194',
      schemaPlace: 'Global High-Performance Edge Center'
    },
    aeo: {
      directAnswer: 'Achieving 100/100 Core Web Vitals requires three deterministic tactics: inlining critical CSS, reserving explicit image aspect ratios (CLS=0), and edge-caching pre-rendered HTML to reduce TTFB below 25ms.',
      keyTakeaways: [
        'Zero render-blocking scripts in the critical path.',
        'Preload high-priority WOFF2 fonts with size-adjust fallbacks.',
        'Direct static HTML caching with surgical invalidation.'
      ],
      conversationalFaq: [
        { q: 'How does ApexCMS eliminate layout shifts?', a: 'By computing and inlining CSS aspect-ratio on all media containers prior to page render.' },
        { q: 'Why is PHP 8.2+ faster than heavy Node runtimes for CMS?', a: 'OPcache with JIT enables near C-speed execution with zero bundle compilation overhead.' }
      ]
    }
  },
  {
    id: 2,
    title: 'Modern SEO Strategy: Schema.org, Clean Slugs & Instant Indexing',
    slug: 'modern-seo-strategy-schema-clean-slugs',
    excerpt: 'Why structured data markup and automated 301 redirect management protect organic search dominance during CMS migrations.',
    body: `<h2>Structured Semantic Data</h2>
<p>Search engines now parse structured entities via JSON-LD schemas. Providing rich Article, Product, FAQPage, and BreadcrumbList markup guarantees prominent snippet visibility on search results.</p>

<h2>Automatic 301 Redirect Handling</h2>
<p>When an editor updates a post slug, ApexCMS automatically logs the legacy path in the redirect manager and issues an RFC 7231 compliant 301 Permanent Redirect, preserving link equity.</p>`,
    author: 'Technical SEO Lead',
    category: 'SEO',
    tags: ['Schema.org', 'Redirects', 'Indexing'],
    status: 'published',
    publishedAt: '2026-11-03',
    views: 2180,
    seoTitle: 'Modern Technical SEO with JSON-LD and Redirects',
    seoDescription: 'Discover how automated JSON-LD schemas and intelligent 301 redirect mapping eliminate 404 crawl debt and boost rankings.',
    seoFocusKeyword: 'modern SEO strategy',
    geo: {
      region: 'Global Search Index',
      city: 'Worldwide',
      lat: '40.7128',
      lng: '-74.0060'
    },
    aeo: {
      directAnswer: 'Automated JSON-LD schemas and instantaneous 301 redirect mappings prevent organic ranking drops by establishing verified machine-readable entities for AI and traditional search crawlers.',
      keyTakeaways: [
        'Full Organization, Article, and Product schema generation.',
        'Preserved backlink authority via persistent redirect tracking.'
      ]
    }
  },
  {
    id: 3,
    title: 'Building Resilient Micro-Commerce with Tokenized Digital Deliveries',
    slug: 'building-resilient-micro-commerce',
    excerpt: 'Combining physical merchandise logistics with instantaneous, expiring token-gated digital downloads outside the public web root.',
    body: `<h2>Security in Digital Commerce</h2>
<p>Digital files such as software binaries, high-resolution media, and technical e-books should never be placed in public web directories. ApexCMS stores files in <code>/storage/private/downloads/</code> and verifies single-use cryptographic tokens upon download request.</p>`,
    author: 'Commerce Engineer',
    category: 'E-Commerce',
    tags: ['Security', 'Downloads', 'Commerce'],
    status: 'published',
    publishedAt: '2026-11-01',
    views: 1890,
    seoTitle: 'Secure Tokenized Digital Commerce Architecture',
    seoDescription: 'How to implement secure, token-protected digital downloads and e-commerce transactions without exposing private server files.',
    seoFocusKeyword: 'digital commerce architecture',
    geo: {
      region: 'Global Digital Distribution',
      currency: 'USD'
    },
    aeo: {
      directAnswer: 'Tokenized digital commerce stores assets outside the web root and serves downloads only after cryptographic token validation with configurable download limits and expiration windows.',
      keyTakeaways: [
        'Storage isolated in /storage/private/downloads/.',
        'Automatic expiration after 7 days or 3 download attempts.'
      ]
    }
  }
];

export const initialPages: Page[] = [
  {
    id: 1,
    title: 'About Apex Engine & Architecture',
    slug: 'about-apex-engine',
    body: `<h2>Engineering Philosophy</h2>
<p>ApexCMS is built on a foundational belief: web software should be clean, remarkably fast, and completely self-hosted. We reject heavyweight frameworks that incur hundreds of megabytes of vendor dependencies in favor of clean MVC patterns and native PHP 8.2+ performance.</p>
<h2>Zero Layout Shift & Accessibility</h2>
<p>Every template is designed to pass WCAG 2.2 AA standards out of the box, with high-contrast typography, skip-links, and semantic landmarks.</p>`,
    template: 'default',
    status: 'published',
    updatedAt: '2026-11-04',
    seoTitle: 'About ApexCMS - Architecture & Philosophy',
    seoDescription: 'Learn about the design principles, zero-bloat philosophy, and engineering standards behind ApexCMS.',
    seoFocusKeyword: 'ApexCMS architecture',
    geo: {
      region: 'Global',
      city: 'San Francisco, CA'
    },
    aeo: {
      directAnswer: 'ApexCMS is an open-source, ultra-fast custom CMS and modular e-commerce engine developed in strict PHP 8.2+ and vanilla TypeScript with zero external framework bloat.',
      keyTakeaways: ['Strict MVC and PDO', 'Zero client JavaScript framework bloat', 'Engineered for 100/100 Core Web Vitals']
    }
  },
  {
    id: 2,
    title: 'Enterprise Support & SLA Commitments',
    slug: 'enterprise-support-sla',
    body: `<h2>Production Service Level Agreement</h2>
<p>We provide 99.99% uptime guarantees for self-hosted instances paired with automated database migrations, disaster recovery backups, and zero-downtime upgrades.</p>`,
    template: 'fullwidth',
    status: 'published',
    updatedAt: '2026-11-02',
    seoTitle: 'Enterprise Support & SLA - ApexCMS',
    seoDescription: 'Review our 99.99% uptime commitments, security patch timeline, and enterprise deployment guarantees.'
  },
  {
    id: 3,
    title: 'Editorial & Engineering Inquiries',
    slug: 'contact',
    body: `<h2>Direct Communication Channels</h2>
<p>We welcome technical peer reviews, vulnerability disclosures, and commercial licensing inquiries. Reach out directly to our editorial and engineering desks.</p>

<div class="contact-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin: 24px 0;">
  <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 12px;">
    <h4 style="margin: 0 0 6px 0; font-size: 14px; color: #0f172a; font-weight: bold;">San Francisco Technology Bureau</h4>
    <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.5;">548 Market St, Suite 89201<br>San Francisco, CA 94104<br>Phone: +1 (415) 890-4820</p>
  </div>
  <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 12px;">
    <h4 style="margin: 0 0 6px 0; font-size: 14px; color: #0f172a; font-weight: bold;">London Engineering Centre</h4>
    <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.5;">25 Christopher St, Shoreditch<br>London EC2A 2BS, United Kingdom<br>Phone: +44 20 7946 0912</p>
  </div>
  <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 12px;">
    <h4 style="margin: 0 0 6px 0; font-size: 14px; color: #0f172a; font-weight: bold;">Operational Desks</h4>
    <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.5;">Editorial: dispatch@apexcms.internal<br>Security: security@apexcms.internal<br>Hours: 08:00 – 18:00 UTC (Mon–Fri)</p>
  </div>
</div>`,
    template: 'contact',
    status: 'published',
    updatedAt: '2026-11-06',
    seoTitle: 'Contact Editorial & Engineering Desks | ApexCMS',
    seoDescription: 'Direct contact information, physical bureaus in San Francisco and London, and inquiry form with bot protection.',
    seoFocusKeyword: 'contact ApexCMS'
  }
];

export const initialProducts: Product[] = [
  {
    id: 101,
    title: 'ApexCMS Developer License & Enterprise Add-ons',
    slug: 'apexcms-developer-license',
    sku: 'APX-DEV-001',
    type: 'digital',
    price: 149.00,
    salePrice: 99.00,
    stock: 9999,
    category: 'Software & Tools',
    description: 'Lifetime commercial license including full source code, unlimited domains, automated database migrations, and priority security updates.',
    features: [
      'Full standalone PHP 8.2+ source code with no licensing phone-home',
      'Unlimited client website deployments with zero recurring royalties',
      'Automated schema migrations and instant rollback snapshots',
      'Integrated AI SEO, GEO, and AEO optimization assistant'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    downloadLimit: 10,
    downloadExpiryDays: 30,
    status: 'published',
    seoTitle: 'ApexCMS Enterprise Developer License',
    seoDescription: 'Get the complete, unminified standalone ApexCMS PHP 8.2+ source code and build blazing fast client websites today.',
    seoFocusKeyword: 'ApexCMS license',
    geo: {
      region: 'Worldwide Digital License',
      currency: 'USD'
    },
    aeo: {
      directAnswer: 'The ApexCMS Developer License grants perpetual, royalty-free commercial rights to deploy unlimited self-hosted instances with full access to unminified PHP 8.2+ source code.',
      pricingSummary: 'One-time investment of $99 (discounted from $149) with zero subscription fees.'
    }
  },
  {
    id: 102,
    title: 'Precision Mechanical Development Keyboard',
    slug: 'precision-mechanical-keyboard',
    sku: 'APX-HW-KEY87',
    type: 'physical',
    price: 189.00,
    stock: 24,
    category: 'Hardware',
    description: 'CNC machined anodized aluminum chassis, hot-swappable tactile switches, and zero-latency USB-C micro-controller firmware.',
    features: [
      'Gasket mounted anodized 6063 aerospace aluminum case',
      'Hot-swappable 5-pin PCB with south-facing RGB and QMK/VIA support',
      'Factory-lubricated tactile mechanical switches',
      'Custom braided USB-C paracord cable included'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    status: 'published',
    seoTitle: 'Precision Mechanical Keyboard for Engineers',
    seoDescription: 'Tactile, hot-swappable mechanical keyboard built for ultra-fast typing and maximum ergonomic comfort.',
    seoFocusKeyword: 'mechanical development keyboard',
    geo: {
      region: 'North America, Europe, Asia-Pacific Shipping',
      currency: 'USD'
    },
    aeo: {
      directAnswer: 'The Apex Mechanical Keyboard is a developer-focused mechanical keyboard featuring a CNC aluminum body, hot-swappable switches, and zero-latency QMK/VIA firmware.',
      pricingSummary: 'Available for $189 with direct 2-day domestic courier dispatch.'
    }
  },
  {
    id: 103,
    title: 'The Full-Stack Performance Engineering Manual',
    slug: 'performance-engineering-manual',
    sku: 'APX-BOOK-PERF',
    type: 'digital',
    price: 49.00,
    salePrice: 29.00,
    stock: 5000,
    category: 'Books & Guides',
    description: 'Comprehensive 420-page architectural blueprint covering database indexing, opcode caching, HTTP/2 multiplexing, and CSS optimization.',
    features: [
      '420-page DRM-free PDF, EPUB, and Kindle formats',
      'Production benchmarks and copy-paste Nginx/Apache configuration snippets',
      'In-depth guide to passing Google Core Web Vitals and eliminating CLS'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    downloadLimit: 5,
    downloadExpiryDays: 14,
    status: 'published',
    seoTitle: 'Full-Stack Performance Engineering Book',
    seoDescription: 'Master web performance from low-level Linux tuning to front-end critical CSS rendering.',
    seoFocusKeyword: 'performance engineering manual'
  }
];

export const initialMenus: MenuItem[] = [
  { id: 'm1', label: 'Home', url: '/', order: 1, location: 'header' },
  { id: 'm2', label: 'Technical Essays', url: '/#articles', order: 2, location: 'header' },
  { id: 'm3', label: 'Store Catalog', url: '/#store', order: 3, location: 'header', isShopOnly: true },
  { id: 'm4', label: 'About Engine', url: '/page/about-apex-engine', order: 4, location: 'header' },
  { id: 'm5', label: 'Support & SLA', url: '/page/enterprise-support-sla', order: 5, location: 'header' },
  { id: 'm6', label: 'Contact', url: '/page/contact', order: 6, location: 'header' },
  { id: 'f1', label: 'XML Sitemap', url: '/sitemap.xml', order: 1, location: 'footer' },
  { id: 'f2', label: 'Robots Directives', url: '/robots.txt', order: 2, location: 'footer' },
  { id: 'f3', label: 'RSS Newsfeed', url: '/feed', order: 3, location: 'footer' }
];

export const initialEmailSettings: EmailSettings = {
  driver: 'smtp',
  // Full SMTP Relay Configuration
  fromName: 'ApexCMS Notifications',
  fromEmail: 'dispatch@apexcms.internal',
  smtpHost: 'smtp.sendgrid.net',
  smtpPort: 587,
  smtpUsername: 'apikey',
  smtpPassword: 'SG.x9821_production_secret_key',
  smtpEncryption: 'tls',
  smtpAuth: true,
  smtpTimeout: 30,
  // phpmail & Form Submissions Routing
  recipientEmail: 'inquiries@apexcms.internal',
  subjectPrefix: '[ApexCMS Inquiry]',
  sendmailPath: '/usr/sbin/sendmail -t -i',
  autoresponderEnabled: true,
  autoresponderSubject: 'Thank you for reaching out - Inquiry Received'
};

export const initialFormSubmissions: FormSubmission[] = [
  {
    id: 101,
    formName: 'General Contact',
    name: 'Marcus Vance',
    email: 'm.vance@vancetech.io',
    subject: 'Enterprise Architecture Consultation',
    recipientEmail: 'inquiries@apexcms.internal',
    driverUsed: 'smtp',
    message: 'We are evaluating ApexCMS for our enterprise digital publishing network. We require custom RBAC and high-throughput Redis caching specs.',
    submittedAt: '2026-11-06 14:22:10',
    ip: '198.51.100.42'
  },
  {
    id: 102,
    formName: 'Store Inquiry',
    name: 'Elena Rostova',
    email: 'elena@rostovadesign.de',
    subject: 'Custom Digital Assets Licensing Inquiry',
    recipientEmail: 'inquiries@apexcms.internal',
    driverUsed: 'phpmail',
    message: 'Can the commercial license bundle be transferred between our staging and production multi-tenant domains?',
    submittedAt: '2026-11-05 09:14:35',
    ip: '203.0.113.19'
  }
];

export const initialBackups: BackupSnapshot[] = [
  {
    id: 'BKP-20261105-01',
    name: 'Production Auto-Snapshot (v1.0.0 Baseline)',
    date: '2026-11-05 08:30:00',
    size: '43.2 KB',
    type: 'full',
    checksum: 'sha256:8f42d99c71a39b2e',
    isRollbackSafe: true
  },
  {
    id: 'BKP-20261102-01',
    name: 'Pre-Migration Database Dump',
    date: '2026-11-02 14:15:00',
    size: '22.8 KB',
    type: 'database',
    checksum: 'sha256:e1a9032ff481b76c',
    isRollbackSafe: true
  }
];

export const initialThemes: ThemeConfig[] = [
  {
    id: 'light_editorial',
    name: 'Apex Light Editorial (Default)',
    author: 'Apex Design Lab',
    version: '1.3.0',
    description: 'Clean, high-contrast, modern light mode theme built for exceptional reading comfort, 100/100 Lighthouse score, and zero layout shift.',
    accentColor: '#2563eb',
    style: 'magazine',
    isDarkByDefault: false
  },
  {
    id: 'modern_storefront',
    name: 'Storefront Pro (Light Commerce)',
    author: 'Apex Commerce Team',
    version: '1.2.0',
    description: 'High-conversion e-commerce layout featuring prominent product cards, instant badge indicators, and integrated checkout drawers.',
    accentColor: '#059669',
    style: 'storefront',
    isDarkByDefault: false
  },
  {
    id: 'obsidian_dark',
    name: 'Obsidian Magazine (Dark Mode)',
    author: 'Apex Dark Labs',
    version: '1.1.0',
    description: 'Deep navy-and-slate dark palette for nocturnal reading and developer communities.',
    accentColor: '#38bdf8',
    style: 'magazine',
    isDarkByDefault: true
  }
];

export const initialBlocks: HomepageBlock[] = [
  {
    id: 'block_hero',
    type: 'hero',
    enabled: true,
    settings: {
      title: 'High-Velocity Publishing & Modular Micro-Commerce',
      subtitle: 'Crafted for software engineers, technical researchers, and independent publishers demanding strict Core Web Vitals (CLS=0), automated JSON-LD schemas, and secure tokenized file delivery.',
      cta_text: 'Read Featured Essays',
      cta_link: '#featured-posts',
      secondary_cta_text: 'Explore Active Tools',
      secondary_cta_link: '#featured-tools',
      badge_text: 'EDITION 2026 • STRICT PHP 8.2+ MVC • ZERO RUNTIME BLOAT'
    }
  },
  {
    id: 'block_posts',
    type: 'featured_posts',
    enabled: true,
    settings: {
      title: 'Featured Technical Essays & Field Dispatches',
      subtitle: 'Verified architectural analyses, system blueprints, and edge caching guides',
      limit: 3
    }
  },
  {
    id: 'block_tools',
    type: 'featured_tools',
    enabled: true,
    settings: {
      title: 'Featured Tools & Extensible Plugin Architecture',
      subtitle: 'Hook-driven plugin ecosystem running on isolated actions and filters',
      show_sandbox: true
    }
  },
  {
    id: 'block_shop',
    type: 'featured_products',
    enabled: true,
    settings: {
      title: 'Curated Hardware & Developer Licenses',
      subtitle: 'Instant tokenized deliveries, physical inventory dispatch, and pluggable payment drivers',
      limit: 3
    }
  },
  {
    id: 'block_cta',
    type: 'cta',
    enabled: true,
    settings: {
      title: 'Ready to Deploy Your Own Autonomous Publishing Hub?',
      subtitle: 'Self-hosted, database-agnostic (MySQL or SQLite), with automated database migrations and zero monthly vendor lock-in.',
      cta_text: 'Inspect Standalone Source Code',
      cta_link: '#install',
      accent: 'emerald'
    }
  },
  {
    id: 'block_faq',
    type: 'faq',
    enabled: true,
    settings: {
      title: 'Frequently Answered Questions',
      items: [
        {
          q: 'How does the optional shop toggle function?',
          a: 'When "Enable Shop" is turned off in Settings > Shop, all e-commerce routes (/shop, /product/*, /cart, /checkout) return 404, shop blocks are hidden, and the site functions purely as an ultra-fast blog.'
        },
        {
          q: 'How does the built-in Math Captcha prevent bot spam?',
          a: 'The captcha mixes numbers and natural language words (e.g. "seven + 4 = ?"), validates entirely on the server using single-use session tokens, and requires zero third-party script bloat.'
        },
        {
          q: 'How does the AI SEO, GEO, and AEO Assistant work?',
          a: 'It uses Google Gemini to generate high-ranking SEO titles, local GEO targeting entities (coordinates & schema), and AEO conversational answer engine formats for Perplexity, ChatGPT, and Google SGE.'
        },
        {
          q: 'How does the automated AI Search Manifest (llms.txt) benefit SEO?',
          a: 'Modern AI engines (ChatGPT Search, Perplexity, Claude, Applebot) parse /llms.txt to ingest verified machine-readable markdown entities, improving direct snippet citations.'
        }
      ]
    }
  },
  {
    id: 'block_newsletter',
    type: 'newsletter',
    enabled: true,
    settings: {
      title: 'Subscribe to Systems Engineering Dispatch',
      subtitle: 'Bi-weekly technical breakdowns on high-scale web architecture, SEO optimization, and software performance.'
    }
  }
];

export const initialOrders: Order[] = [
  {
    id: 'ORD-9842',
    customerName: 'Sarah Jenkins',
    customerEmail: 'sarah.j@example.com',
    items: [
      { productId: 101, title: 'ApexCMS Developer License & Enterprise Add-ons', sku: 'APX-DEV-001', price: 99.00, quantity: 1, downloadToken: 'tok_sec_9842a' }
    ],
    subtotal: 99.00,
    tax: 0.00,
    shipping: 0.00,
    total: 99.00,
    paymentMethod: 'stripe',
    paymentStatus: 'paid',
    orderStatus: 'completed',
    notes: 'Commercial license key delivered automatically via email.',
    createdAt: '2026-11-06 14:32'
  },
  {
    id: 'ORD-9841',
    customerName: 'Marcus Vance',
    customerEmail: 'm.vance@techcorp.io',
    items: [
      { productId: 102, title: 'Precision Mechanical Development Keyboard', sku: 'APX-HW-KEY87', price: 189.00, quantity: 1 }
    ],
    subtotal: 189.00,
    tax: 15.12,
    shipping: 12.00,
    total: 216.12,
    paymentMethod: 'paypal',
    paymentStatus: 'paid',
    orderStatus: 'processing',
    notes: 'Dispatched via DHL Express Tracking #948291048.',
    createdAt: '2026-11-06 11:15'
  },
  {
    id: 'ORD-9840',
    customerName: 'Aarav Patel',
    customerEmail: 'aarav.patel@delhitech.in',
    items: [
      { productId: 103, title: 'The Full-Stack Performance Engineering Manual', sku: 'APX-BOOK-PERF', price: 29.00, quantity: 1, downloadToken: 'tok_dl_rzp9840' }
    ],
    subtotal: 29.00,
    tax: 0.00,
    shipping: 0.00,
    total: 29.00,
    paymentMethod: 'razorpay',
    paymentStatus: 'paid',
    orderStatus: 'completed',
    notes: 'Verified via Razorpay UPI Instant Settlement (Payment ID: pay_PZ8921894).',
    createdAt: '2026-11-06 09:40'
  }
];

export const initialSeoMedia: SeoMediaAssets = {
  siteLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&h=120&q=80',
  favicon: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=64&h=64&q=80',
  ogImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&h=630&q=80',
  twitterCardType: 'summary_large_image',
  logoAlt: 'The Architectural Dispatch • ApexCMS'
};

export const initialSiteIntegrations: SiteIntegrations = {
  googleAnalyticsId: 'G-7XYZ982KLM',
  googleAdSenseId: 'ca-pub-8492019482019482',
  bingWebmasterCode: '9A4F7D8E2B1C5E0A9D8F7C6B5A4E3D2C',
  customHeadCode: '<!-- Production Preconnect & Critical Font Optimization -->\n<link rel="preconnect" href="https://fonts.googleapis.com">\n<meta name="theme-color" content="#18181b">',
  customBodyOpenCode: '<!-- Google Tag Manager (noscript fallback) -->\n<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-DEMO" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>',
  customBodyFooterCode: '<!-- ApexCMS Edge Real-Time Performance Beacon -->\n<script>window.__APEX_EDGE_BEACON__ = { version: "1.0.0", latencyMs: 18, edgePop: "SFO1" };</script>',
  geminiApiKey: 'MY_GEMINI_API_KEY',
  aiModel: 'gemini-3.8-flash',
  aiTemperature: 0.7
};

export const initialPaymentGateways: PaymentGatewaySettings = {
  stripe: {
    enabled: true,
    publishableKey: 'pk_live_51PZ8290exampleStripeKey',
    secretKey: '••••••••••••••••••••••••••••••••',
    webhookSecret: 'whsec_••••••••••••••••',
    currency: 'USD'
  },
  paypal: {
    enabled: true,
    clientId: 'Aef9823kjsdkfj_paypal_client_id',
    clientSecret: '••••••••••••••••••••••••••••••••',
    mode: 'live',
    currency: 'USD'
  },
  razorpay: {
    enabled: true,
    keyId: 'rzp_live_K892019840291',
    keySecret: '••••••••••••••••••••••••••••••••',
    currency: 'INR'
  },
  cod: {
    enabled: true,
    instructions: 'Direct corporate invoice wire transfer or cash settlement on courier arrival.'
  }
};

export const initialRedirects: RedirectRule[] = [
  { id: 1, source: '/old-core-vitals-guide', target: '/post/architecting-for-100-core-web-vitals', statusCode: 301, hits: 412 },
  { id: 2, source: '/store/software', target: '/shop', statusCode: 301, hits: 184 },
  { id: 3, source: '/legacy-feed.rss', target: '/feed', statusCode: 301, hits: 89 }
];

export const initialTools: ToolPlugin[] = [
  {
    id: 'hindu-panchang-calculator',
    name: 'Indian Vrat & Festival Panchang Calculator',
    version: '1.0.0',
    author: 'ApexCore Astronomy Engine',
    description: 'Astronomical date converter: Shaka/Vikram Samvat to English Gregorian, accurate Tithi start/end timings, local sunrise/sunset/moonrise, and major festivals across 80+ cities worldwide.',
    enabled: true
  },
  {
    id: 'reading-time',
    name: 'Reading Time Calculator',
    version: '1.0.0',
    author: 'ApexCore',
    description: 'Calculates read time at 200 WPM and injects an accessible badge before content.',
    enabled: true
  },
  {
    id: 'table-of-contents',
    name: 'Accessible Table of Contents',
    version: '1.0.0',
    author: 'ApexCore',
    description: 'Scans H2/H3 tags and renders an anchor-linked hierarchy box.',
    enabled: true
  },
  {
    id: 'related-posts',
    name: 'Semantic Related Posts',
    version: '1.0.0',
    author: 'ApexCore',
    description: 'Dynamically recommends related articles based on category and tags.',
    enabled: true
  }
];

export const inspectableFiles = [
  { path: 'core/Router.php', name: 'Router.php', category: 'Core Engine' },
  { path: 'core/Database.php', name: 'Database.php', category: 'Core Engine' },
  { path: 'core/View.php', name: 'View.php (Template Resolver)', category: 'Core Engine' },
  { path: 'core/Hook.php', name: 'Hook.php (Events)', category: 'Core Engine' },
  { path: 'core/Security.php', name: 'Security.php', category: 'Core Engine' },
  { path: 'core/Sanitizer.php', name: 'Sanitizer.php', category: 'Core Engine' },
  { path: 'admin/views/admin_dashboard.php', name: 'admin_dashboard.php (Admin Panel)', category: 'Admin Suite' },
  { path: 'app/Controllers/Admin/DashboardController.php', name: 'DashboardController.php', category: 'Admin Suite' },
  { path: 'app/Controllers/HomeController.php', name: 'HomeController.php', category: 'Controllers' },
  { path: 'app/Controllers/ShopController.php', name: 'ShopController.php', category: 'Controllers' },
  { path: 'plugins/hindu-panchang/tool.json', name: 'tool.json (Panchang Calculator)', category: 'Plugins' },
  { path: 'plugins/reading-time/tool.json', name: 'tool.json (Reading Time)', category: 'Plugins' },
  { path: 'app/Services/SeoService.php', name: 'SeoService.php', category: 'Services' },
  { path: 'app/Services/MailService.php', name: 'MailService.php', category: 'Services' },
  { path: 'database/schema.sql', name: 'schema.sql (MySQL/InnoDB)', category: 'Database' },
  { path: 'install/index.php', name: 'index.php (Web Installer)', category: 'Installer' },
  { path: 'index.php', name: 'index.php (cPanel Root Bootstrap)', category: 'Server Config' },
  { path: '.htaccess', name: '.htaccess (Apache / cPanel Root)', category: 'Server Config' },
  { path: 'public/.htaccess', name: 'public/.htaccess (Web Root Rewrite)', category: 'Server Config' },
  { path: 'admin/index.php', name: 'admin/index.php (Admin Bridge)', category: 'Admin Suite' },
  { path: 'admin/.htaccess', name: 'admin/.htaccess (Admin Rewrite Rules)', category: 'Admin Suite' },
  { path: 'install/.htaccess', name: 'install/.htaccess (Installer Auth Rules)', category: 'Installer' },
  { path: 'nginx.conf', name: 'nginx.conf (Nginx)', category: 'Server Config' },
  { path: 'composer.json', name: 'composer.json', category: 'Packaging' },
  { path: 'README.md', name: 'README.md', category: 'Docs' }
];
