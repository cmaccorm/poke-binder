import { NextResponse } from "next/server";
import { getAllBinders, createBinder } from "@/lib/binders";
import { isValidLayout } from "@/lib/layout";

export async function GET() {
  const binders = await getAllBinders();
  return NextResponse.json(binders);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { nickname, color, layoutRows, layoutCols, pageCount } = body;

  if (!nickname || !color || !layoutRows || !layoutCols || !pageCount) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  if (!isValidLayout(layoutRows, layoutCols)) {
    return NextResponse.json(
      { error: "Invalid layout. Supported: 2x2, 3x3, 4x3" },
      { status: 400 }
    );
  }

  const binder = await createBinder({
    nickname,
    color,
    layoutRows,
    layoutCols,
    pageCount,
  });

  return NextResponse.json(binder, { status: 201 });
}
