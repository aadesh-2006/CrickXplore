import * as fs from 'fs';
import * as path from 'path';
import type { NormalizedPlayer } from '../../src/types/player';

import { INDIA_PLAYERS } from '../../src/data/players/india';
import { AUSTRALIA_PLAYERS } from '../../src/data/players/australia';
import { ENGLAND_PLAYERS } from '../../src/data/players/england';
import { SOUTH_AFRICA_PLAYERS } from '../../src/data/players/southAfrica';
import { SRI_LANKA_PLAYERS } from '../../src/data/players/sriLanka';
import { NEW_ZEALAND_PLAYERS } from '../../src/data/players/newZealand';

import { HISTORICAL_INDIA, HISTORICAL_AUSTRALIA } from '../enrich-historical-2000-2026';
import { HISTORICAL_NEW_ZEALAND } from './nz';
import { HISTORICAL_ENGLAND } from './england';
import { HISTORICAL_SOUTH_AFRICA } from './southAfrica';
import { HISTORICAL_SRI_LANKA } from './sriLanka';

function mergePlayers(existing: NormalizedPlayer[], newOnes: NormalizedPlayer[]): NormalizedPlayer[] {
  const map = new Map<string, NormalizedPlayer>();
  // Keep existing
  for (const p of existing) {
    map.set(p.id, p);
  }
  // Add new if not present
  for (const p of newOnes) {
    if (!map.has(p.id)) {
      map.set(p.id, p);
    }
  }
  return Array.from(map.values());
}

function writePlayerFile(filePath: string, exportConstName: string, players: NormalizedPlayer[]) {
  const content = `import type { NormalizedPlayer } from '../../types/player';\n\nexport const ${exportConstName}: NormalizedPlayer[] = ${JSON.stringify(players, null, 2)};\n`;
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Updated ${path.basename(filePath)} -> Total players: ${players.length}`);
}

const playersDir = path.resolve(process.cwd(), 'src/data/players');

const mergedIndia = mergePlayers(INDIA_PLAYERS, HISTORICAL_INDIA);
const mergedAus = mergePlayers(AUSTRALIA_PLAYERS, HISTORICAL_AUSTRALIA);
const mergedNZ = mergePlayers(NEW_ZEALAND_PLAYERS, HISTORICAL_NEW_ZEALAND);
const mergedEng = mergePlayers(ENGLAND_PLAYERS, HISTORICAL_ENGLAND);
const mergedSA = mergePlayers(SOUTH_AFRICA_PLAYERS, HISTORICAL_SOUTH_AFRICA);
const mergedSL = mergePlayers(SRI_LANKA_PLAYERS, HISTORICAL_SRI_LANKA);

writePlayerFile(path.join(playersDir, 'india.ts'), 'INDIA_PLAYERS', mergedIndia);
writePlayerFile(path.join(playersDir, 'australia.ts'), 'AUSTRALIA_PLAYERS', mergedAus);
writePlayerFile(path.join(playersDir, 'newZealand.ts'), 'NEW_ZEALAND_PLAYERS', mergedNZ);
writePlayerFile(path.join(playersDir, 'england.ts'), 'ENGLAND_PLAYERS', mergedEng);
writePlayerFile(path.join(playersDir, 'southAfrica.ts'), 'SOUTH_AFRICA_PLAYERS', mergedSA);
writePlayerFile(path.join(playersDir, 'sriLanka.ts'), 'SRI_LANKA_PLAYERS', mergedSL);

console.log('All 6 historical nations merged successfully!');
