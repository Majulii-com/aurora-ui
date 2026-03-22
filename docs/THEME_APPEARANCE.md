# Theme & appearance (Aurora surfaces)

`@majulii/aurora-ui` ships with a default **Aurora** visual language tuned to the **Majulii** brand: **teal/cyan primary** (mountain gradient), **deep navy** text (`#0b1f2a`), **mint** surfaces, **amber** accent (sun), and semantic **cyan** (`--aurora-info`) / **amber** (`--aurora-accent`) tokens—suitable for dashboards and SaaS without extra CSS.

## Global: `ThemeProvider`

| Prop | Default | Description |
|------|---------|-------------|
| `appearance` | *(uncontrolled)* | Controlled value: `'aurora'` \| `'plain'`. |
| `defaultAppearance` | `'aurora'` | Initial appearance when uncontrolled. |
| `appearanceStorageKey` | `'aurora-ui-appearance'` | `localStorage` key for the user’s choice (uncontrolled only). |

Legacy apps may still have `'enterprise'` stored in `localStorage`; it is **migrated automatically** to `'aurora'`.

```tsx
import { ThemeProvider } from '@majulii/aurora-ui';

// Default: Aurora polish everywhere
<ThemeProvider>
  <App />
</ThemeProvider>

// Legacy / minimal density (smaller radii, flatter controls)
<ThemeProvider defaultAppearance="plain">
  <App />
</ThemeProvider>
```

### APIs

- **`useAuroraAppearance()`** — `{ appearance, setAppearance, isAurora }`. Also exposes deprecated **`isEnterprise`** (same as `isAurora`) for older code. Safe outside `ThemeProvider` (defaults to `aurora`).
- **`useAuroraSurface(plain?)`** — class tokens for elevated surfaces and chrome; used by components. Prefer this name over the deprecated **`useEnterpriseSurface`**.
- **`applyAppearanceVariables(mode)`** — sets CSS variables on `document.documentElement` (also run when `ThemeProvider` mounts). Advanced / tests only.

`data-aurora-appearance="aurora" | "plain"` is set on both `<html>` (via JS) and the `ThemeProvider` wrapper for debugging.

## Per-component: `plain` prop

Many components extend **`AuroraSurfaceProps`**: optional **`plain`**. When `plain` is true, that instance **opts out** of Aurora-only classes, even if the global appearance is `aurora`.

```tsx
<Button plain variant="primary">Dense button</Button>
<Card plain variant="elevated">…</Card>
<Input plain label="SKU" />
```

Use this for dense tables, embedded widgets, or when JSON-driven UIs need a tighter look.

## CSS variables

Defined in `src/styles.css` (`:root`) and updated by `applyAppearanceVariables`:

- `--aurora-radius-sm` … `--aurora-radius-2xl`, `--aurora-radius-pill`
- `--aurora-shadow-control`, `--aurora-shadow-card`, `--aurora-shadow-float`, `--aurora-shadow-sm` … `--aurora-shadow-lg`

Override these in your app after importing `@majulii/aurora-ui/styles.css` for brand-specific tuning.

## Which components support `plain`

Button, Input, Textarea, Select, Card (+ header/body/footer follow parent Card), Modal, Alert, Badge, IconButton, ChatInput—extend `AuroraSurfaceProps`. More components can adopt the same pattern over time.

## Tables & DSL preview

- **`Table`** uses Aurora head/row/cell styling when global `appearance` is `aurora`. The scroll wrapper gets a soft card (`tableScrollWrap`) unless you pass **`skipOuterChrome`** (used when a parent already drew the outer card).
- **`GenDataTable`** wraps filter + table in **`tableSurface`** (rounded card, padding, shadow) and passes **`skipOuterChrome`** to `Table` so the UI is not double-bordered.

The playground sets `defaultAppearance="aurora"` and a dedicated `appearanceStorageKey` so a previously saved global `plain` preference under `aurora-ui-appearance` does not make the demo look flat.
