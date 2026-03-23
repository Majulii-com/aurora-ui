# Aurora UI — architecture & DSL handbook

Single reference for **@majulii/aurora-ui**: how the library is organized, how declarative UIs work (two tracks), theming, host integration, and AI-facing contracts. **JSON samples** live under [`docs/examples/`](examples/).

**Machine-readable registry for tools:** run `npm run gen:dsl-kb` and use [`dsl-kb/DSL_AI_KNOWLEDGE_BASE.md`](../dsl-kb/DSL_AI_KNOWLEDGE_BASE.md) plus [`dsl-kb/dsl-registry.snapshot.json`](../dsl-kb/dsl-registry.snapshot.json).

---

## Table of contents

1. [Vision](#1-vision)
2. [Repository & runtime layout](#2-repository--runtime-layout)
3. [Two declarative UI tracks](#3-two-declarative-ui-tracks)
4. [Theme & appearance (Aurora)](#4-theme--appearance-aurora)
5. [Track A — Generative JSON DSL (`GenUIDocument`)](#5-track-a--generative-json-dsl-genuidocument)
6. [Expressions, wiring props, actions](#6-expressions-wiring-props-actions)
7. [Async loading, tables, validation](#7-async-loading-tables-validation)
8. [Track B — Schema tree UI (`UINode` + playground)](#8-track-b--schema-tree-ui-uinode--playground)
9. [Bindings, reducer, and host apps](#9-bindings-reducer-and-host-apps)
10. [Playground action schema (builder / events)](#10-playground-action-schema-builder--events)
11. [Full-site & complex components (patterns)](#11-full-site--complex-components-patterns)
12. [Scenario coverage & AI guidance](#12-scenario-coverage--ai-guidance)
13. [Component catalog & DSL styling props](#13-component-catalog--dsl-styling-props)
14. [Conventions for new components](#14-conventions-for-new-components)
15. [Roadmap & boundaries](#15-roadmap--boundaries)
16. [Examples](#16-examples)
17. [Source map (implementation)](#17-source-map-implementation)

---

## 1. Vision

**Aurora UI** is a React component library plus **execution layers** that turn **serializable JSON** into interactive UIs so backends or LLMs can ship screens without hand-written React for every screen.

Three creation modes coexist:

1. **Manual React** — import components from `@majulii/aurora-ui`.
2. **Visual playground** — drag/drop schema tree, bindings, and events (library code in `src/runtime/playground/`).
3. **JSON / AI** — emit either **`GenUIDocument`** (Zod + Gen runtime) or **`{ schema, initialState }`** for the schema runtime.

The same **registry** idea applies everywhere: `type` string → React component + default props.

---

## 2. Repository & runtime layout

| Area | Role |
|------|------|
| **`src/components/`** | Presentational and composite UI (Button, Table, GenDataTable, …). |
| **`src/theme/`** | `ThemeProvider`, appearance (`aurora` / `plain`), CSS variable hooks. |
| **`src/runtime/core/`** | Shared primitives: path helpers (`getAtPath` / `setAtPath`), Gen path utilities, engine error reporting. No React in core. |
| **`src/runtime/gen/`** | **Generative JSON DSL**: Zod schemas, Zustand store, interpreter, expressions, lint, `GenUIProvider`, `GenUIRenderer`, default `auroraGenUIRegistry`. |
| **`src/runtime/schema-ui/`** | **`SchemaRuntime`** — legacy / builder-oriented JSON tree with `__bind` and `onAction`. |
| **`src/runtime/playground/`** | Visual schema editor: `PlaygroundProvider`, `EditableSchemaRenderer`, `defaultAppReducer`. |
| **`src/runtime/hooks/`** | e.g. `useJsonPreviewPane` for Gen DSL preview layout. |
| **`playground/`** | Demo app shell (sidebar, theme); composes library exports. |
| **`examples/dsl-host-app/`**, **`examples/dsl-ops-dashboard/`** | Runnable hosts loading full `GenUIDocument` JSON. |

**Principles:** Gen DSL code does not use `eval`; expressions are implemented in `gen/expressions.ts`. Gen imports shared path logic from `core/`.

---

## 3. Two declarative UI tracks

| | **Track A — Generative JSON DSL** | **Track B — Schema tree (`UINode`)** |
|---|-----------------------------------|--------------------------------------|
| **Document** | `GenUIDocument`: `{ ui, state, actions?, bindings?, version? }` | `UINode` tree + `initialState` / `appData` |
| **State** | Zustand via `createRuntimeStore(initialState)` | App reducer / store (`SET_PATH`, `REPLACE_STATE`) |
| **Binding** | `{{state.path}}`, `{{event.*}}`, `{{response.*}}`, `{{bindings.name}}` in strings | `{ "__bind": "path" }`, optional `__bindDir: "twoWay"`, `__eq` for equality |
| **Actions** | `ActionDef` map: `SET_STATE`, `MERGE_STATE`, `API_CALL`, `NAVIGATE`, `CUSTOM`, `CHAIN` | `onClickAction` + payload → `onAction(...)` callback |
| **Entry** | `parseGenUIDocument` → `GenUIProvider` → `GenUIRenderer` | `SchemaRuntime` or `EditableSchemaRenderer` + registry |
| **Typical use** | AI emits one doc; host passes `navigate`, `onCustom` | Builder playground, apps already on `__bind` + `SchemaRuntime` |

Use **Track A** for greenfield AI pipelines with a single validated document. Use **Track B** when you rely on playground tooling, `updateNode`, or existing `SchemaRuntime` integration.

---

## 4. Theme & appearance (Aurora)

Default visual language: **teal/cyan primary**, deep navy text, mint surfaces, amber accent — tuned for dashboards and SaaS.

### `ThemeProvider`

| Prop | Default | Description |
|------|---------|-------------|
| `appearance` | *(uncontrolled)* | `'aurora'` \| `'plain'` |
| `defaultAppearance` | `'aurora'` | Initial when uncontrolled |
| `appearanceStorageKey` | `'aurora-ui-appearance'` | `localStorage` for user choice |

Legacy `'enterprise'` in storage is **migrated to `'aurora'`**.

```tsx
import { ThemeProvider } from '@majulii/aurora-ui';

<ThemeProvider>
  <App />
</ThemeProvider>

<ThemeProvider defaultAppearance="plain">
  <App />
</ThemeProvider>
```

### APIs

- **`useAuroraAppearance()`** — `{ appearance, setAppearance, isAurora }` (deprecated alias `isEnterprise` = `isAurora`).
- **`useAuroraSurface(plain?)`** — class tokens for surfaces (prefer over deprecated `useEnterpriseSurface`).
- **`applyAppearanceVariables(mode)`** — sets CSS variables on `document.documentElement`; advanced / tests.

`data-aurora-appearance` is set for debugging.

### Per-component `plain`

Many components extend **`AuroraSurfaceProps`**: optional **`plain`** opts that instance out of Aurora-only chrome while global appearance stays `aurora`. Use for dense tables or embedded widgets.

### CSS variables

Defined in `src/styles.css` and updated by `applyAppearanceVariables`: radii (`--aurora-radius-*`), shadows (`--aurora-shadow-*`). Override after importing `@majulii/aurora-ui/styles.css` for brand tuning.

### Tables & DSL preview

**`Table`** uses Aurora styling when appearance is `aurora`; **`skipOuterChrome`** avoids double cards when a parent already wrapped the table. **`GenDataTable`** uses **`tableSurface`** and passes **`skipOuterChrome`** to **`Table`**.

---

## 5. Track A — Generative JSON DSL (`GenUIDocument`)

### Pipeline

```
JSON
  → Zod (parseGenUIDocument)
  → optional lint (lintGenUIDocument / parseAndLintGenUIDocument)
  → GenUIProvider (document + createRuntimeStore(initialState))
  → GenUIRenderer (tree + expressions + wiring)
  → user input
  → runAction(actionId) → interpreter (SET_STATE, MERGE_STATE, API_CALL, …)
```

### Document shape

| Field | Required | Description |
|-------|----------|-------------|
| `ui` | **yes** | Root `GenUINode` |
| `state` | **yes** | Initial serializable global state |
| `actions` | no | `actionId` → `ActionDef` |
| `bindings` | no | Named strings; `{{bindings.name}}` |
| `version` | no | Tooling only |

### `GenUINode`

- **`type`** — registry key.
- **`props`** — may contain `{{…}}` expressions.
- **`children`** — nested nodes.
- **`id`** — optional React key hint.

### Styling from JSON

Pass **`className`** (Tailwind or arbitrary utilities) on **`props`**. Resolved via `resolveDeep`; can be dynamic (`"{{state.ui.panelClass}}"`). Ensure your Tailwind **content** sees dynamic classes if needed.

### Default registry (overview)

Pass a **custom `registry`** to `GenUIRenderer` to merge or override. **`lintGenUIDocument(..., { registryTypes: auroraGenUIRegistryTypes })`** validates `type` keys against the default set.

**Composition:** Any registered `type` can nest under containers. **`Fragment`** groups without a DOM node. If both **`props.children`** (string/number) and **`children`** exist, the renderer **merges** (text first, then nodes).

**Authoritative list:** `src/runtime/gen/auroraGenRegistry.tsx` (`auroraGenUIRegistry` / `auroraGenUIRegistryTypes`).

Illustrative groups: layout (`Box`, `Stack`, `Grid`, `Container`, `Page`, `SplitPane`), typography/chrome, `Card` parts, forms, actions (`Button`, `Icon`, `IconButton`), feedback, overlays (`Modal`, `Drawer`, `Tooltip`, `Dropdown`, `Popover`), navigation (`Tabs`, …), data (`Table` / `GenDataTable`, `TreeTable`, `TreeView`), charts, media, **`ShowWhen`**.

**Document-level `onMountAction`:** optional on the root document; `GenUIProvider` runs `runAction(id)` once after mount (again if the id **string** changes). No event payload.

### Runnable host examples (repo)

| Command | Shows |
|---------|--------|
| `npm run example:dsl-host` | Multi-page `GenUIDocument` samples (`examples/dsl-host-app/`) |
| `npm run example:ops-dashboard` | Large composite dashboard (`examples/dsl-ops-dashboard/`) |

---

## 6. Expressions, wiring props, actions

### Expressions (no `eval`)

| Pattern | Result |
|---------|--------|
| `{{state.a.b}}` | Value from global state (dot path) |
| `{{event.x}}` | Current `runAction` event payload |
| `{{response.x}}` | Last HTTP JSON in `API_CALL` success/error chains |
| `{{bindings.name}}` | From `document.bindings` |

A string that is **only** `{{…}}` keeps **native** type (boolean, number, array). Embedded templates in longer strings are stringified/substituted.

### Renderer wiring (`GenUIRenderer`)

Consumed **after** `resolveDeep` (not passed raw to components):

| Prop | Targets | Behavior |
|------|---------|----------|
| `bind` | `Input`, `Textarea`, `Select` | Two-way **string** at path |
| `bind` | `MultiSelect` | Two-way **`string[]`** |
| `bind` | `Checkbox`, `Switch` | Two-way **boolean** |
| `tabBind` | `Tabs` | Active tab id at path |
| `onClickAction` | `Button`, `Link`, … | `runAction(id)` — **no** event payload on click |
| `onSortAction` | `Table` | `runAction(id, { column })` |
| `onChangeAction` | After bind/tabBind | `runAction(id, { value }` or `{ value, checked }`) |
| `filterBind` / `columnFiltersBind` | `Table` | Filter string / per-column filters map |
| `onCloseAction` | `Modal`, `Drawer` | After close |
| `onPageChangeAction` | `Pagination` | `runAction(id, { page })` |
| `loadingKey` | `ShowWhen` | Replaces `when`: true iff `loading[loadingKey] === true` |
| `when` | `ShowWhen` without `loadingKey` | Resolved then coerced to boolean |

**Leaf labels:** prefer **`props.children`** as string; merged with `children` array when both exist.

### `ActionDef` types

| Type | Behavior |
|------|----------|
| `SET_STATE` | Immutable set at dot path |
| `MERGE_STATE` | **Shallow** merge at root only |
| `API_CALL` | `fetch`; optional `id` for **loading**; `onSuccess` / `onError` chains |
| `NAVIGATE` | Host `navigate` from `GenUIProvider` |
| `CUSTOM` | `onCustom(name, payload)` |
| `CHAIN` | Sequential inner actions |

`path`, `url`, `value`, `body`, etc. support `{{…}}`. **`runAction(id, event?)`** — `event` only where the renderer passes it (`onSortAction`, `onChangeAction`, `onPageChangeAction`); **not** for plain `onClickAction`.

### Host responsibilities (Track A)

| Concern | Requirement |
|---------|--------------|
| Navigation | Pass `navigate` for `NAVIGATE` |
| Side effects | Pass `onCustom` for `CUSTOM` |
| `API_CALL` | Your `fetch` / auth / allowlist — **not** sandboxed in-library |
| Extra UI | Merge **custom `registry`** |

---

## 7. Async loading, tables, validation

- **`API_CALL`** sets `loading[id]` true/false around the request.
- **`ShowWhen` + `loadingKey`** shows children **while** that request is in flight (match `API_CALL` `id`).
- **`Spinner`** is manual — place inside `ShowWhen` or always visible.
- Store exposes **`lastError`**; surface via `SET_STATE` in chains if needed.

**`Table` (`GenDataTable`):** put `rows`, `sortKey`, `sortDir`, `filter` in **state**; reference with `{{state…}}` or use `filterBind` / `onSortAction` + `SET_STATE` / `CHAIN`. Styling knobs: `className`, `tableClassName`, `tableWrapperClassName`, `filterRowClassName`, `sortHeaderButtonClassName`, `filterPlaceholder`, etc. (full table in [§13](#13-component-catalog--dsl-styling-props)).

### Validation & lint

- **`parseGenUIDocument`**: Zod — invalid shape rejected.
- **`lintGenUIDocument`**: unknown `type`; missing `actions[id]` for wired props; **max depth** and **max node count** (`DEFAULT_GEN_LIMITS`).
- **`parseAndLintGenUIDocument`**: `ok` false if Zod fails or lint has **errors**.

### Playground (Gen mode)

`npm run playground` → **Generative JSON DSL** — paste JSON, see Zod + lint + preview. Optional assistant: **`VITE_GEN_DSL_CHAT_API_URL`** + `fetchGenDslChatReply`.

---

## 8. Track B — Schema tree UI (`UINode` + playground)

### Roles (host)

| Piece | Owner | Purpose |
|-------|--------|---------|
| UI definition (`schema` + `initialState`) | AI / backend | Serializable tree + initial data |
| State (`appData`) | Your app | Single source of truth |
| Registry | Your app | `type` → component |
| Actions | Your app | `onAction` handles clicks / side effects |
| Rendering | Library | `SchemaRuntime` or binding layer |

**Exports:** `SchemaRuntime`, `getAtPath`, `setAtPath`, `resolveBindings`, `collectTwoWayBindings`, `injectStateHandlers`, `STATE_HANDLER_NAMES`, types `UINode` / `UIRegistry`, components.

### Playground lives in the library

The **visual** playground (DnD canvas, `appData`, routes, events) is implemented **inside** `@majulii/aurora-ui`. The **`playground/`** app only composes layout and passes **`uiRegistry`** + **`EditableSchemaRenderer`**.

| Export | Role |
|--------|------|
| `PlaygroundProvider` / `usePlayground` | Schema tree, `appData`, routes, selection, events |
| `EditableSchemaRenderer` | Renders `UINode` with `__bind`, two-way handlers, DnD |
| `SCHEMA_PLAYGROUND_DRAG_ADD_TYPE` / `…_MOVE_TYPE` | Palette / reorder MIME types |
| `defaultAppReducer` / `INITIAL_APP_STATE` | `SET_PATH` / `REPLACE_STATE` |
| `fetchGenDslChatReply` | Optional Gen DSL assistant |
| `useJsonPreviewPane` | Resizable JSON vs preview |

Bindings use the same path helpers as **`SchemaRuntime`**.

### Playground-driven composition (vision)

The playground must produce a **single serializable UI schema object** as the user drags and configures components — same format AI would emit, enabling **visual build** and **AI generation** to converge on one representation.

---

## 9. Bindings, reducer, and host apps

### Data flow (schema track)

1. Load `{ schema, initialState }` → hydrate `appData`.
2. Render `SchemaRuntime` (or equivalent) with `schema`, `registry`, `appData`, `setData`, `onAction`.
3. Runtime resolves `__bind`, injects two-way handlers → `setData` / dispatch.
4. Clicks with `onClickAction` → `onAction(nodeId, componentType, eventName, action, message?, payload?)`.

### `setData` vs reducer

| Imperative | Reducer-style |
|------------|----------------|
| `setData(path, value)` | `dispatch({ type: 'SET_PATH', payload: { path, value } })` |
| `setAppData(full)` | `dispatch({ type: 'REPLACE_STATE', payload: fullState })` |

**`defaultAppReducer`** implements `SET_PATH` via `setAtPath` and `REPLACE_STATE`. Playground uses this pattern; production apps can use Redux/Zustand with the same path updates.

### `onAction` branches (typical)

- **`setData`** → `setData(payload.path, payload.value)`.
- **`navigate`** → router `navigate(payload.path)`.
- **`toast` / `alert` / `log`** → feedback layer.
- **`sequence`** → run steps in order.
- **`updateNode`** → merge props into a node (builder / dynamic labels).
- **Custom** → your handlers with `{ appData, setData, navigate }`.

### Multi-route

Keep `routes: Record<string, UINode>`; current path selects schema; **`navigate`** action updates the router; **one** `appData` and **one** `onAction`.

### Integrating in a host (sketch)

```tsx
import { SchemaRuntime } from '@majulii/aurora-ui';
import { registry } from './registry';

function App() {
  const { schema, appData, setData } = useAppStore();
  const handleAction = useCallback((nodeId, componentType, eventName, action, message, payload) => {
    if (action === 'setData' && payload?.path != null) setData(payload.path, payload.value);
    else if (action === 'navigate' && payload?.path) navigate(payload.path);
    // … toast, sequence, custom
  }, [setData, navigate]);

  return (
    <SchemaRuntime
      schema={schema}
      registry={registry}
      appData={appData}
      setData={setData}
      onAction={handleAction}
    />
  );
}
```

See **`examples/dsl-host-app/`** for **Track A**; schema hosts mirror this pattern with `SchemaRuntime`.

---

## 10. Playground action schema (builder / events)

Serializable **click** actions on nodes (no functions in JSON):

| Prop | Purpose |
|------|---------|
| `onClickAction` | `'log'` \| `'toast'` \| `'alert'` \| `'updateNode'` \| `'sequence'` (playground) |
| `onClickMessage` | For `log` / `toast` / `alert` |
| `onClickPayload` | For `updateNode` / `sequence` |

**`updateNode`:** `{ nodeId, props }` merges into target node.

**`sequence`:** `{ steps: [{ action, message?, payload? }] }`.

**Production-oriented actions** (same schema idea; implement in host):

| Action | Payload | Purpose |
|--------|---------|---------|
| `navigate` | `{ path }` | Router |
| `submit` | `{ formId?, api?, method? }` | Forms / APIs |
| `fetch` | `{ key, url, targetPath }` | Load data → state path |
| `setData` | `{ path, value }` | Write app data |

Use **stable `id`** on nodes for `updateNode` targeting.

---

## 11. Full-site & complex components (patterns)

### Site schema (conceptual)

```ts
interface SiteSchema {
  layout?: UINode;
  routes: Record<string, UINode>;
  defaultRoute?: string;
}
```

URL → route key → page `UINode`; **`navigate`** action switches routes; **data context** feeds `__bind`.

### Complex components (generic rule)

- **Config** → schema `props` (static or `__bind` for read-only lists).
- **Interactive state** → **data paths** (`table.page`, `table.sort`, …).
- **Callbacks** → **not** in JSON; runtime **injects** handlers that call `setData` / `fetch`.

Optional shorthand: **`stateBindings`** grouping paths for one widget. See **advanced table** pattern in historical docs: columns in props; page/sort/filter/search at bound paths; runtime injects `onPageChange`, `onSort`, etc.

### Server sync

After `setData` on page/sort/filter, dispatch **`fetch`** or custom handler to refresh `rows` — logic in **host**, not duplicated per component type in the schema.

---

## 12. Scenario coverage & AI guidance

**Principle:** scenarios differ only by **state shape**, **schema tree**, and **action payloads** — not by a separate runtime mode.

| Category | State examples | Patterns |
|----------|----------------|----------|
| Visibility / overlays | `ui.modalOpen`, `ui.activeTab` | `ShowWhen`, Modal `isOpen` bind, Tabs |
| Forms | `form.*`, `form.errors` | Two-way `__bind`, submit custom action |
| Data tables | `table.page`, `table.sort`, `table.rows` | Table + Pagination + optional fetch |
| Navigation | routes + `wizard.step` | `navigate`, `setData` for steps |
| Feedback | `ui.loading`, `form.error` | `ShowWhen`, toast/alert actions |
| CRUD / wizard / dashboard / e‑commerce / auth | Composed paths | Same primitives + custom actions |

**AI output checklist (schema track):**

1. **Initial state** JSON.
2. **Schema** with `__bind` reads and `onClickAction: "setData"` / `sequence` / `navigate` / custom.
3. Stable **`id`** for `updateNode` targets.
4. **Registered** `type` names only.

**AI output checklist (Gen track):**

1. Valid **`GenUIDocument`** (`ui`, `state`, optional `actions`, `bindings`).
2. **Actions** referenced by wiring props must exist in `actions`.
3. Use **composition** + **state arrays** for lists (no `repeat` node).

**Track A vs Track B caveats**

- Gen: **`ShowWhen`** value equality (`step === 2`) is **not** first-class — use booleans, **Tabs**, or flags (see [§15](#15-roadmap--boundaries)).
- Gen: **`MERGE_STATE`** is **shallow** only.
- Schema: **`when: { "__bind": "wizard.step", "__eq": 1 }`** for equality visibility (where supported by resolver).

---

## 13. Component catalog & DSL styling props

### High-level catalog

**Forms & picking:** Input, Textarea, Select, MultiSelect, Checkbox, Radio, Switch, Slider, Label.

**Data:** Table, **GenDataTable** (filters, sort, column filters), TreeTable, Pagination.

**Navigation & structure:** Tabs, Accordion, Breadcrumb, Dropdown, Drawer, Modal, Tooltip, Popover, SplitPane, TreeView.

**Feedback & media:** Alert, Badge, Avatar, Spinner, Progress, Skeleton, EmptyState, Image, Icon, IconButton, BarChart, LineChart, PieChart, StatCard, Chat suite.

**Generative / DSL:** **GenText**, **GenSpinner**, **GenDataTable** — wired through **`GenUIRenderer`** and **`auroraGenUIRegistry`**.

### Generative `type` — styling props (summary)

**Universal:** `className`, `style` where forwarded; `{{state…}}` / `{{bindings…}}` in strings.

| Group | Types | Notes |
|-------|-------|------|
| Layout | `Fragment`, `Box`, `Stack`, `Row`, `Grid`, `Container`, `Page`, `SplitPane` | `SplitPane` expects **two** children |
| Typography | `Text`, `Label`, `Link`, `Breadcrumb`, … | `Text`: `variant` (`body` \| `title` \| `muted`) |
| Forms | `Input`, `Textarea`, `Select`, `MultiSelect`, `Checkbox`, `Switch`, `Button` | `bind`, `onChangeAction` where applicable |
| Table | `GenDataTable` | `filterClassName`, `filterRowClassName`, `tableClassName`, `tableWrapperClassName`, `sortHeaderButtonClassName`, `columnFiltersBind`, `columnFilterClassName`, … |
| Conditional | `ShowWhen` | `when`, `loadingKey`, `className` wrapper |

Full per-field tables were merged from the former **GENERATIVE_UI_DSL_PROPS** doc; when in doubt, read **`src/components/*`** and **`auroraGenRegistry.tsx`**.

---

## 14. Conventions for new components

| Rule | Why |
|------|-----|
| Root **`className` + `style`** via `HTMLAttributes` + `cn()` | JSON can style without code changes |
| Forward **`…rest`** to root where safe | `id`, `data-*`, `aria-*` |
| **Variants** as typed props | Stable DSL |
| Composite: **`*ClassName`** / **`*Props`** for inner nodes | When one `className` is not enough |
| Register in **`auroraGenUIRegistry`** | So `type` appears in Gen JSON |

**`Gen*` prefix:** runtime wrappers that add bindings/actions (**GenText**, **GenDataTable**, **GenSpinner**) — keep thin and delegate to primitives.

**Docs / codegen workflow:** after registry changes, run **`npm run gen:dsl-kb`** and adjust **dsl-kb** consumers.

---

## 15. Roadmap & boundaries

### Delivered (Gen stack)

Contract (`GenUIDocument`), lint, Zustand store, interpreter actions, expressions, `GenUIRenderer`, default registry, playground Gen mode, tests for lint (see `genLint.test.ts`).

### Explicitly out of scope

LLM prompts/RAG in-package; arbitrary code in JSON — use **`CUSTOM`** + host.

### Future (not promised)

- Injectable **`fetch`** (allowlist, auth) for `API_CALL`.
- Optional **`event`** on `onClickAction`.
- **`AbortController`** for `API_CALL`.
- **`repeat` / map** node or documented array templates.
- Deeper **Pagination** + table integration patterns.
- **`ShowWhen`** equality DSL in Gen.
- More interpreter tests; JSON Schema export for tools.

### Gen “not supported / check before use”

| Topic | Note |
|-------|------|
| **`repeat` as a node** | Use **array props** from state (`rows`, etc.) |
| **Deep `MERGE_STATE`** | Shallow only |
| **Sandboxed fetch** | Host responsibility |
| **Row click on Table** | Extend `GenDataTable` + registry if needed |

**Canonical behavior for Gen** is defined by **source** (`genDocumentSchema`, `GenUIRenderer`, `genInterpreter`); when docs and code disagree, **trust code** and update this handbook.

---

## 16. Examples

| File | Demonstrates |
|------|----------------|
| [`examples/gen-minimal.json`](examples/gen-minimal.json) | Input, button, `MERGE_STATE`, `ShowWhen` |
| [`examples/gen-form-tabs.json`](examples/gen-form-tabs.json) | `Tabs` + `tabBind`, form fields, `SET_STATE` |
| [`examples/gen-api-table.json`](examples/gen-api-table.json) | `API_CALL`, `ShowWhen` + `loadingKey`, `Table` + sort/filter (needs network) |

---

## 17. Source map (implementation)

| Topic | Location |
|-------|----------|
| Gen types & Zod | `src/schema/genDocumentTypes.ts`, `genDocumentSchema.ts` |
| Interpreter | `src/runtime/gen/genInterpreter.ts` |
| Store | `src/runtime/gen/genStore.ts`, `src/runtime/core/genPaths.ts` |
| Renderer | `src/runtime/gen/GenUIRenderer.tsx` |
| Default registry | `src/runtime/gen/auroraGenRegistry.tsx` |
| Lint | `src/runtime/gen/genLint.ts` |
| Schema runtime | `src/runtime/schema-ui/SchemaRuntime.tsx` |
| Playground | `src/runtime/playground/` |
| Reducer | `src/runtime/playground/appReducer.ts` |

---

*This handbook subsumes the former standalone guides under `docs/` (theme, host integration, generative UI, schema playground, actions, reducer, architecture, scenarios, platform capabilities, component catalog, conventions, and playground composition spec).*
