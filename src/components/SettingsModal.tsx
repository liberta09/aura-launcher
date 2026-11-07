import React from 'react';
import {
  X,
  Grid3X3,
  Columns4,
  Layers,
  Palette,
  Sliders,
  RotateCcw,
  Languages,
  Check,
  Smartphone
} from 'lucide-react';
import { LauncherConfig, IconShape, WallpaperId } from '../types';
import { WALLPAPERS, DEFAULT_CONFIG } from '../data/initialData';

interface SettingsModalProps {
  config: LauncherConfig;
  onUpdateConfig: (newConfig: Partial<LauncherConfig>) => void;
  onResetConfig: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  config,
  onUpdateConfig,
  onResetConfig,
  onClose,
}) => {
  const isTr = config.language === 'tr';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0e111a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
              <Sliders size={20} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">
                {isTr ? 'Çekmece Görünüm Ayarları' : 'Drawer Appearance Settings'}
              </h2>
              <p className="text-xs text-slate-400">
                {isTr
                  ? 'Aura Launcher tasarımını ve ızgarasını özelleştirin'
                  : 'Customize Aura Launcher aesthetics and grid layout'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto text-sm text-slate-200">
          {/* 1. Grid Kolonları (Grid Columns) */}
          <div className="space-y-2.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Grid3X3 size={15} />
              <span>{isTr ? 'Izgara Kolon Sayısı' : 'Grid Columns (LazyVerticalGrid)'}</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {([3, 4, 5] as const).map((col) => (
                <button
                  key={col}
                  onClick={() => onUpdateConfig({ gridColumns: col })}
                  className={`py-3 px-4 rounded-2xl border text-center transition-all ${
                    config.gridColumns === col
                      ? 'bg-purple-600/30 border-purple-500 text-white font-bold shadow-lg shadow-purple-600/20'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <span className="block text-base">{col} {isTr ? 'Kolon' : 'Columns'}</span>
                  <span className="block text-[11px] text-slate-400 mt-0.5">
                    {col === 4 ? (isTr ? '(Varsayılan)' : '(Default)') : ''}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. İkon Şekli (Icon Shape) */}
          <div className="space-y-2.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Layers size={15} />
              <span>{isTr ? 'İkon Şekli & Maskesi' : 'App Icon Mask'}</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'circle', labelTr: 'Daire', labelEn: 'Circle', shapeClass: 'rounded-full' },
                { id: 'squircle', labelTr: 'Squircle', labelEn: 'Squircle', shapeClass: 'rounded-2xl' },
                { id: 'rounded', labelTr: 'Yuvarlak', labelEn: 'Rounded', shapeClass: 'rounded-lg' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => onUpdateConfig({ iconShape: item.id as IconShape })}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                    config.iconShape === item.id
                      ? 'bg-purple-600/30 border-purple-500 text-white font-bold shadow-md shadow-purple-600/20'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <div
                    className={`w-9 h-9 border border-white/40 bg-white/20 ${item.shapeClass}`}
                  />
                  <span className="text-xs">
                    {isTr ? item.labelTr : item.labelEn}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. İkon Renk Teması & Canlılık (Icon Theme) */}
          <div className="space-y-2.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Palette size={15} className="text-emerald-400" />
                <span>{isTr ? 'İkon Renk Teması & Stili' : 'Icon Color Theme'}</span>
              </span>
              <button
                type="button"
                onClick={() => onUpdateConfig({ iconGlow: !config.iconGlow })}
                className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
                  config.iconGlow
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                    : 'bg-white/5 border-white/10 text-slate-400'
                }`}
              >
                {isTr ? (config.iconGlow ? '✨ Işıltı Açık' : 'Işıltı Kapalı') : (config.iconGlow ? '✨ Glow On' : 'Glow Off')}
              </button>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  id: 'vibrant',
                  labelTr: 'Canlı Gradyan',
                  labelEn: 'Vibrant 3D',
                  subTr: 'Renkli & Parlak (Önerilen)',
                  subEn: 'Rich Colors (Recommended)',
                  preview: 'linear-gradient(135deg, #FF0080, #7928CA)',
                },
                {
                  id: 'glass',
                  labelTr: 'Cam Aurora',
                  labelEn: 'Tinted Glass',
                  subTr: 'Saydam & Neon',
                  subEn: 'Translucent Neon',
                  preview: 'linear-gradient(135deg, rgba(56,189,248,0.5), rgba(168,85,247,0.5))',
                },
                {
                  id: 'monochrome',
                  labelTr: 'Minimal Gri',
                  labelEn: 'Monochrome',
                  subTr: 'Kotlin Orijinal',
                  subEn: 'Compose 0x26FFFFFF',
                  preview: 'rgba(255,255,255,0.15)',
                },
              ].map((themeItem) => (
                <button
                  key={themeItem.id}
                  onClick={() => onUpdateConfig({ iconTheme: themeItem.id as any })}
                  className={`p-3 rounded-2xl border flex flex-col items-center text-center gap-2 transition-all cursor-pointer ${
                    config.iconTheme === themeItem.id
                      ? 'bg-emerald-600/30 border-emerald-500 text-white font-bold shadow-md shadow-emerald-600/20'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-xl shadow-md border border-white/30"
                    style={{ background: themeItem.preview }}
                  />
                  <div>
                    <span className="block text-xs font-semibold">
                      {isTr ? themeItem.labelTr : themeItem.labelEn}
                    </span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">
                      {isTr ? themeItem.subTr : themeItem.subEn}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Kapsül Köşe Yuvarlaklığı (Capsule Radius) */}
          <div className="space-y-2.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Smartphone size={15} />
              <span>{isTr ? 'Ana Ekran Kapsül Eğriliği (dp)' : 'Capsule Corner Radius'}</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[16, 20, 24, 28].map((radius) => (
                <button
                  key={radius}
                  onClick={() => onUpdateConfig({ capsuleRadius: radius })}
                  className={`py-2 px-3 rounded-xl border text-xs text-center transition-all ${
                    config.capsuleRadius === radius
                      ? 'bg-emerald-600/30 border-emerald-500 text-white font-bold'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {radius} dp {radius === 24 ? '★' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Duvar Kağıdı (Wallpapers) */}
          <div className="space-y-2.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Palette size={15} />
              <span>{isTr ? 'Aura Duvar Kağıdı Teması' : 'Wallpaper Theme'}</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {WALLPAPERS.map((wp) => (
                <button
                  key={wp.id}
                  onClick={() => onUpdateConfig({ wallpaperId: wp.id as WallpaperId })}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                    config.wallpaperId === wp.id
                      ? 'border-purple-500 bg-white/10 shadow-md'
                      : 'border-white/10 bg-white/5 hover:bg-white/[0.08]'
                  }`}
                >
                  <div
                    className="w-10 h-10 rounded-xl border border-white/20 shrink-0 shadow-inner"
                    style={{ background: wp.gradient }}
                  />
                  <div className="truncate flex-1">
                    <p className="text-xs font-medium text-white truncate">
                      {isTr ? wp.nameTr : wp.nameEn}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {wp.id === 'void' ? 'Kotlin Default (#090A0F)' : 'Dynamic gradient'}
                    </p>
                  </div>
                  {config.wallpaperId === wp.id && (
                    <Check size={16} className="text-purple-400 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Dil Seçimi (Language) */}
          <div className="space-y-2.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Languages size={15} />
              <span>{isTr ? 'Arayüz Dili' : 'Interface Language'}</span>
            </label>
            <div className="flex gap-3">
              {[
                { id: 'tr', label: 'Türkçe (Orijinal Kod)' },
                { id: 'en', label: 'English' },
              ].map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => onUpdateConfig({ language: lang.id as 'tr' | 'en' })}
                  className={`flex-1 py-2.5 px-3 rounded-xl border text-xs text-center transition-all ${
                    config.language === lang.id
                      ? 'bg-sky-600/30 border-sky-500 text-white font-bold'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between">
          <button
            onClick={onResetConfig}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw size={14} />
            <span>{isTr ? 'Kotlin Varsayılanlarına Sıfırla' : 'Reset to Kotlin Defaults'}</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs transition-colors shadow-lg"
          >
            {isTr ? 'Uygula & Kapat' : 'Apply & Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
