import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  MapPin,
  Landmark,
  Users,
  Trophy,
  History,
  Volume2,
  Calendar,
  Layers,
  Flame,
} from 'lucide-react';
import type { CricketStadium } from '../../types/stadium';
import {
  getMomentsForStadium,
  getPlayersByIds,
} from '../../utils/universeRelations';

interface StadiumModalProps {
  stadium: CricketStadium | null;
  onClose: () => void;
  onExploreMoment: (momentId: string) => void;
  onExplorePlayer: (playerId: string) => void;
  onExploreTimeline: () => void;
}

export const StadiumModal: React.FC<StadiumModalProps> = ({
  stadium,
  onClose,
  onExploreMoment,
  onExplorePlayer,
  onExploreTimeline,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!stadium) return null;

  const hostedMoments = getMomentsForStadium(stadium.id);
  const resolvedPlayers = getPlayersByIds(stadium.notablePlayerIds);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-xl transition-opacity"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-[#090b10] border border-white/15 rounded-3xl shadow-2xl shadow-black/90 overflow-hidden z-10 max-h-[92vh] flex flex-col"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-emerald-500/15 via-teal-500/5 to-transparent pointer-events-none" />

          {/* Modal Header Bar */}
          <div className="relative z-10 px-6 sm:px-8 pt-6 pb-4 border-b border-white/[0.08] flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-tech font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {stadium.countryCode} • {stadium.country}
                </span>
                <span className="text-xs text-zinc-400 font-tech flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-zinc-500" />
                  Established {stadium.establishedYear}
                </span>
                <span className="text-xs text-zinc-400 font-tech flex items-center gap-1">
                  <Users className="w-3 h-3 text-zinc-500" />
                  {stadium.capacity.toLocaleString()} Seats
                </span>
                {stadium.acousticProfile && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-tech text-amber-300 bg-amber-500/10 border border-amber-500/20 flex items-center gap-1 hidden sm:inline-flex">
                    <Volume2 className="w-3 h-3 text-amber-400" />
                    {stadium.acousticProfile.split('—')[0].trim()}
                  </span>
                )}
              </div>

              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white leading-tight">
                {stadium.name}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-300/90 font-medium flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {stadium.city}, {stadium.country} • GPS: {stadium.coordinates.lat.toFixed(2)}°N, {stadium.coordinates.lng.toFixed(2)}°E
                </span>
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="relative z-10 px-6 sm:px-8 py-6 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
            {/* Overview */}
            <p className="text-zinc-200 text-sm sm:text-base leading-relaxed font-light">
              {stadium.description}
            </p>

            {/* Colosseum Architecture & Character */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/[0.06] space-y-2">
              <div className="text-[10px] font-tech uppercase tracking-[0.2em] text-emerald-400 font-bold flex items-center gap-1.5">
                <Landmark className="w-3.5 h-3.5 text-emerald-400" />
                <span>Architecture & Colosseum Blueprint</span>
              </div>
              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-sans">
                {stadium.architecturalNotes}
              </p>
            </div>

            {/* Pitch Character & Geology */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/20 via-black to-teal-950/20 border border-emerald-500/20 space-y-2">
              <div className="text-[10px] font-tech uppercase tracking-[0.2em] text-teal-400 font-bold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-teal-400" />
                <span>Pitch Geology & Atmospheric Character</span>
              </div>
              <p className="text-white text-xs sm:text-sm leading-relaxed font-sans">
                {stadium.pitchCharacter}
              </p>
            </div>

            {/* Landmark Historical Achievements */}
            <div className="space-y-3">
              <h4 className="text-xs font-tech uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Landmark Stadium Lore</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {stadium.famousFor.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs text-zinc-300 flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ======================================================== */}
            {/* CROSS-UNIVERSE LINKS */}
            {/* ======================================================== */}
            <div className="pt-4 border-t border-white/[0.08] space-y-4">
              <h4 className="text-xs font-tech uppercase tracking-[0.2em] text-zinc-400">
                Connected Moments & Titans
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Hosted Famous Moments */}
                {hostedMoments.map((moment) => (
                  <div
                    key={moment.id}
                    className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/20 hover:border-rose-400/50 transition-all flex items-center justify-between gap-3 group"
                  >
                    <div className="truncate">
                      <span className="text-[10px] uppercase font-tech text-rose-400 block mb-0.5">
                        {moment.year} Landmark Moment
                      </span>
                      <div className="text-xs font-bold text-white group-hover:text-rose-300 transition-colors truncate">
                        {moment.title}
                      </div>
                      <div className="text-[10px] text-zinc-400 font-tech">
                        {moment.format} • {moment.category}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onExploreMoment(moment.id);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-[11px] font-bold tracking-wider font-tech flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <Flame className="w-3 h-3" />
                      <span>MOMENT</span>
                    </button>
                  </div>
                ))}

                {/* Notable Players */}
                {resolvedPlayers.map((player) => (
                  <div
                    key={player.id}
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-amber-400/40 transition-all flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <img
                        src={player.imageUrl}
                        alt={player.name}
                        className="w-9 h-9 rounded-full object-cover border border-white/20 shrink-0"
                      />
                      <div className="truncate">
                        <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                          {player.name}
                        </div>
                        <div className="text-[10px] text-zinc-400 font-tech truncate">
                          {player.country} • {player.role?.toUpperCase()}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onExplorePlayer(player.id);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-[11px] font-bold tracking-wider font-tech flex items-center gap-1 cursor-pointer shrink-0 shadow-md"
                    >
                      <Users className="w-3 h-3" />
                      <span>EXPLORE</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="relative z-10 px-6 sm:px-8 py-4 bg-black/50 border-t border-white/[0.08] flex items-center justify-between">
            <button
              onClick={() => {
                onClose();
                onExploreTimeline();
              }}
              className="text-xs font-tech text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
            >
              <History className="w-3.5 h-3.5" />
              <span>View in Global Timeline →</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wider transition-colors cursor-pointer"
            >
              Close Atlas
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
