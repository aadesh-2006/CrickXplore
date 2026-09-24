import React, { useMemo } from 'react';
import { Trophy, RefreshCw, Shield, Crown, Sparkles, Star, Info } from 'lucide-react';
import type { CollectibleCard } from '../../types/collectibleCard';
import type { NormalizedPlayer } from '../../types/player';
import { VARIANT_STYLES } from './CardVariantStyles';
import { useCardInsight } from '../../hooks/useCardInsight';
import { cricketDataService } from '../../services/cricketDataService';

interface CollectibleCardBackProps {
  card: CollectibleCard;
}

export const CollectibleCardBack: React.FC<CollectibleCardBackProps> = ({ card }) => {
  const style = VARIANT_STYLES[card.variant] || VARIANT_STYLES.STANDARD;
  const isBowler = card.role === 'bowler';
  const batting = card.rawBattingStats;
  const bowling = card.rawBowlingStats;

  // Resolve player object for central Gemini card lore service
  const playerObj = useMemo<NormalizedPlayer>(() => {
    const existing = cricketDataService.getPlayerByIdSync(card.playerId);
    if (existing) return existing;
    return {
      id: card.playerId,
      name: card.playerName,
      country: card.nationality,
      role: card.role,
      stats: {
        test: { batting: card.rawBattingStats, bowling: card.rawBowlingStats },
      },
    };
  }, [card.playerId, card.playerName, card.nationality, card.role, card.rawBattingStats, card.rawBowlingStats]);

  // Central Gemini Card Lore Hook
  const { insight, loading } = useCardInsight(playerObj, {
    tier: card.variant,
    serialNumber: card.serialNumber,
  });

  return (
    <div className="w-full h-full p-5 sm:p-6 flex flex-col justify-between select-none relative overflow-hidden">
      {/* Back Inner Seam / Border */}
      <div className={`absolute inset-2 rounded-2xl border ${style.innerBorder} pointer-events-none`} />

      {/* Top Header: Edition + Serial + AI Indicator */}
      <div className="relative z-10 flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center gap-1.5">
          <Crown className={`w-3.5 h-3.5 ${style.iconAccent}`} />
          <span className="text-[10px] font-tech font-bold uppercase tracking-widest text-zinc-300">
            {card.edition}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {loading ? (
            <span className="text-[8px] font-mono text-purple-300 animate-pulse flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 animate-spin" /> SYNTHESIZING LORE...
            </span>
          ) : insight ? (
            <span className="px-1.5 py-0.5 rounded bg-purple-500/20 border border-purple-500/30 text-[8px] font-tech text-purple-200 uppercase tracking-widest flex items-center gap-1" title="Lore synthesized via Google Gemini">
              <Sparkles className="w-2.5 h-2.5 text-purple-400" /> GEMINI LORE
            </span>
          ) : null}

          <span className={`px-2 py-0.5 rounded-full text-[9px] font-tech uppercase tracking-widest border ${style.rarityBadgeBg} ${style.rarityBadgeText}`}>
            {card.rarity}
          </span>
        </div>
      </div>

      {/* Center Body: Lore + Key Career Runes */}
      <div className="relative z-10 my-auto flex flex-col gap-2.5">
        {/* Signature Lore Box with Gemini Insight Enrichment */}
        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-950/20 via-white/[0.03] to-transparent border border-purple-500/20 backdrop-blur-md">
          <div className="flex items-center justify-between gap-1.5 mb-1">
            <div className="flex items-center gap-1.5">
              <Sparkles className={`w-3 h-3 ${style.iconAccent}`} />
              <span className="text-[9px] font-tech uppercase tracking-wider text-purple-300 font-bold">
                {insight?.cardTitle ? insight.cardTitle : 'Archival Lore Runes'}
              </span>
            </div>
            {insight && (
              <span className="text-[8px] font-mono text-zinc-500 flex items-center gap-0.5">
                <Info className="w-2.5 h-2.5" /> AI Lore
              </span>
            )}
          </div>
          <p className="text-[11px] text-zinc-300 font-light leading-relaxed italic line-clamp-3">
            "{insight?.collectorLore || card.signatureTitle}"
          </p>
          {insight?.flavorQuote && (
            <p className="mt-1 text-[10px] text-amber-300/80 font-serif-luxury font-medium border-t border-white/[0.05] pt-1 truncate">
              — {insight.flavorQuote}
            </p>
          )}
        </div>

        {/* Factual Highlights Breakdown (IMMUTABLE VERIFIED STATS) */}
        <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06]">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <Trophy className="w-3 h-3 text-amber-400" />
              <span className="text-[9px] font-tech uppercase tracking-wider text-zinc-400 font-semibold">
                {card.format.toUpperCase()} Verified Telemetry
              </span>
            </div>
            <span className="text-[8px] font-mono text-emerald-400/80">VERIFIED</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px] font-tech">
            {isBowler && bowling ? (
              <>
                <div>
                  <span className="text-zinc-500 block text-[8px] uppercase">Wickets</span>
                  <span className="font-bold text-zinc-200">{bowling.wickets} Wkts</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[8px] uppercase">Economy</span>
                  <span className="font-bold text-amber-300">{bowling.economy ? `${bowling.economy}` : '—'}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[8px] uppercase">BBI</span>
                  <span className="font-bold text-zinc-300">{bowling.bestBowlingInnings || '—'}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[8px] uppercase">5WM</span>
                  <span className="font-bold text-zinc-300">{bowling.fiveWickets ?? 0}</span>
                </div>
              </>
            ) : batting ? (
              <>
                <div>
                  <span className="text-zinc-500 block text-[8px] uppercase">Total Runs</span>
                  <span className="font-bold text-zinc-200">{batting.runs.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[8px] uppercase">Batting Avg</span>
                  <span className="font-bold text-amber-300">{batting.average ? batting.average.toFixed(1) : '—'}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[8px] uppercase">100s / 50s</span>
                  <span className="font-bold text-zinc-300">{batting.centuries ?? 0} / {batting.fifties ?? 0}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[8px] uppercase">Highest Score</span>
                  <span className="font-bold text-zinc-300">{batting.highestScore || '—'}</span>
                </div>
              </>
            ) : (
              <div className="col-span-2 text-zinc-500 text-xs italic">
                Official career runes sealed in sanctuary
              </div>
            )}
          </div>
        </div>

        {/* Gemini Iconic Highlights or Tactical Badges Strip */}
        {insight?.iconicStatHighlights && insight.iconicStatHighlights.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {insight.iconicStatHighlights.slice(0, 2).map((hl, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-[8px] font-tech text-purple-200 uppercase tracking-wider flex items-center gap-1"
              >
                <Star className="w-2 h-2 text-amber-400" />
                <span className="truncate max-w-[120px]">{hl}</span>
              </span>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-1">
            {card.badges.slice(0, 2).map((badge, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-[9px] font-tech text-zinc-300 uppercase tracking-wider"
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Footer: Serial Number + Flip hint */}
      <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] font-tech text-zinc-400">
        <div className="flex items-center gap-1">
          <Shield className="w-3 h-3 text-amber-400/80" />
          <span className="font-bold text-zinc-300">{card.serialNumber}</span>
        </div>

        <div className="flex items-center gap-1 text-zinc-500">
          <span>Click to flip</span>
          <RefreshCw className="w-3 h-3 text-amber-400 animate-spin" />
        </div>
      </div>
    </div>
  );
};
