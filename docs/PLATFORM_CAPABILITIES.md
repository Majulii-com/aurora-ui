# Platform capabilities: any web app, any complex scenario

This platform is designed so **AI (or developers) can come up with any possible UI, interaction, and design** and build **any real-life complex platform on the fly** from a single **UI definition** (schema + state + actions). It supports **all possible real-life scenarios**—dashboards, e‑commerce, SaaS, admin panels, forms, wizards, data tables, CRUD, auth, settings, multi-step flows, and any combination—without changing the core schema format or runtime. You extend via **components**, **data**, and **actions**.

---

## How it scales to any scenario

| Need | How the platform handles it |
|------|-----------------------------|
| **Any UI** | Register components in the registry. Schema references them by `type`. Layout primitives (Page, Box, Stack, Grid, Container) + your domain components (DataTable, Chart, Map, ProductCard). |
| **Any data** | Single **app data** context (any shape). Use `__bind` in schema to read; use `setData` action or two-way bindings to write. No limit on paths or nesting. |
| **Any behavior** | **Actions** are serializable (type + payload). Built-in: log, toast, alert, updateNode, sequence, setData, navigate. Register **custom action handlers** for submit, fetch, openModal, addToCart, etc. Schema stays the same. |
| **Any number of screens** | **Routes**: map path → page schema. Use `navigate` action to switch. Same runtime for single-page or multi-page. |
| **Complex components** | **State bindings**: bind props like `page`, `sort`, `filter`, `search` to data paths. Runtime injects handlers that call `setData`. Works for tables, charts, editors, wizards, maps. See `COMPLEX_COMPONENTS.md`. |
| **Forms & submit** | Bind inputs with `__bind` + `__bindDir: "twoWay"`. On submit, register a custom action (e.g. `submit`) that reads from app data and calls your API. |
| **Auth / permissions** | Implement in your runtime: before rendering a route, check auth and redirect or show login. Schema is unchanged. |

---

## Three extension points

### 1. Component registry

- Add any React component and a schema `type` (e.g. `DataTable`, `LineChart`, `RichEditor`).
- Schema uses `{ "type": "DataTable", "props": { ... } }`. No core change.
- For complex components, use **state bindings** (`__bind` / `__bindDir: "twoWay"`) so the runtime injects `onPageChange`, `onSortChange`, etc.

### 2. Data context

- **appData** can hold any structure: `user`, `cart`, `table`, `form`, `dashboard`, etc.
- **__bind** in props reads from it; **setData** (action or two-way handler) writes to it.
- You can feed appData from APIs, local state, or URL—the schema only references paths.

### 3. Action registry (custom handlers)

- Built-in actions cover common cases (toast, updateNode, setData, navigate, sequence).
- For **any other behavior** (submit form, fetch API, open modal, analytics), register a custom handler: `registerAction('submit', (payload, context) => { ... })`.
- Schema emits the same shape: `onClickAction: "submit", onClickPayload: { api: "/api/order", method: "POST" }`. Your handler runs it.
- In the playground: choose **"Custom (any registered action)"** in Events, enter the action name and payload. In your app (or playground wrapper), call `usePlayground().registerAction('submit', handler)` so the handler runs when the user clicks.

---

## What “any complex scenario” means in practice

- **Marketing site**: Routes + layout + bindings for copy/CTAs; navigate for links.
- **Dashboard**: Charts and tables with state bindings (page, sort, filter, search); data from appData or fetch action.
- **E‑commerce**: Product list (data-bound), cart in appData, addToCart as custom action, checkout as route + form with submit action.
- **Admin panel**: Tables, filters, modals; permissions in runtime (guard routes / nodes by auth).
- **Form-heavy app**: Two-way bindings for all fields; submit action to post and then setData or navigate.
- **Wizard / stepper**: Current step and step data in appData; next/back buttons trigger setData; final step triggers submit.

The **same schema format and same runtime** apply in all cases. You only add components, data paths, and action handlers.

---

## Summary

The platform can create **any web app for any complex scenario** because:

1. **UI** = registry of components (extensible).
2. **State** = one data context + path-based bindings (any shape).
3. **Behavior** = built-in actions + **custom action registry** (any new action type).
4. **Screens** = routes + navigate (any number of pages).
5. **Complex widgets** = state bindings + injected handlers (tables, charts, editors, etc.).

**Reducer + store:** App data is updated only by **dispatching actions** through a **reducer** (see `REDUCER_STORE_ARCHITECTURE.md`). So state is a single source of truth; schema and UI bind to it; interactions dispatch actions (e.g. SET_PATH) and the UI updates accordingly. **For AI:** see `AI_UI_GENERATION_GUIDE.md` to generate any UI and any interaction from schema + initial state + action payloads. **Real-life coverage:** see `REAL_LIFE_SCENARIOS.md` for a catalog of scenarios (visibility, forms, tables, wizards, dashboards, e‑commerce, auth, CRUD, etc.) and how each is expressed with the same definition format—so any complex platform can be built on the fly.

See `FULL_SITE_ARCHITECTURE.md` and `COMPLEX_COMPONENTS.md` for implementation details.
