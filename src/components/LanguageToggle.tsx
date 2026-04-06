import { useLang } from "../i18n/LanguageContext";
import { Globe } from "lucide-react";

export default function LanguageToggle() {
  const { lang, setLang } = useLang();

  return (
    <button
      onClick={() => setLang(lang === "ar" ? "en" : "ar")}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full
        bg-white/5 backdrop-blur-md border border-white/10 text-white
        hover:border-cyan-400 hover:bg-white/10 transition-all duration-300
        shadow-lg shadow-cyan-500/10"
    >
      <Globe size={18} className="text-cyan-400" />
      <span className="text-sm font-semibold">
        {lang === "ar" ? "English" : "العربية"}
      </span>
    </button>
  );
}
