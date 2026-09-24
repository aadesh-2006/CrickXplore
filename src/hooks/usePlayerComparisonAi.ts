import { useState, useEffect } from 'react';
import type { NormalizedPlayer } from '../types/player';
import type { PlayerComparisonData } from '../../server/services/gemini/geminiSchemas';
import { clientGeminiApi } from '../services/gemini/geminiClient';

export interface UsePlayerComparisonAiResult {
  comparison: PlayerComparisonData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function usePlayerComparisonAi(
  playerA: NormalizedPlayer | null,
  playerB: NormalizedPlayer | null
): UsePlayerComparisonAiResult {
  const [comparison, setComparison] = useState<PlayerComparisonData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState<number>(0);

  useEffect(() => {
    if (!playerA || !playerB) {
      setComparison(null);
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    clientGeminiApi
      .comparePlayers(playerA, playerB)
      .then(data => {
        if (isMounted) {
          setComparison(data);
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
  }, [playerA?.id, playerB?.id, trigger]);

  const refetch = () => setTrigger(t => t + 1);

  return { comparison, loading, error, refetch };
}
