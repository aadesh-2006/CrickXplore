import { useState, useEffect } from 'react';
import { LandingPage } from './pages/LandingPage';
import { PlayerExplorerPage } from './pages/PlayerExplorerPage';
import { CollectionPage } from './pages/CollectionPage';
import { TimelinePage } from './pages/TimelinePage';
import { MomentsPage } from './pages/MomentsPage';
import { StadiumsPage } from './pages/StadiumsPage';
import { CardGamePage } from './pages/CardGamePage';
import { AuctionPage } from './pages/AuctionPage.tsx';
import { useCricketAmbience } from './hooks/useCricketAmbience';
import { AuthProvider } from './context/AuthContext.tsx';

export type AppView = 'home' | 'players' | 'collection' | 'timeline' | 'moments' | 'stadiums' | 'game' | 'auction';

export function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | undefined>(undefined);
  const [selectedCardId, setSelectedCardId] = useState<string | undefined>(undefined);
  const [selectedMomentId, setSelectedMomentId] = useState<string | undefined>(undefined);
  const [selectedStadiumId, setSelectedStadiumId] = useState<string | undefined>(undefined);
  const { isPlaying, toggleAmbience, playWillowTone } = useCricketAmbience();

  // Listen to hash changes for deep linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#auction' || hash === '#/auction') {
        setCurrentView('auction');
      } else if (hash === '#game' || hash === '#/game') {
        setCurrentView('game');
      } else if (hash === '#moments' || hash === '#/moments') {
        setCurrentView('moments');
      } else if (hash === '#stadiums' || hash === '#/stadiums') {
        setCurrentView('stadiums');
      } else if (hash === '#timeline' || hash === '#/timeline') {
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
    cardId?: string,
    momentId?: string,
    stadiumId?: string
  ) => {
    setCurrentView(view);
    setSelectedPlayerId(playerId);
    setSelectedCardId(cardId);
    setSelectedMomentId(momentId);
    setSelectedStadiumId(stadiumId);

    if (view === 'auction') {
      window.location.hash = 'auction';
    } else if (view === 'game') {
      window.location.hash = 'game';
    } else if (view === 'moments') {
      window.location.hash = 'moments';
    } else if (view === 'stadiums') {
      window.location.hash = 'stadiums';
    } else if (view === 'timeline') {
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

  if (currentView === 'auction') {
    return (
      <AuctionPage
        onNavigateView={handleNavigateView}
        isPlayingAudio={isPlaying}
        onToggleAudio={toggleAmbience}
        onPlayTone={playWillowTone}
      />
    );
  }

  if (currentView === 'game') {
    return (
      <CardGamePage
        onNavigateView={handleNavigateView}
        isPlayingAudio={isPlaying}
        onToggleAudio={toggleAmbience}
        onPlayTone={playWillowTone}
      />
    );
  }

  if (currentView === 'moments') {
    return (
      <MomentsPage
        onNavigateView={handleNavigateView}
        isPlayingAudio={isPlaying}
        onToggleAudio={toggleAmbience}
        onPlayTone={playWillowTone}
        initialSelectedMomentId={selectedMomentId}
      />
    );
  }

  if (currentView === 'stadiums') {
    return (
      <StadiumsPage
        onNavigateView={handleNavigateView}
        isPlayingAudio={isPlaying}
        onToggleAudio={toggleAmbience}
        onPlayTone={playWillowTone}
        initialSelectedStadiumId={selectedStadiumId}
      />
    );
  }

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

