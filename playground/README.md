# Aurora UI — dev playground

Thin shell around **`@majulii/aurora-ui`**: layout, theme, and a **component registry** (`ComponentRegistry.tsx` → `uiRegistry`) so `type` strings resolve to real components.

All **schema tree state**, **bindings**, **editable canvas**, **Generative JSON DSL** runtime, and **assistant chat client** live in the **library** (`src/runtime/*`). See **`docs/SCHEMA_PLAYGROUND_HOST.md`**.

```bash
npm run playground
```
