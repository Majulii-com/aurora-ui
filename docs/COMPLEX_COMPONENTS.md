# Handling complex components and real-world scenarios

This doc describes a **generic** way to support **any** complicated component or scenario in the UI-schema approach—advanced tables (pagination, filter, search, sort), charts, editors, wizards, maps, etc.—without changing the schema format or inventing a new pattern per component.

---

## 1. The challenge

Complex components have:

- **Rich configuration** (columns, features, options)
- **Interactive state** (current page, sort column/direction, filter values, search query, selection)
- **Many callbacks** (onPageChange, onSort, onFilter, onSearch, onRowClick, …)

We can’t put functions in the schema. We also don’t want a new schema shape for every component type. So we need **one pattern** that works for tables, charts, and anything else.

---

## 2. Generic principle: config in schema, state in data

- **Schema** = **what** the component is and **how** it’s configured (structure, options, which features are on). All of this is static or data-bound.
- **Data context** = **where** the component’s **interactive state** lives (current page, sort, filter, search, selection, etc.).
- **Runtime** = resolves `__bind` from the data context and **injects handlers** that update that state (e.g. call `setData(path, value)`) when the user interacts.

So:

- **Config** → in node `props` (literals or `__bind` for read-only data like “list of columns” or “data source”).
- **State** → at **data paths** (e.g. `table.page`, `table.sort`, `table.filter`, `table.search`). Schema only references these paths; the actual values live in the data context.
- **Callbacks** → not in the schema. The runtime, for known “stateful” prop names (or a convention), injects handlers that perform **setData(path, newValue)** or **fetch** then setData.

This keeps the schema **declarative and serializable** while supporting any level of complexity.

---

## 3. Convention: state bindings

For components with rich interactive state, use a **state bindings** contract:

- The component (or the runtime) expects certain props to be **binding paths** for state.
- **Reading**: at render time, the runtime replaces those props with values from the data context (same as `__bind`).
- **Writing**: the runtime injects handlers (e.g. `onPageChange`, `onSort`) that call the **setData** action with the same path and the new value.

So the schema only says: “this table’s page state is at `table.page`, sort at `table.sort`, filter at `table.filter`, search at `table.search`.” The runtime does the rest.

**Optional shorthand:** a single prop that groups all state paths for that component, e.g. `stateBindings: { page: "table.page", sort: "table.sort", filter: "table.filter", search: "table.search" }`. The runtime expands this into individual props + injected handlers.

---

## 4. Example: advanced table (pagination, filter, search, sort)

### Data context shape (example)

Your app holds the table’s state in the data context, e.g.:

```ts
{
  table: {
    page: 1,
    pageSize: 10,
    sort: { columnId: "name", direction: "asc" },
    filter: { status: "active", role: "" },
    search: "",
    rows: [ /* from API or static */ ],
    totalCount: 42
  }
}
```

You don’t have to use these exact keys; any path structure works as long as the schema and the runtime agree.

### Schema (declarative)

The schema describes the table and **binds** its config and state to paths. No callbacks.

```json
{
  "type": "AdvancedTable",
  "props": {
    "columns": [
      { "id": "name", "label": "Name", "sortable": true },
      { "id": "email", "label": "Email", "sortable": true },
      { "id": "status", "label": "Status", "filterable": true }
    ],
    "features": {
      "pagination": true,
      "search": true,
      "sort": true,
      "filter": true
    },
    "page": { "__bind": "table.page" },
    "pageSize": { "__bind": "table.pageSize" },
    "sort": { "__bind": "table.sort" },
    "filter": { "__bind": "table.filter" },
    "search": { "__bind": "table.search" },
    "rows": { "__bind": "table.rows" },
    "totalCount": { "__bind": "table.totalCount" }
  },
  "children": []
}
```

Optional: use a single **stateBindings** object and let the runtime expand it (see above).

### What the runtime does

1. **Resolve bindings**: Replace every `{ "__bind": "table.xxx" }` with the value at that path in the data context.
2. **Inject handlers**: For known “state” props (`page`, `sort`, `filter`, `search`, `pageSize`), add `onPageChange`, `onSort`, `onFilter`, `onSearch`, `onPageSizeChange` that call:
   - `dispatch("setData", { path: "table.page", value: newPage })`,
   - `dispatch("setData", { path: "table.sort", value: newSort })`,
   - etc.
3. **Optional**: When state changes, run a **fetch** (e.g. action `fetch` with `targetPath: "table.rows"`) so the table data stays in sync with server. That can be triggered by the same handlers or by a small middleware that reacts to `table.page` / `table.sort` / etc. changes.

The **AdvancedTable** component itself is a normal React component: it receives `page`, `sort`, `filter`, `search`, `rows`, `totalCount` as props and `onPageChange`, `onSort`, `onFilter`, `onSearch` as callbacks. It doesn’t care whether those came from schema + runtime or from a hand-written parent.

---

## 5. Same pattern for any complex scenario

The approach is the same for **any** complex component or flow:

| Scenario | Config in schema | State in data (examples) | Injected behavior |
|----------|-------------------|---------------------------|-------------------|
| **Advanced table** | columns, features, pageSize default | page, sort, filter, search, rows, totalCount | setData on page/sort/filter/search; optional fetch |
| **Chart** | type, axes, colors | selectedRange, drillDown, tooltipData | setData on selection / drill-down |
| **Rich text editor** | toolbar options, placeholder | content, selection | setData on content change |
| **Wizard / stepper** | steps config | currentStep, stepData | setData on next/back; optional submit at end |
| **Map** | layers, initial view | center, zoom, selectedId | setData on pan/zoom/select |
| **Kanban** | columns config | order, statusMap | setData on drag; optional fetch |

Rules of thumb:

- **Structure and options** → in `props` (possibly with `__bind` for read-only data).
- **Anything that changes when the user interacts** → at a **data path**; schema only references it via `__bind`.
- **Handlers** → **never** in the schema; the runtime injects them and maps them to **setData** (and optionally **fetch** or other actions).

This keeps the schema **generic** and **stable**; new complex components just need a component implementation and, if you use it, a small runtime rule (“for this type, these props are state bindings”).

---

## 6. Optional: server sync (fetch on state change)

For tables (and similar), changing page/sort/filter/search often should refetch data. You can:

- **In the handler**: after `setData("table.page", newPage)`, dispatch a **fetch** action that loads data and writes to `table.rows` and `table.totalCount`, or
- **In the runtime**: when a path under `table.*` changes, run a configured **fetch** (e.g. from a small “data flow” config keyed by path).

Either way, the **schema still only declares bindings**; the “when state changes, refetch” logic lives in the runtime or in action handlers, not in the schema.

---

## 7. Summary

- **Complex components** = **config in schema** + **state in data context** + **runtime-injected handlers** that call **setData** (and optionally **fetch**).
- **State bindings** = props whose values are `__bind` paths; the runtime resolves them and injects the corresponding “write” handlers. Same idea as two-way binding, but explicit and applicable to any prop.
- **One pattern** for tables, charts, editors, wizards, maps, and any future complex scenario: no new schema format, only new component types and, if needed, new runtime rules for which props are “state” for that type.
- This is how you **tackle real-life complexity** while keeping the UI schema **declarative, serializable, and AI-friendly**.
