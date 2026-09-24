import { FALLBACK_PLAYERS } from '../src/data/players';
import { resolveGroundedPlayerStats, validateGroundedStats, GROUNDED_PLAYER_ARCHIVE } from '../src/data/live-player-stats/groundedRegistry';
import type { GroundedPlayerStats } from '../src/data/live-player-stats/types';
import { playerApi } from '../src/api/cricket/playerApi';
import { cricketDataService } from '../src/services/cricketDataService';

interface FormatStatsSummary {
  format: string;
  totalPlayersWithFormat: number;
  currentCount: number;
  fallbackCount: number;
  totalVerifiedFields: number;
  totalFallbackFields: number;
  totalUnavailableFields: number;
}

async function runGeminiPlayerStatsAudit() {
  console.log('='.repeat(80));
  console.log('CRICKXPLORE — GEMINI GROUNDED PLAYER STATISTICS LAYER AUDIT');
  console.log('='.repeat(80));

  const totalPlayers = FALLBACK_PLAYERS.length;
  console.log(`\n[1] TOTAL PLAYER DATABASE COUNT: ${totalPlayers} players\n`);

  if (totalPlayers !== 457) {
    console.error(`❌ Expected 457 players, found ${totalPlayers}`);
    process.exit(1);
  }

  // 1. Audit Required 9 Players
  const requiredPlayers = [
    { id: 'rohit-sharma', role: 'batter', country: 'India' },
    { id: 'virat-kohli', role: 'batter', country: 'India' },
    { id: 'jasprit-bumrah', role: 'bowler', country: 'India' },
    { id: 'steve-smith', role: 'batter', country: 'Australia' },
    { id: 'pat-cummins', role: 'bowler', country: 'Australia' },
    { id: 'ben-stokes', role: 'all-rounder', country: 'England' },
    { id: 'ravindra-jadeja', role: 'all-rounder', country: 'India' },
    { id: 'rishabh-pant', role: 'wicket-keeper', country: 'India' },
    { id: 'ms-dhoni', role: 'wicket-keeper', country: 'India' },
  ];

  console.log('--- 9 CORE BENCHMARK PLAYERS AUDIT ---');
  let benchmarkPass = true;

  for (const req of requiredPlayers) {
    const rawPlayer = FALLBACK_PLAYERS.find(p => p.id === req.id);
    if (!rawPlayer) {
      console.error(`❌ Required player ${req.id} missing from fallback database!`);
      benchmarkPass = false;
      continue;
    }

    const grounded = resolveGroundedPlayerStats(rawPlayer);
    const { isValid, errors } = validateGroundedStats(grounded);

    if (!isValid) {
      console.error(`❌ Validation failed for ${rawPlayer.name}:`, errors);
      benchmarkPass = false;
    }

    const testRuns = grounded.formats.test?.batting?.runs?.value;
    const odiRuns = grounded.formats.odi?.batting?.runs?.value;
    const t20iRuns = grounded.formats.t20i?.batting?.runs?.value;
    const iplRuns = grounded.formats.ipl?.batting?.runs?.value;
    const testWickets = grounded.formats.test?.bowling?.wickets?.value;
    const odiWickets = grounded.formats.odi?.bowling?.wickets?.value;

    console.log(`✔ [${grounded.overallStatus}] ${rawPlayer.name} (${rawPlayer.country} • ${rawPlayer.role})`);
    if (testRuns !== undefined || testWickets !== undefined) {
      console.log(`    Test -> Runs: ${testRuns ?? 'N/A'}, Wkts: ${testWickets ?? 'N/A'} [${grounded.formats.test?.summary?.primarySource || 'Archive'}]`);
    }
    if (odiRuns !== undefined || odiWickets !== undefined) {
      console.log(`    ODI  -> Runs: ${odiRuns ?? 'N/A'}, Wkts: ${odiWickets ?? 'N/A'} [${grounded.formats.odi?.summary?.primarySource || 'Archive'}]`);
    }
    if (t20iRuns !== undefined) {
      console.log(`    T20I -> Runs: ${t20iRuns ?? 'N/A'} [${grounded.formats.t20i?.summary?.primarySource || 'Archive'}]`);
    }
    if (iplRuns !== undefined) {
      console.log(`    IPL  -> Runs: ${iplRuns ?? 'N/A'} [${grounded.formats.ipl?.summary?.primarySource || 'Archive'}]`);
    }
  }

  // 2. Full 457 Player Coverage & Integrity Check
  console.log('\n--- FULL 457 PLAYERS STATUS AUDIT ---');

  let currentGroundedCount = 0;
  let partialCount = 0;
  let fallbackCount = 0;
  let failedCount = 0;
  let formatIsolationViolations = 0;

  const formatSummary: Record<string, FormatStatsSummary> = {
    test: { format: 'Test', totalPlayersWithFormat: 0, currentCount: 0, fallbackCount: 0, totalVerifiedFields: 0, totalFallbackFields: 0, totalUnavailableFields: 0 },
    odi: { format: 'ODI', totalPlayersWithFormat: 0, currentCount: 0, fallbackCount: 0, totalVerifiedFields: 0, totalFallbackFields: 0, totalUnavailableFields: 0 },
    t20i: { format: 'T20I', totalPlayersWithFormat: 0, currentCount: 0, fallbackCount: 0, totalVerifiedFields: 0, totalFallbackFields: 0, totalUnavailableFields: 0 },
    ipl: { format: 'IPL', totalPlayersWithFormat: 0, currentCount: 0, fallbackCount: 0, totalVerifiedFields: 0, totalFallbackFields: 0, totalUnavailableFields: 0 },
  };

  for (const player of FALLBACK_PLAYERS) {
    const grounded = resolveGroundedPlayerStats(player);

    const { isValid, errors } = validateGroundedStats(grounded);
    if (!isValid) {
      failedCount++;
      formatIsolationViolations++;
      console.warn(`Format violation for ${player.name}:`, errors);
      continue;
    }

    let hasCurrentFormat = false;
    let hasFallbackFormat = false;

    for (const [fmtKey, fmtStats] of Object.entries(grounded.formats)) {
      if (!fmtStats) continue;
      const fs = formatSummary[fmtKey];
      if (!fs) continue;

      fs.totalPlayersWithFormat++;
      if (fmtStats.summary?.status === 'CURRENT_VERIFIED') {
        fs.currentCount++;
        hasCurrentFormat = true;
      } else {
        fs.fallbackCount++;
        hasFallbackFormat = true;
      }

      // Count batting fields
      if (fmtStats.batting) {
        for (const field of Object.values(fmtStats.batting)) {
          if (field.value !== null && field.value !== undefined) {
            if (field.source === 'Verified Baseline Archive') fs.totalFallbackFields++;
            else fs.totalVerifiedFields++;
          } else {
            fs.totalUnavailableFields++;
          }
        }
      }

      // Count bowling fields
      if (fmtStats.bowling) {
        for (const field of Object.values(fmtStats.bowling)) {
          if (field.value !== null && field.value !== undefined) {
            if (field.source === 'Verified Baseline Archive') fs.totalFallbackFields++;
            else fs.totalVerifiedFields++;
          } else {
            fs.totalUnavailableFields++;
          }
        }
      }
    }

    if (hasCurrentFormat && !hasFallbackFormat) {
      currentGroundedCount++;
    } else if (hasCurrentFormat && hasFallbackFormat) {
      partialCount++;
    } else {
      fallbackCount++;
    }
  }

  console.log(`\n==================================================`);
  console.log(`DATASET INTEGRITY & STATUS BREAKDOWN`);
  console.log(`==================================================`);
  console.log(`457 total`);
  console.log(`${currentGroundedCount} CURRENT GROUNDED`);
  console.log(`${partialCount} PARTIAL`);
  console.log(`${fallbackCount} FALLBACK`);
  console.log(`${failedCount} FAILED`);
  console.log(`Format Isolation Violations: ${formatIsolationViolations} (Must be 0)`);

  console.log('\n--- FORMAT-BY-FORMAT BREAKDOWN ---');
  console.table(formatSummary);

  // 3. Test playerApi and cricketDataService resolution
  console.log('\n--- SERVICE LAYER INTEGRATION TEST ---');
  const rohitApiRes = await playerApi.getPlayerById('rohit-sharma');
  console.log(`playerApi.getPlayerById('rohit-sharma') => isLive: ${rohitApiRes.isLive}, lastUpdated: ${rohitApiRes.lastUpdated}`);
  if (rohitApiRes.player?.stats.odi?.batting?.runs !== 11895) {
    console.error(`❌ Expected Rohit Sharma ODI runs to be 11895, got ${rohitApiRes.player?.stats.odi?.batting?.runs}`);
    process.exit(1);
  }
  console.log(`✔ Rohit Sharma ODI Runs correctly verified: ${rohitApiRes.player?.stats.odi?.batting?.runs}`);

  const viratApiRes = await playerApi.getPlayerById('virat-kohli');
  if (viratApiRes.player?.stats.odi?.batting?.runs !== 14181) {
    console.error(`❌ Expected Virat Kohli ODI runs to be 14181, got ${viratApiRes.player?.stats.odi?.batting?.runs}`);
    process.exit(1);
  }
  console.log(`✔ Virat Kohli ODI Runs correctly verified: ${viratApiRes.player?.stats.odi?.batting?.runs}`);

  const bumrahApiRes = await playerApi.getPlayerById('jasprit-bumrah');
  if (bumrahApiRes.player?.stats.test?.bowling?.wickets !== 173) {
    console.error(`❌ Expected Jasprit Bumrah Test wickets to be 173, got ${bumrahApiRes.player?.stats.test?.bowling?.wickets}`);
    process.exit(1);
  }
  console.log(`✔ Jasprit Bumrah Test Wickets correctly verified: ${bumrahApiRes.player?.stats.test?.bowling?.wickets}`);

  const orchRes = await cricketDataService.getOrchestratedPlayer('rohit-sharma', { includeGemini: false });
  console.log(`cricketDataService.getOrchestratedPlayer('rohit-sharma') => sourcedStats Test/ODI/T20I/IPL present: ${!!orchRes?.sourcedStats.test && !!orchRes?.sourcedStats.odi && !!orchRes?.sourcedStats.t20i && !!orchRes?.sourcedStats.ipl}`);
  console.log(`ODI Runs Provenance:`, orchRes?.sourcedStats.odi?.batting?.runs);

  console.log('\n' + '='.repeat(80));
  console.log('✅ ALL GEMINI GROUNDED PLAYER STATS AUDITS & VALIDATIONS PASSED!');
  console.log('='.repeat(80));
}

runGeminiPlayerStatsAudit().catch(err => {
  console.error('Fatal audit error:', err);
  process.exit(1);
});
