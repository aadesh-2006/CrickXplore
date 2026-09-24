import type { Plugin, ViteDevServer } from 'vite';
import type { IncomingMessage, ServerResponse } from 'http';
import { geminiIntelligenceService } from '../services/gemini/geminiService.ts';

/**
 * Vite Dev/Preview Server Plugin for Server-Side Gemini Endpoints
 * Keeps GEMINI_API_KEY strictly server-side and invisible to client bundles.
 */

async function parseJsonBody<T>(req: IncomingMessage): Promise<T> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        if (!body.trim()) {
          resolve({} as T);
        } else {
          resolve(JSON.parse(body) as T);
        }
      } catch (err) {
        reject(new Error(`Invalid JSON body: ${(err as Error).message}`));
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res: ServerResponse, statusCode: number, data: unknown): void {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify(data));
}

export function viteGeminiPlugin(): Plugin {
  return {
    name: 'vite-gemini-server-plugin',
    configureServer(server: ViteDevServer) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '';

        // Only intercept /api/gemini/* routes
        if (!url.startsWith('/api/gemini')) {
          return next();
        }

        const endpoint = url.split('?')[0];

        try {
          if (req.method === 'GET' && endpoint === '/api/gemini/health') {
            const health = await geminiIntelligenceService.getHealthStatus();
            return sendJson(res, 200, health);
          }

          if (req.method === 'POST') {
            const body = await parseJsonBody<Record<string, unknown>>(req);

            switch (endpoint) {
              case '/api/gemini/player-intelligence': {
                const player = body.player as Parameters<typeof geminiIntelligenceService.getPlayerIntelligence>[0];
                if (!player || !player.id || !player.name) {
                  return sendJson(res, 400, { error: 'Missing required player object with id and name' });
                }
                const data = await geminiIntelligenceService.getPlayerIntelligence(player);
                return sendJson(res, 200, data);
              }

              case '/api/gemini/player-enrichment': {
                const player = body.player as Parameters<typeof geminiIntelligenceService.getPlayerEnrichment>[0];
                if (!player || !player.id || !player.name) {
                  return sendJson(res, 400, { error: 'Missing required player object' });
                }
                const data = await geminiIntelligenceService.getPlayerEnrichment(player);
                return sendJson(res, 200, data);
              }

              case '/api/gemini/player-stats-gap': {
                const player = body.player as Parameters<typeof geminiIntelligenceService.getPlayerStatsGap>[0];
                if (!player || !player.id) {
                  return sendJson(res, 400, { error: 'Missing required player' });
                }
                const data = await geminiIntelligenceService.getPlayerStatsGap(player);
                return sendJson(res, 200, data);
              }

              case '/api/gemini/player-comparison': {
                const playerA = body.playerA as Parameters<typeof geminiIntelligenceService.comparePlayers>[0];
                const playerB = body.playerB as Parameters<typeof geminiIntelligenceService.comparePlayers>[1];
                if (!playerA || !playerB) {
                  return sendJson(res, 400, { error: 'Missing playerA or playerB' });
                }
                const data = await geminiIntelligenceService.comparePlayers(playerA, playerB);
                return sendJson(res, 200, data);
              }

              case '/api/gemini/query': {
                const query = body.query as string;
                const context = body.context as Record<string, unknown> | undefined;
                if (!query || typeof query !== 'string') {
                  return sendJson(res, 400, { error: 'Missing query string' });
                }
                const data = await geminiIntelligenceService.answerCricketQuery(query, context);
                return sendJson(res, 200, data);
              }

              case '/api/gemini/card-insight': {
                const player = body.player as Parameters<typeof geminiIntelligenceService.generateCardInsight>[0];
                const cardMeta = body.cardMeta as Parameters<typeof geminiIntelligenceService.generateCardInsight>[1];
                if (!player || !player.id) {
                  return sendJson(res, 400, { error: 'Missing player' });
                }
                const data = await geminiIntelligenceService.generateCardInsight(player, cardMeta);
                return sendJson(res, 200, data);
              }

              case '/api/gemini/current-context': {
                const topic = body.topic as string;
                if (!topic || typeof topic !== 'string') {
                  return sendJson(res, 400, { error: 'Missing topic' });
                }
                const data = await geminiIntelligenceService.getCurrentCricketContext(topic);
                return sendJson(res, 200, data);
              }

              default:
                return sendJson(res, 404, { error: `Unknown Gemini endpoint: ${endpoint}` });
            }
          }

          return sendJson(res, 405, { error: 'Method Not Allowed' });
        } catch (err) {
          console.error(`[ViteGeminiPlugin] Error handling ${endpoint}:`, err);
          return sendJson(res, 500, {
            error: 'Internal Server Error',
            message: (err as Error).message,
          });
        }
      });
    },
  };
}
