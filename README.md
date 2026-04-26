```
                                ▄▄                 ▄▄             
             ▄▄                 ██    ▀▀           ██             
 ████▄ ▄███▄ ██ ▄█▀ ▄█▀█▄       ████▄ ██  ████▄ ▄████ ▄█▀█▄ ████▄ 
 ██ ██ ██ ██ ████   ██▄█▀ ▀▀▀▀▀ ██ ██ ██  ██ ██ ██ ██ ██▄█▀ ██ ▀▀ 
 ████▀ ▀███▀ ██ ▀█▄ ▀█▄▄▄       ████▀ ██▄ ██ ██ ▀████ ▀█▄▄▄ ██    
 ██                                                               
 ▀▀                                                                                                                                      
```

> **Your digital Pokemon card binder — organize, browse, and build your collection.**

---

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-latest-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

---

## What is PokeBinder?

PokeBinder is a web app that recreates the experience of organizing a real Pokemon card binder. Create binders with custom colors and layouts, search the live PokeTCG catalog, and slot cards into pages — just like a physical binder, but without the plastic sleeves. It works offline too.

---

## Features

### The Shelf

The homepage is a visual bookshelf. Binders are displayed as book-spine tiles inside a recessed display case, each showing its custom color, nickname, layout, and page count. Create a new binder by picking a name, one of 8 accent colors, a grid layout (2x2, 3x3, or 4x3), and a page count up to 100.

### Page-by-Page Browsing

Open a binder and flip through pages with arrow buttons or keyboard keys. Each page renders as a CSS grid matching the binder's layout. Cards sit in styled pockets with inset shadows that mimic real binder sleeves. The app remembers which page you were on — reopen a binder and it picks up where you left off.

### Card Search and Slot Assignment

Switch to Edit mode and tap an empty slot to search. The search panel hits the [PokeTCG API](https://pokemontcg.io/) with debounced input, showing thumbnails, set names, card numbers, and rarity. Tap a result to place the card. Tap a filled slot to remove it.

### Card Detail View

In View mode, click any card to open a detail modal with the full-resolution image, set info, rarity, types, artist, and TCGPlayer market prices across multiple price tiers (normal, holofoil, reverse holofoil, 1st edition).

### Offline Support

PokeBinder is a progressive web app with a custom service worker:

- **App shell caching** — the core routes are pre-cached so the app loads without a network connection.
- **Image caching** — card images use a cache-first strategy. Once you've seen a card, the image is available offline.
- **IndexedDB persistence** — binder listings and individual pages are stored locally via the `idb` library. When you open a binder online, all pages are proactively cached in the background in proximity-ordered batches.
- **Graceful degradation** — when offline, editing and search are disabled with clear visual indicators. An online/offline badge in the header reflects the current state. Pages not yet cached show a specific message with instructions.

### Mobile-First Design

Touch targets meet the 44pt accessibility guideline. Navigation adapts between desktop (inline arrow buttons) and mobile (a bottom navigation bar). Modals use bottom-sheet presentation on small screens and centered layout on larger ones. The card detail view switches from side-by-side to stacked automatically.

---

## How It's Built

### Tech Stack

| Technology | Role |
|---|---|
| [Next.js 16](https://nextjs.org/) | Full-stack framework — App Router, server components, API routes |
| [React 19](https://react.dev/) | UI rendering |
| [TypeScript](https://www.typescriptlang.org/) | Type safety throughout |
| [Prisma 6](https://www.prisma.io/) | ORM — schema, migrations, query client |
| [PostgreSQL](https://www.postgresql.org/) | Primary database |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling with custom design tokens |
| [PokeTCG API v2](https://pokemontcg.io/) | External card catalog |
| [idb](https://github.com/nickersoft/idb) | IndexedDB wrapper for offline storage |
| [Vitest](https://vitest.dev/) | Unit testing |

### Data Model

Cards are organized in a strict hierarchy with cascade deletes flowing top-to-bottom:

```
Binder  (nickname, color, layout, lastViewedPage)
  └── Page  (ordered by pageIndex)
        └── Slot  (row + col position, row-major order)
              └── CatalogCard  (nullable — slots can be empty)
```

`CatalogCard` records are shared references — they are not cascade-deleted when a slot is cleared. This means the local card cache grows over time and avoids redundant API calls.

### Multi-Layer Caching

The app uses five layers of caching, which is unusual for a CRUD app but makes navigation feel instant:

1. **Database card cache** — card data from the PokeTCG API is upserted into a `CatalogCard` table on first fetch. The external API is only hit once per card.
2. **Server-side in-memory cache** — full card metadata (including prices) is held in a `Map` with a 1-hour TTL, avoiding repeated API lookups within the same server process.
3. **Client-side page cache** — `BinderViewer` keeps a `Map<number, BinderPage>` ref so page flipping never re-fetches already-loaded pages. Adjacent pages (N-1, N+1) are prefetched automatically.
4. **IndexedDB cache** — binder listings and pages are persisted to IndexedDB for offline use. Background caching proactively stores all pages in batches of 2, throttled with 100ms pauses, ordered by proximity to the current page.
5. **Service Worker cache** — card images, static assets, and the app shell are cached at the network layer.

### Architecture Patterns

**Single data-access layer** — all Prisma queries go through `src/lib/binders.ts` and `src/lib/catalog.ts`. API routes are thin wrappers that delegate to these modules.

**Clean type boundary** — the app defines its own domain types (`BinderIdentity`, `BinderPage`, `BinderSlot`, `CardReference`) independently of Prisma's generated types. The data access layer maps between them.

**SSR + client interactivity** — binder detail pages are server components that fetch data and pass it as props to client-side `BinderViewer`. No loading spinner on initial render; all interactivity stays client-side.

**Batched writes** — when a catalog search returns 20 cards, all 20 are upserted in a single Prisma `$transaction`. The `lastViewedPage` update is fire-and-forget (doesn't block the page response) and debounced at 500ms.

**Progressive enhancement** — every offline feature silently falls back. All IndexedDB operations are wrapped in try/catch. The service worker registration is fire-and-forget. The app is fully functional without any of it.

### Visual Design

The UI is built around the physical binder metaphor:

- **Pokeball color palette** — custom CSS variables (`--poke-red`, `--poke-gold`, `--poke-dark`) define the theme. A subtle pokeball watermark built from layered radial gradients appears throughout.
- **Pokemon typography** — two custom pixel/classic Pokemon fonts for headers, plus Geist for body text via `next/font`.
- **VaultX-inspired pages** — card slots use inset shadows and a felt-texture background (SVG fractal noise) to look like real binder pockets. The bottom border is thicker than the top to mimic the pocket opening.
- **Binder spines** — each binder card on the shelf has a left-edge gradient simulating a book spine, a pokeball circle decoration, and the binder's accent color showing through.

---

## API

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/binders` | List all binders |
| `POST` | `/api/binders` | Create a new binder |
| `PATCH` | `/api/binders/[id]` | Rename a binder |
| `DELETE` | `/api/binders/[id]` | Delete a binder (cascade) |
| `GET` | `/api/binders/[id]/pages/[pageIndex]` | Get page data (also updates `lastViewedPage`) |
| `PUT` | `/api/binders/[id]/slots/[slotId]` | Assign a card to a slot |
| `DELETE` | `/api/binders/[id]/slots/[slotId]` | Remove a card from a slot |
| `GET` | `/api/catalog/search?q=` | Search the PokeTCG catalog |
