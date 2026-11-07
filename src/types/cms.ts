export type Role = 'admin' | 'editor' | 'user';

export interface User {
  id: number;
  username: string;
  email: string;
  role: Role;
  status: 'active' | 'pending' | 'banned';
}

export interface GeoData {
  region?: string;
  city?: string;
  lat?: string;
  lng?: string;
  schemaPlace?: string;
  currency?: string;
}

export interface AeoData {
  directAnswer?: string;
  keyTakeaways?: string[];
  conversationalFaq?: { q: string; a: string }[];
  pricingSummary?: string;
  comparativeAdvantage?: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  author: string;
  category: string;
  tags: string[];
  status: 'published' | 'draft' | 'scheduled';
  publishedAt: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  views: number;
  // SEO
  seoTitle?: string;
  seoDescription?: string;
  seoFocusKeyword?: string;
  seoCanonical?: string;
  seoRobots?: string;
  // GEO (Local & Regional Targeting)
  geo?: GeoData;
  // AEO (Answer Engine Optimization for Perplexity, ChatGPT, SGE)
  aeo?: AeoData;
}

export interface Page {
  id: number;
  title: string;
  slug: string;
  body: string;
  template: 'default' | 'fullwidth' | 'contact' | 'landing';
  status: 'published' | 'draft';
  updatedAt: string;
  seoTitle?: string;
  seoDescription?: string;
  seoFocusKeyword?: string;
  geo?: GeoData;
  aeo?: AeoData;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  sku: string;
  type: 'physical' | 'digital';
  price: number;
  salePrice?: number;
  stock: number;
  category: string;
  description: string;
  features?: string[];
  featuredImage: string;
  downloadLimit?: number;
  downloadExpiryDays?: number;
  status: 'published' | 'draft';
  seoTitle?: string;
  seoDescription?: string;
  seoFocusKeyword?: string;
  geo?: GeoData;
  aeo?: AeoData;
}

export interface MenuItem {
  id: string;
  label: string;
  url: string;
  target?: '_self' | '_blank';
  order: number;
  location: 'header' | 'footer';
  isShopOnly?: boolean;
}

export interface HomepageBlock {
  id: string;
  type: 'hero' | 'featured_posts' | 'featured_tools' | 'featured_products' | 'text_image' | 'cta' | 'faq' | 'newsletter' | 'custom_code';
  enabled: boolean;
  settings: Record<string, any>;
}

export interface OrderItem {
  productId: number;
  title: string;
  sku: string;
  price: number;
  quantity: number;
  downloadToken?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  paymentMethod: 'stripe' | 'paypal' | 'razorpay' | 'cod';
  paymentStatus: 'paid' | 'pending' | 'refunded';
  orderStatus: 'processing' | 'completed' | 'cancelled' | 'refunded';
  notes?: string;
  createdAt: string;
}

export interface SeoMediaAssets {
  siteLogo: string;
  favicon: string;
  ogImage: string;
  twitterCardType: 'summary' | 'summary_large_image';
  logoAlt: string;
}

export interface SiteIntegrations {
  googleAnalyticsId: string;
  googleAdSenseId: string;
  bingWebmasterCode: string;
  customHeadCode: string;
  customBodyOpenCode: string;
  customBodyFooterCode: string;
  geminiApiKey: string;
  aiModel: string;
  aiTemperature: number;
}

export interface PaymentGatewaySettings {
  stripe: {
    enabled: boolean;
    publishableKey: string;
    secretKey: string;
    webhookSecret: string;
    currency: string;
  };
  paypal: {
    enabled: boolean;
    clientId: string;
    clientSecret: string;
    mode: 'sandbox' | 'live';
    currency: string;
  };
  razorpay: {
    enabled: boolean;
    keyId: string;
    keySecret: string;
    currency: string;
  };
  cod: {
    enabled: boolean;
    instructions: string;
  };
}

export interface RedirectRule {
  id: number;
  source: string;
  target: string;
  statusCode: 301 | 302 | 410;
  hits: number;
}

export interface FormSubmission {
  id: number;
  formName: string;
  name: string;
  email: string;
  subject: string;
  recipientEmail: string;
  driverUsed: 'phpmail' | 'smtp';
  message: string;
  submittedAt: string;
  ip: string;
}

export interface ToolPlugin {
  id: string;
  name: string;
  version: string;
  author: string;
  description: string;
  enabled: boolean;
  settings?: Record<string, any>;
}

export interface ThemeConfig {
  id: string;
  name: string;
  author: string;
  version: string;
  description: string;
  accentColor: string;
  style: 'magazine' | 'storefront';
  isDarkByDefault: boolean;
}

export interface EmailSettings {
  driver: 'phpmail' | 'smtp';
  // Full SMTP Configuration
  fromName: string;
  fromEmail: string;
  smtpHost: string;
  smtpPort: number;
  smtpUsername: string;
  smtpPassword?: string;
  smtpEncryption: 'tls' | 'ssl' | 'none';
  smtpAuth: boolean;
  smtpTimeout?: number;
  // phpmail & Form Submissions Routing
  recipientEmail: string;
  subjectPrefix: string;
  sendmailPath?: string;
  autoresponderEnabled?: boolean;
  autoresponderSubject?: string;
}

export interface BackupSnapshot {
  id: string;
  name: string;
  date: string;
  size: string;
  type: 'full' | 'database' | 'media';
  checksum: string;
  isRollbackSafe: boolean;
}
