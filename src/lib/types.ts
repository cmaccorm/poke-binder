/** Supported binder layout sizes */
export const BINDER_LAYOUTS = {
  "2x2": { rows: 2, cols: 2 },
  "3x3": { rows: 3, cols: 3 },
  "4x3": { rows: 4, cols: 3 },
} as const;

export type BinderLayoutKey = keyof typeof BINDER_LAYOUTS;

/** A binder on the shelf */
export interface BinderIdentity {
  id: string;
  nickname: string;
  color: string;
  layoutRows: number;
  layoutCols: number;
  lastViewedPage: number;
  pageCount: number;
}

/** A page within a binder */
export interface BinderPage {
  id: string;
  pageIndex: number;
  slots: BinderSlot[];
}

/** A slot at a specific grid position on a page */
export interface BinderSlot {
  id: string;
  row: number;
  col: number;
  card: CardReference | null;
  isWishlist: boolean;
}

/** A card reference from the catalog */
export interface CardReference {
  id: string;
  externalId: string;
  name: string;
  number: string;
  setName: string;
  setId: string;
  imageSmall: string;
  imageLarge: string;
  rarity: string | null;
  variant: string | null;
  priceTcgplayer?: number | null;
  priceCardmarket?: number | null;
}
