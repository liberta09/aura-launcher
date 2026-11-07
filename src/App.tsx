import React, { useState } from 'react';
import {
  Smartphone,
  Code2,
  SlidersHorizontal,
  Sparkles,
  Download,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  Layers,
  Info,
  BookOpen,
  ArrowRight,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import {
  CapsuleItem,
  AppItem,
  LauncherConfig
} from './types';
import {
  INITIAL_CAPSULES,
  INITIAL_APPS,
  DEFAULT_CONFIG
} from './data/initialData';
import { PhoneSimulator } from './components/PhoneSimulator';
import { KotlinCodeView } from './components/KotlinCodeView';
import { SettingsModal } from './components/SettingsModal';
import { CapsuleManagerModal } from './components/CapsuleManagerModal';
import { generateKotlinComposeCode } from './utils/kotlinGenerator';

export default function App() {
  const [config, setConfig] = useState<LauncherConfig>(DEFAULT_CONFIG);
  const [capsules, setCapsules] = useState<CapsuleItem[]>(INITIAL_CAPSULES);
  const [apps, setApps] = useState<AppItem[]>(INITIAL_APPS);

  // Layout View Mode: 'split' | 'phone' | 'code' | 'fullscreen'
  const [viewMode, setViewMode] = useState<'split' | 'phone' | 'code' | 'fullscreen'>('split');

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCapsuleManagerOpen, setIsCapsuleManagerOpen] = useState(false);
  const [copiedCodeToast, setCopiedCodeToast] = useState(false);

  const isTr = config.language === 'tr';

  const handleUpdateConfig = (newConfig: Partial<LauncherConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const handleResetConfig = () => {
    setConfig(DEFAULT_CONFIG);
    setCapsules(INITIAL_CAPSULES);
  };

  const handleAddCapsule = (newCapsule: CapsuleItem) => {
    setCapsules((prev) => [...prev, newCapsule]);
  };

  const handleUpdateCapsule = (id: string, updated: Partial<CapsuleItem>) => {
    setCapsules((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updated } : c))
    );
  };

  const handleDeleteCapsule = (id: string) => {
    setCapsules((prev) => prev.filter((c) => c.id !== id));
  };

  const handlePinAppToCapsule = (app: AppItem) => {
    if (capsules.some((c) => c.appId === app.id || c.name === app.name)) {
      // Already pinned
      return;
    }
    const newCapsule: CapsuleItem = {
      id: `capsule-${app.id}-${Date.now()}`,
      name: app.name,
      subText: isTr ? 'Hızlı başlat' : 'Quick launch',
      iconName: app.iconName,
      accentColor: app.color,
      appId: app.id,
    };
    setCapsules((prev) => [...prev, newCapsule]);
  };

  const handleCopyFullKotlin = () => {
    const code = generateKotlinComposeCode(config, capsules, apps);
    navigator.clipboard.writeText(code);
    setCopiedCodeToast(true);
    setTimeout(() => setCopiedCodeToast(false), 2200);
  };

  return (
    <div className="min-h-screen w-full bg-[#07080d] text-slate-100 flex flex-col font-sans selection:bg-purple-500/30 selection:text-white">
      {/* 1. TOP BAR CONTRACT */}
      {/* [Brand title, one line] — [4–5 nav links, 1–2 word labels, single-line] — [1 primary action] */}
      <header className="h-16 px-6 lg:px-8 border-b border-white/10 bg-[#090A0F]/90 backdrop-blur-md flex items-center justify-between gap-8 shrink-0 z-50 sticky top-0">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
          <div className="w-8 h-8 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-inner">
            <Sparkles size={16} />
          </div>
          <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0">
            Aura Launcher
          </span>
        </div>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => setViewMode('split')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              viewMode === 'split' ? 'text-white font-semibold' : 'hover:text-white text-slate-400'
            }`}
          >
            {isTr ? 'İkili Görünüm' : 'Split View'}
          </button>
          <button
            onClick={() => setViewMode('phone')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              viewMode === 'phone' ? 'text-white font-semibold' : 'hover:text-white text-slate-400'
            }`}
          >
            {isTr ? 'Cihaz Simülatörü' : 'Device Simulator'}
          </button>
          <button
            onClick={() => setIsCapsuleManagerOpen(true)}
            className="whitespace-nowrap shrink-0 hover:text-white text-slate-400 transition-colors"
          >
            {isTr ? 'Kapsül Yöneticisi' : 'Capsule Manager'}
          </button>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="whitespace-nowrap shrink-0 hover:text-white text-slate-400 transition-colors"
          >
            {isTr ? 'Çekmece Ayarları' : 'Drawer Settings'}
          </button>
          <button
            onClick={() => setViewMode('code')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              viewMode === 'code' ? 'text-white font-semibold' : 'hover:text-white text-slate-400'
            }`}
          >
            {isTr ? 'Kotlin Kaynak Kodu' : 'Kotlin Source'}
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleCopyFullKotlin}
            className="px-4 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-all shadow-md shadow-purple-900/30 flex items-center gap-2 whitespace-nowrap shrink-0 active:scale-95 cursor-pointer"
          >
            {copiedCodeToast ? (
              <>
                <Check size={14} className="text-emerald-300" />
                <span>{isTr ? 'Kod Kopyalandı!' : 'Code Copied!'}</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>{isTr ? 'Kotlin Kodunu Kopyala' : 'Copy Kotlin Code'}</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* 2. SUB-TOOLBAR FOR VIEW MODES & QUICK TOGGLES */}
      <div className="px-6 lg:px-8 py-3 bg-white/[0.02] border-b border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs">
        {/* Left: View Mode Toggle Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-white/10">
          <button
            onClick={() => setViewMode('split')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
              viewMode === 'split'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers size={14} />
            <span>{isTr ? 'İkili Stüdyo' : 'Studio Split'}</span>
          </button>
          <button
            onClick={() => setViewMode('phone')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
              viewMode === 'phone'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone size={14} />
            <span>{isTr ? 'Yalnızca Telefon' : 'Phone Only'}</span>
          </button>
          <button
            onClick={() => setViewMode('code')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
              viewMode === 'code'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 size={14} />
            <span>{isTr ? 'Yalnızca Kod' : 'Code Only'}</span>
          </button>
          <button
            onClick={() => setViewMode('fullscreen')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
              viewMode === 'fullscreen'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title={isTr ? 'Tam Ekran Cihaz' : 'Fullscreen Device'}
          >
            <Maximize2 size={14} />
            <span>{isTr ? 'Tam Ekran' : 'Fullscreen'}</span>
          </button>
        </div>

        {/* Right: Interactive Quick Customization Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Icon Theme Toggle */}
          <div className="flex items-center gap-1 p-0.5 bg-slate-900/80 rounded-xl border border-white/10">
            <button
              onClick={() => handleUpdateConfig({ iconTheme: 'vibrant' })}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                config.iconTheme === 'vibrant'
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title={isTr ? 'Canlı Renkli & Gradyan İkonlar' : 'Vibrant & Colorful 3D Icons'}
            >
              {isTr ? '✨ Canlı Renkli' : '✨ Vibrant'}
            </button>
            <button
              onClick={() => handleUpdateConfig({ iconTheme: 'glass' })}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                config.iconTheme === 'glass'
                  ? 'bg-purple-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title={isTr ? 'Cam Neon İkonlar' : 'Tinted Glass Neon Icons'}
            >
              {isTr ? 'Cam Neon' : 'Glass'}
            </button>
            <button
              onClick={() => handleUpdateConfig({ iconTheme: 'monochrome' })}
              className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                config.iconTheme === 'monochrome'
                  ? 'bg-slate-700 text-white font-semibold shadow-sm'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
              title={isTr ? 'Orijinal Minimal Koyu' : 'Original Monochrome'}
            >
              {isTr ? 'Minimal' : 'Mono'}
            </button>
          </div>

          <button
            onClick={() => setIsCapsuleManagerOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles size={14} className="text-purple-400" />
            <span>{isTr ? 'Kapsülleri Düzenle' : 'Edit Capsules'}</span>
            <span className="w-5 h-5 rounded-full bg-white/10 text-[10px] flex items-center justify-center font-bold">
              {capsules.length}
            </span>
          </button>

          <button
            onClick={() => setIsSettingsOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <SlidersHorizontal size={14} className="text-sky-400" />
            <span>{isTr ? 'Görünüm Ayarları' : 'Settings'}</span>
          </button>
        </div>
      </div>

      {/* 3. MAIN WORKSPACE */}
      <main className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 max-w-[1720px] w-full mx-auto overflow-hidden">
        {/* FULLSCREEN VIEW */}
        {viewMode === 'fullscreen' && (
          <div className="fixed inset-0 z-50 bg-[#090A0F] flex flex-col">
            <div className="absolute top-3 right-4 z-50">
              <button
                onClick={() => setViewMode('split')}
                className="px-3 py-1.5 bg-black/70 hover:bg-black text-white text-xs rounded-xl backdrop-blur-md border border-white/20 flex items-center gap-1.5 shadow-lg"
              >
                <Minimize2 size={14} />
                <span>{isTr ? 'Tam Ekrandan Çık' : 'Exit Fullscreen'}</span>
              </button>
            </div>
            <PhoneSimulator
              capsules={capsules}
              apps={apps}
              config={config}
              onOpenSettings={() => setIsSettingsOpen(true)}
              onOpenCapsuleManager={() => setIsCapsuleManagerOpen(true)}
              onPinToCapsule={handlePinAppToCapsule}
              isFullscreen={true}
            />
          </div>
        )}

        {/* SPLIT VIEW (Simulator Left / Center + Kotlin Code Inspector Right) */}
        {viewMode === 'split' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start h-full">
            {/* Left Column: Device Simulator & Live Interaction (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="w-full flex items-center justify-between px-2 mb-3 text-xs text-slate-400">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Smartphone size={14} className="text-purple-400" />
                  <span>{isTr ? 'Canlı Android Cihaz Önizlemesi' : 'Live Android Device Preview'}</span>
                </span>
                <span className="text-[11px] text-slate-500">
                  {isTr ? 'Yukarı kaydırarak çekmeceyi açın' : 'Swipe up to open drawer'}
                </span>
              </div>

              <PhoneSimulator
                capsules={capsules}
                apps={apps}
                config={config}
                onOpenSettings={() => setIsSettingsOpen(true)}
                onOpenCapsuleManager={() => setIsCapsuleManagerOpen(true)}
                onPinToCapsule={handlePinAppToCapsule}
                isFullscreen={false}
              />
            </div>

            {/* Right Column: Synchronized Jetpack Compose Kotlin Code & APK Setup (7 cols) */}
            <div className="lg:col-span-7 flex flex-col h-[820px]">
              <div className="w-full flex items-center justify-between px-2 mb-3 text-xs text-slate-400">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Code2 size={14} className="text-emerald-400" />
                  <span>{isTr ? 'Senkronize Kotlin Jetpack Compose Kodu' : 'Synchronized Jetpack Compose Source'}</span>
                </span>
                <span className="text-[11px] text-emerald-400/90 font-mono">
                  com.example.mylauncher
                </span>
              </div>

              <div className="flex-1 overflow-hidden">
                <KotlinCodeView
                  config={config}
                  capsules={capsules}
                  apps={apps}
                  language={config.language}
                />
              </div>
            </div>
          </div>
        )}

        {/* PHONE ONLY VIEW */}
        {viewMode === 'phone' && (
          <div className="flex flex-col items-center justify-center flex-1 py-4">
            <div className="mb-4 text-center">
              <h2 className="text-lg font-bold text-white">
                {isTr ? 'Aura Launcher Android Simülatörü' : 'Aura Launcher Android Simulator'}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {isTr
                  ? 'Fareyle veya parmağınızla yukarı kaydırarak uygulama çekmecesini açın.'
                  : 'Drag or swipe upward on the home screen to open the app drawer.'}
              </p>
            </div>
            <PhoneSimulator
              capsules={capsules}
              apps={apps}
              config={config}
              onOpenSettings={() => setIsSettingsOpen(true)}
              onOpenCapsuleManager={() => setIsCapsuleManagerOpen(true)}
              onPinToCapsule={handlePinAppToCapsule}
              isFullscreen={false}
            />
          </div>
        )}

        {/* CODE ONLY VIEW */}
        {viewMode === 'code' && (
          <div className="flex-1 flex flex-col h-[85vh]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">
                  {isTr ? 'Kotlin & Jetpack Compose Kaynak Kodu' : 'Kotlin & Jetpack Compose Source Studio'}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isTr
                    ? 'Android Studio için derlemeye hazır Kotlin kodları, bağımlılıklar ve bildirim dosyası.'
                    : 'Compilation-ready Kotlin files, Gradle build script, and AndroidManifest.'}
                </p>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <KotlinCodeView
                config={config}
                capsules={capsules}
                apps={apps}
                language={config.language}
              />
            </div>
          </div>
        )}
      </main>

      {/* 4. MODALS */}
      {isSettingsOpen && (
        <SettingsModal
          config={config}
          onUpdateConfig={handleUpdateConfig}
          onResetConfig={handleResetConfig}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}

      {isCapsuleManagerOpen && (
        <CapsuleManagerModal
          capsules={capsules}
          onAddCapsule={handleAddCapsule}
          onUpdateCapsule={handleUpdateCapsule}
          onDeleteCapsule={handleDeleteCapsule}
          onClose={() => setIsCapsuleManagerOpen(false)}
          language={config.language}
        />
      )}
    </div>
  );
}
