import type { CardVariant } from '../../types/collectibleCard';

export interface VariantVisualConfig {
  variant: CardVariant;
  name: string;
  tagline: string;
  frameBorder: string;
  innerBorder: string;
  bgGradient: string;
  glowColor: string;
  accentText: string;
  foilGradient: string;
  rarityBadgeBg: string;
  rarityBadgeText: string;
  cornerAccent: string;
  iconAccent: string;
}

export const VARIANT_STYLES: Record<CardVariant, VariantVisualConfig> = {
  STANDARD: {
    variant: 'STANDARD',
    name: 'Standard Issue',
    tagline: 'Core Archive Relic',
    frameBorder: 'border-zinc-700/60 hover:border-zinc-400/80',
    innerBorder: 'border-zinc-600/30',
    bgGradient: 'from-[#12141c] via-[#0b0c11] to-[#07080a]',
    glowColor: 'rgba(160, 170, 190, 0.12)',
    accentText: 'text-zinc-300',
    foilGradient: 'radial-gradient(circle at {x}% {y}%, rgba(200,210,230,0.2) 0%, rgba(100,110,140,0.05) 50%, transparent 80%)',
    rarityBadgeBg: 'bg-zinc-800/80 border-zinc-600/50',
    rarityBadgeText: 'text-zinc-300',
    cornerAccent: 'bg-zinc-500',
    iconAccent: 'text-zinc-400',
  },

  GOLD: {
    variant: 'GOLD',
    name: 'Aurum Sovereign',
    tagline: 'Gilded Master Edition',
    frameBorder: 'border-amber-400/70 hover:border-amber-300 shadow-[0_0_30px_rgba(251,191,36,0.25)]',
    innerBorder: 'border-amber-400/40',
    bgGradient: 'from-[#221a0c] via-[#141008] to-[#080704]',
    glowColor: 'rgba(245, 158, 11, 0.35)',
    accentText: 'text-amber-300',
    foilGradient: 'radial-gradient(circle at {x}% {y}%, rgba(255,223,0,0.4) 0%, rgba(217,119,6,0.2) 40%, transparent 75%)',
    rarityBadgeBg: 'bg-amber-500/20 border-amber-400/60',
    rarityBadgeText: 'text-amber-300 font-bold',
    cornerAccent: 'bg-amber-400 shadow-[0_0_8px_#fbbf24]',
    iconAccent: 'text-amber-400',
  },

  WORLD_CUP: {
    variant: 'WORLD_CUP',
    name: 'World Cup Apex',
    tagline: 'Global Championship Glory',
    frameBorder: 'border-emerald-400/70 hover:border-emerald-300 shadow-[0_0_30px_rgba(52,211,153,0.25)]',
    innerBorder: 'border-emerald-400/40',
    bgGradient: 'from-[#0a1e17] via-[#07130f] to-[#040907]',
    glowColor: 'rgba(16, 185, 129, 0.3)',
    accentText: 'text-emerald-300',
    foilGradient: 'radial-gradient(circle at {x}% {y}%, rgba(52,211,153,0.35) 0%, rgba(20,184,166,0.2) 40%, transparent 75%)',
    rarityBadgeBg: 'bg-emerald-500/20 border-emerald-400/60',
    rarityBadgeText: 'text-emerald-300 font-bold',
    cornerAccent: 'bg-emerald-400 shadow-[0_0_8px_#34d399]',
    iconAccent: 'text-emerald-400',
  },

  RECORD: {
    variant: 'RECORD',
    name: 'Immortal Record',
    tagline: 'History-Shattering Feat',
    frameBorder: 'border-cyan-400/70 hover:border-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.25)]',
    innerBorder: 'border-cyan-400/40',
    bgGradient: 'from-[#0a1b24] via-[#071118] to-[#04080c]',
    glowColor: 'rgba(6, 182, 212, 0.3)',
    accentText: 'text-cyan-300',
    foilGradient: 'radial-gradient(circle at {x}% {y}%, rgba(34,211,238,0.35) 0%, rgba(14,165,233,0.2) 40%, transparent 75%)',
    rarityBadgeBg: 'bg-cyan-500/20 border-cyan-400/60',
    rarityBadgeText: 'text-cyan-300 font-bold',
    cornerAccent: 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]',
    iconAccent: 'text-cyan-400',
  },

  ICONIC_MOMENT: {
    variant: 'ICONIC_MOMENT',
    name: 'Iconic Moment',
    tagline: 'Frozen in Tension',
    frameBorder: 'border-rose-500/70 hover:border-rose-400 shadow-[0_0_30px_rgba(244,63,94,0.25)]',
    innerBorder: 'border-rose-500/40',
    bgGradient: 'from-[#220d13] via-[#14080b] to-[#090405]',
    glowColor: 'rgba(225, 29, 72, 0.35)',
    accentText: 'text-rose-300',
    foilGradient: 'radial-gradient(circle at {x}% {y}%, rgba(251,113,133,0.4) 0%, rgba(225,29,72,0.2) 40%, transparent 75%)',
    rarityBadgeBg: 'bg-rose-500/20 border-rose-500/60',
    rarityBadgeText: 'text-rose-300 font-bold',
    cornerAccent: 'bg-rose-500 shadow-[0_0_8px_#f43f5e]',
    iconAccent: 'text-rose-400',
  },

  LEGEND: {
    variant: 'LEGEND',
    name: 'Mythic Pantheon',
    tagline: 'Timeless Transcendence',
    frameBorder: 'border-purple-400/80 hover:border-amber-300 shadow-[0_0_40px_rgba(192,132,252,0.3),0_0_20px_rgba(251,191,36,0.2)]',
    innerBorder: 'border-purple-400/50',
    bgGradient: 'from-[#1d0e2e] via-[#10081a] to-[#08040d]',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    accentText: 'text-purple-300',
    foilGradient: 'radial-gradient(circle at {x}% {y}%, rgba(232,121,249,0.45) 0%, rgba(251,191,36,0.3) 35%, rgba(147,51,234,0.2) 65%, transparent 85%)',
    rarityBadgeBg: 'bg-gradient-to-r from-purple-500/30 to-amber-500/30 border-purple-400/70',
    rarityBadgeText: 'text-amber-200 font-black',
    cornerAccent: 'bg-gradient-to-br from-amber-400 to-purple-400 shadow-[0_0_10px_#e879f9]',
    iconAccent: 'text-purple-300',
  },
};
