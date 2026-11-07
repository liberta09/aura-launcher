import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  Check,
  Smartphone,
  Sparkles,
  MessageSquare,
  Play,
  CloudDownload,
  Music,
  Code2,
  Camera,
  Film,
  Send
} from 'lucide-react';
import { CapsuleItem } from '../types';
import { AppBrandIcon } from './AppBrandIcon';

interface CapsuleManagerModalProps {
  capsules: CapsuleItem[];
  onAddCapsule: (capsule: CapsuleItem) => void;
  onUpdateCapsule: (id: string, updated: Partial<CapsuleItem>) => void;
  onDeleteCapsule: (id: string) => void;
  onClose: () => void;
  language: 'tr' | 'en';
}

const COLOR_PRESETS = [
  '#10B981', // Emerald (WhatsApp)
  '#A855F7', // Purple (Play TV)
  '#38BDF8', // Sky Blue (CloudStream)
  '#F43F5E', // Rose
  '#EAB308', // Amber
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#8B5CF6', // Violet
];

const ICON_PRESETS = [
  { name: 'MessageSquare', label: 'Mesaj / WhatsApp' },
  { name: 'Play', label: 'Medya / TV' },
  { name: 'CloudDownload', label: 'İndirme / Repo' },
  { name: 'Music', label: 'Müzik' },
  { name: 'Code', label: 'Kod / Geliştirici' },
  { name: 'Camera', label: 'Kamera' },
  { name: 'Film', label: 'Film' },
  { name: 'Send', label: 'Telegram / Gönder' },
];

export const CapsuleManagerModal: React.FC<CapsuleManagerModalProps> = ({
  capsules,
  onAddCapsule,
  onUpdateCapsule,
  onDeleteCapsule,
  onClose,
  language,
}) => {
  const isTr = language === 'tr';

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formName, setFormName] = useState('');
  const [formSubText, setFormSubText] = useState('');
  const [formIcon, setFormIcon] = useState('MessageSquare');
  const [formColor, setFormColor] = useState('#10B981');

  const startAdd = () => {
    setFormName('');
    setFormSubText('');
    setFormIcon('MessageSquare');
    setFormColor('#10B981');
    setIsAdding(true);
    setEditingId(null);
  };

  const startEdit = (c: CapsuleItem) => {
    setFormName(c.name);
    setFormSubText(c.subText);
    setFormIcon(c.iconName);
    setFormColor(c.accentColor);
    setEditingId(c.id);
    setIsAdding(false);
  };

  const handleSave = () => {
    if (!formName.trim()) return;

    if (isAdding) {
      const newId = `capsule-${Date.now()}`;
      onAddCapsule({
        id: newId,
        name: formName.trim(),
        subText: formSubText.trim() || (isTr ? 'Bildirim yok' : 'No notification'),
        iconName: formIcon,
        accentColor: formColor,
      });
      setIsAdding(false);
    } else if (editingId) {
      onUpdateCapsule(editingId, {
        name: formName.trim(),
        subText: formSubText.trim(),
        iconName: formIcon,
        accentColor: formColor,
      });
      setEditingId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0e111a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">
                {isTr ? 'Ana Ekran Kapsülleri' : 'Home Screen Capsules'}
              </h2>
              <p className="text-xs text-slate-400">
                {isTr
                  ? 'Canlı cam kapsül bildirimlerini düzenleyin veya yenisini ekleyin'
                  : 'Manage glassmorphism live capsules on the home screen'}
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

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Add / Edit Form */}
          {(isAdding || editingId) ? (
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                {isAdding
                  ? isTr ? 'Yeni Kapsül Oluştur' : 'Create New Capsule'
                  : isTr ? 'Kapsülü Düzenle' : 'Edit Capsule'}
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">
                    {isTr ? 'Uygulama Adı' : 'App Name'}
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Örn: Spotify, Discord, Notlar..."
                    className="w-full bg-slate-900 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">
                    {isTr ? 'Alt Metin / Bildirim Durumu' : 'SubText / Notification Status'}
                  </label>
                  <input
                    type="text"
                    value={formSubText}
                    onChange={(e) => setFormSubText(e.target.value)}
                    placeholder="Örn: 3 yeni bildirim, Çalan: Bohemian Rhapsody..."
                    className="w-full bg-slate-900 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1.5 font-medium">
                    {isTr ? 'Vurgu Rengi (accentColor)' : 'Accent Color'}
                  </label>
                  <div className="flex gap-2 items-center flex-wrap">
                    {COLOR_PRESETS.map((hex) => (
                      <button
                        key={hex}
                        type="button"
                        onClick={() => setFormColor(hex)}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${
                          formColor === hex
                            ? 'border-white scale-110 shadow-md'
                            : 'border-transparent hover:scale-105'
                        }`}
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                    <input
                      type="color"
                      value={formColor}
                      onChange={(e) => setFormColor(e.target.value)}
                      className="w-7 h-7 rounded-full bg-transparent border-0 cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1.5 font-medium">
                    {isTr ? 'İkon' : 'Icon'}
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {ICON_PRESETS.map((ic) => (
                      <button
                        key={ic.name}
                        type="button"
                        onClick={() => setFormIcon(ic.name)}
                        className={`p-2 rounded-xl border text-center text-[10px] flex flex-col items-center gap-1 transition-colors ${
                          formIcon === ic.name
                            ? 'bg-purple-600/30 border-purple-500 text-white'
                            : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span className="font-semibold">{ic.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAdding(false);
                    setEditingId(null);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white"
                >
                  {isTr ? 'İptal' : 'Cancel'}
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 rounded-lg text-xs font-semibold text-white shadow-md"
                >
                  {isTr ? 'Kaydet' : 'Save'}
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={startAdd}
              className="w-full py-3 border border-dashed border-white/20 hover:border-purple-500/50 rounded-2xl flex items-center justify-center gap-2 text-xs font-medium text-slate-300 hover:text-white transition-all bg-white/[0.02] hover:bg-white/[0.05]"
            >
              <Plus size={16} className="text-purple-400" />
              <span>{isTr ? 'Yeni Kapsül Ekle' : 'Add New Capsule'}</span>
            </button>
          )}

          {/* List of Current Capsules */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {isTr ? 'Mevcut Kapsüller' : 'Active Capsules'} ({capsules.length})
            </h3>

            <div className="space-y-2">
              {capsules.map((c) => (
                <div
                  key={c.id}
                  className="p-3 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between gap-3 group hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <AppBrandIcon
                      appId={c.appId || c.id}
                      name={c.name}
                      fallbackColor={c.accentColor}
                      size={40}
                      shape="squircle"
                      glow={false}
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate">{c.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{c.subText}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => startEdit(c)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                      title={isTr ? 'Düzenle' : 'Edit'}
                    >
                      <Edit2 size={15} />
                    </button>
                    {capsules.length > 1 && (
                      <button
                        onClick={() => onDeleteCapsule(c.id)}
                        className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
                        title={isTr ? 'Sil' : 'Delete'}
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs transition-colors shadow-lg"
          >
            {isTr ? 'Kapat' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
