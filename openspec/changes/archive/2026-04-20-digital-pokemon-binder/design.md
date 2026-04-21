# Digital Pokemon Binder Design

## Overview

Build a binder-first digital app for browsing, organizing, and editing Pokemon binders. The experience centers on a shelf of binders, a fast binder viewer, and a per-binder edit mode that supports inline search, add, and remove actions without breaking page flow.

## Goals

- Present a shelf view that acts as the app home and entry point for each binder.
- Render binders with seamless page flipping in both view and edit modes.
- Support mirror mode while preserving exact page layout and slot positions.
- Allow inline search/add/remove actions directly from binder slots.
- Use catalog-backed card images and metadata with local caching for responsiveness.

## Non-Goals

- Trading, deck building, or battle features.
- Community, social, or multi-user collaboration flows.
- Advanced collection analytics, pricing, or market integrations.
- Full offline-first sync conflict resolution.

## Architecture

### Shelf

- The shelf is the primary navigation surface.
- Each binder card shows identity metadata such as nickname and color.
- Selecting a binder opens the viewer at the last known page and mode.

### Binder Viewer

- The viewer renders a fixed page layout per binder size.
- Page transitions should feel continuous and preserve slot positioning.
- View mode is read-only by default, with a clear entry into edit mode per binder.

### Mirror Mode

- Mirror mode flips left/right presentation without changing the underlying page structure.
- The page model stays canonical so edits and navigation behave the same in both orientations.
- UI transforms should be visual only; slot indices and stored positions remain stable.

### Per-Binder Edit Mode

- Edit mode is scoped to the currently open binder.
- The binder stays open while editing, including during page flips.
- Empty slots can be filled inline, and occupied slots can be cleared with confirmation.

### Inline Search, Add, and Remove

- Clicking an empty slot opens an inline catalog search.
- Search supports card name and card number, with live thumbnail results.
- Selecting a result assigns the card to the slot immediately.
- Removing a card requires confirmation before clearing the slot.

### Catalog Data and Local Cache

- Card images and metadata come from the catalog as the source of truth.
- A local cache stores recently used images and metadata for fast rerenders and repeat browsing.
- The cache should serve the viewer immediately when available and refresh opportunistically in the background.

### Seamless Page Flipping

- Page changes should reuse loaded binder state and avoid full rerenders.
- Preload adjacent pages and associated card assets when possible.
- Preserve edit state across page transitions so users do not lose context.

## Key Decisions

1. Canonical binder state is independent of mirror mode.
- Decision: Keep one underlying page/slot model and apply mirror presentation at render time.
- Alternatives considered: storing mirrored layouts separately, or duplicating binder data per orientation.
- Why: avoids state duplication, reduces edit bugs, and keeps flipping behavior consistent.

2. Catalog-backed cards are cached locally.
- Decision: Cache card images and metadata locally, then revalidate in the background.
- Alternatives considered: always fetching live, or fully embedding catalog data in binder state.
- Why: improves perceived speed while keeping catalog data current enough for browsing.

3. Edit mode stays inside the viewer.
- Decision: Keep editing inline in the open binder instead of launching a separate editor.
- Alternatives considered: modal-only editing, or a standalone binder editor screen.
- Why: preserves page context and makes add/remove actions faster.

4. Page flipping is a first-class interaction.
- Decision: Optimize navigation and asset loading around page turns.
- Alternatives considered: simple page replacement with no prefetching.
- Why: binder browsing should feel physical and immediate.

5. Tech stack: Next.js 16 (App Router) + Tailwind CSS 4 + Prisma 6 / SQLite.
- Decision: Full-stack React framework with embedded database.
- Alternatives considered: React + Vite (needs separate backend), SvelteKit, Vue + Nuxt.
- Why: App Router provides file-based API routes and server components; SQLite keeps it simple for a personal tool.

6. Card catalog source: Pokemon TCG API (pokemontcg.io v2).
- Decision: Use the free public API for card search and image references.
- Alternatives considered: local-only card database, TCGdex API, PokemonPriceTracker API.
- Why: free tier is sufficient for personal use; upsert-on-search caches results locally in SQLite.

7. Prisma client generator: `prisma-client` (v6 style, generates .ts files to src/generated/prisma/).
- Decision: Use the default v6 generator with output to src/generated/prisma.
- Note: The generated client uses ESM-style .ts files, imported as `@/generated/prisma/client`.

## Risks and Trade-offs

- Local cache consistency may briefly show stale metadata if the catalog changes.
- Inline search can feel dense if too many results appear at once, so filtering and result density need care.
- Mirror mode adds rendering complexity even though the data model stays simple.
- Seamless flipping may increase prefetch and memory usage on larger binders.
- First API request after cold start takes ~23s due to Turbopack compilation; subsequent requests are fast (50-250ms).

## Implementation Notes

### DATABASE_URL must be absolute

Prisma's SQLite engine resolves `file:./dev.db` relative to the engine binary location, not the project root. During `prisma migrate dev`, the relative path resolves from `prisma/schema.prisma` (so `file:./dev.db` creates `prisma/dev.db`). At runtime under Next.js dev server, the same relative path resolves differently, causing "Unable to open the database file" errors.

**Fix:** Use an absolute path in `.env`:
```
DATABASE_URL="file:/mnt/c/poke-binder/prisma/dev.db"
```

For production or other machines, set `DATABASE_URL` to the correct absolute path for that environment.

### Prisma v6 client import path

The Prisma v6 `prisma-client` generator outputs `.ts` files (not compiled JS) to `src/generated/prisma/`. The correct import is:
```ts
import { PrismaClient } from "@/generated/prisma/client";
```
Not `@/generated/prisma` (which has no index file).

## Migration Plan

1. Introduce the binder shell and shelf entry points.
2. Add canonical binder rendering with page flipping.
3. Layer in mirror mode using visual transforms only.
4. Add per-binder edit mode with inline search, add, and remove.
5. Connect catalog-backed images and metadata with local caching and prefetch.
6. Tune flip performance and caching behavior based on real usage.

## Open Questions Resolved

- The local cache should persist across app restarts so repeat browsing stays fast.
- Manual cache invalidation is not required for the first version; background revalidation is enough.
- Search should cover the full catalog, with filters added later if needed.
- Loading states should be explicit: skeletons for page content, inline "no results" messaging for searches, and a placeholder image for missing thumbnails.
- Binder pages should remember a single last viewed page per binder rather than separate page positions per mode.
