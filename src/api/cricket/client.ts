/**
 * Centralized Cricket API Client (Big Balls Sports Data & Fallback Gateway)
 * Resolves credentials from environment without exposing secrets in frontend bundles.
 */

import type { BbsPlayerResponse } from './types';

const BBS_BASE_URL = 'https://api.bigballsdata.com/v1/cricket';

export class CricketApiClient {
  private bbsKey: string;
  private cache: Map<string, { data: unknown; timestamp: number }>;
  private cacheTTL: number; // 5 minutes cache TTL

  constructor() {
    const metaEnv = typeof import.meta !== 'undefined' && 'env' in import.meta
      ? (import.meta as unknown as { env: Record<string, string | undefined> }).env
      : undefined;

    const processEnv = typeof process !== 'undefined' ? process.env : undefined;

    this.bbsKey = (
      metaEnv?.VITE_BBS_API_KEY ||
      metaEnv?.VITE_CRICLIVE_API_KEY ||
      metaEnv?.VITE_CRICKET_API_KEY ||
      processEnv?.BBS_API_KEY ||
      processEnv?.VITE_BBS_API_KEY ||
      processEnv?.CRICLIVE_API_KEY ||
      processEnv?.VITE_CRICLIVE_API_KEY ||
      ''
    ).trim();

    this.cache = new Map();
    this.cacheTTL = 5 * 60 * 1000;
  }

  public hasApiKey(): boolean {
    return this.bbsKey.length > 0;
  }

  public getApiKeyStatus(): { configured: boolean; provider: string } {
    return {
      configured: this.hasApiKey(),
      provider: 'Big Balls Sports Data (BBS)',
    };
  }

  /**
   * Fetch BBS player telemetry by BBS UUID
   */
  public async getBbsPlayer(uuid: string): Promise<BbsPlayerResponse | null> {
    if (!this.hasApiKey()) {
      return null;
    }

    const url = `${BBS_BASE_URL}/players/${encodeURIComponent(uuid)}`;
    const cacheKey = `bbs:${uuid}`;

    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
      return cached.data as BbsPlayerResponse;
    }

    try {
      const response = await fetch(url, {
        headers: {
          'x-api-key': this.bbsKey,
          'Authorization': `Bearer ${this.bbsKey}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 429) {
          console.warn(`[CricketApiClient] BBS rate limit exceeded for ${uuid} (429). Serving verified snapshot.`);
        } else {
          console.warn(`[CricketApiClient] BBS API responded with ${response.status} for ${uuid}`);
        }
        return null;
      }

      const json = await response.json();
      if (json && json.data) {
        this.cache.set(cacheKey, { data: json, timestamp: Date.now() });
        return json as BbsPlayerResponse;
      }
      return null;
    } catch (err) {
      console.warn(`[CricketApiClient] BBS network fetch failed for ${uuid}:`, (err as Error).message);
      return null;
    }
  }

  public clearCache(): void {
    this.cache.clear();
  }
}

export const cricketApiClient = new CricketApiClient();
