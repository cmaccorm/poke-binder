import { NextResponse } from "next/server";
import { getCardById } from "@/lib/catalog";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const externalId = (await params).id;

  if (!externalId) {
    return NextResponse.json({ error: "Missing card ID" }, { status: 400 });
  }

  try {
    const card = await getCardById(externalId);
    if (!card) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
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
