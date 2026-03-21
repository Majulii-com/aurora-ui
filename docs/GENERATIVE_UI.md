# Generative JSON DSL — full contract (`GenUIDocument`)

AI (or tools) emit **one JSON object** (no functions). The host runs:

`parseGenUIDocument` → optional `lintGenUIDocument` → **`GenUIProvider`** → **`GenUIRenderer`** → **Zustand** state → **`runAction`** / `fetch` / host hooks.

This document lists **only behavior that is implemented today** in `aurora-ui` (see §Not supported for boundaries). **Per-component JSON props (Tailwind / DSL knobs):** `GENERATIVE_UI_DSL_PROPS.md`. **Conventions for new Aurora components (so JSON stays in control):** `COMPONENT_DSL_CONVENTIONS.md`.

---

## 0. Host example app

Inside this repo, **`examples/dsl-host-app/`** is a small Vite app that switches between several **full `GenUIDocument` JSON files** (dashboard, support table, marketing, API table, settings tabs). Run from package root: `npm run example:dsl-host`. It uses the same `GenUIProvider` + `GenUIRenderer` pipeline as a production host; see `examples/dsl-host-app/README.md`.

---

## 1. Pipeline

```
JSON
  → Zod (`parseGenUIDocument`)
  → optional lint (`lintGenUIDocument` / `parseAndLintGenUIDocument`)
  → `GenUIProvider` (document + `createRuntimeStore(initialState)`)
  → `GenUIRenderer` (recursive tree + expression resolution + wiring props)
  → user input / buttons
  → `runAction(actionId)` → interpreter (`SET_STATE`, `MERGE_STATE`, `API_CALL`, …)
```

---

## 2. Real-world scenarios you can implement **now**

All of these use **composition** of registry components + **global state** + **actions**. There is **no** `repeat` / `map` node: lists are **data in `state`** (arrays) passed into components as props, usually via `{{state…}}` expressions.

| Scenario | How |
|----------|-----|
| **Marketing / landing blocks** | `Container`, `Grid`, `Stack`, `Row`, `Text`, `Button`, `Link`, `Alert` |
| **Settings / profile forms** | `Stack`, `Label`, `Input`, `Textarea`, `Select`, `Checkbox`, `Switch` + `bind` + optional `onChangeAction` |
| **Multi-panel settings** | `Tabs` + `tabBind` (state path for active tab) + `TabList` / `Tab` / `TabPanel` children |
| **Browse + detail (static structure)** | `Grid` or `Stack` + `Breadcrumb` + `Link`; route changes via host `navigate` + `NAVIGATE` action |
| **Data table (client sort/filter)** | `Table` (`GenDataTable`): `columns`, `rows` from state (expressions), optional `sortKey` / `sortDir` / `filter` paths in state, `onSortAction`, `filterBind` |
| **Submit / load data** | `Button` + `onClickAction` → `API_CALL` → `onSuccess` chain → `SET_STATE` / `MERGE_STATE` to store `rows`, errors, etc. |
| **Loading UX** | `API_CALL` sets loading flags by `id`; wrap `Spinner` or message in **`ShowWhen`** + `loadingKey` **equal to that `id`** → children show **while** that request is in flight |
| **Error / success messaging** | `Alert` with `children` / title from `{{state…}}` after `SET_STATE` in `onError` / `onSuccess` |
| **Conditional blocks (boolean)** | `ShowWhen` with `when: "{{state.flags.showPanel}}"` (must resolve to boolean **or** use `loadingKey` — see §6) |
| **Custom business logic** | `CUSTOM` action → host `onCustom(name, payload)` (payments, auth, native, etc.) |
| **Multi-step flows without tabs** | Prefer **boolean state per step** (`state.step1`, …) or **string discriminator** with **separate `ShowWhen`** per value is **not** supported as equality; use **Tabs** + `tabBind` or multiple booleans |

### 2.1 `src/components` vs JSON — what “full DSL UI” means

| Question | Answer |
|----------|--------|
| **Can JSON describe both structure and design?** | **Yes** for **registered** `type`s: nested `children` define structure; `props.className`, variants, and DSL props (see `GENERATIVE_UI_DSL_PROPS.md`) define look & feel. |
| **Is every file under `src/components` usable from JSON by default?** | **No.** The **default registry** (`auroraGenUIRegistry`) is a **curated subset** (layout, forms, tabs, table, alerts, etc.). Other exports (`Card`, `Modal`, `Drawer`, `Pagination`, charts, `Chat`, …) require a **custom `registry`** passed to `GenUIRenderer` (and usually small wiring in `GenUIRenderer` for new `*Action` props if needed). |
| **Can you build “any” real app UI from JSON alone?** | **Many** dashboards, settings screens, marketing blocks, and data-heavy views — **yes**, with composition + state + actions. Patterns that need **unbounded dynamic children** from JSON (`repeat`/`map` nodes) are **not** built-in: use **arrays in `state`** passed into props like `Table`’s `rows` instead. |
| **What always stays outside pure JSON?** | **Host wiring**: `navigate`, `onCustom`, fetch policy, and any behavior not exposed as `ActionDef` or renderer props. |

So: **components are designed to be stylable and composable** (`COMPONENT_DSL_CONVENTIONS.md`); **JSON can drive a large class of real UIs** once those types are **registered** and **documented**.

---

## 3. Document shape: `GenUIDocument`

| Field | Required | Description |
|-------|----------|-------------|
| `ui` | **yes** | Root `GenUINode` |
| `state` | **yes** | Initial serializable object (global UI state) |
| `actions` | no | `actionId` → `ActionDef` |
| `bindings` | no | Named strings, resolved in order; referenced as `{{bindings.name}}` |
| `version` | no | Your tooling only |

### `GenUINode`

- `type` — registry key (see §4).
- `props` — component props; strings may include `{{…}}` (§5).
- `children` — nested nodes.
- `id` — optional React key hint.

### Styling: Tailwind and `className`

You **can** pass **Tailwind** (or any CSS module) classes from JSON:

- Add **`className`** on any node’s **`props`** with a **string** of utilities, e.g.  
  `"className": "mb-4 w-full max-w-md rounded-lg border border-gray-200 p-4 shadow-sm dark:border-gray-700"`.
- Classes are passed through `resolveDeep` like other props, so they can be **dynamic**:  
  `"className": "{{state.ui.panelClass}}"` if `state.ui.panelClass` is a string.
- Each registry component uses Aurora’s usual **`cn()`** merge, so your classes **combine** with internal styles (same as hand-written React).
- **Requirement:** your app’s Tailwind **content/safelist** must include those class names if they’re generated dynamically at build time; static strings in JSON are fine when the file is scanned.

---

## 4. Default registry (`auroraGenUIRegistry`)

Pass a **custom** `registry` to `GenUIRenderer` to extend; `lintGenUIDocument(..., { registryTypes: auroraGenUIRegistryTypes })` validates against **default** keys.

| `type` | Role |
|--------|------|
| **Layout** | `Box`, `Stack`, `Row` (horizontal `Stack`), `Grid`, `Container` |
| **Typography / chrome** | `Text` (`GenText`: `variant`: `body` \| `title` \| `muted`), `Label`, `Link`, `Breadcrumb`, `BreadcrumbItem` |
| **Form controls** | `Input`, `Textarea`, `Select` (default demo `options` in registry), `Checkbox`, `Switch` |
| **Actions** | `Button` |
| **Feedback** | `Alert`, `Spinner` (`GenSpinner`) |
| **Navigation** | `Tabs`, `TabList`, `Tab`, `TabPanel` |
| **Data** | `Table` (`GenDataTable`: sortable columns, optional filter row) |
| **Conditional** | `ShowWhen` |

Component-specific props match the underlying React components (see source under `src/components/*`). **JSON cannot pass functions**; use `bind`, `*Action`, and `tabBind` (§6).

---

## 5. Expressions (safe, no `eval`)

Resolved in strings via `resolveValue` / `resolveDeep`:

| Pattern | Result |
|---------|--------|
| `{{state.a.b}}` | Value from global state (dot path) |
| `{{event.x}}` | From the **current** `runAction` event payload (§7) |
| `{{response.x}}` | Last HTTP JSON during `API_CALL` **success/error** chains |
| `{{bindings.name}}` | From resolved `document.bindings` |

- A string that is **only** `{{…}}` keeps the **native** type (boolean, number, array, …).
- Embedded `{{…}}` in longer strings is stringified / substituted.

---

## 6. Renderer wiring props (`GenUIRenderer`)

**Text labels on leaf components** (`Button`, `Tab`, `Text`, …): put the label in **`props.children`** (a string in JSON). If the node has **no** `children` array in JSON, that string is passed through as React `children`. *(Older builds accidentally dropped it by passing `undefined` as explicit children.)*

**Optional wrapper:** pass `className` to **`GenUIRenderer`** (e.g. `max-w-3xl mx-auto p-6`) for host/preview spacing — it does not change the DSL tree.

Applied **after** `resolveDeep` on `props`. These keys are **consumed** by the renderer (not passed to the component):

| Prop | Applies to | Behavior |
|------|------------|----------|
| **`bind`** | `Input`, `Textarea`, `Select` | Two-way **string** at dot-path: `value` + `onChange` → `setState` |
| **`bind`** | `Checkbox`, `Switch` | Two-way **boolean**: `checked` + `onChange` → `setState` |
| **`tabBind`** | `Tabs` only | `value` / `onChange` bound to state path (string tab id) |
| **`onClickAction`** | e.g. `Button`, `Link` | `onClick` → `runAction(id)` — **no `event` payload** |
| **`onSortAction`** | `Table` | `onSort(column)` → `runAction(id, { column })` |
| **`onChangeAction`** | After `bind` / `tabBind` | After internal `onChange`, `runAction(id, { value }` or `{ value, checked }`) |
| **`filterBind`** | `Table` | `filter` + `onFilterChange` bound to state path (string) |
| **`loadingKey`** | `ShowWhen` | **`when` is replaced**: `true` iff `loading[loadingKey] === true` (see §8). Ignores literal `when` in props. |
| **`when`** | `ShowWhen` **without** `loadingKey` | `when` resolved then coerced with `Boolean`-like rules (`true`, `"true"`, non-zero number, etc.) |

**`onOpenChangeAction` / `onSubmitAction`:** not interpreted by `GenUIRenderer`; use `Button` + `onClickAction` or extend the registry.

---

## 7. Actions (`ActionDef`) and `event`

Registered in `actions`; referenced by string id from wiring props.

| Type | Behavior |
|------|----------|
| `SET_STATE` | `setState(path, value)` — **dot path**, immutable nested objects |
| `MERGE_STATE` | **Shallow** merge at **root** only: `state = { ...state, ...patch }` — nested objects under a key are replaced as a whole when that key appears in `patch` |
| `API_CALL` | `fetch`; optional `id` for **loading** key (defaults from url); `onSuccess` / `onError` chains get `response` |
| `NAVIGATE` | `navigate(path)` if `GenUIProvider` received `navigate` |
| `CUSTOM` | `onCustom(name, payload)` |
| `CHAIN` | Sequential inner actions |

`path`, `url`, `value`, `body`, etc. support `{{…}}` resolution.

**`runAction(id, event?)`:** `event` is set only where the renderer passes it (`onSortAction`, `onChangeAction`). **`onClickAction` does not pass `event`.**

---

## 8. Async requests & loading UI

- Each `API_CALL` toggles `loading[loadingKey]` **true** for the request and **false** in `finally` (`loadingKey` = `action.id` or derived from URL).
- **`ShowWhen`** + **`loadingKey`**: children render **while** that request is loading (same string as `API_CALL` `id`).  
- **`Spinner`**: not auto-bound; place it inside such a `ShowWhen` or always visible.

Store also exposes **`lastError`** (interpreter sets on HTTP / network failure); bind into `Alert` via state if you `SET_STATE` it in chains.

---

## 9. `Table` (`GenDataTable`)

**Full DSL-oriented prop list:** `docs/GENERATIVE_UI_DSL_PROPS.md` (includes **`tableClassName`**, **`tableWrapperClassName`**, **`filterRowClassName`**, **`sortHeaderButtonClassName`**, **`filterPlaceholder`**, etc.).

- Put **`rows`**, **`sortKey`**, **`sortDir`**, **`filter`** in **`state`** and reference them with `{{state…}}` on the node (e.g. `"rows": "{{state.table.rows}}"`).
- **`filterBind`** wires the filter string two-way to a state path (same as manual `filter` + handler).
- **`onSortAction`**: renderer passes **`runAction(id, { column: string })`**. Use **`SET_STATE`** / **`CHAIN`** as needed for **`sortKey`** / **`sortDir`**.
- **Styling:** use **`className`** and the `*ClassName` props above so AI JSON can tune layout **without** library code changes.
- The filter field stays **outside** the table scroll wrapper so borders/rings are not clipped.

---

## 10. Validation & lint

- **`parseGenUIDocument`**: Zod schema; invalid JSON shape rejected.
- **`lintGenUIDocument`**: optional **warnings** (unknown `type` vs registry set; missing `actions[id]` for `onClickAction` / `onSortAction` / `onChangeAction`); **errors** for **max tree depth** and **max node count** (`DEFAULT_GEN_LIMITS` in `genLimits.ts`).
- **`parseAndLintGenUIDocument`**: combines both; **`ok`** is false if Zod fails **or** lint has **error**-level issues.

---

## 11. Host responsibilities

| Concern | Requirement |
|---------|--------------|
| **Navigation** | Pass `navigate` to `GenUIProvider` for `NAVIGATE` |
| **Side effects** | Pass `onCustom` for `CUSTOM` |
| **`API_CALL` security** | Global `fetch` — enforce allowlist / auth in **your** backend or a future fetch wrapper; **not** sandboxed in the library |
| **Extended UI** | Merge custom entries into `registry` passed to `GenUIRenderer` |

---

## 12. Not supported (library boundaries)

| Topic | Status |
|-------|--------|
| **Dynamic lists / `repeat` / `map` over state arrays** | Not a node type; pass **array props** (`rows`, etc.) from state |
| **`Modal`, `Card`, `Pagination`, charts…** in default registry | Not registered; add via **custom registry** |
| **Deep merge** for `MERGE_STATE` | **Shallow** only |
| **`ShowWhen` value equality** (`step === 2`) | Not implemented; use booleans, **Tabs**, or separate flags |
| **Row click / selection on `Table`** | No `onRowAction` in renderer; extend `GenDataTable` + registry |
| **Sandboxed / allowlisted `fetch`** | Host or future helper |

---

## 13. Examples & playground

| File | Demonstrates |
|------|----------------|
| `docs/examples/gen-minimal.json` | Input, button, `MERGE_STATE`, `ShowWhen` + `{{state…}}` |
| `docs/examples/gen-form-tabs.json` | `Tabs` + `tabBind`, `Label`, `Input`, `Textarea`, `SET_STATE` |
| `docs/examples/gen-api-table.json` | `API_CALL` → `SET_STATE` rows from `{{response}}`, `ShowWhen` + `loadingKey`, `Table` + `filterBind` + `onSortAction` + `{{event.column}}` *(needs network: jsonplaceholder)* |

Playground: `npm run playground` → **Generative JSON DSL** → **Load …** buttons mirror these samples. The **DSL assistant** uses **`fetchGenDslChatReply`** from the library (mock by default); the playground passes **`chatApiUrl`** from **`VITE_GEN_DSL_CHAT_API_URL`** (see `playground/.env.example`) so a POST API can return `{ "reply": string }` with `context.document` set.

---

## 14. Source map

| Topic | Location |
|-------|----------|
| Types & Zod | `src/schema/genDocumentTypes.ts`, `genDocumentSchema.ts` |
| Interpreter | `src/runtime/genInterpreter.ts` |
| Store | `src/runtime/genStore.ts`, `genPaths.ts` |
| Renderer | `src/runtime/GenUIRenderer.tsx` |
| Default registry | `src/runtime/auroraGenRegistry.tsx` |
| Lint | `src/runtime/genLint.ts` |

Roadmap for **future** work: `docs/GENERATIVE_UI_PLAN.md` (Phase 3+).
