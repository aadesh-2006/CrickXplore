import { useState, useEffect } from 'react';
import { LandingPage } from './pages/LandingPage';
import { PlayerExplorerPage } from './pages/PlayerExplorerPage';
import { useCricketAmbience } from './hooks/useCricketAmbience';

export function App() {
  const [currentView, setCurrentView] = useState<'home' | 'players'>('home');
  const { isPlaying, toggleAmbience, playWillowTone } = useCricketAmbience();

  // Listen to hash changes for deep linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#players' || hash === '#/players') {
        setCurrentView('players');
      } else if (hash === '#universe' || hash === '#home' || hash === '') {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigateView = (view: 'home' | 'players') => {
    setCurrentView(view);
    if (view === 'players') {
      window.location.hash = 'players';
    } else {
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentView === 'players') {
    return (
      <PlayerExplorerPage
        onNavigateView={handleNavigateView}
        isPlayingAudio={isPlaying}
        onToggleAudio={toggleAmbience}
        onPlayTone={playWillowTone}
      />
    );
  }

  return (
    <LandingPage
      onNavigateView={handleNavigateView}
      isPlayingAudio={isPlaying}
      onToggleAudio={toggleAmbience}
      onPlayTone={playWillowTone}
    />
  );
}

export default App;
