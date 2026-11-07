import React, { useState, useRef } from 'react';
import {
  ChevronDown,
  SlidersHorizontal,
  Search,
  Pin,
  X
} from 'lucide-react';
import { AppItem, LauncherConfig } from '../types';
import { AppIcon } from './AppIcon';
import { AppBrandIcon } from './AppBrandIcon';

interface AppDrawerProps {
  apps: AppItem[];
  config: LauncherConfig;
  onClose: () => void;
  onOpenSettings: () => void;
  onLaunchApp: (app: { id: string; name: string; subText?: string; accentColor?: string }) => void;
  onPinToCapsule: (app: AppItem) => void;
}

export const AppDrawer: React.FC<AppDrawerProps> = ({
  apps,
  config,
  onClose,
  onOpenSettings,
  onLaunchApp,
  onPinToCapsule,
}) => {
  const isTr = config.language === 'tr';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const touchStartY = useRef<number | null>(null);

  // Swipe-down to close gesture
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (deltaY > 40) {
      onClose();
    }
    touchStartY.current = null;
  };

  // Filter apps
  const filteredApps = apps.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Icon shape classes based on config
  const getShapeClasses = () => {
    switch (config.iconShape) {
      case 'squircle':
        return 'rounded-[20px]';
      case 'rounded':
        return 'rounded-xl';
      case 'circle':
      default:
        return 'rounded-full';
    }
  };

  // Dynamic grid class
  const getGridColsClass = () => {
    switch (config.gridColumns) {
      case 3:
        return 'grid-cols-3';
      case 5:
        return 'grid-cols-5';
      case 4:
      default:
        return 'grid-cols-4';
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="absolute inset-0 z-40 flex flex-col justify-between overflow-hidden select-none"
      style={{
        backgroundColor: 'rgba(5, 7, 11, 0.90)', // 0xE605070B
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
      }}
    >
      {/* Top Section */}
      <div className="flex-1 flex flex-col pt-10 overflow-hidden">
        {/* Header: Close Button + "Uygulamalar" Title */}
        <div className="px-6 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1 -ml-2 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
              title={isTr ? 'Kapat' : 'Close'}
            >
              <ChevronDown size={32} />
            </button>
            <h2 className="text-white text-2xl font-medium tracking-tight">
              {isTr ? 'Uygulamalar' : 'Apps'}
            </h2>
          </div>

          <span className="text-xs text-slate-400 font-mono">
            {filteredApps.length} {isTr ? 'uygulama' : 'apps'}
          </span>
        </div>

        {/* Search Bar */}
        <div className="px-6 py-2 shrink-0">
          <div className="relative flex items-center bg-white/10 border border-white/15 rounded-2xl px-3.5 py-2">
            <Search size={16} className="text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isTr ? 'Uygulamalarda ara...' : 'Search apps...'}
              className="bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none w-full"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-slate-400 hover:text-white p-0.5"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="px-6 py-1.5 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
          {[
            { id: 'all', labelTr: 'Tümü', labelEn: 'All' },
            { id: 'social', labelTr: 'Sosyal', labelEn: 'Social' },
            { id: 'media', labelTr: 'Medya', labelEn: 'Media' },
            { id: 'tools', labelTr: 'Araçlar', labelEn: 'Tools' },
            { id: 'dev', labelTr: 'Geliştirici', labelEn: 'Dev' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-white/20 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              {isTr ? cat.labelTr : cat.labelEn}
            </button>
          ))}
        </div>

        {/* LazyVerticalGrid (columns = GridCells.Fixed(config.gridColumns)) */}
        <div className="flex-1 overflow-y-auto px-6 py-4 no-scrollbar">
          <div className={`grid ${getGridColsClass()} gap-x-4 gap-y-6 pb-28`}>
            {filteredApps.map((app) => (
              <div
                key={app.id}
                className="group flex flex-col items-center cursor-pointer relative"
                onClick={() =>
                  onLaunchApp({
                    id: app.id,
                    name: app.name,
                    subText: app.description,
                    accentColor: app.color,
                  })
                }
              >
                {/* 60dp Colorful Brand Icon Container */}
                <div className="relative">
                  <AppBrandIcon
                    appId={app.id}
                    name={app.name}
                    fallbackColor={app.color}
                    size={60}
                    shape={config.iconShape}
                    theme={config.iconTheme}
                    glow={config.iconGlow}
                    className="transition-all duration-200 group-hover:scale-110 active:scale-95 cursor-pointer"
                  />

                  {/* Pin to Home Capsule Quick Action */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPinToCapsule(app);
                    }}
                    title={isTr ? 'Kapsül Olarak Sabitle' : 'Pin as Capsule'}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-20 cursor-pointer"
                  >
                    <Pin size={10} />
                  </button>
                </div>

                {/* Label: 11sp, White, maxLines 1, text-overflow: ellipsis */}
                <span className="text-[11px] font-medium text-white text-center truncate max-w-[72px] mt-2 leading-tight drop-shadow-sm group-hover:text-purple-200 transition-colors">
                  {app.name}
                </span>
              </div>
            ))}
          </div>

          {filteredApps.length === 0 && (
            <div className="py-12 text-center text-slate-400 text-xs">
              {isTr ? 'Eşleşen uygulama bulunamadı' : 'No applications found'}
            </div>
          )}
        </div>
      </div>

      {/* 3. AYARLAR DÜĞMESİ (Sağ alt köşede, cam efektli - Surface 64dp, 20dp rounded) */}
      <div className="absolute bottom-6 right-6 z-10">
        <button
          onClick={onOpenSettings}
          className="w-16 h-16 rounded-[20px] flex items-center justify-center transition-all duration-200 active:scale-95 hover:bg-white/[0.20] group cursor-pointer"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.10)', // 0x1AFFFFFF cam efekti
            border: '1px solid rgba(255, 255, 255, 0.20)', // 0x33FFFFFF
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.40)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
          title={isTr ? 'Çekmece Görünüm Ayarları' : 'Drawer Appearance Settings'}
        >
          <SlidersHorizontal
            size={28}
            className="text-white group-hover:rotate-45 transition-transform duration-300"
          />
        </button>
      </div>
    </div>
  );
};
