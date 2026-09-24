import { FALLBACK_PLAYERS } from '../src/data/players';
import type { NormalizedPlayer, FormatType } from '../src/types/player';

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

assert(totalPlayers >= 457, `Dataset contains ${totalPlayers} players (>= 457 required)`, `Dataset contains only ${totalPlayers} players (< 457)`);

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

let nanCount = 0;
let negativeStatCount = 0;
let invalidAverageCount = 0;
let invalidStrikeRateCount = 0;
let invalidEconomyCount = 0;

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
  const formats: FormatType[] = ['test', 'odi', 't20i'];
  for (const fmt of formats) {
    const fStats = p.stats[fmt];
    if (!fStats) continue;

    if (fStats.batting) {
      const b = fStats.batting;
      if (typeof b.matches !== 'number' || Number.isNaN(b.matches) || !Number.isFinite(b.matches)) {
        nanCount++;
        console.error(`Invalid batting matches for ${p.name} in ${fmt}`);
      } else if (b.matches < 0) {
        negativeStatCount++;
      }

      if (typeof b.runs !== 'number' || Number.isNaN(b.runs) || !Number.isFinite(b.runs)) {
        nanCount++;
        console.error(`Invalid batting runs for ${p.name} in ${fmt}`);
      } else if (b.runs < 0) {
        negativeStatCount++;
      }

      if (b.average !== null && b.average !== undefined) {
        if (typeof b.average !== 'number' || Number.isNaN(b.average) || !Number.isFinite(b.average)) {
          nanCount++;
          console.error(`Invalid batting average for ${p.name} in ${fmt}`);
        } else if (b.average < 0) {
          invalidAverageCount++;
        }
      }

      if (b.strikeRate !== null && b.strikeRate !== undefined) {
        if (typeof b.strikeRate !== 'number' || Number.isNaN(b.strikeRate) || !Number.isFinite(b.strikeRate)) {
          nanCount++;
          console.error(`Invalid batting strikeRate for ${p.name} in ${fmt}`);
        } else if (b.strikeRate < 0) {
          invalidStrikeRateCount++;
        }
      }
    }

    if (fStats.bowling) {
      const bw = fStats.bowling;
      if (typeof bw.matches !== 'number' || Number.isNaN(bw.matches) || !Number.isFinite(bw.matches)) {
        nanCount++;
        console.error(`Invalid bowling matches for ${p.name} in ${fmt}`);
      } else if (bw.matches < 0) {
        negativeStatCount++;
      }

      if (typeof bw.wickets !== 'number' || Number.isNaN(bw.wickets) || !Number.isFinite(bw.wickets)) {
        nanCount++;
        console.error(`Invalid bowling wickets for ${p.name} in ${fmt}`);
      } else if (bw.wickets < 0) {
        negativeStatCount++;
      }

      if (bw.economy !== null && bw.economy !== undefined) {
        if (typeof bw.economy !== 'number' || Number.isNaN(bw.economy) || !Number.isFinite(bw.economy)) {
          nanCount++;
          console.error(`Invalid bowling economy for ${p.name} in ${fmt}`);
        } else if (bw.economy < 0) {
          invalidEconomyCount++;
        }
      }

      if (bw.average !== null && bw.average !== undefined) {
        if (typeof bw.average !== 'number' || Number.isNaN(bw.average) || !Number.isFinite(bw.average)) {
          nanCount++;
          console.error(`Invalid bowling average for ${p.name} in ${fmt}`);
        } else if (bw.average < 0) {
          invalidAverageCount++;
        }
      }

      if (bw.strikeRate !== null && bw.strikeRate !== undefined) {
        if (typeof bw.strikeRate !== 'number' || Number.isNaN(bw.strikeRate) || !Number.isFinite(bw.strikeRate)) {
          nanCount++;
          console.error(`Invalid bowling strikeRate for ${p.name} in ${fmt}`);
        } else if (bw.strikeRate < 0) {
          invalidStrikeRateCount++;
        }
      }
    }
  }
}

assert(nanCount === 0, 'No NaN or non-finite numbers detected in dataset', `Found ${nanCount} NaN or non-finite stats`);
assert(negativeStatCount === 0, 'No negative match or run or wicket counts', `Found ${negativeStatCount} negative counts`);
assert(invalidAverageCount === 0, 'All batting & bowling averages are non-negative', `Found ${invalidAverageCount} negative averages`);
assert(invalidStrikeRateCount === 0, 'All strike rates are non-negative', `Found ${invalidStrikeRateCount} negative strike rates`);
assert(invalidEconomyCount === 0, 'All economy rates are non-negative', `Found ${invalidEconomyCount} negative economy rates`);

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
assert(totalIplPlayers === 162, `IPL 2026 mapped players count is exactly 162 (${totalIplPlayers} total)`, `IPL player count changed to ${totalIplPlayers}`);

if (errorsCount === 0) {
  console.log('\n=====================================================');
  console.log('✅ ALL VALIDATION CHECKS PASSED PERFECTLY!');
  console.log('=====================================================');
  process.exit(0);
} else {
  console.error(`\n❌ Validation failed with ${errorsCount} errors.`);
  process.exit(1);
}
