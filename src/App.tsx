import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { WebsiteView } from './components/WebsiteView';
import { InstallWizardView } from './components/InstallWizardView';
import { AdminView } from './components/AdminView';
import { PackageInspectorModal } from './components/PackageInspectorModal';
import {
  initialPosts,
  initialPages,
  initialProducts,
  initialBlocks,
  initialOrders,
  initialRedirects,
  initialTools,
  initialMenus,
  initialEmailSettings,
  initialFormSubmissions,
  initialBackups,
  initialThemes,
  initialSeoMedia,
  initialSiteIntegrations,
  initialPaymentGateways
} from './data/initialData';
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
} from './types/cms';

export default function App() {
  const [currentView, setCurrentView] = useState<'website' | 'install' | 'admin'>('website');
  const [shopEnabled, setShopEnabled] = useState<boolean>(true);
  const [activeTheme, setActiveTheme] = useState<'magazine' | 'storefront'>('magazine');
  const [locale, setLocale] = useState<string>('en');

  // DEFAULT THEME IS LIGHT MODE (as explicitly requested: "default theme is light mode")
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Sync document root class for Tailwind CSS v4 class-based dark variant
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Admin View Navigation State (e.g. from "Edit Page in Admin" link)
  const [adminTab, setAdminTab] = useState<
    'dashboard' | 'posts' | 'pages' | 'products' | 'orders' | 'blocks' | 'menus' | 'email' | 'seo' | 'integrations' | 'themes' | 'tools' | 'backups' | 'settings'
  >('dashboard');
  const [adminEditingPageId, setAdminEditingPageId] = useState<number | null>(null);

  const handleNavigateToAdmin = (
    tab: 'dashboard' | 'posts' | 'pages' | 'products' | 'orders' | 'blocks' | 'menus' | 'email' | 'seo' | 'integrations' | 'themes' | 'tools' | 'backups' | 'settings' = 'dashboard',
    editPageId?: number
  ) => {
    setAdminTab(tab);
    setAdminEditingPageId(editPageId || null);
    setCurrentView('admin');
  };

  // Application Data States
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [pages, setPages] = useState<Page[]>(initialPages);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [blocks, setBlocks] = useState<HomepageBlock[]>(initialBlocks);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [redirects, setRedirects] = useState<RedirectRule[]>(initialRedirects);
  const [tools, setTools] = useState<ToolPlugin[]>(initialTools);
  const [menus, setMenus] = useState<MenuItem[]>(initialMenus);
  const [emailSettings, setEmailSettings] = useState<EmailSettings>(initialEmailSettings);
  const [formSubmissions, setFormSubmissions] = useState<FormSubmission[]>(initialFormSubmissions);
  const [backups, setBackups] = useState<BackupSnapshot[]>(initialBackups);
  const [themes, setThemes] = useState<ThemeConfig[]>(initialThemes);
  const [seoMedia, setSeoMedia] = useState<SeoMediaAssets>(initialSeoMedia);
  const [siteIntegrations, setSiteIntegrations] = useState<SiteIntegrations>(initialSiteIntegrations);
  const [paymentGateways, setPaymentGateways] = useState<PaymentGatewaySettings>(initialPaymentGateways);

  // Cart & Commerce States
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([
    { product: initialProducts[0], quantity: 1 }
  ]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  // Package Inspector Modal State
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(false);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleCompleteOrder = (orderDetails: any) => {
    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: orderDetails.customerName,
      customerEmail: orderDetails.customerEmail,
      items: orderDetails.items,
      subtotal: orderDetails.subtotal,
      tax: orderDetails.tax,
      shipping: orderDetails.shipping,
      total: orderDetails.total,
      paymentMethod: orderDetails.paymentMethod,
      paymentStatus: 'paid',
      orderStatus: 'completed',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setOrders([newOrder, ...orders]);
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={`min-h-screen font-sans antialiased flex flex-col selection:bg-amber-600 selection:text-white ${
      isDarkMode ? 'dark bg-[#121212] text-stone-100' : 'bg-[#faf8f5] text-stone-900'
    }`}>
      {/* Top Global Navigation with Translate Dropdown, Shop Toggle & Light/Dark */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        shopEnabled={shopEnabled}
        setShopEnabled={setShopEnabled}
        activeTheme={activeTheme}
        setActiveTheme={setActiveTheme}
        locale={locale}
        setLocale={setLocale}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onOpenInspector={() => setIsInspectorOpen(true)}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Viewport Content */}
      <div className="flex-1">
        {currentView === 'website' && (
          <WebsiteView
            posts={posts}
            pages={pages}
            products={products}
            blocks={blocks}
            setBlocks={setBlocks}
            tools={tools}
            menus={menus}
            shopEnabled={shopEnabled}
            activeTheme={activeTheme}
            locale={locale}
            isDarkMode={isDarkMode}
            seoMedia={seoMedia}
            paymentGateways={paymentGateways}
            cart={cart}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            onOpenCheckout={() => setIsCheckoutOpen(true)}
            isCartOpen={isCartOpen}
            setIsCartOpen={setIsCartOpen}
            isCheckoutOpen={isCheckoutOpen}
            setIsCheckoutOpen={setIsCheckoutOpen}
            onCompleteOrder={handleCompleteOrder}
            onNavigateToAdmin={handleNavigateToAdmin}
            emailSettings={emailSettings}
            onContactSubmit={(submission) => setFormSubmissions((prev) => [submission, ...prev])}
          />
        )}

        {currentView === 'install' && (
          <InstallWizardView
            onInstallationComplete={() => setCurrentView('admin')}
          />
        )}

        {currentView === 'admin' && (
          <AdminView
            posts={posts}
            setPosts={setPosts}
            pages={pages}
            setPages={setPages}
            products={products}
            setProducts={setProducts}
            blocks={blocks}
            setBlocks={setBlocks}
            orders={orders}
            setOrders={setOrders}
            redirects={redirects}
            setRedirects={setRedirects}
            tools={tools}
            setTools={setTools}
            menus={menus}
            setMenus={setMenus}
            emailSettings={emailSettings}
            setEmailSettings={setEmailSettings}
            formSubmissions={formSubmissions}
            setFormSubmissions={setFormSubmissions}
            backups={backups}
            setBackups={setBackups}
            themes={themes}
            setThemes={setThemes}
            seoMedia={seoMedia}
            setSeoMedia={setSeoMedia}
            siteIntegrations={siteIntegrations}
            setSiteIntegrations={setSiteIntegrations}
            paymentGateways={paymentGateways}
            setPaymentGateways={setPaymentGateways}
            shopEnabled={shopEnabled}
            setShopEnabled={setShopEnabled}
            activeTheme={activeTheme}
            setActiveTheme={setActiveTheme}
            isDarkMode={isDarkMode}
            initialTab={adminTab}
            initialEditingPageId={adminEditingPageId}
          />
        )}
      </div>

      {/* Standalone Package Inspector Modal */}
      <PackageInspectorModal
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
      />
    </div>
  );
}
