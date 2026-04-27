import { PrismaClient } from "@/generated/prisma/client";
import { readFileSync } from "fs";
import { resolve } from "path";

const prisma = new PrismaClient();

interface CustomImageEntry {
  externalId: string;
  variant: string;
  imageSmall: string;
  imageLarge: string;
}

async function main() {
  const mappingPath = process.argv[2] || resolve(__dirname, "custom-images.json");

  let entries: CustomImageEntry[];
  try {
    const raw = readFileSync(mappingPath, "utf-8");
    entries = JSON.parse(raw);
  } catch (err) {
    console.error(`Failed to read mapping file at ${mappingPath}.`);
    console.error("Usage: npx tsx prisma/seed-custom-images.ts [path-to-json]");
    console.error("\nExpected JSON format:");
    console.error(JSON.stringify([{ externalId: "ex7-1", variant: "Reverse Holo", imageSmall: "https://...", imageLarge: "https://..." }], null, 2));
    process.exit(1);
  }

  if (!Array.isArray(entries)) {
    console.error("Mapping file must contain a JSON array.");
    process.exit(1);
  }

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const entry of entries) {
    if (!entry.externalId || !entry.variant || !entry.imageSmall || !entry.imageLarge) {
      console.warn(`Skipping invalid entry: ${JSON.stringify(entry)}`);
      skipped++;
      continue;
    }

    try {
      const existing = await prisma.customCardImage.findUnique({
        where: { externalId_variant: { externalId: entry.externalId, variant: entry.variant } },
      });

      if (existing) {
        await prisma.customCardImage.update({
          where: { id: existing.id },
          data: {
            imageSmall: entry.imageSmall,
            imageLarge: entry.imageLarge,
          },
        });
        updated++;
      } else {
        await prisma.customCardImage.create({
          data: {
            externalId: entry.externalId,
            variant: entry.variant,
            imageSmall: entry.imageSmall,
            imageLarge: entry.imageLarge,
          },
        });
        created++;
      }
    } catch (err) {
      console.error(`Error processing ${entry.externalId} / ${entry.variant}:`, err);
      skipped++;
    }
  }

  console.log(`Done. Created: ${created}, Updated: ${updated}, Skipped: ${skipped}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
