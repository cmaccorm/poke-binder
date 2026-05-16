import { NextResponse } from "next/server";
import { getCardById, resolveSingleCardImage, getCachedPricing, updateCachedPricing } from "@/lib/catalog";

async function resolveCardWithVariant(
  externalId: string,
  variant: string | null
) {
  const card = await getCardById(externalId);
  if (!card) return null;

  if (variant) {
    const custom = await resolveSingleCardImage(externalId, variant);
    if (custom.imageSmall) card.images.small = custom.imageSmall;
    if (custom.imageLarge) card.images.large = custom.imageLarge;
  }

  return card;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const externalId = (await params).id;
  const { searchParams } = new URL(request.url);
  const variant = searchParams.get("variant");

  if (!externalId) {
    return NextResponse.json({ error: "Missing card ID" }, { status: 400 });
  }

  try {
    const card = await resolveCardWithVariant(externalId, variant);
    if (!card) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }

    const cachedPricing = await getCachedPricing(externalId);
    const hasFreshPricing = cachedPricing != null;

    let priceTcgplayer: number | null;
    let priceCardmarket: number | null;
    let priceSource: string | null;

    if (hasFreshPricing) {
      priceTcgplayer = cachedPricing.priceTcgplayer;
      priceCardmarket = cachedPricing.priceCardmarket;
      priceSource = cachedPricing.priceSource;
    } else {
      const pricing = await updateCachedPricing(externalId, card, variant);
      priceTcgplayer = pricing.priceTcgplayer;
      priceCardmarket = pricing.priceCardmarket;
      priceSource = pricing.priceSource;
    }

    return NextResponse.json({ ...card, priceTcgplayer, priceCardmarket, priceSource });
  } catch (error) {
    console.error("Card lookup error:", error);
    return NextResponse.json(
      { error: "Failed to fetch card details" },
      { status: 500 }
    );
  }
}
