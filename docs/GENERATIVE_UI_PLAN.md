# Plan: AI-driven declarative UI (Aurora Generative Runtime)

This file tracks **(A)** what the generative stack **does today** (aligned with `docs/GENERATIVE_UI.md`) and **(B)** **future** enhancements. There is no “partial” feature list for shipped items: if it is not in **§12 Not supported** of `GENERATIVE_UI.md`, it is **fully specified and implemented** for the default path.

---

## A. Delivered stack (complete)

| Layer | What ships |
|-------|------------|
| **Contract** | `GenUIDocument` / `GenUINode`; Zod `parseGenUIDocument` |
| **Lint** | `lintGenUIDocument`, `parseAndLintGenUIDocument`; registry-type warnings; missing `actions[id]` for `onClickAction` / `onSortAction` / `onChangeAction`; depth & node limits (`DEFAULT_GEN_LIMITS`) |
| **State** | Zustand `createRuntimeStore`; `SET_STATE` (dot path); **shallow** `MERGE_STATE`; `loading`; `lastError` |
| **Actions** | `API_CALL` (`fetch`, `onSuccess` / `onError` chains), `NAVIGATE`, `CUSTOM`, `CHAIN` |
| **Expressions** | `{{state.*}}`, `{{event.*}}`, `{{response.*}}`, `{{bindings.*}}` — no `eval` |
| **Renderer** | `GenUIRenderer`: `bind`, `tabBind`, `onClickAction`, `onSortAction`, `onChangeAction`, `filterBind`, `ShowWhen` + `when` / `loadingKey` |
| **Default registry** | See **§4** in `GENERATIVE_UI.md` (`auroraGenUIRegistry` / `auroraGenUIRegistryTypes`) |
| **Playground** | **Generative JSON DSL** mode: paste JSON, Zod + lint output, live preview |
| **Docs** | **`GENERATIVE_UI.md`** = authoritative “what works / what doesn’t”; **`GENERATIVE_UI_DSL_PROPS.md`** = per-`type` styling/layout props for AI JSON; **`COMPONENT_DSL_CONVENTIONS.md`** = how to build components for DSL |
| **Tests** | `src/runtime/gen/genLint.test.ts` (lint); broader interpreter/renderer tests = **future** (Phase 5) |

---

## B. Product vision (unchanged)

1. AI emits **one validated JSON document** (no functions).
2. Host runs **one pipeline**: validate → render → state → actions.
3. Rich UIs = **composition** + **documented** registry types and wiring props.
4. Host supplies **`navigate`**, **`onCustom`**, optional **registry extensions**, and **production fetch policy** (outside the library).

---

## C. Explicitly out of scope for this package

- LLM prompts, RAG, tool-calling → product layer.
- Arbitrary executable code in JSON → use `CUSTOM` + host code.

---

## D. Future phases (not implemented as first-class features yet)

### Phase 3 — Interpreter & host hardening

| # | Enhancement |
|---|-------------|
| 3.1 | Injectable `fetch` (base URL, allowlist, auth) for `API_CALL` |
| 3.2 | Optional `event` on `onClickAction` (e.g. payload) |
| 3.3 | `AbortController` / cancel in-flight `API_CALL` on unmount |

### Phase 4 — Dynamic & data UX

| # | Enhancement |
|---|-------------|
| 4.1 | `repeat` / list node or documented array-template pattern |
| 4.2 | First-class **Pagination** `type` + table integration |
| 4.3 | `ShowWhen` **equality** / match DSL (e.g. step `=== 2`) |

### Phase 5 — Quality & fixtures

| # | Enhancement |
|---|-------------|
| 5.1 | Interpreter tests (`fetch` mock), expression edge cases |
| 5.2 | Expanded **example library** (dashboard, API→table, wizard booleans) |
| 5.3 | Optional JSON Schema export for tools |

---

## E. Completed milestones (historical)

| Phase | Scope | Status |
|-------|--------|--------|
| **1** | `GENERATIVE_UI.md`, playground Gen DSL, lint, depth/node limits | **Done** |
| **2** | Expanded default registry (layout, forms, tabs, table, alert, breadcrumb, link, …); `tabBind`, `onChangeAction`, boolean `bind` | **Done** |

---

## F. Success criteria

- [x] Valid documents using **default registry + wiring** render and run actions without extra host code, except **`navigate` / `onCustom` / fetch policy** as documented.
- [x] Invalid documents fail **Zod** and/or **lint** with clear feedback.
- [x] **`GENERATIVE_UI.md`** is sufficient for AI + host teams without reading all source.
- [x] Playground **Gen DSL** mode demonstrates end-to-end flow.

---

*Canonical behavior: **`docs/GENERATIVE_UI.md`**. Implementation: `src/schema/genDocumentTypes.ts`, `genDocumentSchema.ts`, `runtime/genInterpreter.ts`, `genStore.ts`, `GenUIRenderer.tsx`, `auroraGenRegistry.tsx`, `genLint.ts`.*
