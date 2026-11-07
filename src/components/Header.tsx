import React from 'react';
import { Download, Globe, Shield, Wrench, ShoppingBag, Eye, FileCode2, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  currentView: 'website' | 'install' | 'admin';
  setCurrentView: (view: 'website' | 'install' | 'admin') => void;
  shopEnabled: boolean;
  setShopEnabled: (enabled: boolean) => void;
  activeTheme: 'magazine' | 'storefront';
  setActiveTheme: (theme: 'magazine' | 'storefront') => void;
  locale: string;
  setLocale: (loc: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  onOpenInspector: () => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  shopEnabled,
  setShopEnabled,
  activeTheme,
  setActiveTheme,
  locale,
  setLocale,
  isDarkMode,
  setIsDarkMode,
  onOpenInspector,
  cartCount,
  onOpenCart
}) => {
  const languages = [
    { code: 'en', label: 'English (US)', flag: '🇺🇸' },
    { code: 'es', label: 'Español (ES)', flag: '🇪🇸' },
    { code: 'fr', label: 'Français (FR)', flag: '🇫🇷' },
    { code: 'de', label: 'Deutsch (DE)', flag: '🇩🇪' },
    { code: 'ru', label: 'Русский (RU)', flag: '🇷🇺' },
    { code: 'ja', label: '日本語 (JP)', flag: '🇯🇵' },
    { code: 'ar', label: 'العربية (AR)', flag: '🇸🇦' }
  ];

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
      isDarkMode
        ? 'bg-slate-950/90 border-slate-800 text-slate-100'
        : 'bg-white/95 border-slate-200 text-slate-800 shadow-xs'
    }`}>
      {/* Top Banner with Standalone Package Download */}
      <div className={`px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3 border-b ${
        isDarkMode
          ? 'bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-950 border-blue-900/40 text-slate-200'
          : 'bg-gradient-to-r from-blue-50 via-indigo-50 to-sky-50 border-blue-100 text-slate-700'
      }`}>
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-bold text-blue-600">ApexCMS v1.0.0</span>
          <span className="hidden sm:inline text-slate-500">| Production PHP 8.2+ Standalone (MySQL/MariaDB utf8mb4 + PDO Prepared)</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenInspector}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-xs font-medium transition ${
              isDarkMode
                ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700 shadow-xs'
            }`}
          >
            <FileCode2 className="w-3.5 h-3.5 text-blue-600" />
            Inspect PHP Source
          </button>
          <a
            href="/download/apexcms-v1.0.0.zip"
            download="apexcms-v1.0.0.zip"
            className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded font-bold shadow-xs transition text-xs"
          >
            <Download className="w-3.5 h-3.5" />
            Download Standalone .ZIP (43 KB)
          </a>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-black text-white shadow-md shadow-blue-500/20">
            ⚡
          </div>
          <div>
            <div className={`font-black text-lg tracking-tight flex items-center gap-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Apex<span className="text-blue-600">CMS</span>
            </div>
            <p className="text-[10px] text-slate-600 uppercase tracking-widest font-mono">Production CMS & Shop</p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className={`flex items-center p-1 rounded-xl border ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            onClick={() => setCurrentView('website')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              currentView === 'website'
                ? 'bg-blue-600 text-white shadow-xs'
                : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Live Website
          </button>
          <button
            onClick={() => setCurrentView('install')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              currentView === 'install'
                ? 'bg-blue-600 text-white shadow-xs'
                : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            Web Installer (/install)
          </button>
          <button
            onClick={() => setCurrentView('admin')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              currentView === 'admin'
                ? 'bg-blue-600 text-white shadow-xs'
                : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            Admin Suite (/admin)
          </button>
        </div>

        {/* Live Controls: Translate Dropdown, Shop Toggle, Theme, Light/Dark */}
        <div className="flex items-center gap-2">
          {/* Translate Dropdown */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-300'
          }`}>
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value)}
              className={`bg-transparent font-semibold text-xs focus:outline-none cursor-pointer ${
                isDarkMode ? 'text-slate-200' : 'text-slate-800'
              }`}
              title="Select Language for Server-Side Hreflang"
            >
              {languages.map((lang) => (
                <option
                  key={lang.code}
                  value={lang.code}
                  className={isDarkMode ? 'bg-slate-900 text-slate-200' : 'bg-white text-slate-800'}
                >
                  {lang.flag} {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* Shop Toggle Button */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-300'
          }`}>
            <ShoppingBag className={`w-3.5 h-3.5 ${shopEnabled ? 'text-emerald-500' : 'text-slate-400'}`} />
            <button
              onClick={() => setShopEnabled(!shopEnabled)}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition ${
                shopEnabled
                  ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/30'
                  : 'bg-slate-200 text-slate-500'
              }`}
              title="Toggle shop routes & UI on or off"
            >
              {shopEnabled ? 'SHOP: ON' : 'SHOP: OFF'}
            </button>
          </div>

          {/* Light / Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-lg border transition ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800'
                : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100 shadow-xs'
            }`}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Cart Icon if Shop enabled */}
          {shopEnabled && (
            <button
              onClick={onOpenCart}
              className={`relative p-2 rounded-lg border transition ${
                isDarkMode
                  ? 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-200'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-800 shadow-xs'
              }`}
              title="Open shopping cart"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-emerald-600 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
