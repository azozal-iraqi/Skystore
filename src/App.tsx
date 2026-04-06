import { useState } from "react";
import { LanguageProvider, useLang } from "./i18n/LanguageContext";
import LanguageToggle from "./components/LanguageToggle";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import QuoteBar from "./components/QuoteBar";
import ExercisesPage from "./components/ExercisesPage";
import SubscriptionPage from "./components/SubscriptionPage";
import AdminPanel from "./components/AdminPanel";
import Footer from "./components/Footer";

function AdminLoginModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { t } = useLang();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = () => {
    if (password === "20092003") {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-white mb-4">{t.adminLogin}</h3>
        <label className="block text-sm text-gray-400 mb-2">{t.adminPassword}</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t.adminPasswordPlaceholder}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white
            placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors mb-4"
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />
        {error && (
          <p className="text-red-400 text-sm mb-3">{t.adminWrongPassword}</p>
        )}
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold
            rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 active:scale-95"
        >
          {t.adminEnter}
        </button>
      </div>
    </div>
  );
}

function AppContent() {
  const { lang } = useLang();
  const [page, setPage] = useState("home");
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleNavigate = (p: string) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAdminClick = () => {
    setShowAdminLogin(true);
  };

  const handleAdminSuccess = () => {
    setShowAdminLogin(false);
    setIsAdmin(true);
    setPage("admin");
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setPage("home");
  };

  return (
    <div
      className={`min-h-screen bg-gray-950 text-white transition-all duration-500 ${
        lang === "ar" ? "font-arabic" : "font-english"
      }`}
    >
      <LanguageToggle />
      <Navbar currentPage={page} onNavigate={handleNavigate} />

      <div className="transition-opacity duration-500">
        {page === "home" && (
          <div className="animate-fadeIn">
            <HeroSection onGetStarted={() => handleNavigate("exercises")} />
            <QuoteBar />
          </div>
        )}

        {page === "exercises" && (
          <div className="animate-fadeIn">
            <ExercisesPage />
          </div>
        )}

        {page === "subscription" && (
          <div className="animate-fadeIn">
            <SubscriptionPage
              onCodeActivated={() => {
                /* code activated */
              }}
            />
          </div>
        )}

        {page === "admin" && isAdmin && (
          <div className="animate-fadeIn">
            <AdminPanel onLogout={handleAdminLogout} />
          </div>
        )}
      </div>

      <Footer onAdminClick={handleAdminClick} />

      {showAdminLogin && (
        <AdminLoginModal
          onClose={() => setShowAdminLogin(false)}
          onSuccess={handleAdminSuccess}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
