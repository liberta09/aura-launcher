import React from 'react';
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
  ChevronDown,
  Terminal,
  MapPin,
  MessagesSquare,
  Sparkles,
  FileText,
  Folder,
  AppWindow
} from 'lucide-react';

interface AppIconProps {
  name: string;
  className?: string;
  size?: number;
  color?: string;
}

export const AppIcon: React.FC<AppIconProps> = ({
  name,
  className = '',
  size = 24,
  color,
}) => {
  const iconProps = {
    size,
    className,
    style: color ? { color } : undefined,
  };

  switch (name.toLowerCase()) {
    case 'chat':
    case 'messagesquare':
    case 'whatsapp':
      return <MessageSquare {...iconProps} />;
    case 'playarrow':
    case 'play':
      return <Play {...iconProps} fill="currentColor" />;
    case 'clouddownload':
    case 'download':
      return <CloudDownload {...iconProps} />;
    case 'image':
    case 'galeri':
    case 'gallery':
      return <ImageIcon {...iconProps} />;
    case 'code':
    case 'github':
      return <Code2 {...iconProps} />;
    case 'cameraalt':
    case 'photocamera':
    case 'camera':
    case 'kamera':
    case 'instagram':
      return <Camera {...iconProps} />;
    case 'settings':
    case 'ayarlar':
      return <Settings {...iconProps} />;
    case 'musicnote':
    case 'music':
    case 'spotify':
      return <Music2 {...iconProps} />;
    case 'send':
    case 'telegram':
      return <Send {...iconProps} />;
    case 'movie':
    case 'watchlist':
      return <Film {...iconProps} />;
    case 'playcircle':
    case 'youtube':
      return <PlayCircle {...iconProps} />;
    case 'web':
    case 'chrome':
    case 'browser':
      return <Globe {...iconProps} />;
    case 'tune':
    case 'sliders':
      return <SlidersHorizontal {...iconProps} />;
    case 'keyboardarrowdown':
    case 'chevrondown':
      return <ChevronDown {...iconProps} />;
    case 'terminal':
      return <Terminal {...iconProps} />;
    case 'mappin':
    case 'map':
      return <MapPin {...iconProps} />;
    case 'messages':
    case 'discord':
      return <MessagesSquare {...iconProps} />;
    case 'filetext':
    case 'notlar':
      return <FileText {...iconProps} />;
    case 'folder':
    case 'dosyalar':
      return <Folder {...iconProps} />;
    default:
      return <AppWindow {...iconProps} />;
  }
};
