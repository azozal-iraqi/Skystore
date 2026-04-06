import { useLang } from "../i18n/LanguageContext";
import { Sparkles, ChevronDown } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  const { t } = useLang();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles size={32} className="text-cyan-400 animate-pulse" />
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
          {t.heroTitle}
        </h1>

        <p className="text-xl md:text-2xl text-cyan-400 font-semibold mb-4">
          {t.heroSubtitle}
        </p>

        <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto mb-10">
          {t.heroDescription}
        </p>

        <button
          onClick={onGetStarted}
          className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl
            text-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300
            shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95"
        >
          {t.getStarted}
        </button>
      </div>

      <ChevronDown
        size={28}
        className="absolute bottom-10 text-gray-500 animate-bounce"
      />
    </section>
  );
}
