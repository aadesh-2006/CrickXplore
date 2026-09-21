import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Plus, Check } from 'lucide-react';
import type { NormalizedPlayer } from '../../types/player';

interface PlayerCardProps {
  player: NormalizedPlayer;
  onSelect: (player: NormalizedPlayer) => void;
  onToggleCompare: (player: NormalizedPlayer) => void;
  isCompared: boolean;
  onPlayTone?: () => void;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  onSelect,
  onToggleCompare,
  isCompared,
  onPlayTone,
}) => {
  const isBowler = player.role === 'bowler';
  const testStats = player.stats.test;
  const odiStats = player.stats.odi;

  // Stat teaser calculation
  let primaryStatLabel = 'Matches';
  let primaryStatValue = '—';
  let secondaryStatLabel = isBowler ? 'Wickets' : 'Average';
  let secondaryStatValue = '—';

  if (isBowler) {
    primaryStatLabel = 'Test Wickets';
    primaryStatValue = testStats?.bowling?.wickets?.toString() ?? odiStats?.bowling?.wickets?.toString() ?? '—';
    secondaryStatLabel = 'Economy';
    secondaryStatValue = testStats?.bowling?.economy ? `${testStats.bowling.economy}` : odiStats?.bowling?.economy ? `${odiStats.bowling.economy}` : '—';
  } else {
    primaryStatLabel = 'Test Runs';
    primaryStatValue = testStats?.batting?.runs ? testStats.batting.runs.toLocaleString() : odiStats?.batting?.runs ? odiStats.batting.runs.toLocaleString() : '—';
    secondaryStatLabel = 'Average';
    secondaryStatValue = testStats?.batting?.average ? `${testStats.batting.average.toFixed(1)}` : odiStats?.batting?.average ? `${odiStats.batting.average.toFixed(1)}` : '—';
  }

  const handleCardClick = () => {
    if (onPlayTone) onPlayTone();
    onSelect(player);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPlayTone) onPlayTone();
    onToggleCompare(player);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={handleCardClick}
      className="group relative h-[380px] rounded-2xl sm:rounded-3xl p-6 flex flex-col justify-between overflow-hidden cursor-pointer bg-[#0b0c12] border border-white/[0.08] hover:border-amber-400/40 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500"
    >
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-amber-500/15 via-yellow-500/5 to-transparent rounded-full blur-2xl pointer-events-none group-hover:opacity-100 opacity-40 transition-opacity" />

      {/* Card Header: Country + Compare Toggle */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-[10px] font-tech font-bold text-amber-300">
            {player.countryCode || player.country.slice(0, 3).toUpperCase()}
          </div>
          <span className="text-xs font-tech tracking-wider text-zinc-300 uppercase">
            {player.country}
          </span>
        </div>

        {/* Compare Quick Button */}
        <button
          onClick={handleCompareClick}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-tech uppercase tracking-wider transition-all duration-300 ${
            isCompared
              ? 'bg-amber-400 text-black font-bold shadow-md shadow-amber-400/20'
              : 'bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
          }`}
          title={isCompared ? 'Remove from comparison' : 'Add to player comparison'}
        >
          {isCompared ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
          <span>{isCompared ? 'Compared' : 'Compare'}</span>
        </button>
      </div>

      {/* Card Body: Player Identity & Role */}
      <div className="relative z-10 my-auto py-2">
        <span className="text-[10px] font-tech uppercase tracking-widest text-amber-400/80 mb-1 block">
          {player.role.toUpperCase()}
        </span>

        <h3 className="text-2xl sm:text-3xl font-serif-luxury font-black text-white tracking-wide leading-tight group-hover:text-amber-200 transition-colors">
          {player.name}
        </h3>

        <div className="mt-2 text-xs text-zinc-400 font-light flex items-center gap-2">
          <span>{player.battingStyle || 'Right-hand bat'}</span>
          {player.bowlingStyle && (
            <>
              <span className="text-zinc-600">•</span>
              <span>{player.bowlingStyle}</span>
            </>
          )}
        </div>
      </div>

      {/* Card Bottom: Stat Teaser & Profile Trigger */}
      <div className="relative z-10 pt-4 border-t border-white/[0.06] flex items-center justify-between">
        {/* Stat metrics */}
        <div className="flex items-center gap-4">
          <div>
            <span className="text-[9px] font-tech uppercase tracking-wider text-zinc-500 block">
              {primaryStatLabel}
            </span>
            <span className="text-sm font-bold font-tech text-zinc-200">
              {primaryStatValue}
            </span>
          </div>

          <div className="w-[1px] h-6 bg-white/[0.08]" />

          <div>
            <span className="text-[9px] font-tech uppercase tracking-wider text-zinc-500 block">
              {secondaryStatLabel}
            </span>
            <span className="text-sm font-bold font-tech text-amber-300">
              {secondaryStatValue}
            </span>
          </div>
        </div>

        {/* Action Icon */}
        <div className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 group-hover:bg-amber-400 group-hover:border-amber-400 group-hover:text-black text-zinc-400 flex items-center justify-center transition-all duration-300 shadow-md">
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};
