import { writeFileSync } from "fs";
import { resolve } from "path";

const SETS: { ptcgId: string; sciYear: string; sciSlug: string; totalCards: number }[] = [
  { ptcgId: "ex8",  sciYear: "2005", sciSlug: "ex-deoxys",           totalCards: 107 },
  { ptcgId: "ex14", sciYear: "2006", sciSlug: "ex-crystal-guardians", totalCards: 100 },
  { ptcgId: "ex11", sciYear: "2005", sciSlug: "ex-delta-species",   totalCards: 113 },
  { ptcgId: "ex13", sciYear: "2006", sciSlug: "ex-holon-phantoms",  totalCards: 110 },
  { ptcgId: "ex16", sciYear: "2007", sciSlug: "ex-power-keepers",   totalCards: 108 },
  { ptcgId: "ex10", sciYear: "2005", sciSlug: "ex-unseen-forces",   totalCards: 115 },
  { ptcgId: "ex7",  sciYear: "2004", sciSlug: "ex-team-rocket-returns", totalCards: 109 },
  { ptcgId: "ex9",  sciYear: "2005", sciSlug: "ex-emerald",         totalCards: 106 },
  { ptcgId: "ex12", sciYear: "2006", sciSlug: "ex-legend-maker",    totalCards: 92  },
  { ptcgId: "ex15", sciYear: "2006", sciSlug: "ex-dragon-frontiers", totalCards: 101 },
];

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

    // Look for image URLs in the HTML
    const matches = html.match(/images\.production\.sportscardinvestor\.com\/[^"\s]+/g);
    if (!matches || matches.length === 0) return null;

    // Filter for the card image (not logos, ads, etc.)
    // Card images have the pattern: {prefix}/{size}-{S|M|L}
    const cardImages = matches.filter((m) => /\d+_[\d_]+\/(\d+)-[SLM]$/.test(m));
    if (cardImages.length === 0) return null;

    // Take the first match as the canonical image
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
  const entries: CustomImageEntry[] = [];
  let successCount = 0;
  let failCount = 0;

  for (const set of SETS) {
    console.log(`\nProcessing ${set.ptcgId} (${set.sciSlug})...`);
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

      await sleep(200); // Rate limit: 5 requests per second
    }
  }

  console.log(`\n\nDone. Success: ${successCount}, Failed/Not Found: ${failCount}`);
  console.log(`Writing ${entries.length} entries to prisma/custom-images.json`);

  writeFileSync(
    resolve(__dirname, "custom-images.json"),
    JSON.stringify(entries, null, 2)
  );

  console.log("Now run: npx tsx prisma/seed-custom-images.ts prisma/custom-images.json");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
