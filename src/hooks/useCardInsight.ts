import { useState, useEffect } from 'react';
import type { NormalizedPlayer } from '../types/player';
import type { CardInsightData } from '../../server/services/gemini/geminiSchemas';
import { clientGeminiApi } from '../services/gemini/geminiClient';

export interface UseCardInsightResult {
  insight: CardInsightData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useCardInsight(
  player: NormalizedPlayer | null,
  cardMeta?: { tier?: string; serialNumber?: string }
): UseCardInsightResult {
  const [insight, setInsight] = useState<CardInsightData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState<number>(0);

  useEffect(() => {
    if (!player) {
      setInsight(null);
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    clientGeminiApi
      .getCardInsight(player, cardMeta)
      .then(data => {
        if (isMounted) {
          setInsight(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError((err as Error).message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [player?.id, cardMeta?.tier, trigger]);

  const refetch = () => setTrigger(t => t + 1);

  return { insight, loading, error, refetch };
}
