-- CreateTable
CREATE TABLE "CatalogCard" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "externalId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "setName" TEXT NOT NULL,
    "setId" TEXT NOT NULL,
    "imageSmall" TEXT NOT NULL,
    "imageLarge" TEXT NOT NULL,
    "rarity" TEXT,
    "cachedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT "CatalogCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Binder" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "nickname" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#3B82F6',
    "layoutRows" INTEGER NOT NULL,
    "layoutCols" INTEGER NOT NULL,
    "lastViewedPage" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMPTZ NOT NULL,
    CONSTRAINT "Binder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "pageIndex" INTEGER NOT NULL,
    "binderId" TEXT NOT NULL,
    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slot" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "row" INTEGER NOT NULL,
    "col" INTEGER NOT NULL,
    "pageId" TEXT NOT NULL,
    "catalogCardId" TEXT,
    CONSTRAINT "Slot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CatalogCard_externalId_key" ON "CatalogCard"("externalId");

-- CreateIndex
CREATE INDEX "CatalogCard_name_idx" ON "CatalogCard"("name");

-- CreateIndex
CREATE INDEX "CatalogCard_number_idx" ON "CatalogCard"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Page_binderId_pageIndex_key" ON "Page"("binderId", "pageIndex");

-- CreateIndex
CREATE UNIQUE INDEX "Slot_pageId_row_col_key" ON "Slot"("pageId", "row", "col");

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_binderId_fkey" FOREIGN KEY ("binderId") REFERENCES "Binder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slot" ADD CONSTRAINT "Slot_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slot" ADD CONSTRAINT "Slot_catalogCardId_fkey" FOREIGN KEY ("catalogCardId") REFERENCES "CatalogCard"("id") ON DELETE SET NULL ON UPDATE CASCADE;
