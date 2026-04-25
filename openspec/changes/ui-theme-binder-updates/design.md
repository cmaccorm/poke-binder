## Context

The application currently has a navy blue and purple color scheme which feels slightly dated or less polished compared to modern UI standards. The user has requested a shift to a charcoal and red palette. The "My Binders" heading is also redundant, and the binder cards could look much more immersive if styled to resemble real 3D binders.

## Goals / Non-Goals

**Goals:**
- Update CSS custom properties to use charcoal (`#111111`, `#1f1f1f`, `#2a2a2a`) and maintain red (`#DC2626`) accents.
- Add a glowing red effect to the main "poké-binder" header.
- Remove redundant headers ("My Binders") from the shelf.
- Redesign the `BinderCard` component to look like a realistic 3D binder.

**Non-Goals:**
- Changes to the underlying data model or API routes.
- Extensive animations or heavy 3D rendering (e.g. using Three.js). We will rely on CSS box-shadows, borders, and gradients for the 3D effect.

## Decisions

- **Color Palette:** Using `--poke-dark` as `#111111` (dark charcoal), `--poke-dark-lighter` as `#1f1f1f`, and `--poke-dark-surface` as `#2a2a2a` to achieve the requested look. The `--poke-red` remains `#DC2626` but will be leveraged for glowing text effects using `text-shadow`.
- **3D Binder CSS:** We will use `border-r-[6px]` or `border-r-8` with a white/off-white color to simulate pages, and a gradient overlay `bg-gradient-to-r from-black/40 to-transparent` to simulate the curved spine of the binder.

## Risks / Trade-offs

- **Contrast Issues:** The charcoal background might make some existing grey text hard to read. We will need to ensure `text-poke-slate` or other secondary text colors still have sufficient contrast against the new darker backgrounds.
- **Glowing Effect:** Heavy text shadows can sometimes cause performance hits on lower-end devices if overused, but a single static glow on the main header is perfectly safe.
