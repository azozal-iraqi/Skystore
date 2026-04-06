import { useLang } from "../i18n/LanguageContext";

interface FooterProps {
  onAdminClick: () => void;
}

export default function Footer({ onAdminClick }: FooterProps) {
  const { isRTL } = useLang();

  return (
    <footer className="w-full py-6 px-4 border-t border-white/5 bg-gray-950/50">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-3">
        <p className="text-gray-500 text-xs text-center" dir="ltr">
          &copy; 2026 Sky Face. All Rights Reserved. Developed by: Ezaldeen Jassam
        </p>
        <button
          onClick={onAdminClick}
          className="text-gray-700 text-xs hover:text-gray-500 transition-colors opacity-30"
        >
          {isRTL ? "لوحة التحكم" : "Admin"}
        </button>
      </div>
    </footer>
  );
}
