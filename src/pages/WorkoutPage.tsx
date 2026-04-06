import { useState, useCallback } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { exercises } from '../data/exercises';
import YouTubePlayer from '../components/YouTubePlayer';
import Timer from '../components/Timer';

interface WorkoutPageProps {
  day: number;
  onComplete: () => void;
  onBack: () => void;
}

export default function WorkoutPage({ day, onComplete, onBack }: WorkoutPageProps) {
  const { t, lang, isRTL } = useLanguage();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [timerDone, setTimerDone] = useState(false);
  const [workoutDone, setWorkoutDone] = useState(false);

  const exercise = exercises[currentExercise];
  const isLast = currentExercise === exercises.length - 1;

  const handleTimerComplete = useCallback(() => {
    setTimerDone(true);
  }, []);

  const handleStartTimer = useCallback(() => {
    setTimerActive(true);
  }, []);

  const handleNext = () => {
    if (isLast) {
      setWorkoutDone(true);
      // Save progress
      const saved = localStorage.getItem('skyface_completed');
      const completed: number[] = saved ? JSON.parse(saved) : [];
      if (!completed.includes(day)) {
        completed.push(day);
        localStorage.setItem('skyface_completed', JSON.stringify(completed));
      }
      onComplete();
    } else {
      setCurrentExercise(prev => prev + 1);
      setTimerActive(false);
      setTimerDone(false);
    }
  };

  const BackArrow = isRTL ? ArrowRight : ArrowLeft;
  const NextChevron = isRTL ? ChevronLeft : ChevronRight;

  if (workoutDone) {
    return (
      <div className="animate-fade-in flex flex-col items-center justify-center min-h-[70vh] text-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-neon-blue to-cyber-lime flex items-center justify-center mb-6 animate-pulse-neon">
          <CheckCircle2 size={48} className="text-deep-charcoal" />
        </div>
        <h2 className="text-3xl font-bold text-neon-blue mb-3">{t.greatJob}</h2>
        <p className="text-xl text-white mb-2">{t.workoutComplete}</p>
        <p className="text-gray-400 mb-8">{t.dayCompleted}</p>
        <button
          onClick={onBack}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-neon-blue to-cyan-400
            text-deep-charcoal font-semibold hover:shadow-[0_0_30px_rgba(0,229,255,0.4)]
            transition-all duration-300 active:scale-95"
        >
          {t.backToHome}
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in pb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
        >
          <BackArrow size={20} />
          <span className="text-sm">{t.backToHome}</span>
        </button>
        <div className="text-right">
          <span className="text-neon-blue font-bold">{t.dayNumber(day)}</span>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {exercises.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300
              ${i === currentExercise
                ? 'w-8 bg-neon-blue'
                : i < currentExercise
                  ? 'w-4 bg-cyber-lime'
                  : 'w-4 bg-white/10'
              }`}
          />
        ))}
      </div>

      {/* Exercise Info */}
      <div className="mb-4">
        <p className="text-gray-400 text-sm text-center mb-2">
          {t.exerciseOf(currentExercise + 1, exercises.length)}
        </p>
        <h2 className="text-2xl font-bold text-center text-white mb-2">
          {lang === 'ar' ? exercise.titleAr : exercise.titleEn}
        </h2>
        <p className="text-gray-400 text-sm text-center">
          {lang === 'ar' ? exercise.descAr : exercise.descEn}
        </p>
      </div>

      {/* YouTube Player */}
      <div className="mb-6">
        <YouTubePlayer videoId={exercise.youtubeId} />
      </div>

      {/* Timer */}
      <div className="mb-8">
        <Timer
          duration={exercise.duration}
          onComplete={handleTimerComplete}
          isActive={timerActive}
          onStart={handleStartTimer}
        />
      </div>

      {/* Next Button - only shows after timer completes */}
      {timerDone && (
        <div className="animate-slide-up">
          <button
            onClick={handleNext}
            className="w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 active:scale-95
              flex items-center justify-center gap-2
              bg-gradient-to-r from-cyber-lime to-green-400 text-deep-charcoal
              hover:shadow-[0_0_30px_rgba(204,255,0,0.3)]"
          >
            <span>{isLast ? t.finishWorkout : t.nextExercise}</span>
            <NextChevron size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
