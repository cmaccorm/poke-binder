import { BINDER_LAYOUTS, type BinderLayoutKey } from "./types";

/**
 * Returns the total number of slots per page for a given layout.
 */
export function slotsPerPage(rows: number, cols: number): number {
  return rows * cols;
}

/**
 * Generates the slot positions (row, col) for a page with the given layout.
 * Positions are ordered row-major: (0,0), (0,1), ..., (1,0), (1,1), ...
 */
export function slotPositions(
  rows: number,
  cols: number
): { row: number; col: number }[] {
  const positions: { row: number; col: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      positions.push({ row: r, col: c });
    }
  }
  return positions;
}

/**
 * Converts a layout key like "3x3" into { rows, cols }.
 */
export function parseLayout(key: BinderLayoutKey): {
  rows: number;
  cols: number;
} {
  return BINDER_LAYOUTS[key];
}

/**
 * Returns the layout key for a given rows/cols pair, or null if not a valid layout.
 */
export function layoutKey(
  rows: number,
  cols: number
): BinderLayoutKey | null {
  for (const [key, val] of Object.entries(BINDER_LAYOUTS)) {
    if (val.rows === rows && val.cols === cols) {
      return key as BinderLayoutKey;
    }
  }
  return null;
}

/**
 * Validates that rows/cols form a supported binder layout.
 */
export function isValidLayout(rows: number, cols: number): boolean {
  return layoutKey(rows, cols) !== null;
}

/**
 * Calculates how many total slots a binder has given its layout and page count.
 */
export function totalBinderSlots(
  rows: number,
  cols: number,
  pageCount: number
): number {
  return slotsPerPage(rows, cols) * pageCount;
}
