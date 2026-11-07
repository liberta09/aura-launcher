import React, { useRef, useState } from 'react';
import { CapsuleItem, LauncherConfig } from '../types';
import { AppCapsule } from './AppCapsule';
import { ChevronUp, CloudSun } from 'lucide-react';

interface HomeScreenProps {
  capsules: CapsuleItem[];
  config: LauncherConfig;
  onOpenDrawer: () => void;
  onLaunchApp: (app: { id: string; name: string; subText?: string; accentColor?: string }) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  capsules,
  config,
  onOpenDrawer,
  onLaunchApp,
}) => {
  const isTr = config.language === 'tr';
  const touchStartY = useRef<number | null>(null);
  const [isDraggingUp, setIsDraggingUp] = useState(false);

  // Touch and pointer gesture detection: if dragAmount.y < -20, open drawer!
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    touchStartY.current = clientY;
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (touchStartY.current === null) return;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const deltaY = clientY - touchStartY.current;
    if (deltaY < -20) {
      setIsDraggingUp(true);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (touchStartY.current === null) return;
    const clientY = 'changedTouches' in e ? e.changedTouches[0].clientY : e.clientY;
    const deltaY = clientY - touchStartY.current;
    if (deltaY < -20) {
      onOpenDrawer();
    }
    touchStartY.current = null;
    setIsDraggingUp(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 30) {
      onOpenDrawer();
    }
  };

  // Clock widget time formatted
  const today = new Date();
  const timeFormatted = today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateFormatted = isTr
    ? today.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' })
    : today.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
      className="w-full h-full flex flex-col justify-between px-6 py-12 select-none overflow-y-auto no-scrollbar relative cursor-grab active:cursor-grabbing"
    >
      {/* Top Section */}
      <div className="space-y-4">
        {/* Subtle Pixel Clock / Weather glance widget */}
        {config.showClockWidget && (
          <div className="pt-2 pb-1 flex items-center justify-between text-slate-300">
            <div>
              <div className="text-3xl font-light text-white tracking-tight">
                {timeFormatted}
              </div>
              <div className="text-xs text-slate-400 capitalize mt-0.5">
                {dateFormatted}
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-xs text-slate-300 backdrop-blur-md">
              <CloudSun size={16} className="text-amber-400" />
              <span>22°C</span>
            </div>
          </div>
        )}

        {/* Title: "Ana Ekran" (Color.White, 28.sp, FontWeight.Light) */}
        <h1 className="text-[28px] font-light text-white tracking-tight pt-2">
          {isTr ? 'Ana Ekran' : 'Home Screen'}
        </h1>

        {/* ANA EKRAN İKONLARI (Canlı Kapsül Görünümü) */}
        <div className="flex flex-col gap-4 pt-2">
          {capsules.map((capsule) => (
            <AppCapsule
              key={capsule.id}
              capsule={capsule}
              radiusDp={config.capsuleRadius}
              iconTheme={config.iconTheme}
              iconGlow={config.iconGlow}
              language={config.language}
              onClick={() =>
                onLaunchApp({
                  id: capsule.appId || capsule.id,
                  name: capsule.name,
                  subText: capsule.subText,
                  accentColor: capsule.accentColor,
                })
              }
            />
          ))}
        </div>
      </div>

      {/* Bottom Hint: "Çekmece için yukarı kaydır" */}
      <div className="pt-8 pb-4 flex flex-col items-center justify-center">
        <button
          onClick={onOpenDrawer}
          className="group flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer p-2"
        >
          <ChevronUp
            size={18}
            className={`transition-transform duration-300 ${
              isDraggingUp ? '-translate-y-2 text-white' : 'group-hover:-translate-y-1'
            }`}
          />
          <span className="text-xs tracking-wide">
            {isTr ? 'Çekmece için yukarı kaydır' : 'Swipe up for apps'}
          </span>
        </button>
      </div>
    </div>
  );
};
