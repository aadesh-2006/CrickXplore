import React from 'react';
import type { GameCard, GameCategoryDefinition } from '../../game/types';
import { Crown, Sparkles } from 'lucide-react';

interface GameCardViewProps {
  card: GameCard;
  isController?: boolean;
  isSelected?: boolean;
  isWinner?: boolean;
  isLoser?: boolean;
  isTie?: boolean;
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
  highlightCategory = null,
  onClick,
  disabled = false,
  compact = false,
  showAllStats = false,
}) => {
  const roleStyle = roleColors[card.role] || roleColors.batter;

  let borderColor = 'border-white/10 hover:border-emerald-500/40';
  let shadowGlow = '';

  if (isSelected) {
    borderColor = 'border-emerald-400 ring-2 ring-emerald-500/50';
    shadowGlow = 'shadow-[0_0_20px_rgba(16,185,129,0.35)]';
  } else if (isWinner) {
    borderColor = 'border-amber-400 ring-2 ring-amber-400/60';
    shadowGlow = 'shadow-[0_0_25px_rgba(251,191,36,0.45)]';
  } else if (isLoser) {
    borderColor = 'border-rose-500/40 opacity-70';
  } else if (isTie) {
    borderColor = 'border-cyan-400 ring-2 ring-cyan-400/40';
    shadowGlow = 'shadow-[0_0_20px_rgba(34,211,238,0.3)]';
  }

  const highlightedValue = highlightCategory ? highlightCategory.getValue(card) : null;

  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={`relative rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-slate-900/90 border ${borderColor} ${shadowGlow} transition-all duration-300 backdrop-blur-md overflow-hidden flex flex-col ${
        disabled ? 'cursor-not-allowed opacity-60' : onClick ? 'cursor-pointer hover:-translate-y-1 hover:shadow-xl' : ''
      } ${compact ? 'p-3 w-44' : 'p-4 w-60 sm:w-64'}`}
    >
      {/* Top Banner with Badges */}
      <div className="flex items-center justify-between gap-1 mb-2">
        <span
          className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border ${roleStyle.bg} ${roleStyle.text} ${roleStyle.border}`}
        >
          {card.role}
        </span>

        {isController && (
          <span className="flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-amber-500/20 border border-amber-400/40 px-2 py-0.5 rounded-full">
            <Crown className="w-3 h-3 text-amber-400" /> Leader
          </span>
        )}

        <span className="text-[10px] font-semibold text-slate-400 bg-white/5 px-2 py-0.5 rounded-full">
          {card.countryCode}
        </span>
      </div>

      {/* Card Artwork / Image */}
      <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-800 border border-white/5 mb-3 group">
        <img
          src={card.imageUrl}
          alt={card.playerName}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
        
        {/* Country & Name Overlay */}
        <div className="absolute bottom-2 left-2 right-2">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider truncate">
            {card.country}
          </div>
          <div className="text-sm font-black text-white truncate drop-shadow-md">
            {card.playerName}
          </div>
        </div>

        {/* Victory/Loser Badges */}
        {isWinner && (
          <div className="absolute top-2 right-2 bg-amber-500 text-slate-950 text-xs font-black px-2 py-0.5 rounded-md shadow-lg flex items-center gap-1 animate-pulse">
            <Sparkles className="w-3 h-3" /> WON
          </div>
        )}
        {isLoser && (
          <div className="absolute top-2 right-2 bg-rose-900/90 text-rose-200 text-xs font-bold px-2 py-0.5 rounded-md border border-rose-500/40">
            LOST
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
          className={`mb-2 p-2 rounded-xl text-center border ${
            highlightedValue !== null && highlightedValue !== undefined && !Number.isNaN(highlightedValue)
              ? 'bg-emerald-500/10 border-emerald-500/30'
              : 'bg-rose-500/10 border-rose-500/30'
          }`}
        >
          <div className="text-[10px] uppercase font-bold text-slate-300 tracking-wider">
            {highlightCategory.label}
          </div>
          <div
            className={`font-black mt-0.5 ${
              highlightedValue !== null && highlightedValue !== undefined && !Number.isNaN(highlightedValue)
                ? 'text-lg text-white'
                : 'text-xs text-rose-400 py-1'
            }`}
          >
            {highlightedValue !== null && highlightedValue !== undefined && !Number.isNaN(highlightedValue)
              ? highlightCategory.formatValue(highlightedValue)
              : 'Stat Unavailable'}
          </div>
          <div className="text-[9px] text-slate-400">
            {highlightCategory.direction === 'HIGHER_IS_BETTER' ? '▲ Higher is better' : '▼ Lower is better'}
          </div>
        </div>
      )}

      {/* Quick Stat Summary (if not highlighting a single category) */}
      {!highlightCategory && (
        <div className="grid grid-cols-2 gap-1.5 text-center mt-auto text-xs">
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
        <div className="mt-2 pt-2 border-t border-white/10 text-[10px] space-y-1 text-slate-300">
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
    </div>
  );
};
