import { useState, useCallback } from 'react';
import type { CricketQueryData } from '../../server/services/gemini/geminiSchemas';
import { clientGeminiApi } from '../services/gemini/geminiClient';

export interface UseCricketQueryResult {
  data: CricketQueryData | null;
  loading: boolean;
  error: string | null;
  ask: (query: string, context?: Record<string, unknown>) => Promise<CricketQueryData | null>;
  reset: () => void;
}

export function useCricketQuery(): UseCricketQueryResult {
  const [data, setData] = useState<CricketQueryData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const ask = useCallback(async (query: string, context?: Record<string, unknown>) => {
    if (!query.trim()) return null;
    setLoading(true);
    setError(null);

    try {
      const response = await clientGeminiApi.query(query, context);
      setData(response);
      return response;
    } catch (err) {
      const msg = (err as Error).message;
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, ask, reset };
}
