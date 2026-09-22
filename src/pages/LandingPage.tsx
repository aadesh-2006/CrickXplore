import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { UniverseModal } from '../components/UniverseModal';
import { CricketAtmosphericBackground } from '../components/CricketAtmosphericBackground';
import { HeroSection } from '../sections/HeroSection';
import { UniversePreviewSection } from '../sections/UniversePreviewSection';
import { SensoryAtmosphereSection } from '../sections/SensoryAtmosphereSection';
import { CuratedStatsSection } from '../sections/CuratedStatsSection';
import { CallToActionSection } from '../sections/CallToActionSection';
import type { UniverseItem } from '../types';
import type { AppView } from '../App';
import { UNIVERSE_SECTIONS } from '../data/universeData';

interface LandingPageProps {
  onNavigateView: (
    view: AppView,
    playerId?: string,
    cardId?: string,
    momentId?: string,
    stadiumId?: string
  ) => void;
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
  onPlayTone: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigateView,
  isPlayingAudio,
  onToggleAudio,
  onPlayTone,
}) => {
  const [selectedItem, setSelectedItem] = useState<UniverseItem | null>(null);

  const handleEnterUniverse = () => {
    const universeEl = document.querySelector('#universe');
    if (universeEl) {
      universeEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (categoryId: string) => {
    if (categoryId === 'moments') {
      onNavigateView('moments');
      return;
    }
    if (categoryId === 'stadiums') {
      onNavigateView('stadiums');
      return;
    }
    if (categoryId === 'timeline') {
      onNavigateView('timeline');
      return;
    }
    if (categoryId === 'players') {
      onNavigateView('players');
      return;
    }
    if (categoryId === 'cards') {
      onNavigateView('collection');
      return;
    }
    if (categoryId === 'card-game') {
      onNavigateView('game');
      return;
    }
    const found = UNIVERSE_SECTIONS.find((item) => item.id === categoryId);
    if (found) {
      setSelectedItem(found);
      onPlayTone();
    }
  };

  return (
    <div className="relative min-h-screen bg-[#060709] text-zinc-100 overflow-x-hidden selection:bg-amber-400/30 selection:text-amber-200">
      {/* Interactive Background Particle & Lighting Layer */}
      <CricketAtmosphericBackground />

      {/* Main App Bar Navigation */}
      <Navbar
        currentView="home"
        onNavigateView={onNavigateView}
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={onToggleAudio}
        onSelectCategory={handleSelectCategory}
      />

      {/* Main Cinematic Scroll Flow */}
      <main className="relative z-10">
        {/* 1. Hero Experience */}
        <HeroSection
          onEnterUniverse={handleEnterUniverse}
          onPlayTone={onPlayTone}
        />

        {/* 2. Curated Manifesto Numbers */}
        <CuratedStatsSection />

        {/* 3. Universe Preview ("ONE GAME. INFINITE STORIES.") */}
        <UniversePreviewSection
          onSelectItem={(item) => {
            if (item.id === 'moments') {
              onNavigateView('moments');
            } else if (item.id === 'stadiums') {
              onNavigateView('stadiums');
            } else if (item.id === 'timeline') {
              onNavigateView('timeline');
            } else if (item.id === 'players') {
              onNavigateView('players');
            } else if (item.id === 'cards') {
              onNavigateView('collection');
            } else if (item.id === 'card-game') {
              onNavigateView('game');
            } else {
              setSelectedItem(item);
              onPlayTone();
            }
          }}
          onPlayTone={onPlayTone}
        />

        {/* 4. Sensory Atmosphere Exhibition */}
        <SensoryAtmosphereSection onPlayTone={onPlayTone} />

        {/* 5. Climax Call to Action */}
        <CallToActionSection
          onEnterUniverse={handleEnterUniverse}
          onPlayTone={onPlayTone}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigateView={onNavigateView}
        onSelectCategory={handleSelectCategory}
      />

      {/* Interactive Realm Deep Dive Modal */}
      <UniverseModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onLaunchExplorer={(targetId) => {
          if (targetId === 'moments') {
            onNavigateView('moments');
          } else if (targetId === 'stadiums') {
            onNavigateView('stadiums');
          } else if (targetId === 'timeline') {
            onNavigateView('timeline');
          } else if (targetId === 'cards') {
            onNavigateView('collection');
          } else if (targetId === 'card-game') {
            onNavigateView('game');
          } else {
            onNavigateView('players');
          }
        }}
      />
    </div>
  );
};
