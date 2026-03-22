# Enterprise ops dashboard — Gen JSON DSL example

Single-page **Vite** host that renders one large **`GenUIDocument`** from:

`src/documents/enterprise-dashboard.json`

## What’s in the JSON

- **Layout:** `Page`, `Container`, `Stack`, `Row`, `Grid`, **`SplitPane`**, `Divider`
- **Chrome:** `Breadcrumb`, `Badge`, `Code`, `Text`, **`Tooltip`** + **`IconButton`**
- **Overlays / menus:** **`Dropdown`** + `DropdownItem`, **`Modal`** (`onCloseAction`), `Alert`
- **KPIs & charts:** `StatCard`, **`BarChart`**, **`LineChart`** (multi-series), **`PieChart`**, `Progress`, `Skeleton`
- **Navigation:** **`Tabs`** + `tabBind`, `TabList`, `Tab`, `TabPanel`
- **Data:** **`Table`** with sort + global `filterBind` + **`columnFiltersBind`**, **`Pagination`** + **`onPageChangeAction`**
- **API:** `onMountAction` → `API_CALL` (JSONPlaceholder posts), `CHAIN` + `SET_STATE` for page changes
- **Other:** **`TreeView`**, **`Accordion`** (+ `AccordionItem` / `Trigger` / `Content`), `Card` / `CardHeader` / `CardBody`, `Link`
- **Host hooks:** `NAVIGATE`, `CUSTOM` (wired in `App.tsx`)

There is **no** `repeat` / `map` node: tabular and chart data live in **`state`** and bind via `{{state…}}`.

## Run

From the **aurora-ui** package root:

```bash
npm run example:ops-dashboard
```

Opens dev server (port **5176** by default). Same alias pattern as `examples/dsl-host-app/`: `@majulii/aurora-ui` → library `src/`.

## Files

| File | Role |
|------|------|
| `src/documents/enterprise-dashboard.json` | Full DSL document |
| `src/App.tsx` | `ThemeProvider`, `GenUIProvider`, `navigate` / `onCustom`, `GenUIRenderer` |
| `vite.config.ts` | React + path alias to the library |
