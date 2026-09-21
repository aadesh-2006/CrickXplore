import React from 'react';
import type { NormalizedPlayer } from '../../types/player';
import { createCollectibleCard } from '../../utils/collectibleCardFactory';
import { DigitalCollectibleCard as CoreDigitalCollectibleCard } from '../cards/DigitalCollectibleCard';

interface DigitalCollectibleCardProps {
  player: NormalizedPlayer;
  onPlayTone?: () => void;
}

export const DigitalCollectibleCard: React.FC<DigitalCollectibleCardProps> = ({ player, onPlayTone }) => {
  // Derive a high-grade card for the player profile preview
  const card = createCollectibleCard(player, {
    variant: player.badges && player.badges.length > 2 ? 'LEGEND' : 'GOLD',
    format: 'test',
  });

  return <CoreDigitalCollectibleCard card={card} onPlayTone={onPlayTone} />;
};
