import { NextResponse } from "next/server";
import { getCardById, resolveSingleCardImage, getCachedPricing, updateCachedPricing } from "@/lib/catalog";

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
    const cachedPricing = await getCachedPricing(externalId);

    let priceTcgplayer: number | null = cachedPricing?.priceTcgplayer ?? null;
    let priceCardmarket: number | null = cachedPricing?.priceCardmarket ?? null;
    let priceSource: string | null = cachedPricing?.priceSource ?? null;

    if (!cachedPricing) {
      const card = await getCardById(externalId);
      if (!card) {
        return NextResponse.json({ error: "Card not found" }, { status: 404 });
      }

      if (variant) {
        const custom = await resolveSingleCardImage(externalId, variant);
        if (custom.imageSmall) card.images.small = custom.imageSmall;
        if (custom.imageLarge) card.images.large = custom.imageLarge;
      }

      const pricing = await updateCachedPricing(externalId, card, variant);
      priceTcgplayer = pricing.priceTcgplayer;
      priceCardmarket = pricing.priceCardmarket;
      priceSource = pricing.priceSource;

      return NextResponse.json({ ...card, priceTcgplayer, priceCardmarket, priceSource });
    }

    const card = await getCardById(externalId);
    if (!card) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }

    if (variant) {
      const custom = await resolveSingleCardImage(externalId, variant);
      if (custom.imageSmall) card.images.small = custom.imageSmall;
      if (custom.imageLarge) card.images.large = custom.imageLarge;
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
