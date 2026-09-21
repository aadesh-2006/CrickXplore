/**
 * Centralized CricketData / CricAPI HTTP Client
 * Resolves API key from VITE_CRICKET_API_KEY environment variable.
 */

const BASE_URL = 'https://api.cricapi.com/v1';

export class CricketApiClient {
  private apiKey: string;
  private cache: Map<string, { data: unknown; timestamp: number }>;
  private cacheTTL: number; // 5 minutes cache TTL

  constructor() {
    this.apiKey = (import.meta.env.VITE_CRICKET_API_KEY as string | undefined)?.trim() || '';
    this.cache = new Map();
    this.cacheTTL = 5 * 60 * 1000;
  }

  public hasApiKey(): boolean {
    return this.apiKey.length > 0;
  }

  public getApiKeyStatus(): { configured: boolean; maskedKey?: string } {
    if (!this.hasApiKey()) {
      return { configured: false };
    }
    const visibleChars = Math.min(4, Math.floor(this.apiKey.length / 2));
    const masked = `${this.apiKey.slice(0, visibleChars)}...${this.apiKey.slice(-visibleChars)}`;
    return { configured: true, maskedKey: masked };
  }

  public async get<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    if (!this.hasApiKey()) {
      throw new Error('CRICKET_API_KEY_MISSING');
    }

    const queryParams = new URLSearchParams({
      apikey: this.apiKey,
      ...params,
    });

    const url = `${BASE_URL}/${endpoint}?${queryParams.toString()}`;
    const cacheKey = url;

    // Check memory cache
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
      return cached.data as T;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`CricketData API error: ${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      if (json.status !== 'success' && json.status !== 'ok') {
        const errorMsg = json.message || json.reason || 'Failed to fetch cricket data';
        throw new Error(errorMsg);
      }

      // Store in cache
      this.cache.set(cacheKey, { data: json, timestamp: Date.now() });
      return json as T;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown network error';
      console.warn(`[CrickXplore API Client] Request failed for ${endpoint}:`, message);
      throw err;
    }
  }

  public clearCache(): void {
    this.cache.clear();
  }
}

export const cricketApiClient = new CricketApiClient();
