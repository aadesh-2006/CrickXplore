import { useState, useEffect, useCallback } from 'react';
import type {
  AuctionRoomState,
  AuctionParticipant,
} from '../types/auction.ts';
import { IPL2026_AUCTION_RULES } from '../types/auction.ts';
import type { IPLTeamCode } from '../types/player.ts';

const STORAGE_KEY = 'crickxplore_auction_room_state_v1';

function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'AUC-';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function useAuctionRoom() {
  const [roomState, setRoomState] = useState<AuctionRoomState | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved) as AuctionRoomState;
      }
    } catch {
      // Ignore localstorage errors
    }
    return null;
  });

  // Persist state changes
  useEffect(() => {
    try {
      if (roomState) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(roomState));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Ignore localstorage write errors
    }
  }, [roomState]);

  /**
   * Creates a new auction room
   */
  const createRoom = useCallback((
    hostName: string,
    maxParticipants = 6,
    initialTeamCode?: IPLTeamCode
  ): AuctionRoomState => {
    const cleanHostName = hostName.trim() || 'Host Bidder';
    const hostId = `bidder-${Date.now()}-host`;
    const roomCode = generateRoomCode();
    const roomId = `room-${Date.now()}`;

    const hostParticipant: AuctionParticipant = {
      id: hostId,
      name: cleanHostName,
      isHost: true,
      teamCode: initialTeamCode || 'CSK',
      teamName: IPL2026_AUCTION_RULES.franchises.find((f) => f.code === (initialTeamCode || 'CSK'))?.name,
      isReady: true,
      joinedAt: new Date().toISOString(),
    };

    const newRoom: AuctionRoomState = {
      roomId,
      roomCode,
      roomName: `${cleanHostName}'s IPL 2026 Auction`,
      hostId,
      hostName: cleanHostName,
      maxParticipants: Math.min(Math.max(maxParticipants, 2), 10),
      participants: [hostParticipant],
      selectedPlayerIds: [],
      createdAt: new Date().toISOString(),
      rules: IPL2026_AUCTION_RULES,
      isLobbyOpen: true,
    };

    setRoomState(newRoom);
    return newRoom;
  }, []);

  /**
   * Joins an existing room by code
   */
  const joinRoom = useCallback((
    roomCode: string,
    participantName: string,
    teamCode?: IPLTeamCode
  ): { success: boolean; message: string } => {
    const cleanCode = roomCode.trim().toUpperCase();
    const cleanName = participantName.trim() || 'Guest Bidder';

    if (!roomState || roomState.roomCode !== cleanCode) {
      // Simulate creating or joining local mock room if no match
      return {
        success: false,
        message: `Room code "${cleanCode}" not found in current local session. You can create a new room.`,
      };
    }

    if (roomState.participants.length >= roomState.maxParticipants) {
      return {
        success: false,
        message: `Room is full (Maximum ${roomState.maxParticipants} participants).`,
      };
    }

    // Check if name or team is already taken
    const existing = roomState.participants.find(
      (p) => p.name.toLowerCase() === cleanName.toLowerCase()
    );
    if (existing) {
      return {
        success: false,
        message: `A participant named "${cleanName}" is already in the room.`,
      };
    }

    // Choose unused team if not provided
    const usedTeams = new Set(roomState.participants.map((p) => p.teamCode));
    const assignedTeam = teamCode || IPL2026_AUCTION_RULES.franchises.find((f) => !usedTeams.has(f.code))?.code || 'MI';

    const newParticipant: AuctionParticipant = {
      id: `bidder-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: cleanName,
      isHost: false,
      teamCode: assignedTeam,
      teamName: IPL2026_AUCTION_RULES.franchises.find((f) => f.code === assignedTeam)?.name,
      isReady: true,
      joinedAt: new Date().toISOString(),
    };

    setRoomState((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        participants: [...prev.participants, newParticipant],
      };
    });

    return { success: true, message: `Joined ${roomState.roomName} successfully!` };
  }, [roomState]);

  /**
   * Adds a single player to the room auction pool (prevents duplicates)
   */
  const addPlayerToPool = useCallback((playerId: string): boolean => {
    if (!roomState) return false;
    if (roomState.selectedPlayerIds.includes(playerId)) {
      return false; // Duplicate
    }

    setRoomState((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        selectedPlayerIds: [...prev.selectedPlayerIds, playerId],
      };
    });
    return true;
  }, [roomState]);

  /**
   * Removes a player from the auction pool
   */
  const removePlayerFromPool = useCallback((playerId: string): void => {
    setRoomState((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        selectedPlayerIds: prev.selectedPlayerIds.filter((id) => id !== playerId),
      };
    });
  }, []);

  /**
   * Adds multiple players at once (e.g. from IPL 2026 season loader)
   */
  const addMultiplePlayersToPool = useCallback((playerIds: string[]): number => {
    if (!roomState) return 0;
    const existingSet = new Set(roomState.selectedPlayerIds);
    const toAdd = playerIds.filter((id) => !existingSet.has(id));

    if (toAdd.length === 0) return 0;

    setRoomState((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        selectedPlayerIds: [...prev.selectedPlayerIds, ...toAdd],
      };
    });
    return toAdd.length;
  }, [roomState]);

  /**
   * Clears the entire auction player pool
   */
  const clearPlayerPool = useCallback((): void => {
    setRoomState((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        selectedPlayerIds: [],
      };
    });
  }, []);

  /**
   * Changes participant capacity (2 to 10)
   */
  const setMaxParticipants = useCallback((count: number): void => {
    const validCount = Math.min(Math.max(count, 2), 10);
    setRoomState((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        maxParticipants: validCount,
      };
    });
  }, []);

  /**
   * Updates a participant's assigned franchise team
   */
  const updateParticipantTeam = useCallback((participantId: string, teamCode: IPLTeamCode): void => {
    setRoomState((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        participants: prev.participants.map((p) => {
          if (p.id !== participantId) return p;
          return {
            ...p,
            teamCode,
            teamName: IPL2026_AUCTION_RULES.franchises.find((f) => f.code === teamCode)?.name,
          };
        }),
      };
    });
  }, []);

  /**
   * Adds a simulated local participant for multiplayer testing (2 to 10)
   */
  const addSimulatedParticipant = useCallback((): boolean => {
    if (!roomState || roomState.participants.length >= roomState.maxParticipants) {
      return false;
    }

    const usedTeams = new Set(roomState.participants.map((p) => p.teamCode));
    const availableFranchise = IPL2026_AUCTION_RULES.franchises.find((f) => !usedTeams.has(f.code));
    const teamCode = availableFranchise ? availableFranchise.code : 'GT';
    const teamName = availableFranchise ? availableFranchise.name : 'Gujarat Titans';

    const index = roomState.participants.length + 1;
    const mockNames = ['Tactical Coach', 'Analyst Dave', 'Scout Sharma', 'Owner Priya', 'Director Smith', 'Strategy Lead', 'Head Coach', 'Manager Ray', 'Chief Scout'];
    const assignedName = `${mockNames[(index - 2) % mockNames.length]} (${teamCode})`;

    const newParticipant: AuctionParticipant = {
      id: `sim-bidder-${Date.now()}-${index}`,
      name: assignedName,
      isHost: false,
      teamCode,
      teamName,
      isReady: true,
      joinedAt: new Date().toISOString(),
    };

    setRoomState((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        participants: [...prev.participants, newParticipant],
      };
    });
    return true;
  }, [roomState]);

  /**
   * Removes a participant from the room
   */
  const removeParticipant = useCallback((participantId: string): void => {
    setRoomState((prev) => {
      if (!prev) return null;
      // Do not remove the host
      if (participantId === prev.hostId) return prev;
      return {
        ...prev,
        participants: prev.participants.filter((p) => p.id !== participantId),
      };
    });
  }, []);

  /**
   * Leaves or resets the room
   */
  const leaveRoom = useCallback((): void => {
    setRoomState(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore error
    }
  }, []);

  return {
    roomState,
    createRoom,
    joinRoom,
    addPlayerToPool,
    removePlayerFromPool,
    addMultiplePlayersToPool,
    clearPlayerPool,
    setMaxParticipants,
    updateParticipantTeam,
    addSimulatedParticipant,
    removeParticipant,
    leaveRoom,
  };
}
