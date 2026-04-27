import { NextResponse } from "next/server";
import { getCardById, resolveSingleCardImage } from "@/lib/catalog";

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
    const card = await getCardById(externalId);
    if (!card) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }

    if (variant) {
      const custom = await resolveSingleCardImage(externalId, variant);
      if (custom.imageSmall) card.images.small = custom.imageSmall;
      if (custom.imageLarge) card.images.large = custom.imageLarge;
    }

    return NextResponse.json(card);
  } catch (error) {
    console.error("Card lookup error:", error);
    return NextResponse.json(
      { error: "Failed to fetch card details" },
      { status: 500 }
    );
  }
}
