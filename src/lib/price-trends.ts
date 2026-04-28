import { prisma } from './prisma';

const POKETRACE_BASE = 'https://api.poketrace.com/v1';
const PRICE_TREND_CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

/** Pricing from a single source (eBay or TCGPlayer) and tier (NEAR_MINT, etc.) */
export interface TierPrice {
  avg: number | null;
  low: number | null;
  high: number | null;
  saleCount: number | null;
  avg1d: number | null;
  avg7d: number | null;
  avg30d: number | null;
}

/** What we cache and expose to the client */
export interface PriceTrendData {
  poketraceId: string | null;
  currency: string;
  ebay: TierPrice | null;       // eBay NEAR_MINT sales
  tcgplayer: TierPrice | null;  // TCGPlayer NEAR_MINT prices
  tcgplayerUrl: string | null;  // Link to TCGPlayer product page
  ebaySearchUrl: string | null; // Link to eBay sold listings search
  lastUpdated: string | null;
}

/** Card lookup params for the PokeTrace search */
export interface CardLookupParams {
  name: string;
  setName: string;
  cardNumber: string;
  variant: string | null;
}

/**
 * Map the app's variant labels to PokeTrace variant enum values.
 * PokeTrace: Normal, Holofoil, Reverse_Holofoil, 1st_Edition, 1st_Edition_Holofoil
 */
function mapVariant(variant: string | null): string | undefined {
  if (!variant) return undefined;
  const map: Record<string, string> = {
    'Normal': 'Normal',
    'Holo': 'Holofoil',
    'Reverse Holo': 'Reverse_Holofoil',
    '1st Edition Holo': '1st_Edition_Holofoil',
  };
  return map[variant];
}


/**
 * Check if a PokeTrace cardNumber matches our PokéTCG number.
 * PokeTrace uses "198/165", PokéTCG uses "198".
 */
function cardNumberMatches(poketraceNumber: string, ourNumber: string): boolean {
  // Exact match
  if (poketraceNumber === ourNumber) return true;
  // PokeTrace "198/165" starts with our "198"
  if (poketraceNumber.startsWith(ourNumber + '/')) return true;
  // Our number might include the slash already
  if (ourNumber.startsWith(poketraceNumber + '/')) return true;
  return false;
}

async function searchPoketraceCard(params: CardLookupParams): Promise<PriceTrendData | null> {
  const apiKey = process.env.POKETRACE_API_KEY;
  if (!apiKey) return null;

  try {
    const variant = mapVariant(params.variant);

    // Search by name only — set slugs and card number formats differ between APIs
    const qs = new URLSearchParams({
      search: params.name,
      market: 'US',
      limit: '20',
    });
    if (variant) qs.set('variant', variant);

    const res = await fetch(`${POKETRACE_BASE}/cards?${qs.toString()}`, {
      headers: { 'X-API-Key': apiKey },
    });
    if (!res.ok) return null;

    const json = await res.json();
    const cards = json.data;
    if (!cards || cards.length === 0) return null;

    // Match by card number + set name
    const setNameLower = params.setName.toLowerCase();
    const match =
      // Best: card number matches AND set name contains our set name
      cards.find((c: any) =>
        cardNumberMatches(c.cardNumber ?? '', params.cardNumber) &&
        (c.set?.name ?? '').toLowerCase().includes(setNameLower)
      ) ??
      // Good: card number matches (any set)
      cards.find((c: any) =>
        cardNumberMatches(c.cardNumber ?? '', params.cardNumber)
      ) ??
      // Fallback: first result
      null;

    if (!match) return null;
    return extractPriceTrendData(match);
  } catch {
    return null;
  }
}

async function fetchPoketraceById(poketraceId: string): Promise<PriceTrendData | null> {
  const apiKey = process.env.POKETRACE_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(`${POKETRACE_BASE}/cards/${poketraceId}`, {
      headers: { 'X-API-Key': apiKey },
    });
    if (!res.ok) return null;

    const json = await res.json();
    return extractPriceTrendData(json.data);
  } catch {
    return null;
  }
}

function extractPriceTrendData(card: any): PriceTrendData {
  const prices = card.prices ?? {};

  // Extract eBay NEAR_MINT tier
  const ebayRaw = prices.ebay?.NEAR_MINT ?? null;
  const ebay: TierPrice | null = ebayRaw ? {
    avg: ebayRaw.avg ?? null,
    low: ebayRaw.low ?? null,
    high: ebayRaw.high ?? null,
    saleCount: ebayRaw.saleCount ?? null,
    avg1d: ebayRaw.avg1d ?? null,
    avg7d: ebayRaw.avg7d ?? null,
    avg30d: ebayRaw.avg30d ?? null,
  } : null;

  // Extract TCGPlayer NEAR_MINT tier
  const tcgRaw = prices.tcgplayer?.NEAR_MINT ?? null;
  const tcgplayer: TierPrice | null = tcgRaw ? {
    avg: tcgRaw.avg ?? null,
    low: tcgRaw.low ?? null,
    high: tcgRaw.high ?? null,
    saleCount: tcgRaw.saleCount ?? null,
    avg1d: tcgRaw.avg1d ?? null,
    avg7d: tcgRaw.avg7d ?? null,
    avg30d: tcgRaw.avg30d ?? null,
  } : null;

  // Build marketplace URLs
  const tcgplayerId = card.refs?.tcgplayerId;
  const tcgplayerUrl = tcgplayerId
    ? `https://www.tcgplayer.com/product/${tcgplayerId}`
    : null;

  const cardName = card.name ?? '';
  const setName = card.set?.name ?? '';
  const ebayQuery = `${cardName} ${setName} ${card.cardNumber ?? ''}`.trim();
  const ebaySearchUrl = ebayQuery
    ? `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(ebayQuery)}&LH_Complete=1&LH_Sold=1`
    : null;

  return {
    poketraceId: card.id ?? null,
    currency: card.currency ?? 'USD',
    ebay,
    tcgplayer,
    tcgplayerUrl,
    ebaySearchUrl,
    lastUpdated: card.lastUpdated ?? null,
  };
}

// --- Cache layer ---

/** Sentinel value cached when PokeTrace has no data for a card */
const NO_DATA_SENTINEL = '{"_noData":true}';

type CacheResult =
  | { hit: true; data: PriceTrendData | null }  // cached (data or explicit "no data")
  | { hit: false };                               // not cached or expired

async function readCache(externalId: string): Promise<CacheResult> {
  const record = await prisma.priceTrend.findUnique({
    where: { externalId },
    select: { data: true, fetchedAt: true },
  });

  if (!record) return { hit: false };

  const age = Date.now() - record.fetchedAt.getTime();
  if (age > PRICE_TREND_CACHE_TTL_MS) return { hit: false };

  try {
    const parsed = JSON.parse(record.data);
    // Cached "no data" sentinel — card has no PokeTrace match
    if (parsed._noData) return { hit: true, data: null };
    return { hit: true, data: parsed as PriceTrendData };
  } catch {
    return { hit: false };
  }
}

async function writeCache(externalId: string, data: PriceTrendData | null): Promise<void> {
  const json = data ? JSON.stringify(data) : NO_DATA_SENTINEL;
  await prisma.priceTrend.upsert({
    where: { externalId },
    create: { externalId, data: json },
    update: { data: json, fetchedAt: new Date() },
  });
}

// --- Public API ---

export async function getPriceTrendForCard(
  externalId: string,
  params: CardLookupParams,
): Promise<PriceTrendData | null> {
  // 1. Check cache (includes "no data" sentinel)
  const cache = await readCache(externalId);
  if (cache.hit) return cache.data;

  // 2. If we have an expired entry with a PokeTrace UUID, try direct refresh
  const expiredRecord = await prisma.priceTrend.findUnique({
    where: { externalId },
    select: { data: true },
  });
  if (expiredRecord) {
    try {
      const prev = JSON.parse(expiredRecord.data);
      if (prev.poketraceId) {
        const refreshed = await fetchPoketraceById(prev.poketraceId);
        if (refreshed) {
          await writeCache(externalId, refreshed);
          return refreshed;
        }
      }
    } catch { /* fall through to search */ }
  }

  // 3. Search PokeTrace by name/set/number
  const fetched = await searchPoketraceCard(params);

  // Cache the result regardless — null means "no data found"
  await writeCache(externalId, fetched);
  return fetched;
}
