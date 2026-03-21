# Component conventions — Generative JSON DSL

Every **presentational** component in `src/components` should be **controllable from JSON** (Tailwind classes, variants, optional slots) so AI-generated `GenUIDocument` can change look & feel **without** editing library code. Wiring-only wrappers (`GenText`, `GenDataTable`, `GenSpinner`, …) stay thin and delegate to primitives.

**Shared types (optional):** `AuroraDslRootDiv` / `AuroraDslRootSpan` from `src/types/auroraDslComponent.ts` (re-exported in the package root) document the minimum “root styling” surface when you cannot extend full `HTMLAttributes`.

## 1. Required for new components

| Rule | Why |
|------|-----|
| **`className` + `style` on the root** | Prefer **`extends HTMLAttributes<…>`** on the root DOM node so `className` and `style` are always available; merge with `cn()`. JSON can set `props.className` / `props.style`. |
| **Forward `…rest` to the root** | Where safe, spread remaining DOM props so DSL can set `id`, `data-*`, `aria-*`, `title`, etc. |
| **Variants as typed props** (`variant`, `size`, …) | Stable DSL surface; avoid only internal CSS. |
| **Composite components** | Expose extra optional `*ClassName` / `*Props` for inner nodes when one `className` is not enough (see `Table.wrapperClassName`, `GenDataTable` DSL props). |
| **Register in `auroraGenUIRegistry`** when the type should appear in JSON | Add to `auroraGenRegistry.tsx` + `auroraGenUIRegistryTypes` + `GENERATIVE_UI.md` / `GENERATIVE_UI_DSL_PROPS.md`. |

## 1b. Existing catalog (today)

Primitives under `src/components/*` already follow the **HTMLAttributes + `cn(className)`** pattern (or equivalent) on their root. **`GenText`** extends `HTMLAttributes<HTMLParagraphElement>`; **`GenSpinner`** extends Stack’s root props plus `labelClassName`. When adding a new folder, match this pattern before merging.

## 2. `Gen*` wrappers

Use a **`Gen*` prefix** when the component adds **runtime-only** behavior (bindings, actions, expressions) on top of a primitive:

- **`GenText`** → typography + `children` from JSON.
- **`GenDataTable`** → sort/filter + `Table`.
- **`GenSpinner`** → loading label + `Spinner`.

Wrappers should **forward** `className` and documented layout props to the inner UI.

## 3. Imports & TypeScript

- Prefer **barrel** `ComponentName/index.ts` for public API.
- For **internal** imports that confused the TS server (`Cannot find module '…/GenText'`), import the **implementation file** explicitly, e.g. `../components/GenText/GenText`.
- Avoid **circular** `src/index.ts` → runtime → `index` re-exports.

## 4. Documentation

When adding or extending a registry type:

1. Update **`docs/GENERATIVE_UI_DSL_PROPS.md`** (styling props table).
2. Update **`docs/GENERATIVE_UI.md`** if behavior is user-visible.
3. Add or adjust an example under **`docs/examples/`** if it helps AI authors.

## 5. What “fully dynamic” does *not* mean

New **behaviors** (e.g. row click actions, new chart types) still need **code** once; **layout, theme-like classes, variants, and composition** (`Stack`, `Box`, `ShowWhen`) should stay in JSON.
