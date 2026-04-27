import { describe, it, expect, vi, beforeEach } from "vitest";
import { resolveCardImages, resolveSingleCardImage } from "@/lib/catalog";

// Mock Prisma client
const mockFindMany = vi.fn();
const mockFindUnique = vi.fn();

vi.mock("@/lib/prisma", () => ({
  prisma: {
    customCardImage: {
      findMany: (...args: unknown[]) => mockFindMany(...args),
      findUnique: (...args: unknown[]) => mockFindUnique(...args),
    },
  },
}));

beforeEach(() => {
  mockFindMany.mockReset();
  mockFindUnique.mockReset();
});

describe("resolveCardImages", () => {
  it("returns an empty map for an empty input array", async () => {
    const result = await resolveCardImages([]);
    expect(result.size).toBe(0);
    expect(mockFindMany).not.toHaveBeenCalled();
  });

  it("skips DB lookup when all variants are null", async () => {
    const result = await resolveCardImages([
      { externalId: "ex7-1", variant: null },
      { externalId: "ex7-2", variant: null },
    ]);
    expect(result.size).toBe(0);
    expect(mockFindMany).not.toHaveBeenCalled();
  });

  it("batch-returns overrides for matching pairs", async () => {
    mockFindMany.mockResolvedValue([
      { externalId: "ex7-1", variant: "Reverse Holo", imageSmall: "small1.jpg", imageLarge: "large1.jpg" },
      { externalId: "ex7-2", variant: "Reverse Holo", imageSmall: "small2.jpg", imageLarge: "large2.jpg" },
    ]);

    const result = await resolveCardImages([
      { externalId: "ex7-1", variant: "Reverse Holo" },
      { externalId: "ex7-2", variant: "Reverse Holo" },
      { externalId: "ex7-3", variant: "Reverse Holo" },
    ]);

    expect(mockFindMany).toHaveBeenCalledTimes(1);
    expect(result.get("ex7-1|Reverse Holo")).toEqual({
      imageSmall: "small1.jpg",
      imageLarge: "large1.jpg",
    });
    expect(result.get("ex7-2|Reverse Holo")).toEqual({
      imageSmall: "small2.jpg",
      imageLarge: "large2.jpg",
    });
    expect(result.has("ex7-3|Reverse Holo")).toBe(false);
  });

  it("mixes null variants and real variants correctly", async () => {
    mockFindMany.mockResolvedValue([
      { externalId: "ex7-1", variant: "Holo", imageSmall: "s.jpg", imageLarge: "l.jpg" },
    ]);

    const result = await resolveCardImages([
      { externalId: "ex7-1", variant: null },
      { externalId: "ex7-1", variant: "Holo" },
      { externalId: "ex7-2", variant: null },
    ]);

    expect(mockFindMany).toHaveBeenCalledTimes(1);
    expect(mockFindMany).toHaveBeenCalledWith({
      where: {
        OR: [{ externalId: "ex7-1", variant: "Holo" }],
      },
    });
    expect(result.size).toBe(1);
    expect(result.has("ex7-1|Holo")).toBe(true);
  });
});

describe("resolveSingleCardImage", () => {
  it("returns null images when variant is null", async () => {
    const result = await resolveSingleCardImage("ex7-1", null);
    expect(result).toEqual({ imageSmall: null, imageLarge: null });
    expect(mockFindUnique).not.toHaveBeenCalled();
  });

  it("returns custom images when an override exists", async () => {
    mockFindUnique.mockResolvedValue({
      externalId: "ex7-1",
      variant: "Reverse Holo",
      imageSmall: "small.jpg",
      imageLarge: "large.jpg",
    });

    const result = await resolveSingleCardImage("ex7-1", "Reverse Holo");
    expect(result).toEqual({ imageSmall: "small.jpg", imageLarge: "large.jpg" });
    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { externalId_variant: { externalId: "ex7-1", variant: "Reverse Holo" } },
    });
  });

  it("returns null images when no override exists", async () => {
    mockFindUnique.mockResolvedValue(null);

    const result = await resolveSingleCardImage("ex7-1", "Reverse Holo");
    expect(result).toEqual({ imageSmall: null, imageLarge: null });
  });
});
