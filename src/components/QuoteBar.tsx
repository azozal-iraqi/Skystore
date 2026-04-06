import { useState, useEffect } from "react";
import { useLang } from "../i18n/LanguageContext";
import { Quote } from "lucide-react";

export default function QuoteBar() {
  const { t } = useLang();
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIdx((prev) => (prev + 1) % t.quotes.length);
        setFade(true);
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, [t.quotes.length]);

  return (
    <div className="w-full py-4 px-6 bg-gradient-to-r from-cyan-900/20 via-blue-900/20 to-cyan-900/20 border-y border-white/5">
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-3">
        <Quote size={18} className="text-cyan-400 flex-shrink-0" />
        <p
          className={`text-gray-300 text-sm md:text-base text-center transition-opacity duration-400 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          {t.quotes[idx]}
        </p>
      </div>
    </div>
  );
}
