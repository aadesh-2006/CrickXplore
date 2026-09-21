import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles, RefreshCw } from 'lucide-react';
import type { CollectibleCard } from '../../types/collectibleCard';
import { VARIANT_STYLES } from './CardVariantStyles';
import { CollectibleCardBack } from './CollectibleCardBack';

interface DigitalCollectibleCardProps {
  card: CollectibleCard;
  size?: 'md' | 'lg';
  isFlipped?: boolean;
  onToggleFlip?: () => void;
  onPlayTone?: () => void;
  interactive?: boolean;
}

export const DigitalCollectibleCard: React.FC<DigitalCollectibleCardProps> = ({
  card,
  size = 'md',
  isFlipped: controlledFlipped,
  onToggleFlip,
  onPlayTone,
  interactive = true,
}) => {
  const [internalFlipped, setInternalFlipped] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const isFlipped = controlledFlipped !== undefined ? controlledFlipped : internalFlipped;
  const style = VARIANT_STYLES[card.variant] || VARIANT_STYLES.STANDARD;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 16;
    const rotY = ((x - centerX) / centerX) * 16;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setRotateX(0);
    setRotateY(0);
    setGlarePosition({ x: 50, y: 50 });
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!interactive) return;
    e.stopPropagation();
    if (onPlayTone) onPlayTone();
    if (onToggleFlip) {
      onToggleFlip();
    } else {
      setInternalFlipped(!internalFlipped);
    }
  };

  // Dimensions based on size
  const dimensions =
    size === 'lg'
      ? 'w-[320px] sm:w-[360px] h-[520px] sm:h-[560px]'
      : 'w-full max-w-[300px] h-[450px]';

  const foilBackground = style.foilGradient
    .replace('{x}', glarePosition.x.toString())
    .replace('{y}', glarePosition.y.toString());

  return (
    <div className="flex flex-col items-center select-none perspective-[1200px]">
      {/* 3D Card Shell */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{
          transformStyle: 'preserve-3d',
          transform: prefersReducedMotion
            ? 'none'
            : `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.15s cubic-bezier(0.2, 0, 0, 1)',
        }}
        className={`relative ${dimensions} rounded-3xl cursor-pointer group shadow-2xl transition-all duration-300`}
      >
        {/* CARD FRONT */}
        <div
          className={`absolute inset-0 rounded-3xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden border ${
            style.frameBorder
          } bg-gradient-to-b ${style.bgGradient} transition-all duration-500 ${
            isFlipped
              ? 'opacity-0 pointer-events-none scale-95 [transform:rotateY(180deg)]'
              : 'opacity-100 scale-100 [transform:rotateY(0deg)]'
          }`}
        >
          {/* Dynamic Holographic Foil Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-300"
            style={{
              background: foilBackground,
            }}
          />

          {/* Inner Geometric Border & Corner Brackets */}
          <div className={`absolute inset-2 rounded-2xl border ${style.innerBorder} pointer-events-none`} />
          <div className={`absolute top-2 left-2 w-2 h-2 ${style.cornerAccent} rounded-tl-sm pointer-events-none`} />
          <div className={`absolute top-2 right-2 w-2 h-2 ${style.cornerAccent} rounded-tr-sm pointer-events-none`} />
          <div className={`absolute bottom-2 left-2 w-2 h-2 ${style.cornerAccent} rounded-bl-sm pointer-events-none`} />
          <div className={`absolute bottom-2 right-2 w-2 h-2 ${style.cornerAccent} rounded-br-sm pointer-events-none`} />

          {/* Top Header: Nationality + Rarity/Variant Crest */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white/[0.08] border border-white/20 flex items-center justify-center text-[10px] font-tech font-bold text-amber-300">
                {card.countryCode}
              </div>
              <span className="text-xs font-tech font-bold tracking-widest text-zinc-300 uppercase">
                {card.nationality}
              </span>
            </div>

            <div className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-tech uppercase tracking-widest border ${style.rarityBadgeBg} ${style.rarityBadgeText}`}>
              <Crown className="w-3 h-3" />
              <span>{card.variant}</span>
            </div>
          </div>

          {/* Center Visual Art: Portrait + Halo + Name */}
          <div className="relative z-10 my-auto flex flex-col items-center text-center">
            {/* Portrait Halo */}
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl mb-3 bg-gradient-to-br from-white/10 to-black/80 flex items-center justify-center">
              {card.portraitUrl ? (
                <img
                  src={card.portraitUrl}
                  alt={card.playerName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : null}
              {/* Fallback Initials */}
              <div className="absolute inset-0 flex items-center justify-center font-serif-luxury text-4xl font-black text-amber-300/40 pointer-events-none">
                {card.playerName.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            {/* Signature Title */}
            <span className={`text-[9px] font-tech uppercase tracking-widest ${style.accentText} mb-0.5 block truncate max-w-[240px]`}>
              {card.signatureTitle}
            </span>

            {/* Player Name */}
            <h3 className="text-xl sm:text-2xl font-serif-luxury font-black text-white tracking-wide leading-tight group-hover:text-amber-200 transition-colors">
              {card.playerName}
            </h3>

            {/* Role Badge */}
            <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-[9px] font-tech text-zinc-300 uppercase tracking-widest">
              {card.role.toUpperCase()}
            </span>
          </div>

          {/* Bottom Card Strip: Format + Primary Metrics */}
          <div className="relative z-10 pt-2.5 border-t border-white/10 flex items-center justify-between">
            {/* Format pill */}
            <div className="flex items-center gap-1">
              <span className="px-2 py-0.5 rounded bg-white/10 border border-white/20 text-[9px] font-tech font-bold text-amber-300 uppercase">
                {card.format}
              </span>
            </div>

            {/* Primary & Secondary Metrics */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[8px] font-tech uppercase text-zinc-400 block">
                  {card.primaryMetric.label}
                </span>
                <span className="text-xs sm:text-sm font-bold font-tech text-white">
                  {card.primaryMetric.value}
                </span>
              </div>

              <div className="w-[1px] h-5 bg-white/10" />

              <div className="text-right">
                <span className="text-[8px] font-tech uppercase text-zinc-400 block">
                  {card.secondaryMetric.label}
                </span>
                <span className={`text-xs sm:text-sm font-bold font-tech ${style.accentText}`}>
                  {card.secondaryMetric.value}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Watermark Seal */}
          <div className="relative z-10 flex items-center justify-between pt-1 text-[8px] font-tech tracking-[0.2em] text-zinc-500 uppercase">
            <span>CRICKXPLORE</span>
            <span className="flex items-center gap-1 text-amber-400/80">
              <Sparkles className="w-2.5 h-2.5" />
              <span>{card.serialNumber}</span>
            </span>
          </div>
        </div>

        {/* CARD BACK */}
        <div
          className={`absolute inset-0 rounded-3xl overflow-hidden border ${
            style.frameBorder
          } bg-gradient-to-b ${style.bgGradient} transition-all duration-500 ${
            isFlipped
              ? 'opacity-100 scale-100 [transform:rotateY(0deg)]'
              : 'opacity-0 pointer-events-none scale-95 [transform:rotateY(-180deg)]'
          }`}
        >
          <CollectibleCardBack card={card} />
        </div>
      </motion.div>

      {/* Flip Cue */}
      {interactive && (
        <span className="mt-2 text-[10px] font-tech text-zinc-500 flex items-center gap-1 hover:text-amber-300 transition-colors">
          <RefreshCw className="w-3 h-3 text-amber-400" />
          <span>Tap to flip {isFlipped ? 'front' : 'lore runes'}</span>
        </span>
      )}
    </div>
  );
};
