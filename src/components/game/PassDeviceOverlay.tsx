import React from 'react';
import type { GamePlayer } from '../../game/types';
import { Smartphone, ShieldCheck, EyeOff, ArrowRight } from 'lucide-react';

interface PassDeviceOverlayProps {
  targetPlayer: GamePlayer;
  isController: boolean;
  onReady: () => void;
}

export const PassDeviceOverlay: React.FC<PassDeviceOverlayProps> = ({
  targetPlayer,
  isController,
  onReady,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl p-6 md:p-8 text-center shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5 text-emerald-400">
          <Smartphone className="w-8 h-8 animate-pulse" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-300 mb-3">
          <EyeOff className="w-3.5 h-3.5 text-amber-400" /> Hot-Seat Hand Privacy
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white">
          Pass Device to
        </h2>
        <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400 my-2">
          {targetPlayer.name}
        </div>

        <p className="text-sm text-slate-400 mb-6">
          {isController
            ? 'You hold Category Control! Select a card from your hand to lead the next duel.'
            : 'Prepare your challenger card to duel against the Category Controller.'}
        </p>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 text-xs text-slate-400 flex items-center justify-center gap-2 mb-6">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Cards remain hidden until you confirm your turn</span>
        </div>

        <button
          onClick={onReady}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-slate-950 font-black text-base shadow-xl hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
        >
          I am {targetPlayer.name} — Ready
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
