# PokeBinder — Agent Instructions

## Quick commands

```
npm run dev          # Start dev server (Next.js App Router, port 3000)
npm run build        # Production build
npm run lint         # ESLint
npx vitest           # Run tests (vitest.config.ts has no npm script)
npx prisma generate  # Regenerate Prisma client after schema changes
npx prisma migrate deploy  # Apply migrations in production
```

## Setup

- `DATABASE_URL` env var required (PostgreSQL) — Prisma reads it via `prisma.config.ts`
- After pulling schema changes: `npx prisma generate` then `npx prisma migrate deploy`
- Generated Prisma client lives at `src/generated/prisma/client` (imported as `@/generated/prisma/client`)

## Architecture

Single Next.js 16 app (App Router). No monorepo, no separate packages.

**Data model** — `Binder` → `Page` → `Slot` → `CatalogCard`. Cascade delete flows down the chain.

**Entry points:**
- `src/app/page.tsx` → `Shelf` (list binders)
- `src/app/binder/[binderId]/page.tsx` → `BinderViewer` (view/edit pages)
- `src/lib/binders.ts` — all Prisma queries (the single data-access layer)
- `src/lib/catalog.ts` — external PokéTCG API search + local cache
- `src/lib/layout.ts` — layout helpers (2x2, 3x3, 4x3 only)

**API routes** (`src/app/api/`):
- `GET/POST /api/binders` — list/create binders
- `PATCH /api/binders/[id]` — rename
- `DELETE /api/binders/[id]` — delete (cascade)
- `GET /api/binders/[id]/pages/[pageIndex]` — get page (side-effect: updates lastViewedPage)
- `PUT /api/binders/[id]/slots/[slotId]` — assign card
- `DELETE /api/binders/[id]/slots/[slotId]` — remove card
- `GET /api/catalog/search?q=` — search PokéTCG API

**Key patterns:**
- `BinderViewer` uses a client-side page cache (`Map`) with prefetch of adjacent pages
- `lastViewedPage` is debounced (500ms) to avoid excessive writes
- Card search is debounced (300ms) on the client
- `assignCardToSlot` and `removeCardFromSlot` in `binders.ts` are the canonical write paths

**Styling:** Tailwind CSS v4 + PostCSS. Custom CSS variables for the poke theme (`--poke-dark`, `--poke-gold`, etc.). Custom fonts (`--font-pokemon-classic`, `--font-pokemon-pixels`) loaded in `globals.css`. Next.js `next/font` used for Geist.

**Image config:** Only `images.pokemontcg.io` is allowed in `next.config.ts`.

## Testing

- Vitest config: `vitest.config.ts` — environment is `node` (not jsdom)
- Tests use `@` path alias → `npx vitest` works directly
- Current tests: `src/__tests__/layout.test.ts` (layout helpers)
- No test script in `package.json` — run with `npx vitest` or `npx vitest run`

## OpenSpec

This repo uses OpenSpec for change management. Changes live in `openspec/changes/`. Archived changes are in `openspec/changes/archive/`. Config at `openspec/config.yaml` (schema: spec-driven).

## Gotchas

- Prisma provider is `"prisma-client"` (not `@prisma/client`) — check `prisma/schema.prisma`
- Binder layouts are strictly 2x2, 3x3, or 4x3 — validated via `isValidLayout()`
- Slot positions are always generated row-major regardless of presentation mode (mirrored/canonical)
- `eslint-config-next` is used — no separate `.eslintrc*` file exists
- No CI, no pre-commit hooks, no `.github/` workflows
- No `opencode.json` — no custom instructions config
