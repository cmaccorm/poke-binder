import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  parseSearchQuery,
  buildCatalogQuery,
  expandVariants,
  searchCatalog,
} from "@/lib/catalog";
import type { PokemonTcgCard } from "@/lib/catalog";
import { prisma } from "@/lib/prisma";

describe("parseSearchQuery", () => {
  it("parses a single name token", () => {
    expect(parseSearchQuery("beedrill")).toEqual({ name: "beedrill" });
  });

  it("parses a single number token", () => {
    expect(parseSearchQuery("42")).toEqual({ number: "42" });
  });

  it("parses name + set (multi-word)", () => {
    expect(parseSearchQuery("beedrill delta species")).toEqual({
      name: "beedrill",
      set: "delta species",
    });
  });

  it("parses name + number", () => {
    expect(parseSearchQuery("charizard 4")).toEqual({
      name: "charizard",
      number: "4",
    });
  });

  it("parses name + set + number", () => {
    expect(parseSearchQuery("charizard base 4")).toEqual({
      name: "charizard",
      set: "base",
      number: "4",
    });
  });
});

describe("buildCatalogQuery", () => {
  it("wraps name with suffix wildcard", () => {
    const q = buildCatalogQuery({ name: "beedrill" });
    expect(q).toBe('name:"beedrill*"');
  });

  it("wraps set name with wildcards on both sides", () => {
    const q = buildCatalogQuery({ set: "delta species" });
    expect(q).toBe('set.name:"*delta species*"');
  });

  it("handles name + set together", () => {
    const q = buildCatalogQuery({ name: "beedrill", set: "delta species" });
    expect(q).toBe('name:"beedrill*" set.name:"*delta species*"');
  });

  it("mid-string set query would match 'EX Delta Species'", () => {
    // The query uses *delta species* which should match "EX Delta Species"
    const q = buildCatalogQuery({ name: "beedrill", set: "delta species" });
    expect(q).toContain("*delta species*");
  });

  it("handles number only", () => {
    const q = buildCatalogQuery({ number: "4" });
    expect(q).toBe("number:4");
  });

  it("handles all three fields", () => {
    const q = buildCatalogQuery({ name: "charizard", set: "base", number: "4" });
    expect(q).toBe('name:"charizard*" set.name:"*base*" number:4');
  });
});

describe("expandVariants", () => {
  const baseCard: PokemonTcgCard = {
    id: "ex11-1",
    name: "Beedrill δ",
    number: "1",
    set: { id: "ex11", name: "EX Delta Species" },
    images: {
      small: "https://images.pokemontcg.io/ex11/1.png",
      large: "https://images.pokemontcg.io/ex11/1_hires.png",
    },
    rarity: "Rare Holo",
  };

  it("returns one entry per price variant", () => {
    const card: PokemonTcgCard = {
      ...baseCard,
      tcgplayer: {
        prices: {
          holofoil: { market: 10 },
          reverseHolofoil: { market: 5 },
        },
      },
    };
    const result = expandVariants(card);
    expect(result).toHaveLength(2);
    expect(result.map((r) => r.variant)).toEqual(["Holo", "Reverse Holo"]);
    expect(result[0].card).toBe(card);
  });

  it("returns all four variants when all present", () => {
    const card: PokemonTcgCard = {
      ...baseCard,
      tcgplayer: {
        prices: {
          normal: { market: 1 },
          holofoil: { market: 10 },
          reverseHolofoil: { market: 5 },
          "1stEditionHolofoil": { market: 50 },
        },
      },
    };
    const result = expandVariants(card);
    expect(result).toHaveLength(4);
    expect(result.map((r) => r.variant)).toEqual([
      "Normal",
      "Holo",
      "Reverse Holo",
      "1st Edition Holo",
    ]);
  });

  it("returns single variant for single price", () => {
    const card: PokemonTcgCard = {
      ...baseCard,
      tcgplayer: {
        prices: {
          normal: { market: 1 },
        },
      },
    };
    const result = expandVariants(card);
    expect(result).toHaveLength(1);
    expect(result[0].variant).toBe("Normal");
  });

  it("returns null variant when no pricing data", () => {
    const card: PokemonTcgCard = { ...baseCard };
    const result = expandVariants(card);
    expect(result).toHaveLength(1);
    expect(result[0].variant).toBeNull();
    expect(result[0].card).toBe(card);
  });

  it("returns null variant when tcgplayer exists but prices is empty", () => {
    const card: PokemonTcgCard = {
      ...baseCard,
      tcgplayer: { prices: {} },
    };
    const result = expandVariants(card);
    expect(result).toHaveLength(1);
    expect(result[0].variant).toBeNull();
  });

  it("injects Reverse Holo from cardmarket when tcgplayer omits it", () => {
    const card: PokemonTcgCard = {
      ...baseCard,
      tcgplayer: {
        prices: {
          normal: { market: 58.27 },
          // reverseHolofoil deliberately missing
        },
      },
      cardmarket: {
        prices: {
          reverseHoloSell: 542.23,
          reverseHoloLow: 14.0,
          reverseHoloTrend: 252.58,
        },
      },
    };
    const result = expandVariants(card);
    expect(result).toHaveLength(2);
    expect(result.map((r) => r.variant)).toEqual(["Normal", "Reverse Holo"]);
  });

  it("does not duplicate Reverse Holo when both tcgplayer and cardmarket have it", () => {
    const card: PokemonTcgCard = {
      ...baseCard,
      tcgplayer: {
        prices: {
          normal: { market: 15.45 },
          reverseHolofoil: { market: 27.86 },
        },
      },
      cardmarket: {
        prices: {
          reverseHoloSell: 10.61,
        },
      },
    };
    const result = expandVariants(card);
    expect(result).toHaveLength(2);
    expect(result.map((r) => r.variant)).toEqual(["Normal", "Reverse Holo"]);
  });

  it("ignores cardmarket reverse holo when values are zero", () => {
    const card: PokemonTcgCard = {
      ...baseCard,
      tcgplayer: {
        prices: {
          holofoil: { market: 555.88 },
        },
      },
      cardmarket: {
        prices: {
          reverseHoloSell: 0.0,
          reverseHoloLow: 0.0,
          reverseHoloTrend: 0.0,
        },
      },
    };
    const result = expandVariants(card);
    expect(result).toHaveLength(1);
    expect(result[0].variant).toBe("Holo");
  });
});

describe("searchCatalog", () => {
  const mockFetch = vi.fn();
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    globalThis.fetch = mockFetch;
    vi.clearAllMocks();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  function mockApiResponse(cards: PokemonTcgCard[]) {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: cards, totalCount: cards.length }),
    } as Response);
  }

  const mockCard: PokemonTcgCard = {
    id: "ecard1-57",
    name: "Ninetales",
    number: "57",
    set: { id: "ecard1", name: "Expedition Base Set" },
    images: {
      small: "https://images.pokemontcg.io/ecard1/57.png",
      large: "https://images.pokemontcg.io/ecard1/57_hires.png",
    },
    rarity: "Rare",
    tcgplayer: {
      prices: {
        normal: { market: 15.45 },
        reverseHolofoil: { market: 27.86 },
      },
    },
  };

  it("returns results directly from compound query without buggy fallback", async () => {
    mockApiResponse([mockCard]);

    // Mock $transaction to return catalog card records in order
    const txMock = vi
      .spyOn(prisma, "$transaction")
      .mockImplementation(async (promises: any) => {
        // Simulate resolving all upserts
        return Promise.all(promises);
      });

    vi.spyOn(prisma.catalogCard, "upsert")
      .mockResolvedValue({
        id: "db-id-1",
        externalId: "ecard1-57",
        name: "Ninetales",
        number: "57",
        setName: "Expedition Base Set",
        setId: "ecard1",
        imageSmall: "https://images.pokemontcg.io/ecard1/57.png",
        imageLarge: "https://images.pokemontcg.io/ecard1/57_hires.png",
        rarity: "Rare",
        cachedAt: new Date(),
      });

    vi.spyOn(prisma.customCardImage, "findMany").mockResolvedValue([]);

    const results = await searchCatalog("ninetales 57");

    // fetch should be called ONCE with the compound query
    expect(mockFetch).toHaveBeenCalledTimes(1);
    const fetchUrl = decodeURIComponent(mockFetch.mock.calls[0][0] as string);
    expect(fetchUrl).toContain('name:"ninetales*"');
    expect(fetchUrl).toContain("number:57");

    // Should return both Normal and Reverse Holo variants
    expect(results).toHaveLength(2);
    expect(results.map((r) => r.variant)).toEqual(["Normal", "Reverse Holo"]);
    expect(results[0].name).toBe("Ninetales");

    txMock.mockRestore();
  });

  it("injects custom-image variants missing from API pricing", async () => {
    const cardNoReverseHolo: PokemonTcgCard = {
      id: "ex11-63",
      name: "Ditto",
      number: "63",
      set: { id: "ex11", name: "Delta Species" },
      images: {
        small: "https://images.pokemontcg.io/ex11/63.png",
        large: "https://images.pokemontcg.io/ex11/63_hires.png",
      },
      rarity: "Common",
      tcgplayer: {
        prices: {
          normal: { market: 58.27 },
          // reverseHolofoil deliberately missing
        },
      },
    };

    mockApiResponse([cardNoReverseHolo]);

    const txMock = vi
      .spyOn(prisma, "$transaction")
      .mockImplementation(async (promises: any) => {
        return Promise.all(promises);
      });

    vi.spyOn(prisma.catalogCard, "upsert")
      .mockResolvedValue({
        id: "db-id-2",
        externalId: "ex11-63",
        name: "Ditto",
        number: "63",
        setName: "Delta Species",
        setId: "ex11",
        imageSmall: "https://images.pokemontcg.io/ex11/63.png",
        imageLarge: "https://images.pokemontcg.io/ex11/63_hires.png",
        rarity: "Common",
        cachedAt: new Date(),
      });

    vi.spyOn(prisma.customCardImage, "findMany").mockResolvedValue([
      {
        id: "ci-1",
        externalId: "ex11-63",
        variant: "Reverse Holo",
        imageSmall: "https://custom/small.png",
        imageLarge: "https://custom/large.png",
        createdAt: new Date(),
      },
    ]);

    const results = await searchCatalog("ditto 63 delta");

    // Should have Normal from API + Reverse Holo from custom images
    expect(results).toHaveLength(2);
    const variants = results.map((r) => r.variant);
    expect(variants).toContain("Normal");
    expect(variants).toContain("Reverse Holo");

    // The Reverse Holo variant should have the custom image
    const reverseHolo = results.find((r) => r.variant === "Reverse Holo");
    expect(reverseHolo).toBeDefined();
    expect(reverseHolo!.imageSmall).toBe("https://custom/small.png");
    expect(reverseHolo!.imageLarge).toBe("https://custom/large.png");

    txMock.mockRestore();
  });

  it("does not duplicate variants already present in API pricing", async () => {
    mockApiResponse([mockCard]);

    const txMock = vi
      .spyOn(prisma, "$transaction")
      .mockImplementation(async (promises: any) => {
        return Promise.all(promises);
      });

    vi.spyOn(prisma.catalogCard, "upsert")
      .mockResolvedValue({
        id: "db-id-1",
        externalId: "ecard1-57",
        name: "Ninetales",
        number: "57",
        setName: "Expedition Base Set",
        setId: "ecard1",
        imageSmall: "https://images.pokemontcg.io/ecard1/57.png",
        imageLarge: "https://images.pokemontcg.io/ecard1/57_hires.png",
        rarity: "Rare",
        cachedAt: new Date(),
      });

    // Custom image for Reverse Holo already exists in API pricing
    vi.spyOn(prisma.customCardImage, "findMany").mockResolvedValue([
      {
        id: "ci-1",
        externalId: "ecard1-57",
        variant: "Reverse Holo",
        imageSmall: "https://custom/small.png",
        imageLarge: "https://custom/large.png",
        createdAt: new Date(),
      },
    ]);

    const results = await searchCatalog("ninetales expedition");

    // Should still be exactly 2 variants, not 3
    expect(results).toHaveLength(2);
    expect(results.map((r) => r.variant)).toEqual(["Normal", "Reverse Holo"]);

    txMock.mockRestore();
  });

  it("shows Reverse Holo from cardmarket even when tcgplayer omits it", async () => {
    const cardMarketOnlyRh: PokemonTcgCard = {
      id: "ex11-63",
      name: "Ditto",
      number: "63",
      set: { id: "ex11", name: "Delta Species" },
      images: {
        small: "https://images.pokemontcg.io/ex11/63.png",
        large: "https://images.pokemontcg.io/ex11/63_hires.png",
      },
      rarity: "Common",
      tcgplayer: {
        prices: {
          normal: { market: 58.27 },
          // reverseHolofoil deliberately missing from tcgplayer
        },
      },
      cardmarket: {
        prices: {
          reverseHoloSell: 542.23,
          reverseHoloLow: 14.0,
          reverseHoloTrend: 252.58,
        },
      },
    };

    mockApiResponse([cardMarketOnlyRh]);

    const txMock = vi
      .spyOn(prisma, "$transaction")
      .mockImplementation(async (promises: any) => {
        return Promise.all(promises);
      });

    vi.spyOn(prisma.catalogCard, "upsert")
      .mockResolvedValue({
        id: "db-id-2",
        externalId: "ex11-63",
        name: "Ditto",
        number: "63",
        setName: "Delta Species",
        setId: "ex11",
        imageSmall: "https://images.pokemontcg.io/ex11/63.png",
        imageLarge: "https://images.pokemontcg.io/ex11/63_hires.png",
        rarity: "Common",
        cachedAt: new Date(),
      });

    // No custom images — variant must come purely from cardmarket data
    vi.spyOn(prisma.customCardImage, "findMany").mockResolvedValue([]);

    const results = await searchCatalog("ditto 63 delta");

    // Normal from tcgplayer + Reverse Holo from cardmarket
    expect(results).toHaveLength(2);
    const variants = results.map((r) => r.variant);
    expect(variants).toContain("Normal");
    expect(variants).toContain("Reverse Holo");

    txMock.mockRestore();
  });
});
