-- CreateTable
CREATE TABLE "Binder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nickname" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#3B82F6',
    "layoutRows" INTEGER NOT NULL,
    "layoutCols" INTEGER NOT NULL,
    "lastViewedPage" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pageIndex" INTEGER NOT NULL,
    "binderId" TEXT NOT NULL,
    CONSTRAINT "Page_binderId_fkey" FOREIGN KEY ("binderId") REFERENCES "Binder" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Slot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "row" INTEGER NOT NULL,
    "col" INTEGER NOT NULL,
    "pageId" TEXT NOT NULL,
    "catalogCardId" TEXT,
    CONSTRAINT "Slot_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Slot_catalogCardId_fkey" FOREIGN KEY ("catalogCardId") REFERENCES "CatalogCard" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CatalogCard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "externalId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "setName" TEXT NOT NULL,
    "setId" TEXT NOT NULL,
    "imageSmall" TEXT NOT NULL,
    "imageLarge" TEXT NOT NULL,
    "rarity" TEXT,
    "cachedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Page_binderId_pageIndex_key" ON "Page"("binderId", "pageIndex");

-- CreateIndex
CREATE UNIQUE INDEX "Slot_pageId_row_col_key" ON "Slot"("pageId", "row", "col");

-- CreateIndex
CREATE UNIQUE INDEX "CatalogCard_externalId_key" ON "CatalogCard"("externalId");

-- CreateIndex
CREATE INDEX "CatalogCard_name_idx" ON "CatalogCard"("name");

-- CreateIndex
CREATE INDEX "CatalogCard_number_idx" ON "CatalogCard"("number");
