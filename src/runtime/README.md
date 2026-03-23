# `src/runtime`

Execution layer for declarative UI in Aurora. Folders are grouped by **engine** so the Generative JSON DSL stays isolated from legacy schema UI and playground tooling.

## Layout

| Folder | Role |
|--------|------|
| **`core/`** | Shared primitives: path bindings (`bindings.ts`), immutable path updates (`genPaths.ts`), Gen engine error types (`engineTypes.ts`), centralized failure reporting (`reportEngineError.ts`). No React; safe to reuse in tests and non-UI runners. |
| **`gen/`** | **Generative JSON DSL** — interpreter, Zustand store, expressions, lint, default component registry, registry wrappers, React provider/renderer, branding bar, chat client. |
| **`schema-ui/`** | Legacy **JSON schema** tree renderer (`SchemaRuntime`) for pre–Gen UI flows. |
| **`playground/`** | Visual **schema playground** editor (drag/drop, canvas, reducer). |
| **`hooks/`** | Runtime hooks (e.g. `useJsonPreviewPane` for the Gen DSL playground). |

## Extension points (Gen DSL)

- **Registry:** merge or replace `auroraGenUIRegistry` (`gen/auroraGenRegistry.tsx`).
- **Actions:** `document.actions` executed by `gen/genInterpreter.ts` (`runAction` / `runChain`).
- **Host hooks:** `GenUIProvider` — `navigate`, `onCustom`, `onEngineError`.

## Principles

- **No `eval`:** expressions live in `gen/expressions.ts`.
- **Imports:** `gen/*` uses `../core/*` for bindings/paths; `schema-ui` and `playground` import `../core/bindings` where needed.
