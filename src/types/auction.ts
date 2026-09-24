import type { IPLTeamCode, NormalizedPlayer } from './player';

/**
 * Authoritative Official IPL 2026 Mini-Auction Rules & Configurations
 * Sourced from IPL 2025-27 regulations & official 2026 auction directives.
 */
export const IPL2026_AUCTION_RULES = {
  format: 'mini-auction' as const,
  minSquadSize: 18,
  maxSquadSize: 25,
  maxOverseasPlayers: 8,
  rtmAvailable: false, // IPL 2026 mini-auction had no Right-To-Match (RTM)
  totalAvailableSlots: 77,
  totalFranchises: 10,
  shortlistedPoolSize: 350,
  basePriceTiers: [
    { value: 20000000, label: '₹2.00 Cr' },
    { value: 15000000, label: '₹1.50 Cr' },
    { value: 12500000, label: '₹1.25 Cr' },
    { value: 10000000, label: '₹1.00 Cr' },
    { value: 7500000, label: '₹75 Lakh' },
    { value: 5000000, label: '₹50 Lakh' },
    { value: 4000000, label: '₹40 Lakh' },
    { value: 3000000, label: '₹30 Lakh' },
  ],
  franchises: [
    { code: 'CSK' as IPLTeamCode, name: 'Chennai Super Kings', primaryColor: '#facc15' },
    { code: 'DC' as IPLTeamCode, name: 'Delhi Capitals', primaryColor: '#3b82f6' },
    { code: 'GT' as IPLTeamCode, name: 'Gujarat Titans', primaryColor: '#0ea5e9' },
    { code: 'KKR' as IPLTeamCode, name: 'Kolkata Knight Riders', primaryColor: '#8b5cf6' },
    { code: 'LSG' as IPLTeamCode, name: 'Lucknow Super Giants', primaryColor: '#06b6d4' },
    { code: 'MI' as IPLTeamCode, name: 'Mumbai Indians', primaryColor: '#2563eb' },
    { code: 'PBKS' as IPLTeamCode, name: 'Punjab Kings', primaryColor: '#ef4444' },
    { code: 'RR' as IPLTeamCode, name: 'Rajasthan Royals', primaryColor: '#ec4899' },
    { code: 'RCB' as IPLTeamCode, name: 'Royal Challengers Bengaluru', primaryColor: '#dc2626' },
    { code: 'SRH' as IPLTeamCode, name: 'Sunrisers Hyderabad', primaryColor: '#f97316' },
  ],
} as const;

export interface AuctionParticipant {
  id: string;
  name: string;
  isHost: boolean;
  teamCode?: IPLTeamCode;
  teamName?: string;
  isReady: boolean;
  joinedAt: string;
  avatarSeed?: string;
}

export interface AuctionRoomState {
  roomId: string;
  roomCode: string;
  roomName: string;
  hostId: string;
  hostName: string;
  maxParticipants: number; // 2 to 10
  participants: AuctionParticipant[];
  selectedPlayerIds: string[];
  createdAt: string;
  rules: typeof IPL2026_AUCTION_RULES;
  isLobbyOpen: boolean;
}

export interface IPLSeasonAvailability {
  year: number;
  label: string;
  isAvailable: boolean;
  playerCount: number;
  description: string;
  mappedPlayers?: NormalizedPlayer[];
}
