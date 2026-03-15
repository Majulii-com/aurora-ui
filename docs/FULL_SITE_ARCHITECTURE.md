# Building a full website with the UI schema approach

This doc describes a **generic** way to build a **complete, working website** from the same UI-schema + actions approach used in the playground. The design is use-case agnostic: one schema format and one runtime pattern can power marketing sites, dashboards, e‑commerce, blogs, SaaS, etc.

---

## 1. Core idea

- **UI schema** = declarative tree of components (pages, layout, widgets). One schema per "screen" or one **site schema** with multiple pages.
- **Actions** = serializable intents (navigate, updateNode, toast, submit, fetch). The **runtime** maps these to real behavior (router, state, API).
- **Data binding** = props that reference "data paths" (e.g. `user.name`, `cart.total`) so the same schema works with real data without hardcoding values.

A **full website** is: **site schema** + **router** + **data layer** + **action runtime**, all generic.

---

## 2. Site schema (generic structure)

One JSON that describes the whole site: routes and the UI tree per route.

```ts
// Conceptual type (implement in your app or a shared package)
interface SiteSchema {
  /** Optional global layout (shell) applied to every page */
  layout?: UINode;
  /** Routes: path pattern -> page schema (UINode tree for that page) */
  routes: Record<string, UINode>;
  /** Optional default route (e.g. "/" or "home") */
  defaultRoute?: string;
}
```

**Example (minimal):**

```json
{
  "defaultRoute": "/",
  "routes": {
    "/": { "type": "Page", "props": {}, "children": [ { "type": "Container", "props": { "maxWidth": "lg" }, "children": [ ... ] } ] },
    "/dashboard": { "type": "Page", "props": {}, "children": [ ... ] },
    "/products": { "type": "Page", "props": {}, "children": [ ... ] }
  }
}
```

- **Generic**: Same shape works for any site. Add routes and page trees as needed.
- **Layout**: If `layout` is set, the runtime renders `layout` and injects the current route's tree into a "slot" (e.g. a child node with `type: "Outlet"` or a designated `id`).

---

## 3. Routing

- **URL → page**: Map current path (e.g. `window.location.pathname`) to a key in `siteSchema.routes` (exact match or simple pattern like `/products/:id`).
- **Navigate action**: Add a new action type so schema can trigger navigation:

```json
{ "onClickAction": "navigate", "onClickPayload": { "path": "/dashboard" } }
```

- **Runtime**: Your app's router (React Router, TanStack Router, or a simple `setRoute(path)` state) listens to URL and renders the UINode for the matched route. No schema change needed for new pages—only add a new entry in `routes`.

---

## 4. Data binding (generic)

To avoid hardcoding text and values, allow props to **reference data** by path. The runtime resolves these from a **data context** (global state, API cache, form state, etc.).

**Convention (one possible, generic design):**

- Any prop value can be:
  - **Literal**: `"Hello"`, `42`, `true` → use as-is.
  - **Binding**: `{ "__bind": "path.to.data" }` → runtime replaces with value at that path from the current data context.

**Example:**

```json
{
  "type": "Box",
  "props": {
    "children": { "__bind": "page.title" }
  },
  "children": []
}
```

- **Data context** could be: `{ page: { title: "Home" }, user: { name: "Alex" }, cart: { total: 99 } }`.
- **Generic**: Same binding format works for any domain (e.g. `product.name`, `dashboard.stats.revenue`). You just feed the right context per route or per app.

**Optional: two-way binding for inputs**

- For form fields, support `{ "__bind": "form.email", "__bindDir": "twoWay" }` so changes write back to the same path. The runtime updates the context on change.

**Complex components (tables, charts, editors, etc.)**

- Rich components have **interactive state** (e.g. table: page, sort, filter, search). Keep that state in the data context at fixed paths and bind via `__bind`. The runtime **injects handlers** that call `setData(path, value)` when the user interacts, so the schema stays declarative. See **`COMPLEX_COMPONENTS.md`** for the full pattern and an advanced-table example.

---

## 5. Actions (extensible set)

Keep the **action set extensible** so new use cases don't require schema format changes.

**Built-in (playground today):** `log`, `toast`, `alert`, `updateNode`, `sequence`.

**Add for full sites (generic):**

| Action       | Payload example              | Runtime behavior (generic)                |
|-------------|------------------------------|------------------------------------------|
| `navigate`  | `{ path: string }`           | Router go to path                        |
| `submit`    | `{ formId?: string, api?: string, method?: string }` | Submit form / call API, then optional `onSuccess` (e.g. toast + navigate) |
| `fetch`     | `{ key: string, url: string, targetPath: string }`    | Fetch and write result into data at `targetPath` |
| `setData`   | `{ path: string, value: unknown }`                  | Write value at path in data context      |

- **Runtime**: Maintain an **action registry**: `(action, payload, context) => void`. Register handlers for each action type. New use cases = new action types + new handlers; schema stays the same.

---

## 6. Runtime architecture (one app shell)

A single **app shell** can drive the whole site in a generic way:

```
┌─────────────────────────────────────────────────────────────┐
│  App shell                                                   │
│  • Load site schema (static JSON or from API)                 │
│  • Router: URL → route key → page schema (UINode)            │
│  • Data context: state / API cache / form state              │
│  • Action runner: dispatch(action, payload) → registry       │
└─────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│  Resolve step                                                │
│  • Replace __bind in props with values from data context      │
│  • Inject action handlers (onClick → dispatch(action, …))    │
└─────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│  UIRenderer(schema, registry)                                │
│  • Same as today: type → component, props + children         │
└─────────────────────────────────────────────────────────────┘
```

- **Generic**: Same shell works for any site schema. You only change: schema JSON, data fetchers, and registered action handlers.

---

## 7. Flow for "any use case"

1. **Define site schema**: Add routes and UINode trees (in playground or by hand or via AI).
2. **Define data shape**: What paths your app uses (e.g. `user`, `cart`, `products`, `form`). Feed a context provider with that data (from API, state, or static).
3. **Register actions**: Implement `navigate`, `submit`, `fetch`, `setData`, etc., in your runtime. Optionally keep `updateNode`, `toast` for client-only UX.
4. **Bind UI to data**: Use `__bind` in schema where content is dynamic. Use actions for navigation, submit, and updates.
5. **Deploy**: Serve the app (React/Vite/Next/etc.) with the same shell; load schema from static JSON or from your backend. No need to change schema format for new use cases—only add routes, data, and handlers.

---

## 8. What "full working website" means here

- **Multiple pages**: Handled by `routes` and `navigate`.
- **Dynamic content**: Handled by data binding + data context.
- **Forms and submit**: Handled by `submit` (and optional two-way `__bind`).
- **Navigation and CTAs**: Handled by `navigate`, `toast`, `updateNode`, `sequence`.
- **Auth / guards**: Implement in the runtime: resolve route, then check auth; if not allowed, redirect or show a "login" route. Schema can stay unchanged; only the resolver changes.
- **SEO / SSR**: Same schema can be rendered on the server; bindings and actions run on client after hydrate.

---

## 9. Keeping it generic

- **Schema**: One site schema shape (routes + UINode trees). One UINode shape. One action payload shape (action type + payload object).
- **No use-case-specific nodes**: Prefer generic layout + primitives (Page, Box, Stack, Grid, Container, Button, Input, …). Domain-specific blocks (ProductCard, Chart) can be custom components registered in the same registry.
- **Extensibility points**:
  - **Components**: Register new types in the registry for new domains (e.g. `ProductCard`, `DataTable`).
  - **Actions**: Register new action types in the action runner for new behaviors (e.g. `addToCart`, `openModal`).
  - **Data**: Any data shape; only the binding path convention (`__bind`) and the context you provide must be consistent.

This way the **same approach** (schema + bindings + actions + one runtime) works for marketing sites, dashboards, e‑commerce, blogs, and SaaS—you only change the schema content, data, and registered handlers.
