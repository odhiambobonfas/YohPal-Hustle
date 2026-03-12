"use client";

import { useLanguage, languages } from '@/providers/LanguageProvider';
import { Language } from '@/lib/translations';
import { Languages } from 'lucide-react';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'sw' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
      aria-label="Switch language"
    >
      <Languages size={16} className="text-white/90" />
      <span className="text-[11px] font-semibold text-white/90">
        {language === 'en' ? 'SW' : 'EN'}
      </span>
    </button>
  );
}
