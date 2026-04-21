import { NextResponse } from "next/server";
import { renameBinder, deleteBinder, getBinder } from "@/lib/binders";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ binderId: string }> }
) {
  const { binderId } = await params;
  const body = await request.json();
  const { nickname } = body;

  if (!nickname || typeof nickname !== "string" || !nickname.trim()) {
    return NextResponse.json(
      { error: "Nickname is required and must be non-empty" },
      { status: 400 }
    );
  }

  try {
    const updated = await renameBinder(binderId, nickname.trim());
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Binder not found" },
      { status: 404 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ binderId: string }> }
) {
  const { binderId } = await params;

  const binder = await getBinder(binderId);
  if (!binder) {
    return NextResponse.json(
      { error: "Binder not found" },
      { status: 404 }
    );
  }

  await deleteBinder(binderId);
  return new NextResponse(null, { status: 204 });
}
