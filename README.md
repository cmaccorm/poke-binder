```
                               ▄▄                 ▄▄             
            ▄▄                 ██    ▀▀           ██             
████▄ ▄███▄ ██ ▄█▀ ▄█▀█▄       ████▄ ██  ████▄ ▄████ ▄█▀█▄ ████▄ 
██ ██ ██ ██ ████   ██▄█▀ ▀▀▀▀▀ ██ ██ ██  ██ ██ ██ ██ ██▄█▀ ██ ▀▀ 
████▀ ▀███▀ ██ ▀█▄ ▀█▄▄▄       ████▀ ██▄ ██ ██ ▀████ ▀█▄▄▄ ██    
██                                                               
▀▀                                                                                                                                      
```

> **Your digital Pokémon card binder — organize, browse, and build your collection.**

---

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-latest-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-3-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)

---

## What is PokeBinder?

PokeBinder is a web app for organizing your Pokémon TCG collection into virtual binders. Create binders in different layouts, search the live PokéTCG catalog, and slot cards into pages — just like a real binder, but without the plastic sleeves.

### Features

- **Multiple binder layouts** — 2×2, 3×3, and 4×3 grid options per binder
- **Live card search** — searches the [PokéTCG API](https://pokemontcg.io/) by name or number, with local DB caching
- **Persistent collection** — card assignments, page positions, and last-viewed page are all saved to PostgreSQL
- **Fast navigation** — client-side page cache with adjacent-page prefetch for instant flipping
- **Custom binder colors** — each binder has its own accent color
- **Pokémon-themed UI** — custom fonts and color palette built into the design system

---

## Tech Stack

| Technology | Version | Role |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16 | Full-stack framework (App Router, RSC, API routes) |
| [React](https://react.dev/) | 19 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Type safety throughout |
| [Prisma](https://www.prisma.io/) | 6 | ORM — schema, migrations, and query client |
| [PostgreSQL](https://www.postgresql.org/) | — | Primary database |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Utility-first styling + custom CSS variables |
| [Vitest](https://vitest.dev/) | 3 | Unit test runner |
| [PokéTCG API](https://pokemontcg.io/) | v2 | External card catalog (name/number search) |

---

## Data Model

Cards are organized in a strict hierarchy — cascade deletes flow top-to-bottom:

```
Binder
  └── Page  (ordered by pageIndex)
        └── Slot  (row + col position)
              └── CatalogCard  (nullable — a slot can be empty)
```

| Model | Key fields |
|---|---|
| `Binder` | `nickname`, `color` (hex), `layoutRows` × `layoutCols`, `lastViewedPage` |
| `Page` | `pageIndex` (0-based), foreign key → `Binder` |
| `Slot` | `row`, `col` (0-based, row-major), foreign key → `Page` |
| `CatalogCard` | `externalId` (e.g. `"base1-4"`), `name`, `setName`, `imageSmall`, `imageLarge`, `rarity` |

Supported layouts: `2×2`, `3×3`, `4×3` — validated at runtime via `isValidLayout()`.

---

## Getting Started

### Prerequisites

- Node.js 18+
- A running PostgreSQL instance

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Create a `.env` file in the project root:

```env
# Required — Prisma reads this
DATABASE_URL="postgresql://user:password@localhost:5432/pokebinder"

# Optional — increases PokéTCG API rate limits
POKEMON_TCG_API_KEY="your-api-key-here"
```

### 3. Run database migrations

```bash
npx prisma migrate deploy
npx prisma generate
```

### 4. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server (port 3000) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx vitest` | Run tests |
| `npx vitest run` | Run tests once (no watch) |
| `npx prisma generate` | Regenerate Prisma client after schema changes |
| `npx prisma migrate deploy` | Apply pending migrations |

---

## API Routes

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/binders` | List all binders |
| `POST` | `/api/binders` | Create a new binder |
| `PATCH` | `/api/binders/[id]` | Rename a binder |
| `DELETE` | `/api/binders/[id]` | Delete a binder (cascade) |
| `GET` | `/api/binders/[id]/pages/[pageIndex]` | Get a page (also updates `lastViewedPage`) |
| `PUT` | `/api/binders/[id]/slots/[slotId]` | Assign a card to a slot |
| `DELETE` | `/api/binders/[id]/slots/[slotId]` | Remove a card from a slot |
| `GET` | `/api/catalog/search?q=` | Search the PokéTCG catalog |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                          # Home — Shelf (binder list)
│   ├── layout.tsx                        # Root layout
│   ├── globals.css                       # Tailwind v4 + Pokémon theme vars/fonts
│   └── api/
│       ├── binders/                      # Binder CRUD + page/slot routes
│       └── catalog/search/               # PokéTCG card search
├── components/
│   ├── Shelf.tsx                         # Binder list / home screen
│   ├── BinderViewer.tsx                  # Main binder UI (client page cache)
│   ├── CardSearch.tsx                    # Debounced card search
│   ├── BinderCard.tsx                    # Single binder tile
│   ├── CreateBinderDialog.tsx            # New binder form
│   └── Header.tsx
├── lib/
│   ├── binders.ts                        # All Prisma queries (data-access layer)
│   ├── catalog.ts                        # PokéTCG API + local cache upsert
│   ├── layout.ts                         # Layout helpers (slotsPerPage, positions)
│   ├── types.ts                          # Shared types + BINDER_LAYOUTS
│   └── prisma.ts                         # Prisma client singleton
└── generated/prisma/                     # Generated Prisma client (do not edit)
```

---

## Notes

- The Prisma provider is `"prisma-client"` — **not** `@prisma/client`. Import from `@/generated/prisma/client`.
- Only images from `images.pokemontcg.io` are allowed via `next/image` (configured in `next.config.ts`).
- Slot positions are always generated row-major, regardless of mirrored/canonical display mode.
