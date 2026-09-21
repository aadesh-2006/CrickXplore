import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Search, X, SlidersHorizontal, AlertCircle } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CricketAtmosphericBackground } from '../components/CricketAtmosphericBackground';
import { MomentCard } from '../components/moments/MomentCard';
import { MomentModal } from '../components/moments/MomentModal';
import { CRICKET_MOMENTS } from '../data/moments/moments';
import type { CricketMoment, MomentCategory } from '../types/moment';
import type { CricketFormat, EraId } from '../types/timeline';
import type { AppView } from '../App';

interface MomentsPageProps {
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
  initialSelectedMomentId?: string;
}

export const MomentsPage: React.FC<MomentsPageProps> = ({
  onNavigateView,
  isPlayingAudio,
  onToggleAudio,
  onPlayTone,
  initialSelectedMomentId,
}) => {
  const [selectedMoment, setSelectedMoment] = useState<CricketMoment | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<'ALL' | CricketFormat>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | MomentCategory>('ALL');
  const [selectedEra, setSelectedEra] = useState<'ALL' | EraId>('ALL');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // If initial moment ID provided, open modal
  useEffect(() => {
    if (initialSelectedMomentId) {
      const match = CRICKET_MOMENTS.find((m) => m.id === initialSelectedMomentId);
      if (match) {
        setSelectedMoment(match);
      }
    }
  }, [initialSelectedMomentId]);

  // Filtered Moments Logic
  const filteredMoments = useMemo(() => {
    return CRICKET_MOMENTS.filter((moment) => {
      // Format Filter
      if (selectedFormat !== 'ALL' && moment.format !== selectedFormat) {
        return false;
      }
      // Category Filter
      if (selectedCategory !== 'ALL' && moment.category !== selectedCategory) {
        return false;
      }
      // Era Filter
      if (selectedEra !== 'ALL' && moment.eraId !== selectedEra) {
        return false;
      }
      // Search Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = moment.title.toLowerCase().includes(q);
        const matchesSubtitle = moment.subtitle?.toLowerCase().includes(q);
        const matchesDesc = moment.shortDescription.toLowerCase().includes(q);
        const matchesVenue = moment.venue.toLowerCase().includes(q);
        const matchesLocation = moment.location.toLowerCase().includes(q);
        const matchesTeams = moment.teams?.some((t) => t.toLowerCase().includes(q));
        const matchesPlayers = moment.players?.some((p) => p.toLowerCase().includes(q));
        const matchesTags = moment.tags.some((t) => t.toLowerCase().includes(q));
        const matchesYear = moment.year.toString().includes(q);

        if (
          !matchesTitle &&
          !matchesSubtitle &&
          !matchesDesc &&
          !matchesVenue &&
          !matchesLocation &&
          !matchesTeams &&
          !matchesPlayers &&
          !matchesTags &&
          !matchesYear
        ) {
          return false;
        }
      }
      return true;
    });
  }, [selectedFormat, selectedCategory, selectedEra, searchQuery]);

  const handleMomentClick = (moment: CricketMoment) => {
    setSelectedMoment(moment);
    onPlayTone();
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedFormat('ALL');
    setSelectedCategory('ALL');
    setSelectedEra('ALL');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedFormat !== 'ALL' ||
    selectedCategory !== 'ALL' ||
    selectedEra !== 'ALL';

  return (
    <div className="min-h-screen bg-[#060709] text-white selection:bg-amber-400 selection:text-black relative">
      {/* Dynamic Ambient Background */}
      <CricketAtmosphericBackground />

      {/* Navigation */}
      <Navbar
        currentView="moments"
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-tech uppercase tracking-[0.25em]"
          >
            <Flame className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>LIVING MEMORY • THE MOMENT ARCHIVE</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.05]"
          >
            Some Matches Are Remembered.<br />
            Some Moments Become{' '}
            <span className="bg-gradient-to-r from-rose-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              Cricket.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light"
          >
            A curated documentary archive of the emotional high-water marks, impossible last-over
            clashes, and single deliveries that shaped cricket folklore.
          </motion.p>
        </section>

        {/* Filter and Search Bar */}
        <section className="mb-12 p-4 sm:p-5 rounded-2xl bg-[#090b10]/90 border border-white/10 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Box */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search moments, players, venues, World Cups..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-rose-400/60 text-white text-xs font-sans placeholder:text-zinc-500 outline-none transition-colors"
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

            {/* Quick Format Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto justify-start md:justify-end">
              <span className="text-[10px] uppercase font-tech text-zinc-400 mr-1 hidden sm:inline">
                Format:
              </span>
              {(['ALL', 'Test', 'ODI', 'T20I'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setSelectedFormat(fmt)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-tech tracking-wider uppercase transition-all cursor-pointer ${
                    selectedFormat === fmt
                      ? 'bg-amber-400 text-black font-bold shadow-md'
                      : 'bg-white/[0.03] text-zinc-300 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]'
                  }`}
                >
                  {fmt}
                </button>
              ))}

              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`px-3 py-1.5 rounded-lg text-xs font-tech tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer border ${
                  showAdvancedFilters || selectedCategory !== 'ALL' || selectedEra !== 'ALL'
                    ? 'bg-white/10 text-rose-300 border-rose-400/40'
                    : 'bg-white/[0.03] text-zinc-300 hover:text-white border border-white/[0.06]'
                }`}
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>Categories</span>
              </button>
            </div>
          </div>

          {/* Expandable Category Drawer */}
          {showAdvancedFilters && (
            <div className="pt-4 mt-4 border-t border-white/[0.08] space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase font-tech text-zinc-400 w-full mb-0.5">
                  Category:
                </span>
                {(
                  [
                    'ALL',
                    'FINAL',
                    'WORLD_CUP',
                    'COMEBACK',
                    'UPSET',
                    'LAST_BALL',
                    'RECORD',
                    'INDIVIDUAL',
                  ] as const
                ).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-md text-[11px] font-tech uppercase tracking-wider transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-rose-500 text-white font-bold'
                        : 'bg-white/[0.02] text-zinc-400 hover:text-zinc-200 border border-white/[0.05]'
                    }`}
                  >
                    {cat.replace('_', ' ')}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/[0.04]">
                <span className="text-[10px] uppercase font-tech text-zinc-400 w-full mb-0.5">
                  Decade Era:
                </span>
                {(['ALL', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s'] as const).map(
                  (era) => (
                    <button
                      key={era}
                      onClick={() => setSelectedEra(era)}
                      className={`px-3 py-1 rounded-md text-[11px] font-tech uppercase tracking-wider transition-all cursor-pointer ${
                        selectedEra === era
                          ? 'bg-amber-400 text-black font-bold'
                          : 'bg-white/[0.02] text-zinc-400 hover:text-zinc-200 border border-white/[0.05]'
                      }`}
                    >
                      {era}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* Result Counts Strip */}
          <div className="mt-3 pt-3 border-t border-white/[0.05] flex items-center justify-between text-xs text-zinc-400">
            <div>
              Catalogued <span className="text-amber-300 font-bold">{filteredMoments.length}</span> of{' '}
              <span>{CRICKET_MOMENTS.length}</span> legendary moments
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-amber-400 hover:text-amber-300 underline text-xs cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        </section>

        {/* Moments Cards Grid */}
        {filteredMoments.length > 0 ? (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMoments.map((moment, idx) => (
              <MomentCard
                key={moment.id}
                moment={moment}
                onClick={() => handleMomentClick(moment)}
                index={idx}
              />
            ))}
          </section>
        ) : (
          <section className="text-center py-20 px-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] space-y-4 max-w-md mx-auto">
            <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" />
            <h3 className="text-xl font-serif-luxury font-bold text-white">
              No Moments Match Query
            </h3>
            <p className="text-xs text-zinc-400 font-light">
              Try searching by player, venue, or resetting active category filters.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-2.5 rounded-full bg-amber-400 text-black font-semibold text-xs tracking-wider cursor-pointer uppercase font-tech"
            >
              Reset Filters
            </button>
          </section>
        )}
      </main>

      {/* Moment Detailed Documentary Modal */}
      <MomentModal
        moment={selectedMoment}
        onClose={() => setSelectedMoment(null)}
        onExplorePlayer={(playerId) => onNavigateView('players', playerId)}
        onExploreStadium={(stadiumId) => onNavigateView('stadiums', undefined, undefined, undefined, stadiumId)}
        onExploreTimeline={() => onNavigateView('timeline')}
        onExploreCollection={(cardId) => onNavigateView('collection', undefined, cardId)}
      />

      {/* Footer */}
      <Footer onNavigateView={onNavigateView} />
    </div>
  );
};
