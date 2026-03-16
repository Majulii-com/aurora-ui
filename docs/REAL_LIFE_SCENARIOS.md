# Real-life scenarios: any complex platform from UI definition

This document shows how **every real-life UI scenario** is expressible with the same **UI definition**: **schema** (component tree + bindings + actions) + **initial state** (store) + **reducer**. So AI can generate **any complex platform on the fly**—dashboards, e‑commerce, admin panels, forms, wizards, data apps, settings, auth flows—without changing the runtime.

**Principle:** Any scenario = **state paths** (what the user sees and what they can change) + **schema** (which components, bound to those paths) + **actions** (clicks/events that dispatch SET_PATH or custom actions). No scenario requires a different “mode”; you only add state, nodes, and action payloads.

---

## 1. Scenario categories (all covered)

| Category | Examples | State | Schema patterns | Actions |
|----------|----------|--------|------------------|---------|
| **Visibility & overlay** | Modals, drawers, tooltips, dropdowns, accordions, expand/collapse | `ui.modalOpen`, `ui.drawerOpen`, `ui.accordionExpanded`, `ui.activeTab` | ShowWhen + __bind(when), Modal isOpen __bind, Tabs value __bind, Accordion value __bind | setData(path, true/false) or setData(path, tabId) |
| **Forms** | Single form, multi-field, validation, submit, reset | `form.name`, `form.email`, `form.errors`, `form.submitting` | Input/Select/Checkbox with __bind twoWay to form.* | setData on submit (or custom submit action), setData for reset |
| **Data display** | Tables, lists, cards, pagination, sort, filter, search | `table.page`, `table.sort`, `table.filter`, `table.rows`, `list.items` | Table + Pagination (page __bind), ShowWhen for empty/error | setData(table.page), setData(table.sort), fetch then setData(table.rows) |
| **Navigation** | Multi-page, tabs, stepper, wizard, back/next | `route`, `wizard.step`, `tabs.active` | Routes + navigate action; Tabs/Accordion for in-page; ShowWhen(step === n) | navigate(path), setData(wizard.step, n) |
| **Feedback** | Loading, success/error, toasts, alerts, inline messages | `ui.loading`, `ui.message`, `ui.toast`, `form.error` | Spinner/Alert/ShowWhen bound to state; toast/alert actions | setData(ui.loading, true), toast action, setData(form.error, msg) |
| **CRUD** | List → create/edit modal → delete confirm, bulk actions | `list.items`, `ui.editId`, `ui.deleteConfirm`, `form.*` | Table/grid of items; Modal for edit; ShowWhen(editId); Button setData(editId, id) | setData(ui.editId, id), setData(ui.deleteConfirm, true), custom delete/save |
| **Wizards & steppers** | Multi-step flow, next/back, conditional steps | `wizard.step`, `wizard.data.step1`, `wizard.data.step2` | ShowWhen(wizard.step === "1") etc.; Button setData(wizard.step, "2") | setData(wizard.step, next), setData(wizard.data.*) |
| **Dashboard** | Widgets, filters, date range, refresh | `dashboard.filters`, `dashboard.dateFrom`, `dashboard.widgets` | Grid of Cards; Inputs/Selects bound to filters; Button fetch + setData | setData(dashboard.filters), custom fetch then setData |
| **E‑commerce** | Product list, cart, quantity, checkout | `cart.items`, `cart.total`, `products`, `checkout.step` | Table/cards for products; Box __bind(cart.total); Modal for checkout | custom addToCart/setData(cart), setData(checkout.step) |
| **Settings & preferences** | Toggles, selects, save/cancel | `settings.theme`, `settings.notifications`, `settings.dirty` | Switch/Select twoWay __bind(settings.*); Button save/cancel | setData(settings.*), custom save (then setData or navigate) |
| **Auth & permissions** | Login form, logout, protected content | `auth.user`, `auth.token`, `ui.showLogin` | ShowWhen(auth.user) for protected block; ShowWhen(!auth.user) for login; form bound to credentials | setData(ui.showLogin), custom login → setData(auth.user), logout → setData(auth.user, null) |
| **Empty & error states** | No data, error message, retry | `list.items`, `list.error`, `list.loading` | ShowWhen(list.loading) Spinner; ShowWhen(list.error) Alert; ShowWhen(list.items?.length) Table | fetch action or setData(list.error), setData(list.loading) |
| **Layout toggles** | Sidebar open/close, fullscreen, density | `ui.sidebarOpen`, `ui.fullscreen`, `ui.density` | ShowWhen(ui.sidebarOpen) sidebar; className from __bind or ShowWhen | setData(ui.sidebarOpen, true/false) |
| **Composite interactions** | Button disables until valid; multi-select; dependent dropdowns | `form.valid`, `selection.ids`, `form.country`, `form.city` | Button disabled __bind(form.valid); Checkboxes + setData(selection.ids); Select city options from __bind | setData on change; custom or setData for derived state |

All of these use the **same** primitives: **state** (any shape), **__bind** (read/write), **ShowWhen** (conditional UI), **onClickAction** (setData, sequence, navigate, custom). So one UI definition can describe any of these—and AI can generate that definition on the fly.

---

## 2. State shape patterns (by scenario)

AI (or you) can define initial state that fits the scenario. Examples:

**Modal + table visibility**
```json
{ "ui": { "showTable": false, "modalOpen": false } }
```

**Form**
```json
{ "form": { "name": "", "email": "", "errors": {}, "submitting": false } }
```

**Table with pagination/sort**
```json
{ "table": { "page": 1, "pageSize": 10, "sort": { "columnId": "name", "direction": "asc" }, "rows": [], "total": 0 } }
```

**Wizard**
```json
{ "wizard": { "step": 1, "data": { "step1": {}, "step2": {} } } }
```

**Dashboard**
```json
{ "dashboard": { "filters": {}, "widgets": [], "loading": false } }
```

**Auth**
```json
{ "auth": { "user": null, "token": null }, "ui": { "showLogin": false } }
```

**E‑commerce**
```json
{ "cart": { "items": [], "total": 0 }, "products": [], "checkout": { "step": "cart" } }
```

Any nesting and any keys are valid; schema only needs to reference the same paths with __bind and setData payloads.

---

## 3. Schema patterns (reusable building blocks)

- **Show/hide block:** `ShowWhen` with `when: { "__bind": "path" }` and children. Toggle with Button `onClickAction: "setData"`, `onClickPayload: { path, value: true/false }`.
- **Modal:** Modal with `isOpen: { "__bind": "path", "__bindDir": "twoWay" }`. Open with setData(path, true); close is automatic via onClose.
- **Tabs:** Tabs with `value: { "__bind": "ui.activeTab" }` (and twoWay if you want); Tab buttons change tab via setData or built-in Tab onChange (if bound).
- **Form field:** Input with `value: { "__bind": "form.name", "__bindDir": "twoWay" }`. Submit button can run sequence (setData form.submitting, custom submit, setData form.submitting false, toast).
- **Table + pagination:** Table bound to `table.rows` (or static rows); Pagination with `page: { "__bind": "table.page" }`, `onPageChange` injected from twoWay; “Load” or initial fetch writes `table.rows` via setData/fetch.
- **Wizard step:** Store current step (e.g. `wizard.step: 1` or `wizard.step: "step1"`). Use **equality binding**: `ShowWhen` with `when: { "__bind": "wizard.step", "__eq": 1 }` (or `"__eq": "step1"`). Runtime resolves to true only when `state.wizard.step === 1`. Next/Back: setData(wizard.step, nextStep). Alternative: one boolean path per step (e.g. `ui.step1Visible`) and ShowWhen bound to that.
- **List + CRUD:** State has `list.items`, `ui.editId`, `ui.deleteConfirm`. Schema: list of cards/rows; Edit button setData(ui.editId, item.id); Modal for edit with form bound to item; Delete button setData(ui.deleteConfirm, true) and confirm button custom delete + setData(list.items, newItems).

These patterns compose: you can have a dashboard (state + schema) that includes modals, forms, tables, and wizards in one UI definition.

---

## 4. Actions that cover all interactions

| Need | Action | Payload / note |
|------|--------|-----------------|
| Change any state | setData | `{ path, value }` → dispatch SET_PATH. Covers visibility, form, wizard step, tab, filters, etc. |
| Replace full state | setAppData / REPLACE_STATE | Reset or hydrate entire store. |
| Update another node’s props | updateNode | `{ nodeId, props }` for dynamic label, disabled, loading. |
| Multiple steps in one click | sequence | steps: setData, toast, updateNode, navigate, custom. |
| Go to another screen | navigate | `{ path }` when using routes. |
| Feedback only | toast, alert, log | No state change. |
| Server/API, then update UI | custom (e.g. fetch, submit) | Handler reads store, calls API, dispatches setData (or REPLACE_STATE) with result. |

So: **all interactions and changes** are either a state update (setData/REPLACE_STATE), a schema node update (updateNode), a route change (navigate), a sequence of those, or a custom handler that can do anything (including dispatch setData). Design and layout changes are just more state paths + more schema nodes; no new “kind” of definition is required.

---

## 5. What “any complex platform on the fly” means

- **Any UI:** Schema is a tree of registered components (layout + content). Add more component types in the registry to support more UIs; schema format stays the same.
- **Any interaction:** Every user action maps to one or more actions (setData, updateNode, sequence, navigate, custom). Reducer applies state updates; custom handlers can call setData/updateNode/navigate.
- **Any design/layout:** State can hold theme, density, sidebar open, etc.; schema uses __bind and ShowWhen so the same definition can drive different layouts and designs.
- **Any real-life scenario:** The table in §1 covers visibility, forms, data display, navigation, feedback, CRUD, wizards, dashboard, e‑commerce, settings, auth, empty/error states, layout toggles, and composite behavior. All use the same state + schema + actions.

So the **UI definition** (schema + initial state + action payloads, and optionally custom action handlers) is **sufficient** for AI to describe and generate any of these platforms on the fly. The runtime does not need scenario-specific code; it only needs the reducer (SET_PATH, REPLACE_STATE), resolution of __bind and two-way bindings, and execution of actions (including custom).

---

## 6. AI instructions (summary)

When generating a complex platform:

1. **Choose scenario(s)** from the categories above (or combine them).
2. **Define initial state** with paths for visibility, form, list/table, wizard step, auth, etc., as needed.
3. **Build schema**: use Page/Container/Stack/Grid/Box for layout; use ShowWhen for conditional blocks; use __bind for every value that comes from or writes to state; use setData (and sequence/navigate/custom) for every click/event that should change UI or data.
4. **Use only registered component types** and the action set above (setData, updateNode, sequence, navigate, toast, alert, log, custom).
5. **Custom actions** (submit, fetch, addToCart, login, etc.): define the action name and payload in the schema; the runtime must register a handler that can read the store and call setData/updateNode/navigate as needed.

No scenario is special: same definition format, same runtime. For more detail on schema format and bindings, see **AI_UI_GENERATION_GUIDE.md** and **REDUCER_STORE_ARCHITECTURE.md**.
