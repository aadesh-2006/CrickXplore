import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CricketAtmosphericBackground } from '../components/CricketAtmosphericBackground';
import { TimelineHero } from '../components/timeline/TimelineHero';
import { EraSelector } from '../components/timeline/EraSelector';
import { Timeline } from '../components/timeline/Timeline';
import { FormatEvolution } from '../components/timeline/FormatEvolution';
import { HistoryStats } from '../components/timeline/HistoryStats';
import { MomentsTeaser } from '../components/timeline/MomentsTeaser';
import { TimelineEventModal } from '../components/timeline/TimelineEventModal';
import { TIMELINE_ERAS } from '../data/timeline/eras';
import { TIMELINE_EVENTS } from '../data/timeline/events';
import type { TimelineEvent, EraId } from '../types/timeline';

interface TimelinePageProps {
  onNavigateView: (view: 'home' | 'players' | 'collection' | 'timeline', playerId?: string, cardId?: string) => void;
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
  onPlayTone: () => void;
}

export const TimelinePage: React.FC<TimelinePageProps> = ({
  onNavigateView,
  isPlayingAudio,
  onToggleAudio,
  onPlayTone,
}) => {
  const [selectedEraId, setSelectedEraId] = useState<EraId | 'ALL'>('1970s');
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  // Derive current era object for hero styling (default to 1970s if ALL is chosen)
  const currentEra =
    selectedEraId === 'ALL'
      ? TIMELINE_ERAS[0]
      : TIMELINE_ERAS.find((e) => e.id === selectedEraId) || TIMELINE_ERAS[0];

  const handleSelectEra = (eraId: EraId | 'ALL') => {
    setSelectedEraId(eraId);
    onPlayTone();
  };

  const handleSelectEvent = (event: TimelineEvent) => {
    setSelectedEvent(event);
    onPlayTone();
  };

  const handleScrollToTimeline = () => {
    onPlayTone();
    const element = document.getElementById('timeline-chronicles');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#060709] text-white selection:bg-amber-400 selection:text-black relative">
      {/* Dynamic Ambient Background */}
      <CricketAtmosphericBackground />

      {/* Navigation */}
      <Navbar
        currentView="timeline"
        onNavigateView={onNavigateView}
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={onToggleAudio}
      />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Timeline Hero */}
        <TimelineHero
          currentEra={currentEra}
          onExploreClick={handleScrollToTimeline}
          totalEventsCount={TIMELINE_EVENTS.length}
        />

        {/* Dynamic Scale / History Stats Strip */}
        <HistoryStats eras={TIMELINE_ERAS} events={TIMELINE_EVENTS} />

        {/* Era Selector Ribbon & Lore Banner */}
        <div className="pt-12">
          <EraSelector
            eras={TIMELINE_ERAS}
            selectedEraId={selectedEraId}
            onSelectEra={handleSelectEra}
          />
        </div>

        {/* The Spatial / Chronological Timeline */}
        <Timeline
          events={TIMELINE_EVENTS}
          selectedEraId={selectedEraId}
          onSelectEra={handleSelectEra}
          onSelectEvent={handleSelectEvent}
        />

        {/* Format Evolution Exhibition */}
        <FormatEvolution />

        {/* Future Moments Teaser */}
        <MomentsTeaser />
      </main>

      {/* Event Details Inspection Modal */}
      <TimelineEventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onExplorePlayer={(playerId) => onNavigateView('players', playerId)}
        onExploreCollection={(cardId) => onNavigateView('collection', undefined, cardId)}
      />

      {/* Footer */}
      <Footer onNavigateView={onNavigateView} />
    </div>
  );
};
