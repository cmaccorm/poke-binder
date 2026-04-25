import { prisma } from "./prisma";
import type { CardReference } from "./types";

const API_BASE = "https://api.pokemontcg.io/v2";

/** Shape of a card returned by the Pokemon TCG API */
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
      "1stEditionHolofoil"?: { market: number };
    };
  };
}

interface PokemonTcgResponse {
  data: PokemonTcgCard[];
  totalCount: number;
}

/**
 * Search the Pokemon TCG API by card name or number.
 * Returns up to `limit` results.
 */
export async function searchCatalog(
  query: string,
  limit = 20
): Promise<CardReference[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  // Build the search query — if numeric, search by number; otherwise by name
  const isNumeric = /^\d+$/.test(trimmed);
  const q = isNumeric
    ? `number:${trimmed}`
    : `name:"${trimmed}*"`;

  const url = `${API_BASE}/cards?q=${encodeURIComponent(q)}&pageSize=${limit}&select=id,name,number,set,images,rarity`;

  const res = await fetch(url, {
    headers: {
      ...(process.env.POKEMON_TCG_API_KEY
        ? { "X-Api-Key": process.env.POKEMON_TCG_API_KEY }
        : {}),
    },
  });

  if (!res.ok) {
    throw new Error(`Catalog API error: ${res.status} ${res.statusText}`);
  }

  const json: PokemonTcgResponse = await res.json();

  // Cache results in a single batched transaction for performance
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

/**
 * Get a single card by its external catalog ID (e.g. "base1-4").
 * Checks the local cache first, then falls back to the API.
 */
export async function getCatalogCard(
  externalId: string
): Promise<CardReference | null> {
  // Check local cache first
  const cached = await prisma.catalogCard.findUnique({
    where: { externalId },
  });

  if (cached) {
    return toCatalogCardReference(cached);
  }

  // Fetch from API
  const res = await fetch(`${API_BASE}/cards/${encodeURIComponent(externalId)}`, {
    headers: {
      ...(process.env.POKEMON_TCG_API_KEY
        ? { "X-Api-Key": process.env.POKEMON_TCG_API_KEY }
        : {}),
    },
  });

  if (!res.ok) return null;

  const json: { data: PokemonTcgCard } = await res.json();
  return upsertCatalogCard(json.data);
}

/**
 * Upsert a card from the API into the local cache and return a CardReference.
 */
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

/** Convert a Prisma CatalogCard record to the app's CardReference type. */
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

// Simple in-memory cache for full card details (to avoid redundant API calls per session)
const cardDetailCache = new Map<string, { data: PokemonTcgCard; timestamp: number }>();
const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour

/**
 * Fetch full card details from the external API (cached in-memory).
 * Unlike getCatalogCard, this does not hit the database and returns all metadata (e.g. price).
 */
export async function getCardById(externalId: string): Promise<PokemonTcgCard | null> {
  const cached = cardDetailCache.get(externalId);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  const res = await fetch(`${API_BASE}/cards/${encodeURIComponent(externalId)}`, {
    headers: {
      ...(process.env.POKEMON_TCG_API_KEY
        ? { "X-Api-Key": process.env.POKEMON_TCG_API_KEY }
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
