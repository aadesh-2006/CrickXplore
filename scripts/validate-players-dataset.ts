import { FALLBACK_PLAYERS } from '../src/data/players';
import type { NormalizedPlayer } from '../src/types/player';

console.log('=====================================================');
console.log('--- CRICKXPLORE EXPANDED PLAYERS DATASET VALIDATOR ---');
console.log('=====================================================');

let errorsCount = 0;

function assert(condition: boolean, passMsg: string, failMsg: string) {
  if (condition) {
    console.log(`✅ PASS: ${passMsg}`);
  } else {
    console.error(`❌ FAIL: ${failMsg}`);
    errorsCount++;
  }
}

const totalPlayers = FALLBACK_PLAYERS.length;
console.log(`Total Players Loaded: ${totalPlayers}`);

assert(totalPlayers >= 200, `Dataset contains ${totalPlayers} players (>= 200 required)`, `Dataset contains only ${totalPlayers} players (< 200)`);

// Check unique IDs
const idSet = new Set<string>();
const duplicateIds: string[] = [];
for (const p of FALLBACK_PLAYERS) {
  if (!p.id || p.id.trim().length === 0) {
    errorsCount++;
    console.error(`Player missing ID: ${p.name}`);
  } else if (idSet.has(p.id)) {
    duplicateIds.push(p.id);
    errorsCount++;
  } else {
    idSet.add(p.id);
  }
}
assert(duplicateIds.length === 0, 'All player IDs are strictly unique', `Found duplicate IDs: ${duplicateIds.join(', ')}`);

// Check countries and roles
const validRoles = new Set(['batter', 'bowler', 'all-rounder', 'wicket-keeper']);
const countryCounts: Record<string, number> = {};
const roleCounts: Record<string, number> = {};

for (const p of FALLBACK_PLAYERS) {
  // Role
  if (!validRoles.has(p.role)) {
    errorsCount++;
    console.error(`Invalid role "${p.role}" for player ${p.name}`);
  }
  roleCounts[p.role] = (roleCounts[p.role] || 0) + 1;

  // Country
  if (!p.country || p.country.trim().length === 0) {
    errorsCount++;
    console.error(`Missing country for player ${p.name}`);
  }
  countryCounts[p.country] = (countryCounts[p.country] || 0) + 1;

  // Stats verification
  const formats: ('test' | 'odi' | 't20i')[] = ['test', 'odi', 't20i'];
  for (const fmt of formats) {
    const fStats = p.stats[fmt];
    if (!fStats) continue;

    if (fStats.batting) {
      const b = fStats.batting;
      if (typeof b.matches !== 'number' || Number.isNaN(b.matches)) {
        errorsCount++;
        console.error(`Invalid batting matches for ${p.name} in ${fmt}`);
      }
      if (typeof b.runs !== 'number' || Number.isNaN(b.runs)) {
        errorsCount++;
        console.error(`Invalid batting runs for ${p.name} in ${fmt}`);
      }
      if (b.average !== null && b.average !== undefined && (typeof b.average !== 'number' || Number.isNaN(b.average))) {
        errorsCount++;
        console.error(`Invalid batting average for ${p.name} in ${fmt}`);
      }
      if (b.strikeRate !== null && b.strikeRate !== undefined && (typeof b.strikeRate !== 'number' || Number.isNaN(b.strikeRate))) {
        errorsCount++;
        console.error(`Invalid batting strikeRate for ${p.name} in ${fmt}`);
      }
    }

    if (fStats.bowling) {
      const bw = fStats.bowling;
      if (typeof bw.matches !== 'number' || Number.isNaN(bw.matches)) {
        errorsCount++;
        console.error(`Invalid bowling matches for ${p.name} in ${fmt}`);
      }
      if (typeof bw.wickets !== 'number' || Number.isNaN(bw.wickets)) {
        errorsCount++;
        console.error(`Invalid bowling wickets for ${p.name} in ${fmt}`);
      }
      if (bw.economy !== null && bw.economy !== undefined && (typeof bw.economy !== 'number' || Number.isNaN(bw.economy))) {
        errorsCount++;
        console.error(`Invalid bowling economy for ${p.name} in ${fmt}`);
      }
      if (bw.average !== null && bw.average !== undefined && (typeof bw.average !== 'number' || Number.isNaN(bw.average))) {
        errorsCount++;
        console.error(`Invalid bowling average for ${p.name} in ${fmt}`);
      }
    }
  }
}

console.log('\n--- ROLE BREAKDOWN ---');
for (const [role, count] of Object.entries(roleCounts)) {
  console.log(`  ${role.padEnd(16)}: ${count}`);
}

console.log('\n--- COUNTRY BREAKDOWN ---');
for (const [country, count] of Object.entries(countryCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${country.padEnd(24)}: ${count}`);
}

console.log(`\nCountries Count: ${Object.keys(countryCounts).length}`);
assert(Object.keys(countryCounts).length >= 10, 'At least 10 nations represented', 'Fewer than 10 nations represented');

// IPL 2026 Team Coverage Check
const iplTeams = ['CSK', 'DC', 'GT', 'KKR', 'LSG', 'MI', 'PBKS', 'RR', 'RCB', 'SRH'] as const;
const iplCounts: Record<string, { total: number; keyXI: number; impactOrDepth: number; players: string[] }> = {};

for (const team of iplTeams) {
  iplCounts[team] = { total: 0, keyXI: 0, impactOrDepth: 0, players: [] };
}

let totalIplPlayers = 0;
for (const p of FALLBACK_PLAYERS) {
  if (p.ipl2026Team) {
    totalIplPlayers++;
    const t = p.ipl2026Team;
    if (iplCounts[t]) {
      iplCounts[t].total++;
      if (p.ipl2026?.isKeyXI) {
        iplCounts[t].keyXI++;
      } else {
        iplCounts[t].impactOrDepth++;
      }
      iplCounts[t].players.push(p.name);
    } else {
      errorsCount++;
      console.error(`Unknown IPL team "${t}" for player ${p.name}`);
    }
  }
}

console.log('\n--- IPL 2026 FRANCHISE COVERAGE ---');
for (const team of iplTeams) {
  const data = iplCounts[team];
  console.log(`  ${team.padEnd(6)}: ${data.total} covered (${data.keyXI} Main XI, ${data.impactOrDepth} Impact/Depth)`);
  assert(data.total >= 15, `${team} has ${data.total} players (>= 15 required)`, `${team} has only ${data.total} players (< 15)`);
}

console.log(`\nTotal IPL 2026 Tagged Players: ${totalIplPlayers}`);
assert(totalIplPlayers >= 150, `At least 150 IPL 2026 players mapped across all 10 franchises (${totalIplPlayers} total)`, `Only ${totalIplPlayers} IPL players mapped`);

if (errorsCount === 0) {
  console.log('\n=====================================================');
  console.log('✅ ALL VALIDATION CHECKS PASSED PERFECTLY!');
  console.log('=====================================================');
  process.exit(0);
} else {
  console.error(`\n❌ Validation failed with ${errorsCount} errors.`);
  process.exit(1);
}
