import { NextResponse } from "next/server";
import { getBinderPage, updateLastViewedPage } from "@/lib/binders";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ binderId: string; pageIndex: string }> }
) {
  const { binderId, pageIndex: pageIndexStr } = await params;
  const pageIndex = parseInt(pageIndexStr, 10);

  if (isNaN(pageIndex) || pageIndex < 0) {
    return NextResponse.json({ error: "Invalid page index" }, { status: 400 });
  }

  const page = await getBinderPage(binderId, pageIndex);
  if (!page) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  // Update last viewed page
  await updateLastViewedPage(binderId, pageIndex);

  return NextResponse.json(page);
}
