## Why

Binders are currently create-once — there is no way to rename a binder or delete one. Users who misname a binder or want to clean up their shelf have no recourse. Rename and delete are fundamental CRUD operations that complete the binder lifecycle.

## What Changes

- Add the ability to rename a binder via inline click-to-edit on the nickname in the binder viewer header (only available in edit mode)
- Add the ability to delete a binder via a trash icon in the binder viewer header (only available in edit mode), with a confirmation dialog: "Are you sure you want to delete this binder?"
- After successful deletion, redirect the user to the shelf view
- New API route at `/api/binders/[binderId]` supporting PATCH (rename) and DELETE operations

## Capabilities

### New Capabilities

- `binder-rename`: Inline rename of a binder's nickname from within the binder viewer, with validation (non-empty) and optimistic UI update
- `binder-delete`: Delete a binder with confirmation dialog, cascading removal of all pages and slots, and redirect to shelf

### Modified Capabilities

- `digital-pokemon-binder`: The "Shelf view shows binder identity" requirement is unchanged, but the binder viewer now exposes edit and delete controls in edit mode

## Impact

- **New file**: `src/app/api/binders/[binderId]/route.ts` — PATCH and DELETE handlers
- **Modified**: `src/lib/binders.ts` — new `renameBinder()` and `deleteBinder()` functions
- **Modified**: `src/components/BinderViewer.tsx` — inline rename UI, delete button + confirmation dialog, both gated behind edit mode
- **No schema changes** — Prisma cascade deletes are already configured on Page→Binder and Slot→Page
- **No breaking changes**
