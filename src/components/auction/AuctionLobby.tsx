import React, { useState } from 'react';
import {
  Users,
  Copy,
  Check,
  LogOut,
  UserPlus,
  X,
  Crown,
  Sparkles,
} from 'lucide-react';
import type { AuctionRoomState } from '../../types/auction.ts';
import type { IPLTeamCode } from '../../types/player.ts';
import { AuctionPlayerPool } from './AuctionPlayerPool.tsx';
import { AuctionPlayerSelector } from './AuctionPlayerSelector.tsx';
import { IPL2026_AUCTION_RULES } from '../../types/auction.ts';

interface AuctionLobbyProps {
  roomState: AuctionRoomState;
  onAddPlayer: (playerId: string) => boolean;
  onRemovePlayer: (playerId: string) => void;
  onAddMultiplePlayers: (playerIds: string[]) => number;
  onClearPool: () => void;
  onAddSimulatedParticipant: () => boolean;
  onRemoveParticipant: (participantId: string) => void;
  onUpdateTeam: (participantId: string, teamCode: IPLTeamCode) => void;
  onLeaveRoom: () => void;
}

export const AuctionLobby: React.FC<AuctionLobbyProps> = ({
  roomState,
  onAddPlayer,
  onRemovePlayer,
  onAddMultiplePlayers,
  onClearPool,
  onAddSimulatedParticipant,
  onRemoveParticipant,
  onUpdateTeam,
  onLeaveRoom,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(roomState.roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const emptySlotsCount = Math.max(0, roomState.maxParticipants - roomState.participants.length);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* 1. ROOM HEADER & STATUS BAR */}
      <div className="bg-[#0c0d14]/90 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 text-[10px] font-bold uppercase tracking-widest font-tech">
                Active Auction Room
              </span>
              <span className="text-zinc-500">•</span>
              <span className="text-xs text-zinc-400 font-tech">
                Host: <strong className="text-white font-semibold">{roomState.hostName}</strong>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white tracking-wide">
              {roomState.roomName}
            </h1>
          </div>

          {/* Room Actions */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Room Code Badge (Click to Copy) */}
            <button
              type="button"
              onClick={handleCopyCode}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/60 border border-amber-400/40 text-amber-300 hover:border-amber-400 transition-all cursor-pointer shadow-lg shadow-amber-500/5 group"
              title="Click to copy room code"
            >
              <span className="text-[10px] uppercase font-tech text-zinc-400">Room Code:</span>
              <span className="text-sm font-bold font-mono tracking-wider text-white group-hover:text-amber-300">
                {roomState.roomCode}
              </span>
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400 ml-1" />
              ) : (
                <Copy className="w-4 h-4 text-amber-400/70 group-hover:text-amber-400 ml-1" />
              )}
            </button>

            {/* Leave Room Button */}
            <button
              type="button"
              onClick={onLeaveRoom}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 text-zinc-400 text-xs font-semibold tracking-wider transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Leave Room</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. PARTICIPANT BIDDING TABLES (2 TO 10 PARTICIPANTS) */}
      <div className="bg-[#0c0d14]/80 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white font-tech">
              Franchise Bidding Tables ({roomState.participants.length} / {roomState.maxParticipants})
            </h2>
          </div>

          {/* Quick Simulate Participant Button */}
          {emptySlotsCount > 0 && (
            <button
              type="button"
              onClick={onAddSimulatedParticipant}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400/10 border border-amber-400/30 hover:bg-amber-400 hover:text-black text-amber-300 text-xs font-semibold tracking-wider transition-all cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Add Test Bidder ({emptySlotsCount} left)</span>
            </button>
          )}
        </div>

        {/* Participants Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {/* Active Participants */}
          {roomState.participants.map((participant) => (
            <div
              key={participant.id}
              className={`p-3.5 rounded-xl border relative group transition-all ${
                participant.isHost
                  ? 'bg-amber-400/[0.05] border-amber-400/40 shadow-lg shadow-amber-400/5'
                  : 'bg-white/[0.02] border-white/10 hover:border-white/20'
              }`}
            >
              {participant.isHost && (
                <div className="absolute top-2.5 right-2.5 text-amber-400" title="Room Host">
                  <Crown className="w-3.5 h-3.5" />
                </div>
              )}

              {!participant.isHost && (
                <button
                  type="button"
                  onClick={() => onRemoveParticipant(participant.id)}
                  className="absolute top-2 right-2 p-1 text-zinc-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  title="Remove participant"
                >
                  <X className="w-3 h-3" />
                </button>
              )}

              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white truncate block">
                    {participant.name}
                  </span>
                </div>

                {/* Franchise Badge & Selector */}
                <div className="flex items-center gap-1.5">
                  <select
                    value={participant.teamCode || 'CSK'}
                    onChange={(e) => onUpdateTeam(participant.id, e.target.value as IPLTeamCode)}
                    className="bg-black/60 border border-white/10 text-amber-300 font-bold text-[10px] rounded px-1.5 py-0.5 focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    {IPL2026_AUCTION_RULES.franchises.map((f) => (
                      <option key={f.code} value={f.code}>
                        {f.code}
                      </option>
                    ))}
                  </select>
                  <span className="text-[10px] text-zinc-400 truncate">
                    {participant.teamName || 'Franchise'}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[9px] text-emerald-400 font-tech pt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Ready in Lobby</span>
                </div>
              </div>
            </div>
          ))}

          {/* Empty Waiting Slots */}
          {Array.from({ length: emptySlotsCount }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="p-3.5 rounded-xl border border-dashed border-white/10 bg-black/20 flex flex-col items-center justify-center text-center text-zinc-600 space-y-1 min-h-[90px]"
            >
              <Users className="w-4 h-4 opacity-50" />
              <span className="text-[10px] font-tech uppercase tracking-wider">
                Waiting Slot #{roomState.participants.length + i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. MAIN WORKSPACE: PLAYER POOL (LEFT) & PLAYER SELECTOR (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Shortlisted Player Pool */}
        <div className="lg:col-span-5 h-[620px]">
          <AuctionPlayerPool
            selectedPlayerIds={roomState.selectedPlayerIds}
            onRemovePlayer={onRemovePlayer}
            onClearPool={onClearPool}
          />
        </div>

        {/* Right Column: Database Search & IPL Year Ingestion */}
        <div className="lg:col-span-7 h-[620px]">
          <AuctionPlayerSelector
            selectedPlayerIds={roomState.selectedPlayerIds}
            onAddPlayer={onAddPlayer}
            onAddMultiplePlayers={onAddMultiplePlayers}
          />
        </div>
      </div>

      {/* 4. UPCOMING MILESTONE NOTICE */}
      <div className="p-4 rounded-2xl bg-amber-400/5 border border-amber-400/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-zinc-300">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Lobby Stage Complete:</strong> {roomState.selectedPlayerIds.length} players ready in room pool across {roomState.participants.length} bidding tables. Real-time auction engine & countdown timers will activate in the next milestone.
          </span>
        </div>
        <div className="px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 font-tech font-bold uppercase tracking-wider shrink-0 text-[10px]">
          IPL 2026 Rules Applied
        </div>
      </div>
    </div>
  );
};
