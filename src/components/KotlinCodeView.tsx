import React, { useState } from 'react';
import {
  Copy,
  Check,
  Download,
  FileCode,
  FileText,
  Terminal,
  ExternalLink,
  Smartphone,
  ChevronRight,
  Info
} from 'lucide-react';
import { CapsuleItem, AppItem, LauncherConfig } from '../types';
import {
  generateKotlinComposeCode,
  BUILD_GRADLE_KTS,
  ANDROID_MANIFEST_XML,
} from '../utils/kotlinGenerator';

interface KotlinCodeViewProps {
  config: LauncherConfig;
  capsules: CapsuleItem[];
  apps: AppItem[];
  language: 'tr' | 'en';
}

export const KotlinCodeView: React.FC<KotlinCodeViewProps> = ({
  config,
  capsules,
  apps,
  language,
}) => {
  const isTr = language === 'tr';
  const [activeTab, setActiveTab] = useState<
    'main' | 'gradle' | 'manifest' | 'guide'
  >('main');
  const [copied, setCopied] = useState(false);

  const kotlinCode = generateKotlinComposeCode(config, capsules, apps);

  const getActiveContent = () => {
    switch (activeTab) {
      case 'main':
        return kotlinCode;
      case 'gradle':
        return BUILD_GRADLE_KTS;
      case 'manifest':
        return ANDROID_MANIFEST_XML;
      default:
        return '';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadKt = () => {
    const blob = new Blob([kotlinCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'MainActivity.kt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full bg-[#0d1117] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
      {/* Code Header Bar */}
      <div className="px-5 py-3.5 bg-slate-900/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        {/* Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('main')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 ${
              activeTab === 'main'
                ? 'bg-purple-600 text-white font-medium shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileCode size={14} />
            <span>MainActivity.kt</span>
          </button>
          <button
            onClick={() => setActiveTab('gradle')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 ${
              activeTab === 'gradle'
                ? 'bg-purple-600 text-white font-medium shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal size={14} />
            <span>build.gradle.kts</span>
          </button>
          <button
            onClick={() => setActiveTab('manifest')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 ${
              activeTab === 'manifest'
                ? 'bg-purple-600 text-white font-medium shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText size={14} />
            <span>AndroidManifest.xml</span>
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'guide'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone size={14} />
            <span>{isTr ? 'APK Kurulum Rehberi' : 'APK Guide'}</span>
          </button>
        </div>

        {/* Action Buttons */}
        {activeTab !== 'guide' && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 hover:text-white flex items-center gap-1.5 transition-colors border border-slate-700"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">
                    {isTr ? 'Kopyalandı!' : 'Copied!'}
                  </span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>{isTr ? 'Kodu Kopyala' : 'Copy Code'}</span>
                </>
              )}
            </button>
            {activeTab === 'main' && (
              <button
                onClick={handleDownloadKt}
                className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-medium text-white flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Download size={14} />
                <span>{isTr ? 'MainActivity.kt İndir' : 'Download .kt'}</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Code Viewer Body */}
      <div className="flex-1 overflow-y-auto p-4 font-mono text-xs leading-relaxed text-slate-300 no-scrollbar">
        {activeTab === 'guide' ? (
          <div className="font-sans space-y-6 max-w-2xl mx-auto py-2">
            <div className="p-4 bg-purple-950/30 border border-purple-500/20 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
                <Info size={18} />
                <span>
                  {isTr
                    ? 'Android Cihazda Varsayılan Başlatıcı Olarak Çalıştırma'
                    : 'Running as Default Home Launcher on Android'}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isTr
                  ? 'Aura Launcher, saf Jetpack Compose ile yazılmış tam işlevsel bir Android Home ekranıdır. Android Studio ile saniyeler içinde gerçek cihazınıza veya emülatöre yükleyebilirsiniz.'
                  : 'Aura Launcher is a pure Jetpack Compose home screen. You can deploy it to any real Android device or emulator using Android Studio.'}
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs">
                    1
                  </span>
                  {isTr ? 'Android Studio Projesi Açın' : 'Create / Open Android Studio Project'}
                </h4>
                <p className="text-slate-400">
                  {isTr
                    ? 'Android Studio > New Project > "Empty Activity (Material3 Compose)" şablonunu seçin. Paket adı olarak `com.example.mylauncher` veya kendi paket adınızı belirleyin.'
                    : 'Select New Project > "Empty Activity (Material3 Compose)". Set package name to com.example.mylauncher.'}
                </p>
              </div>

              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs">
                    2
                  </span>
                  {isTr ? 'MainActivity.kt Dosyasını Yapıştırın' : 'Replace MainActivity.kt'}
                </h4>
                <p className="text-slate-400">
                  {isTr
                    ? 'Yukarıdaki "MainActivity.kt" sekmesindeki kodu kopyalayıp projenizin `app/src/main/java/com/example/mylauncher/MainActivity.kt` içerisine yapıştırın.'
                    : 'Copy the code from the MainActivity.kt tab into your project file.'}
                </p>
              </div>

              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs">
                    3
                  </span>
                  {isTr ? 'AndroidManifest.xml Başlatıcı İznini Ekleyin' : 'Configure AndroidManifest.xml for HOME Intent'}
                </h4>
                <p className="text-slate-400 mb-2">
                  {isTr
                    ? 'Uygulamanın Android Ana Ekran tuşuna basıldığında açılması için intent-filter ekleyin:'
                    : 'Add HOME intent-filter so pressing Home button launches Aura Launcher:'}
                </p>
                <div className="p-2.5 bg-black/50 rounded-xl font-mono text-[11px] text-emerald-400">
                  &lt;category android:name="android.intent.category.HOME" /&gt;
                  <br />
                  &lt;category android:name="android.intent.category.DEFAULT" /&gt;
                </div>
              </div>

              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs">
                    4
                  </span>
                  {isTr ? 'Cihaza Yükleyin ve Varsayılan Yapın' : 'Install APK & Set as Default Launcher'}
                </h4>
                <p className="text-slate-400">
                  {isTr
                    ? 'Run (Shift+F10) butonuna basın. Telefonunuzda Ayarlar > Uygulamalar > Varsayılan Uygulamalar > Ana Ekran Uygulaması (Default Home app) bölümünden "Aura Launcher"ı seçin!'
                    : 'Press Run. Go to Android Settings > Apps > Default Apps > Home app, and choose Aura Launcher.'}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <pre className="selection:bg-purple-500/30">
            <code>{getActiveContent()}</code>
          </pre>
        )}
      </div>

      {/* Code Footer Info */}
      <div className="px-5 py-2.5 bg-slate-950 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between">
        <span>
          {activeTab === 'main'
            ? `${kotlinCode.split('\n').length} lines · Jetpack Compose Material3`
            : activeTab === 'gradle'
            ? 'Gradle Kotlin DSL'
            : activeTab === 'manifest'
            ? 'Android XML Manifest'
            : 'Step-by-step Setup'}
        </span>
        <span className="text-emerald-400/80">● Ready to compile</span>
      </div>
    </div>
  );
};
