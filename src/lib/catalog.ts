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
    parts.push('set.name:' + JSON.stringify(parsed.set + '*'));
  }
  if (parsed.number) {
    parts.push('number:' + parsed.number);
  }
  return parts.join(' ');
}

export async function searchCatalog(
  query: string,
  limit = 20
): Promise<CardReference[]> {
  const parsed = parseSearchQuery(query);
  if (!parsed.name && !parsed.set && !parsed.number) return [];

  const q = buildCatalogQuery(parsed);
  const url = API_BASE + '/cards?q=' + encodeURIComponent(q) + '&pageSize=' + limit + '&select=id,name,number,set,images,rarity';

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

  const records = await prisma.$transaction(
    json.data.map((card) =>
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

  return records.map(toCatalogCardReference);
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

function toCatalogCardReference(record: {
  id: string;
  externalId: string;
  name: string;
  number: string;
  setName: string;
  setId: string;
  imageSmall: string;
  imageLarge: string;
  rarity: string | null;
}): CardReference {
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
