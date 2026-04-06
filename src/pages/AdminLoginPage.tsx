import { useState } from 'react';
import { Shield, KeyRound } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { verifyAdmin } from '../data/config';

interface AdminLoginPageProps {
  onLogin: () => void;
  onBack: () => void;
}

export default function AdminLoginPage({ onLogin, onBack }: AdminLoginPageProps) {
  const { t } = useLanguage();
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (verifyAdmin(passkey)) {
      onLogin();
    } else {
      setError(t.wrongPasskey);
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div className="animate-fade-in flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-sm glass p-8 rounded-3xl border border-white/5">
        <div className="text-center mb-6">
          <Shield size={48} className="text-neon-blue mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white">{t.adminLogin}</h2>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <KeyRound size={18} className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-500" />
            <input
              type="password"
              value={passkey}
              onChange={e => setPasskey(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.enterPasskey}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-12
                focus:outline-none focus:border-neon-blue/50 transition-colors"
              dir="ltr"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center animate-fade-in">{error}</p>
          )}

          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-neon-blue to-cyan-400
              text-deep-charcoal font-bold hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]
              transition-all duration-300 active:scale-95"
          >
            {t.login}
          </button>

          <button
            onClick={onBack}
            className="w-full py-3 rounded-xl text-gray-400 hover:text-white transition-colors"
          >
            {t.backToHome}
          </button>
        </div>
      </div>
    </div>
  );
}
