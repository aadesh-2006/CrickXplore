import { useState, useEffect } from 'react';
import type { NormalizedPlayer } from '../types/player';
import type { PlayerEnrichmentData } from '../../server/services/gemini/geminiSchemas';
import { clientGeminiApi } from '../services/gemini/geminiClient';

export interface UsePlayerEnrichmentResult {
  enrichment: PlayerEnrichmentData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function usePlayerEnrichment(player: NormalizedPlayer | null): UsePlayerEnrichmentResult {
  const [enrichment, setEnrichment] = useState<PlayerEnrichmentData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState<number>(0);

  useEffect(() => {
    if (!player) {
      setEnrichment(null);
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    clientGeminiApi
      .getPlayerEnrichment(player)
      .then(data => {
        if (isMounted) {
          setEnrichment(data);
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

  return { enrichment, loading, error, refetch };
}
