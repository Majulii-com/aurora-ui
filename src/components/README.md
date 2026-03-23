# Aurora components

- **DSL / generative JSON:** follow **`docs/AURORA_UI_BIBLE.md` §14**. Every component should expose **root styling** via **`extends HTMLAttributes<…>`** (or `AuroraDslRoot*` helpers) + **`cn()`**, so JSON can change look & feel with `className` / `style` and standard DOM attributes.
- **`Gen*`** folders are thin wrappers for the generative runtime (e.g. `GenText`, `GenDataTable`, `GenSpinner`); presentational logic lives in sibling primitives (`Table`, `Spinner`, …).
