import { useState, useEffect } from 'react';
import { Shield, Copy, Check, RefreshCw, Users, Key, BarChart3, LogOut } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AdminPageProps {
  onLogout: () => void;
}

export default function AdminPage({ onLogout }: AdminPageProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'codes' | 'stats'>('dashboard');
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [codes, setCodes] = useState<string[]>([]);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const savedCodes = JSON.parse(localStorage.getItem('skyface_codes') || '[]') as string[];
    setCodes(savedCodes);
    const saved = localStorage.getItem('skyface_completed');
    if (saved) setCompletedDays(JSON.parse(saved));
    setIsSubscribed(localStorage.getItem('skyface_subscribed') === 'true');
  }, []);

  const generateCode = () => {
    const newCode = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedCode(newCode);
    const updatedCodes = [...codes, newCode];
    setCodes(updatedCodes);
    localStorage.setItem('skyface_codes', JSON.stringify(updatedCodes));
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetAll = () => {
    if (confirm(t.resetConfirm)) {
      localStorage.removeItem('skyface_completed');
      localStorage.removeItem('skyface_subscribed');
      localStorage.removeItem('skyface_codes');
      localStorage.removeItem('skyface_before');
      localStorage.removeItem('skyface_after');
      setCompletedDays([]);
      setIsSubscribed(false);
      setCodes([]);
      setGeneratedCode('');
      alert(t.resetDone);
    }
  };

  // Simulated stats
  const simulatedUsers = 1247;

  const tabs = [
    { id: 'dashboard' as const, label: t.adminDashboard, icon: BarChart3 },
    { id: 'codes' as const, label: t.codeGenerator, icon: Key },
    { id: 'stats' as const, label: t.userStats, icon: Users },
  ];

  return (
    <div className="animate-fade-in pb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Shield size={24} className="text-neon-blue" />
          <h2 className="text-xl font-bold">{t.adminPanel}</h2>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors text-sm"
        >
          <LogOut size={16} />
          <span>{t.logout}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all
                ${activeTab === tab.id
                  ? 'bg-neon-blue text-deep-charcoal'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-2 gap-4">
            <div className="glass p-5 rounded-2xl border border-white/5 text-center">
              <Users size={28} className="text-neon-blue mx-auto mb-2" />
              <p className="text-3xl font-bold text-white">{simulatedUsers.toLocaleString()}</p>
              <p className="text-gray-400 text-sm mt-1">{t.totalUsers}</p>
            </div>
            <div className="glass p-5 rounded-2xl border border-white/5 text-center">
              <Key size={28} className="text-cyber-lime mx-auto mb-2" />
              <p className="text-3xl font-bold text-white">{codes.length}</p>
              <p className="text-gray-400 text-sm mt-1">{t.activeCodes}</p>
            </div>
          </div>

          <button
            onClick={resetAll}
            className="w-full py-3 rounded-xl border border-red-500/30 text-red-400
              hover:bg-red-500/10 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <RefreshCw size={16} />
            <span>{t.resetAllUsers}</span>
          </button>
        </div>
      )}

      {/* Code Generator Tab */}
      {activeTab === 'codes' && (
        <div className="space-y-4 animate-fade-in">
          <button
            onClick={generateCode}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-neon-blue to-cyan-400
              text-deep-charcoal font-bold text-lg hover:shadow-[0_0_30px_rgba(0,229,255,0.4)]
              transition-all duration-300 active:scale-95"
          >
            {t.generateCode}
          </button>

          {generatedCode && (
            <div className="glass p-6 rounded-2xl border border-neon-blue/20 text-center animate-slide-up">
              <p className="text-gray-400 text-sm mb-2">{t.generatedCode}</p>
              <p className="text-4xl font-mono font-bold text-neon-blue tracking-widest mb-4"
                dir="ltr">
                {generatedCode}
              </p>
              <button
                onClick={copyCode}
                className="flex items-center gap-2 mx-auto px-6 py-2 rounded-xl bg-white/5
                  hover:bg-white/10 transition-all border border-white/10"
              >
                {copied ? <Check size={16} className="text-cyber-lime" /> : <Copy size={16} />}
                <span>{copied ? t.copied : t.copyCode}</span>
              </button>
            </div>
          )}

          {/* Code History */}
          {codes.length > 0 && (
            <div className="glass p-4 rounded-2xl border border-white/5">
              <h4 className="text-sm text-gray-400 mb-3">{t.activeCodes} ({codes.length})</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {codes.map((c, i) => (
                  <div key={i} className="flex items-center justify-between py-2 px-3 rounded-xl bg-white/3">
                    <span className="font-mono text-sm text-gray-300" dir="ltr">{c}</span>
                    <Key size={12} className="text-gray-600" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Stats Tab */}
      {activeTab === 'stats' && (
        <div className="space-y-4 animate-fade-in">
          <div className="glass p-5 rounded-2xl border border-white/5">
            <h4 className="text-gray-400 text-sm mb-3">{t.completedDays}</h4>
            <p className="text-3xl font-bold text-neon-blue">{completedDays.length} / 30</p>
            <div className="mt-3 w-full h-2 rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-neon-blue to-cyber-lime transition-all"
                style={{ width: `${(completedDays.length / 30) * 100}%` }}
              />
            </div>
          </div>

          <div className="glass p-5 rounded-2xl border border-white/5">
            <h4 className="text-gray-400 text-sm mb-3">{t.subscriptionStatus}</h4>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isSubscribed ? 'bg-cyber-lime' : 'bg-red-500'}`} />
              <span className={`font-semibold ${isSubscribed ? 'text-cyber-lime' : 'text-red-400'}`}>
                {isSubscribed ? t.active : t.inactive}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
