export interface CapsuleItem {
  id: string;
  name: string;
  subText: string;
  iconName: string;
  accentColor: string;
  unreadCount?: number;
  appId?: string;
}

export interface AppItem {
  id: string;
  name: string;
  category: 'social' | 'media' | 'tools' | 'dev';
  iconName: string;
  color: string;
  description: string;
  isPinned?: boolean;
}

export type IconShape = 'circle' | 'squircle' | 'rounded';
export type IconTheme = 'vibrant' | 'glass' | 'monochrome';
export type GlassBlur = 'subtle' | 'medium' | 'high';
export type WallpaperId = 'void' | 'nebula' | 'aurora' | 'cyber' | 'twilight';

export interface LauncherConfig {
  gridColumns: 3 | 4 | 5;
  iconShape: IconShape;
  iconTheme: IconTheme;
  iconGlow: boolean;
  capsuleRadius: number; // 16, 20, 24, 28
  glassAlpha: number; // e.g. 0.1 for 0x1AFFFFFF
  glassBlur: GlassBlur;
  wallpaperId: WallpaperId;
  language: 'tr' | 'en';
  showClockWidget: boolean;
  showGestureHint: boolean;
  hapticFeedback: boolean;
}
