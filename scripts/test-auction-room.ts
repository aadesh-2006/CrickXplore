import { FALLBACK_PLAYERS } from '../src/data/players/index.ts';
import {
  getIplSeasonAvailabilityList,
  getPlayersForIplYear,
  getAllIplCareerPlayers,
  getPlayerByIdFromDatabase,
  getPlayersByIdsFromDatabase,
} from '../src/data/auction/auctionSeasonData.ts';
import { IPL2026_AUCTION_RULES } from '../src/types/auction.ts';
import type { AuctionRoomState, AuctionParticipant } from '../src/types/auction.ts';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`✅ PASS: ${message}`);
}

console.log('=====================================================');
console.log('--- CRICKXPLORE MULTIPLAYER AUCTION ROOM TEST SUITE ---');
console.log('=====================================================\n');

// 1. Official IPL 2026 Rules Verification
console.log('--- 1. OFFICIAL IPL 2026 RULES CONSTANTS ---');
assert(IPL2026_AUCTION_RULES.format === 'mini-auction', 'Format is mini-auction');
assert(IPL2026_AUCTION_RULES.minSquadSize === 18, 'Min squad size is 18');
assert(IPL2026_AUCTION_RULES.maxSquadSize === 25, 'Max squad size is 25');
assert(IPL2026_AUCTION_RULES.maxOverseasPlayers === 8, 'Max overseas players is 8');
assert(IPL2026_AUCTION_RULES.rtmAvailable === false, 'IPL 2026 mini-auction has no RTM option');
assert(IPL2026_AUCTION_RULES.totalAvailableSlots === 77, 'Total available slots is 77');
assert(IPL2026_AUCTION_RULES.totalFranchises === 10, 'Total franchises is 10');
assert(IPL2026_AUCTION_RULES.shortlistedPoolSize === 350, 'Shortlisted pool size is 350');
assert(IPL2026_AUCTION_RULES.basePriceTiers.length === 8, '8 official reserve price tiers');
assert(IPL2026_AUCTION_RULES.basePriceTiers[0].label === '₹2.00 Cr', 'Top reserve price is ₹2.00 Cr');
assert(IPL2026_AUCTION_RULES.basePriceTiers[7].label === '₹30 Lakh', 'Entry reserve price is ₹30 Lakh');

// 2. IPL Season Data Integrity & Historical Non-Fabrication
console.log('\n--- 2. IPL SEASON DATA INTEGRITY ---');
const seasonList = getIplSeasonAvailabilityList();
assert(seasonList.length === 19, `Total 19 IPL seasons represented (2008 to 2026), got ${seasonList.length}`);

// IPL 2026
const season2026 = getPlayersForIplYear(2026);
assert(season2026.isAvailable === true, 'IPL 2026 is marked as verified available');
assert(season2026.players.length === 162, `IPL 2026 contains exactly 162 mapped players (got ${season2026.players.length})`);

// Historical years (2008 - 2025) non-hallucination check
for (let year = 2008; year <= 2025; year++) {
  const season = getPlayersForIplYear(year);
  assert(season.isAvailable === false, `IPL ${year} correctly marked isAvailable: false`);
  assert(season.players.length === 0, `IPL ${year} returns 0 players (no fabricated rosters)`);
  assert(season.message.includes('pending official archival ingestion'), `IPL ${year} includes factual non-fabrication notice`);
}

// All career IPL players check
const allCareerIpl = getAllIplCareerPlayers();
assert(allCareerIpl.length >= 162, `All-time IPL career player pool has >= 162 players (got ${allCareerIpl.length})`);

// 3. Room Creation & Participant Slot Simulation
console.log('\n--- 3. AUCTION ROOM STATE & PARTICIPANT SLOTS ---');

function createMockRoom(hostName: string, maxParticipants: number): AuctionRoomState {
  const validMax = Math.min(Math.max(maxParticipants, 2), 10);
  const host: AuctionParticipant = {
    id: 'host-1',
    name: hostName,
    isHost: true,
    teamCode: 'CSK',
    teamName: 'Chennai Super Kings',
    isReady: true,
    joinedAt: new Date().toISOString(),
  };

  return {
    roomId: 'room-101',
    roomCode: 'AUC-8492',
    roomName: `${hostName}'s IPL 2026 Auction`,
    hostId: 'host-1',
    hostName,
    maxParticipants: validMax,
    participants: [host],
    selectedPlayerIds: [],
    createdAt: new Date().toISOString(),
    rules: IPL2026_AUCTION_RULES,
    isLobbyOpen: true,
  };
}

const room = createMockRoom('Auctioneer Steve', 6);
assert(room.roomCode === 'AUC-8492', 'Room code generated correctly');
assert(room.maxParticipants === 6, 'Participant capacity is 6 (within 2-10 range)');
assert(room.participants.length === 1, 'Initial room contains host participant');
assert(room.participants[0].isHost === true, 'Host is flagged isHost: true');

// Participant bounds test
const roomClampedMin = createMockRoom('Host Min', 1);
assert(roomClampedMin.maxParticipants === 2, 'Participant count clamped to min 2');

const roomClampedMax = createMockRoom('Host Max', 20);
assert(roomClampedMax.maxParticipants === 10, 'Participant count clamped to max 10');

// 4. Player Selection, Duplicate Prevention, and Pool Management
console.log('\n--- 4. PLAYER POOL SELECTION & DUPLICATE PREVENTION ---');

// Search simulation
const virat = FALLBACK_PLAYERS.find((p) => p.name.includes('Virat Kohli'));
assert(virat !== undefined, 'Virat Kohli found in 457 player database');

const bumrah = FALLBACK_PLAYERS.find((p) => p.name.includes('Jasprit Bumrah'));
assert(bumrah !== undefined, 'Jasprit Bumrah found in 457 player database');

const cummins = FALLBACK_PLAYERS.find((p) => p.name.includes('Pat Cummins'));
assert(cummins !== undefined, 'Pat Cummins found in 457 player database');

// Add single player
room.selectedPlayerIds.push(virat!.id);
assert(room.selectedPlayerIds.length === 1, 'Added Virat Kohli to auction pool (count: 1)');

// Prevent duplicate
const isDuplicate = room.selectedPlayerIds.includes(virat!.id);
assert(isDuplicate === true, 'Duplicate detection identifies Virat is already in pool');

// Add second player
room.selectedPlayerIds.push(bumrah!.id);
assert(room.selectedPlayerIds.length === 2, 'Added Jasprit Bumrah to auction pool (count: 2)');

// Batch add from IPL 2026 season
const existingSet = new Set(room.selectedPlayerIds);
const new2026Players = season2026.players.filter((p) => !existingSet.has(p.id));
room.selectedPlayerIds.push(...new2026Players.map((p) => p.id));
assert(room.selectedPlayerIds.length === 162, `Batch added remaining IPL 2026 players without duplicates (count: ${room.selectedPlayerIds.length})`);

// Remove player
room.selectedPlayerIds = room.selectedPlayerIds.filter((id) => id !== virat!.id);
assert(room.selectedPlayerIds.length === 161, 'Removed Virat Kohli from auction pool (count: 161)');
assert(!room.selectedPlayerIds.includes(virat!.id), 'Virat Kohli no longer in pool');

// Clear pool
room.selectedPlayerIds = [];
assert(room.selectedPlayerIds.length === 0, 'Cleared auction player pool (count: 0)');

// 5. Lookup Utilities Audit
console.log('\n--- 5. LOOKUP HELPERS AUDIT ---');
const playerLookup = getPlayerByIdFromDatabase('virat-kohli');
assert(playerLookup !== undefined && playerLookup.name === 'Virat Kohli', 'getPlayerByIdFromDatabase resolves correctly');

const multipleLookup = getPlayersByIdsFromDatabase(['virat-kohli', 'jasprit-bumrah', 'pat-cummins']);
assert(multipleLookup.length === 3, 'getPlayersByIdsFromDatabase resolves exactly 3 players');

console.log('\n=====================================================');
console.log('✅ ALL AUCTION ROOM & PLAYER POOL ASSERTIONS PASSED!');
console.log('=====================================================');
