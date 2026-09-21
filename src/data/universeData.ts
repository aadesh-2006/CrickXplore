import type { UniverseItem, CricketSensoryFact } from '../types';

export const UNIVERSE_SECTIONS: UniverseItem[] = [
  {
    id: 'players',
    title: 'PLAYERS',
    category: 'The Pantheon',
    tagline: 'The Titans & Maestros',
    description: 'Deconstruct the genius of cricket immortals. From Bradman’s razor arc to Sachin’s straight drive and Kohli’s ferocious chase.',
    detailedLore: 'Not just scorecards, but the anatomy of human mastery under immense pressure. Explore masterclasses in swing bowling, wrist spin alchemy, and technical batting blueprints through interactive breakdown matrices.',
    accentColor: 'from-amber-500/20 via-yellow-500/5 to-transparent',
    badge: 'ARCHIVE VAULT',
    statsLabel: 'Profiles Mapped',
    statsValue: '500+ Legends',
    iconName: 'UserCheck',
    features: [
      'Interactive stance & signature shot 3D breakdown',
      'Historical impact coefficients vs rival eras',
      'Mastery radar comparing speed, grit & tactical IQ'
    ],
    quote: {
      text: 'First they ignore you, then they fear your cover drive.',
      author: 'Cricket Folklore'
    }
  },
  {
    id: 'moments',
    title: 'MOMENTS',
    category: 'Living Memory',
    tagline: 'The Immortal Deliveries',
    description: 'Unscripted dramas frozen in time. The 144-run miracle at Kolkata, the 2019 super over heartbeat, and the ball of the century.',
    detailedLore: 'Every generation remembers where they stood when these deliveries pitched. Experience multi-perspective narrative recreations, crowd decibel maps, and split-second tension timelines.',
    accentColor: 'from-rose-500/20 via-red-500/5 to-transparent',
    badge: 'CINEMATIC LOG',
    statsLabel: 'Iconic Frames',
    statsValue: '120 Epochs',
    iconName: 'Flame',
    features: [
      'Ball-by-ball tension index graphs',
      'Unheard dressing room tales & audio folklore',
      'The turning point tactical breakdown'
    ],
    quote: {
      text: 'Cricket is the only sport where a single millimeter of leather alters history.',
      author: 'Lord’s Archive'
    }
  },
  {
    id: 'stadiums',
    title: 'STADIUMS',
    category: 'Sacred Grounds',
    tagline: 'The Colosseums',
    description: 'From Lord’s morning mist to the thunderous 100,000 roar of the MCG and Ahmedabad. The sacred cathedrals of leather and willow.',
    detailedLore: 'Every pitch has a distinct heartbeat. Lord’s slope shifts the ball naturally; the WACA’s cracks terrorize front feet; Eden Gardens vibrates like a live caldera. Step inside the architecture, pitch geology, and historical acoustics.',
    accentColor: 'from-emerald-500/20 via-teal-500/5 to-transparent',
    badge: 'COLOSSEUMS',
    statsLabel: 'Arenas Catalogued',
    statsValue: '48 Grounds',
    iconName: 'Landmark',
    features: [
      'Pitch degradation micro-climate simulation',
      'Acoustic reverberation profiles & decibel peaks',
      'Historical wind velocity & swing vectors'
    ],
    quote: {
      text: 'When Eden Gardens roars, even the statues at Victoria Memorial tremble.',
      author: 'Calcutta Chronicle'
    }
  },
  {
    id: 'timeline',
    title: 'TIMELINE',
    category: 'Chronicles',
    tagline: 'The Golden Epochs',
    description: '147 years of gentlemanly duels, Kerry Packer revolutions, 1983 underdogs, and the neon blitz of franchise cricket.',
    detailedLore: 'Follow cricket’s evolution from Victorian wool sweaters and uncovered muddy pitches to pink-ball night tests, high-speed telemetry, and global cultural juggernaut.',
    accentColor: 'from-cyan-500/20 via-blue-500/5 to-transparent',
    badge: '1877 — NOW',
    statsLabel: 'Years of Lore',
    statsValue: '147 Years',
    iconName: 'Hourglass',
    features: [
      'Scrollable interactive eras with archival imagery',
      'The evolution of cricket equipment & rule shifts',
      'Cultural ripples that reshaped geopolitics'
    ],
    quote: {
      text: 'To understand modern nations, watch how they play cricket under the sun.',
      author: 'Historian Archive'
    }
  },
  {
    id: 'cards',
    title: 'CARDS',
    category: 'Digital Relics',
    tagline: 'The Collectibles',
    description: 'Dynamic digital cards with holographic foils, embossed seams, real-time reactive lighting, and tiered rarity ranks.',
    detailedLore: 'Synthesizing museum-grade memorabilia with modern digital artistry. Each collectible card encapsulates signature moments, authentic career runes, and rare holographic stamps.',
    accentColor: 'from-purple-500/20 via-violet-500/5 to-transparent',
    badge: 'COLLECTIBLES',
    statsLabel: 'Unique Relics',
    statsValue: '1,200 Cards',
    iconName: 'Sparkles',
    features: [
      'Gyroscope / cursor responsive holographic foil shaders',
      'Minted edition serials with historical milestones',
      'Showcase showcase binder & trading vault'
    ],
    quote: {
      text: 'Hold the weight of a legacy in the palm of your hand.',
      author: 'Artifact Vault'
    }
  },
  {
    id: 'card-game',
    title: 'CARD GAME',
    category: 'Arena Showdown',
    tagline: 'Tactical Clash',
    description: 'A high-stakes strategy duel. Pitch conditions, bowling spells, powerplay gambits, and clutch last-over decisions.',
    detailedLore: 'Pitting tactical masterminds against each other in fast-paced card-based cricket strategy. Read pitch conditions, manage bowler stamina, deploy fielding traps, and strike when the match turns.',
    accentColor: 'from-orange-500/20 via-amber-500/5 to-transparent',
    badge: 'TACTICAL DUEL',
    statsLabel: 'Battle Modes',
    statsValue: 'PvP & Solo',
    iconName: 'Swords',
    features: [
      'Deep deck construction with era synergies',
      'Real-time weather & pitch fatigue modifiers',
      'Clutch over bluffing & boundary risk mechanics'
    ],
    quote: {
      text: 'Cricket is chess played with a leather sphere moving at 95 miles per hour.',
      author: 'Tactician’s Creed'
    }
  }
];

export const SENSORY_FACTS: CricketSensoryFact[] = [
  {
    id: 'sensory-1',
    number: '01',
    title: 'The 0.4 Second Reaction',
    subtitle: 'THE BRAIN AT 150 KM/H',
    description: 'When a fast bowler releases the ball, a batsman has just 400 milliseconds to decode trajectory, seam orientation, bounce height, and execute a stroke.',
    detail: 'Human blink duration is 300ms. Cricket batting at extreme pace is an act of pure subconscious intuition and micro-saccadic eye tracking.'
  },
  {
    id: 'sensory-2',
    number: '02',
    title: 'The Sound of English Willow',
    subtitle: 'THE SWEET SPOT FREQUENCY',
    description: 'A cricket stroke struck precisely on the blade’s node of least vibration emits a distinct 1.2 kHz resonant acoustic pop.',
    detail: 'Fielders at slip don’t look up immediately—their auditory cortex informs them whether the ball came off the meat of the bat before their eyes confirm it.'
  },
  {
    id: 'sensory-3',
    number: '03',
    title: 'The 80-Over Duke Ball',
    subtitle: 'LEATHER, WAX & REVERSE SWING',
    description: 'As the shine erodes and moisture penetrates one hemisphere, the laminar boundary layer separates prematurely, creating wicked aerodynamic reverse swing.',
    detail: 'Crafted with 72 hand-stitched seams, the Duke ball remains a living, evolving physics puzzle across 5 days of Test cricket.'
  },
  {
    id: 'sensory-4',
    number: '04',
    title: 'The Silence Before the Toss',
    subtitle: 'ATMOSPHERE AT 9:00 AM',
    description: 'Morning dew clinging to emerald grass, light roller tracks pressed across the pitch, and the heavy anticipation before the opening over.',
    detail: 'The purest theater in world sport happens in absolute quiet, just as the umpire calls "Play".'
  }
];

export const HERO_HIGHLIGHTS = [
  { label: 'ERA COVERAGE', value: '1877 — 2026' },
  { label: 'AUTHENTICITY', value: '100% UNFILTERED' },
  { label: 'EXPERIENCE', value: 'CINEMATIC & SENSORY' },
  { label: 'COMMUNITY', value: 'PURISTS & MODERN' },
];
