# Aurora UI — dev playground

Thin shell around **`@majulii/aurora-ui`**: layout, theme, and a **component registry** (`ComponentRegistry.tsx` → `uiRegistry`) so `type` strings resolve to real components.

All **schema tree state**, **bindings**, **editable canvas**, **Generative JSON DSL** runtime, and **assistant chat client** live in the **library** (`src/runtime/*`). See **`docs/AURORA_UI_BIBLE.md` §8**.

```bash
npm run playground
```
