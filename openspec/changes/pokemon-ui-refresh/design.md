## Context

Poke-binder already supports binder browsing, editing, and catalog-backed card placement. The requested change is a visual refresh, so the design needs to improve the experience without altering the core binder workflows or introducing backend churn.

## Goals / Non-Goals

**Goals:**
- Establish a cohesive Pokémon-inspired visual system across shelf, binder, and edit views.
- Improve surface quality, contrast, and spacing so the UI feels more polished.
- Keep card imagery crisp and stable within the refreshed layout.
- Preserve existing binder behavior and page layouts.

**Non-Goals:**
- No changes to binder management rules or catalog content.
- No API redesign or persistence migration.
- No redesign of core page-flipping behavior.

## Decisions

- Centralize the refreshed look in a shared theme layer rather than styling each surface independently. This keeps the Poké Ball palette, surfaces, and elevation consistent across views. Alternative: per-component styling, which would drift over time and make the visual language harder to maintain.
- Treat the visual refresh as a spec-level capability, not just an implementation detail. This makes the theme and image expectations testable and keeps the redesign aligned with the spec-driven workflow. Alternative: describe it only in design notes, which would not provide a durable contract.
- Define image presentation as part of the change so artwork remains stable within the new surfaces. Alternative: leave image sizing to incidental component behavior, which risks layout shift and inconsistent cropping in the redesigned UI.

## Risks / Trade-offs

- [More theme tokens can increase styling surface area] -> Keep the theme scoped to binder-facing views and reuse shared primitives where possible.
- [Image treatment can create visual mismatch across card art] -> Preserve aspect ratio and reserve space so loading behavior stays predictable.
- [A stronger theme can reduce readability if overused] -> Keep decorative elements secondary to text, controls, and slot content.

## Migration Plan

1. Update the shared visual theme for binder-facing views.
2. Apply the refreshed surfaces to shelf and binder screens while preserving existing behavior.
3. Align card imagery handling with the new surfaces and verify that layout remains stable.
4. If needed, revert by restoring the prior theme and image presentation rules.

## Open Questions

- None.
