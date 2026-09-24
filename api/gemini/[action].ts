import type { IncomingMessage, ServerResponse } from 'http';
import { geminiIntelligenceService } from '../../server/services/gemini/geminiService.ts';

interface VercelReq extends IncomingMessage {
  query?: Record<string, string | string[]>;
  body?: unknown;
}

interface VercelRes extends ServerResponse {
  status?: (statusCode: number) => VercelRes;
  json?: (data: unknown) => void;
}

/**
 * Helper to safely extract JSON body across Vercel environments
 */
async function parseBody(req: VercelReq): Promise<Record<string, unknown>> {
  if (req.body && typeof req.body === 'object') {
    return req.body as Record<string, unknown>;
  }
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body) as Record<string, unknown>;
    } catch {
      return {};
    }
  }

  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk.toString();
    });
    req.on('end', () => {
      try {
        if (!raw.trim()) {
          resolve({});
        } else {
          resolve(JSON.parse(raw) as Record<string, unknown>);
        }
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

function sendResponse(res: VercelRes, statusCode: number, data: unknown): void {
  const customStatus = res.status;
  const customJson = res.json;
  if (typeof customStatus === 'function' && typeof customJson === 'function') {
    customStatus.call(res, statusCode);
    customJson.call(res, data);
    return;
  }
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify(data));
}

/**
 * Thin Vercel Serverless Function Handler for /api/gemini/*
 * Reuses existing geminiIntelligenceService without duplicating any business logic.
 * Keeps GEMINI_API_KEY strictly server-side.
 */
export default async function handler(req: VercelReq, res: VercelRes): Promise<void> {
  // Extract action from query param (Vercel dynamic route) or fallback to url extraction
  const actionParam = req.query?.action;
  let action = Array.isArray(actionParam) ? actionParam[0] : actionParam;

  if (!action && req.url) {
    const cleanUrl = req.url.split('?')[0];
    const segments = cleanUrl.replace(/^\/api\/gemini\/?/, '').split('/');
    action = segments[0];
  }

  if (!action) {
    return sendResponse(res, 400, { error: 'Missing Gemini action' });
  }

  try {
    if (req.method === 'GET') {
      if (action === 'health') {
        const health = await geminiIntelligenceService.getHealthStatus();
        return sendResponse(res, 200, health);
      }
      return sendResponse(res, 405, { error: 'Method Not Allowed' });
    }

    if (req.method === 'POST') {
      const body = await parseBody(req);

      switch (action) {
        case 'health': {
          const health = await geminiIntelligenceService.getHealthStatus();
          return sendResponse(res, 200, health);
        }

        case 'player-intelligence': {
          const player = body.player as Parameters<typeof geminiIntelligenceService.getPlayerIntelligence>[0];
          if (!player || !player.id || !player.name) {
            return sendResponse(res, 400, { error: 'Missing required player object with id and name' });
          }
          const data = await geminiIntelligenceService.getPlayerIntelligence(player);
          return sendResponse(res, 200, data);
        }

        case 'player-enrichment': {
          const player = body.player as Parameters<typeof geminiIntelligenceService.getPlayerEnrichment>[0];
          if (!player || !player.id || !player.name) {
            return sendResponse(res, 400, { error: 'Missing required player object' });
          }
          const data = await geminiIntelligenceService.getPlayerEnrichment(player);
          return sendResponse(res, 200, data);
        }

        case 'player-stats-gap': {
          const player = body.player as Parameters<typeof geminiIntelligenceService.getPlayerStatsGap>[0];
          if (!player || !player.id) {
            return sendResponse(res, 400, { error: 'Missing required player' });
          }
          const data = await geminiIntelligenceService.getPlayerStatsGap(player);
          return sendResponse(res, 200, data);
        }

        case 'player-comparison': {
          const playerA = body.playerA as Parameters<typeof geminiIntelligenceService.comparePlayers>[0];
          const playerB = body.playerB as Parameters<typeof geminiIntelligenceService.comparePlayers>[1];
          if (!playerA || !playerB) {
            return sendResponse(res, 400, { error: 'Missing playerA or playerB' });
          }
          const data = await geminiIntelligenceService.comparePlayers(playerA, playerB);
          return sendResponse(res, 200, data);
        }

        case 'query': {
          const query = body.query as string;
          const context = body.context as Record<string, unknown> | undefined;
          if (!query || typeof query !== 'string') {
            return sendResponse(res, 400, { error: 'Missing query string' });
          }
          const data = await geminiIntelligenceService.answerCricketQuery(query, context);
          return sendResponse(res, 200, data);
        }

        case 'card-insight': {
          const player = body.player as Parameters<typeof geminiIntelligenceService.generateCardInsight>[0];
          const cardMeta = body.cardMeta as Parameters<typeof geminiIntelligenceService.generateCardInsight>[1];
          if (!player || !player.id) {
            return sendResponse(res, 400, { error: 'Missing player' });
          }
          const data = await geminiIntelligenceService.generateCardInsight(player, cardMeta);
          return sendResponse(res, 200, data);
        }

        case 'current-context': {
          const topic = body.topic as string;
          if (!topic || typeof topic !== 'string') {
            return sendResponse(res, 400, { error: 'Missing topic' });
          }
          const data = await geminiIntelligenceService.getCurrentCricketContext(topic);
          return sendResponse(res, 200, data);
        }

        default:
          return sendResponse(res, 404, { error: `Unknown Gemini endpoint action: ${action}` });
      }
    }

    return sendResponse(res, 405, { error: 'Method Not Allowed' });
  } catch (err) {
    console.error(`[VercelGeminiHandler] Error handling action ${action}:`, err);
    return sendResponse(res, 500, {
      error: 'Internal Server Error',
      message: (err as Error).message,
    });
  }
}
