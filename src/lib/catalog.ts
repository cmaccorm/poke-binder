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
  const prices = card.tcgplayer?.prices;
  if (!prices) {
    return [{ card, variant: null }];
  }

  const entries: { card: PokemonTcgCard; variant: string | null }[] = [];
  for (const [key, label] of Object.entries(VARIANT_MAP)) {
    if (prices[key as keyof typeof prices]) {
      entries.push({ card, variant: label });
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

  let cards: PokemonTcgCard[];

  const needsVariantFetch =
    (parsed.name && parsed.number && !parsed.set) ||
    (parsed.name && parsed.set && !parsed.number);

  if (needsVariantFetch) {
    const compoundQ = buildCatalogQuery(parsed);
    const initial = await fetchCards(compoundQ, limit);
    if (initial.length < 5 && initial.length > 0) {
      const nameOnlyQ = buildCatalogQuery({ name: parsed.name });
      const allByName = await fetchCards(nameOnlyQ, limit);
      if (parsed.number) {
        cards = allByName.filter(c => c.number === parsed.number);
      } else if (parsed.set) {
        const setLower = parsed.set.toLowerCase();
        cards = allByName.filter(c => c.set.name.toLowerCase().includes(setLower));
      } else {
        cards = initial;
      }
    } else {
      cards = initial;
    }
  } else {
    const q = buildCatalogQuery(parsed);
    cards = await fetchCards(q, limit);
  }

  // Expand each card into variant entries
  const expanded = cards.flatMap(expandVariants);

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
  return expanded
    .map(({ card, variant }) => {
      const record = recordMap.get(card.id);
      if (!record) return null;
      return toCatalogCardReference(record, variant);
    })
    .filter((r): r is CardReference => r !== null);
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
const CACHE_TTL_MS = 1000 * 60 * 60;

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
