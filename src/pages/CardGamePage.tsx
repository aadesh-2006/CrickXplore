import React, { useState } from 'react';
import type { GameConfig, GameState } from '../game/types';
import { createInitialState } from '../game/engine';
import { FALLBACK_PLAYERS } from '../data/fallbackPlayers';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CricketAtmosphericBackground } from '../components/CricketAtmosphericBackground';
import { GameSetup } from '../components/game/GameSetup';
import { GameBoard } from '../components/game/GameBoard';
import { GameRulesModal } from '../components/game/GameRulesModal';
import { ShieldAlert, Sparkles, Trophy, Users, ShieldCheck } from 'lucide-react';
import type { AppView } from '../App';

interface CardGamePageProps {
  onNavigateView: (
    view: AppView,
    playerId?: string,
    cardId?: string,
    momentId?: string,
    stadiumId?: string
  ) => void;
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
  onPlayTone: () => void;
}

export const CardGamePage: React.FC<CardGamePageProps> = ({
  onNavigateView,
  isPlayingAudio,
  onToggleAudio,
  onPlayTone,
}) => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);

  const handleStartGame = (config: GameConfig) => {
    setErrorBanner(null);
    const { state, error } = createInitialState(config, FALLBACK_PLAYERS);
    if (error || !state) {
      setErrorBanner(error || 'Could not start match. Please adjust player settings.');
      return;
    }
    setGameState(state);
    onPlayTone();
  };

  const handleExitGame = () => {
    setGameState(null);
    setErrorBanner(null);
    onPlayTone();
  };

  return (
    <div className="relative min-h-screen bg-[#060709] text-zinc-100 overflow-x-hidden selection:bg-amber-400/30 selection:text-amber-200">
      {/* Interactive Atmospheric Background */}
      <CricketAtmosphericBackground />

      {/* Main Navbar */}
      <Navbar
        currentView="game"
        onNavigateView={onNavigateView}
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={onToggleAudio}
      />

      {/* Main Content Area */}
      <main className="relative z-10 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Isolation Notice Badge */}
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Isolated Local Match Engine • Album Collection is 100% Preserved
              </span>
            </div>
          </div>

          {/* Error Banner */}
          {errorBanner && (
            <div className="mb-6 max-w-2xl mx-auto p-4 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-300 flex items-center gap-3 text-sm">
              <ShieldAlert className="w-5 h-5 shrink-0 text-rose-400" />
              <span>{errorBanner}</span>
            </div>
          )}

          {/* Game Rules Modal */}
          <GameRulesModal isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />

          {/* View Switch: Setup vs Active Board */}
          {!gameState ? (
            <div className="space-y-12">
              <GameSetup
                onStartGame={handleStartGame}
                onOpenRules={() => setIsRulesOpen(true)}
              />

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-6">
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/5 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">3 to 6 Players Hot-Seat</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Pass-and-play matches on a single device with screen curtains protecting player hand secrecy before every turn.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/5 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Category Control Pot</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Defeat the leader to conquer category selection rights and sweep accumulated card chains into your deck.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/5 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">24 Real Cricket Stats</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Real stats across Test, ODI, and T20I with accurate bowling economy and average mechanics.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <GameBoard
              initialState={gameState}
              playersPool={FALLBACK_PLAYERS}
              onExitGame={handleExitGame}
            />
          )}
        </div>
      </main>

      {/* Main Footer */}
      <Footer
        onNavigateView={onNavigateView}
      />
    </div>
  );
};
