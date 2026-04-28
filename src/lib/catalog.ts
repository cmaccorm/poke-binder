import { prisma } from './prisma';
import type { CardReference } from './types';

const API_BASE = 'https://api.pokemontcg.io/v2';

export interface PokemonTcgCard {
  id: string;
  name: string;
  number: string;
  set: {
    id: string;
    name: string;
  };
  images: {
    small: string;
    large: string;
  };
  rarity?: string;
  artist?: string;
  types?: string[];
  tcgplayer?: {
    prices?: {
      normal?: { market: number };
      holofoil?: { market: number };
      reverseHolofoil?: { market: number };
      '1stEditionHolofoil'?: { market: number };
    };
  };
  cardmarket?: {
    prices?: {
      reverseHoloSell?: number;
      reverseHoloLow?: number;
      reverseHoloTrend?: number;
      averageSellPrice?: number;
      trendPrice?: number;
    };
  };
}

interface PokemonTcgResponse {
  data: PokemonTcgCard[];
  totalCount: number;
}

export interface ParsedSearchQuery {
  name?: string;
  set?: string;
  number?: string;
}

export function parseSearchQuery(query: string): ParsedSearchQuery {
  const trimmed = query.trim();
  if (!trimmed) return {};

  const tokens = trimmed.split(/\s+/);
  if (tokens.length === 0) return {};

  if (tokens.length === 1) {
    const token = tokens[0];
    if (/^\d+$/.test(token)) {
      return { number: token };
    }
    return { name: token };
  }

  const lastToken = tokens[tokens.length - 1];
  if (/^\d+$/.test(lastToken) && tokens.length > 1) {
    const number = lastToken;
    const remaining = tokens.slice(0, -1);
    const name = remaining[0];
    const set = remaining.slice(1).join(' ');
    return set ? { name, set, number } : { name, number };
  }

  const name = tokens[0];
  const set = tokens.slice(1).join(' ');
  return set ? { name, set } : { name };
}

export function buildCatalogQuery(parsed: ParsedSearchQuery): string {
  const parts: string[] = [];
  if (parsed.name) {
    parts.push('name:' + JSON.stringify(parsed.name + '*'));
  }
  if (parsed.set) {
    parts.push('set.name:' + JSON.stringify('*' + parsed.set + '*'));
  }
  if (parsed.number) {
    parts.push('number:' + parsed.number);
  }
  return parts.join(' ');
}

export const VARIANT_MAP: Record<string, string> = {
  normal: 'Normal',
  holofoil: 'Holo',
  reverseHolofoil: 'Reverse Holo',
  '1stEditionHolofoil': '1st Edition Holo',
};

export function expandVariants(
  card: PokemonTcgCard
): { card: PokemonTcgCard; variant: string | null }[] {
  const tcgPrices = card.tcgplayer?.prices;
  const entries: { card: PokemonTcgCard; variant: string | null }[] = [];

  // 1. Variants declared by TCGPlayer pricing data
  if (tcgPrices) {
    for (const [key, label] of Object.entries(VARIANT_MAP)) {
      if (tcgPrices[key as keyof typeof tcgPrices]) {
        entries.push({ card, variant: label });
      }
    }
  }

  // 2. Supplement with cardmarket data when TCGPlayer omits a variant.
  //    Cardmarket uses explicit reverseHolo* keys; a non-zero value means
  //    the variant is actively traded there.
  const cmPrices = card.cardmarket?.prices;
  if (cmPrices) {
    const hasReverseHoloFromTcg = entries.some((e) => e.variant === "Reverse Holo");
    const hasReverseHoloFromCm =
      (cmPrices.reverseHoloSell && cmPrices.reverseHoloSell > 0) ||
      (cmPrices.reverseHoloLow && cmPrices.reverseHoloLow > 0) ||
      (cmPrices.reverseHoloTrend && cmPrices.reverseHoloTrend > 0);

    if (!hasReverseHoloFromTcg && hasReverseHoloFromCm) {
      entries.push({ card, variant: "Reverse Holo" });
    }
  }

  return entries.length > 0 ? entries : [{ card, variant: null }];
}

async function fetchCards(q: string, limit: number): Promise<PokemonTcgCard[]> {
  const url = API_BASE + '/cards?q=' + encodeURIComponent(q) + '&pageSize=' + limit;
  const res = await fetch(url, {
    headers: {
      ...(process.env.POKEMON_TCG_API_KEY
        ? { 'X-Api-Key': process.env.POKEMON_TCG_API_KEY }
        : {}),
    },
  });
  if (!res.ok) {
    throw new Error('Catalog API error: ' + res.status + ' ' + res.statusText);
  }
  const json: PokemonTcgResponse = await res.json();
  return json.data;
}

export async function searchCatalog(
  query: string,
  limit = 20
): Promise<CardReference[]> {
  const parsed = parseSearchQuery(query);
  if (!parsed.name && !parsed.set && !parsed.number) return [];

  // Always use the compound query directly — the PokéTCG API handles
  // name+number and name+set filtering correctly. The old variant-fetch
  // fallback (re-fetching by name only with limit=20) was too small for
  // popular cards and silently dropped correct results.
  const q = buildCatalogQuery(parsed);
  const cards = await fetchCards(q, limit);

  // Expand each card into variant entries based on API pricing data
  let expanded = cards.flatMap(expandVariants);

  // --- Inject missing variants from CustomCardImage overrides ---
  // Some cards have reverse holos (etc.) that appear in cardmarket data
  // but lack tcgplayer.prices entries. We query our CustomCardImage table
  // and append any variants not already produced by expandVariants().
  const externalIds = cards.map((c) => c.id);
  if (externalIds.length > 0) {
    const customImages = await prisma.customCardImage.findMany({
      where: { externalId: { in: externalIds } },
    });

    // Build a set of existing (externalId, variant) pairs
    const existingKeys = new Set(
      expanded.map((e) => `${e.card.id}|${e.variant ?? "null"}`)
    );

    for (const img of customImages) {
      const card = cards.find((c) => c.id === img.externalId);
      if (!card) continue;
      const key = `${card.id}|${img.variant}`;
      if (!existingKeys.has(key)) {
        expanded.push({ card, variant: img.variant });
        existingKeys.add(key);
      }
    }
  }

  // Deduplicate cards for DB upsert (one row per unique externalId)
  const uniqueCards = new Map<string, PokemonTcgCard>();
  for (const { card } of expanded) {
    uniqueCards.set(card.id, card);
  }

  const records = await prisma.$transaction(
    Array.from(uniqueCards.values()).map((card) =>
      prisma.catalogCard.upsert({
        where: { externalId: card.id },
        update: {
          name: card.name,
          number: card.number,
          setName: card.set.name,
          setId: card.set.id,
          imageSmall: card.images.small,
          imageLarge: card.images.large,
          rarity: card.rarity ?? null,
          cachedAt: new Date(),
        },
        create: {
          externalId: card.id,
          name: card.name,
          number: card.number,
          setName: card.set.name,
          setId: card.set.id,
          imageSmall: card.images.small,
          imageLarge: card.images.large,
          rarity: card.rarity ?? null,
        },
      })
    )
  );

  // Build a lookup from externalId to DB record
  const recordMap = new Map(records.map((r) => [r.externalId, r]));

  // Return one CardReference per variant entry
  const references = expanded
    .map(({ card, variant }) => {
      const record = recordMap.get(card.id);
      if (!record) return null;
      return toCatalogCardReference(record, variant);
    })
    .filter((r): r is CardReference => r !== null);

  await mergeCustomImages(references);
  return references;
}

export async function getCatalogCard(
  externalId: string
): Promise<CardReference | null> {
  const cached = await prisma.catalogCard.findUnique({
    where: { externalId },
  });

  if (cached) {
    return toCatalogCardReference(cached);
  }

  const res = await fetch(API_BASE + '/cards/' + encodeURIComponent(externalId), {
    headers: {
      ...(process.env.POKEMON_TCG_API_KEY
        ? { 'X-Api-Key': process.env.POKEMON_TCG_API_KEY }
        : {}),
    },
  });

  if (!res.ok) return null;

  const json: { data: PokemonTcgCard } = await res.json();
  return upsertCatalogCard(json.data);
}

async function upsertCatalogCard(
  card: PokemonTcgCard
): Promise<CardReference> {
  const record = await prisma.catalogCard.upsert({
    where: { externalId: card.id },
    update: {
      name: card.name,
      number: card.number,
      setName: card.set.name,
      setId: card.set.id,
      imageSmall: card.images.small,
      imageLarge: card.images.large,
      rarity: card.rarity ?? null,
      cachedAt: new Date(),
    },
    create: {
      externalId: card.id,
      name: card.name,
      number: card.number,
      setName: card.set.name,
      setId: card.set.id,
      imageSmall: card.images.small,
      imageLarge: card.images.large,
      rarity: card.rarity ?? null,
    },
  });

  return toCatalogCardReference(record);
}

function toCatalogCardReference(
  record: {
    id: string;
    externalId: string;
    name: string;
    number: string;
    setName: string;
    setId: string;
    imageSmall: string;
    imageLarge: string;
    rarity: string | null;
  },
  variant: string | null = null
): CardReference {
  return {
    id: record.id,
    externalId: record.externalId,
    name: record.name,
    number: record.number,
    setName: record.setName,
    setId: record.setId,
    imageSmall: record.imageSmall,
    imageLarge: record.imageLarge,
    rarity: record.rarity,
    variant,
  };
}

const cardDetailCache = new Map<string, { data: PokemonTcgCard; timestamp: number }>();
const CACHE_TTL_MS = 1000 * 60 * 60 * 24; // 24 hours

const PRICING_CACHE_TTL_MS = 1000 * 60 * 60 * 24; // 24 hours

export interface CachedPricing {
  priceTcgplayer: number | null;
  priceCardmarket: number | null;
  priceSource: 'tcgplayer' | 'cardmarket' | null;
}

export async function getCachedPricing(externalId: string): Promise<CachedPricing | null> {
  const record = await prisma.catalogCard.findUnique({
    where: { externalId },
    select: { priceTcgplayer: true, priceCardmarket: true, priceUpdatedAt: true },
  });

  if (!record || !record.priceUpdatedAt) return null;

  const age = Date.now() - record.priceUpdatedAt.getTime();
  if (age > PRICING_CACHE_TTL_MS) return null;

  return {
    priceTcgplayer: record.priceTcgplayer ?? null,
    priceCardmarket: record.priceCardmarket ?? null,
    priceSource: record.priceTcgplayer != null ? 'tcgplayer' : record.priceCardmarket != null ? 'cardmarket' : null,
  };
}

function resolveTcgplayerPrice(card: PokemonTcgCard, variant: string | null): number | null {
  const prices = card.tcgplayer?.prices;
  if (!prices) return null;

  if (variant) {
    const priceKey = Object.entries(VARIANT_MAP).find(([, label]) => label === variant)?.[0];
    if (priceKey && prices[priceKey as keyof typeof prices]) {
      return (prices as Record<string, { market: number } | undefined>)[priceKey]?.market ?? null;
    }
    return null;
  }

  return prices.normal?.market
    ?? prices.holofoil?.market
    ?? prices.reverseHolofoil?.market
    ?? prices['1stEditionHolofoil']?.market
    ?? null;
}

function resolveCardmarketPrice(card: PokemonTcgCard): number | null {
  const prices = card.cardmarket?.prices;
  if (!prices) return null;
  return prices.averageSellPrice ?? prices.trendPrice ?? null;
}

export async function updateCachedPricing(
  externalId: string,
  card: PokemonTcgCard,
  variant: string | null
): Promise<CachedPricing> {
  const priceTcgplayer = resolveTcgplayerPrice(card, variant);
  const priceCardmarket = resolveCardmarketPrice(card);

  await prisma.catalogCard.update({
    where: { externalId },
    data: {
      priceTcgplayer,
      priceCardmarket,
      priceUpdatedAt: new Date(),
    },
  });

  return {
    priceTcgplayer,
    priceCardmarket,
    priceSource: priceTcgplayer != null ? 'tcgplayer' : priceCardmarket != null ? 'cardmarket' : null,
  };
}

export async function getCardById(externalId: string): Promise<PokemonTcgCard | null> {
  const cached = cardDetailCache.get(externalId);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  const res = await fetch(API_BASE + '/cards/' + encodeURIComponent(externalId), {
    headers: {
      ...(process.env.POKEMON_TCG_API_KEY
        ? { 'X-Api-Key': process.env.POKEMON_TCG_API_KEY }
        : {}),
    },
  });

  if (!res.ok) return null;

  const json: { data: PokemonTcgCard } = await res.json();
  if (json.data) {
    cardDetailCache.set(externalId, { data: json.data, timestamp: Date.now() });
    return json.data;
  }
  return null;
}

/**
 * Resolve custom image overrides for a batch of (externalId, variant) pairs.
 * Returns a map of "externalId|variant" → { imageSmall, imageLarge }.
 * Only queries the DB for pairs with a non-null variant.
 */
export async function resolveCardImages(
  pairs: { externalId: string; variant: string | null }[]
): Promise<Map<string, { imageSmall: string; imageLarge: string }>> {
  const result = new Map<string, { imageSmall: string; imageLarge: string }>();

  const lookupPairs = pairs.filter((p): p is { externalId: string; variant: string } => p.variant !== null);
  if (lookupPairs.length === 0) return result;

  const images = await prisma.customCardImage.findMany({
    where: {
      OR: lookupPairs.map((p) => ({
        externalId: p.externalId,
        variant: p.variant,
      })),
    },
  });

  for (const img of images) {
    const key = `${img.externalId}|${img.variant}`;
    result.set(key, { imageSmall: img.imageSmall, imageLarge: img.imageLarge });
  }

  return result;
}

/**
 * Merge custom image overrides into an array of CardReference objects in-place.
 * Skips lookup when variant is null.
 */
export async function mergeCustomImages(
  references: CardReference[]
): Promise<void> {
  const pairs = references.map((r) => ({ externalId: r.externalId, variant: r.variant }));
  const overrides = await resolveCardImages(pairs);

  for (const ref of references) {
    if (ref.variant === null) continue;
    const override = overrides.get(`${ref.externalId}|${ref.variant}`);
    if (override) {
      ref.imageSmall = override.imageSmall;
      ref.imageLarge = override.imageLarge;
    }
  }
}

/**
 * Resolve a single custom image override for a given (externalId, variant) pair.
 * Returns null if no override exists or variant is null.
 */
export async function resolveSingleCardImage(
  externalId: string,
  variant: string | null
): Promise<{ imageSmall: string | null; imageLarge: string | null }> {
  if (!variant) return { imageSmall: null, imageLarge: null };
  const img = await prisma.customCardImage.findUnique({
    where: { externalId_variant: { externalId, variant } },
  });
  if (!img) return { imageSmall: null, imageLarge: null };
  return { imageSmall: img.imageSmall, imageLarge: img.imageLarge };
}
