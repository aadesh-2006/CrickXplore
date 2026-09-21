import React from 'react';
import { Trophy, RefreshCw, Shield, Crown, Sparkles } from 'lucide-react';
import type { CollectibleCard } from '../../types/collectibleCard';
import { VARIANT_STYLES } from './CardVariantStyles';

interface CollectibleCardBackProps {
  card: CollectibleCard;
}

export const CollectibleCardBack: React.FC<CollectibleCardBackProps> = ({ card }) => {
  const style = VARIANT_STYLES[card.variant];
  const isBowler = card.role === 'bowler';
  const batting = card.rawBattingStats;
  const bowling = card.rawBowlingStats;

  return (
    <div className="w-full h-full p-6 flex flex-col justify-between select-none">
      {/* Back Inner Seam / Border */}
      <div className={`absolute inset-2 rounded-2xl border ${style.innerBorder} pointer-events-none`} />

      {/* Top Header: Edition + Serial */}
      <div className="relative z-10 flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center gap-1.5">
          <Crown className={`w-3.5 h-3.5 ${style.iconAccent}`} />
          <span className="text-[10px] font-tech font-bold uppercase tracking-widest text-zinc-300">
            {card.edition}
          </span>
        </div>

        <span className={`px-2 py-0.5 rounded-full text-[9px] font-tech uppercase tracking-widest border ${style.rarityBadgeBg} ${style.rarityBadgeText}`}>
          {card.rarity}
        </span>
      </div>

      {/* Center Body: Lore + Key Career Runes */}
      <div className="relative z-10 my-auto flex flex-col gap-3">
        {/* Signature Lore Box */}
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-md">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Sparkles className={`w-3.5 h-3.5 ${style.iconAccent}`} />
            <span className="text-[10px] font-tech uppercase tracking-wider text-zinc-400 font-semibold">
              Archival Lore Runes
            </span>
          </div>
          <p className="text-xs text-zinc-300 font-light leading-relaxed italic">
            "{card.signatureTitle}"
          </p>
        </div>

        {/* Factual Highlights Breakdown */}
        <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
          <div className="flex items-center gap-1.5 mb-2">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10px] font-tech uppercase tracking-wider text-zinc-400 font-semibold">
              {card.format.toUpperCase()} Telemetry Runes
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-tech">
            {isBowler && bowling ? (
              <>
                <div>
                  <span className="text-zinc-500 block text-[9px] uppercase">Wickets</span>
                  <span className="font-bold text-zinc-200">{bowling.wickets} Wkts</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[9px] uppercase">Economy</span>
                  <span className="font-bold text-amber-300">{bowling.economy ? `${bowling.economy}` : '—'}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[9px] uppercase">BBI</span>
                  <span className="font-bold text-zinc-300">{bowling.bestBowlingInnings || '—'}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[9px] uppercase">5WM</span>
                  <span className="font-bold text-zinc-300">{bowling.fiveWickets ?? 0}</span>
                </div>
              </>
            ) : batting ? (
              <>
                <div>
                  <span className="text-zinc-500 block text-[9px] uppercase">Total Runs</span>
                  <span className="font-bold text-zinc-200">{batting.runs.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[9px] uppercase">Batting Avg</span>
                  <span className="font-bold text-amber-300">{batting.average ? batting.average.toFixed(1) : '—'}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[9px] uppercase">100s / 50s</span>
                  <span className="font-bold text-zinc-300">{batting.centuries} / {batting.fifties}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[9px] uppercase">Highest Score</span>
                  <span className="font-bold text-zinc-300">{batting.highestScore}</span>
                </div>
              </>
            ) : (
              <div className="col-span-2 text-zinc-500 text-xs italic">
                Official career runes sealed in sanctuary
              </div>
            )}
          </div>
        </div>

        {/* Tactical Badges Strip */}
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
