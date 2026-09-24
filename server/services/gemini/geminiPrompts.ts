/**
 * Cricket Intelligence System Prompts & Generators
 * Enforces strict JSON output, factual conservatism, and source tracking.
 */

export const CRICKET_INTELLIGENCE_SYSTEM_PROMPT = `
You are the CrickXplore Cricket Intelligence Engine.
You provide deep, authoritative, tactically astute, and historical cricket analysis.

CRITICAL RULES:
1. OUTPUT FORMAT: Respond ONLY with valid, RFC 8259 compliant JSON matching the requested schema. Do not enclose in markdown code blocks if raw json is requested, or ensure valid JSON object.
2. NUMERICAL INTEGRITY: NEVER invent or hallucinate precise career stats (matches, runs, wickets, averages). If you are not 100% certain of a specific number, set it to null and provide qualitative insight.
3. FACT CONSERVATISM: Clearly distinguish between verified historical facts and subjective tactical evaluations.
4. IPL & T20 SEPARATION: When discussing T20, cleanly separate T20 International (T20I) performance from Indian Premier League (IPL) and other domestic leagues.
5. CONCISE & EVOCATIVE: Provide vivid tactical breakdowns, acknowledging historical context, era differences, and conditions.
`;

export function buildPlayerIntelligencePrompt(player: {
  id: string;
  name: string;
  country: string;
  role: string;
  battingStyle?: string;
  bowlingStyle?: string;
  stats?: Record<string, unknown>;
  ipl2026Team?: string;
}): string {
  return `
Analyze the cricket career and tactical identity of:
Player: "${player.name}"
Country: ${player.country}
Role: ${player.role}
Batting Style: ${player.battingStyle || 'Unknown'}
Bowling Style: ${player.bowlingStyle || 'Unknown'}
IPL 2026 Franchise: ${player.ipl2026Team || 'None / Not Mapped'}

Return a JSON object with this exact structure:
{
  "source": "gemini",
  "playerId": "${player.id}",
  "playerName": "${player.name}",
  "narrative": "A compelling 2-3 sentence overview of the player's legacy, archetype, and impact on modern/historical cricket.",
  "tacticalProfile": {
    "strengths": ["List 2-4 tactical strengths, e.g., 'exceptional cover drive against high pace'"],
    "weaknesses": ["List 1-3 vulnerabilities, e.g., 'susceptible to 5th stump outswinger outside off'"],
    "signatureShotsOrDeliveries": ["List 1-3 iconic shots or bowling weapons"],
    "matchRole": "Tactical assignment (e.g. Anchor, Finisher, Enforcer, Death-overs Specialist)",
    "clutchRating": "Description of big-match temperament"
  },
  "formatAnalysis": {
    "test": "Short analysis of Test suitability and achievements (or null/empty if unplayed)",
    "odi": "Short analysis of ODI role and tempo control",
    "t20i": "Short analysis of T20I adaptability and power/economy metrics",
    "ipl": "Short analysis of IPL role, franchise legacy, and high-pressure execution"
  },
  "facts": [
    {
      "field": "string (e.g., 'primary_format', 'world_cup_winner')",
      "value": "string/number/boolean",
      "confidence": "high|medium|low",
      "source": "gemini",
      "verified": false,
      "notes": "Context"
    }
  ],
  "caveats": ["Any caveats regarding stats or format coverage"],
  "generatedAt": "${new Date().toISOString()}"
}
`;
}

export function buildPlayerEnrichmentPrompt(player: {
  id: string;
  name: string;
  country: string;
  role: string;
}): string {
  return `
Provide factual enrichment for player:
Player: "${player.name}" (${player.country}, ${player.role})

Focus specifically on filling T20I and IPL context, career timeline, and milestone context.
Return a JSON object with this exact structure:
{
  "source": "gemini",
  "playerId": "${player.id}",
  "playerName": "${player.name}",
  "t20iStats": {
    "matches": number_or_null,
    "runs": number_or_null,
    "battingAverage": number_or_null,
    "strikeRate": number_or_null,
    "wickets": number_or_null,
    "bowlingEconomy": number_or_null,
    "fifties": number_or_null,
    "centuries": number_or_null
  },
  "iplStats": {
    "franchiseHistory": ["Team names played for chronologically"],
    "recentRole": "Role in recent IPL seasons",
    "matches": number_or_null,
    "runs": number_or_null,
    "battingAverage": number_or_null,
    "strikeRate": number_or_null,
    "wickets": number_or_null,
    "bowlingEconomy": number_or_null,
    "iplTitles": ["Years or titles won, if any"]
  },
  "biographicalContext": {
    "bioSummary": "Brief biographical paragraph covering origin, domestic rise, and international stature",
    "internationalDebutYear": number_or_null,
    "careerEra": "e.g. Modern Era (2010-present) or Golden Era",
    "notableMilestones": ["Key milestone 1", "Key milestone 2"]
  },
  "facts": [
    {
      "field": "string",
      "value": "string/number/boolean",
      "confidence": "high|medium|low",
      "source": "gemini",
      "verified": false
    }
  ],
  "caveats": ["Stats provided are for enrichment and context"],
  "generatedAt": "${new Date().toISOString()}"
}
`;
}

export function buildPlayerComparisonPrompt(
  playerA: { id: string; name: string; country: string; role: string },
  playerB: { id: string; name: string; country: string; role: string }
): string {
  return `
Compare these two cricket players in depth:
Player A: "${playerA.name}" (${playerA.country}, ${playerA.role})
Player B: "${playerB.name}" (${playerB.country}, ${playerB.role})

Return a JSON object with this exact structure:
{
  "source": "gemini",
  "playerAId": "${playerA.id}",
  "playerAName": "${playerA.name}",
  "playerBId": "${playerB.id}",
  "playerBName": "${playerB.name}",
  "verdict": "A sharp, decisive analytical summary comparing their overall stature, peaks, and tactical utility.",
  "tacticalAdvantage": {
    "playerA": ["Key conditions or scenarios where Player A has the edge"],
    "playerB": ["Key conditions or scenarios where Player B has the edge"]
  },
  "formatByFormatVerdict": {
    "test": "Comparative assessment in Test cricket",
    "odi": "Comparative assessment in ODI cricket",
    "t20i": "Comparative assessment in T20I cricket",
    "ipl": "Comparative assessment in IPL / T20 leagues"
  },
  "headToHeadContext": "Notable head-to-head encounters or era rivalries if applicable",
  "comparativeNarrative": "A balanced 2-paragraph essay dissecting their skillsets, consistency, and clutch factor.",
  "caveats": ["Era normalization caveats or sample size caveats"],
  "generatedAt": "${new Date().toISOString()}"
}
`;
}

export function buildCardInsightPrompt(player: {
  id: string;
  name: string;
  country: string;
  role: string;
}, cardMeta?: { tier?: string; serialNumber?: string }): string {
  return `
Generate collectible card lore and intelligence for digital cricket card:
Player: "${player.name}" (${player.country}, ${player.role})
Card Tier: ${cardMeta?.tier || 'Legendary'}

Return a JSON object with this exact structure:
{
  "source": "gemini",
  "playerId": "${player.id}",
  "playerName": "${player.name}",
  "cardTitle": "An evocative title, e.g. 'The Modern Maestro' or 'The Swing King'",
  "collectorLore": "Rich narrative lore describing the player's aura, clutch moments, and why this card is prized by collectors.",
  "rarityInsight": "Explanation of why this card's stat profile is elite or unique.",
  "iconicStatHighlights": ["Highlight 1", "Highlight 2", "Highlight 3"],
  "flavorQuote": "An inspiring, memorable quote by or about the player",
  "generatedAt": "${new Date().toISOString()}"
}
`;
}

export function buildCricketQueryPrompt(query: string, context?: Record<string, unknown>): string {
  return `
Answer this natural-language cricket query with high factual accuracy:
Query: "${query}"
Additional Context: ${context ? JSON.stringify(context) : 'None'}

Return a JSON object with this exact structure:
{
  "source": "gemini",
  "query": "${query.replace(/"/g, '\\"')}",
  "answer": "Accurate, well-explained cricket answer formatted in clear markdown.",
  "relatedEntities": {
    "players": ["Names of mentioned or relevant players"],
    "teams": ["Names of mentioned or relevant teams/franchises"],
    "tournaments": ["Names of relevant tournaments"],
    "eras": ["Relevant cricket eras"]
  },
  "confidence": "high|medium|low",
  "citations": ["Factual references or tournament editions"],
  "caveats": [],
  "generatedAt": "${new Date().toISOString()}"
}
`;
}

export function buildCurrentCricketContextPrompt(topic: string): string {
  return `
Provide up-to-date cricket context and recent developments on:
Topic: "${topic}"

Return a JSON object with this exact structure:
{
  "source": "gemini",
  "topic": "${topic.replace(/"/g, '\\"')}",
  "summary": "Concise overview of the current status, recent series, or tournament context.",
  "recentEvents": ["Bullet point of recent match/event 1", "Bullet point 2"],
  "tournamentContext": "Relevant tournament or league positioning (e.g. IPL 2026, WTC cycle, ICC World Cup)",
  "keyPerformers": ["Names of standout performers"],
  "sources": ["CricXplore Intelligence", "ICC / Official Records"],
  "generatedAt": "${new Date().toISOString()}"
}
`;
}
