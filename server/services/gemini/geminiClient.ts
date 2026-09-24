import { GoogleGenAI } from '@google/genai';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Server-side Gemini Client
 * Uses official @google/genai SDK with server-only key resolution.
 * Key is NEVER exposed to the client or browser bundle.
 */

// Model priority cascade: validated operational models
const CANDIDATE_MODELS = [
  'gemini-3-flash-preview',
  'gemini-3.5-flash',
  'gemini-3.6-flash',
  'gemini-flash-latest',
];

function resolveServerApiKey(): string {
  // Check process.env first
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0) {
    return process.env.GEMINI_API_KEY.trim();
  }

  // Check local .env file if running in Node server/Vite plugin environment
  try {
    const cwd = process.cwd ? process.cwd() : '.';
    const envPaths = [
      path.resolve(cwd, '.env'),
      path.resolve(cwd, '../.env'),
      path.resolve(cwd, '../../.env'),
    ];

    for (const envPath of envPaths) {
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf-8');
        for (const line of content.split('\n')) {
          const trimmed = line.trim();
          if (trimmed.startsWith('GEMINI_API_KEY=')) {
            const key = trimmed.substring('GEMINI_API_KEY='.length).trim();
            if (key) return key;
          }
        }
      }
    }
  } catch {
    // Ignore fs read errors in restricted contexts
  }

  return '';
}

export class GeminiServerClient {
  private apiKey: string;
  private aiClient: GoogleGenAI | null = null;
  private activeModel: string = CANDIDATE_MODELS[0];
  private modelValidated: boolean = false;
  private timeoutMs: number = 15000;

  constructor(customKey?: string) {
    this.apiKey = customKey !== undefined ? customKey : resolveServerApiKey();
    if (this.apiKey) {
      this.aiClient = new GoogleGenAI({ apiKey: this.apiKey });
    }
  }

  public hasApiKey(): boolean {
    return this.apiKey.length > 0;
  }

  public getActiveModel(): string {
    return this.activeModel;
  }

  /**
   * Validates and selects an active working Gemini model
   */
  public async ensureValidatedModel(): Promise<string> {
    if (this.modelValidated && this.aiClient) {
      return this.activeModel;
    }

    if (!this.aiClient) {
      throw new Error('GEMINI_API_KEY_UNAVAILABLE');
    }

    for (const modelName of CANDIDATE_MODELS) {
      try {
        const response = await this.aiClient.models.generateContent({
          model: modelName,
          contents: 'PING',
        });
        if (response && response.text) {
          this.activeModel = modelName;
          this.modelValidated = true;
          return this.activeModel;
        }
      } catch {
        // Try next candidate model in cascade
        continue;
      }
    }

    // Default to primary model if cascade exhausted
    this.activeModel = CANDIDATE_MODELS[0];
    return this.activeModel;
  }

  /**
   * Executes structured content generation and parses JSON response
   */
  public async generateStructured<T>(
    prompt: string,
    systemInstruction?: string,
    timeoutOverride?: number
  ): Promise<T> {
    if (!this.aiClient) {
      throw new Error('GEMINI_API_KEY_NOT_CONFIGURED');
    }

    const timeout = timeoutOverride || this.timeoutMs;
    const modelToUse = this.activeModel;

    const generatePromise = (async () => {
      const response = await this.aiClient!.models.generateContent({
        model: modelToUse,
        contents: prompt,
        config: {
          systemInstruction: systemInstruction || undefined,
          responseMimeType: 'application/json',
        },
      });

      const rawText = response.text?.trim() || '';
      if (!rawText) {
        throw new Error('GEMINI_EMPTY_RESPONSE');
      }

      // Sanitize possible markdown code fence wrappers if present
      let cleanJson = rawText;
      if (cleanJson.startsWith('```json')) {
        cleanJson = cleanJson.slice(7);
      } else if (cleanJson.startsWith('```')) {
        cleanJson = cleanJson.slice(3);
      }
      if (cleanJson.endsWith('```')) {
        cleanJson = cleanJson.slice(0, -3);
      }
      cleanJson = cleanJson.trim();

      try {
        const parsed = JSON.parse(cleanJson) as T;
        return parsed;
      } catch (parseErr) {
        throw new Error(`GEMINI_JSON_PARSE_ERROR: ${(parseErr as Error).message}`);
      }
    })();

    // Apply strict timeout
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`GEMINI_TIMEOUT: Request exceeded ${timeout}ms`)), timeout)
    );

    return Promise.race([generatePromise, timeoutPromise]);
  }
}

export const geminiServerClient = new GeminiServerClient();
