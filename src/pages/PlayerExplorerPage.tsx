import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserCheck,
  Sparkles,
  Swords,
  ArrowLeft,
  X,
  AlertCircle
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CricketAtmosphericBackground } from '../components/CricketAtmosphericBackground';
import { PlayerSearch } from '../components/players/PlayerSearch';
import { PlayerCard } from '../components/players/PlayerCard';
import { PlayerProfileModal } from '../components/players/PlayerProfileModal';
import { PlayerComparisonModal } from '../components/players/PlayerComparisonModal';
import { playerApi } from '../api/cricket/playerApi';
import type { NormalizedPlayer, PlayerFilterOptions } from '../types/player';
import { FALLBACK_PLAYERS } from '../data/fallbackPlayers';

interface PlayerExplorerPageProps {
  onNavigateView: (view: 'home' | 'players' | 'collection', playerId?: string) => void;
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
  onPlayTone: () => void;
  initialSelectedPlayerId?: string;
}

export const PlayerExplorerPage: React.FC<PlayerExplorerPageProps> = ({
  onNavigateView,
  isPlayingAudio,
  onToggleAudio,
  onPlayTone,
  initialSelectedPlayerId,
}) => {
  const [allPlayers, setAllPlayers] = useState<NormalizedPlayer[]>(FALLBACK_PLAYERS);
  const [isLoading, setIsLoading] = useState(false);
  const [isLiveApi, setIsLiveApi] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<NormalizedPlayer | null>(null);

  // If initialSelectedPlayerId passed, open modal
  useEffect(() => {
    if (initialSelectedPlayerId) {
      const match = allPlayers.find(p => p.id === initialSelectedPlayerId);
      if (match) {
        setSelectedPlayer(match);
      }
    }
  }, [initialSelectedPlayerId, allPlayers]);

  // Comparison State
  const [comparedPlayers, setComparedPlayers] = useState<NormalizedPlayer[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  // Filters
  const [filters, setFilters] = useState<PlayerFilterOptions>({
    searchQuery: '',
    role: 'all',
    country: 'all',
    format: 'all',
  });

  // Debounced API search
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const fetchPlayers = async () => {
      setIsLoading(true);
      try {
        const res = await playerApi.searchPlayers(filters.searchQuery);
        setAllPlayers(res.players);
        setIsLiveApi(res.isLive);
      } catch (err) {
        console.warn('Error fetching players:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (filters.searchQuery.trim().length > 0) {
      timer = setTimeout(fetchPlayers, 350); // 350ms debounce
    } else {
      playerApi.getFeaturedPlayers().then((res) => {
        setAllPlayers(res.players);
        setIsLiveApi(res.isLive);
      });
    }

    return () => clearTimeout(timer);
  }, [filters.searchQuery]);

  // Client-side filtering across discipline, country, and format
  const filteredPlayers = useMemo(() => {
    return allPlayers.filter((p) => {
      // Role filter
      if (filters.role !== 'all' && p.role !== filters.role) {
        return false;
      }
      // Country filter
      if (filters.country !== 'all' && p.country.toLowerCase() !== filters.country.toLowerCase()) {
        return false;
      }
      // Format filter
      if (filters.format !== 'all') {
        const hasFormatData = !!p.stats[filters.format];
        if (!hasFormatData && Object.keys(p.stats).length > 0) {
          return false;
        }
      }
      return true;
    });
  }, [allPlayers, filters]);

  // Toggle player into comparison queue (up to 2 players)
  const handleToggleCompare = (player: NormalizedPlayer) => {
    setComparedPlayers((prev) => {
      const exists = prev.some((p) => p.id === player.id);
      if (exists) {
        return prev.filter((p) => p.id !== player.id);
      }
      if (prev.length >= 2) {
        return [prev[0], player];
      }
      return [...prev, player];
    });
  };

  return (
    <div className="relative min-h-screen bg-[#060709] text-zinc-100 overflow-x-hidden selection:bg-amber-400/30 selection:text-amber-200">
      {/* Interactive Background Particle & Lighting Layer */}
      <CricketAtmosphericBackground />

      {/* Main Navbar */}
      <Navbar
        currentView="players"
        onNavigateView={onNavigateView}
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={onToggleAudio}
      />

      <main className="relative z-10 pt-32 pb-24 px-6 sm:px-8">
        {/* Back button & Eyebrow Navigation */}
        <div className="max-w-7xl mx-auto flex items-center justify-between mb-8">
          <button
            onClick={() => onNavigateView('home')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/30 text-xs font-tech uppercase tracking-wider text-zinc-300 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sanctuary</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-tech text-amber-300">
            <UserCheck className="w-4 h-4 text-amber-400" />
            <span>Cricket Pantheon • Registry v0.3</span>
          </div>
        </div>

        {/* Explorer Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-[11px] font-tech uppercase tracking-[0.25em] text-amber-300 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Archival Player Intelligence</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-serif-luxury font-black tracking-tight text-white mb-4"
          >
            THE{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500">
              PLAYERS.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-400 font-light max-w-2xl mx-auto"
          >
            Explore the people who shaped the game. Deconstruct career telemetry, stance genetics, and legendary match runes.
          </motion.p>
        </div>

        {/* Interactive Search Matrix */}
        <PlayerSearch
          filters={filters}
          onFilterChange={setFilters}
          isLiveApi={isLiveApi}
          totalResults={filteredPlayers.length}
          isLoading={isLoading}
        />

        {/* Player Gallery Grid */}
        <div className="max-w-7xl mx-auto">
          {filteredPlayers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPlayers.map((player) => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  onSelect={(p) => {
                    setSelectedPlayer(p);
                  }}
                  onToggleCompare={handleToggleCompare}
                  isCompared={comparedPlayers.some((p) => p.id === player.id)}
                  onPlayTone={onPlayTone}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="max-w-md mx-auto text-center py-20 px-6 rounded-3xl bg-white/[0.02] border border-white/[0.06]">
              <AlertCircle className="w-10 h-10 text-amber-400/80 mx-auto mb-4" />
              <h3 className="text-xl font-serif-luxury font-bold text-white mb-2">
                No Titans Match Your Query
              </h3>
              <p className="text-xs text-zinc-400 font-light mb-6">
                Try searching by legendary surname, different discipline, or reset active filters.
              </p>
              <button
                onClick={() =>
                  setFilters({
                    searchQuery: '',
                    role: 'all',
                    country: 'all',
                    format: 'all',
                  })
                }
                className="px-6 py-2.5 rounded-full bg-amber-400 text-black font-semibold text-xs tracking-wider cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Floating Comparison Tray */}
      <AnimatePresence>
        {comparedPlayers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 inset-x-0 z-40 flex justify-center px-4"
          >
            <div className="bg-[#0f1118]/95 border border-amber-400/40 rounded-full px-6 py-3 shadow-2xl backdrop-blur-2xl flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Swords className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-tech uppercase text-zinc-300 font-bold">
                  Comparison Matrix ({comparedPlayers.length}/2):
                </span>
              </div>

              <div className="flex items-center gap-2">
                {comparedPlayers.map((p) => (
                  <span
                    key={p.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs font-semibold text-amber-200"
                  >
                    <span>{p.name}</span>
                    <button
                      onClick={() => handleToggleCompare(p)}
                      className="hover:text-red-400 text-zinc-400"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              {comparedPlayers.length === 2 ? (
                <button
                  onClick={() => setShowComparisonModal(true)}
                  className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-400/30 hover:scale-105 transition-transform cursor-pointer"
                >
                  Launch Comparison
                </button>
              ) : (
                <span className="text-[11px] font-tech text-zinc-500 italic hidden sm:inline">
                  Select 1 more player to compare
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detailed Player Profile Modal */}
      <PlayerProfileModal
        player={selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
        onToggleCompare={handleToggleCompare}
        isCompared={selectedPlayer ? comparedPlayers.some((p) => p.id === selectedPlayer.id) : false}
        onPlayTone={onPlayTone}
      />

      {/* Player Comparison Modal */}
      {showComparisonModal && comparedPlayers.length >= 2 && (
        <PlayerComparisonModal
          playerA={comparedPlayers[0]}
          playerB={comparedPlayers[1]}
          allPlayers={allPlayers}
          onClose={() => setShowComparisonModal(false)}
          onSelectPlayerA={(p) => setComparedPlayers([p, comparedPlayers[1]])}
          onSelectPlayerB={(p) => setComparedPlayers([comparedPlayers[0], p])}
          onPlayTone={onPlayTone}
        />
      )}

      {/* Footer */}
      <Footer onNavigateView={onNavigateView} />
    </div>
  );
};
