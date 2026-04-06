import { useEffect, useState } from 'react';
import { Lock, CheckCircle, Zap, Crown, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HomePageProps {
  onSelectDay: (day: number) => void;
  onNavigate: (page: string) => void;
}

export default function HomePage({ onSelectDay, onNavigate }: HomePageProps) {
  const { t, lang } = useLanguage();
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('skyface_completed');
    if (saved) setCompletedDays(JSON.parse(saved));
    setIsSubscribed(localStorage.getItem('skyface_subscribed') === 'true');
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % t.quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [t.quotes.length]);

  const handleDayClick = (day: number) => {
    if (day === 1) {
      onSelectDay(day);
      return;
    }
    if (!isSubscribed) {
      onNavigate('subscribe');
      return;
    }
    onSelectDay(day);
  };

  const getDayStatus = (day: number): 'free' | 'completed' | 'current' | 'locked' => {
    if (completedDays.includes(day)) return 'completed';
    if (day === 1) return 'free';
    if (!isSubscribed) return 'locked';
    const nextDay = completedDays.length > 0 ? Math.max(...completedDays) + 1 : 1;
    if (day === nextDay) return 'current';
    if (day <= nextDay) return 'completed';
    return 'locked';
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'free': return t.free;
      case 'completed': return t.completed;
      case 'current': return t.current;
      case 'locked': return t.locked;
      default: return '';
    }
  };

  return (
    <div className="animate-fade-in pb-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl mb-8 p-8 glass neon-glow">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-cyber-lime/5" />
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="text-cyber-lime" size={24} />
            <h1 className="text-3xl font-bold neon-text text-neon-blue">
              {t.appName}
            </h1>
            <Sparkles className="text-cyber-lime" size={24} />
          </div>
          <p className="text-lg text-gray-300 mb-4">{t.tagline}</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <Zap size={14} className="text-cyber-lime" />
            <span className="text-sm text-gray-400">8-10 {t.minutes} · {t.dailyRoutine}</span>
          </div>
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="mb-8 text-center">
        <p className="text-gray-400 italic text-sm transition-opacity duration-500" key={quoteIndex}>
          "{t.quotes[quoteIndex]}"
        </p>
      </div>

      {/* Day Selector */}
      <div className="mb-6">
        <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${lang === 'ar' ? 'border-r-4 border-neon-blue pr-3' : 'border-l-4 border-neon-blue pl-3'}`}>
          {t.selectDay}
        </h2>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {Array.from({ length: 30 }, (_, i) => i + 1).map(day => {
          const status = getDayStatus(day);
          return (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              className={`day-card relative p-3 rounded-2xl border text-center
                ${status === 'completed'
                  ? 'bg-neon-blue/10 border-neon-blue/30 text-neon-blue'
                  : status === 'free' || status === 'current'
                    ? 'bg-cyber-lime/10 border-cyber-lime/30 text-cyber-lime hover:bg-cyber-lime/20'
                    : 'bg-white/3 border-white/5 text-gray-600'
                }`}
            >
              <div className="text-lg font-bold">{day}</div>
              <div className="text-[8px] mt-1">
                {status === 'completed' && <CheckCircle size={14} className="mx-auto" />}
                {status === 'locked' && <Lock size={12} className="mx-auto" />}
                {status === 'free' && <span className="text-cyber-lime">{getStatusLabel(status)}</span>}
                {status === 'current' && <span className="text-cyber-lime">{getStatusLabel(status)}</span>}
              </div>
              {status === 'locked' && !isSubscribed && (
                <Crown size={10} className="absolute top-1 right-1 text-yellow-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
