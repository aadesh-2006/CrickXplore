import React from 'react';
import type { GamePlayer } from '../../game/types';
import { Trophy, Sparkles, RotateCcw, Award, Users } from 'lucide-react';

interface GameOverProps {
  winner: GamePlayer | null;
  players: GamePlayer[];
  onPlayAgain: () => void;
  onNewSetup: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({
  winner,
  players,
  onPlayAgain,
  onNewSetup,
}) => {
  const rankedPlayers = [...players].sort(
    (a, b) => b.cardsWonCount - a.cardsWonCount || b.hand.length - a.hand.length
  );

  return (
    <div className="w-full max-w-3xl mx-auto bg-slate-900/95 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-2xl shadow-2xl text-center relative overflow-hidden animate-in zoom-in-95 duration-500">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Trophy Icon */}
      <div className="relative inline-block mb-4">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mx-auto shadow-2xl ring-8 ring-amber-500/20 animate-bounce">
          <Trophy className="w-12 h-12 text-slate-950" />
        </div>
        <div className="absolute -top-2 -right-2 bg-emerald-500 text-slate-950 p-1.5 rounded-full shadow-lg">
          <Sparkles className="w-5 h-5" />
        </div>
      </div>

      <div className="inline-block px-4 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-widest mb-2">
        MATCH CHAMPION
      </div>

      <h1 className="text-3xl md:text-5xl font-black text-white mb-2">
        {winner?.name || 'Grand Champion'}
      </h1>

      <p className="text-slate-400 text-sm md:text-base max-w-md mx-auto mb-8">
        Outlasted all challengers and captured the CrickXplore Arena championship!
      </p>

      {/* Final Standings Leaderboard */}
      <div className="bg-slate-950/60 border border-white/10 rounded-2xl p-4 md:p-6 mb-8 text-left">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" /> Final Match Standings
        </h3>

        <div className="space-y-2.5">
          {rankedPlayers.map((player, idx) => {
            const isChamp = player.id === winner?.id;

            return (
              <div
                key={player.id}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                  isChamp
                    ? 'bg-amber-500/10 border-amber-400/50 shadow-md'
                    : 'bg-white/5 border-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs ${
                      isChamp
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-white/10 text-slate-400'
                    }`}
                  >
                    #{idx + 1}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm flex items-center gap-1.5">
                      {player.name}
                      {isChamp && (
                        <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.2 rounded">
                          CHAMPION
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Cards won from pot: {player.cardsWonCount}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-slate-400 block">Final Cards</span>
                  <span className="text-base font-black text-emerald-400">
                    {player.hand.length}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={onPlayAgain}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-slate-950 font-black text-base shadow-xl hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-5 h-5" /> Play Again (Same Players)
        </button>

        <button
          onClick={onNewSetup}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-base transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Users className="w-5 h-5" /> New Game Setup
        </button>
      </div>
    </div>
  );
};
