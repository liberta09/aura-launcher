import React, { useState } from 'react';
import {
  ArrowLeft,
  Send,
  Play,
  Pause,
  Download,
  CheckCircle2,
  RefreshCw,
  Camera,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
  ExternalLink,
  Shield,
  Smartphone,
  Star,
  GitBranch,
  Search,
  MoreVertical,
  Check
} from 'lucide-react';
import { AppItem, CapsuleItem } from '../types';

interface SimulatedAppModalProps {
  app: {
    id: string;
    name: string;
    subText?: string;
    accentColor?: string;
  };
  onClose: () => void;
  language: 'tr' | 'en';
}

export const SimulatedAppModal: React.FC<SimulatedAppModalProps> = ({
  app,
  onClose,
  language,
}) => {
  const isTr = language === 'tr';

  // WhatsApp Chat state
  const [messages, setMessages] = useState<
    Array<{ sender: 'other' | 'me'; text: string; time: string; isFile?: boolean }>
  >([
    {
      sender: 'other',
      text: isTr
        ? "Selam! Yeni Aura Launcher APK'sını derledim, test eder misin?"
        : 'Hey! I just built the new Aura Launcher APK, can you test it?',
      time: '16:40',
    },
    {
      sender: 'other',
      text: 'AuraLauncher-v1.0-release.apk (18.4 MB)',
      time: '16:41',
      isFile: true,
    },
    {
      sender: 'other',
      text: isTr ? "APK'yı attım" : 'Sent the APK',
      time: '16:42',
    },
  ]);
  const [chatInput, setChatInput] = useState('');

  // Play TV state
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoProgress, setVideoProgress] = useState(42);

  // CloudStream state
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateDone, setUpdateDone] = useState(false);

  // Camera state
  const [photoCount, setPhotoCount] = useState(14);
  const [flashTriggered, setFlashTriggered] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<'0.5x' | '1x' | '2x'>('1x');

  // Spotify state
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);

  const handleSendChat = (textToSend?: string) => {
    const text = textToSend || chatInput;
    if (!text.trim()) return;
    const now = new Date();
    const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    setMessages((prev) => [...prev, { sender: 'me', text, time: timeStr }]);
    setChatInput('');
  };

  const handleUpdateRepo = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setUpdateDone(true);
    }, 1800);
  };

  const handleCapturePhoto = () => {
    setFlashTriggered(true);
    setTimeout(() => setFlashTriggered(false), 200);
    setPhotoCount((c) => c + 1);
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-slate-950 text-white overflow-hidden animate-in fade-in duration-200">
      {/* App Top Bar */}
      <div className="h-14 bg-slate-900/90 border-b border-slate-800 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 -ml-2 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            title={isTr ? 'Geri (Ana Ekran)' : 'Back (Home)'}
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-sm font-semibold text-white leading-tight">
              {app.name}
            </h2>
            <p className="text-[11px] text-slate-400 leading-tight">
              {isTr ? 'Aura Sanal Uygulama' : 'Aura Virtual Instance'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{isTr ? 'Çalışıyor' : 'Running'}</span>
        </div>
      </div>

      {/* App Body Content */}
      <div className="flex-1 overflow-y-auto relative no-scrollbar">
        {/* 1. WHATSAPP SIMULATION */}
        {app.id.includes('whatsapp') && (
          <div className="flex flex-col h-full bg-[#0b141a]">
            {/* Chat Contact Header */}
            <div className="bg-[#1f2c34] px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-white text-sm shadow-inner">
                  G
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Göktürk</h3>
                  <p className="text-[11px] text-emerald-400">
                    {isTr ? 'çevrimiçi' : 'online'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <MoreVertical size={18} />
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              <div className="text-center my-2">
                <span className="bg-[#182229] text-[10px] text-slate-400 px-3 py-1 rounded-full">
                  {isTr ? 'Bugün' : 'Today'}
                </span>
              </div>

              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    m.sender === 'me' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 shadow-sm text-xs ${
                      m.sender === 'me'
                        ? 'bg-[#005c4b] text-white rounded-tr-xs'
                        : 'bg-[#202c33] text-slate-100 rounded-tl-xs'
                    }`}
                  >
                    {m.isFile ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2.5 p-2 bg-black/20 rounded-xl">
                          <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
                            <Download size={16} />
                          </div>
                          <div className="truncate">
                            <p className="font-medium text-white truncate">
                              AuraLauncher-v1.0.apk
                            </p>
                            <p className="text-[10px] text-slate-400">18.4 MB · APK</p>
                          </div>
                        </div>
                        <p className="text-slate-300">{m.text}</p>
                      </div>
                    ) : (
                      <p>{m.text}</p>
                    )}
                    <span className="block text-[9px] text-right text-slate-400/80 mt-1">
                      {m.time} {m.sender === 'me' && '✓✓'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Reply Suggestions */}
            <div className="px-3 py-1.5 flex gap-2 overflow-x-auto no-scrollbar bg-[#111b21] border-t border-slate-800/60">
              {[
                isTr ? 'Eyvallah, deniyorum!' : 'Thanks, testing it!',
                isTr ? 'Harika görünüyor!' : 'Looks fantastic!',
                isTr ? 'Çekmece animasyonu çok akıcı' : 'Drawer animation is super smooth',
              ].map((chip, i) => (
                <button
                  key={i}
                  onClick={() => handleSendChat(chip)}
                  className="text-[11px] bg-[#202c33] hover:bg-[#2a3942] text-slate-300 px-3 py-1 rounded-full whitespace-nowrap transition-colors shrink-0"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendChat();
              }}
              className="bg-[#202c33] p-2.5 flex items-center gap-2"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={isTr ? 'Mesaj yazın...' : 'Type a message...'}
                className="flex-1 bg-[#2a3942] text-white text-xs px-4 py-2 rounded-full focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder-slate-400"
              />
              <button
                type="submit"
                className="w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center text-white transition-colors shrink-0"
              >
                <Send size={15} />
              </button>
            </form>
          </div>
        )}

        {/* 2. PLAY TV SIMULATION */}
        {app.id.includes('playtv') && (
          <div className="p-4 space-y-4">
            {/* Video Player Canvas */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex flex-col justify-between p-4 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
              
              {/* Video Simulated Backdrop */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 via-slate-950 to-black flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-purple-600/20 blur-2xl animate-pulse" />
              </div>

              {/* Player Top Info */}
              <div className="relative z-10 flex items-center justify-between text-xs text-slate-300">
                <span className="font-semibold text-white">Kill (2024)</span>
                <span className="bg-purple-500/20 text-purple-400 text-[10px] px-2 py-0.5 rounded-full border border-purple-500/30">
                  4K HDR
                </span>
              </div>

              {/* Player Center Control */}
              <div className="relative z-10 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-14 h-14 rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shadow-lg transition-transform active:scale-95"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                </button>
              </div>

              {/* Player Bottom Scrub Bar */}
              <div className="relative z-10 space-y-1">
                <div className="w-full bg-slate-700/60 rounded-full h-1.5 overflow-hidden cursor-pointer">
                  <div
                    className="bg-purple-500 h-full rounded-full transition-all"
                    style={{ width: `${videoProgress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>00:46:12</span>
                  <span>01:45:00</span>
                </div>
              </div>
            </div>

            {/* Movie Info */}
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Kill (2024)</h3>
              <p className="text-xs text-slate-400">
                {isTr
                  ? 'Yeni Delhi yönüne giden bir yolcu treninde geçen nefes kesici aksiyon ve gerilim.'
                  : 'High-octane action thriller aboard a passenger train bound for New Delhi.'}
              </p>
            </div>

            {/* Related Media */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {isTr ? 'Devam Edenler' : 'Up Next'}
              </h4>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { title: 'Dune: Part Two', time: '02:14:00', cat: 'Sci-Fi' },
                  { title: 'Severance S2', time: 'Bölüm 4', cat: 'Dizi' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1 hover:border-purple-500/50 transition-colors"
                  >
                    <p className="text-xs font-medium text-white truncate">{item.title}</p>
                    <p className="text-[10px] text-slate-400">{item.time} · {item.cat}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. CLOUDSTREAM REPO SIMULATION */}
        {app.id.includes('cloudstream') && (
          <div className="p-4 space-y-4">
            <div className="p-4 bg-gradient-to-br from-sky-950/40 via-slate-900 to-slate-950 rounded-2xl border border-sky-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">
                    CloudStream Extension Hub
                  </h3>
                  <p className="text-xs text-sky-400">
                    {updateDone
                      ? isTr
                        ? 'Tüm eklentiler güncel'
                        : 'All extensions up to date'
                      : isTr
                      ? '1 Eklenti güncellemesi hazır'
                      : '1 extension update available'}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                  <RefreshCw
                    size={18}
                    className={isUpdating ? 'animate-spin' : ''}
                  />
                </div>
              </div>

              <button
                onClick={handleUpdateRepo}
                disabled={isUpdating || updateDone}
                className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  updateDone
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-md'
                }`}
              >
                {isUpdating ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    <span>{isTr ? 'Güncelleniyor...' : 'Updating...'}</span>
                  </>
                ) : updateDone ? (
                  <>
                    <Check size={14} />
                    <span>{isTr ? 'Güncelleme Tamamlandı' : 'Updated'}</span>
                  </>
                ) : (
                  <>
                    <Download size={14} />
                    <span>{isTr ? 'Repo Paketlerini Güncelle' : 'Update Repo Packages'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Installed Repositories */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {isTr ? 'Yüklü Depolar' : 'Installed Repositories'}
              </h4>
              <div className="space-y-2">
                {[
                  { name: 'Turkish Providers (Sinefy, Diziwatch)', ver: 'v4.2.1', status: 'Aktif' },
                  { name: 'English SuperStream Multi-Source', ver: 'v2.8.0', status: 'Aktif' },
                  { name: 'Anime World Streams', ver: 'v1.4.3', status: 'Aktif' },
                ].map((repo, i) => (
                  <div
                    key={i}
                    className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-medium text-white">{repo.name}</p>
                      <p className="text-[11px] text-slate-400">{repo.ver}</p>
                    </div>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      {repo.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. SPOTIFY SIMULATION */}
        {app.id.includes('spotify') && (
          <div className="p-4 space-y-6 flex flex-col items-center text-center">
            {/* Album Cover */}
            <div className="w-52 h-52 rounded-2xl bg-gradient-to-br from-green-500 via-emerald-700 to-black p-4 flex flex-col justify-end shadow-2xl border border-white/10 mt-4">
              <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-white backdrop-blur-md">
                <Sparkles size={18} />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Midnight City</h3>
              <p className="text-xs text-slate-400">M83 · Hurry Up, We're Dreaming</p>
            </div>

            {/* Equalizer animation */}
            <div className="flex items-center gap-1 h-6">
              {[40, 75, 55, 90, 65, 80, 45, 95, 60].map((h, i) => (
                <div
                  key={i}
                  className="w-1 bg-green-500 rounded-full transition-all duration-300"
                  style={{
                    height: isMusicPlaying ? `${h}%` : '20%',
                    opacity: isMusicPlaying ? 0.9 : 0.4,
                  }}
                />
              ))}
            </div>

            {/* Play controls */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setIsMusicPlaying(!isMusicPlaying)}
                className="w-14 h-14 rounded-full bg-green-500 text-black flex items-center justify-center shadow-lg active:scale-95 transition-transform"
              >
                {isMusicPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
              </button>
            </div>
          </div>
        )}

        {/* 5. KAMERA SIMULATION */}
        {app.id.includes('kamera') && (
          <div className="flex flex-col h-full bg-black relative">
            {/* Viewfinder Flash Overlay */}
            {flashTriggered && (
              <div className="absolute inset-0 bg-white z-20 pointer-events-none animate-out fade-out duration-200" />
            )}

            {/* Viewfinder Frame */}
            <div className="flex-1 relative m-3 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 flex items-center justify-center">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="w-16 h-16 border border-yellow-400/50 rounded-lg flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping" />
              </div>

              {/* Zoom Switcher */}
              <div className="absolute bottom-4 flex gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs">
                {(['0.5x', '1x', '2x'] as const).map((z) => (
                  <button
                    key={z}
                    onClick={() => setZoomLevel(z)}
                    className={`px-2 py-0.5 rounded-full ${
                      zoomLevel === z ? 'bg-white text-black font-bold' : 'text-slate-300'
                    }`}
                  >
                    {z}
                  </button>
                ))}
              </div>
            </div>

            {/* Camera Bottom Controls */}
            <div className="h-24 bg-black/90 px-6 flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono text-slate-300">
                {photoCount}
              </div>

              <button
                onClick={handleCapturePhoto}
                className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center active:scale-90 transition-transform"
              >
                <div className="w-12 h-12 rounded-full bg-white" />
              </button>

              <button
                onClick={() => setPhotoCount((c) => c + 1)}
                className="w-12 h-12 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-300 hover:text-white"
              >
                <RotateCcw size={20} />
              </button>
            </div>
          </div>
        )}

        {/* 6. GITHUB SIMULATION */}
        {app.id.includes('github') && (
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white">
                AO
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">kaanokan / aura-launcher</h3>
                <p className="text-xs text-slate-400">Android Compose Launcher</p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-4 text-slate-300">
                <span className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-400" /> 482
                </span>
                <span className="flex items-center gap-1">
                  <GitBranch size={14} className="text-purple-400" /> 38
                </span>
                <span className="text-emerald-400 font-mono">Kotlin 100%</span>
              </div>
              <p className="text-slate-400">
                Ultra-smooth glassmorphic Android home screen with animated capsule widgets and gesture-driven app drawer.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-xs font-semibold uppercase text-slate-400">
                {isTr ? 'Son Katkılar (Commits)' : 'Recent Commits'}
              </h4>
              <div className="space-y-1.5 text-xs font-mono">
                <div className="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800/60">
                  <p className="text-slate-200">feat: add glassmorphism capsules & gestures</p>
                  <p className="text-[10px] text-slate-500 mt-1">2 hours ago · main</p>
                </div>
                <div className="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800/60">
                  <p className="text-slate-200">refactor: tune AppDrawer animated visibility</p>
                  <p className="text-[10px] text-slate-500 mt-1">yesterday · main</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 7. AYARLAR & SYSTEM SETTINGS SIMULATION */}
        {app.id.includes('ayarlar') && (
          <div className="p-4 space-y-3">
            <h3 className="text-base font-bold text-white mb-2">
              {isTr ? 'Aura Sistem Ayarları' : 'Aura System Settings'}
            </h3>
            {[
              {
                title: isTr ? 'Varsayılan Ana Ekran Uygulaması' : 'Default Home App',
                sub: 'Aura Launcher (com.example.mylauncher)',
                icon: Smartphone,
              },
              {
                title: isTr ? 'Ekran & Duvar Kağıdı' : 'Display & Wallpaper',
                sub: isTr ? 'OLED Karanlık Mod, 120Hz' : 'OLED Dark Mode, 120Hz',
                icon: Sparkles,
              },
              {
                title: isTr ? 'Gizlilik & Güvenlik' : 'Privacy & Security',
                sub: isTr ? 'Biyometrik kilit devrede' : 'Biometrics enabled',
                icon: Shield,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300">
                  <item.icon size={18} />
                </div>
                <div className="truncate">
                  <p className="text-xs font-medium text-white truncate">{item.title}</p>
                  <p className="text-[11px] text-slate-400 truncate">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 8. GENERIC FALLBACK FOR OTHER APPS */}
        {!['whatsapp', 'playtv', 'cloudstream', 'spotify', 'kamera', 'github', 'ayarlar'].some(
          (k) => app.id.includes(k)
        ) && (
          <div className="p-6 text-center space-y-4 my-auto flex flex-col items-center justify-center min-h-[300px]">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200">
              <Sparkles size={28} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{app.name}</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                {isTr
                  ? 'Bu uygulama Aura Launcher tarafından başarıyla başlatıldı.'
                  : 'This application was successfully launched by Aura Launcher.'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-medium text-white transition-colors"
            >
              {isTr ? 'Aura Launcher’a Dön' : 'Return to Aura Launcher'}
            </button>
          </div>
        )}
      </div>

      {/* Android Bottom Back Gesture Pill */}
      <div className="h-6 bg-slate-950 flex items-center justify-center shrink-0">
        <button
          onClick={onClose}
          className="w-24 h-1 bg-slate-600/70 hover:bg-white rounded-full transition-colors cursor-pointer"
          title={isTr ? 'Geri dönmek için tıklayın' : 'Click to go back'}
        />
      </div>
    </div>
  );
};
