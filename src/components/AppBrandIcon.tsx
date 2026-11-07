import React from 'react';
import { IconShape, IconTheme } from '../types';
import {
  MessageSquare,
  Play,
  CloudDownload,
  Image as ImageIcon,
  Code2,
  Camera,
  Settings,
  Music2,
  Send,
  Film,
  PlayCircle,
  Globe,
  SlidersHorizontal,
  Terminal,
  MapPin,
  MessagesSquare,
  Sparkles,
  Phone
} from 'lucide-react';

interface AppBrandIconProps {
  appId: string;
  name: string;
  fallbackColor?: string;
  size?: number; // e.g. 60
  shape?: IconShape;
  theme?: IconTheme;
  glow?: boolean;
  className?: string;
}

export const AppBrandIcon: React.FC<AppBrandIconProps> = ({
  appId,
  name,
  fallbackColor = '#A855F7',
  size = 60,
  shape = 'circle',
  theme = 'vibrant',
  glow = true,
  className = '',
}) => {
  const normalizedId = (appId || name).toLowerCase();

  // Shape class
  const getRadiusClass = () => {
    switch (shape) {
      case 'squircle':
        return 'rounded-[20px]';
      case 'rounded':
        return 'rounded-xl';
      case 'circle':
      default:
        return 'rounded-full';
    }
  };

  // If user selected monochrome (the original Kotlin Compose 0x26FFFFFF):
  if (theme === 'monochrome') {
    return (
      <div
        className={`flex items-center justify-center transition-all ${getRadiusClass()} ${className}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.20)',
        }}
      >
        {renderMonochromeGlyph(normalizedId, size * 0.46)}
      </div>
    );
  }

  // If user selected glass (translucent with colored halo & tinted glyph):
  if (theme === 'glass') {
    const brandColor = getBrandColor(normalizedId, fallbackColor);
    return (
      <div
        className={`flex items-center justify-center relative transition-all ${getRadiusClass()} ${className}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: `${brandColor}22`,
          border: `1.5px solid ${brandColor}55`,
          boxShadow: glow ? `0 6px 18px -2px ${brandColor}50` : undefined,
          backdropFilter: 'blur(12px)',
        }}
      >
        {renderColoredGlyph(normalizedId, size * 0.46, brandColor)}
      </div>
    );
  }

  // Default: 'vibrant' - Full rich, colorful 3D gradients with lighting & custom SVG brand icons!
  return (
    <div
      className={`relative flex items-center justify-center select-none overflow-hidden transition-transform duration-200 ${getRadiusClass()} ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: getBrandGradient(normalizedId, fallbackColor),
        boxShadow: glow
          ? `${getBrandGlow(normalizedId, fallbackColor)}, inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.4), inset 0 -2px 3px 0 rgba(0, 0, 0, 0.25)`
          : 'inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.4), inset 0 -2px 3px 0 rgba(0, 0, 0, 0.25)',
        border: '1px solid rgba(255, 255, 255, 0.25)',
      }}
    >
      {/* Top subtle highlight reflection curve */}
      <div
        className="absolute top-0 inset-x-0 h-1/2 pointer-events-none opacity-25"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 100%)',
        }}
      />

      {/* Render Brand Specific Artwork */}
      {renderBrandArtwork(normalizedId, size)}
    </div>
  );
};

// ----------------------------------------------------
// BRAND ARTWORK RENDERERS (High fidelity vector graphics)
// ----------------------------------------------------

function renderBrandArtwork(id: string, size: number) {
  const iconSize = Math.round(size * 0.48);

  // 1. INSTAGRAM
  if (id.includes('instagram')) {
    return (
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative z-10 drop-shadow-sm"
      >
        <rect x="2" y="2" width="20" height="20" rx="6" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.8" />
      </svg>
    );
  }

  // 2. SPOTIFY
  if (id.includes('spotify') || id.includes('music')) {
    return (
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke="black"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative z-10"
      >
        <path d="M4 8.5c5.5-1.5 10.5-.5 16 2" />
        <path d="M5.5 12.5c4.5-1.2 8.5-.4 13 1.6" />
        <path d="M7 16.5c3.5-.9 6.5-.3 10 1.2" />
      </svg>
    );
  }

  // 3. WHATSAPP
  if (id.includes('whatsapp') || id.includes('chat')) {
    return (
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="white"
        className="relative z-10 drop-shadow"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.9C17.18 3.03 14.69 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.04 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15ZM16.57 14.37C16.32 14.25 15.1 13.65 14.88 13.56C14.65 13.48 14.48 13.44 14.32 13.69C14.15 13.94 13.67 14.51 13.52 14.68C13.38 14.84 13.23 14.87 12.98 14.74C12.73 14.62 11.94 14.36 11 13.52C10.27 12.87 9.77 12.06 9.63 11.81C9.48 11.56 9.61 11.43 9.74 11.3C9.85 11.19 9.98 11.02 10.11 10.87C10.23 10.72 10.27 10.62 10.35 10.45C10.43 10.29 10.39 10.14 10.33 10.02C10.27 9.9 9.77 8.68 9.57 8.18C9.37 7.69 9.16 7.76 9.01 7.75C8.87 7.74 8.7 7.74 8.54 7.74C8.37 7.74 8.1 7.8 7.88 8.05C7.65 8.29 7 8.9 7 10.14C7 11.38 7.9 12.58 8.03 12.75C8.15 12.91 9.8 15.45 12.31 16.54C12.91 16.8 13.38 16.95 13.74 17.07C14.34 17.26 14.89 17.23 15.33 17.17C15.82 17.09 16.83 16.55 17.04 15.98C17.25 15.4 17.25 14.91 17.19 14.8C17.12 14.7 16.96 14.63 16.57 14.37Z" />
      </svg>
    );
  }

  // 4. YOUTUBE
  if (id.includes('youtube')) {
    return (
      <div className="flex items-center justify-center relative z-10">
        <svg
          width={iconSize + 2}
          height={iconSize - 2}
          viewBox="0 0 24 18"
          fill="white"
          className="drop-shadow-sm"
        >
          <path d="M23.498 2.628c-.276-1.034-1.088-1.846-2.122-2.122C19.505 0 12 0 12 0S4.495 0 2.624.506C1.59.782.778 1.594.502 2.628 0 4.5 0 8.438 0 8.438s0 3.938.502 5.81c.276 1.034 1.088 1.846 2.122 2.122 1.871.506 9.376.506 9.376.506s7.505 0 9.376-.506c1.034-.276 1.846-1.088 2.122-2.122.502-1.872.502-5.81.502-5.81s0-3.938-.502-5.81z" />
          <polygon points="9.6 12.038 15.84 8.438 9.6 4.838" fill="#E50914" />
        </svg>
      </div>
    );
  }

  // 5. CHROME
  if (id.includes('chrome') || id.includes('web') || id.includes('browser')) {
    return (
      <div
        className="w-[70%] h-[70%] rounded-full bg-white relative flex items-center justify-center shadow-inner overflow-hidden border border-white/60"
      >
        {/* 3 color fan wedges */}
        <div className="absolute inset-0 bg-[conic-gradient(#EA4335_0deg_120deg,#FBBC05_120deg_240deg,#34A853_240deg_360deg)]" />
        {/* White ring mask */}
        <div className="w-[52%] h-[52%] rounded-full bg-white flex items-center justify-center z-10 shadow-sm">
          {/* Blue center pupil */}
          <div className="w-[70%] h-[70%] rounded-full bg-[#4285F4] shadow-inner" />
        </div>
      </div>
    );
  }

  // 6. KAMERA
  if (id.includes('kamera') || id.includes('camera')) {
    return (
      <div className="flex items-center justify-center relative z-10">
        <div className="w-9 h-9 rounded-full bg-slate-950 border-2 border-slate-700/80 flex items-center justify-center shadow-inner relative">
          {/* Lens reflection ring */}
          <div className="w-6 h-6 rounded-full border border-sky-400/40 bg-gradient-to-tr from-slate-900 via-indigo-950 to-sky-900 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400/80 shadow-[0_0_8px_#38bdf8]" />
          </div>
          {/* Flash dot */}
          <span className="absolute top-1 right-1 w-1 h-1 rounded-full bg-amber-400 shadow-[0_0_4px_#fbbf24]" />
        </div>
      </div>
    );
  }

  // 7. GALERİ
  if (id.includes('galeri') || id.includes('gallery') || id.includes('image')) {
    return (
      <div className="flex items-center justify-center relative z-10">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow"
        >
          <rect width="18" height="18" x="3" y="3" rx="4" />
          <circle cx="9" cy="9" r="2" fill="white" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
      </div>
    );
  }

  // 8. TELEGRAM
  if (id.includes('telegram') || id.includes('send')) {
    return (
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="white"
        className="relative z-10 -ml-0.5 mt-0.5 drop-shadow"
      >
        <path d="M21.6 3.6a1.2 1.2 0 0 0-1.28-.24L2.8 10.7a1.2 1.2 0 0 0 .1 2.24l4.8 1.6 1.8 5.7a1.2 1.2 0 0 0 2 .4l2.8-2.7 5.1 3.8a1.2 1.2 0 0 0 1.9-.7l3-16.1a1.2 1.2 0 0 0-.5-1.34zM8.9 13.9l8.6-6.8-6.9 7.8-.3 2.9-1.4-3.9z" />
      </svg>
    );
  }

  // 9. GITHUB
  if (id.includes('github') || id.includes('code')) {
    return (
      <div className="flex items-center justify-center relative z-10">
        <Code2 size={iconSize} className="text-cyan-300 drop-shadow" strokeWidth={2.4} />
      </div>
    );
  }

  // 10. PLAY TV
  if (id.includes('playtv') || id.includes('play')) {
    return (
      <div className="flex items-center justify-center relative z-10">
        <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center shadow-lg">
          <Play size={18} fill="white" className="text-white ml-0.5" />
        </div>
      </div>
    );
  }

  // 11. CLOUDSTREAM REPO
  if (id.includes('cloudstream') || id.includes('download')) {
    return (
      <div className="flex items-center justify-center relative z-10">
        <CloudDownload size={iconSize} className="text-white drop-shadow" strokeWidth={2.2} />
      </div>
    );
  }

  // 12. AYARLAR
  if (id.includes('ayarlar') || id.includes('settings')) {
    return (
      <div className="flex items-center justify-center relative z-10">
        <Settings size={iconSize} className="text-slate-100 drop-shadow" strokeWidth={2.2} />
      </div>
    );
  }

  // 13. WATCH LIST
  if (id.includes('watchlist') || id.includes('movie')) {
    return (
      <div className="flex items-center justify-center relative z-10">
        <Film size={iconSize} className="text-slate-950 drop-shadow" strokeWidth={2.4} />
      </div>
    );
  }

  // 14. TERMUX / TERMINAL
  if (id.includes('terminal') || id.includes('termux')) {
    return (
      <div className="flex items-center justify-center relative z-10 font-mono font-black text-emerald-300 text-sm tracking-tighter drop-shadow-[0_0_8px_#34d399]">
        &gt;_
      </div>
    );
  }

  // 15. HARİTALAR
  if (id.includes('harita') || id.includes('map')) {
    return (
      <div className="flex items-center justify-center relative z-10">
        <MapPin size={iconSize} className="text-white drop-shadow" strokeWidth={2.4} />
      </div>
    );
  }

  // 16. DISCORD
  if (id.includes('discord') || id.includes('messages')) {
    return (
      <div className="flex items-center justify-center relative z-10">
        <MessagesSquare size={iconSize} className="text-white drop-shadow" strokeWidth={2.2} />
      </div>
    );
  }

  // Fallback icon
  return (
    <div className="flex items-center justify-center relative z-10 text-white">
      <Sparkles size={iconSize} />
    </div>
  );
}

// ----------------------------------------------------
// HELPER GRADIENTS & COLORS
// ----------------------------------------------------

function getBrandGradient(id: string, fallback: string): string {
  if (id.includes('instagram')) {
    return 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)';
  }
  if (id.includes('spotify') || id.includes('music')) {
    return 'linear-gradient(135deg, #1ed760 0%, #1db954 60%, #13883c 100%)';
  }
  if (id.includes('whatsapp') || id.includes('chat')) {
    return 'linear-gradient(135deg, #25D366 0%, #1EBE5D 50%, #128C7E 100%)';
  }
  if (id.includes('youtube')) {
    return 'linear-gradient(135deg, #FF1744 0%, #E50914 60%, #B71C1C 100%)';
  }
  if (id.includes('chrome') || id.includes('web') || id.includes('browser')) {
    return 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)';
  }
  if (id.includes('kamera') || id.includes('camera')) {
    return 'linear-gradient(135deg, #475569 0%, #1E293B 60%, #0F172A 100%)';
  }
  if (id.includes('galeri') || id.includes('gallery') || id.includes('image')) {
    return 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 50%, #FE5196 100%)';
  }
  if (id.includes('telegram') || id.includes('send')) {
    return 'linear-gradient(135deg, #38BDF8 0%, #229ED9 60%, #0284C7 100%)';
  }
  if (id.includes('github') || id.includes('code')) {
    return 'linear-gradient(135deg, #334155 0%, #1E293B 60%, #0F172A 100%)';
  }
  if (id.includes('playtv') || id.includes('play')) {
    return 'linear-gradient(135deg, #C084FC 0%, #A855F7 50%, #6366F1 100%)';
  }
  if (id.includes('cloudstream') || id.includes('download')) {
    return 'linear-gradient(135deg, #38BDF8 0%, #0EA5E9 50%, #0284C7 100%)';
  }
  if (id.includes('ayarlar') || id.includes('settings')) {
    return 'linear-gradient(135deg, #64748B 0%, #475569 60%, #334155 100%)';
  }
  if (id.includes('watchlist') || id.includes('movie')) {
    return 'linear-gradient(135deg, #FDE047 0%, #F59E0B 60%, #D97706 100%)';
  }
  if (id.includes('terminal') || id.includes('termux')) {
    return 'linear-gradient(135deg, #064E3B 0%, #022C22 100%)';
  }
  if (id.includes('harita') || id.includes('map')) {
    return 'linear-gradient(135deg, #34D399 0%, #10B981 50%, #0284C7 100%)';
  }
  if (id.includes('discord') || id.includes('messages')) {
    return 'linear-gradient(135deg, #6366F1 0%, #5865F2 60%, #4338CA 100%)';
  }

  return `linear-gradient(135deg, ${fallback} 0%, ${fallback}dd 60%, #00000033 100%)`;
}

function getBrandGlow(id: string, fallback: string): string {
  if (id.includes('instagram')) return '0 8px 24px -2px rgba(220, 39, 67, 0.45)';
  if (id.includes('spotify')) return '0 8px 24px -2px rgba(30, 215, 96, 0.45)';
  if (id.includes('whatsapp')) return '0 8px 24px -2px rgba(37, 211, 102, 0.45)';
  if (id.includes('youtube')) return '0 8px 24px -2px rgba(229, 9, 20, 0.45)';
  if (id.includes('chrome')) return '0 8px 24px -2px rgba(66, 133, 244, 0.35)';
  if (id.includes('kamera')) return '0 8px 24px -2px rgba(56, 189, 248, 0.3)';
  if (id.includes('galeri')) return '0 8px 24px -2px rgba(254, 81, 150, 0.45)';
  if (id.includes('telegram')) return '0 8px 24px -2px rgba(34, 158, 217, 0.45)';
  if (id.includes('github')) return '0 8px 24px -2px rgba(99, 102, 241, 0.35)';
  if (id.includes('playtv')) return '0 8px 24px -2px rgba(168, 85, 247, 0.45)';
  if (id.includes('cloudstream')) return '0 8px 24px -2px rgba(56, 189, 248, 0.45)';
  if (id.includes('ayarlar')) return '0 8px 24px -2px rgba(100, 116, 139, 0.3)';
  if (id.includes('watchlist')) return '0 8px 24px -2px rgba(245, 158, 11, 0.45)';
  if (id.includes('terminal')) return '0 8px 24px -2px rgba(16, 185, 129, 0.45)';
  if (id.includes('harita')) return '0 8px 24px -2px rgba(16, 185, 129, 0.4)';
  if (id.includes('discord')) return '0 8px 24px -2px rgba(88, 101, 242, 0.45)';

  return `0 8px 24px -2px ${fallback}55`;
}

function getBrandColor(id: string, fallback: string): string {
  if (id.includes('instagram')) return '#F43F5E';
  if (id.includes('spotify')) return '#22C55E';
  if (id.includes('whatsapp')) return '#10B981';
  if (id.includes('youtube')) return '#EF4444';
  if (id.includes('chrome')) return '#F59E0B';
  if (id.includes('kamera')) return '#38BDF8';
  if (id.includes('galeri')) return '#EC4899';
  if (id.includes('telegram')) return '#0EA5E9';
  if (id.includes('github')) return '#A855F7';
  if (id.includes('playtv')) return '#A855F7';
  if (id.includes('cloudstream')) return '#38BDF8';
  if (id.includes('ayarlar')) return '#94A3B8';
  if (id.includes('watchlist')) return '#EAB308';
  if (id.includes('terminal')) return '#10B981';
  if (id.includes('harita')) return '#14B8A6';
  if (id.includes('discord')) return '#6366F1';
  return fallback;
}

function renderMonochromeGlyph(id: string, size: number) {
  if (id.includes('whatsapp') || id.includes('chat')) return <MessageSquare size={size} color="white" />;
  if (id.includes('play')) return <Play size={size} color="white" fill="white" />;
  if (id.includes('cloudstream') || id.includes('download')) return <CloudDownload size={size} color="white" />;
  if (id.includes('galeri') || id.includes('image')) return <ImageIcon size={size} color="white" />;
  if (id.includes('github') || id.includes('code')) return <Code2 size={size} color="white" />;
  if (id.includes('camera') || id.includes('kamera') || id.includes('instagram')) return <Camera size={size} color="white" />;
  if (id.includes('ayarlar') || id.includes('settings')) return <Settings size={size} color="white" />;
  if (id.includes('spotify') || id.includes('music')) return <Music2 size={size} color="white" />;
  if (id.includes('telegram') || id.includes('send')) return <Send size={size} color="white" />;
  if (id.includes('watchlist') || id.includes('movie')) return <Film size={size} color="white" />;
  if (id.includes('youtube')) return <PlayCircle size={size} color="white" />;
  if (id.includes('chrome') || id.includes('web')) return <Globe size={size} color="white" />;
  if (id.includes('terminal')) return <Terminal size={size} color="white" />;
  if (id.includes('harita')) return <MapPin size={size} color="white" />;
  if (id.includes('discord')) return <MessagesSquare size={size} color="white" />;
  return <Sparkles size={size} color="white" />;
}

function renderColoredGlyph(id: string, size: number, color: string) {
  if (id.includes('whatsapp') || id.includes('chat')) return <MessageSquare size={size} color={color} />;
  if (id.includes('play')) return <Play size={size} color={color} fill={color} />;
  if (id.includes('cloudstream') || id.includes('download')) return <CloudDownload size={size} color={color} />;
  if (id.includes('galeri') || id.includes('image')) return <ImageIcon size={size} color={color} />;
  if (id.includes('github') || id.includes('code')) return <Code2 size={size} color={color} />;
  if (id.includes('camera') || id.includes('kamera') || id.includes('instagram')) return <Camera size={size} color={color} />;
  if (id.includes('ayarlar') || id.includes('settings')) return <Settings size={size} color={color} />;
  if (id.includes('spotify') || id.includes('music')) return <Music2 size={size} color={color} />;
  if (id.includes('telegram') || id.includes('send')) return <Send size={size} color={color} />;
  if (id.includes('watchlist') || id.includes('movie')) return <Film size={size} color={color} />;
  if (id.includes('youtube')) return <PlayCircle size={size} color={color} />;
  if (id.includes('chrome') || id.includes('web')) return <Globe size={size} color={color} />;
  if (id.includes('terminal')) return <Terminal size={size} color={color} />;
  if (id.includes('harita')) return <MapPin size={size} color={color} />;
  if (id.includes('discord')) return <MessagesSquare size={size} color={color} />;
  return <Sparkles size={size} color={color} />;
}
