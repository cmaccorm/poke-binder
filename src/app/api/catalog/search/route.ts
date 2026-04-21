import { NextResponse } from "next/server";
import { searchCatalog } from "@/lib/catalog";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";

  if (!q.trim()) {
    return NextResponse.json([]);
  }

  try {
    const results = await searchCatalog(q);
    return NextResponse.json(results);
  } catch (error) {
    console.error("Catalog search error:", error);
    return NextResponse.json(
      { error: "Failed to search catalog" },
      { status: 500 }
    );
  }
}
