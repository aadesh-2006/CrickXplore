import React from 'react';
import { motion } from 'framer-motion';
import type { GameCard, GameCategoryDefinition } from '../../game/types';
import { Crown, Sparkles, TrendingUp, TrendingDown, Swords } from 'lucide-react';

interface GameCardViewProps {
  card: GameCard;
  isController?: boolean;
  isSelected?: boolean;
  isWinner?: boolean;
  isLoser?: boolean;
  isTie?: boolean;
  isCardBack?: boolean;
  highlightCategory?: GameCategoryDefinition | null;
  onClick?: () => void;
  disabled?: boolean;
  compact?: boolean;
  showAllStats?: boolean;
}

const roleColors: Record<string, { bg: string; text: string; border: string }> = {
  batter: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
  bowler: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  'all-rounder': { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
  'wicket-keeper': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
};

export const GameCardView: React.FC<GameCardViewProps> = ({
  card,
  isController = false,
  isSelected = false,
  isWinner = false,
  isLoser = false,
  isTie = false,
  isCardBack = false,
  highlightCategory = null,
  onClick,
  disabled = false,
  compact = false,
  showAllStats = false,
}) => {
  const roleStyle = roleColors[card.role] || roleColors.batter;

  // Face-down card back rendering
  if (isCardBack) {
    return (
      <div
        className={`relative rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950/40 border border-amber-500/30 shadow-xl overflow-hidden flex flex-col items-center justify-center select-none ${
          compact ? 'p-3 w-44 h-64' : 'p-4 w-60 sm:w-64 h-84'
        }`}
      >
        <div className="absolute inset-2 border border-amber-400/20 rounded-xl flex flex-col items-center justify-center p-3 text-center">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-400/40 flex items-center justify-center mb-2 shadow-inner">
            <Swords className="w-6 h-6 text-amber-400" />
          </div>
          <div className="text-xs font-black text-amber-300 uppercase tracking-widest font-serif-luxury">
            CRICKXPLORE
          </div>
          <div className="text-[9px] text-slate-500 uppercase tracking-wider mt-1">
            SECRET CARD
          </div>
        </div>
      </div>
    );
  }

  let borderColor = 'border-white/10 hover:border-emerald-500/40';
  let shadowGlow = 'shadow-lg';

  if (isSelected) {
    borderColor = 'border-emerald-400 ring-2 ring-emerald-400/60';
    shadowGlow = 'shadow-[0_0_25px_rgba(16,185,129,0.45)]';
  } else if (isWinner) {
    borderColor = 'border-amber-400 ring-2 ring-amber-400/70';
    shadowGlow = 'shadow-[0_0_30px_rgba(251,191,36,0.55)]';
  } else if (isLoser) {
    borderColor = 'border-rose-500/40 opacity-70';
  } else if (isTie) {
    borderColor = 'border-cyan-400 ring-2 ring-cyan-400/50';
    shadowGlow = 'shadow-[0_0_20px_rgba(34,211,238,0.35)]';
  }

  const highlightedValue = highlightCategory ? highlightCategory.getValue(card) : null;
  const isStatAvailable =
    highlightedValue !== null && highlightedValue !== undefined && !Number.isNaN(highlightedValue);

  return (
    <motion.div
      whileHover={disabled ? {} : { y: -4, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      onClick={disabled ? undefined : onClick}
      className={`relative rounded-2xl bg-gradient-to-b from-slate-900/95 via-slate-950/98 to-slate-900/95 border ${borderColor} ${shadowGlow} transition-all duration-300 backdrop-blur-md overflow-hidden flex flex-col select-none ${
        disabled
          ? 'cursor-not-allowed opacity-60'
          : onClick
          ? 'cursor-pointer hover:shadow-2xl'
          : ''
      } ${compact ? 'p-3 w-44' : 'p-4 w-60 sm:w-64'}`}
    >
      {/* Subtle Holographic Sheen Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] via-amber-400/[0.03] to-transparent pointer-events-none" />

      {/* Top Banner with Badges */}
      <div className="flex items-center justify-between gap-1 mb-2 relative z-10">
        <span
          className={`text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full border ${roleStyle.bg} ${roleStyle.text} ${roleStyle.border}`}
        >
          {card.role}
        </span>

        {isController && (
          <span className="flex items-center gap-1 text-[10px] font-black text-amber-300 bg-amber-500/20 border border-amber-400/40 px-2 py-0.5 rounded-full shadow-sm animate-pulse">
            <Crown className="w-3 h-3 text-amber-400" /> LEADER
          </span>
        )}

        <span className="text-[10px] font-bold text-slate-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
          {card.countryCode}
        </span>
      </div>

      {/* Card Artwork / Image Frame */}
      <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-800 border border-white/10 mb-3 group shadow-inner">
        <img
          src={card.imageUrl}
          alt={card.playerName}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />

        {/* Player Identity Overlay */}
        <div className="absolute bottom-2 left-2 right-2">
          <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider truncate">
            {card.country}
          </div>
          <div className="text-sm sm:text-base font-black text-white truncate drop-shadow-md">
            {card.playerName}
          </div>
        </div>

        {/* Status Callout Badges */}
        {isWinner && (
          <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 text-xs font-black px-2 py-0.5 rounded-md shadow-lg flex items-center gap-1 animate-bounce">
            <Sparkles className="w-3 h-3" /> VICTORY
          </div>
        )}
        {isLoser && (
          <div className="absolute top-2 right-2 bg-rose-950/90 text-rose-300 text-xs font-bold px-2 py-0.5 rounded-md border border-rose-500/40">
            DEFEATED
          </div>
        )}
        {isTie && (
          <div className="absolute top-2 right-2 bg-cyan-500 text-slate-950 text-xs font-black px-2 py-0.5 rounded-md shadow-lg">
            TIED
          </div>
        )}
      </div>

      {/* Active Highlight Category Stat */}
      {highlightCategory && (
        <div
          className={`mb-2 p-2 rounded-xl text-center border relative z-10 transition-colors ${
            isStatAvailable
              ? 'bg-gradient-to-b from-emerald-500/15 to-emerald-950/30 border-emerald-400/40 shadow-inner'
              : 'bg-rose-500/10 border-rose-500/30'
          }`}
        >
          <div className="text-[10px] uppercase font-bold text-slate-300 tracking-wider truncate">
            {highlightCategory.label}
          </div>
          <div
            className={`font-black mt-0.5 ${
              isStatAvailable ? 'text-lg text-emerald-300 drop-shadow-sm' : 'text-xs text-rose-400 py-1 font-semibold'
            }`}
          >
            {isStatAvailable ? highlightCategory.formatValue(highlightedValue) : 'Stat Unavailable'}
          </div>
          <div className="text-[9px] text-slate-400 flex items-center justify-center gap-1">
            {highlightCategory.direction === 'HIGHER_IS_BETTER' ? (
              <>
                <TrendingUp className="w-2.5 h-2.5 text-emerald-400" /> Higher is better
              </>
            ) : (
              <>
                <TrendingDown className="w-2.5 h-2.5 text-indigo-400" /> Lower is better
              </>
            )}
          </div>
        </div>
      )}

      {/* Compact Stat Summary Grid */}
      {!highlightCategory && (
        <div className="grid grid-cols-2 gap-1.5 text-center mt-auto text-xs relative z-10">
          <div className="p-1.5 rounded-lg bg-white/5 border border-white/5">
            <div className="text-[9px] text-slate-400 uppercase font-medium">Test Runs</div>
            <div className="font-bold text-white">
              {card.stats.test?.batting?.runs?.toLocaleString() ?? '—'}
            </div>
          </div>
          <div className="p-1.5 rounded-lg bg-white/5 border border-white/5">
            <div className="text-[9px] text-slate-400 uppercase font-medium">Test Wkts</div>
            <div className="font-bold text-white">
              {card.stats.test?.bowling?.wickets ?? '—'}
            </div>
          </div>
          <div className="p-1.5 rounded-lg bg-white/5 border border-white/5">
            <div className="text-[9px] text-slate-400 uppercase font-medium">ODI Avg</div>
            <div className="font-bold text-white">
              {card.stats.odi?.batting?.average?.toFixed(1) ?? '—'}
            </div>
          </div>
          <div className="p-1.5 rounded-lg bg-white/5 border border-white/5">
            <div className="text-[9px] text-slate-400 uppercase font-medium">T20I SR</div>
            <div className="font-bold text-white">
              {card.stats.t20i?.batting?.strikeRate?.toFixed(1) ?? '—'}
            </div>
          </div>
        </div>
      )}

      {/* Expanded Stats Drawer if requested */}
      {showAllStats && (
        <div className="mt-2 pt-2 border-t border-white/10 text-[10px] space-y-1 text-slate-300 relative z-10">
          <div className="flex justify-between">
            <span className="text-slate-400">ODI Runs:</span>
            <span className="font-semibold text-white">{card.stats.odi?.batting?.runs ?? '—'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">T20 Econ:</span>
            <span className="font-semibold text-white">{card.stats.t20i?.bowling?.economy ?? '—'}</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};
