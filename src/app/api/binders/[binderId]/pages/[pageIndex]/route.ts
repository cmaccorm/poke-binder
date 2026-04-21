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

  // Run page read and lastViewedPage write in parallel so the write never blocks the response
  const [page] = await Promise.all([
    getBinderPage(binderId, pageIndex),
    updateLastViewedPage(binderId, pageIndex),
  ]);

  if (!page) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  return NextResponse.json(page);
}
