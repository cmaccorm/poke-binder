import { writeFileSync } from "fs";
import { resolve } from "path";

interface CardInfo {
  id: string;
  name: string;
  number: string;
}

interface CustomImageEntry {
  externalId: string;
  variant: string;
  imageSmall: string;
  imageLarge: string;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchCardsForSet(ptcgId: string): Promise<CardInfo[]> {
  const url = `https://api.pokemontcg.io/v2/cards?q=set.id:${ptcgId}&pageSize=250`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch cards for ${ptcgId}: ${res.status}`);
  const json = await res.json();
  return json.data.map((c: any) => ({ id: c.id, name: c.name, number: c.number }));
}

async function fetchReverseHoloImage(
  name: string,
  number: string,
  sciYear: string,
  sciSlug: string,
  totalCards: number
): Promise<{ imageSmall: string; imageLarge: string } | null> {
  const paddedNumber = number.padStart(String(totalCards).length, "0");
  const nameSlug = slugify(name);
  const url = `https://www.sportscardinvestor.com/cards/${nameSlug}-pokemon/${sciYear}-${sciSlug}-reverse-holo-${paddedNumber}-${totalCards}`;

  try {
    const res = await fetch(url, { redirect: "follow" });
    if (!res.ok) return null;
    const html = await res.text();

    const matches = html.match(/images\.production\.sportscardinvestor\.com\/[^"\s]+/g);
    if (!matches || matches.length === 0) return null;

    const cardImages = matches.filter((m) => /\d+_[\d_]+[\/_]\d+(-[SLM])?$/.test(m));
    if (cardImages.length === 0) return null;

    const base = cardImages[0].replace(/-[SLM]$/, "");
    return {
      imageSmall: `https://${base}-S`,
      imageLarge: `https://${base}-L`,
    };
  } catch {
    return null;
  }
}

async function main() {
  const set = { ptcgId: "ex16", sciYear: "2007", sciSlug: "2007-ex-power-keepers", totalCards: 108 };
  const entries: CustomImageEntry[] = [];
  let successCount = 0;
  let failCount = 0;

  console.log(`Processing ${set.ptcgId} (${set.sciSlug})...`);
  const cards = await fetchCardsForSet(set.ptcgId);
  console.log(`  Found ${cards.length} cards from PokemonTCG API`);

  for (const card of cards) {
    const images = await fetchReverseHoloImage(
      card.name,
      card.number,
      set.sciYear,
      set.sciSlug,
      set.totalCards
    );

    if (images) {
      entries.push({
        externalId: card.id,
        variant: "Reverse Holo",
        imageSmall: images.imageSmall,
        imageLarge: images.imageLarge,
      });
      successCount++;
      process.stdout.write("+");
    } else {
      failCount++;
      process.stdout.write(".");
    }

    await sleep(200);
  }

  console.log(`\n\nDone. Success: ${successCount}, Failed/Not Found: ${failCount}`);
  
  if (entries.length > 0) {
    writeFileSync(resolve(__dirname, "custom-images-ex16.json"), JSON.stringify(entries, null, 2));
    console.log(`Wrote ${entries.length} entries to prisma/custom-images-ex16.json`);
    console.log("Now run: npx tsx prisma/seed-custom-images.ts prisma/custom-images-ex16.json");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
