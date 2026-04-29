import type { CardReference } from "@/lib/types";

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function resolveHoverPrice(
  card: Pick<CardReference, "priceTcgplayer" | "priceCardmarket">
): number | null {
  return card.priceTcgplayer ?? card.priceCardmarket ?? null;
}

export function formatUsdPrice(price: number): string {
  return usdFormatter.format(price);
}
