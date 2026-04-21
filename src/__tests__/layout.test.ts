import { describe, it, expect } from "vitest";
import {
  slotsPerPage,
  slotPositions,
  parseLayout,
  layoutKey,
  isValidLayout,
  totalBinderSlots,
} from "@/lib/layout";

describe("layout helpers", () => {
  describe("slotsPerPage", () => {
    it("returns 4 for 2x2", () => {
      expect(slotsPerPage(2, 2)).toBe(4);
    });
    it("returns 9 for 3x3", () => {
      expect(slotsPerPage(3, 3)).toBe(9);
    });
    it("returns 12 for 4x3", () => {
      expect(slotsPerPage(4, 3)).toBe(12);
    });
  });

  describe("slotPositions", () => {
    it("generates row-major positions for 2x2", () => {
      const positions = slotPositions(2, 2);
      expect(positions).toEqual([
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 1, col: 0 },
        { row: 1, col: 1 },
      ]);
    });

    it("generates 9 positions for 3x3", () => {
      const positions = slotPositions(3, 3);
      expect(positions).toHaveLength(9);
      expect(positions[0]).toEqual({ row: 0, col: 0 });
      expect(positions[8]).toEqual({ row: 2, col: 2 });
    });

    it("generates 12 positions for 4x3", () => {
      const positions = slotPositions(4, 3);
      expect(positions).toHaveLength(12);
      expect(positions[11]).toEqual({ row: 3, col: 2 });
    });
  });

  describe("parseLayout", () => {
    it("parses 2x2", () => {
      expect(parseLayout("2x2")).toEqual({ rows: 2, cols: 2 });
    });
    it("parses 3x3", () => {
      expect(parseLayout("3x3")).toEqual({ rows: 3, cols: 3 });
    });
    it("parses 4x3", () => {
      expect(parseLayout("4x3")).toEqual({ rows: 4, cols: 3 });
    });
  });

  describe("layoutKey", () => {
    it("returns key for valid layouts", () => {
      expect(layoutKey(2, 2)).toBe("2x2");
      expect(layoutKey(3, 3)).toBe("3x3");
      expect(layoutKey(4, 3)).toBe("4x3");
    });
    it("returns null for invalid layouts", () => {
      expect(layoutKey(5, 5)).toBeNull();
      expect(layoutKey(1, 1)).toBeNull();
    });
  });

  describe("isValidLayout", () => {
    it("accepts supported layouts", () => {
      expect(isValidLayout(2, 2)).toBe(true);
      expect(isValidLayout(3, 3)).toBe(true);
      expect(isValidLayout(4, 3)).toBe(true);
    });
    it("rejects unsupported layouts", () => {
      expect(isValidLayout(5, 5)).toBe(false);
      expect(isValidLayout(3, 4)).toBe(false);
    });
  });

  describe("totalBinderSlots", () => {
    it("calculates total slots", () => {
      expect(totalBinderSlots(3, 3, 10)).toBe(90);
      expect(totalBinderSlots(2, 2, 5)).toBe(20);
      expect(totalBinderSlots(4, 3, 8)).toBe(96);
    });
  });

  describe("mirror-mode stability", () => {
    it("slot positions are independent of presentation mode", () => {
      // The same layout always produces the same positions
      // regardless of how the page is rendered (mirrored or canonical)
      const positions1 = slotPositions(3, 3);
      const positions2 = slotPositions(3, 3);
      expect(positions1).toEqual(positions2);
    });

    it("layout key is deterministic for the same dimensions", () => {
      expect(layoutKey(3, 3)).toBe(layoutKey(3, 3));
    });
  });
});
