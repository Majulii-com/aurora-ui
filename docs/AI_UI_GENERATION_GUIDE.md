# AI UI Generation Guide: Complex UIs and User Interactions

This guide explains how **AI (or humans)** can generate **complex, interactive UIs** from Aurora UI components—including **all possible real-life scenarios**: dashboards, e‑commerce, admin panels, forms, wizards, data tables, CRUD, auth, settings, and any combination. The runtime uses a **reducer + store**: state is the single source of truth, and **only actions** update state so the UI always reflects the store. **Any real-life complex platform** can be built on the fly from a single **UI definition** (schema + initial state + actions).

For a catalog of real-life scenarios and how each maps to state + schema + actions, see **`REAL_LIFE_SCENARIOS.md`**.

---

## 1. Reducer + store (how state and UI stay in sync)

- **Store** = one app state object (e.g. `{ ui: { showTable: false }, modal: { open: false } }`). All data-driven UI reads from this.
- **Reducer** = single function `(state, action) => newState`. Only the reducer can change state.
- **Actions** = serializable objects `{ type, payload }`. Examples: `SET_PATH` (set one path in state), `REPLACE_STATE` (replace entire state).
- **Dispatch** = when the user does something (click, type), the runtime **dispatches** an action → reducer runs → state updates → UI re-renders from new state.

So: **state** drives what the user sees; **schema** describes which components to show and where they bind to state; **actions** (triggered by clicks, etc.) update state through the reducer. No ad-hoc setState—everything goes through the store.

See **`REDUCER_STORE_ARCHITECTURE.md`** for the full plan and data flow.

---

## 2. Schema format (UI tree)

Each node in the UI tree has:

| Field     | Type   | Description |
|----------|--------|-------------|
| `type`   | string | Component type (see §3). Must exist in registry. |
| `id`     | string | Optional. Required if the node is the target of `updateNode` or for stable bindings. |
| `props`  | object | Component props. Can include `__bind`, `onClickAction`, etc. |
| `children` | array | Child nodes. Use `[]` or omit. |

Example:

```json
{
  "type": "Page",
  "id": "root",
  "props": {},
  "children": [
    {
      "type": "Stack",
      "props": { "gap": 4 },
      "children": [
        { "type": "Button", "props": { "children": "Show table" }, "children": [] },
        { "type": "ShowWhen", "props": { "when": { "__bind": "ui.showTable" } }, "children": [
          { "type": "Table", "children": [] }
        ]}
      ]
    }
  ]
}
```

---

## 3. Available component types (full coverage for real-world UIs)

**Layout:** `Page`, `Box`, `Stack`, `Grid`, `Container`, `ShowWhen`, `Divider`, `SplitPane`  
**Forms & input:** `Button`, `Input`, `Textarea`, `Checkbox`, `Radio`, `Select`, `Switch`, `Slider`, `Label`, `IconButton`  
**Overlay & feedback:** `Modal`, `Drawer`, `Tooltip`, `Dropdown`, `DropdownItem`, `Popover`, `Alert`, `Spinner`, `Progress`, `Skeleton`  
**Data display:** `Card`, `CardHeader`, `CardBody`, `CardFooter`, `Table`, `TableHead`, `TableBody`, `TableRow`, `TableHeaderCell`, `TableCell`, `Badge`, `Avatar`, `Image`, `Pagination`, `EmptyState`  
**Analytics & charts:** `StatCard`, `BarChart`, `LineChart`, `PieChart`  
**Navigation:** `Tabs`, `TabList`, `Tab`, `TabPanel`, `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`, `Breadcrumb`, `BreadcrumbItem`, `Link`, `TreeView`  
**Typography & code:** `Code`, `CodeBlock`, `Kbd`, `Icon`  
**Chat / AI assist:** `Chat`, `ChatHeader`, `ChatMessages`, `ChatMessage`, `ChatInput`, `ChatOptionCard`, `ChatSuggestions`, `ChatWelcome`

Use **ShowWhen** with `when: { "__bind": "path" }` to show/hide blocks based on store state (e.g. button sets path to `true` → table appears). For **wizard/stepper** (show content when a path equals a value), use **equality binding**: `when: { "__bind": "wizard.step", "__eq": 1 }` — the runtime resolves this to `true` only when `state.wizard.step === 1`.

---

## 4. Binding UI to the store (__bind)

- **Reading:** In any prop use `{ "__bind": "path.to.key" }`. At runtime this is replaced by the value at that path in the **store** (app state).
- **Writing:** Two-way bindings use `{ "__bind": "path", "__bindDir": "twoWay" }`. The runtime injects handlers that **dispatch** `SET_PATH` so the store updates and the UI re-renders.

So the **reducer** is what actually updates state; bindings just dispatch the right actions (e.g. SET_PATH) and read from the store.

---

## 5. User interactions (actions from the schema)

Components can trigger actions (e.g. on click). The runtime maps these to **dispatch**:

| Schema | Effect |
|--------|--------|
| `onClickAction: "setData"`, `onClickPayload: { path, value }` | Dispatches `{ type: "SET_PATH", payload: { path, value } }` → reducer updates store → UI updates. |
| `onClickAction: "updateNode"`, payload `{ nodeId, props }` | Updates a schema node’s props (builder feature). |
| `onClickAction: "sequence"`, payload `{ steps: [...] }` | Runs multiple actions in order (each step can be setData, toast, etc.). |
| `onClickAction: "toast"` / `"alert"` / `"log"` | Side effects only; no store change. |
| `onClickAction: "navigate"`, payload `{ path }` | Changes route when using routes. |

So: **any interaction** that should change what’s on screen is expressed as **store updates** (SET_PATH) or schema updates (updateNode); the reducer is the single place that applies state changes.

---

## 6. What AI should output

So that **AI can come up with any UI and the user can do anything**:

1. **Initial state** (JSON for the store): e.g. `{ "ui": { "showTable": false }, "modal": { "open": false } }`.
2. **Schema** (JSON): Tree of components. Use `__bind` to **read** from state paths; use `onClickAction: "setData"` (and payload `{ path, value }`) to **update** state via the reducer.
3. **No custom code:** The default reducer handles `SET_PATH` and `REPLACE_STATE`; AI only needs to emit schema + initial state + action payloads. Optionally, the runtime can accept a **custom reducer** for domain actions (see REDUCER_STORE_ARCHITECTURE.md) and **Load UI definition** in the playground (Data panel: paste `{ "schema": {...}, "initialState": {...} }` and click Load definition) to apply both at once.

Example: “Button click shows table”

- Initial state: `{ "ui": { "showTable": false } }`.
- Button: `onClickAction: "setData"`, `onClickPayload: { "path": "ui.showTable", "value": true }`.
- ShowWhen: `when: { "__bind": "ui.showTable" }`, children = Table.
- Flow: Click → dispatch SET_PATH → reducer sets `ui.showTable` to true → re-render → ShowWhen gets `when: true` → table is visible.

---

## 7. Checklist for AI-generated UI

1. Define **initial state** shape and values (visibility, form, modals, tables, wizard step, auth, etc.)—see **REAL_LIFE_SCENARIOS.md** for patterns.
2. Build **schema** from available component types; use **ShowWhen** + __bind for conditional visibility and empty/error states.
3. Use **__bind** for any prop that should read from the store; use **__bindDir: "twoWay"** for inputs and controlled components (Modal isOpen, Tabs value, etc.).
4. For clicks that change UI or data, use **onClickAction: "setData"** and **onClickPayload: { path, value }** so the reducer updates the store.
5. Give stable **id**s to nodes that need to be targeted by **updateNode** (e.g. dynamic labels).
6. For server/API or domain logic (submit, fetch, login, addToCart), use **onClickAction: "__custom"** and **onClickCustomAction** + payload; register a handler that reads the store and dispatches setData/updateNode/navigate as needed.

**All real-life scenarios** (forms, tables, modals, wizards, dashboards, e‑commerce, auth, settings, CRUD, multi-step, etc.) are covered by this same definition. See **REAL_LIFE_SCENARIOS.md** for the full scenario catalog.

Related: **REAL_LIFE_SCENARIOS.md**, **ACTION_SCHEMA.md**, **COMPLEX_COMPONENTS.md**, **REDUCER_STORE_ARCHITECTURE.md**, **PLATFORM_CAPABILITIES.md**.
