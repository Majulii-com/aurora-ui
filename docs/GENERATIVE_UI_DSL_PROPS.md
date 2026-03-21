# Generative DSL — props reference (design without code changes)

Goal: **AI JSON** should control layout and styling using **strings** (Tailwind classes, placeholders, variants) on each `type`, without editing Aurora source.

**Universal rules**

| Mechanism | Use |
|-----------|-----|
| **`className`** | Tailwind / arbitrary classes on the root DOM of that component (when supported). |
| **`style`** | Optional inline object on components that forward `HTMLAttributes` (e.g. `{ "maxWidth": 480 }` in JSON). Prefer `className` for Tailwind. |
| **`{{state…}}` / `{{bindings…}}`** | Dynamic strings for any prop value, including `className`. |

---

## Layout

| `type` | Key styling / layout props |
|--------|----------------------------|
| **Box** | `className`, `p`, `m` via className |
| **Stack** | `direction`, `gap`, `align`, `justify`, `className` |
| **Row** | `gap`, `className` (horizontal Stack) |
| **Grid** | `columns`, `gap`, `className` |
| **Container** | `maxWidth`, `className` |

---

## Typography & chrome

| `type` | Notes |
|--------|--------|
| **Text** | `variant` (`body` \| `title` \| `muted`), `className`, `style`, `children`, other paragraph DOM props (`id`, `data-*`, `aria-*`, …) |
| **Label** | `className`, `children`, `htmlFor` |
| **Link** | `href`, `variant`, `className`, `onClickAction` + `children` |
| **Breadcrumb** | `className`, `children` |
| **BreadcrumbItem** | `href`, `className`, `children` |

---

## Forms

| `type` | Notes |
|--------|--------|
| **Input** | `className`, `size`, `variant`, `placeholder`, `label`, `bind`, `onChangeAction` |
| **Textarea** | same pattern |
| **Select** | `options`, `className`, `placeholder`, `label`, `bind` |
| **Checkbox** | `label`, `className`, `bind` |
| **Switch** | `label`, `className`, `bind` |
| **Button** | `variant`, `size`, `fullWidth`, `className`, `children`, `onClickAction` |

---

## Feedback & data

| `type` | Notes |
|--------|--------|
| **Alert** | `variant`, `title`, `className`, `children` |
| **Spinner** (`GenSpinner`) | `size`, `label`, `labelClassName`, `className` (plus Stack root props: `style`, `id`, `aria-*`, …) |
| **Table** (`GenDataTable`) | See **Table (extended)** below |

### Table (`GenDataTable`) — extended DSL props

| Prop | Target |
|------|--------|
| `className` | Outer wrapper of the whole block (filter + table). |
| `filterClassName` | Filter `<Input>` element. |
| `filterRowClassName` | Wrapper `div` around the filter (margins, max-width). |
| `filterPlaceholder` | Placeholder string (default `"Filter rows…"`). |
| `tableClassName` | Native `<table>` element (via `Table`). |
| `tableWrapperClassName` | Horizontal scroll wrapper around `<table>` (overflow, min-width). |
| `sortHeaderButtonClassName` | Sortable column header buttons. |
| `columns`, `rows`, `sortKey`, `sortDir`, `filterBind`, `onSortAction` | Data + wiring (see `GENERATIVE_UI.md`). |

---

## Navigation

| `type` | Notes |
|--------|--------|
| **Tabs** | `tabBind`, `variant`, `className`, `value`/`onChange` if not using `tabBind` |
| **TabList** | `className` |
| **Tab** | `value`, `className`, `children` |
| **TabPanel** | `value`, `className`, `children` |

---

## Conditional

| `type` | Notes |
|--------|--------|
| **ShowWhen** | `when`, `loadingKey` (Gen runtime), **`className`** (wraps visible content in a `div` for spacing/borders) |

---

## Adding new knobs later

Prefer **optional string props** on the component (`fooClassName`, `filterPlaceholder`) over changing `GenUIRenderer`. If a whole subtree needs arbitrary layout, compose extra **Box** / **Stack** nodes in JSON.

See also: `docs/GENERATIVE_UI.md`.
