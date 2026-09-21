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
import { useCricketAmbience } from '../hooks/useCricketAmbience';
import type { UniverseItem } from '../types';
import { UNIVERSE_SECTIONS } from '../data/universeData';

export const LandingPage: React.FC = () => {
  const { isPlaying, toggleAmbience, playWillowTone } = useCricketAmbience();
  const [selectedItem, setSelectedItem] = useState<UniverseItem | null>(null);

  const handleEnterUniverse = () => {
    const universeEl = document.querySelector('#universe');
    if (universeEl) {
      universeEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (categoryId: string) => {
    const found = UNIVERSE_SECTIONS.find((item) => item.id === categoryId);
    if (found) {
      setSelectedItem(found);
      playWillowTone();
    }
  };

  return (
    <div className="relative min-h-screen bg-[#060709] text-zinc-100 overflow-x-hidden selection:bg-amber-400/30 selection:text-amber-200">
      {/* Interactive Background Particle & Lighting Layer */}
      <CricketAtmosphericBackground />

      {/* Main App Bar Navigation */}
      <Navbar
        isPlayingAudio={isPlaying}
        onToggleAudio={toggleAmbience}
        onSelectCategory={handleSelectCategory}
      />

      {/* Main Cinematic Scroll Flow */}
      <main className="relative z-10">
        {/* 1. Hero Experience */}
        <HeroSection
          onEnterUniverse={handleEnterUniverse}
          onPlayTone={playWillowTone}
        />

        {/* 2. Curated Manifesto Numbers */}
        <CuratedStatsSection />

        {/* 3. Universe Preview ("ONE GAME. INFINITE STORIES.") */}
        <UniversePreviewSection
          onSelectItem={(item) => {
            setSelectedItem(item);
            playWillowTone();
          }}
          onPlayTone={playWillowTone}
        />

        {/* 4. Sensory Atmosphere Exhibition */}
        <SensoryAtmosphereSection onPlayTone={playWillowTone} />

        {/* 5. Climax Call to Action */}
        <CallToActionSection
          onEnterUniverse={handleEnterUniverse}
          onPlayTone={playWillowTone}
        />
      </main>

      {/* Footer */}
      <Footer onSelectCategory={handleSelectCategory} />

      {/* Interactive Realm Deep Dive Modal */}
      <UniverseModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};
