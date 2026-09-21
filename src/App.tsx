import { useState, useEffect } from 'react';
import { LandingPage } from './pages/LandingPage';
import { PlayerExplorerPage } from './pages/PlayerExplorerPage';
import { CollectionPage } from './pages/CollectionPage';
import { TimelinePage } from './pages/TimelinePage';
import { useCricketAmbience } from './hooks/useCricketAmbience';

export type AppView = 'home' | 'players' | 'collection' | 'timeline';

export function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | undefined>(undefined);
  const [selectedCardId, setSelectedCardId] = useState<string | undefined>(undefined);
  const { isPlaying, toggleAmbience, playWillowTone } = useCricketAmbience();

  // Listen to hash changes for deep linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#timeline' || hash === '#/timeline') {
        setCurrentView('timeline');
      } else if (hash === '#collection' || hash === '#/collection') {
        setCurrentView('collection');
      } else if (hash.startsWith('#players') || hash.startsWith('#/players')) {
        setCurrentView('players');
      } else if (hash === '#universe' || hash === '#home' || hash === '') {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigateView = (
    view: AppView,
    playerId?: string,
    cardId?: string
  ) => {
    setCurrentView(view);
    if (playerId) {
      setSelectedPlayerId(playerId);
    } else {
      setSelectedPlayerId(undefined);
    }

    if (cardId) {
      setSelectedCardId(cardId);
    } else {
      setSelectedCardId(undefined);
    }

    if (view === 'timeline') {
      window.location.hash = 'timeline';
    } else if (view === 'collection') {
      window.location.hash = 'collection';
    } else if (view === 'players') {
      window.location.hash = 'players';
    } else {
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentView === 'timeline') {
    return (
      <TimelinePage
        onNavigateView={handleNavigateView}
        isPlayingAudio={isPlaying}
        onToggleAudio={toggleAmbience}
        onPlayTone={playWillowTone}
      />
    );
  }

  if (currentView === 'collection') {
    return (
      <CollectionPage
        onNavigateView={handleNavigateView}
        isPlayingAudio={isPlaying}
        onToggleAudio={toggleAmbience}
        onPlayTone={playWillowTone}
        initialSelectedCardId={selectedCardId}
      />
    );
  }

  if (currentView === 'players') {
    return (
      <PlayerExplorerPage
        onNavigateView={handleNavigateView}
        isPlayingAudio={isPlaying}
        onToggleAudio={toggleAmbience}
        onPlayTone={playWillowTone}
        initialSelectedPlayerId={selectedPlayerId}
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
