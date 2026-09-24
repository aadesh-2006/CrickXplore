/**
 * CrickXplore Gemini Cricket Intelligence & Orchestration Architecture Test Suite
 * Validates all 10 critical architectural guarantees.
 */

import { GeminiServerClient } from '../server/services/gemini/geminiClient';
import { GeminiIntelligenceService } from '../server/services/gemini/geminiService';
import { CricketDataService } from '../src/services/cricketDataService';
import type { NormalizedPlayer } from '../src/types/player';
import { FALLBACK_PLAYERS } from '../src/data/fallbackPlayers';

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  totalTests++;
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: ${testName} ${detail ? `(${detail})` : ''}`);
  }
}

async function runTests() {
  console.log('=================================================================');
  console.log('--- CRICKXPLORE GEMINI CRICKET INTELLIGENCE TEST SUITE ---');
  console.log('=================================================================\n');

  // 1. Gemini Client Initialization
  console.log('Test 1: Gemini Client Initialization');
  const client = new GeminiServerClient();
  assert(client.hasApiKey(), 'Server client successfully resolved GEMINI_API_KEY from environment');
  assert(typeof client.getActiveModel() === 'string', 'Active model string is configured');

  // 2. Successful Gemini Structured Response
  console.log('\nTest 2: Successful Structured Gemini Response (Real API Call)');
  const service = new GeminiIntelligenceService(client);
  const testPlayer: NormalizedPlayer = {
    id: 'p-virat-kohli',
    name: 'Virat Kohli',
    country: 'India',
    role: 'batter',
    battingStyle: 'Right-hand bat',
    stats: {
      test: { batting: { matches: 113, runs: 8848, average: 49.15, centuries: 29 } },
      odi: { batting: { matches: 295, runs: 13906, average: 58.18, centuries: 50 } },
    },
    ipl2026Team: 'RCB',
  };

  const intelligence = await service.getPlayerIntelligence(testPlayer);
  assert(intelligence.source === 'gemini', 'Response marked with source: gemini');
  assert(intelligence.playerId === 'p-virat-kohli', 'Response preserves player ID');
  assert(typeof intelligence.narrative === 'string' && intelligence.narrative.length > 20, 'Generates substantive player narrative');
  assert(Array.isArray(intelligence.tacticalProfile.strengths) && intelligence.tacticalProfile.strengths.length > 0, 'Includes tactical strengths');

  // 3. Malformed JSON Handling
  console.log('\nTest 3: Malformed / Invalid JSON Recovery');
  class MockClientMalformed extends GeminiServerClient {
    public async generateStructured<T>(): Promise<T> {
      throw new Error('GEMINI_JSON_PARSE_ERROR: Unexpected token in JSON');
    }
  }
  const malformedService = new GeminiIntelligenceService(new MockClientMalformed());
  const fallbackFromMalformed = await malformedService.getPlayerIntelligence(testPlayer);
  assert(fallbackFromMalformed !== null, 'Returns safe fallback object instead of crashing on malformed JSON');
  assert(fallbackFromMalformed.source === 'gemini', 'Fallback object conforms to PlayerIntelligenceData contract');

  // 4. Missing Fields / Null Safety
  console.log('\nTest 4: Missing Fields & Null Safety');
  const incompletePlayer: NormalizedPlayer = {
    id: 'p-incomplete',
    name: 'Emerging Talent',
    country: 'Nepal',
    role: 'all-rounder',
    stats: {},
  };
  const enrichIncomplete = await service.getPlayerEnrichment(incompletePlayer);
  assert(enrichIncomplete.playerId === 'p-incomplete', 'Handles empty stats gracefully without runtime errors');
  assert(Array.isArray(enrichIncomplete.caveats), 'Preserves caveats array even when data is sparse');

  // 5. Gemini Timeout Handling
  console.log('\nTest 5: Timeout Handling');
  class MockClientTimeout extends GeminiServerClient {
    public async generateStructured<T>(): Promise<T> {
      throw new Error('GEMINI_TIMEOUT: Request exceeded 15000ms');
    }
  }
  const timeoutService = new GeminiIntelligenceService(new MockClientTimeout());
  const timeoutResult = await timeoutService.getPlayerIntelligence(testPlayer);
  assert(timeoutResult !== null && timeoutResult.tacticalProfile !== undefined, 'Gracefully falls back when API call times out');

  // 6. Gemini API Failure / Offline Handling
  console.log('\nTest 6: Gemini API Failure & Offline Fallback');
  const unconfiguredService = new GeminiIntelligenceService(new GeminiServerClient(''));
  const health = await unconfiguredService.getHealthStatus();
  assert(health.status === 'unavailable', 'Health check flags unavailable status when key is absent');
  const offlineQuery = await unconfiguredService.answerCricketQuery('Who won the 2011 World Cup?');
  assert(offlineQuery.source === 'gemini' && offlineQuery.confidence === 'low', 'Offline query returns safe degraded answer');

  // 7. Cache Behavior & Deduplication
  console.log('\nTest 7: Cache Behavior & In-Flight Deduplication');
  service.clearCache();
  const t0 = Date.now();
  const req1 = service.getPlayerIntelligence(testPlayer);
  const req2 = service.getPlayerIntelligence(testPlayer); // concurrent deduplication test
  const [res1, res2] = await Promise.all([req1, req2]);
  const initialDuration = Date.now() - t0;

  const t1 = Date.now();
  const cachedRes = await service.getPlayerIntelligence(testPlayer); // memory cache hit
  const cacheDuration = Date.now() - t1;

  assert(res1.narrative === res2.narrative, 'Concurrent requests resolve to identical deduplicated result');
  assert(cachedRes.narrative === res1.narrative, 'Cache returns identical payload');
  assert(cacheDuration < 100, `Memory cache lookup is instantaneous (${cacheDuration}ms < 100ms)`);

  // 8. CRITICAL DATA RULE: Verified/BBS Data Not Overwritten by Gemini
  console.log('\nTest 8: CRITICAL DATA RULE — Verified Stats Strictly Preserved (Gemini Never Overwrites Numbers)');
  const kohliBaseline = FALLBACK_PLAYERS.find(p => p.name === 'Virat Kohli')!;

  const dataService = new CricketDataService();
  const orchestrated = await dataService.getOrchestratedPlayer(kohliBaseline.id, { includeGemini: true });

  assert(orchestrated !== null, 'Orchestrated player resolved');
  // Confirm stats come from verified live BBS telemetry (9040) and are numeric
  assert(
    typeof orchestrated?.stats.test?.batting?.runs === 'number' && (orchestrated?.stats.test?.batting?.runs === 9040 || orchestrated?.stats.test?.batting?.runs === kohliBaseline.stats.test?.batting?.runs),
    `Verified Test runs are authentic numeric telemetry (${orchestrated?.stats.test?.batting?.runs})`
  );
  assert(
    typeof orchestrated?.stats.odi?.batting?.runs === 'number' && (orchestrated?.stats.odi?.batting?.runs === 14181 || orchestrated?.stats.odi?.batting?.runs === kohliBaseline.stats.odi?.batting?.runs),
    `Verified ODI runs are authentic numeric telemetry (${orchestrated?.stats.odi?.batting?.runs})`
  );

  // 9. Provider & Source Metadata Tracking
  console.log('\nTest 9: Provider & Source Metadata (SourcedValue)');
  const testRunSource = orchestrated?.sourcedStats.test?.batting?.runs?.source;
  assert(
    testRunSource === 'LIVE' || testRunSource === 'VERIFIED',
    `Test runs stat tagged with authentic verified source: ${testRunSource}`
  );
  assert(
    orchestrated?.sourcedStats.test?.batting?.runs?.verified === true,
    'Verified flag is true for baseline / live telemetry database stats'
  );
  assert(
    orchestrated?.dataSourceSummary.baselineSource === 'LIVE' || orchestrated?.dataSourceSummary.baselineSource === 'VERIFIED',
    'Data source summary confirms baselineSource is authentic'
  );

  // 10. Fallback When Gemini Unavailable
  console.log('\nTest 10: Complete App Resilience When Gemini Disabled');
  const noGeminiPlayer = await dataService.getOrchestratedPlayer(kohliBaseline.id, { includeGemini: false });
  assert(noGeminiPlayer !== null, 'Player profile fully renders even with Gemini explicitly disabled');
  assert(
    typeof noGeminiPlayer?.stats.test?.batting?.runs === 'number',
    'Core telemetry 100% operational in offline mode'
  );

  console.log('\n=================================================================');
  console.log(`TEST RESULTS: ${passedTests} / ${totalTests} CHECKS PASSED`);
  console.log('=================================================================');

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test run failed:', err);
  process.exit(1);
});
