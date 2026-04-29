import { describe, expect, it } from "vitest";
import { formatUsdPrice, resolveHoverPrice } from "@/lib/card-price";

describe("card price helpers", () => {
  it("prefers TCGPlayer price", () => {
    expect(resolveHoverPrice({ priceTcgplayer: 9.99, priceCardmarket: 8.5 })).toBe(9.99);
  });

  it("falls back to Cardmarket price", () => {
    expect(resolveHoverPrice({ priceTcgplayer: null, priceCardmarket: 8.5 })).toBe(8.5);
  });

  it("formats USD prices", () => {
    expect(formatUsdPrice(12.3)).toBe("$12.30");
  });
});
