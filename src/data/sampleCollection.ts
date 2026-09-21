import { createCollectibleCard } from '../utils/collectibleCardFactory';
import { FALLBACK_PLAYERS } from './fallbackPlayers';
import type { CollectibleCard } from '../types/collectibleCard';

// Build a rich curated sample collection of collectible cards
export const SAMPLE_COLLECTION: CollectibleCard[] = [
  // 1. Virat Kohli - LEGEND Edition (Test & ODI)
  createCollectibleCard(
    FALLBACK_PLAYERS.find(p => p.id === 'virat-kohli') || FALLBACK_PLAYERS[0],
    {
      variant: 'LEGEND',
      format: 'odi',
      edition: 'Mythic Pantheon Series',
      serialNumber: 'CX-LEG-VK-0018',
      signatureTitle: '50 ODI CENTURIES • MASTER OF THE CHASE',
    }
  ),

  // 2. Jasprit Bumrah - RECORD Edition (Test)
  createCollectibleCard(
    FALLBACK_PLAYERS.find(p => p.id === 'jasprit-bumrah') || FALLBACK_PLAYERS[1],
    {
      variant: 'RECORD',
      format: 'test',
      edition: 'Immortal Records Series',
      serialNumber: 'CX-REC-JB-0093',
      signatureTitle: 'TEST STRIKE RATE 45.3 • SEAM ALCHEMY',
    }
  ),

  // 3. Steve Smith - GOLD Edition (Ashes Test)
  createCollectibleCard(
    FALLBACK_PLAYERS.find(p => p.id === 'steve-smith') || FALLBACK_PLAYERS[2],
    {
      variant: 'GOLD',
      format: 'test',
      edition: 'Gilded Master Edition',
      serialNumber: 'CX-GLD-SS-0049',
      signatureTitle: 'ASHES COLOSSUS • TEST AVERAGE 56.97',
    }
  ),

  // 4. Ben Stokes - ICONIC_MOMENT Edition (Test)
  createCollectibleCard(
    FALLBACK_PLAYERS.find(p => p.id === 'ben-stokes') || FALLBACK_PLAYERS[3],
    {
      variant: 'ICONIC_MOMENT',
      format: 'test',
      edition: 'Frozen in Tension Series',
      serialNumber: 'CX-MOM-BS-0135',
      signatureTitle: 'HEADINGLEY 135* • UNBROKEN 10TH WICKET',
    }
  ),

  // 5. Pat Cummins - WORLD_CUP Edition (ODI)
  createCollectibleCard(
    FALLBACK_PLAYERS.find(p => p.id === 'pat-cummins') || FALLBACK_PLAYERS[4],
    {
      variant: 'WORLD_CUP',
      format: 'odi',
      edition: 'World Cup Apex Series',
      serialNumber: 'CX-WC-PC-0030',
      signatureTitle: 'WORLD CHAMPION CAPTAIN • 2023 AHMEDABAD',
    }
  ),

  // 6. Rohit Sharma - RECORD Edition (ODI)
  createCollectibleCard(
    FALLBACK_PLAYERS.find(p => p.id === 'rohit-sharma') || FALLBACK_PLAYERS[5],
    {
      variant: 'RECORD',
      format: 'odi',
      edition: 'Immortal Records Series',
      serialNumber: 'CX-REC-RS-0264',
      signatureTitle: '264 EDEN GARDENS • 3X DOUBLE CENTURIES',
    }
  ),

  // 7. Kane Williamson - STANDARD Edition (Test)
  createCollectibleCard(
    FALLBACK_PLAYERS.find(p => p.id === 'kane-williamson') || FALLBACK_PLAYERS[6],
    {
      variant: 'STANDARD',
      format: 'test',
      edition: 'Genesis Series 1',
      serialNumber: 'CX-STD-KW-0022',
      signatureTitle: 'WTC INAUGURAL WINNER • TECHNICAL PURITY',
    }
  ),

  // 8. Rashid Khan - GOLD Edition (T20I)
  createCollectibleCard(
    FALLBACK_PLAYERS.find(p => p.id === 'rashid-khan') || FALLBACK_PLAYERS[7],
    {
      variant: 'GOLD',
      format: 't20i',
      edition: 'Gilded Master Edition',
      serialNumber: 'CX-GLD-RK-0019',
      signatureTitle: 'T20 WIZARD • 150 WICKETS AT 14.16 AVG',
    }
  ),

  // 9. MS Dhoni - ICONIC_MOMENT Edition (World Cup ODI)
  createCollectibleCard(
    FALLBACK_PLAYERS.find(p => p.id === 'ms-dhoni') || FALLBACK_PLAYERS[8],
    {
      variant: 'ICONIC_MOMENT',
      format: 'odi',
      edition: 'Frozen in Tension Series',
      serialNumber: 'CX-MOM-MSD-0007',
      signatureTitle: 'WANKHEDE 2011 • THE WORLD CUP WINNING SIX',
    }
  ),

  // 10. Dale Steyn - LEGEND Edition (Test)
  createCollectibleCard(
    FALLBACK_PLAYERS.find(p => p.id === 'dale-steyn') || FALLBACK_PLAYERS[9],
    {
      variant: 'LEGEND',
      format: 'test',
      edition: 'Mythic Pantheon Series',
      serialNumber: 'CX-LEG-DS-0439',
      signatureTitle: '263 WEEKS AT WORLD NO. 1 • 439 TEST WICKETS',
    }
  ),
];
