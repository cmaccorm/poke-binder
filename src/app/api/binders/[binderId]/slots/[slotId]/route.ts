import { NextResponse } from "next/server";
import { assignCardToSlot, removeCardFromSlot } from "@/lib/binders";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ binderId: string; slotId: string }> }
) {
  const { slotId } = await params;
  const body = await request.json();
  const { catalogCardId, variant, isWishlist } = body;

  if (!catalogCardId) {
    return NextResponse.json(
      { error: "catalogCardId is required" },
      { status: 400 }
    );
  }

  await assignCardToSlot(slotId, catalogCardId, variant ?? null, isWishlist === true);
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ binderId: string; slotId: string }> }
) {
  const { slotId } = await params;
  await removeCardFromSlot(slotId);
  return NextResponse.json({ ok: true });
}
