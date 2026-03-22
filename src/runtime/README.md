# `src/runtime`

Execution layer for **declarative UI** in Aurora: schema runtime, **Generative JSON DSL** (Gen UI), and optional **schema playground** tooling.

## Layout

| Area | Role | Key entry points |
|------|------|------------------|
| **`core/`** | Engine primitives shared by the Gen interpreter: typed error surface, centralized failure reporting. | `engineTypes.ts`, `reportEngineError.ts` |
| **Gen DSL (flat files)** | **Interpreter**, **Zustand store**, **expression resolver**, **lint**, **registry**, **React provider/renderer**. | `genInterpreter.ts`, `genStore.ts`, `expressions.ts`, `GenUIProvider.tsx`, `GenUIRenderer.tsx`, `auroraGenRegistry.tsx`, `genLint.ts` |
| **Legacy / shared bindings** | Path helpers used by Gen + older schema flows. | `bindings.ts`, `genPaths.ts` |
| **Schema UI runtime** | Pre–Gen UI JSON schema renderer. | `SchemaRuntime.tsx` |
| **Playground** | Drag/drop schema editor host state + canvas. | `schemaPlaygroundStore.tsx`, `EditableSchemaRenderer.tsx`, `appReducer.ts`, `schemaDndConstants.ts` |
| **Utilities** | Chat client, JSON preview hook. | `genDslChatClient.ts`, `useJsonPreviewPane.ts` |

## Extension points (Gen DSL)

- **Components:** merge or replace entries in `auroraGenUIRegistry` (pass `registry` to `GenUIRenderer`).
- **Actions:** `document.actions` + `onClickAction` / API chains — executed by `runAction` / `runChain` in `genInterpreter.ts`.
- **Host hooks:** `GenUIProvider` accepts `navigate`, `onCustom`, and **`onEngineError`** for unexpected interpreter failures (invalid `MERGE_STATE` shapes, resolver throws, etc.). HTTP errors still flow through `lastError` and `onError` chains on `API_CALL`.

## Principles

- **No `eval`:** expressions use `expressions.ts` string templates only.
- **Fail-soft:** action steps report through `reportEngineError` + `store.lastError` instead of crashing the React tree when possible.
- **Imports:** prefer `../schema/*` for types; keep `core/` free of React so it stays reusable in tests and non-UI runners.
