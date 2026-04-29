-- CreatePolicy
-- Enable row-level security for all application-owned tables.
ALTER TABLE "Binder" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Page" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Slot" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CatalogCard" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CustomCardImage" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "PriceTrend" ENABLE ROW LEVEL SECURITY;

-- Force RLS so the owner role cannot bypass the policies.
ALTER TABLE "Binder" FORCE ROW LEVEL SECURITY;
ALTER TABLE "Page" FORCE ROW LEVEL SECURITY;
ALTER TABLE "Slot" FORCE ROW LEVEL SECURITY;
ALTER TABLE "CatalogCard" FORCE ROW LEVEL SECURITY;
ALTER TABLE "CustomCardImage" FORCE ROW LEVEL SECURITY;
ALTER TABLE "PriceTrend" FORCE ROW LEVEL SECURITY;

-- Backend access policies.
CREATE POLICY "Binder backend full access"
  ON "Binder"
  FOR ALL
  TO postgres
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Page backend full access"
  ON "Page"
  FOR ALL
  TO postgres
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Slot backend full access"
  ON "Slot"
  FOR ALL
  TO postgres
  USING (true)
  WITH CHECK (true);

CREATE POLICY "CatalogCard backend full access"
  ON "CatalogCard"
  FOR ALL
  TO postgres
  USING (true)
  WITH CHECK (true);

CREATE POLICY "CustomCardImage backend full access"
  ON "CustomCardImage"
  FOR ALL
  TO postgres
  USING (true)
  WITH CHECK (true);

CREATE POLICY "PriceTrend backend full access"
  ON "PriceTrend"
  FOR ALL
  TO postgres
  USING (true)
  WITH CHECK (true);
