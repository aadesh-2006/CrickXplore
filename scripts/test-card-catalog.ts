import { FALLBACK_PLAYERS } from '../src/data/players';
import {
  FULL_COLLECTIBLE_CATALOG,
  getCollectibleCardById,
  getCollectibleCardByPlayerId,
  CURATED_HERO_CARD_OVERRIDES,
} from '../src/data/cards/cardCatalog';
import type { CollectibleCard } from '../src/types/collectibleCard';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

async function runCardCatalogAudit() {
  console.log('='.repeat(80));
  console.log('CRICKXPLORE — DYNAMIC COLLECTIBLE CARD CATALOG AUDIT & TEST SUITE');
  console.log('='.repeat(80));

  const totalPlayers = FALLBACK_PLAYERS.length;
  const totalCards = FULL_COLLECTIBLE_CATALOG.length;

  console.log(`\n[1] TOTAL PLAYER DATABASE COUNT: ${totalPlayers} players`);
  console.log(`[2] TOTAL GENERATED COLLECTIBLE CARDS: ${totalCards} cards\n`);

  assert(totalPlayers === 457, `Player database has exactly 457 records (got ${totalPlayers})`);
  assert(totalCards === 457, `Generated card catalog has exactly 457 records (got ${totalCards})`);

  // 1. Uniqueness of Card IDs and Serial Numbers
  console.log('\n--- 1. CARD UNIQUENESS & INTEGRITY AUDIT ---');
  const cardIdSet = new Set<string>();
  const playerIdSet = new Set<string>();
  const serialSet = new Set<string>();

  for (const card of FULL_COLLECTIBLE_CATALOG) {
    if (cardIdSet.has(card.id)) {
      assert(false, `Duplicate Card ID detected: ${card.id}`);
    }
    cardIdSet.add(card.id);

    if (playerIdSet.has(card.playerId)) {
      assert(false, `Duplicate Player reference in catalog: ${card.playerId}`);
    }
    playerIdSet.add(card.playerId);

    if (serialSet.has(card.serialNumber)) {
      assert(false, `Duplicate Serial Number detected: ${card.serialNumber}`);
    }
    serialSet.add(card.serialNumber);

    // Verify Player Exists
    const playerMatch = FALLBACK_PLAYERS.find(p => p.id === card.playerId);
    assert(!!playerMatch, `Card ${card.id} maps to valid player ${card.playerId}`);
    assert(card.playerName === playerMatch?.name, `Card name "${card.playerName}" matches player name "${playerMatch?.name}"`);
    assert(card.nationality === playerMatch?.country, `Card nationality matches player country`);
    assert(card.role === playerMatch?.role, `Card role matches player role`);
  }

  assert(cardIdSet.size === 457, `All 457 Card IDs are strictly unique`);
  assert(playerIdSet.size === 457, `All 457 cards map to 457 distinct players`);
  assert(serialSet.size === 457, `All 457 Serial Numbers are strictly unique`);

  // 2. Curated Hero 10 Cards Verification
  console.log('\n--- 2. ORIGINAL CURATED 10 HERO CARDS AUDIT ---');
  const curatedHeroKeys = Object.keys(CURATED_HERO_CARD_OVERRIDES);
  assert(curatedHeroKeys.length === 10, `Curated hero cards count is 10`);

  for (const heroId of curatedHeroKeys) {
    const override = CURATED_HERO_CARD_OVERRIDES[heroId];
    const card = getCollectibleCardByPlayerId(heroId);

    assert(!!card, `Hero card for "${heroId}" exists in catalog`);
    assert(card?.variant === override.variant, `${heroId} preserved variant: ${card?.variant} (expected: ${override.variant})`);
    assert(card?.format === override.format, `${heroId} preserved format: ${card?.format} (expected: ${override.format})`);
    assert(card?.serialNumber === override.serialNumber, `${heroId} preserved serial: ${card?.serialNumber} (expected: ${override.serialNumber})`);
    assert(card?.signatureTitle === override.signatureTitle, `${heroId} preserved signature title: ${card?.signatureTitle}`);
  }

  // 3. Variant & Rarity Distribution
  console.log('\n--- 3. VARIANT & RARITY DISTRIBUTION ---');
  const variantCounts: Record<string, number> = {};
  const rarityCounts: Record<string, number> = {};

  for (const card of FULL_COLLECTIBLE_CATALOG) {
    variantCounts[card.variant] = (variantCounts[card.variant] || 0) + 1;
    rarityCounts[card.rarity] = (rarityCounts[card.rarity] || 0) + 1;
  }

  console.table(variantCounts);
  console.table(rarityCounts);

  assert(variantCounts['LEGEND'] > 0, `Contains LEGEND cards (${variantCounts['LEGEND']})`);
  assert(variantCounts['RECORD'] > 0, `Contains RECORD cards (${variantCounts['RECORD']})`);
  assert(variantCounts['WORLD_CUP'] > 0, `Contains WORLD_CUP cards (${variantCounts['WORLD_CUP']})`);
  assert(variantCounts['GOLD'] > 0, `Contains GOLD cards (${variantCounts['GOLD']})`);
  assert(variantCounts['STANDARD'] > 0, `Contains STANDARD cards (${variantCounts['STANDARD']})`);

  // 4. Role Representation
  console.log('\n--- 4. ROLE DIVERSITY AUDIT ---');
  const roleCounts: Record<string, number> = {};
  for (const card of FULL_COLLECTIBLE_CATALOG) {
    roleCounts[card.role] = (roleCounts[card.role] || 0) + 1;
  }
  console.table(roleCounts);
  assert(roleCounts['batter'] === 139, `Batter count matches player dataset (139)`);
  assert(roleCounts['bowler'] === 156, `Bowler count matches player dataset (156)`);
  assert(roleCounts['all-rounder'] === 118, `All-rounder count matches player dataset (118)`);
  assert(roleCounts['wicket-keeper'] === 44, `Wicket-keeper count matches player dataset (44)`);

  // 5. Search Filtering Test
  console.log('\n--- 5. SEARCH & FILTER SIMULATION TESTS ---');
  const testQueries = ['Virat', 'Bumrah', 'Cummins', 'Australia', 'Master of the chase', 'CX-LEG'];
  for (const q of testQueries) {
    const query = q.toLowerCase();
    const matches = FULL_COLLECTIBLE_CATALOG.filter(c =>
      c.playerName.toLowerCase().includes(query) ||
      c.nationality.toLowerCase().includes(query) ||
      c.signatureTitle.toLowerCase().includes(query) ||
      c.serialNumber.toLowerCase().includes(query)
    );
    console.log(`Search query "${q}" => ${matches.length} matching cards`);
    assert(matches.length > 0, `Search query "${q}" returned matching results`);
  }

  // 6. Format Filtering Test
  for (const fmt of ['test', 'odi', 't20i'] as const) {
    const matches = FULL_COLLECTIBLE_CATALOG.filter(c => c.format === fmt);
    console.log(`Format filter "${fmt.toUpperCase()}" => ${matches.length} cards`);
    assert(matches.length > 0, `Format filter "${fmt}" returned cards`);
  }

  // 7. Lookup by ID & Serial
  console.log('\n--- 7. DIRECT LOOKUP HELPERS AUDIT ---');
  const cardById = getCollectibleCardById('card-virat-kohli-legend-odi');
  assert(!!cardById && cardById.playerName === 'Virat Kohli', `Lookup by ID card-virat-kohli-legend-odi succeeded`);

  const cardBySerial = getCollectibleCardById('CX-REC-JB-0093');
  assert(!!cardBySerial && cardBySerial.playerName === 'Jasprit Bumrah', `Lookup by serial CX-REC-JB-0093 succeeded`);

  console.log('\n' + '='.repeat(80));
  console.log('✅ ALL CARD CATALOG AUDITS & VALIDATIONS PASSED PERFECTLY!');
  console.log('='.repeat(80));
}

runCardCatalogAudit().catch(err => {
  console.error('Fatal card catalog test error:', err);
  process.exit(1);
});
