import { useState } from "react";
import { useLang } from "../i18n/LanguageContext";
import { Timer, RotateCcw, ChevronDown, ChevronUp } from "lucide-react";

interface Exercise {
  titleKey: string;
  descKey: string;
  stepsKey: string;
  duration: number;
  reps: number;
  icon: string;
}

const exercises: Exercise[] = [
  { titleKey: "jawlineTitle", descKey: "jawlineDesc", stepsKey: "jawlineSteps", duration: 5, reps: 10, icon: "💪" },
  { titleKey: "cheekTitle", descKey: "cheekDesc", stepsKey: "cheekSteps", duration: 3, reps: 8, icon: "😊" },
  { titleKey: "neckTitle", descKey: "neckDesc", stepsKey: "neckSteps", duration: 4, reps: 6, icon: "🦢" },
  { titleKey: "eyeTitle", descKey: "eyeDesc", stepsKey: "eyeSteps", duration: 3, reps: 10, icon: "👁️" },
  { titleKey: "lipTitle", descKey: "lipDesc", stepsKey: "lipSteps", duration: 3, reps: 8, icon: "😁" },
  { titleKey: "foreheadTitle", descKey: "foreheadDesc", stepsKey: "foreheadSteps", duration: 4, reps: 5, icon: "🧠" },
];

export default function ExercisesPage() {
  const { t } = useLang();
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <section className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-2">
          {t.exercisesTitle}
        </h2>
        <p className="text-gray-400 text-center mb-10">{t.exercisesSubtitle}</p>

        <div className="grid gap-4">
          {exercises.map((ex, idx) => {
            const title = t[ex.titleKey as keyof typeof t] as string;
            const desc = t[ex.descKey as keyof typeof t] as string;
            const stepsArr = t[ex.stepsKey as keyof typeof t] as string[];
            const isOpen = expandedIdx === idx;

            return (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden
                  transition-all duration-300 hover:border-cyan-500/30"
              >
                <button
                  onClick={() => setExpandedIdx(isOpen ? null : idx)}
                  className="w-full p-5 flex items-center justify-between text-start"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{ex.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold text-white">{title}</h3>
                      <p className="text-gray-400 text-sm">{desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-4 text-gray-500 text-xs">
                      <span className="flex items-center gap-1">
                        <Timer size={14} className="text-cyan-400" />
                        {ex.duration} {t.minutes}
                      </span>
                      <span className="flex items-center gap-1">
                        <RotateCcw size={14} className="text-cyan-400" />
                        {ex.reps} {t.times}
                      </span>
                    </div>
                    {isOpen ? (
                      <ChevronUp size={20} className="text-cyan-400" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-500" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 animate-fadeIn">
                    <div className="flex items-center gap-4 md:hidden text-gray-500 text-xs mb-4">
                      <span className="flex items-center gap-1">
                        <Timer size={14} className="text-cyan-400" />
                        {ex.duration} {t.minutes}
                      </span>
                      <span className="flex items-center gap-1">
                        <RotateCcw size={14} className="text-cyan-400" />
                        {ex.reps} {t.times}
                      </span>
                    </div>
                    <h4 className="text-cyan-400 text-sm font-semibold mb-3">
                      {t.steps}:
                    </h4>
                    <ol className="space-y-2">
                      {stepsArr.map((step, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center font-bold">
                            {sIdx + 1}
                          </span>
                          <span className="text-gray-300 text-sm">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
