import React from 'react';
import { X, Crown, TrendingUp, Layers, Skull, ShieldCheck, Zap } from 'lucide-react';

interface GameRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GameRulesModal: React.FC<GameRulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
          <Zap className="w-4 h-4" /> Official CrickXplore Rulebook
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
          How to Play CrickXplore Card Game
        </h2>

        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
          {/* Rule 1 */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 flex gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0 h-fit">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base mb-1">1. Category Control & Leading</h3>
              <p className="text-slate-400 text-xs">
                The match starts with Player 1 as the <strong>Category Controller</strong>. The controller plays a card from their hand and picks any cricket stat category (e.g., Test Runs, ODI Strike Rate, T20 Bowling Economy).
              </p>
            </div>
          </div>

          {/* Rule 2 */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 flex gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0 h-fit">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base mb-1">2. Higher vs Lower Stat Rules</h3>
              <p className="text-slate-400 text-xs">
                Every stat has strict cricket logic:
                <br />• <strong>Higher Wins</strong>: Career Runs, Batting Average, Strike Rate, Centuries, Wickets.
                <br />• <strong>Lower Wins</strong>: Bowling Economy (e.g. 6.27 rpo beats 7.63 rpo), Bowling Average, Bowling Strike Rate.
              </p>
            </div>
          </div>

          {/* Rule 3 */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 flex gap-3">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 shrink-0 h-fit">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base mb-1">3. The Chain Pot & Control Shift</h3>
              <p className="text-slate-400 text-xs">
                Each challenger plays one card to face the controller.
                <br />• <strong>Controller Wins</strong>: Both cards enter the Pot. Controller retains control.
                <br />• <strong>Challenger Wins</strong>: Challenger claims <em>ALL</em> cards in the chain pot, gains Category Control, and can keep or change the category!
              </p>
            </div>
          </div>

          {/* Rule 4 */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 flex gap-3">
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 shrink-0 h-fit">
              <Skull className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base mb-1">4. Elimination & Winning the Game</h3>
              <p className="text-slate-400 text-xs">
                When a player's hand reaches 0 cards, they are eliminated from the match. The last remaining player with cards is crowned the <strong>CrickXplore Grand Champion</strong>!
              </p>
            </div>
          </div>

          {/* Note on Collection */}
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>
              <strong>Collection Isolation:</strong> Game cards are generated temporarily for this match. Your permanent Digital Collectible Album remains safe and untouched!
            </span>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-colors cursor-pointer"
          >
            Got it, Let's Play!
          </button>
        </div>
      </div>
    </div>
  );
};
