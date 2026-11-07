import React from 'react';
import { CapsuleItem, IconTheme } from '../types';
import { AppBrandIcon } from './AppBrandIcon';
import { ExternalLink } from 'lucide-react';

interface AppCapsuleProps {
  capsule: CapsuleItem;
  radiusDp?: number;
  iconTheme?: IconTheme;
  iconGlow?: boolean;
  onClick: () => void;
  language: 'tr' | 'en';
}

export const AppCapsule: React.FC<AppCapsuleProps> = ({
  capsule,
  radiusDp = 24,
  iconTheme = 'vibrant',
  iconGlow = true,
  onClick,
  language,
}) => {
  const isTr = language === 'tr';

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className="group relative w-full h-20 px-4 flex items-center cursor-pointer transition-all duration-200 select-none active:scale-[0.98] hover:bg-white/[0.14]"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.10)', // 0x1AFFFFFF cam efekti
        borderRadius: `${radiusDp}px`,
        border: '1px solid rgba(255, 255, 255, 0.20)', // 0x33FFFFFF
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      {/* İkon Kutusu (48dp, rounded 16dp, Canlı Renkli ve Parlak) */}
      <div className="shrink-0 transition-transform group-hover:scale-105">
        <AppBrandIcon
          appId={capsule.appId || capsule.id}
          name={capsule.name}
          fallbackColor={capsule.accentColor}
          size={48}
          shape="squircle"
          theme={iconTheme}
          glow={iconGlow}
        />
      </div>

      {/* Metinler */}
      <div className="ml-4 flex-1 min-w-0 pr-2">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold text-base leading-tight truncate">
            {capsule.name}
          </span>
          {capsule.unreadCount ? (
            <span
              className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-slate-950 shadow-sm"
              style={{ backgroundColor: capsule.accentColor }}
            >
              {capsule.unreadCount}
            </span>
          ) : null}
        </div>
        <p className="text-slate-300/80 text-xs leading-tight truncate mt-1">
          {capsule.subText}
        </p>
      </div>

      {/* Subtle launch arrow on hover */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 p-1.5 rounded-xl hover:text-white">
        <ExternalLink size={16} />
      </div>
    </div>
  );
};
