import { beforeEach, describe, expect, it, vi } from "vitest";
import { getBinderPage } from "@/lib/binders";
import { prisma } from "@/lib/prisma";
import { mergeCustomImages } from "@/lib/catalog";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    page: {
      findUnique: vi.fn(),
    },
  },
}));

vi.mock("@/lib/catalog", () => ({
  mergeCustomImages: vi.fn(async () => {}),
}));

describe("getBinderPage pricing", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("includes cached card prices in page results", async () => {
    vi.mocked(prisma.page.findUnique).mockResolvedValue({
      id: "page-1",
      pageIndex: 0,
      slots: [
        {
          id: "slot-1",
          row: 0,
          col: 0,
          variant: null,
          isWishlist: false,
          catalogCard: {
            id: "card-1",
            externalId: "external-1",
            name: "Pikachu",
            number: "25",
            setName: "Base Set",
            setId: "base-1",
            imageSmall: "small.jpg",
            imageLarge: "large.jpg",
            rarity: "Common",
            priceTcgplayer: 12.34,
            priceCardmarket: 10.5,
          },
        },
      ],
    } as Awaited<ReturnType<typeof prisma.page.findUnique>>);

    const page = await getBinderPage("binder-1", 0);

    expect(page?.slots[0].card).toMatchObject({
      priceTcgplayer: 12.34,
      priceCardmarket: 10.5,
    });
    expect(mergeCustomImages).toHaveBeenCalledTimes(1);
  });
});
