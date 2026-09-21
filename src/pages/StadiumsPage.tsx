import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  Search,
  X,
  LayoutGrid,
  Map as MapIcon,
  AlertCircle,
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CricketAtmosphericBackground } from '../components/CricketAtmosphericBackground';
import { StadiumAtlas } from '../components/stadiums/StadiumAtlas';
import { StadiumCard } from '../components/stadiums/StadiumCard';
import { StadiumModal } from '../components/stadiums/StadiumModal';
import { CRICKET_STADIUMS } from '../data/stadiums/stadiums';
import type { CricketStadium, WorldRegion } from '../types/stadium';
import type { CricketFormat } from '../types/timeline';
import type { AppView } from '../App';

interface StadiumsPageProps {
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
  initialSelectedStadiumId?: string;
}

export const StadiumsPage: React.FC<StadiumsPageProps> = ({
  onNavigateView,
  isPlayingAudio,
  onToggleAudio,
  onPlayTone,
  initialSelectedStadiumId,
}) => {
  const [selectedStadium, setSelectedStadium] = useState<CricketStadium | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<WorldRegion>('ALL');
  const [selectedFormat, setSelectedFormat] = useState<'ALL' | CricketFormat>('ALL');
  const [viewMode, setViewMode] = useState<'both' | 'map' | 'grid'>('both');

  // If initial stadium ID provided, open modal
  useEffect(() => {
    if (initialSelectedStadiumId) {
      const match = CRICKET_STADIUMS.find((s) => s.id === initialSelectedStadiumId);
      if (match) {
        setSelectedStadium(match);
      }
    }
  }, [initialSelectedStadiumId]);

  // Filtered Stadiums Logic
  const filteredStadiums = useMemo(() => {
    return CRICKET_STADIUMS.filter((stadium) => {
      // Region Filter
      if (selectedRegion !== 'ALL' && stadium.region !== selectedRegion) {
        return false;
      }
      // Format Filter
      if (selectedFormat !== 'ALL' && !stadium.primaryFormats.includes(selectedFormat)) {
        return false;
      }
      // Search Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = stadium.name.toLowerCase().includes(q);
        const matchesCity = stadium.city.toLowerCase().includes(q);
        const matchesCountry = stadium.country.toLowerCase().includes(q);
        const matchesDesc = stadium.description.toLowerCase().includes(q);
        const matchesTags = stadium.tags.some((t) => t.toLowerCase().includes(q));

        if (!matchesName && !matchesCity && !matchesCountry && !matchesDesc && !matchesTags) {
          return false;
        }
      }
      return true;
    });
  }, [selectedRegion, selectedFormat, searchQuery]);

  const handleStadiumClick = (stadium: CricketStadium) => {
    setSelectedStadium(stadium);
    onPlayTone();
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedRegion('ALL');
    setSelectedFormat('ALL');
  };

  const hasActiveFilters = searchQuery !== '' || selectedRegion !== 'ALL' || selectedFormat !== 'ALL';

  return (
    <div className="min-h-screen bg-[#060709] text-white selection:bg-amber-400 selection:text-black relative">
      {/* Dynamic Ambient Background */}
      <CricketAtmosphericBackground />

      {/* Navigation */}
      <Navbar
        currentView="stadiums"
        onNavigateView={onNavigateView}
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={onToggleAudio}
      />

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Cinematic Header */}
        <section className="text-center max-w-4xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-tech uppercase tracking-[0.25em]"
          >
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>SACRED GROUNDS • THE STADIUM ATLAS</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.05]"
          >
            Where Cricket Becomes{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
              Geography.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light"
          >
            From the morning mist and 2.5m slope of Lord’s to the 100,000-strong thunder of the MCG
            and Ahmedabad. Explore the pitch geology, architecture, and acoustics of the world’s
            greatest cricket cathedrals.
          </motion.p>
        </section>

        {/* Filter and Search Bar */}
        <section className="mb-10 p-4 sm:p-5 rounded-2xl bg-[#090b10]/90 border border-white/10 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Box */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stadiums, cities, countries..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-emerald-400/60 text-white text-xs font-sans placeholder:text-zinc-500 outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Format & View Controls */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
              <div className="flex items-center gap-1 bg-white/[0.02] border border-white/[0.06] rounded-xl p-1">
                {(['ALL', 'Test', 'ODI', 'T20I'] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setSelectedFormat(fmt)}
                    className={`px-3 py-1 rounded-lg text-xs font-tech tracking-wider uppercase transition-all cursor-pointer ${
                      selectedFormat === fmt
                        ? 'bg-emerald-400 text-black font-bold shadow-md'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-white/[0.02] border border-white/[0.06] rounded-xl p-1">
                <button
                  onClick={() => setViewMode('both')}
                  className={`p-1.5 rounded-lg text-xs font-tech tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1 ${
                    viewMode === 'both' ? 'bg-white/15 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                  title="Atlas & Grid View"
                >
                  <MapIcon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Atlas</span>
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg text-xs font-tech tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1 ${
                    viewMode === 'grid' ? 'bg-white/15 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                  title="Grid View Only"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Colosseums</span>
                </button>
              </div>
            </div>
          </div>

          {/* Result Counts Strip */}
          <div className="mt-3 pt-3 border-t border-white/[0.05] flex items-center justify-between text-xs text-zinc-400">
            <div>
              Mapped <span className="text-emerald-300 font-bold">{filteredStadiums.length}</span> of{' '}
              <span>{CRICKET_STADIUMS.length}</span> sacred grounds
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-emerald-400 hover:text-emerald-300 underline text-xs cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        </section>

        {/* 1. Geographic Interactive Atlas Radar */}
        {viewMode !== 'grid' && (
          <StadiumAtlas
            stadiums={filteredStadiums}
            selectedRegion={selectedRegion}
            onSelectRegion={setSelectedRegion}
            onSelectStadium={handleStadiumClick}
          />
        )}

        {/* 2. Colosseum Cards Grid */}
        {filteredStadiums.length > 0 ? (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStadiums.map((stadium, idx) => (
              <StadiumCard
                key={stadium.id}
                stadium={stadium}
                onClick={() => handleStadiumClick(stadium)}
                index={idx}
              />
            ))}
          </section>
        ) : (
          <section className="text-center py-20 px-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] space-y-4 max-w-md mx-auto">
            <AlertCircle className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-xl font-serif-luxury font-bold text-white">
              No Arenas Match Query
            </h3>
            <p className="text-xs text-zinc-400 font-light">
              Try adjusting your geographic region or search query.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-2.5 rounded-full bg-emerald-400 text-black font-semibold text-xs tracking-wider cursor-pointer uppercase font-tech"
            >
              Reset Filters
            </button>
          </section>
        )}
      </main>

      {/* Stadium Detailed Inspection Modal */}
      <StadiumModal
        stadium={selectedStadium}
        onClose={() => setSelectedStadium(null)}
        onExploreMoment={(momentId) => onNavigateView('moments', undefined, undefined, momentId)}
        onExplorePlayer={(playerId) => onNavigateView('players', playerId)}
        onExploreTimeline={() => onNavigateView('timeline')}
      />

      {/* Footer */}
      <Footer onNavigateView={onNavigateView} />
    </div>
  );
};
