import { useLang } from "../i18n/LanguageContext";
import { Dumbbell } from "lucide-react";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const { t, isRTL } = useLang();

  const links = [
    { id: "home", label: t.home },
    { id: "exercises", label: t.exercises },
    { id: "subscription", label: t.subscription },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-gray-950/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onNavigate("home")}
        >
          <Dumbbell size={24} className="text-cyan-400" />
          <span className="text-xl font-bold text-cyan-400">{t.appName}</span>
        </div>

        <div className={`flex items-center gap-6 ${isRTL ? "flex-row-reverse" : ""}`}>
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`text-sm font-medium transition-colors duration-200 ${
                currentPage === link.id
                  ? "text-cyan-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
