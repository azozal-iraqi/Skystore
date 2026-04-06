import { useEffect, useState, useCallback } from 'react';
import { Play, Pause } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TimerProps {
  duration: number;
  onComplete: () => void;
  isActive: boolean;
  onStart: () => void;
}

export default function Timer({ duration, onComplete, isActive, onStart }: TimerProps) {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    setTimeLeft(duration);
    setIsPaused(true);
  }, [duration]);

  useEffect(() => {
    if (!isActive || isPaused || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, isPaused, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && isActive && !isPaused) {
      onComplete();
    }
  }, [timeLeft, isActive, isPaused, onComplete]);

  const handleToggle = useCallback(() => {
    if (!isActive) {
      onStart();
      setIsPaused(false);
    } else {
      setIsPaused(prev => !prev);
    }
  }, [isActive, onStart]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((duration - timeLeft) / duration) * 100;

  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-gray-400 text-sm">{t.timeRemaining}</p>

      {/* Circular Timer */}
      <div className="relative w-36 h-36">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          {/* Background circle */}
          <circle
            cx="60" cy="60" r="54"
            fill="none"
            stroke="#1a1a2e"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="60" cy="60" r="54"
            fill="none"
            stroke="url(#timerGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="timer-ring"
          />
          <defs>
            <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="100%" stopColor="#CCFF00" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white font-mono">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={handleToggle}
        className="flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all duration-300
          bg-gradient-to-r from-neon-blue to-cyan-400 text-deep-charcoal
          hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] active:scale-95"
      >
        {!isActive || isPaused ? (
          <>
            <Play size={20} />
            <span>{!isActive ? t.startExercise : t.resumeTimer}</span>
          </>
        ) : (
          <>
            <Pause size={20} />
            <span>{t.pauseTimer}</span>
          </>
        )}
      </button>
    </div>
  );
}
