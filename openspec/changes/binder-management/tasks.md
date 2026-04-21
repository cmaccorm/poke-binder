## 1. Database Functions

- [x] 1.1 Add `renameBinder(binderId: string, nickname: string)` function to `src/lib/binders.ts` — updates the binder's nickname via `prisma.binder.update` and returns the updated `BinderIdentity`
- [x] 1.2 Add `deleteBinder(binderId: string)` function to `src/lib/binders.ts` — deletes the binder via `prisma.binder.delete` (cascade handles pages and slots)

## 2. API Route

- [x] 2.1 Create `src/app/api/binders/[binderId]/route.ts` with a PATCH handler that accepts `{ nickname }`, validates non-empty after trimming, calls `renameBinder()`, and returns the updated binder identity (200) or error (400)
- [x] 2.2 Add a DELETE handler to the same route file that calls `deleteBinder()` and returns 204 on success, or 404 if the binder doesn't exist

## 3. Inline Rename UI

- [x] 3.1 In `BinderViewer.tsx`, add state for rename mode (`isRenaming`) and a local `nickname` value
- [x] 3.2 When edit mode is active, make the nickname `<h1>` clickable (with a pencil icon or cursor style) to enter rename mode
- [x] 3.3 In rename mode, swap the `<h1>` for an `<input>` pre-filled with the current nickname — Enter or blur triggers save, Escape cancels
- [x] 3.4 On save, call PATCH API, update local nickname state on success, revert on failure or empty input

## 4. Delete UI

- [x] 4.1 In `BinderViewer.tsx`, add a delete/trash button to the header that is only rendered when `editMode` is true
- [x] 4.2 Add a confirmation dialog triggered by the delete button with the text "Are you sure you want to delete this binder?" and Cancel/Delete buttons
- [x] 4.3 On confirm, call DELETE API and redirect to shelf (`router.push("/")`) on success

## 5. Verification

- [x] 5.1 Build the app (`next build`) and confirm no TypeScript errors
- [x] 5.2 Run the test suite (`npx vitest run`) and confirm no regressions
