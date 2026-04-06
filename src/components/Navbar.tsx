import { Dumbbell, Home, Crown, Camera } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const { t } = useLanguage();

  const navItems = [
    { id: 'home', label: t.home, icon: Home },
    { id: 'workout', label: t.workout, icon: Dumbbell },
    { id: 'beforeafter', label: t.beforeAfter, icon: Camera },
    { id: 'subscribe', label: t.subscribe, icon: Crown },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass border-t border-white/5">
      <div className="max-w-lg mx-auto flex justify-around items-center py-2">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300
                ${isActive
                  ? 'text-neon-blue scale-110'
                  : 'text-gray-500 hover:text-gray-300'
                }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-neon-blue animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
