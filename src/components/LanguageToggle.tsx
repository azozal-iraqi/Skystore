import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageToggle() {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full
        bg-gradient-to-r from-neon-blue/20 to-cyber-lime/20 border border-neon-blue/30
        hover:border-neon-blue/60 transition-all duration-300 backdrop-blur-lg
        hover:shadow-[0_0_20px_rgba(0,229,255,0.2)] group"
      aria-label="Toggle Language"
    >
      <Globe size={18} className="text-neon-blue group-hover:rotate-180 transition-transform duration-500" />
      <span className="text-sm font-semibold text-white">
        {lang === 'ar' ? 'English' : 'العربية'}
      </span>
    </button>
  );
}
