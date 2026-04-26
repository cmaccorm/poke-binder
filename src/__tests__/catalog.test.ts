import { describe, it, expect } from "vitest";
import {
  parseSearchQuery,
  buildCatalogQuery,
  expandVariants,
} from "@/lib/catalog";
import type { PokemonTcgCard } from "@/lib/catalog";

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
});
