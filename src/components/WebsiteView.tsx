import React, { useState, useMemo } from 'react';
import { Post, Page, Product, HomepageBlock, ToolPlugin, MenuItem, SeoMediaAssets, PaymentGatewaySettings, EmailSettings, FormSubmission } from '../types/cms';
import { HinduPanchangTool } from './HinduPanchangTool';
import {
  ShoppingBag,
  Clock,
  BookOpen,
  CheckCircle,
  ChevronDown,
  Send,
  ShieldAlert,
  ArrowRight,
  X,
  Check,
  MapPin,
  Sparkles,
  Phone,
  Mail,
  Building,
  Edit3,
  Layers,
  Wrench,
  RefreshCw,
  AlertTriangle,
  ArrowUpRight,
  Plus,
  CreditCard,
  QrCode,
  Sliders,
  Eye,
  Trash2
} from 'lucide-react';

interface WebsiteViewProps {
  posts: Post[];
  pages: Page[];
  products: Product[];
  blocks: HomepageBlock[];
  setBlocks?: React.Dispatch<React.SetStateAction<HomepageBlock[]>>;
  tools: ToolPlugin[];
  menus: MenuItem[];
  shopEnabled: boolean;
  activeTheme: 'magazine' | 'storefront';
  locale: string;
  isDarkMode: boolean;
  seoMedia?: SeoMediaAssets;
  paymentGateways?: PaymentGatewaySettings;
  cart: { product: Product; quantity: number }[];
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (productId: number) => void;
  onOpenCheckout: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  onCompleteOrder: (details: any) => void;
  onNavigateToAdmin?: (
    tab?: 'dashboard' | 'posts' | 'pages' | 'products' | 'orders' | 'blocks' | 'menus' | 'email' | 'seo' | 'integrations' | 'themes' | 'tools' | 'backups' | 'settings',
    editPageId?: number
  ) => void;
  emailSettings?: EmailSettings;
  onContactSubmit?: (submission: FormSubmission) => void;
}

export const WebsiteView: React.FC<WebsiteViewProps> = ({
  posts,
  pages,
  products,
  blocks,
  setBlocks,
  tools,
  menus,
  shopEnabled,
  activeTheme,
  locale,
  isDarkMode,
  seoMedia,
  paymentGateways,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onOpenCheckout,
  isCartOpen,
  setIsCartOpen,
  isCheckoutOpen,
  setIsCheckoutOpen,
  onCompleteOrder,
  onNavigateToAdmin,
  emailSettings,
  onContactSubmit
}) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Homepage Builder & Section Editor State
  const [builderMode, setBuilderMode] = useState(false);
  const [editingBlock, setEditingBlock] = useState<HomepageBlock | null>(null);
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [showPanchangModal, setShowPanchangModal] = useState(false);

  // Math Captcha Pairs in Numbers + Words (e.g., "seven + 4 = 11", "eight + 5 = 13", "six + 7 = 13")
  const captchaChallenges = useMemo(() => [
    { word: 'seven', num: 4, sum: 11, text: 'seven + 4' },
    { word: 'eight', num: 5, sum: 13, text: 'eight + 5' },
    { word: 'six', num: 7, sum: 13, text: 'six + 7' },
    { word: 'nine', num: 3, sum: 12, text: 'nine + 3' },
    { word: 'four', num: 8, sum: 12, text: 'four + 8' },
    { word: 'five', num: 6, sum: 11, text: 'five + 6' }
  ], []);

  // Contact Form State
  const [contactCaptchaIndex, setContactCaptchaIndex] = useState(0);
  const [contactCaptchaAnswer, setContactCaptchaAnswer] = useState('');
  const [contactCaptchaError, setContactCaptchaError] = useState(false);
  const [contactHoneypot, setContactHoneypot] = useState('');
  const [contactFormSuccess, setContactFormSuccess] = useState(false);
  const [contactBotDetected, setContactBotDetected] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('General Inquiry');
  const [contactMsg, setContactMsg] = useState('');
  const [lastSubmissionDetails, setLastSubmissionDetails] = useState<{
    recipient: string;
    subject: string;
    driver: 'phpmail' | 'smtp';
  } | null>(null);

  // Newsletter Form State
  const [nlCaptchaIndex, setNlCaptchaIndex] = useState(1);
  const [nlCaptchaAnswer, setNlCaptchaAnswer] = useState('');
  const [nlCaptchaError, setNlCaptchaError] = useState(false);
  const [nlHoneypot, setNlHoneypot] = useState('');
  const [nlEmail, setNlEmail] = useState('');
  const [nlSuccess, setNlSuccess] = useState(false);
  const [nlBotDetected, setNlBotDetected] = useState(false);

  // Interactive Tools Showcase Sandbox State
  const [sandboxText, setSandboxText] = useState('ApexCMS delivers sub-25 millisecond time-to-first-byte with zero layout shift and clean PHP 8.2 architecture.');
  const [sandboxWpm, setSandboxWpm] = useState(200);

  // Cookie Consent banner state
  const [cookieConsent, setCookieConsent] = useState<'pending' | 'accepted' | 'declined'>('pending');

  // Checkout form state with Razorpay Support
  const [custName, setCustName] = useState('');
  const [custEmail, setCustEmail] = useState('');
  const [payMethod, setPayMethod] = useState<'stripe' | 'paypal' | 'razorpay' | 'cod'>('stripe');
  const [razorpayUpiId, setRazorpayUpiId] = useState('');
  const [orderDone, setOrderDone] = useState(false);

  // Tool status queries
  const readingTimeTool = tools.find((t) => t.id === 'reading-time');
  const isReadingTimeEnabled = readingTimeTool?.enabled ?? true;

  const tocTool = tools.find((t) => t.id === 'table-of-contents');
  const isTocEnabled = tocTool?.enabled ?? true;

  const relatedPostsTool = tools.find((t) => t.id === 'related-posts');
  const isRelatedPostsEnabled = relatedPostsTool?.enabled ?? true;

  const headerMenus = menus
    .filter((m) => m.location === 'header' && (!m.isShopOnly || shopEnabled))
    .sort((a, b) => a.order - b.order);

  const footerMenus = menus
    .filter((m) => m.location === 'footer')
    .sort((a, b) => a.order - b.order);

  // Translation dictionary including Russian (ru)
  const translations: Record<string, Record<string, string>> = {
    en: {
      readTime: 'min read',
      readEssay: 'Read Full Analysis',
      addToCart: 'Add to Cart',
      secureCheckout: 'Proceed to Secure Checkout',
      orderSummary: 'Order Summary',
      sendMsg: 'Transmit Message',
      essentialOnly: 'Essential Only',
      acceptAll: 'Accept All',
      procureItem: 'Procure Item',
      activeInCore: 'ACTIVE IN CORE',
      disabled: 'DISABLED',
      humanVerification: 'Human Verification: Math in Words & Numbers'
    },
    ru: {
      readTime: 'мин чтения',
      readEssay: 'Читать материал',
      addToCart: 'В корзину',
      secureCheckout: 'Перейти к защищенной оплате',
      orderSummary: 'Детали заказа',
      sendMsg: 'Отправить сообщение',
      essentialOnly: 'Только обязательные',
      acceptAll: 'Принять все',
      procureItem: 'Оформить заказ',
      activeInCore: 'АКТИВЕН В ЯДРЕ',
      disabled: 'ОТКЛЮЧЕН',
      humanVerification: 'Проверка: решите пример словами и числами'
    },
    es: {
      readTime: 'min de lectura',
      readEssay: 'Leer análisis completo',
      addToCart: 'Añadir al carrito',
      secureCheckout: 'Proceder al pago seguro',
      orderSummary: 'Resumen del pedido',
      sendMsg: 'Transmitir mensaje',
      essentialOnly: 'Solo esenciales',
      acceptAll: 'Aceptar todo',
      procureItem: 'Adquirir producto',
      activeInCore: 'ACTIVO EN EL NÚCLEO',
      disabled: 'DESACTIVADO',
      humanVerification: 'Verificación humana: Matemáticas en palabras y números'
    },
    fr: {
      readTime: 'min de lecture',
      readEssay: 'Lire l\'analyse complète',
      addToCart: 'Ajouter au panier',
      secureCheckout: 'Passer au paiement sécurisé',
      orderSummary: 'Résumé de commande',
      sendMsg: 'Transmettre le message',
      essentialOnly: 'Essentiel seulement',
      acceptAll: 'Tout accepter',
      procureItem: 'Commander l\'article',
      activeInCore: 'ACTIF DANS LE NOYAU',
      disabled: 'DÉSACTIVÉ',
      humanVerification: 'Vérification humaine : calcul en mots et chiffres'
    },
    de: {
      readTime: 'Min Lesezeit',
      readEssay: 'Vollständige Analyse lesen',
      addToCart: 'In den Warenkorb',
      secureCheckout: 'Zur sicheren Kasse',
      orderSummary: 'Bestellübersicht',
      sendMsg: 'Nachricht übermitteln',
      essentialOnly: 'Nur essenziell',
      acceptAll: 'Alle akzeptieren',
      procureItem: 'Artikel beschaffen',
      activeInCore: 'AKTIV IM KERN',
      disabled: 'DEAKTIVIERT',
      humanVerification: 'Menschliche Überprüfung: Mathe in Worten und Zahlen'
    },
    ja: {
      readTime: '分で読める',
      readEssay: '全文を読む',
      addToCart: 'カートに追加',
      secureCheckout: '安全なレジに進む',
      orderSummary: 'ご注文概要',
      sendMsg: 'メッセージを送信',
      essentialOnly: '必要最小限のみ',
      acceptAll: 'すべて同意',
      procureItem: '購入する',
      activeInCore: 'コアで有効',
      disabled: '無効',
      humanVerification: '人間認証: 言葉と数字の計算'
    },
    ar: {
      readTime: 'دقائق قراءة',
      readEssay: 'قراءة التحليل كاملاً',
      addToCart: 'أضف إلى السلة',
      secureCheckout: 'متابعة الدفع الآمن',
      orderSummary: 'ملخص الطلب',
      sendMsg: 'إرسال الرسالة',
      essentialOnly: 'الضروري فقط',
      acceptAll: 'قبول الكل',
      procureItem: 'طلب العنصر',
      activeInCore: 'نشط في النواة',
      disabled: 'معطل',
      humanVerification: 'التحقق البشري: حساب بالكلمات والأرقام'
    }
  };

  const t = translations[locale] || translations.en;
  const isRtl = locale === 'ar';

  // Calculate Reading Time Helper
  const calculateReadTime = (text: string, wpm = 180) => {
    const words = text.replace(/<[^>]*>/g, '').trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / wpm));
  };

  // Contact Form Submission with Honeypot & Math Captcha
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (contactHoneypot.trim() !== '') {
      setContactBotDetected(true);
      return;
    }

    const currentChallenge = captchaChallenges[contactCaptchaIndex];
    if (parseInt(contactCaptchaAnswer.trim(), 10) !== currentChallenge.sum) {
      setContactCaptchaError(true);
      return;
    }

    setContactCaptchaError(false);
    setContactBotDetected(false);

    const targetRecipient = emailSettings?.recipientEmail || 'inquiries@apexcms.internal';
    const targetSubject = `${emailSettings?.subjectPrefix || '[ApexCMS Inquiry]'} ${contactSubject || 'General Inquiry'}`;
    const transportDriver = emailSettings?.driver || 'smtp';

    const newSub: FormSubmission = {
      id: Date.now(),
      formName: 'General Contact',
      name: contactName || 'Visitor',
      email: contactEmail || 'visitor@example.com',
      subject: targetSubject,
      recipientEmail: targetRecipient,
      driverUsed: transportDriver,
      message: contactMsg || '(No message content)',
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      ip: '198.51.100.22'
    };

    onContactSubmit?.(newSub);
    setLastSubmissionDetails({
      recipient: targetRecipient,
      subject: targetSubject,
      driver: transportDriver
    });
    setContactFormSuccess(true);

    setTimeout(() => {
      setContactName('');
      setContactEmail('');
      setContactMsg('');
      setContactCaptchaAnswer('');
      setContactFormSuccess(false);
      setContactCaptchaIndex((prev) => (prev + 1) % captchaChallenges.length);
    }, 6000);
  };

  // Newsletter Form Submission with Honeypot & Math Captcha
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (nlHoneypot.trim() !== '') {
      setNlBotDetected(true);
      return;
    }

    const challenge = captchaChallenges[nlCaptchaIndex];
    if (parseInt(nlCaptchaAnswer.trim(), 10) !== challenge.sum) {
      setNlCaptchaError(true);
      return;
    }

    setNlCaptchaError(false);
    setNlBotDetected(false);
    setNlSuccess(true);

    setTimeout(() => {
      setNlEmail('');
      setNlCaptchaAnswer('');
      setNlSuccess(false);
      setNlCaptchaIndex((prev) => (prev + 1) % captchaChallenges.length);
    }, 4000);
  };

  // Checkout submission
  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const tax = subtotal * 0.08;
    const shipping = cart.some((i) => i.product.type === 'physical') ? 10.0 : 0.0;
    const total = subtotal + tax + shipping;

    onCompleteOrder({
      customerName: custName || 'Editorial Client',
      customerEmail: custEmail || 'reader@apexcms.dev',
      paymentMethod: payMethod,
      subtotal,
      tax,
      shipping,
      total,
      notes: payMethod === 'razorpay' ? `Razorpay Instant UPI Settlement: ${razorpayUpiId || 'client@upi'}` : undefined,
      items: cart.map((i) => ({
        productId: i.product.id,
        title: i.product.title,
        sku: i.product.sku,
        price: i.product.price,
        quantity: i.quantity,
        downloadToken: i.product.type === 'digital' ? 'tok_dl_' + Math.random().toString(36).substring(2, 9) : undefined
      }))
    });

    setOrderDone(true);
    setTimeout(() => {
      setOrderDone(false);
      setIsCheckoutOpen(false);
    }, 3000);
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // High-Contrast Colors: Strict WCAG AA readability in dark mode
  const bgMain = isDarkMode ? 'bg-[#121212] text-stone-100' : 'bg-[#faf9f6] text-stone-900';
  const bgCard = isDarkMode ? 'bg-[#1c1917] border-stone-700/80 shadow-[0_1px_3px_rgba(0,0,0,0.4)]' : 'bg-white border-stone-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)]';
  const textPrimary = isDarkMode ? 'text-stone-100' : 'text-stone-900';
  const textSecondary = isDarkMode ? 'text-stone-200' : 'text-stone-800';
  const textMuted = isDarkMode ? 'text-stone-300' : 'text-stone-600';
  const textSubtle = isDarkMode ? 'text-stone-400' : 'text-stone-500';
  const borderSubtle = isDarkMode ? 'border-stone-700' : 'border-stone-200';
  const mastheadBorder = isDarkMode ? 'border-stone-600' : 'border-stone-800';

  // Find Contact page if available
  const contactPage = pages.find((p) => p.slug === 'contact');

  // Save edited block
  const handleSaveBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlock || !setBlocks) return;
    setBlocks(blocks.map((b) => (b.id === editingBlock.id ? editingBlock : b)));
    setEditingBlock(null);
  };

  // Add new block to homepage
  const handleAddBlock = (type: HomepageBlock['type']) => {
    if (!setBlocks) return;
    const newId = `block_${Date.now()}`;
    let newBlock: HomepageBlock;

    switch (type) {
      case 'text_image':
        newBlock = {
          id: newId,
          type: 'text_image',
          enabled: true,
          settings: {
            title: 'Modern Architecture Case Study',
            subtitle: 'Real-world production benchmarks and caching results',
            body: '<p>Our systems maintain 100/100 Core Web Vitals under extreme concurrent load by decoupling edge presentation from backend logic.</p>',
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
            imagePosition: 'right',
            cta_text: 'Read System Case Study',
            cta_link: '#articles'
          }
        };
        break;
      case 'cta':
        newBlock = {
          id: newId,
          type: 'cta',
          enabled: true,
          settings: {
            title: 'Accelerate Your Production Publishing Pipeline',
            subtitle: 'Join leading engineering blogs and high-velocity commerce teams deploying ApexCMS today.',
            cta_text: 'Download Standalone Package',
            cta_link: '#download',
            accent: 'emerald'
          }
        };
        break;
      case 'featured_tools':
        newBlock = {
          id: newId,
          type: 'featured_tools',
          enabled: true,
          settings: {
            title: 'Active Plugin Extensions',
            subtitle: 'Hooks and filters running in isolation',
            show_sandbox: true
          }
        };
        break;
      case 'custom_code':
        newBlock = {
          id: newId,
          type: 'custom_code',
          enabled: true,
          settings: {
            title: 'Custom HTML / Embed Section',
            html_code: '<div class="p-4 bg-stone-100 dark:bg-stone-800 rounded-xl text-center text-xs font-mono">Custom HTML Embed Section — Edit this code in Homepage Builder</div>'
          }
        };
        break;
      default:
        newBlock = {
          id: newId,
          type,
          enabled: true,
          settings: {
            title: `New ${type.replace('_', ' ').toUpperCase()} Section`,
            subtitle: 'Custom section configured via Homepage Builder'
          }
        };
    }

    setBlocks([...blocks, newBlock]);
    setShowAddSectionModal(false);
  };

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className={`min-h-screen ${bgMain} font-sans selection:bg-stone-800 selection:text-white transition-colors`}>
      {/* Live Homepage Builder Floating Banner */}
      <div className={`sticky top-0 z-30 px-4 py-2 text-xs border-b flex flex-wrap items-center justify-between gap-2 ${
        isDarkMode ? 'bg-[#18181b] border-stone-700 text-stone-200' : 'bg-stone-100 border-stone-300 text-stone-800'
      }`}>
        <div className="flex items-center gap-2">
          <Sliders className="w-3.5 h-3.5 text-blue-600" />
          <span className="font-bold">Homepage Section Builder:</span>
          <span className="font-mono text-[11px] text-stone-500">
            {builderMode ? 'EDITING MODE ACTIVE (Hover over any section to edit or click Add)' : 'Live Preview Mode'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setBuilderMode(!builderMode)}
            className={`px-2.5 py-1 rounded text-xs font-bold transition flex items-center gap-1 ${
              builderMode
                ? 'bg-blue-600 text-white'
                : isDarkMode ? 'bg-stone-800 hover:bg-stone-700 text-stone-200' : 'bg-white hover:bg-stone-200 text-stone-800 border border-stone-300'
            }`}
          >
            <Edit3 className="w-3 h-3" />
            {builderMode ? 'Exit Builder Mode' : 'Enable Visual Section Editor'}
          </button>
          {builderMode && setBlocks && (
            <button
              onClick={() => setShowAddSectionModal(true)}
              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold flex items-center gap-1 transition"
            >
              <Plus className="w-3 h-3" /> Add New Section
            </button>
          )}
          {onNavigateToAdmin && (
            <button
              onClick={() => onNavigateToAdmin('blocks')}
              className="text-blue-600 hover:underline text-[11px] font-mono hidden sm:inline"
            >
              Open Admin Blocks &rarr;
            </button>
          )}
        </div>
      </div>

      {/* Editorial Masthead Bar */}
      <header className={`border-b ${borderSubtle} ${isDarkMode ? 'bg-[#141414]' : 'bg-[#f6f5f0]'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between text-[11px] font-mono tracking-tight text-stone-500 dark:text-stone-400">
          <div className="flex items-center gap-3">
            <span>VOL. XIV • ISSUE 04</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">SAN FRANCISCO, LONDON & BERLIN</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              CORE WEB VITALS: 100/100
            </span>
            <span className="hidden md:inline">TTFB: 18MS</span>
            <span className="hidden md:inline">CACHE: HIT</span>
          </div>
        </div>

        {/* Journal Title Header with Custom Logo Support */}
        <div className={`max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 border-t border-b ${mastheadBorder} text-center`}>
          <div className="inline-block">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setSelectedPage(null);
                setSelectedPost(null);
              }}
              className="group block"
            >
              {seoMedia?.siteLogo ? (
                <div className="flex flex-col items-center justify-center gap-2">
                  <img
                    src={seoMedia.siteLogo}
                    alt={seoMedia.logoAlt || 'Site Logo'}
                    className="h-12 sm:h-16 object-contain mx-auto"
                  />
                  <h1 className="text-2xl sm:text-4xl font-serif font-black tracking-tight uppercase text-stone-950 dark:text-stone-50">
                    The Architectural Dispatch
                  </h1>
                </div>
              ) : (
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight uppercase text-stone-950 dark:text-stone-50 hover:text-stone-700 dark:hover:text-stone-200 transition">
                  The Architectural Dispatch
                </h1>
              )}
              <p className="text-[11px] sm:text-xs font-serif italic text-stone-700 dark:text-stone-300 mt-1 sm:mt-2 tracking-wide uppercase">
                An Independent Journal of Systems Architecture, Performance & High-Integrity Commerce
              </p>
            </a>
          </div>
        </div>

        {/* Dynamic Navigation Row */}
        <nav className={`border-b ${borderSubtle} px-4 sm:px-6 py-2.5 ${isDarkMode ? 'bg-[#18181b]' : 'bg-white'}`}>
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <ul className="flex flex-wrap items-center gap-4 sm:gap-7 text-xs font-medium tracking-tight">
              <li>
                <button
                  onClick={() => {
                    setSelectedPage(null);
                    setSelectedPost(null);
                  }}
                  className={`transition hover:text-stone-950 dark:hover:text-white font-bold ${
                    !selectedPage && !selectedPost ? 'text-stone-950 dark:text-white underline underline-offset-4' : 'text-stone-700 dark:text-stone-300'
                  }`}
                >
                  Front Page
                </button>
              </li>
              {headerMenus.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.url}
                    onClick={(e) => {
                      if (item.url.startsWith('/page/')) {
                        e.preventDefault();
                        const slug = item.url.replace('/page/', '');
                        const found = pages.find((p) => p.slug === slug);
                        if (found) {
                          setSelectedPage(found);
                          setSelectedPost(null);
                        }
                      } else if (item.url === '/page/contact' || item.url === '#contact') {
                        e.preventDefault();
                        if (contactPage) {
                          setSelectedPage(contactPage);
                          setSelectedPost(null);
                        }
                      }
                    }}
                    className={`transition hover:text-stone-950 dark:hover:text-white flex items-center gap-1.5 ${
                      selectedPage && item.url.includes(selectedPage.slug)
                        ? 'text-stone-950 dark:text-white font-bold underline underline-offset-4'
                        : 'text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    {item.label}
                    {item.isShopOnly && (
                      <span className="text-[9px] font-mono uppercase bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 px-1 py-0.2 rounded font-semibold">
                        STORE
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              {contactPage && (
                <button
                  onClick={() => {
                    setSelectedPage(contactPage);
                    setSelectedPost(null);
                  }}
                  className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-md border transition ${
                    isDarkMode ? 'border-stone-700 bg-stone-900 hover:bg-stone-800 text-stone-200' : 'border-stone-300 bg-stone-100 hover:bg-stone-200 text-stone-800'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />
                  Bureau Inquiries
                </button>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* DEDICATED FULL PAGE VIEW */}
      {selectedPage && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
          {/* Breadcrumb & Admin Edit Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-stone-200 dark:border-stone-800 text-xs">
            <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 font-mono">
              <button
                onClick={() => setSelectedPage(null)}
                className="hover:text-stone-900 dark:hover:text-stone-100 underline"
              >
                Front Page
              </button>
              <span>/</span>
              <span className="text-stone-900 dark:text-stone-200 font-bold">pages / {selectedPage.slug}</span>
            </div>

            {onNavigateToAdmin && (
              <button
                onClick={() => onNavigateToAdmin('pages', selectedPage.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-800 text-xs font-semibold shadow-xs transition"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Edit Page in Admin Manager
              </button>
            )}
          </div>

          <article className={`${bgCard} border rounded-2xl p-6 sm:p-10 mb-8`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-stone-500 dark:text-stone-400">
                Official Document • Template: {selectedPage.template}
              </span>
              <span className="text-xs text-stone-400 dark:text-stone-500 font-mono">Updated: {selectedPage.updatedAt}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-stone-950 dark:text-stone-50 mb-6">
              {selectedPage.title}
            </h1>

            <div
              className={`prose max-w-none text-stone-800 dark:text-stone-200 text-sm leading-relaxed space-y-4`}
              dangerouslySetInnerHTML={{ __html: selectedPage.body }}
            />
          </article>

          {/* Contact Page Specific Bureau Details & Form */}
          {selectedPage.slug === 'contact' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`${bgCard} border rounded-2xl p-6`}>
                  <div className="w-9 h-9 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-800 dark:text-stone-200 mb-4">
                    <Building className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-stone-900 dark:text-stone-100 mb-2">
                    San Francisco Bureau
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                    548 Market Street, Suite 89201<br />
                    Financial District<br />
                    San Francisco, CA 94104, USA
                  </p>
                  <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300 font-mono">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-stone-500" /> +1 (415) 890-4820
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-stone-500" /> sf-desk@apexcms.dev
                    </div>
                  </div>
                </div>

                <div className={`${bgCard} border rounded-2xl p-6`}>
                  <div className="w-9 h-9 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-800 dark:text-stone-200 mb-4">
                    <Building className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-stone-900 dark:text-stone-100 mb-2">
                    London Editorial Office
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                    25 Christopher Street<br />
                    Shoreditch, Hackney<br />
                    London EC2A 2BS, United Kingdom
                  </p>
                  <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300 font-mono">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-stone-500" /> +44 20 7946 0912
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-stone-500" /> london@apexcms.dev
                    </div>
                  </div>
                </div>

                <div className={`${bgCard} border rounded-2xl p-6`}>
                  <div className="w-9 h-9 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-800 dark:text-stone-200 mb-4">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-stone-900 dark:text-stone-100 mb-2">
                    Operational Desks & Hours
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                    Operating continuously Mon–Fri<br />
                    08:00 – 18:00 UTC<br />
                    Average response: under 4 hours
                  </p>
                  <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300 font-mono">
                    <div>Security: security@apexcms.dev</div>
                    <div>Press: press@apexcms.dev</div>
                  </div>
                </div>
              </div>

              {/* Form with Honeypot + Captcha */}
              <div className={`${bgCard} border rounded-2xl p-6 sm:p-10 shadow-xs`}>
                <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800 mb-6">
                  <div>
                    <h2 className="text-xl font-serif font-black text-stone-900 dark:text-stone-100">
                      Direct Dispatch Communication Form
                    </h2>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                      Enforced with dual-layer bot protection: hidden tripwire honeypot + numbers and words math captcha.
                    </p>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
                    <ShieldAlert className="w-3.5 h-3.5" /> Zero-Tracker Form
                  </span>
                </div>

                {contactBotDetected && (
                  <div className="p-4 mb-6 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span><strong>Tripwire Alert:</strong> Automated bot submission detected via honeypot field. Transmission blocked.</span>
                  </div>
                )}

                {contactFormSuccess ? (
                  <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs space-y-3">
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      Inquiry Dispatched & Routed Successfully
                    </div>
                    <p className="leading-relaxed">
                      Thank you, <strong>{contactName || 'Visitor'}</strong>. Your communication has been dispatched to the configured recipient mail address:
                    </p>
                    <div className="p-3.5 rounded-lg bg-emerald-100/70 dark:bg-emerald-900/60 font-mono text-[11px] space-y-1.5 border border-emerald-200 dark:border-emerald-800">
                      <div><strong className="text-emerald-900 dark:text-emerald-100">Recipient Mail:</strong> {lastSubmissionDetails?.recipient}</div>
                      <div><strong className="text-emerald-900 dark:text-emerald-100">Subject:</strong> {lastSubmissionDetails?.subject}</div>
                      <div><strong className="text-emerald-900 dark:text-emerald-100">Transport:</strong> {lastSubmissionDetails?.driver === 'smtp' ? `Authenticated SMTP Relay (${emailSettings?.smtpHost}:${emailSettings?.smtpPort})` : `PHP mail() Native Sendmail`}</div>
                    </div>
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-300">
                      A copy has been recorded into the CMS inquiries ledger for editorial response.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-5 text-xs">
                    <div
                      style={{
                        opacity: 0,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: 0,
                        width: 0,
                        zIndex: -1,
                        pointerEvents: 'none'
                      }}
                      aria-hidden="true"
                    >
                      <label htmlFor="_hp_security_check">Leave this field blank</label>
                      <input
                        type="text"
                        id="_hp_security_check"
                        name="_hp_security_check"
                        value={contactHoneypot}
                        onChange={(e) => setContactHoneypot(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-medium mb-1.5 text-stone-800 dark:text-stone-200">
                          Your Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="e.g. Katherine Shaw"
                          className="w-full border border-stone-300 dark:border-stone-700 rounded-lg px-3.5 py-2.5 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900 dark:focus:border-stone-300"
                        />
                      </div>

                      <div>
                        <label className="block font-medium mb-1.5 text-stone-800 dark:text-stone-200">
                          Direct Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="katherine@example.com"
                          className="w-full border border-stone-300 dark:border-stone-700 rounded-lg px-3.5 py-2.5 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900 dark:focus:border-stone-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium mb-1.5 text-stone-800 dark:text-stone-200">
                        Inquiry Topic
                      </label>
                      <select
                        value={contactSubject}
                        onChange={(e) => setContactSubject(e.target.value)}
                        className="w-full border border-stone-300 dark:border-stone-700 rounded-lg px-3.5 py-2.5 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
                      >
                        <option value="General Inquiry">General Editorial Inquiry</option>
                        <option value="Technical Review">Technical Peer Review & Code Audit</option>
                        <option value="Security Disclosure">Security & Vulnerability Disclosure</option>
                        <option value="Commercial Licensing">Enterprise Commercial Licensing</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium mb-1.5 text-stone-800 dark:text-stone-200">
                        Message Content <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={contactMsg}
                        onChange={(e) => setContactMsg(e.target.value)}
                        placeholder="Detail your inquiry, requirements, or proposed article..."
                        className="w-full border border-stone-300 dark:border-stone-700 rounded-lg px-3.5 py-2.5 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900 dark:focus:border-stone-300"
                      ></textarea>
                    </div>

                    {/* Math Captcha in Numbers & Words */}
                    <div className={`p-4 rounded-xl border ${borderSubtle} bg-stone-100/70 dark:bg-stone-900/50 flex flex-wrap items-center justify-between gap-4`}>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-stone-800 dark:text-stone-200 font-semibold text-xs">
                          <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                          <span>{t.humanVerification}</span>
                        </div>
                        <div className="text-sm font-mono font-bold text-stone-900 dark:text-stone-100">
                          What is{' '}
                          <span className="text-amber-700 dark:text-amber-400 underline decoration-wavy">
                            {captchaChallenges[contactCaptchaIndex].word}
                          </span>{' '}
                          +{' '}
                          <span className="text-amber-700 dark:text-amber-400">
                            {captchaChallenges[contactCaptchaIndex].num}
                          </span>{' '}
                          ={' '}
                          <span className="text-stone-400 dark:text-stone-500">?</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          required
                          value={contactCaptchaAnswer}
                          onChange={(e) => {
                            setContactCaptchaAnswer(e.target.value);
                            setContactCaptchaError(false);
                          }}
                          placeholder="Sum (e.g. 11)"
                          className="w-24 border border-stone-300 dark:border-stone-700 rounded-lg px-3 py-2 text-center text-xs font-mono font-bold bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                        />
                        <button
                          type="button"
                          onClick={() => setContactCaptchaIndex((prev) => (prev + 1) % captchaChallenges.length)}
                          title="Generate new challenge"
                          className="p-2 rounded-lg border border-stone-300 dark:border-stone-700 hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                        >
                          <Send className="w-3.5 h-3.5" />
                          {t.sendMsg}
                        </button>
                      </div>
                    </div>

                    {contactCaptchaError && (
                      <div className="text-xs text-red-600 dark:text-red-400 font-medium flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Incorrect answer. Please solve the math verification to proceed.
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Post Modal / Reader View */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className={`${bgCard} border rounded-3xl w-full max-w-3xl p-6 sm:p-10 relative my-8 shadow-2xl`}>
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-stone-700 px-2.5 py-0.5 rounded-md">
                {selectedPost.category}
              </span>
              {isReadingTimeEnabled && (
                <span className="flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400 font-mono">
                  <Clock className="w-3.5 h-3.5 text-stone-500" />
                  {calculateReadTime(selectedPost.body)} {t.readTime} (Tool Hook Active)
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-black leading-tight mb-4 text-stone-950 dark:text-stone-50">
              {selectedPost.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 dark:text-stone-400 pb-4 border-b border-stone-200 dark:border-stone-800 mb-6 font-mono">
              <span>By {selectedPost.author}</span>
              <span>•</span>
              <span>Published {selectedPost.publishedAt}</span>
              <span>•</span>
              <span>{selectedPost.views.toLocaleString()} reads</span>
              {selectedPost.geo?.city && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                    <MapPin className="w-3 h-3" /> {selectedPost.geo.city}
                  </span>
                </>
              )}
            </div>

            {selectedPost.aeo?.directAnswer && (
              <div className="mb-6 p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 text-stone-800 dark:text-stone-200">
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5 text-stone-700 dark:text-stone-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> AEO Direct Entity Summary (AI Search Ready)
                </div>
                <p className="text-xs leading-relaxed text-stone-700 dark:text-stone-300">{selectedPost.aeo.directAnswer}</p>
              </div>
            )}

            {isTocEnabled && (
              <div className="mb-6 p-4 border-l-4 border-stone-800 dark:border-stone-200 rounded-r-xl border-y border-r border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/40">
                <div className="text-xs font-mono font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 text-stone-800 dark:text-stone-200">
                  <BookOpen className="w-3.5 h-3.5" /> Table of Contents (the_post_headers hook)
                </div>
                <ul className="text-xs space-y-1.5 text-stone-700 dark:text-stone-300 font-medium">
                  <li><a href="#section-1" className="hover:underline">1. The Performance Imperative</a></li>
                  <li><a href="#section-2" className="hover:underline">2. Eliminating Cumulative Layout Shift (CLS)</a></li>
                  <li><a href="#section-3" className="hover:underline">3. Full-Page HTML Caching Strategy</a></li>
                </ul>
              </div>
            )}

            <div
              className="prose max-w-none text-sm leading-relaxed space-y-4 text-stone-800 dark:text-stone-200 font-serif"
              dangerouslySetInnerHTML={{ __html: selectedPost.body }}
            />

            {isRelatedPostsEnabled && (
              <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-800">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3">
                  Related Technical Essays (post_recommendation hook)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {posts
                    .filter((p) => p.id !== selectedPost.id)
                    .slice(0, 2)
                    .map((rel) => (
                      <div
                        key={rel.id}
                        onClick={() => setSelectedPost(rel)}
                        className={`p-3.5 rounded-xl border ${borderSubtle} cursor-pointer transition hover:border-stone-500 bg-stone-50 dark:bg-stone-900`}
                      >
                        <div className="text-[11px] text-stone-500 dark:text-stone-400 font-mono">{rel.category}</div>
                        <div className="text-xs font-bold font-serif mt-1 line-clamp-1 text-stone-900 dark:text-stone-100">
                          {rel.title}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className={`w-full max-w-md ${bgCard} border-l h-full flex flex-col p-6 shadow-2xl`}>
            <div className={`flex items-center justify-between pb-4 border-b ${borderSubtle}`}>
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-stone-800 dark:text-stone-200" />
                <h2 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100">Your Procurement Order</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 dark:hover:text-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-stone-400 dark:text-stone-500">
                  <ShoppingBag className="w-12 h-12 mx-auto text-stone-300 dark:text-stone-700 mb-3" />
                  <p className="text-xs font-mono">Your procurement cart is currently empty.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.product.id} className={`p-3.5 rounded-xl border ${borderSubtle} flex items-center justify-between bg-stone-50 dark:bg-stone-900`}>
                    <div>
                      <div className="text-xs font-bold font-serif text-stone-900 dark:text-stone-100">{item.product.title}</div>
                      <div className="text-[11px] text-stone-500 dark:text-stone-400 font-mono mt-0.5">
                        ${item.product.price.toFixed(2)} × {item.quantity}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-stone-900 dark:text-stone-100">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => onRemoveFromCart(item.product.id)}
                        className="text-red-500 hover:text-red-700 text-xs px-1.5 py-0.5 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className={`pt-4 border-t ${borderSubtle} space-y-3`}>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-stone-500 dark:text-stone-400">Subtotal</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">${cartSubtotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onOpenCheckout();
                  }}
                  className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900 rounded-xl text-xs font-bold shadow-md transition flex items-center justify-center gap-2"
                >
                  {t.secureCheckout} (${cartSubtotal.toFixed(2)})
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Drawer with Stripe, PayPal, Razorpay & COD */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className={`${bgCard} border rounded-2xl w-full max-w-lg p-6 shadow-2xl relative`}>
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-5 right-5 p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 mb-1">
              ApexCMS Tokenized Settlement
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-mono mb-5">
              Secure checkout with automated digital token generation & multi-gateway drivers.
            </p>

            {orderDone ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100">Order Confirmed!</h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Your order has been recorded into the database and tokenized license links are ready.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-medium mb-1 text-stone-800 dark:text-stone-200">Customer Name</label>
                  <input
                    type="text"
                    required
                    value={custName}
                    onChange={(e) => setCustName(e.target.value)}
                    placeholder="e.g. Alex Mercer"
                    className="w-full border border-stone-300 dark:border-stone-700 rounded-lg px-3 py-2 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1 text-stone-800 dark:text-stone-200">Email Address</label>
                  <input
                    type="email"
                    required
                    value={custEmail}
                    onChange={(e) => setCustEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full border border-stone-300 dark:border-stone-700 rounded-lg px-3 py-2 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1 text-stone-800 dark:text-stone-200">Payment Gateway Driver</label>
                  <select
                    value={payMethod}
                    onChange={(e) => setPayMethod(e.target.value as any)}
                    className="w-full border border-stone-300 dark:border-stone-700 rounded-lg px-3 py-2 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
                  >
                    <option value="stripe">💳 Stripe Driver (Instant Credit/Debit Card)</option>
                    <option value="paypal">🅿️ PayPal Express Gateway</option>
                    <option value="razorpay">⚡ Razorpay Gateway (UPI, NetBanking & Cards)</option>
                    <option value="cod">📦 Cash on Delivery / Direct Wire Invoice</option>
                  </select>
                </div>

                {/* Razorpay specific fields */}
                {payMethod === 'razorpay' && (
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-xl space-y-2 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-200">
                      <QrCode className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <span>Razorpay UPI & Instant Settlement</span>
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-stone-700 dark:text-stone-300 mb-1">Enter UPI ID (VPA) or Phone Number</label>
                      <input
                        type="text"
                        value={razorpayUpiId}
                        onChange={(e) => setRazorpayUpiId(e.target.value)}
                        placeholder="username@okhdfcbank or 9876543210@paytm"
                        className="w-full border border-stone-300 dark:border-stone-700 rounded px-2.5 py-1.5 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs font-mono"
                      />
                    </div>
                  </div>
                )}

                <div className={`p-3 rounded-xl border ${borderSubtle} space-y-1 text-[11px] font-mono bg-stone-50 dark:bg-stone-900 text-stone-700 dark:text-stone-300`}>
                  <div className="flex justify-between">
                    <span>Items ({cart.length}):</span>
                    <span>${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (8%):</span>
                    <span>${(cartSubtotal * 0.08).toFixed(2)}</span>
                  </div>
                  <div className={`flex justify-between font-bold pt-1 border-t ${borderSubtle} text-stone-900 dark:text-stone-100`}>
                    <span>Grand Total:</span>
                    <span className="text-emerald-600 dark:text-emerald-400">${(cartSubtotal * 1.08).toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900 rounded-xl text-xs font-bold transition"
                >
                  Confirm & Place Order
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* HOMEPAGE VIEW: Renders all sections dynamically from blocks state */}
      {!selectedPage && (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-16">
          {blocks.map((block, blockIndex) => {
            if (!block.enabled && !builderMode) return null;

            return (
              <div
                key={block.id}
                className={`relative group transition rounded-2xl ${
                  builderMode ? 'p-4 border-2 border-dashed border-blue-400/60 dark:border-blue-500/40 bg-blue-50/10' : ''
                }`}
              >
                {/* Visual Builder Bar when Builder Mode is Active */}
                {builderMode && (
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-blue-200 dark:border-blue-900/60 text-xs font-mono">
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold">
                      <span>SECTION {blockIndex + 1}: {block.type.toUpperCase()}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                        block.enabled ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-stone-200 text-stone-600'
                      }`}>
                        {block.enabled ? 'VISIBLE' : 'DISABLED'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingBlock(block)}
                        className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold text-xs flex items-center gap-1 shadow-xs"
                      >
                        <Edit3 className="w-3 h-3" /> Edit Section
                      </button>
                      {setBlocks && (
                        <>
                          <button
                            onClick={() => {
                              setBlocks(blocks.map((b) => (b.id === block.id ? { ...b, enabled: !b.enabled } : b)));
                            }}
                            className="px-2 py-1 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded text-xs"
                          >
                            {block.enabled ? 'Hide' : 'Show'}
                          </button>
                          <button
                            onClick={() => {
                              if (confirm('Delete this section from the homepage?')) {
                                setBlocks(blocks.filter((b) => b.id !== block.id));
                              }
                            }}
                            className="p-1 text-red-500 hover:text-red-700"
                            title="Delete Section"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* 1. Hero Block */}
                {block.type === 'hero' && (
                  <section className="py-8 sm:py-14 text-center border-b border-stone-200 dark:border-stone-800">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-mono font-medium mb-6">
                      <span>{block.settings.badge_text || 'EDITION 2026 • STRICT PHP 8.2+ MVC • ZERO RUNTIME BLOAT'}</span>
                    </div>

                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight max-w-4xl mx-auto leading-tight text-stone-950 dark:text-stone-50">
                      {block.settings.title}
                    </h2>

                    <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 max-w-2xl mx-auto mt-4 leading-relaxed font-serif">
                      {block.settings.subtitle}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                      <a
                        href={block.settings.cta_link || '#featured-posts'}
                        className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900 font-bold text-xs rounded-lg transition"
                      >
                        {block.settings.cta_text || 'Read Featured Essays'}
                      </a>
                      {block.settings.secondary_cta_text && (
                        <a
                          href={block.settings.secondary_cta_link || '#featured-tools'}
                          className="px-6 py-2.5 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-bold text-xs rounded-lg transition"
                        >
                          {block.settings.secondary_cta_text}
                        </a>
                      )}
                    </div>
                  </section>
                )}

                {/* 2. Featured Posts Block */}
                {block.type === 'featured_posts' && (
                  <section id="featured-posts" className="space-y-6">
                    <div className="flex items-end justify-between border-b-2 border-stone-800 dark:border-stone-200 pb-2">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400">EDITORIAL ARCHIVE</span>
                        <h2 className="text-2xl font-serif font-black tracking-tight text-stone-950 dark:text-stone-50">
                          {block.settings.title}
                        </h2>
                      </div>
                      <span className="text-xs font-mono text-stone-500 dark:text-stone-400 hidden sm:inline">
                        {posts.length} Documented Blueprints
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {posts[0] && (
                        <article
                          onClick={() => setSelectedPost(posts[0])}
                          className={`lg:col-span-7 ${bgCard} border rounded-2xl p-6 sm:p-8 flex flex-col justify-between cursor-pointer group transition hover:border-stone-500`}
                        >
                          <div>
                            <div className="flex items-center gap-3 text-xs mb-3">
                              <span className="font-mono font-bold text-[11px] bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 px-2.5 py-0.5 rounded-md">
                                {posts[0].category}
                              </span>
                              {isReadingTimeEnabled && (
                                <span className="text-stone-500 dark:text-stone-400 text-[11px] font-mono flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5" />
                                  {calculateReadTime(posts[0].body)} {t.readTime}
                                </span>
                              )}
                              <span className="text-stone-400">•</span>
                              <span className="text-stone-500 dark:text-stone-400 text-[11px] font-mono">{posts[0].publishedAt}</span>
                            </div>

                            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-950 dark:text-stone-50 leading-snug group-hover:underline">
                              {posts[0].title}
                            </h3>

                            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed mt-3 font-serif line-clamp-4">
                              {posts[0].excerpt}
                            </p>
                          </div>

                          <div className="pt-6 mt-6 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs font-mono">
                            <span className="text-stone-500 dark:text-stone-400">By {posts[0].author} ({posts[0].geo?.city || 'Global Desk'})</span>
                            <span className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1">
                              {t.readEssay} <ArrowUpRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </article>
                      )}

                      <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
                        {posts.slice(1, block.settings.limit || 3).map((post) => (
                          <article
                            key={post.id}
                            onClick={() => setSelectedPost(post)}
                            className={`${bgCard} border rounded-2xl p-5 flex-1 flex flex-col justify-between cursor-pointer group transition hover:border-stone-500`}
                          >
                            <div>
                              <div className="flex items-center gap-2 text-xs mb-2">
                                <span className="font-mono text-[10px] font-bold text-stone-600 dark:text-stone-400 uppercase">
                                  {post.category}
                                </span>
                                <span className="text-stone-400">•</span>
                                <span className="text-stone-500 dark:text-stone-400 text-[10px] font-mono">{post.publishedAt}</span>
                              </div>
                              <h4 className="text-base font-serif font-bold text-stone-950 dark:text-stone-50 leading-snug group-hover:underline">
                                {post.title}
                              </h4>
                              <p className="text-xs text-stone-700 dark:text-stone-300 mt-1.5 font-serif line-clamp-2">
                                {post.excerpt}
                              </p>
                            </div>

                            <div className="pt-3 mt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-[11px] font-mono text-stone-500 dark:text-stone-400">
                              <span>{post.views.toLocaleString()} reads</span>
                              <span className="font-bold text-stone-900 dark:text-stone-100">{t.readEssay} &rarr;</span>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  </section>
                )}

                {/* 3. Featured Tools Block */}
                {block.type === 'featured_tools' && (
                  <section id="featured-tools" className="space-y-6">
                    <div className="flex items-end justify-between border-b-2 border-stone-800 dark:border-stone-200 pb-2">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400">CORE EXTENSIONS</span>
                        <h2 className="text-2xl font-serif font-black tracking-tight text-stone-950 dark:text-stone-50">
                          {block.settings.title}
                        </h2>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400">
                        <Layers className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />
                        <span>PHP Hook System</span>
                      </div>
                    </div>

                    {/* Hindu Panchang & Vrat Calculator Spotlight Banner */}
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-600/10 border-2 border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">🕉️</span>
                          <span className="text-xs font-mono font-bold tracking-wider text-amber-700 dark:text-amber-300 uppercase">Featured Astronomical Extension</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200">80+ Cities Supported</span>
                        </div>
                        <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-50">
                          Indian Vrat & Festivals Calculator (Hindu Panchang)
                        </h3>
                        <p className="text-xs text-stone-700 dark:text-stone-300 max-w-2xl font-serif">
                          Convert Hindu dates to Gregorian, calculate Tithi start/end times with local sunrise/sunset/moonrise, find 25+ major Hindu festivals (Diwali, Holi, Karva Chauth, Shivratri), find Ekadashi/Purnima/Amavasya, and export directly to iCal (.ics).
                        </p>
                      </div>
                      <button
                        onClick={() => setShowPanchangModal(true)}
                        className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-md hover:shadow-lg transition-all flex items-center gap-2 shrink-0 cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-amber-200" />
                        <span>Launch Panchang Calculator 🕉️</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {tools.map((tool) => (
                        <div
                          key={tool.id}
                          className={`${bgCard} border rounded-2xl p-6 flex flex-col justify-between`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold">
                                v{tool.version}
                              </span>
                              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                                tool.enabled
                                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                  : 'bg-stone-200 text-stone-700 dark:bg-stone-800 dark:text-stone-400'
                              }`}>
                                {tool.enabled ? t.activeInCore : t.disabled}
                              </span>
                            </div>

                            <h3 className="text-base font-serif font-bold text-stone-950 dark:text-stone-50 mb-1.5 flex items-center gap-2">
                              {tool.id === 'hindu-panchang-calculator' && <span>🕉️</span>}
                              {tool.name}
                            </h3>

                            <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-serif">
                              {tool.description}
                            </p>

                            <div className="mt-4 p-3 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-[11px] font-mono space-y-1 text-stone-600 dark:text-stone-400">
                              <div><strong>Hook:</strong> {tool.id === 'reading-time' ? 'the_content' : tool.id === 'table-of-contents' ? 'the_post_headers' : tool.id === 'hindu-panchang-calculator' ? 'panchang_astronomy_engine' : 'post_recommendation'}</div>
                              <div><strong>Author:</strong> {tool.author}</div>
                            </div>

                            {tool.id === 'hindu-panchang-calculator' && (
                              <button
                                onClick={() => setShowPanchangModal(true)}
                                className="w-full mt-4 py-2.5 px-3 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
                              >
                                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                                <span>Open Interactive Calculator</span>
                              </button>
                            )}
                          </div>

                          <div className="mt-4 pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-[11px] font-mono">
                            <span className="text-stone-500 dark:text-stone-400">PHP 8.2 Safe</span>
                            {onNavigateToAdmin && (
                              <button
                                onClick={() => onNavigateToAdmin('tools')}
                                className="text-stone-900 dark:text-stone-100 font-bold hover:underline"
                              >
                                Manage in Admin &rarr;
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Interactive Sandbox */}
                    {block.settings.show_sandbox !== false && (
                      <div className={`${bgCard} border rounded-2xl p-6 sm:p-8 space-y-4`}>
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-900 dark:text-stone-100">
                              <Wrench className="w-4 h-4" />
                            </div>
                            <div>
                              <h3 className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100">
                                Live Interactive Sandbox: Reading Time Calculator
                              </h3>
                              <p className="text-xs text-stone-500 dark:text-stone-400 font-mono">
                                Test the exact algorithm in real-time.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 text-xs font-mono">
                            <span className="text-stone-500 dark:text-stone-400">Speed:</span>
                            <select
                              value={sandboxWpm}
                              onChange={(e) => setSandboxWpm(Number(e.target.value))}
                              className="border border-stone-300 dark:border-stone-700 rounded px-2 py-1 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs"
                            >
                              <option value={150}>150 WPM (Careful Read)</option>
                              <option value={200}>200 WPM (Standard)</option>
                              <option value={250}>250 WPM (Speed Read)</option>
                            </select>
                          </div>
                        </div>

                        <textarea
                          rows={3}
                          value={sandboxText}
                          onChange={(e) => setSandboxText(e.target.value)}
                          placeholder="Type or paste sample article copy here to verify read time calculation..."
                          className="w-full border border-stone-300 dark:border-stone-700 rounded-lg p-3 text-xs font-serif bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
                        ></textarea>

                        <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-lg bg-stone-100 dark:bg-stone-800 text-xs font-mono">
                          <div className="flex items-center gap-4 text-stone-700 dark:text-stone-300">
                            <span>Words: <strong>{sandboxText.trim().split(/\s+/).filter(Boolean).length}</strong></span>
                            <span>Characters: <strong>{sandboxText.length}</strong></span>
                          </div>
                          <div className="flex items-center gap-2 text-stone-900 dark:text-stone-100 font-bold">
                            <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            <span>Calculated: <span className="underline decoration-wavy">{calculateReadTime(sandboxText, sandboxWpm)} minute(s)</span></span>
                          </div>
                        </div>
                      </div>
                    )}
                  </section>
                )}

                {/* 4. Featured Products Block */}
                {block.type === 'featured_products' && shopEnabled && (
                  <section id="featured-products" className="space-y-6">
                    <div className="flex items-end justify-between border-b-2 border-stone-800 dark:border-stone-200 pb-2">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                          PROCUREMENT CATALOG
                        </span>
                        <h2 className="text-2xl font-serif font-black tracking-tight text-stone-950 dark:text-stone-50">
                          {block.settings.title}
                        </h2>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400">
                        <ShoppingBag className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />
                        <span>Tokenized Deliveries & Secure Checkout</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {products.slice(0, block.settings.limit || 3).map((prod) => (
                        <div
                          key={prod.id}
                          className={`${bgCard} border rounded-2xl overflow-hidden flex flex-col justify-between`}
                        >
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-3 text-[10px] font-mono">
                              <span className={`px-2 py-0.5 rounded font-bold ${
                                prod.type === 'digital'
                                  ? 'bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-300'
                                  : 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300'
                              }`}>
                                {prod.type === 'digital' ? '⚡ TOKENIZED DIGITAL' : '📦 PHYSICAL COURIER'}
                              </span>
                              <span className="text-stone-500 dark:text-stone-400">SKU: {prod.sku}</span>
                            </div>

                            <h3 className="text-base font-serif font-bold text-stone-950 dark:text-stone-50 mb-2">
                              {prod.title}
                            </h3>

                            <p className="text-xs text-stone-700 dark:text-stone-300 font-serif leading-relaxed line-clamp-3 mb-4">
                              {prod.description}
                            </p>

                            <div className="flex items-baseline gap-2">
                              <span className="text-xl font-mono font-black text-stone-950 dark:text-stone-50">
                                ${prod.price.toFixed(2)}
                              </span>
                              {prod.salePrice && (
                                <span className="text-xs font-mono text-stone-400 line-through">
                                  ${prod.salePrice.toFixed(2)}
                                </span>
                              )}
                              <span className="ml-auto text-[11px] font-mono text-stone-500 dark:text-stone-400">
                                {prod.stock > 0 ? `${prod.stock} in stock` : 'Backordered'}
                              </span>
                            </div>
                          </div>

                          <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
                            <button
                              onClick={() => {
                                onAddToCart(prod);
                                setIsCartOpen(true);
                              }}
                              className="w-full py-2 bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              {t.procureItem} (${prod.price.toFixed(2)})
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* 5. Image + Text Story Block */}
                {block.type === 'text_image' && (
                  <section className={`${bgCard} border rounded-3xl p-6 sm:p-10 my-8`}>
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
                      block.settings.imagePosition === 'left' ? 'md:flex-row-reverse' : ''
                    }`}>
                      <div className="space-y-4">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400">
                          FEATURED STORY
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-serif font-black text-stone-950 dark:text-stone-50">
                          {block.settings.title}
                        </h2>
                        {block.settings.subtitle && (
                          <p className="text-xs font-mono text-stone-500 dark:text-stone-400">
                            {block.settings.subtitle}
                          </p>
                        )}
                        <div
                          className="prose max-w-none text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-serif leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: block.settings.body || '' }}
                        />
                        {block.settings.cta_text && (
                          <div className="pt-2">
                            <a
                              href={block.settings.cta_link || '#'}
                              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900 rounded-lg text-xs font-bold transition"
                            >
                              {block.settings.cta_text} <ArrowRight className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        )}
                      </div>

                      {block.settings.image && (
                        <div>
                          <img
                            src={block.settings.image}
                            alt={block.settings.title}
                            className="rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm w-full object-cover max-h-80"
                          />
                        </div>
                      )}
                    </div>
                  </section>
                )}

                {/* 6. Call To Action Block */}
                {block.type === 'cta' && (
                  <section className={`border rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-xs ${
                    isDarkMode ? 'bg-[#18181b] border-stone-700' : 'bg-stone-900 border-stone-900 text-white'
                  }`}>
                    <h2 className={`text-2xl sm:text-3xl font-serif font-black tracking-tight ${
                      isDarkMode ? 'text-stone-50' : 'text-white'
                    }`}>
                      {block.settings.title}
                    </h2>
                    <p className={`text-xs sm:text-sm mt-3 max-w-xl mx-auto leading-relaxed font-serif ${
                      isDarkMode ? 'text-stone-300' : 'text-stone-300'
                    }`}>
                      {block.settings.subtitle}
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <a
                        href={block.settings.cta_link || '#install'}
                        className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-md"
                      >
                        {block.settings.cta_text || 'Get Started Now'}
                      </a>
                    </div>
                  </section>
                )}

                {/* 7. FAQ Block */}
                {block.type === 'faq' && (
                  <section className="max-w-3xl mx-auto space-y-4">
                    <div className="text-center mb-6">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400">DOCUMENTATION</span>
                      <h2 className="text-2xl font-serif font-black text-stone-950 dark:text-stone-50">
                        {block.settings.title}
                      </h2>
                      <p className="text-xs text-stone-500 dark:text-stone-400 font-mono mt-1">Automatic FAQPage Schema.org JSON-LD is generated</p>
                    </div>

                    <div className="space-y-3">
                      {(block.settings.items || []).map((faqItem: any, i: number) => (
                        <div
                          key={i}
                          className={`${bgCard} border rounded-xl overflow-hidden transition`}
                        >
                          <button
                            onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                            className="w-full px-5 py-4 text-left font-serif font-bold text-sm flex items-center justify-between text-stone-900 dark:text-stone-100 hover:text-stone-600 transition"
                          >
                            <span>{faqItem.q}</span>
                            <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform ${activeFaq === i ? 'rotate-180 text-stone-900' : ''}`} />
                          </button>
                          {activeFaq === i && (
                            <div className="px-5 pb-4 text-xs font-serif leading-relaxed text-stone-700 dark:text-stone-300 border-t border-stone-200 dark:border-stone-800 pt-3">
                              {faqItem.a}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* 8. Newsletter Block */}
                {block.type === 'newsletter' && (
                  <section className={`${bgCard} border rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-xs`}>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400">PUBLICATIONS</span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-black text-stone-950 dark:text-stone-50 mt-1">
                      {block.settings.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 mt-2 max-w-xl mx-auto leading-relaxed font-serif">
                      {block.settings.subtitle}
                    </p>

                    {nlBotDetected && (
                      <div className="p-3 my-4 rounded-xl bg-red-50 dark:bg-red-950 border border-red-200 text-red-700 text-xs">
                        Tripwire alert: Automated bot submission blocked by honeypot.
                      </div>
                    )}

                    {nlSuccess ? (
                      <div className="p-4 my-4 rounded-xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 text-emerald-800 dark:text-emerald-300 text-xs font-mono">
                        ✓ Subscription recorded. Please verify your opt-in confirmation email.
                      </div>
                    ) : (
                      <form onSubmit={handleNewsletterSubmit} className="mt-6 space-y-3 max-w-md mx-auto">
                        <div
                          style={{
                            opacity: 0,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: 0,
                            width: 0,
                            zIndex: -1,
                            pointerEvents: 'none'
                          }}
                          aria-hidden="true"
                        >
                          <label htmlFor="_hp_subscriber_check">Leave empty</label>
                          <input
                            type="text"
                            id="_hp_subscriber_check"
                            name="_hp_subscriber_check"
                            value={nlHoneypot}
                            onChange={(e) => setNlHoneypot(e.target.value)}
                            tabIndex={-1}
                            autoComplete="off"
                          />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="email"
                            required
                            value={nlEmail}
                            onChange={(e) => setNlEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="flex-1 border border-stone-300 dark:border-stone-700 rounded-lg px-4 py-2.5 text-xs font-mono bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
                          />
                          <button
                            type="submit"
                            className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900 rounded-lg text-xs font-bold transition"
                          >
                            Subscribe
                          </button>
                        </div>

                        <div className="flex items-center justify-center gap-2 text-xs font-mono text-stone-700 dark:text-stone-300">
                          <ShieldAlert className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                          <span>Verify: {captchaChallenges[nlCaptchaIndex].text} = ?</span>
                          <input
                            type="text"
                            required
                            value={nlCaptchaAnswer}
                            onChange={(e) => {
                              setNlCaptchaAnswer(e.target.value);
                              setNlCaptchaError(false);
                            }}
                            placeholder="Answer"
                            className="w-16 border border-stone-300 dark:border-stone-700 rounded px-2 py-1 text-xs font-mono text-center bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                          />
                        </div>

                        {nlCaptchaError && (
                          <div className="text-[11px] text-red-500 font-mono">
                            Incorrect math answer. Expected: {captchaChallenges[nlCaptchaIndex].sum}.
                          </div>
                        )}
                      </form>
                    )}
                  </section>
                )}

                {/* 9. Custom Code Block */}
                {block.type === 'custom_code' && (
                  <section className="my-6">
                    <div
                      dangerouslySetInnerHTML={{ __html: block.settings.html_code || '' }}
                    />
                  </section>
                )}
              </div>
            );
          })}
        </main>
      )}

      {/* EDIT BLOCK MODAL (For modifying text, images, and CTA on any section) */}
      {editingBlock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className={`${bgCard} border rounded-2xl w-full max-w-xl p-6 shadow-2xl relative`}>
            <button
              onClick={() => setEditingBlock(null)}
              className="absolute top-5 right-5 p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 mb-1">
              Edit Section: {editingBlock.type.replace('_', ' ').toUpperCase()}
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-mono mb-4">
              Block ID: {editingBlock.id}
            </p>

            <form onSubmit={handleSaveBlock} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium mb-1 text-stone-800 dark:text-stone-200">Section Title / Headline</label>
                <input
                  type="text"
                  value={editingBlock.settings.title || ''}
                  onChange={(e) =>
                    setEditingBlock({
                      ...editingBlock,
                      settings: { ...editingBlock.settings, title: e.target.value }
                    })
                  }
                  className="w-full border border-stone-300 dark:border-stone-700 rounded-lg px-3 py-2 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-stone-800 dark:text-stone-200">Subtitle / Tagline</label>
                <textarea
                  rows={2}
                  value={editingBlock.settings.subtitle || ''}
                  onChange={(e) =>
                    setEditingBlock({
                      ...editingBlock,
                      settings: { ...editingBlock.settings, subtitle: e.target.value }
                    })
                  }
                  className="w-full border border-stone-300 dark:border-stone-700 rounded-lg px-3 py-2 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                ></textarea>
              </div>

              {/* Conditional fields based on block type */}
              {(editingBlock.type === 'hero' || editingBlock.type === 'cta' || editingBlock.type === 'text_image') && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium mb-1 text-stone-800 dark:text-stone-200">Primary Button Label</label>
                    <input
                      type="text"
                      value={editingBlock.settings.cta_text || ''}
                      onChange={(e) =>
                        setEditingBlock({
                          ...editingBlock,
                          settings: { ...editingBlock.settings, cta_text: e.target.value }
                        })
                      }
                      className="w-full border border-stone-300 dark:border-stone-700 rounded-lg px-3 py-2 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1 text-stone-800 dark:text-stone-200">Primary Button URL</label>
                    <input
                      type="text"
                      value={editingBlock.settings.cta_link || ''}
                      onChange={(e) =>
                        setEditingBlock({
                          ...editingBlock,
                          settings: { ...editingBlock.settings, cta_link: e.target.value }
                        })
                      }
                      className="w-full border border-stone-300 dark:border-stone-700 rounded-lg px-3 py-2 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-mono"
                    />
                  </div>
                </div>
              )}

              {editingBlock.type === 'text_image' && (
                <>
                  <div>
                    <label className="block font-medium mb-1 text-stone-800 dark:text-stone-200">Image Asset URL</label>
                    <input
                      type="url"
                      value={editingBlock.settings.image || ''}
                      onChange={(e) =>
                        setEditingBlock({
                          ...editingBlock,
                          settings: { ...editingBlock.settings, image: e.target.value }
                        })
                      }
                      className="w-full border border-stone-300 dark:border-stone-700 rounded-lg px-3 py-2 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1 text-stone-800 dark:text-stone-200">Body Content (HTML)</label>
                    <textarea
                      rows={3}
                      value={editingBlock.settings.body || ''}
                      onChange={(e) =>
                        setEditingBlock({
                          ...editingBlock,
                          settings: { ...editingBlock.settings, body: e.target.value }
                        })
                      }
                      className="w-full border border-stone-300 dark:border-stone-700 rounded-lg px-3 py-2 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-mono"
                    ></textarea>
                  </div>
                </>
              )}

              {editingBlock.type === 'custom_code' && (
                <div>
                  <label className="block font-medium mb-1 text-stone-800 dark:text-stone-200">Raw HTML / Embed Code</label>
                  <textarea
                    rows={4}
                    value={editingBlock.settings.html_code || ''}
                    onChange={(e) =>
                      setEditingBlock({
                        ...editingBlock,
                        settings: { ...editingBlock.settings, html_code: e.target.value }
                      })
                    }
                    className="w-full border border-stone-300 dark:border-stone-700 rounded-lg px-3 py-2 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-mono"
                  ></textarea>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-200 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setEditingBlock(null)}
                  className="px-4 py-2 border border-stone-300 dark:border-stone-700 rounded-lg font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900 rounded-lg font-bold transition shadow-sm"
                >
                  Save Section Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD SECTION MODAL */}
      {showAddSectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className={`${bgCard} border rounded-2xl w-full max-w-lg p-6 shadow-2xl relative`}>
            <button
              onClick={() => setShowAddSectionModal(false)}
              className="absolute top-5 right-5 p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 mb-1">
              Add New Section to Homepage
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-mono mb-4">
              Select a section archetype to inject into the modular homepage layout:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                { type: 'text_image', label: 'Image + Text Story', desc: 'Split editorial banner with custom photo & copy' },
                { type: 'cta', label: 'Call to Action Banner', desc: 'Prominent conversion banner with styled action button' },
                { type: 'featured_tools', label: 'Featured Tools (Plugins)', desc: 'Showcase of active hook-driven tools & sandbox' },
                { type: 'featured_posts', label: 'Featured Articles Grid', desc: 'Highlights from the editorial archive' },
                { type: 'featured_products', label: 'Curated Products Showcase', desc: 'Digital licenses and physical hardware' },
                { type: 'custom_code', label: 'Custom HTML / Embed', desc: 'Insert raw HTML, widgets, or third-party embeds' }
              ].map((item) => (
                <button
                  key={item.type}
                  onClick={() => handleAddBlock(item.type as any)}
                  className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-blue-600 dark:hover:border-blue-400 text-left transition bg-stone-50 dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  <div className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                    <Plus className="w-3.5 h-3.5 text-blue-600" />
                    {item.label}
                  </div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
                    {item.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Editorial Footer */}
      <footer className={`border-t ${borderSubtle} py-12 px-4 sm:px-6 text-xs text-stone-500 dark:text-stone-400 font-mono ${
        isDarkMode ? 'bg-[#101010]' : 'bg-[#f4f3ee]'
      }`}>
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-6">
            <div>
              <span className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                The Architectural Dispatch
              </span>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                Powered by ApexCMS Standalone Distribution (PHP 8.2+, MySQL/MariaDB & SQLite, PDO).
              </p>
            </div>

            <div className="flex flex-wrap gap-4 font-semibold text-stone-700 dark:text-stone-300">
              {contactPage && (
                <button
                  onClick={() => {
                    setSelectedPage(contactPage);
                    setSelectedPost(null);
                  }}
                  className="hover:underline flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5" /> Editorial Bureau Contact
                </button>
              )}
              {footerMenus.map((f) => (
                <a key={f.id} href={f.url} className="hover:underline">
                  {f.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-stone-400 dark:text-stone-500">
            <p>© {new Date().getFullYear()} ApexCMS Open Source Project. All editorial rights reserved.</p>
            <p>Designed with zero layout shift, semantic HTML5, and no third-party CDNs.</p>
          </div>
        </div>
      </footer>

      {/* Cookie Consent Banner */}
      {cookieConsent === 'pending' && (
        <div className={`fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-md z-40 p-4 rounded-xl shadow-xl border text-xs ${
          isDarkMode ? 'bg-stone-900 border-stone-700 text-stone-100' : 'bg-white border-stone-200 text-stone-900'
        }`}>
          <div className="font-serif font-bold mb-1 text-stone-900 dark:text-stone-100">Privacy & Cookie Directives</div>
          <p className="text-stone-600 dark:text-stone-300 text-[11px] leading-relaxed mb-3 font-serif">
            ApexCMS operates with strict privacy standards (GDPR/CCPA/Consent Mode v2). Essential session cookies are strictly necessary.
          </p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setCookieConsent('declined')}
              className="px-3 py-1.5 rounded-lg text-[11px] font-medium bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
            >
              {t.essentialOnly}
            </button>
            <button
              onClick={() => setCookieConsent('accepted')}
              className="px-3 py-1.5 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded-lg text-[11px] font-bold"
            >
              {t.acceptAll}
            </button>
          </div>
        </div>
      )}

      {/* Hindu Panchang, Vrat & Festivals Astronomical Calculator Modal */}
      {showPanchangModal && (
        <HinduPanchangTool
          onClose={() => setShowPanchangModal(false)}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
};
