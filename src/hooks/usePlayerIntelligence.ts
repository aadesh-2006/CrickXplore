import { useState, useEffect } from 'react';
import type { NormalizedPlayer } from '../types/player';
import type { PlayerIntelligenceData } from '../../server/services/gemini/geminiSchemas';
import { clientGeminiApi } from '../services/gemini/geminiClient';

export interface UsePlayerIntelligenceResult {
  intelligence: PlayerIntelligenceData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function usePlayerIntelligence(player: NormalizedPlayer | null): UsePlayerIntelligenceResult {
  const [intelligence, setIntelligence] = useState<PlayerIntelligenceData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState<number>(0);

  useEffect(() => {
    if (!player) {
      setIntelligence(null);
      setLoading(false);
      setError(null);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    clientGeminiApi
      .getPlayerIntelligence(player)
      .then(data => {
        if (isMounted) {
          setIntelligence(data);
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
  }, [player?.id, trigger]);

  const refetch = () => setTrigger(t => t + 1);

  return { intelligence, loading, error, refetch };
}
