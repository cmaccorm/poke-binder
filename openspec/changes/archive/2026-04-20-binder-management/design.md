## Context

The poke-binder app currently supports creating and viewing binders but has no update or delete operations. The binder nickname is displayed as static text in two places: the shelf view (`BinderCard.tsx`) and the binder viewer header (`BinderViewer.tsx`). No `/api/binders/[binderId]` route exists — only nested routes for pages and slots. The Prisma schema already has `onDelete: Cascade` configured on Page→Binder and Slot→Page, so deletion cascades are ready.

## Goals / Non-Goals

**Goals:**
- Allow users to rename a binder from within the binder viewer
- Allow users to delete a binder with a confirmation step
- Both operations gated behind edit mode for safety
- Keep the shelf view simple — no management controls there

**Non-Goals:**
- Rename or delete from the shelf view (kept for a future change if needed)
- Editing other binder properties (color, layout) — out of scope
- Undo/restore deleted binders
- Bulk operations (delete multiple binders)

## Decisions

### Decision 1: Single new API route file with PATCH and DELETE

**Choice:** Create `src/app/api/binders/[binderId]/route.ts` with two handlers:
- `PATCH` — accepts `{ nickname: string }`, validates non-empty, returns updated binder identity
- `DELETE` — no body needed, returns 204 No Content

**Rationale:** Both operations target the same resource (`/api/binders/:id`), so they belong in the same route file following REST conventions and Next.js App Router patterns already used in the codebase.

**Alternatives considered:**
- *Separate route files:* Unnecessary complexity for two simple handlers on the same resource.
- *PUT instead of PATCH:* PUT implies replacing the entire resource. PATCH is more accurate since we're only updating the nickname.

### Decision 2: Inline click-to-edit for rename

**Choice:** In `BinderViewer.tsx`, when in edit mode, clicking the nickname `<h1>` (or a pencil icon beside it) swaps it to an `<input>` element pre-filled with the current name. Enter or blur saves via PATCH. Escape cancels and reverts.

**Rationale:** Inline editing is the most natural interaction for renaming — the user clicks exactly what they want to change. No modal overhead, no navigation away from context. This pattern is well-established (file rename in OS, spreadsheet cells, etc.).

**Validation rules:**
- Empty or whitespace-only input reverts to the previous name (no API call)
- Trimmed input is sent to the API

**State management:** Local component state for the editing flag and input value. On successful PATCH, update the local `binder` state (or a nickname override state) so the UI reflects the change immediately without a full page reload.

**Alternatives considered:**
- *Modal dialog for rename:* Heavier UX for a simple text change. Modals are better suited for multi-field edits.
- *Settings page:* Overkill for a single field.

### Decision 3: Delete button visible only in edit mode

**Choice:** A trash/delete icon appears in the header bar only when `editMode` is true. Clicking it opens a confirmation dialog with the exact text: "Are you sure you want to delete this binder?" with Cancel and Delete buttons.

**Rationale:** Gating behind edit mode provides a two-step safety barrier (enter edit mode → click delete → confirm dialog). This prevents accidental deletion during normal browsing while keeping the feature discoverable when the user is in a management mindset.

**Post-delete flow:** On successful DELETE response, call `router.push("/")` to redirect to the shelf. The shelf will re-fetch binders on mount, so the deleted binder won't appear.

**Alternatives considered:**
- *Delete always visible:* Higher discoverability but more accident-prone. The confirmation dialog alone might be sufficient, but the extra gate costs nothing and matches the "edit mode = management mode" mental model.
- *Delete on shelf view:* More convenient for cleanup but adds complexity to the shelf component and risks accidental deletion from a list view.

### Decision 4: Reuse existing confirmation dialog pattern

**Choice:** The delete confirmation dialog follows the same pattern as the existing card removal confirmation in `BinderViewer.tsx` — a fixed overlay with `bg-black/50` backdrop, white card with text and two buttons.

**Rationale:** Consistency with existing UI patterns. The card removal dialog already uses this exact structure, so users encounter a familiar interaction.

## Risks / Trade-offs

- **[No undo for delete]** → The confirmation dialog is the only safety net. Once confirmed, the binder and all its pages/cards are gone. This is acceptable for a personal tool — undo would require soft-delete infrastructure.
- **[Stale shelf after rename]** → If the user renames a binder and navigates back to the shelf, the shelf re-fetches from the API, so it will show the updated name. No staleness issue.
- **[Rename race with other state]** → The binder identity is passed as a prop from the server component. Renaming only updates local state in the client. If the page is hard-refreshed, the server will fetch the updated name from the DB. No consistency issue.
