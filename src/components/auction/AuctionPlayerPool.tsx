import React, { useState, useMemo } from 'react';
import { Trash2, Users, Search, Gavel } from 'lucide-react';
import { getPlayersByIdsFromDatabase } from '../../data/auction/auctionSeasonData.ts';
import type { PlayerRole } from '../../types/player.ts';

interface AuctionPlayerPoolProps {
  selectedPlayerIds: string[];
  onRemovePlayer: (playerId: string) => void;
  onClearPool: () => void;
}

export const AuctionPlayerPool: React.FC<AuctionPlayerPoolProps> = ({
  selectedPlayerIds,
  onRemovePlayer,
  onClearPool,
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<PlayerRole | 'all'>('all');

  // Load actual NormalizedPlayer objects for selected IDs
  const poolPlayers = useMemo(
    () => getPlayersByIdsFromDatabase(selectedPlayerIds),
    [selectedPlayerIds]
  );

  // Breakdown metrics
  const metrics = useMemo(() => {
    let batters = 0;
    let bowlers = 0;
    let allRounders = 0;
    let keepers = 0;
    let indian = 0;
    let overseas = 0;

    for (const p of poolPlayers) {
      if (p.role === 'batter') batters++;
      else if (p.role === 'bowler') bowlers++;
      else if (p.role === 'all-rounder') allRounders++;
      else if (p.role === 'wicket-keeper') keepers++;

      if (p.country === 'India') indian++;
      else overseas++;
    }

    return {
      total: poolPlayers.length,
      batters,
      bowlers,
      allRounders,
      keepers,
      indian,
      overseas,
    };
  }, [poolPlayers]);

  // Filtered pool items
  const filteredPool = useMemo(() => {
    const q = filterQuery.trim().toLowerCase();
    return poolPlayers.filter((p) => {
      if (roleFilter !== 'all' && p.role !== roleFilter) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.country.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q) ||
        (p.ipl2026Team && p.ipl2026Team.toLowerCase().includes(q))
      );
    });
  }, [poolPlayers, filterQuery, roleFilter]);

  return (
    <div className="bg-[#0c0d14]/90 border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-xl shadow-xl flex flex-col h-full">
      {/* Pool Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Gavel className="w-4 h-4 text-amber-400" />
            <h2 className="text-base font-serif-luxury font-bold text-white tracking-wide">
              Auction Player Pool
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold font-tech text-xs border border-amber-400/30">
              {metrics.total} Players Selected
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 font-light mt-0.5">
            Shortlisted catalogue of players ready for bidding in this room
          </p>
        </div>

        {/* Clear Pool Button */}
        {metrics.total > 0 && (
          <button
            type="button"
            onClick={onClearPool}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 text-xs font-semibold tracking-wider transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Pool</span>
          </button>
        )}
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
        <div className="bg-black/40 border border-white/5 rounded-xl p-2 text-center">
          <span className="block text-[10px] uppercase font-tech text-zinc-500">Batters</span>
          <span className="text-sm font-bold text-amber-300">{metrics.batters}</span>
        </div>
        <div className="bg-black/40 border border-white/5 rounded-xl p-2 text-center">
          <span className="block text-[10px] uppercase font-tech text-zinc-500">Bowlers</span>
          <span className="text-sm font-bold text-amber-300">{metrics.bowlers}</span>
        </div>
        <div className="bg-black/40 border border-white/5 rounded-xl p-2 text-center">
          <span className="block text-[10px] uppercase font-tech text-zinc-500">All-Round</span>
          <span className="text-sm font-bold text-amber-300">{metrics.allRounders}</span>
        </div>
        <div className="bg-black/40 border border-white/5 rounded-xl p-2 text-center">
          <span className="block text-[10px] uppercase font-tech text-zinc-500">Keepers</span>
          <span className="text-sm font-bold text-amber-300">{metrics.keepers}</span>
        </div>
        <div className="bg-black/40 border border-white/5 rounded-xl p-2 text-center">
          <span className="block text-[10px] uppercase font-tech text-zinc-500">Indian</span>
          <span className="text-sm font-bold text-white">{metrics.indian}</span>
        </div>
        <div className="bg-black/40 border border-white/5 rounded-xl p-2 text-center">
          <span className="block text-[10px] uppercase font-tech text-zinc-500">Overseas</span>
          <span className="text-sm font-bold text-white">{metrics.overseas}</span>
        </div>
      </div>

      {/* Pool Search / Role Filter */}
      {metrics.total > 0 && (
        <div className="flex flex-col sm:flex-row gap-2 mb-3">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Filter shortlisted pool..."
              className="w-full bg-black/40 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex gap-1 overflow-x-auto">
            {(['all', 'batter', 'bowler', 'all-rounder', 'wicket-keeper'] as const).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setRoleFilter(role)}
                className={`px-2 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
                  roleFilter === role
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                    : 'bg-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                {role === 'all' ? 'All' : role === 'all-rounder' ? 'AR' : role === 'wicket-keeper' ? 'WK' : role}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected Players List */}
      <div className="flex-1 min-h-[300px] max-h-[460px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
        {metrics.total === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center text-zinc-500 space-y-3">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-300">Auction Pool is Empty</p>
              <p className="text-xs text-zinc-500 max-w-xs mt-1">
                Add players using the search catalog or import the verified IPL 2026 season pool from the right.
              </p>
            </div>
          </div>
        ) : filteredPool.length === 0 ? (
          <div className="text-center py-12 text-zinc-500 text-xs">
            No players in pool match filter "{filterQuery}".
          </div>
        ) : (
          filteredPool.map((player) => (
            <div
              key={player.id}
              className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center shrink-0 text-[10px] font-bold text-amber-300">
                  {player.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-white truncate">
                      {player.name}
                    </span>
                    {player.ipl2026Team && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-400/10 text-amber-300 border border-amber-400/20">
                        {player.ipl2026Team}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-tech">
                    <span>{player.country}</span>
                    <span>•</span>
                    <span className="capitalize">{player.role}</span>
                  </div>
                </div>
              </div>

              {/* Remove Action */}
              <button
                type="button"
                onClick={() => onRemovePlayer(player.id)}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                title="Remove from auction pool"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
