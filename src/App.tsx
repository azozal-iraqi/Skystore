import { useState, useCallback } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import LanguageToggle from './components/LanguageToggle';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import WorkoutPage from './pages/WorkoutPage';
import SubscribePage from './pages/SubscribePage';
import BeforeAfterPage from './pages/BeforeAfterPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminPage from './pages/AdminPage';

type Page = 'home' | 'workout' | 'subscribe' | 'beforeafter' | 'admin-login' | 'admin';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedDay, setSelectedDay] = useState(1);

  const handleSelectDay = useCallback((day: number) => {
    setSelectedDay(day);
    setCurrentPage('workout');
  }, []);

  const handleNavigate = useCallback((page: string) => {
    setCurrentPage(page as Page);
  }, []);

  const handleWorkoutComplete = useCallback(() => {
    // Workout complete - stays on workout page showing completion screen
  }, []);

  const handleBackToHome = useCallback(() => {
    setCurrentPage('home');
  }, []);

  const handleAdminClick = useCallback(() => {
    setCurrentPage('admin-login');
  }, []);

  const handleAdminLogin = useCallback(() => {
    setCurrentPage('admin');
  }, []);

  const handleAdminLogout = useCallback(() => {
    setCurrentPage('home');
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onSelectDay={handleSelectDay} onNavigate={handleNavigate} />;
      case 'workout':
        return (
          <WorkoutPage
            day={selectedDay}
            onComplete={handleWorkoutComplete}
            onBack={handleBackToHome}
          />
        );
      case 'subscribe':
        return <SubscribePage />;
      case 'beforeafter':
        return <BeforeAfterPage />;
      case 'admin-login':
        return <AdminLoginPage onLogin={handleAdminLogin} onBack={handleBackToHome} />;
      case 'admin':
        return <AdminPage onLogout={handleAdminLogout} />;
      default:
        return <HomePage onSelectDay={handleSelectDay} onNavigate={handleNavigate} />;
    }
  };

  const showNavbar = !['workout', 'admin-login', 'admin'].includes(currentPage);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-deep-charcoal">
        <LanguageToggle />

        <main className="max-w-lg mx-auto px-4 pt-16 pb-4">
          {renderPage()}
          <Footer onAdminClick={handleAdminClick} />
        </main>

        {showNavbar && (
          <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
        )}
      </div>
    </LanguageProvider>
  );
}
