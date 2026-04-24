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

  // Fetch page data first — this should never fail for valid binders
  const page = await getBinderPage(binderId, pageIndex);
  if (!page) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  // Update lastViewedPage as a side effect — fire-and-forget, don't block the response
  updateLastViewedPage(binderId, pageIndex).catch(() => {
    // Ignore errors — this is just for persistence, not critical
  });

  return NextResponse.json(page);
}
