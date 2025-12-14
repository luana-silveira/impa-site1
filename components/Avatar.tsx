import React from 'react';
import { AvatarConfig } from '../types';
import { Smile, Palette, User, Shirt, Headphones, Glasses, Scissors } from 'lucide-react';

export const DEFAULT_AVATAR: AvatarConfig = {
  skinColor: '#f5d0b0',
  hairColor: '#4a3b32',
  hairStyle: 'short',
  backgroundColor: '#a86bf6',
  clothingColor: '#ffffff',
  accessory: 'none'
};

interface AvatarProps {
  config?: AvatarConfig;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ config = DEFAULT_AVATAR, size = 'md', className = '' }) => {
  // Safe defaults in case of legacy data
  const { 
    skinColor = '#f5d0b0', 
    hairColor = '#4a3b32', 
    hairStyle = 'short', 
    backgroundColor = '#a86bf6',
    clothingColor = '#ffffff',
    accessory = 'none'
  } = config;

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-24 h-24',
    lg: 'w-40 h-40',
    xl: 'w-64 h-64'
  };

  return (
    <div className={`relative rounded-full overflow-hidden flex-shrink-0 ${sizeClasses[size]} ${className}`} style={{ backgroundColor }}>
      <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        
        {/* Body / Clothing */}
        <defs>
            <clipPath id="circleClip">
                <circle cx="50" cy="50" r="50" />
            </clipPath>
        </defs>
        <g clipPath="url(#circleClip)">
             <path d="M20 100 L 20 88 Q 50 82 80 88 L 80 100 Z" fill={clothingColor} />
             {/* Neck shadow/detail */}
             <path d="M38 75 L 38 85 Q 50 88 62 85 L 62 75" fill={skinColor} opacity="0.9" />
             <rect x="38" y="60" width="24" height="20" fill={skinColor} />
        </g>

        {/* Hair Back (Long) */}
        {hairStyle === 'long' && (
           <path d="M25 50 C 20 85 80 85 75 50" fill={hairColor} stroke={hairColor} strokeWidth="2" />
        )}
         {hairStyle === 'afro' && (
           <circle cx="50" cy="45" r="30" fill={hairColor} />
        )}

        {/* Head */}
        <ellipse cx="50" cy="50" rx="24" ry="28" fill={skinColor} />

        {/* Face Features */}
        {/* Ears */}
        <path d="M26 50 Q 24 50 24 56 Q 26 60 28 58" fill={skinColor} />
        <path d="M74 50 Q 76 50 76 56 Q 74 60 72 58" fill={skinColor} />

        {/* Eyebrows */}
        <path d="M38 46 Q 42 44 46 46" fill="none" stroke="#4a3b32" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
        <path d="M54 46 Q 58 44 62 46" fill="none" stroke="#4a3b32" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>

        {/* Eyes */}
        <circle cx="40" cy="52" r="2.5" fill="#333" />
        <circle cx="60" cy="52" r="2.5" fill="#333" />
        
        {/* Nose Hint */}
        <path d="M50 54 Q 48 60 51 61" fill="none" stroke={skinColor} strokeWidth="1.5" filter="brightness(0.8)" />

        {/* Mouth */}
        <path d="M42 66 Q 50 72 58 66" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />

        {/* Hair Top/Front */}
        {hairStyle === 'short' && (
           <path d="M26 45 Q 50 25 74 45 L 74 38 Q 50 15 26 38 Z" fill={hairColor} />
        )}
        {hairStyle === 'curly' && (
           <path d="M24 45 Q 35 25 50 25 Q 65 25 76 45 Q 80 35 65 15 Q 50 10 35 15 Q 20 35 24 45" fill={hairColor} />
        )}
        {hairStyle === 'long' && (
           <path d="M26 50 Q 50 25 74 50 L 74 35 Q 50 15 26 35 Z" fill={hairColor} />
        )}
        {hairStyle === 'afro' && (
           <path d="M26 42 Q 50 25 74 42" fill="none" />
        )}

        {/* Accessories */}
        {accessory === 'glasses' && (
           <g stroke="#333" strokeWidth="1.5" fill="rgba(255,255,255,0.4)">
             <circle cx="40" cy="52" r="7" />
             <circle cx="60" cy="52" r="7" />
             <line x1="47" y1="52" x2="53" y2="52" />
             <path d="M33 52 L 26 48" fill="none" />
             <path d="M67 52 L 74 48" fill="none" />
           </g>
        )}
        {accessory === 'headphones' && (
           <g>
              <path d="M22 55 Q 20 20 80 20 Q 80 55 78 55" fill="none" stroke="#333" strokeWidth="3" />
              <rect x="16" y="48" width="10" height="16" rx="3" fill="#333" />
              <rect x="74" y="48" width="10" height="16" rx="3" fill="#333" />
           </g>
        )}
      </svg>
    </div>
  );
};

interface AvatarEditorProps {
  config: AvatarConfig;
  onChange: (newConfig: AvatarConfig) => void;
}

export const AvatarEditor: React.FC<AvatarEditorProps> = ({ config, onChange }) => {
  const skinColors = ['#f5d0b0', '#e0ac69', '#8d5524', '#c68642', '#3d2314', '#ffdbac', '#f1c27d'];
  const hairColors = ['#4a3b32', '#000000', '#d4af37', '#800000', '#cccccc', '#ff6b6b', '#1a1a1a', '#5e3a22'];
  const bgColors = ['#a86bf6', '#34d399', '#3b82f6', '#f472b6', '#fcd34d', '#94a3b8', '#fb7185'];
  const clothingColors = ['#ffffff', '#1e293b', '#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

  const Section = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => (
      <div className="mb-4">
        <label className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-1">
            <Icon className="w-3 h-3" /> {title}
        </label>
        {children}
      </div>
  );

  const ColorPicker = ({ colors, selected, onSelect }: { colors: string[], selected: string, onSelect: (c: string) => void }) => (
    <div className="flex gap-2 flex-wrap">
        {colors.map(c => (
        <button
            key={c}
            onClick={() => onSelect(c)}
            className={`w-7 h-7 rounded-full border-2 transition-all hover:scale-110 active:scale-95 ${selected === c ? 'border-impa-600 scale-110 shadow-sm ring-2 ring-impa-100' : 'border-transparent ring-1 ring-slate-100'}`}
            style={{ backgroundColor: c }}
            title={c}
        />
        ))}
    </div>
  );

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm animate-fade-in">
      <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Palette className="w-5 h-5 text-impa-600" /> Personalizar Avatar
      </h3>

      <Section title="Tom de Pele" icon={User}>
         <ColorPicker colors={skinColors} selected={config.skinColor} onSelect={(c) => onChange({ ...config, skinColor: c })} />
      </Section>

      <Section title="Cabelo" icon={Scissors}>
        <div className="flex gap-2 mb-3 flex-wrap">
             {['short', 'long', 'curly', 'afro', 'bald'].map((s) => (
             <button 
                key={s}
                onClick={() => onChange({ ...config, hairStyle: s as any })}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${config.hairStyle === s ? 'bg-impa-600 text-white border-impa-600 shadow-sm' : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-impa-300'}`}
             >
               {s === 'short' ? 'Curto' : s === 'long' ? 'Longo' : s === 'curly' ? 'Cacheado' : s === 'afro' ? 'Afro' : 'Careca'}
             </button>
           ))}
        </div>
        <ColorPicker colors={hairColors} selected={config.hairColor} onSelect={(c) => onChange({ ...config, hairColor: c })} />
      </Section>

      <Section title="Roupa" icon={Shirt}>
         <ColorPicker colors={clothingColors} selected={config.clothingColor || '#ffffff'} onSelect={(c) => onChange({ ...config, clothingColor: c })} />
      </Section>

      <Section title="Cor de Fundo" icon={Palette}>
         <ColorPicker colors={bgColors} selected={config.backgroundColor} onSelect={(c) => onChange({ ...config, backgroundColor: c })} />
      </Section>

      <Section title="Acessório" icon={Glasses}>
        <div className="flex gap-2">
           {[
               { id: 'none', label: 'Nenhum', icon: Smile },
               { id: 'glasses', label: 'Óculos', icon: Glasses },
               { id: 'headphones', label: 'Fones', icon: Headphones }
           ].map((a) => (
             <button 
                key={a.id}
                onClick={() => onChange({ ...config, accessory: a.id as any })}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold border transition-all ${config.accessory === a.id ? 'bg-impa-100 text-impa-700 border-impa-400' : 'bg-white text-slate-600 border-slate-200 hover:border-impa-300'}`}
             >
               <a.icon className="w-3 h-3" />
               {a.label}
             </button>
           ))}
        </div>
      </Section>
    </div>
  );
};