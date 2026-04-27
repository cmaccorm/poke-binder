import { writeFileSync } from "fs";
import { resolve } from "path";

interface CustomImageEntry {
  externalId: string;
  variant: string;
  imageSmall: string;
  imageLarge: string;
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchCardsForSet(ptcgId: string): Promise<Map<string, string>> {
  const url = `https://api.pokemontcg.io/v2/cards?q=set.id:${ptcgId}&pageSize=250`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch cards for ${ptcgId}: ${res.status}`);
  const json = await res.json();
  const map = new Map<string, string>();
  for (const c of json.data) {
    map.set(c.number, c.id);
  }
  return map;
}

async function main() {
  const setPageUrl = "https://www.sportscardinvestor.com/sets/2007-ex-power-keepers-pokemon";
  const setRes = await fetch(setPageUrl);
  const setHtml = await setRes.text();

  // Extract all reverse holo card links (without trailing backslashes)
  const matches = setHtml.match(/\/cards\/[^"]*reverse-holo[^"]*/g);
  if (!matches) {
    console.log("No reverse holo cards found on set page");
    return;
  }

  const uniquePaths = [...new Set(matches.map((m) => m.replace(/\\$/, "")))];
  console.log(`Found ${uniquePaths.length} reverse holo links on set page`);

  const cardMap = await fetchCardsForSet("ex16");
  const entries: CustomImageEntry[] = [];

  for (const path of uniquePaths) {
    const cardUrl = "https://www.sportscardinvestor.com" + path;
    const cardRes = await fetch(cardUrl);
    const cardHtml = await cardRes.text();

    const imgMatches = cardHtml.match(/images\.production\.sportscardinvestor\.com\/[^"\s]+/g);
    if (!imgMatches) continue;

    const regex = /\d+_[\d_]+[\/_]\d+(-[SLM])?$/;
    const cardImages = imgMatches.filter((m) => regex.test(m));
    if (cardImages.length === 0) continue;

    const base = cardImages[0].replace(/-[SLM]$/, "");

    // Extract card number from URL
    const numMatch = path.match(/reverse-holo-(\d+)-\d+/);
    const number = numMatch ? numMatch[1].replace(/^0+/, "") : null;

    if (!number || !cardMap.has(number)) {
      console.log(`  Warning: no PokemonTCG mapping for ${path}`);
      continue;
    }

    entries.push({
      externalId: cardMap.get(number)!,
      variant: "Reverse Holo",
      imageSmall: "https://" + base + "-S",
      imageLarge: "https://" + base + "-L",
    });

    process.stdout.write("+");
    await sleep(200);
  }

  console.log(`\n\nScraped ${entries.length} EX Power Keepers reverse holo images`);

  if (entries.length > 0) {
    writeFileSync(resolve(__dirname, "custom-images-ex16.json"), JSON.stringify(entries, null, 2));
    console.log("Wrote to prisma/custom-images-ex16.json");
    console.log("Run: npx tsx prisma/seed-custom-images.ts prisma/custom-images-ex16.json");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
