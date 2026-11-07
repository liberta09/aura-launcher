import React, { useState, useEffect } from 'react';
import {
  Wifi,
  Battery,
  Sparkles,
  Layers,
  SlidersHorizontal,
  PlusCircle,
  Code2,
  Maximize2,
  Minimize2,
  Volume2
} from 'lucide-react';
import { CapsuleItem, AppItem, LauncherConfig } from '../types';
import { HomeScreen } from './HomeScreen';
import { AppDrawer } from './AppDrawer';
import { SimulatedAppModal } from './SimulatedAppModal';
import { WALLPAPERS } from '../data/initialData';

interface PhoneSimulatorProps {
  capsules: CapsuleItem[];
  apps: AppItem[];
  config: LauncherConfig;
  onOpenSettings: () => void;
  onOpenCapsuleManager: () => void;
  onPinToCapsule: (app: AppItem) => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export const PhoneSimulator: React.FC<PhoneSimulatorProps> = ({
  capsules,
  apps,
  config,
  onOpenSettings,
  onOpenCapsuleManager,
  onPinToCapsule,
  isFullscreen = false,
  onToggleFullscreen,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeApp, setActiveApp] = useState<{
    id: string;
    name: string;
    subText?: string;
    accentColor?: string;
  } | null>(null);

  // Live clock for status bar
  const [timeStr, setTimeStr] = useState('16:42');

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTimeStr(
        `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const currentWallpaper =
    WALLPAPERS.find((w) => w.id === config.wallpaperId) || WALLPAPERS[0];

  const handleLaunchApp = (app: {
    id: string;
    name: string;
    subText?: string;
    accentColor?: string;
  }) => {
    setActiveApp(app);
  };

  const handleCloseApp = () => {
    setActiveApp(null);
  };

  const isTr = config.language === 'tr';

  return (
    <div className={`relative flex items-center justify-center ${isFullscreen ? 'w-full h-full' : 'p-2'}`}>
      {/* Device Frame Wrapper */}
      <div
        className={`relative transition-all duration-300 ${
          isFullscreen
            ? 'w-full h-full max-w-none rounded-none border-0'
            : 'w-[380px] sm:w-[410px] h-[820px] rounded-[52px] border-[10px] border-[#181920] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.08)] ring-1 ring-white/10'
        } overflow-hidden flex flex-col`}
        style={{
          background: currentWallpaper.gradient,
        }}
      >
        {/* Device Gloss Reflection (subtle aesthetic) */}
        {!isFullscreen && (
          <div className="absolute inset-0 pointer-events-none rounded-[42px] overflow-hidden z-30">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.03] to-transparent" />
          </div>
        )}

        {/* Top Status Bar & Camera Notch */}
        <div className="h-9 px-6 pt-2 flex items-center justify-between text-xs font-medium text-white/90 shrink-0 z-40 select-none">
          {/* Left: Time */}
          <span className="text-xs font-semibold tracking-tight">{timeStr}</span>

          {/* Center: Punch Hole Camera */}
          <div className="w-4 h-4 rounded-full bg-black/90 border border-white/10 shadow-inner flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-900/40" />
          </div>

          {/* Right: Icons (5G, Wifi, Battery) */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold tracking-tight text-white/80">5G</span>
            <Wifi size={13} className="text-white/90" />
            <div className="flex items-center gap-0.5">
              <span className="text-[10px] font-mono">84%</span>
              <Battery size={14} className="text-white/90" />
            </div>
          </div>
        </div>

        {/* Screen Viewport */}
        <div className="relative flex-1 w-full overflow-hidden flex flex-col">
          {/* 1. ANA EKRAN (Uygulamaların Görünüşü) */}
          <HomeScreen
            capsules={capsules}
            config={config}
            onOpenDrawer={() => setIsDrawerOpen(true)}
            onLaunchApp={handleLaunchApp}
          />

          {/* 2. UYGULAMA ÇEKMECESİ (App Drawer - AnimatedVisibility slide in/out) */}
          <div
            className={`absolute inset-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] z-40 ${
              isDrawerOpen
                ? 'translate-y-0 opacity-100 pointer-events-auto'
                : 'translate-y-full opacity-0 pointer-events-none'
            }`}
          >
            {isDrawerOpen && (
              <AppDrawer
                apps={apps}
                config={config}
                onClose={() => setIsDrawerOpen(false)}
                onOpenSettings={onOpenSettings}
                onLaunchApp={handleLaunchApp}
                onPinToCapsule={onPinToCapsule}
              />
            )}
          </div>

          {/* 3. SIMULATED APP WINDOW (When user taps an app or capsule) */}
          {activeApp && (
            <SimulatedAppModal
              app={activeApp}
              onClose={handleCloseApp}
              language={config.language}
            />
          )}
        </div>

        {/* Android Gesture Navigation Bar (Bottom Pill) */}
        <div className="h-7 bg-transparent flex items-center justify-center shrink-0 z-40 select-none pb-1">
          <button
            onClick={() => {
              if (activeApp) {
                handleCloseApp();
              } else if (isDrawerOpen) {
                setIsDrawerOpen(false);
              }
            }}
            className="w-32 h-1 bg-white/70 hover:bg-white rounded-full transition-colors cursor-pointer active:scale-95"
            title={isTr ? 'Ana Ekrana Dön' : 'Return to Home'}
          />
        </div>
      </div>
    </div>
  );
};
