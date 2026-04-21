import { prisma } from "./prisma";
import { slotPositions } from "./layout";
import type { BinderIdentity, BinderPage, BinderSlot, CardReference } from "./types";

/**
 * Load all binders for the shelf view.
 */
export async function getAllBinders(): Promise<BinderIdentity[]> {
  const binders = await prisma.binder.findMany({
    include: { _count: { select: { pages: true } } },
    orderBy: { createdAt: "asc" },
  });

  return binders.map((b) => ({
    id: b.id,
    nickname: b.nickname,
    color: b.color,
    layoutRows: b.layoutRows,
    layoutCols: b.layoutCols,
    lastViewedPage: b.lastViewedPage,
    pageCount: b._count.pages,
  }));
}

/**
 * Load a single binder's identity.
 */
export async function getBinder(binderId: string): Promise<BinderIdentity | null> {
  const b = await prisma.binder.findUnique({
    where: { id: binderId },
    include: { _count: { select: { pages: true } } },
  });

  if (!b) return null;

  return {
    id: b.id,
    nickname: b.nickname,
    color: b.color,
    layoutRows: b.layoutRows,
    layoutCols: b.layoutCols,
    lastViewedPage: b.lastViewedPage,
    pageCount: b._count.pages,
  };
}

/**
 * Load a specific page of a binder with all slots and card references.
 */
export async function getBinderPage(
  binderId: string,
  pageIndex: number
): Promise<BinderPage | null> {
  const page = await prisma.page.findUnique({
    where: { binderId_pageIndex: { binderId, pageIndex } },
    include: {
      slots: {
        include: { catalogCard: true },
        orderBy: [{ row: "asc" }, { col: "asc" }],
      },
    },
  });

  if (!page) return null;

  const slots: BinderSlot[] = page.slots.map((s) => ({
    id: s.id,
    row: s.row,
    col: s.col,
    card: s.catalogCard
      ? {
          id: s.catalogCard.id,
          externalId: s.catalogCard.externalId,
          name: s.catalogCard.name,
          number: s.catalogCard.number,
          setName: s.catalogCard.setName,
          setId: s.catalogCard.setId,
          imageSmall: s.catalogCard.imageSmall,
          imageLarge: s.catalogCard.imageLarge,
          rarity: s.catalogCard.rarity,
        }
      : null,
  }));

  return {
    id: page.id,
    pageIndex: page.pageIndex,
    slots,
  };
}

/**
 * Create a new binder with a given number of empty pages.
 */
export async function createBinder(opts: {
  nickname: string;
  color: string;
  layoutRows: number;
  layoutCols: number;
  pageCount: number;
}): Promise<BinderIdentity> {
  const binder = await prisma.binder.create({
    data: {
      nickname: opts.nickname,
      color: opts.color,
      layoutRows: opts.layoutRows,
      layoutCols: opts.layoutCols,
      pages: {
        create: Array.from({ length: opts.pageCount }, (_, i) => ({
          pageIndex: i,
          slots: {
            create: slotPositions(opts.layoutRows, opts.layoutCols).map(
              (pos) => ({
                row: pos.row,
                col: pos.col,
              })
            ),
          },
        })),
      },
    },
    include: { _count: { select: { pages: true } } },
  });

  return {
    id: binder.id,
    nickname: binder.nickname,
    color: binder.color,
    layoutRows: binder.layoutRows,
    layoutCols: binder.layoutCols,
    lastViewedPage: binder.lastViewedPage,
    pageCount: binder._count.pages,
  };
}

/**
 * Assign a catalog card to a slot.
 */
export async function assignCardToSlot(
  slotId: string,
  catalogCardId: string
): Promise<void> {
  await prisma.slot.update({
    where: { id: slotId },
    data: { catalogCardId },
  });
}

/**
 * Remove a card from a slot.
 */
export async function removeCardFromSlot(slotId: string): Promise<void> {
  await prisma.slot.update({
    where: { id: slotId },
    data: { catalogCardId: null },
  });
}

/**
 * Rename a binder's nickname.
 */
export async function renameBinder(
  binderId: string,
  nickname: string
): Promise<BinderIdentity> {
  const b = await prisma.binder.update({
    where: { id: binderId },
    data: { nickname },
    include: { _count: { select: { pages: true } } },
  });

  return {
    id: b.id,
    nickname: b.nickname,
    color: b.color,
    layoutRows: b.layoutRows,
    layoutCols: b.layoutCols,
    lastViewedPage: b.lastViewedPage,
    pageCount: b._count.pages,
  };
}

/**
 * Delete a binder and all associated pages/slots (via cascade).
 */
export async function deleteBinder(binderId: string): Promise<void> {
  await prisma.binder.delete({
    where: { id: binderId },
  });
}

/**
 * Update the last viewed page for a binder.
 */
export async function updateLastViewedPage(
  binderId: string,
  pageIndex: number
): Promise<void> {
  await prisma.binder.update({
    where: { id: binderId },
    data: { lastViewedPage: pageIndex },
  });
}
