import { useState, useEffect } from 'react';
import type { OrchestratedPlayer } from '../services/cricketDataService';
import { cricketDataService } from '../services/cricketDataService';

export interface UseCricketOrchestratorResult {
  player: OrchestratedPlayer | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useCricketOrchestrator(
  playerId: string | null,
  options?: { includeGemini?: boolean; cardTier?: string }
): UseCricketOrchestratorResult {
  const [player, setPlayer] = useState<OrchestratedPlayer | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState<number>(0);

  useEffect(() => {
    if (!playerId) {
      setPlayer(null);
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    cricketDataService
      .getOrchestratedPlayer(playerId, options)
      .then(data => {
        if (isMounted) {
          setPlayer(data);
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
  }, [playerId, options?.includeGemini, options?.cardTier, trigger]);

  const refetch = () => setTrigger(t => t + 1);

  return { player, loading, error, refetch };
}
