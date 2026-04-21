## Why

People need a consistent way to manage a digital Pokemon binder without relying on manual tracking or scattered notes. This change creates a dedicated binder-first web app where users can browse, organize, and edit their physical binder contents digitally.

## What Changes

- Scaffold a Next.js + Tailwind CSS + Prisma/SQLite project from scratch.
- Introduce a digital Pokemon binder capability for organizing and viewing binder contents digitally.
- Integrate with the Pokemon TCG API (pokemontcg.io) for card catalog search and image references.
- Implement a shelf view, binder viewer with page flipping, per-binder edit mode, inline card search, and add/remove flows.

## Capabilities

### New Capabilities
- `digital-pokemon-binder`: A digital binder experience for managing Pokemon binder entries.

### Modified Capabilities


## Impact

- New greenfield project: Next.js 16 (App Router), Tailwind CSS 4, Prisma 6 with SQLite.
- Database schema: Binder, Page, Slot, CatalogCard models.
- API routes for binder CRUD, page loading, slot assignment, and catalog search.
- External dependency on pokemontcg.io API (free tier, optional API key for higher rate limits).
- Dev server requires absolute DATABASE_URL path for reliable Prisma engine resolution (see design.md for details).
