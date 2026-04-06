import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Language, translations, Translations } from '../data/translations';

interface LanguageContextType {
  lang: Language;
  t: Translations;
  toggleLanguage: () => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('skyface_lang');
    return (saved === 'ar' || saved === 'en') ? saved : 'ar';
  });

  const [fadeClass, setFadeClass] = useState('opacity-100');

  const isRTL = lang === 'ar';
  const t = translations[lang];

  useEffect(() => {
    localStorage.setItem('skyface_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.body.style.fontFamily = isRTL
      ? "'Cairo', sans-serif"
      : "'Inter', 'Poppins', sans-serif";
  }, [lang, isRTL]);

  const toggleLanguage = useCallback(() => {
    setFadeClass('opacity-0 transition-opacity duration-300');
    setTimeout(() => {
      setLang(prev => prev === 'ar' ? 'en' : 'ar');
      setFadeClass('opacity-100 transition-opacity duration-300');
    }, 300);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLanguage, isRTL }}>
      <div className={fadeClass}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
