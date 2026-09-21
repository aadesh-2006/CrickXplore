import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, User, Shield, ArrowRight, RefreshCw } from 'lucide-react';
import type { CollectibleCard } from '../../types/collectibleCard';
import { DigitalCollectibleCard } from './DigitalCollectibleCard';
import { VARIANT_STYLES } from './CardVariantStyles';

interface CollectibleCardModalProps {
  card: CollectibleCard | null;
  onClose: () => void;
  onViewPlayerProfile?: (playerId: string) => void;
  onPlayTone?: () => void;
}

export const CollectibleCardModal: React.FC<CollectibleCardModalProps> = ({
  card,
  onClose,
  onViewPlayerProfile,
  onPlayTone,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!card) return null;

  const style = VARIANT_STYLES[card.variant] || VARIANT_STYLES.STANDARD;

  const handleToggleFlip = () => {
    if (onPlayTone) onPlayTone();
    setIsFlipped(!isFlipped);
  };

  const handleInspectPlayer = () => {
    if (onPlayTone) onPlayTone();
    onClose();
    if (onViewPlayerProfile) {
      onViewPlayerProfile(card.playerId);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-2xl transition-opacity"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl bg-[#090b10] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl z-10 overflow-hidden my-8 max-h-[92vh] overflow-y-auto"
        >
          {/* Ambient Lighting */}
          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none -mr-32 -mt-32 opacity-40"
            style={{ backgroundColor: style.glowColor }}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-white/[0.05] border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer z-20"
            aria-label="Close card inspection modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            {/* Left Column: 3D Interactive Card (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center py-4">
              <DigitalCollectibleCard
                card={card}
                size="lg"
                isFlipped={isFlipped}
                onToggleFlip={handleToggleFlip}
                onPlayTone={onPlayTone}
              />
            </div>

            {/* Right Column: Collectible Metadata & Actions (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Header Tag / Variant Pill */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-tech uppercase tracking-widest border ${style.rarityBadgeBg} ${style.rarityBadgeText}`}>
                    {card.variant} EDITION
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-tech uppercase tracking-wider text-zinc-300">
                    {card.edition}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-xs font-tech font-bold uppercase text-amber-300">
                    {card.rarity}
                  </span>
                </div>

                {/* Player Name & Signature Title */}
                <h2 className="text-3xl sm:text-5xl font-serif-luxury font-black text-white tracking-tight leading-none mb-2">
                  {card.playerName}
                </h2>
                <p className={`text-sm sm:text-base font-medium ${style.accentText} mb-6`}>
                  {card.signatureTitle}
                </p>

                {/* Lore Box */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-6">
                  <div className="flex items-center gap-2 text-xs font-tech uppercase text-zinc-400 font-semibold mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Archival Story</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                    {card.loreSnippet}
                  </p>
                </div>

                {/* Primary Metrics Strip */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
                    <span className="text-[9px] font-tech uppercase text-zinc-500 block mb-0.5">
                      {card.primaryMetric.label}
                    </span>
                    <span className="text-lg sm:text-xl font-bold font-tech text-white">
                      {card.primaryMetric.value}
                    </span>
                    {card.primaryMetric.sublabel && (
                      <span className="text-[9px] font-tech text-zinc-400 block mt-0.5">
                        {card.primaryMetric.sublabel}
                      </span>
                    )}
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
                    <span className="text-[9px] font-tech uppercase text-zinc-500 block mb-0.5">
                      {card.secondaryMetric.label}
                    </span>
                    <span className={`text-lg sm:text-xl font-bold font-tech ${style.accentText}`}>
                      {card.secondaryMetric.value}
                    </span>
                    {card.secondaryMetric.sublabel && (
                      <span className="text-[9px] font-tech text-zinc-400 block mt-0.5">
                        {card.secondaryMetric.sublabel}
                      </span>
                    )}
                  </div>

                  {card.tertiaryMetric && (
                    <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
                      <span className="text-[9px] font-tech uppercase text-zinc-500 block mb-0.5">
                        {card.tertiaryMetric.label}
                      </span>
                      <span className="text-lg sm:text-xl font-bold font-tech text-white">
                        {card.tertiaryMetric.value}
                      </span>
                      {card.tertiaryMetric.sublabel && (
                        <span className="text-[9px] font-tech text-zinc-400 block mt-0.5">
                          {card.tertiaryMetric.sublabel}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Serial & Edition Telemetry */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between text-xs font-tech text-zinc-400 mb-8">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-amber-400" />
                    <span>Serial: <strong className="text-zinc-200">{card.serialNumber}</strong></span>
                  </div>
                  <div>
                    <span>Season: <strong className="text-zinc-200">{card.season}</strong></span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                <button
                  onClick={handleToggleFlip}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs font-tech uppercase tracking-wider text-zinc-300 hover:text-white transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                  <span>Flip Card ({isFlipped ? 'Front' : 'Back'})</span>
                </button>

                {onViewPlayerProfile && (
                  <button
                    onClick={handleInspectPlayer}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 hover:scale-105 text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-400/20 transition-all cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Inspect Player in Pantheon</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
