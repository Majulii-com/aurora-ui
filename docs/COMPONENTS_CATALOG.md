# Aurora UI — component catalog (high level)

Enterprise-oriented building blocks in `src/components`. Use with the **Aurora** appearance (`ThemeProvider` default) for the premium surface; pass `plain` on a component to opt out.

## Forms & picking

| Component | Notes |
|-----------|--------|
| **Input**, **Textarea**, **Select** | Text entry; Aurora uses slightly larger type and rounded shells. |
| **MultiSelect** | Many values; chips in trigger, searchable checklist in popover. |
| **Checkbox**, **Radio**, **Switch** | Standard toggles. |
| **Slider** | Single-axis value. |
| **Label** | Form labels aligned with Aurora typography. |

## Data display

| Component | Notes |
|-----------|--------|
| **Table** | Base HTML table + scroll wrapper + Aurora row/header chrome. |
| **GenDataTable** | DSL-oriented grid: global filter, **per-column filters** (`filterable` + `columnFilters` / `onColumnFilterChange`), sort. |
| **TreeTable** | Hierarchical rows via flat `rows` with `id` / `parentId`; expand/collapse; optional global filter. |
| **Pagination** | Page controls. |

## Navigation & structure

**Tabs**, **Accordion**, **Breadcrumb**, **Dropdown**, **Drawer**, **Modal**, **Tooltip**, **Popover**, **SplitPane**, **TreeView** (tree list, not grid).

## Feedback & media

**Alert**, **Badge**, **Avatar**, **Spinner**, **Progress**, **Skeleton**, **EmptyState**, **Image**, **Icon**, **IconButton**, charts (**BarChart**, **LineChart**, **PieChart**), **StatCard**, **Chat** suite.

## Generative / DSL

**GenText**, **GenSpinner**, **GenDataTable** — wired via `GenUIRenderer` and `auroraGenUIRegistry` (`Table`, `MultiSelect`, `TreeTable`, …).

See `docs/GENERATIVE_UI_DSL_PROPS.md` for JSON-friendly props.
