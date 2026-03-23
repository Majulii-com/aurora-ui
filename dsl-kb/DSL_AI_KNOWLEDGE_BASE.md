# Aurora GenUI DSL — AI knowledge base (generated)

> **Auto-generated** — do not edit by hand. Run `npm run gen:dsl-kb` after registry or renderer changes.
> **Generated at:** 2026-03-23T09:13:52.259Z

## Purpose

This file is optimized for **LLM context**: it describes **§1 — responsive layout rules** (required for any generated UI), the **JSON shape** (`GenUIDocument`), **expression strings**, **declarative actions**, **renderer wiring** (special prop names), **lint limits**, **every default registry component** with example `defaultProps`, and **§9 — full example documents** showing the response shape for interactive UIs.

Use it together with human docs: `docs/AURORA_UI_BIBLE.md`.

Wiring rows and taxonomy are maintained in `src/runtime/gen/dslRendererWiring.ts` and `src/runtime/gen/dslRegistryTaxonomy.ts`.

---

## 1. Responsive layout (all viewports — required)

**Every** generated `GenUIDocument` must read and interact correctly on **phone, tablet, desktop, and large monitors** without horizontal page overflow, clipped controls, or unusably small tap targets. Prefer **fluid** layout; avoid fixed pixel widths for page shells and main columns.

### 1.1 Defaults you can rely on

- **`Stack`** (registry default) includes `w-full min-w-0`; **`Row`** wraps horizontal stacks with `w-full min-w-0` so flex children can shrink inside narrow parents.
- **`Grid`** uses **mobile-first** column tracks (e.g. `columns: 3` → one column on small screens, up to three from `lg:`). Override with `props.className` if a design needs a different breakpoint ladder.
- **`Page`**, **`Box`**, **`Card`**, **`StatCard`**, **`Table`** scroll wrappers include **`min-w-0`** (and width where needed) so nested flex/grid layouts don’t force horizontal overflow.
- **Charts** use Recharts `ResponsiveContainer` where applicable; still set a sensible numeric `height` and put the chart in a parent with `className` containing `w-full min-w-0`.

### 1.2 What the model must do in JSON (`className` / structure)

- Use **Tailwind responsive prefixes** on layout and typography: `sm:`, `md:`, `lg:`, `xl:`, `2xl:` — e.g. `flex-col md:flex-row`, `gap-3 md:gap-6`, `text-sm md:text-base`, `p-4 lg:p-8`.
- Prefer **`Container`** + **`Stack`** / **`Grid`** for dashboards; avoid `w-[420px]`-style fixed main widths. Use `max-w-*`, `w-full`, `flex-1`, `min-w-0`, and `overflow-x-auto` on inner scroll regions (e.g. wide **`GenDataTable`** / toolbars).
- **`SplitPane`**: on small viewports side-by-side panes are often too narrow; prefer **`className`** patterns that stack or hide secondary content via **`ShowWhen`** + state, or host-specific layouts — document the intent in examples when using split layouts.
- **Forms**: full-width inputs on mobile (`w-full`), adequate vertical spacing between fields, and **`Modal`** / **`Drawer`** sizes that fit small screens (`size` + `className`).
- **Touch**: keep interactive controls at least ~44×44 CSS px where possible (padding on **`Button`**, **`IconButton`**, **`Tab`** targets).

---

## 2. Pipeline (mental model)

```
GenUIDocument JSON
  → parseGenUIDocument (Zod)
  → lintGenUIDocument / parseAndLintGenUIDocument
  → GenUIProvider + Zustand state
  → GenUIRenderer (resolve {{expressions}}, wire bind/tabBind/*Action)
  → runAction → SET_STATE | API_CALL | CHAIN | …
```

---

## 3. Root document shape (`GenUIDocument`)

| Field | Required | Role |
|-------|----------|------|
| `ui` | **yes** | Root `GenUINode` tree |
| `state` | **yes** | Initial serializable object |
| `actions` | no | `actionId` → `ActionDef` |
| `bindings` | no | Named strings; use `{{bindings.name}}` in props |
| `version` | no | Tooling only |
| `onMountAction` | no | Action id run once on mount |

### 3.1 `GenUINode`

- `type` — string, must be a key in the host registry (default list: **§8**).
- `props` — object; values may contain `{{state.path}}`, `{{bindings.x}}`, `{{response}}` after API calls, etc.
- `children` — nested `GenUINode[]` for composition.
- `id` — optional hint for React keys.

**No functions in JSON.** Use `bind`, `*Action`, `tabBind`, etc., instead of inline handlers.

---

## 4. Expression placeholders

Strings in `props` are resolved with `resolveDeep`. Typical patterns:

- `{{state.foo.bar}}` — read from global UI state.
- `{{bindings.myExpr}}` — from `document.bindings` (pre-resolved).
- After `API_CALL`, `{{response}}` may be used in chained actions / success handlers (see interpreter docs).

---

## 5. Action types (`ActionDef`)

Allowed `type` discriminator values: **SET_STATE**, **MERGE_STATE**, **API_CALL**, **NAVIGATE**, **CUSTOM**, **CHAIN**.

| Type | Summary |
|------|---------|
| `SET_STATE` | Set `path` + `value` |
| `MERGE_STATE` | Shallow merge `patch` into state |
| `API_CALL` | HTTP call; optional `onSuccess` / `onError` chains |
| `NAVIGATE` | Host navigation `path` |
| `CUSTOM` | Delegates to host `onCustom(name, payload)` |
| `CHAIN` | Run inner `chain` of actions in order |

---

## 6. Renderer DSL wiring (special `props`)

These props are interpreted by `GenUIRenderer` — they are **not** passed raw to React components.

| Prop | Typical components | Description |
|------|-------------------|-------------|
| `bind` | Input, Textarea, Select, Checkbox, Switch, MultiSelect | State path (no `state.` prefix). Two-way sync: text-like controls use `value` + change events; Checkbox/Switch use `checked`. |
| `tabBind` | Tabs | State path for the active tab string; `Tab`/`TabPanel` use matching `value`. |
| `onClickAction` | Button, IconButton, Link (etc. where supported), DropdownItem, … | Must match a key in `document.actions`. Runs `runAction(id)`. |
| `onSortAction` | Table (GenDataTable) | Action id; payload includes `{ column }` from the runtime. |
| `onPageChangeAction` | Pagination | Action id; payload includes `{ page }`. |
| `filterBind` | Table | State path for global row filter string. |
| `columnFiltersBind` | Table | State path for object of per-column filter strings (keys = column keys). |
| `onCloseAction` | Modal, Drawer | Action id when overlay/drawer closes. |
| `loadingKey` | ShowWhen | If set, `when` is derived from loading state for that `API_CALL` id instead of `props.when`. |
| `onChangeAction` | Form controls where implemented | Runs after native change; receives event payload for `runAction`. |
| `onMountAction` | document root | Top-level field on `GenUIDocument`; runs once on mount (action id). |

**Lint** also checks that string values on **`onClickAction`, `onSortAction`, `onChangeAction`, `onCloseAction`, `onPageChangeAction`** reference existing keys in `document.actions`.

### 6.1 `Icon` component — Lucide icon names

The **`Icon`** registry component uses **Lucide** (via `lucide-react` dynamic icons). Pass `props.name` as a **kebab-case** icon id (e.g. `home`, `chevron-right`, `trash-2`) or **PascalCase** (`Home`, `ChevronRight`).

**Count:** **1951** icon names (same set as `lucide-react` `iconNames`). Full sorted list: `dsl-kb/lucide-icon-names.json`.

**Legacy aliases** (older DSL examples):

| Alias | Lucide `name` |
|-------|----------------|
| `add` | `plus` |
| `chevron-down` | `chevron-down` |
| `chevron-right` | `chevron-right` |
| `close` | `x` |
| `export` | `upload` |
| `maximize` | `maximize` |
| `menu` | `menu` |
| `more` | `more-vertical` |
| `refresh` | `refresh-cw` |
| `run` | `play` |
| `save` | `save` |
| `search` | `search` |
| `settings` | `settings` |

**Examples:** `"name": "search"`, `"name": "settings"`, `"name": "rocket"`. Invalid names render nothing (and warn in dev).

---

## 7. Document limits (lint)

| Limit | Default |
|-------|---------|
| maxDepth | 64 |
| maxNodes | 2000 |

---

## 8. Default registry components

**Count:** 76 types.

Grouped by category. **`defaultProps`** are copied from `auroraGenUIRegistry` (functions shown as `[function]`).

### layout

#### `Box`

*(no defaultProps in registry)*

#### `Container`

*(no defaultProps in registry)*

#### `Fragment`

*(no defaultProps in registry)*

#### `Grid`

*(no defaultProps in registry)*

#### `Page`

*(no defaultProps in registry)*

#### `Row`

*(no defaultProps in registry)*

#### `SplitPane`

```json
{
  "direction": "horizontal",
  "defaultSize": 0.4
}
```

#### `Stack`

```json
{
  "gap": 4,
  "className": "w-full min-w-0"
}
```

### typography

#### `Breadcrumb`

*(no defaultProps in registry)*

#### `BreadcrumbItem`

```json
{
  "children": "Home"
}
```

#### `Code`

```json
{
  "children": "code"
}
```

#### `CodeBlock`

```json
{
  "code": "// example",
  "showLineNumbers": true
}
```

#### `Kbd`

```json
{
  "children": "⌘K"
}
```

#### `Label`

*(no defaultProps in registry)*

#### `Link`

```json
{
  "href": "#",
  "children": "Link"
}
```

#### `Text`

*(no defaultProps in registry)*

### form

#### `Checkbox`

*(no defaultProps in registry)*

#### `DateField`

```json
{
  "type": "date",
  "label": "Date"
}
```

#### `FileUpload`

```json
{
  "title": "Upload files",
  "onFilesChange": "[function]"
}
```

#### `Input`

*(no defaultProps in registry)*

#### `MultiSelect`

```json
{
  "options": [
    {
      "value": "a",
      "label": "Option A"
    },
    {
      "value": "b",
      "label": "Option B"
    },
    {
      "value": "c",
      "label": "Option C"
    }
  ],
  "value": [],
  "onChange": "[function]",
  "placeholder": "Choose…"
}
```

#### `Radio`

```json
{
  "name": "gen-radio"
}
```

#### `SegmentedControl`

```json
{
  "options": [
    {
      "value": "a",
      "label": "A"
    },
    {
      "value": "b",
      "label": "B"
    }
  ],
  "value": "a",
  "onChange": "[function]",
  "aria-label": "Segmented"
}
```

#### `Select`

```json
{
  "options": [
    {
      "value": "a",
      "label": "Option A"
    },
    {
      "value": "b",
      "label": "Option B"
    }
  ]
}
```

#### `Slider`

```json
{
  "min": 0,
  "max": 100,
  "value": 50,
  "showValue": true
}
```

#### `Switch`

*(no defaultProps in registry)*

#### `Textarea`

*(no defaultProps in registry)*

### actions

#### `Button`

*(no defaultProps in registry)*

#### `CopyButton`

```json
{
  "textToCopy": "hello@example.com",
  "children": "Copy email"
}
```

#### `Icon`

```json
{
  "name": "search"
}
```

#### `IconButton`

```json
{
  "aria-label": "Action"
}
```

### surfaces

#### `Alert`

*(no defaultProps in registry)*

#### `Card`

*(no defaultProps in registry)*

#### `CardBody`

*(no defaultProps in registry)*

#### `CardFooter`

*(no defaultProps in registry)*

#### `CardHeader`

```json
{
  "children": "Header"
}
```

#### `Divider`

*(no defaultProps in registry)*

#### `Drawer`

```json
{
  "isOpen": false,
  "onClose": "[function]",
  "title": "Drawer",
  "placement": "right"
}
```

#### `Modal`

```json
{
  "isOpen": false,
  "onClose": "[function]",
  "title": "Dialog",
  "size": "md"
}
```

### overlays

#### `Dropdown`

```json
{
  "triggerLabel": "Menu",
  "placement": "bottom-start"
}
```

#### `DropdownItem`

```json
{
  "children": "Item"
}
```

#### `Popover`

```json
{
  "triggerLabel": "Open",
  "placement": "bottom-start"
}
```

#### `Tooltip`

```json
{
  "content": "Tooltip"
}
```

### feedback

#### `Avatar`

```json
{
  "name": "?"
}
```

#### `Badge`

```json
{
  "children": "Badge",
  "variant": "primary"
}
```

#### `EmptyState`

```json
{
  "title": "Nothing here",
  "description": "Add content to get started."
}
```

#### `Progress`

```json
{
  "value": 50,
  "max": 100
}
```

#### `Skeleton`

*(no defaultProps in registry)*

#### `Spinner`

*(no defaultProps in registry)*

### navigation

#### `Accordion`

```json
{
  "variant": "default",
  "allowMultiple": false
}
```

#### `AccordionContent`

```json
{
  "children": "Content"
}
```

#### `AccordionItem`

```json
{
  "value": "1"
}
```

#### `AccordionTrigger`

```json
{
  "children": "Section"
}
```

#### `Pagination`

```json
{
  "page": 1,
  "totalPages": 5,
  "onPageChange": "[function]"
}
```

#### `Stepper`

```json
{
  "steps": [
    {
      "id": "1",
      "title": "Cart",
      "description": "Review"
    },
    {
      "id": "2",
      "title": "Pay",
      "description": "Billing"
    },
    {
      "id": "3",
      "title": "Done",
      "description": "Receipt"
    }
  ],
  "activeIndex": 1
}
```

#### `Tab`

*(no defaultProps in registry)*

#### `TabList`

*(no defaultProps in registry)*

#### `TabPanel`

*(no defaultProps in registry)*

#### `Tabs`

```json
{
  "value": "1",
  "onChange": "[function]"
}
```

### data

#### `Table`

```json
{
  "className": "w-full min-w-0"
}
```

#### `TreeTable`

```json
{
  "className": "w-full min-w-0",
  "columns": [
    {
      "key": "name",
      "label": "Name"
    },
    {
      "key": "role",
      "label": "Role"
    }
  ],
  "rows": [
    {
      "id": "1",
      "name": "Engineering",
      "role": "Dept"
    },
    {
      "id": "2",
      "parentId": "1",
      "name": "Platform",
      "role": "Team"
    },
    {
      "id": "3",
      "parentId": "2",
      "name": "API",
      "role": "Squad"
    }
  ],
  "defaultExpandAll": true
}
```

#### `TreeView`

```json
{
  "items": [
    {
      "id": "1",
      "label": "Folder",
      "children": [
        {
          "id": "1-1",
          "label": "File"
        }
      ]
    }
  ]
}
```

### charts

#### `AreaChart`

```json
{
  "data": [
    {
      "x": "Mon",
      "y": 2
    },
    {
      "x": "Tue",
      "y": 5
    }
  ],
  "height": 180
}
```

#### `BarChart`

```json
{
  "data": [
    {
      "label": "A",
      "value": 10
    },
    {
      "label": "B",
      "value": 24
    }
  ],
  "height": 180
}
```

#### `ComposedChart`

```json
{
  "indexKey": "month",
  "data": [
    {
      "month": "Jan",
      "revenue": 40,
      "profit": 12
    },
    {
      "month": "Feb",
      "revenue": 55,
      "profit": 18
    }
  ],
  "series": [
    {
      "type": "bar",
      "dataKey": "revenue",
      "name": "Revenue"
    },
    {
      "type": "line",
      "dataKey": "profit",
      "name": "Profit"
    }
  ],
  "height": 200
}
```

#### `FunnelChart`

```json
{
  "data": [
    {
      "name": "Visitors",
      "value": 1000
    },
    {
      "name": "Leads",
      "value": 400
    },
    {
      "name": "Sales",
      "value": 120
    }
  ],
  "height": 220
}
```

#### `LineChart`

```json
{
  "data": [
    {
      "x": "Mon",
      "y": 2
    },
    {
      "x": "Tue",
      "y": 5
    }
  ],
  "height": 180
}
```

#### `PieChart`

```json
{
  "data": [
    {
      "label": "A",
      "value": 40
    },
    {
      "label": "B",
      "value": 60
    }
  ]
}
```

#### `RadarChart`

```json
{
  "data": [
    {
      "subject": "Speed",
      "A": 80,
      "B": 50
    },
    {
      "subject": "Reliability",
      "A": 70,
      "B": 90
    },
    {
      "subject": "Comfort",
      "A": 60,
      "B": 70
    }
  ],
  "height": 220
}
```

#### `RadialBarChart`

```json
{
  "data": [
    {
      "name": "A",
      "value": 40
    },
    {
      "name": "B",
      "value": 30
    },
    {
      "name": "C",
      "value": 30
    }
  ],
  "height": 220
}
```

#### `SankeyChart`

```json
{
  "nodes": [
    {
      "name": "A"
    },
    {
      "name": "B"
    },
    {
      "name": "C"
    }
  ],
  "links": [
    {
      "source": 0,
      "target": 1,
      "value": 10
    },
    {
      "source": 1,
      "target": 2,
      "value": 10
    }
  ],
  "height": 220
}
```

#### `ScatterChart`

```json
{
  "data": [
    {
      "x": 10,
      "y": 20,
      "label": "A"
    },
    {
      "x": 30,
      "y": 8,
      "label": "B"
    }
  ],
  "height": 200
}
```

#### `StatCard`

```json
{
  "title": "Metric",
  "value": "—",
  "trend": "neutral",
  "trendLabel": ""
}
```

#### `TreemapChart`

```json
{
  "data": {
    "name": "Root",
    "children": [
      {
        "name": "Alpha",
        "size": 400
      },
      {
        "name": "Beta",
        "size": 300
      },
      {
        "name": "Gamma",
        "size": 200
      }
    ]
  },
  "height": 200
}
```

### media

#### `Image`

```json
{
  "src": "https://picsum.photos/seed/aurora/800/400",
  "alt": ""
}
```

### conditional

#### `ShowWhen`

*(no defaultProps in registry)*

---

## 9. Example full documents (target AI response shape)

When asked to **generate UI as JSON**, respond with **one** root object that matches `GenUIDocument`: at minimum `ui` + `state`; add `actions` when using `onClickAction`, `bind`, `tabBind`, `onMountAction`, etc. Do **not** output functions — only data. Below are **valid** examples (Zod-checked at generate time); source files live in `dsl-kb/examples/`.

### Tabs, two-way bind, and a declarative action

*File: `dsl-kb/examples/01-interactive-form-tabs.json` · Use when the user asks for settings, profile, or multi-step forms without navigation.*

```json
{
  "version": "1",
  "state": {
    "ui": {
      "tab": "profile",
      "displayName": ""
    },
    "flags": {
      "saved": false
    }
  },
  "actions": {
    "saveProfile": {
      "type": "SET_STATE",
      "path": "flags.saved",
      "value": true
    }
  },
  "ui": {
    "type": "Stack",
    "props": {
      "gap": 4,
      "className": "w-full max-w-lg min-w-0 p-4"
    },
    "children": [
      {
        "type": "Text",
        "props": {
          "variant": "title",
          "children": "Account"
        }
      },
      {
        "type": "Tabs",
        "props": {
          "tabBind": "ui.tab",
          "variant": "line",
          "className": "w-full"
        },
        "children": [
          {
            "type": "TabList",
            "children": [
              {
                "type": "Tab",
                "props": {
                  "value": "profile",
                  "children": "Profile"
                }
              },
              {
                "type": "Tab",
                "props": {
                  "value": "security",
                  "children": "Security"
                }
              }
            ]
          },
          {
            "type": "TabPanel",
            "props": {
              "value": "profile",
              "className": "pt-4"
            },
            "children": [
              {
                "type": "Input",
                "props": {
                  "label": "Display name",
                  "bind": "ui.displayName",
                  "placeholder": "Ada Lovelace"
                }
              }
            ]
          },
          {
            "type": "TabPanel",
            "props": {
              "value": "security",
              "className": "pt-4"
            },
            "children": [
              {
                "type": "Text",
                "props": {
                  "variant": "body",
                  "children": "Rotate API keys and review sessions in your host app."
                }
              }
            ]
          }
        ]
      },
      {
        "type": "Row",
        "props": {
          "gap": 2,
          "className": "items-center"
        },
        "children": [
          {
            "type": "Button",
            "props": {
              "children": "Save",
              "variant": "primary",
              "onClickAction": "saveProfile"
            }
          },
          {
            "type": "ShowWhen",
            "props": {
              "when": "{{state.flags.saved}}"
            },
            "children": [
              {
                "type": "Text",
                "props": {
                  "variant": "muted",
                  "children": "Saved (demo)"
                }
              }
            ]
          }
        ]
      }
    ]
  }
}
```

### Data table + pagination driven by state

*File: `dsl-kb/examples/02-table-pagination.json` · Use when listing rows from state with page controls; extend with onMountAction + API_CALL for live data.*

```json
{
  "version": "1",
  "state": {
    "invoices": {
      "rows": [
        {
          "id": "inv-1001",
          "customer": "Acme Corp",
          "total": 1200,
          "status": "Paid"
        },
        {
          "id": "inv-1002",
          "customer": "Globex",
          "total": 850,
          "status": "Open"
        }
      ],
      "page": 1,
      "totalPages": 4
    }
  },
  "actions": {
    "goPage": {
      "type": "SET_STATE",
      "path": "invoices.page",
      "value": "{{event.page}}"
    }
  },
  "ui": {
    "type": "Stack",
    "props": {
      "gap": 4,
      "className": "w-full min-w-0 p-4"
    },
    "children": [
      {
        "type": "Text",
        "props": {
          "variant": "title",
          "children": "Invoices"
        }
      },
      {
        "type": "Table",
        "props": {
          "columns": [
            {
              "key": "id",
              "label": "ID",
              "sortable": true
            },
            {
              "key": "customer",
              "label": "Customer",
              "sortable": true
            },
            {
              "key": "total",
              "label": "Total",
              "sortable": false
            },
            {
              "key": "status",
              "label": "Status",
              "sortable": true
            }
          ],
          "rows": "{{state.invoices.rows}}",
          "className": "w-full min-w-0"
        }
      },
      {
        "type": "Pagination",
        "props": {
          "page": "{{state.invoices.page}}",
          "totalPages": "{{state.invoices.totalPages}}",
          "onPageChangeAction": "goPage"
        }
      }
    ]
  }
}
```

### Conditional blocks, modal, and action wiring

*File: `dsl-kb/examples/03-modal-showwhen-alert.json` · Use for confirmations, banners, and toggling visibility via SET_STATE.*

```json
{
  "version": "1",
  "state": {
    "ui": {
      "modalOpen": false,
      "bannerVisible": true
    }
  },
  "actions": {
    "openModal": {
      "type": "SET_STATE",
      "path": "ui.modalOpen",
      "value": true
    },
    "closeModal": {
      "type": "SET_STATE",
      "path": "ui.modalOpen",
      "value": false
    },
    "dismissBanner": {
      "type": "SET_STATE",
      "path": "ui.bannerVisible",
      "value": false
    }
  },
  "ui": {
    "type": "Stack",
    "props": {
      "gap": 4,
      "className": "w-full max-w-2xl min-w-0 p-4"
    },
    "children": [
      {
        "type": "ShowWhen",
        "props": {
          "when": "{{state.ui.bannerVisible}}"
        },
        "children": [
          {
            "type": "Alert",
            "props": {
              "variant": "info",
              "title": "Maintenance",
              "children": "Read-only mode this weekend.",
              "className": "w-full"
            }
          },
          {
            "type": "Button",
            "props": {
              "children": "Dismiss",
              "variant": "secondary",
              "size": "sm",
              "onClickAction": "dismissBanner",
              "className": "mt-2"
            }
          }
        ]
      },
      {
        "type": "Button",
        "props": {
          "children": "Open details",
          "variant": "primary",
          "onClickAction": "openModal"
        }
      },
      {
        "type": "Modal",
        "props": {
          "isOpen": "{{state.ui.modalOpen}}",
          "title": "Details",
          "onCloseAction": "closeModal",
          "size": "md"
        },
        "children": [
          {
            "type": "Stack",
            "props": {
              "gap": 3
            },
            "children": [
              {
                "type": "Text",
                "props": {
                  "variant": "body",
                  "children": "Content is composed from nested `children` nodes; close uses onCloseAction → SET_STATE."
                }
              },
              {
                "type": "Row",
                "props": {
                  "gap": 2,
                  "className": "justify-end"
                },
                "children": [
                  {
                    "type": "Button",
                    "props": {
                      "children": "Close",
                      "variant": "secondary",
                      "onClickAction": "closeModal"
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
```

### Split layout with charts and KPI cards

*File: `dsl-kb/examples/04-dashboard-charts-split.json` · Use for analytics-style dashboards: charts read series/data from state.*

```json
{
  "version": "1",
  "state": {
    "kpis": {
      "revenue": "$2.4M",
      "trend": "up"
    },
    "charts": {
      "bars": [
        {
          "label": "Mon",
          "value": 28
        },
        {
          "label": "Tue",
          "value": 35
        },
        {
          "label": "Wed",
          "value": 22
        }
      ],
      "line": {
        "series": [
          {
            "name": "Ingress",
            "color": "#3b82f6",
            "data": [
              {
                "x": "00:00",
                "y": 12
              },
              {
                "x": "12:00",
                "y": 44
              },
              {
                "x": "20:00",
                "y": 24
              }
            ]
          }
        ]
      }
    }
  },
  "ui": {
    "type": "Stack",
    "props": {
      "gap": 4,
      "className": "w-full min-w-0 p-4"
    },
    "children": [
      {
        "type": "Grid",
        "props": {
          "columns": 2,
          "gap": 4,
          "className": "max-lg:grid-cols-1"
        },
        "children": [
          {
            "type": "StatCard",
            "props": {
              "title": "ARR (proxy)",
              "value": "{{state.kpis.revenue}}",
              "trend": "{{state.kpis.trend}}",
              "trendLabel": "+6%",
              "subtitle": "Finance",
              "className": "shadow-sm"
            }
          },
          {
            "type": "StatCard",
            "props": {
              "title": "Pipeline",
              "value": "—",
              "trend": "neutral",
              "trendLabel": "",
              "subtitle": "Sales",
              "className": "shadow-sm"
            }
          }
        ]
      },
      {
        "type": "SplitPane",
        "props": {
          "direction": "horizontal",
          "defaultSize": 0.5,
          "className": "min-h-[240px] rounded-xl border border-slate-200 dark:border-slate-700"
        },
        "children": [
          {
            "type": "Stack",
            "props": {
              "gap": 2,
              "className": "min-h-[220px] min-w-0 p-3"
            },
            "children": [
              {
                "type": "Text",
                "props": {
                  "variant": "muted",
                  "children": "Volume",
                  "className": "text-xs uppercase tracking-wide"
                }
              },
              {
                "type": "BarChart",
                "props": {
                  "data": "{{state.charts.bars}}",
                  "height": 200,
                  "className": "rounded-lg border border-slate-100 dark:border-slate-800"
                }
              }
            ]
          },
          {
            "type": "Stack",
            "props": {
              "gap": 2,
              "className": "min-h-[220px] min-w-0 p-3"
            },
            "children": [
              {
                "type": "Text",
                "props": {
                  "variant": "muted",
                  "children": "Ingress",
                  "className": "text-xs uppercase tracking-wide"
                }
              },
              {
                "type": "LineChart",
                "props": {
                  "series": "{{state.charts.line.series}}",
                  "height": 200,
                  "className": "rounded-lg border border-slate-100 dark:border-slate-800"
                }
              }
            ]
          }
        ]
      }
    ]
  }
}
```

### Full-screen marketing + analytics cockpit

*File: `dsl-kb/examples/05-fullscreen-marketing-dashboard.json` · Use for dense landing pages, launch consoles, or campaign dashboards: Page hero, KPI grid, segmented range, stepper, tabs, Area+Pie charts, accordion, SplitPane with filtered table + pagination, Drawer and Modal, CHAIN actions.*

```json
{
  "version": "1",
  "state": {
    "ui": {
      "drawerOpen": false,
      "demoModal": false,
      "promoVisible": true,
      "timeRange": "30d",
      "dashTab": "overview",
      "wizardStep": 1,
      "notifyBeta": true,
      "leadEmail": "",
      "leadFilter": "",
      "rolloutPct": 72
    },
    "crm": {
      "rows": [
        {
          "id": 101,
          "title": "Preview row (shown before GET)",
          "userId": 1,
          "completed": false
        },
        {
          "id": 102,
          "title": "Scroll down for KPIs, charts & API tools",
          "userId": 2,
          "completed": true
        },
        {
          "id": 103,
          "title": "Network loads replace this table",
          "userId": 1,
          "completed": false
        }
      ],
      "sortKey": "id",
      "sortDir": "asc",
      "filter": "",
      "columnFilters": {},
      "draftTitle": "Ship campaign v2",
      "patchTitle": "Updated via PATCH",
      "deleteId": "1",
      "lastStatus": ""
    },
    "kpis": {
      "mrr": "$428k",
      "mrrTrend": "up",
      "signups": "12.4k",
      "signupsTrend": "up",
      "sessions": "890k",
      "sessionsTrend": "neutral",
      "conv": "3.8%",
      "convTrend": "down"
    },
    "charts": {
      "area": {
        "series": [
          {
            "name": "Organic",
            "color": "#6366f1",
            "data": [
              {
                "x": "W1",
                "y": 120
              },
              {
                "x": "W2",
                "y": 156
              },
              {
                "x": "W3",
                "y": 142
              },
              {
                "x": "W4",
                "y": 188
              }
            ]
          },
          {
            "name": "Paid",
            "color": "#22c55e",
            "data": [
              {
                "x": "W1",
                "y": 80
              },
              {
                "x": "W2",
                "y": 96
              },
              {
                "x": "W3",
                "y": 110
              },
              {
                "x": "W4",
                "y": 124
              }
            ]
          }
        ]
      },
      "pie": [
        {
          "label": "Search",
          "value": 42
        },
        {
          "label": "Social",
          "value": 28
        },
        {
          "label": "Direct",
          "value": 22
        },
        {
          "label": "Email",
          "value": 8
        }
      ]
    },
    "leads": {
      "rows": [
        {
          "id": "L-901",
          "company": "Northwind",
          "stage": "Qualified",
          "owner": "Asha"
        },
        {
          "id": "L-902",
          "company": "Umbrella",
          "stage": "Meeting",
          "owner": "Ben"
        },
        {
          "id": "L-903",
          "company": "Soylent",
          "stage": "New",
          "owner": "Chen"
        },
        {
          "id": "L-904",
          "company": "Initech",
          "stage": "Won",
          "owner": "Dana"
        },
        {
          "id": "L-905",
          "company": "Vehement",
          "stage": "Qualified",
          "owner": "Asha"
        }
      ],
      "page": 1,
      "totalPages": 6
    }
  },
  "actions": {
    "openDrawer": {
      "type": "SET_STATE",
      "path": "ui.drawerOpen",
      "value": true
    },
    "closeDrawer": {
      "type": "SET_STATE",
      "path": "ui.drawerOpen",
      "value": false
    },
    "openDemo": {
      "type": "SET_STATE",
      "path": "ui.demoModal",
      "value": true
    },
    "closeDemo": {
      "type": "CHAIN",
      "chain": [
        {
          "type": "SET_STATE",
          "path": "ui.demoModal",
          "value": false
        },
        {
          "type": "SET_STATE",
          "path": "ui.leadEmail",
          "value": ""
        }
      ]
    },
    "dismissPromo": {
      "type": "SET_STATE",
      "path": "ui.promoVisible",
      "value": false
    },
    "setTimeRange": {
      "type": "SET_STATE",
      "path": "ui.timeRange",
      "value": "{{event.value}}"
    },
    "goWizard1": {
      "type": "SET_STATE",
      "path": "ui.wizardStep",
      "value": 0
    },
    "goWizard2": {
      "type": "SET_STATE",
      "path": "ui.wizardStep",
      "value": 1
    },
    "goWizard3": {
      "type": "SET_STATE",
      "path": "ui.wizardStep",
      "value": 2
    },
    "leadsPage": {
      "type": "SET_STATE",
      "path": "leads.page",
      "value": "{{event.page}}"
    },
    "loadTodos": {
      "type": "API_CALL",
      "id": "todosApi",
      "url": "https://jsonplaceholder.typicode.com/todos?_limit=20",
      "method": "GET",
      "onSuccess": {
        "chain": [
          {
            "type": "SET_STATE",
            "path": "crm.rows",
            "value": "{{response}}"
          },
          {
            "type": "SET_STATE",
            "path": "crm.lastStatus",
            "value": "GET OK — todos loaded."
          }
        ]
      },
      "onError": {
        "chain": [
          {
            "type": "SET_STATE",
            "path": "crm.lastStatus",
            "value": "GET failed (offline or blocked)."
          }
        ]
      }
    },
    "sortCrm": {
      "type": "CHAIN",
      "chain": [
        {
          "type": "SET_STATE",
          "path": "crm.sortKey",
          "value": "{{event.column}}"
        },
        {
          "type": "SET_STATE",
          "path": "crm.sortDir",
          "value": "asc"
        }
      ]
    },
    "saveTodo": {
      "type": "API_CALL",
      "id": "saveTodoApi",
      "url": "https://jsonplaceholder.typicode.com/todos",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      "body": {
        "title": "{{state.crm.draftTitle}}",
        "completed": false,
        "userId": 1
      },
      "onSuccess": {
        "chain": [
          {
            "type": "SET_STATE",
            "path": "crm.lastStatus",
            "value": "POST 201 — refreshing list…"
          },
          {
            "type": "SET_STATE",
            "path": "crm.draftTitle",
            "value": ""
          },
          {
            "type": "API_CALL",
            "id": "todosApi",
            "url": "https://jsonplaceholder.typicode.com/todos?_limit=20",
            "method": "GET",
            "onSuccess": {
              "chain": [
                {
                  "type": "SET_STATE",
                  "path": "crm.rows",
                  "value": "{{response}}"
                }
              ]
            }
          }
        ]
      },
      "onError": {
        "chain": [
          {
            "type": "SET_STATE",
            "path": "crm.lastStatus",
            "value": "POST failed."
          }
        ]
      }
    },
    "patchTodo": {
      "type": "API_CALL",
      "id": "patchTodoApi",
      "url": "https://jsonplaceholder.typicode.com/todos/1",
      "method": "PATCH",
      "headers": {
        "Content-Type": "application/json"
      },
      "body": {
        "title": "{{state.crm.patchTitle}}",
        "completed": true
      },
      "onSuccess": {
        "chain": [
          {
            "type": "SET_STATE",
            "path": "crm.lastStatus",
            "value": "PATCH #1 OK — refreshing…"
          },
          {
            "type": "API_CALL",
            "id": "todosApi",
            "url": "https://jsonplaceholder.typicode.com/todos?_limit=20",
            "method": "GET",
            "onSuccess": {
              "chain": [
                {
                  "type": "SET_STATE",
                  "path": "crm.rows",
                  "value": "{{response}}"
                }
              ]
            }
          }
        ]
      },
      "onError": {
        "chain": [
          {
            "type": "SET_STATE",
            "path": "crm.lastStatus",
            "value": "PATCH failed."
          }
        ]
      }
    },
    "deleteTodo": {
      "type": "API_CALL",
      "id": "deleteTodoApi",
      "url": "https://jsonplaceholder.typicode.com/todos/{{state.crm.deleteId}}",
      "method": "DELETE",
      "onSuccess": {
        "chain": [
          {
            "type": "SET_STATE",
            "path": "crm.lastStatus",
            "value": "DELETE sent — refreshing…"
          },
          {
            "type": "API_CALL",
            "id": "todosApi",
            "url": "https://jsonplaceholder.typicode.com/todos?_limit=20",
            "method": "GET",
            "onSuccess": {
              "chain": [
                {
                  "type": "SET_STATE",
                  "path": "crm.rows",
                  "value": "{{response}}"
                }
              ]
            }
          }
        ]
      },
      "onError": {
        "chain": [
          {
            "type": "SET_STATE",
            "path": "crm.lastStatus",
            "value": "DELETE failed."
          }
        ]
      }
    }
  },
  "onMountAction": "loadTodos",
  "ui": {
    "type": "Page",
    "props": {
      "className": "min-h-screen w-full min-w-0 bg-gradient-to-b from-indigo-50/80 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
    },
    "children": [
      {
        "type": "Stack",
        "props": {
          "gap": 0,
          "className": "w-full min-w-0"
        },
        "children": [
          {
            "type": "Box",
            "props": {
              "className": "sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90"
            },
            "children": [
              {
                "type": "Container",
                "props": {
                  "maxWidth": "full",
                  "className": "max-w-7xl px-4 py-3"
                },
                "children": [
                  {
                    "type": "Box",
                    "props": {
                      "className": "flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between w-full min-w-0"
                    },
                    "children": [
                      {
                        "type": "Row",
                        "props": {
                          "gap": 2,
                          "className": "items-center min-w-0 shrink-0"
                        },
                        "children": [
                          {
                            "type": "Text",
                            "props": {
                              "variant": "title",
                              "className": "text-lg font-semibold tracking-tight",
                              "children": "Aurora Launch"
                            }
                          },
                          {
                            "type": "Badge",
                            "props": {
                              "variant": "primary",
                              "children": "GA"
                            }
                          }
                        ]
                      },
                      {
                        "type": "Breadcrumb",
                        "props": {
                          "className": "hidden xl:flex text-sm w-full min-w-0 overflow-x-auto order-2 xl:order-none"
                        },
                        "children": [
                          {
                            "type": "BreadcrumbItem",
                            "props": {
                              "children": "Marketing"
                            }
                          },
                          {
                            "type": "BreadcrumbItem",
                            "props": {
                              "children": "Campaign console"
                            }
                          }
                        ]
                      },
                      {
                        "type": "Box",
                        "props": {
                          "className": "flex flex-wrap gap-x-2 gap-y-2 w-full min-w-0 xl:max-w-[min(100%,42rem)] xl:ml-auto justify-start xl:justify-end"
                        },
                        "children": [
                          {
                            "type": "Dropdown",
                            "props": {
                              "triggerLabel": "Workspace",
                              "placement": "bottom-end",
                              "className": "min-w-0 shrink"
                            },
                            "children": [
                              {
                                "type": "DropdownItem",
                                "props": {
                                  "children": "Switch org…"
                                }
                              },
                              {
                                "type": "DropdownItem",
                                "props": {
                                  "children": "Invite teammate"
                                }
                              }
                            ]
                          },
                          {
                            "type": "Tooltip",
                            "props": {
                              "content": "Product updates"
                            },
                            "children": [
                              {
                                "type": "Button",
                                "props": {
                                  "variant": "outline",
                                  "size": "sm",
                                  "className": "shrink-0 whitespace-nowrap text-xs sm:text-sm",
                                  "children": "What’s new"
                                }
                              }
                            ]
                          },
                          {
                            "type": "Button",
                            "props": {
                              "variant": "primary",
                              "size": "sm",
                              "onClickAction": "openDemo",
                              "className": "shrink-0 whitespace-nowrap text-xs sm:text-sm",
                              "children": "Book demo"
                            }
                          },
                          {
                            "type": "Button",
                            "props": {
                              "variant": "secondary",
                              "size": "sm",
                              "onClickAction": "openDrawer",
                              "className": "shrink-0 whitespace-nowrap text-xs sm:text-sm",
                              "children": "Menu"
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "type": "ShowWhen",
            "props": {
              "when": "{{state.ui.promoVisible}}"
            },
            "children": [
              {
                "type": "Container",
                "props": {
                  "maxWidth": "full",
                  "className": "max-w-7xl px-4 pt-4 flex flex-col gap-1"
                },
                "children": [
                  {
                    "type": "Alert",
                    "props": {
                      "variant": "info",
                      "title": "Webinar: scale your funnel",
                      "className": "w-full",
                      "children": "Live session Thursday — seats limited."
                    }
                  },
                  {
                    "type": "Button",
                    "props": {
                      "variant": "ghost",
                      "size": "sm",
                      "onClickAction": "dismissPromo",
                      "className": "-mt-1 self-start sm:self-auto",
                      "children": "Dismiss"
                    }
                  }
                ]
              }
            ]
          },
          {
            "type": "Container",
            "props": {
              "maxWidth": "full",
              "className": "max-w-7xl px-4 py-6 sm:py-8 w-full mx-auto"
            },
            "children": [
              {
                "type": "Stack",
                "props": {
                  "gap": 6,
                  "className": "w-full min-w-0 md:gap-8"
                },
                "children": [
                  {
                    "type": "Text",
                    "props": {
                      "variant": "muted",
                      "className": "text-xs sm:text-sm text-center sm:text-left rounded-lg border border-dashed border-slate-200/90 bg-white/50 px-3 py-2 dark:border-slate-600 dark:bg-slate-900/30",
                      "children": "↓ Scroll for KPI cards, charts, onboarding, tabs, live API (filter/sort/CRUD), static pipeline table, FAQ, then try Menu / Book demo for drawer & modal."
                    }
                  },
                  {
                    "type": "Grid",
                    "props": {
                      "columns": 1,
                      "gap": 6,
                      "className": "lg:grid-cols-2 items-start"
                    },
                    "children": [
                      {
                        "type": "Stack",
                        "props": {
                          "gap": 4,
                          "className": "min-w-0"
                        },
                        "children": [
                          {
                            "type": "Text",
                            "props": {
                              "variant": "title",
                              "className": "text-2xl sm:text-4xl font-bold leading-tight text-balance break-words",
                              "children": "Turn traffic into pipeline — without another tab."
                            }
                          },
                          {
                            "type": "Text",
                            "props": {
                              "variant": "muted",
                              "className": "text-base w-full max-w-3xl",
                              "children": "Full-screen marketing shell: hero, KPIs, charts, CRM-style table, drawer, and modal — all declarative JSON."
                            }
                          },
                          {
                            "type": "Row",
                            "props": {
                              "gap": 3,
                              "className": "flex-wrap items-stretch sm:items-center"
                            },
                            "children": [
                              {
                                "type": "Box",
                                "props": {
                                  "className": "w-full min-w-0 max-w-full overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:max-w-none sm:overflow-visible"
                                },
                                "children": [
                                  {
                                    "type": "SegmentedControl",
                                    "props": {
                                      "aria-label": "Reporting range",
                                      "value": "{{state.ui.timeRange}}",
                                      "onChangeAction": "setTimeRange",
                                      "className": "max-w-full",
                                      "options": [
                                        {
                                          "value": "24h",
                                          "label": "24h"
                                        },
                                        {
                                          "value": "7d",
                                          "label": "7d"
                                        },
                                        {
                                          "value": "30d",
                                          "label": "30d"
                                        }
                                      ]
                                    }
                                  }
                                ]
                              },
                              {
                                "type": "Button",
                                "props": {
                                  "variant": "primary",
                                  "onClickAction": "openDemo",
                                  "children": "Start trial"
                                }
                              },
                              {
                                "type": "Link",
                                "props": {
                                  "href": "#pricing",
                                  "children": "View pricing"
                                }
                              }
                            ]
                          },
                          {
                            "type": "Row",
                            "props": {
                              "gap": 4,
                              "className": "items-center flex-wrap"
                            },
                            "children": [
                              {
                                "type": "Text",
                                "props": {
                                  "variant": "muted",
                                  "className": "text-sm",
                                  "children": "Beta emails"
                                }
                              },
                              {
                                "type": "Switch",
                                "props": {
                                  "bind": "ui.notifyBeta",
                                  "label": "On"
                                }
                              },
                              {
                                "type": "CopyButton",
                                "props": {
                                  "textToCopy": "hello@aurora.example",
                                  "className": "text-xs",
                                  "children": "Copy contact"
                                }
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "type": "Stack",
                        "props": {
                          "gap": 2,
                          "className": "rounded-2xl overflow-hidden border border-slate-200/80 shadow-lg dark:border-slate-700"
                        },
                        "children": [
                          {
                            "type": "Image",
                            "props": {
                              "src": "https://picsum.photos/seed/aurora-marketing/900/520",
                              "alt": "Product screenshot",
                              "className": "w-full h-44 sm:h-52 object-cover"
                            }
                          },
                          {
                            "type": "Box",
                            "props": {
                              "className": "p-4 bg-white/90 dark:bg-slate-900/80"
                            },
                            "children": [
                              {
                                "type": "Row",
                                "props": {
                                  "gap": 2,
                                  "className": "items-center mb-2"
                                },
                                "children": [
                                  {
                                    "type": "Icon",
                                    "props": {
                                      "name": "maximize",
                                      "size": 20
                                    }
                                  },
                                  {
                                    "type": "Text",
                                    "props": {
                                      "variant": "body",
                                      "className": "font-medium",
                                      "children": "Immersive preview"
                                    }
                                  }
                                ]
                              },
                              {
                                "type": "Text",
                                "props": {
                                  "variant": "muted",
                                  "className": "text-sm",
                                  "children": "Pair with `Page` + `Container` for full-viewport layouts."
                                }
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "Stack",
                    "props": {
                      "gap": 3,
                      "className": "w-full"
                    },
                    "children": [
                      {
                        "type": "Text",
                        "props": {
                          "variant": "muted",
                          "className": "text-xs uppercase tracking-wider",
                          "children": "Onboarding checklist"
                        }
                      },
                      {
                        "type": "Stepper",
                        "props": {
                          "steps": [
                            {
                              "id": "connect",
                              "title": "Connect data",
                              "description": "Sources"
                            },
                            {
                              "id": "audience",
                              "title": "Define ICP",
                              "description": "Segments"
                            },
                            {
                              "id": "launch",
                              "title": "Go live",
                              "description": "Campaign"
                            }
                          ],
                          "activeIndex": "{{state.ui.wizardStep}}",
                          "className": "w-full"
                        }
                      },
                      {
                        "type": "Row",
                        "props": {
                          "gap": 2,
                          "className": "flex-wrap"
                        },
                        "children": [
                          {
                            "type": "Button",
                            "props": {
                              "size": "sm",
                              "variant": "outline",
                              "onClickAction": "goWizard1",
                              "children": "Step 1"
                            }
                          },
                          {
                            "type": "Button",
                            "props": {
                              "size": "sm",
                              "variant": "outline",
                              "onClickAction": "goWizard2",
                              "children": "Step 2"
                            }
                          },
                          {
                            "type": "Button",
                            "props": {
                              "size": "sm",
                              "variant": "outline",
                              "onClickAction": "goWizard3",
                              "children": "Step 3"
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "Grid",
                    "props": {
                      "columns": 1,
                      "gap": 4,
                      "className": "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
                    },
                    "children": [
                      {
                        "type": "StatCard",
                        "props": {
                          "title": "MRR (est.)",
                          "value": "{{state.kpis.mrr}}",
                          "trend": "{{state.kpis.mrrTrend}}",
                          "trendLabel": "+9%",
                          "subtitle": "Finance",
                          "className": "shadow-sm"
                        }
                      },
                      {
                        "type": "StatCard",
                        "props": {
                          "title": "Signups",
                          "value": "{{state.kpis.signups}}",
                          "trend": "{{state.kpis.signupsTrend}}",
                          "trendLabel": "+3%",
                          "subtitle": "Growth",
                          "className": "shadow-sm"
                        }
                      },
                      {
                        "type": "StatCard",
                        "props": {
                          "title": "Sessions",
                          "value": "{{state.kpis.sessions}}",
                          "trend": "{{state.kpis.sessionsTrend}}",
                          "trendLabel": "—",
                          "subtitle": "Web",
                          "className": "shadow-sm"
                        }
                      },
                      {
                        "type": "StatCard",
                        "props": {
                          "title": "Conv. rate",
                          "value": "{{state.kpis.conv}}",
                          "trend": "{{state.kpis.convTrend}}",
                          "trendLabel": "-0.2pp",
                          "subtitle": "Funnel",
                          "className": "shadow-sm"
                        }
                      }
                    ]
                  },
                  {
                    "type": "Tabs",
                    "props": {
                      "tabBind": "ui.dashTab",
                      "variant": "enclosed",
                      "className": "w-full"
                    },
                    "children": [
                      {
                        "type": "TabList",
                        "props": {
                          "className": "min-w-0 w-full overflow-x-auto"
                        },
                        "children": [
                          {
                            "type": "Tab",
                            "props": {
                              "value": "overview",
                              "children": "Overview"
                            }
                          },
                          {
                            "type": "Tab",
                            "props": {
                              "value": "campaigns",
                              "children": "Campaigns"
                            }
                          },
                          {
                            "type": "Tab",
                            "props": {
                              "value": "funnel",
                              "children": "Funnel"
                            }
                          }
                        ]
                      },
                      {
                        "type": "TabPanel",
                        "props": {
                          "value": "overview"
                        },
                        "children": [
                          {
                            "type": "Text",
                            "props": {
                              "variant": "body",
                              "className": "mb-4",
                              "children": "Blend acquisition and product analytics in one surface. Charts read from `state.charts`."
                            }
                          }
                        ]
                      },
                      {
                        "type": "TabPanel",
                        "props": {
                          "value": "campaigns"
                        },
                        "children": [
                          {
                            "type": "Row",
                            "props": {
                              "gap": 3,
                              "className": "items-start flex-wrap"
                            },
                            "children": [
                              {
                                "type": "Avatar",
                                "props": {
                                  "name": "Campaign A",
                                  "size": "md"
                                }
                              },
                              {
                                "type": "Stack",
                                "props": {
                                  "gap": 1
                                },
                                "children": [
                                  {
                                    "type": "Text",
                                    "props": {
                                      "variant": "body",
                                      "className": "font-medium",
                                      "children": "Lifecycle — enterprise"
                                    }
                                  },
                                  {
                                    "type": "Text",
                                    "props": {
                                      "variant": "muted",
                                      "className": "text-sm",
                                      "children": "Use `TabPanel` to isolate dense copy from the default overview."
                                    }
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "type": "TabPanel",
                        "props": {
                          "value": "funnel"
                        },
                        "children": [
                          {
                            "type": "EmptyState",
                            "props": {
                              "title": "Connect warehouse",
                              "description": "Wire `onMountAction` + API_CALL to hydrate funnel stages."
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "Grid",
                    "props": {
                      "columns": 1,
                      "gap": 6,
                      "className": "lg:grid-cols-2"
                    },
                    "children": [
                      {
                        "type": "Stack",
                        "props": {
                          "gap": 2,
                          "className": "min-w-0"
                        },
                        "children": [
                          {
                            "type": "Text",
                            "props": {
                              "variant": "muted",
                              "className": "text-xs uppercase tracking-wider",
                              "children": "Traffic mix (area)"
                            }
                          },
                          {
                            "type": "AreaChart",
                            "props": {
                              "series": "{{state.charts.area.series}}",
                              "stacked": true,
                              "height": 260,
                              "showDots": false,
                              "className": "rounded-xl border border-slate-200 dark:border-slate-700 p-2"
                            }
                          }
                        ]
                      },
                      {
                        "type": "Stack",
                        "props": {
                          "gap": 2,
                          "className": "min-w-0"
                        },
                        "children": [
                          {
                            "type": "Text",
                            "props": {
                              "variant": "muted",
                              "className": "text-xs uppercase tracking-wider",
                              "children": "Channel share"
                            }
                          },
                          {
                            "type": "PieChart",
                            "props": {
                              "data": "{{state.charts.pie}}",
                              "donut": true,
                              "showLabels": true,
                              "size": 240,
                              "className": "mx-auto"
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "Stack",
                    "props": {
                      "gap": 2,
                      "className": "w-full max-w-xl"
                    },
                    "children": [
                      {
                        "type": "Text",
                        "props": {
                          "variant": "body",
                          "className": "text-sm",
                          "children": "Progressive rollout"
                        }
                      },
                      {
                        "type": "Progress",
                        "props": {
                          "value": "{{state.ui.rolloutPct}}",
                          "max": 100,
                          "className": "h-2"
                        }
                      },
                      {
                        "type": "Text",
                        "props": {
                          "variant": "muted",
                          "className": "text-xs",
                          "children": "Target: 100% by next sprint"
                        }
                      }
                    ]
                  },
                  {
                    "type": "Card",
                    "props": {
                      "className": "shadow-sm"
                    },
                    "children": [
                      {
                        "type": "CardHeader",
                        "props": {
                          "children": "FAQ"
                        }
                      },
                      {
                        "type": "CardBody",
                        "children": [
                          {
                            "type": "Accordion",
                            "props": {
                              "defaultValue": "a1",
                              "className": "w-full"
                            },
                            "children": [
                              {
                                "type": "AccordionItem",
                                "props": {
                                  "value": "a1"
                                },
                                "children": [
                                  {
                                    "type": "AccordionTrigger",
                                    "props": {
                                      "children": "How do actions compose?"
                                    }
                                  },
                                  {
                                    "type": "AccordionContent",
                                    "props": {
                                      "children": "Use `CHAIN` for multi-step updates (e.g. close modal and reset fields)."
                                    }
                                  }
                                ]
                              },
                              {
                                "type": "AccordionItem",
                                "props": {
                                  "value": "a2"
                                },
                                "children": [
                                  {
                                    "type": "AccordionTrigger",
                                    "props": {
                                      "children": "Where do charts get data?"
                                    }
                                  },
                                  {
                                    "type": "AccordionContent",
                                    "props": {
                                      "children": "Prefer `state.*` plus `API_CALL` on success to merge hydrated series."
                                    }
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "Card",
                    "props": {
                      "className": "shadow-sm border border-primary-200/50 dark:border-primary-900/40"
                    },
                    "children": [
                      {
                        "type": "CardHeader",
                        "props": {
                          "children": "Live API — load, filter, sort, create, update, delete"
                        }
                      },
                      {
                        "type": "CardBody",
                        "children": [
                          {
                            "type": "Stack",
                            "props": {
                              "gap": 4,
                              "className": "w-full min-w-0"
                            },
                            "children": [
                              {
                                "type": "Text",
                                "props": {
                                  "variant": "muted",
                                  "className": "text-sm leading-relaxed",
                                  "children": "Document `onMountAction` runs GET todos. Table: global search (`filterBind`), per-column filters (`columnFiltersBind`), sortable headers (`onSortAction` + `CHAIN`). POST creates a todo, PATCH updates id 1, DELETE uses dynamic URL `…/todos/{{state.crm.deleteId}}`; each write chains a GET to refresh. Requires network (jsonplaceholder.typicode.com)."
                                }
                              },
                              {
                                "type": "Row",
                                "props": {
                                  "gap": 2,
                                  "className": "flex-wrap items-center"
                                },
                                "children": [
                                  {
                                    "type": "Button",
                                    "props": {
                                      "variant": "outline",
                                      "size": "sm",
                                      "onClickAction": "loadTodos",
                                      "children": "Refresh (GET)"
                                    }
                                  },
                                  {
                                    "type": "ShowWhen",
                                    "props": {
                                      "loadingKey": "todosApi"
                                    },
                                    "children": [
                                      {
                                        "type": "Row",
                                        "props": {
                                          "gap": 2,
                                          "className": "items-center text-sm text-slate-600 dark:text-slate-300"
                                        },
                                        "children": [
                                          {
                                            "type": "Spinner",
                                            "props": {
                                              "size": "sm"
                                            }
                                          },
                                          {
                                            "type": "Text",
                                            "props": {
                                              "variant": "muted",
                                              "children": "Loading…"
                                            }
                                          }
                                        ]
                                      }
                                    ]
                                  },
                                  {
                                    "type": "ShowWhen",
                                    "props": {
                                      "loadingKey": "saveTodoApi"
                                    },
                                    "children": [
                                      {
                                        "type": "Text",
                                        "props": {
                                          "variant": "muted",
                                          "className": "text-xs",
                                          "children": "POST…"
                                        }
                                      }
                                    ]
                                  },
                                  {
                                    "type": "ShowWhen",
                                    "props": {
                                      "loadingKey": "patchTodoApi"
                                    },
                                    "children": [
                                      {
                                        "type": "Text",
                                        "props": {
                                          "variant": "muted",
                                          "className": "text-xs",
                                          "children": "PATCH…"
                                        }
                                      }
                                    ]
                                  },
                                  {
                                    "type": "ShowWhen",
                                    "props": {
                                      "loadingKey": "deleteTodoApi"
                                    },
                                    "children": [
                                      {
                                        "type": "Text",
                                        "props": {
                                          "variant": "muted",
                                          "className": "text-xs",
                                          "children": "DELETE…"
                                        }
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                "type": "Text",
                                "props": {
                                  "variant": "body",
                                  "className": "text-xs font-mono text-slate-600 dark:text-slate-300 min-h-[1.25rem]",
                                  "children": "{{state.crm.lastStatus}}"
                                }
                              },
                              {
                                "type": "Table",
                                "props": {
                                  "columns": [
                                    {
                                      "key": "id",
                                      "label": "ID",
                                      "sortable": true,
                                      "filterable": true
                                    },
                                    {
                                      "key": "title",
                                      "label": "Title",
                                      "sortable": true,
                                      "filterable": true
                                    },
                                    {
                                      "key": "userId",
                                      "label": "User",
                                      "sortable": true,
                                      "filterable": true
                                    },
                                    {
                                      "key": "completed",
                                      "label": "Done",
                                      "sortable": true
                                    }
                                  ],
                                  "rows": "{{state.crm.rows}}",
                                  "sortKey": "{{state.crm.sortKey}}",
                                  "sortDir": "{{state.crm.sortDir}}",
                                  "onSortAction": "sortCrm",
                                  "filterBind": "crm.filter",
                                  "columnFiltersBind": "crm.columnFilters",
                                  "filterPlaceholder": "Search todos…",
                                  "className": "text-sm",
                                  "tableWrapperClassName": "rounded-lg border border-slate-200 dark:border-slate-700 max-h-[min(80vh,28rem)] overflow-y-auto"
                                }
                              },
                              {
                                "type": "Text",
                                "props": {
                                  "variant": "muted",
                                  "className": "text-xs uppercase tracking-wide",
                                  "children": "Writes"
                                }
                              },
                              {
                                "type": "Box",
                                "props": {
                                  "className": "flex flex-col gap-2 sm:flex-row sm:items-end sm:gap-3 w-full min-w-0"
                                },
                                "children": [
                                  {
                                    "type": "Input",
                                    "props": {
                                      "label": "New todo title (POST)",
                                      "bind": "crm.draftTitle",
                                      "className": "w-full min-w-0 flex-1"
                                    }
                                  },
                                  {
                                    "type": "Button",
                                    "props": {
                                      "variant": "primary",
                                      "size": "sm",
                                      "onClickAction": "saveTodo",
                                      "className": "shrink-0 w-full sm:w-auto",
                                      "children": "Create (POST)"
                                    }
                                  }
                                ]
                              },
                              {
                                "type": "Row",
                                "props": {
                                  "gap": 2,
                                  "className": "flex-wrap items-end w-full"
                                },
                                "children": [
                                  {
                                    "type": "Input",
                                    "props": {
                                      "label": "PATCH title for todo #1",
                                      "bind": "crm.patchTitle",
                                      "className": "min-w-0 flex-1"
                                    }
                                  },
                                  {
                                    "type": "Button",
                                    "props": {
                                      "variant": "outline",
                                      "size": "sm",
                                      "onClickAction": "patchTodo",
                                      "children": "Update #1 (PATCH)"
                                    }
                                  }
                                ]
                              },
                              {
                                "type": "Row",
                                "props": {
                                  "gap": 2,
                                  "className": "flex-wrap items-end w-full"
                                },
                                "children": [
                                  {
                                    "type": "Input",
                                    "props": {
                                      "label": "DELETE id in URL",
                                      "bind": "crm.deleteId",
                                      "className": "w-full max-w-[12rem]"
                                    }
                                  },
                                  {
                                    "type": "Button",
                                    "props": {
                                      "variant": "danger",
                                      "size": "sm",
                                      "onClickAction": "deleteTodo",
                                      "children": "Delete (DELETE)"
                                    }
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "Divider"
                  },
                  {
                    "type": "Grid",
                    "props": {
                      "columns": 1,
                      "gap": 0,
                      "className": "lg:grid-cols-2 min-h-[280px] lg:min-h-[320px] rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-700"
                    },
                    "children": [
                      {
                        "type": "Stack",
                        "props": {
                          "gap": 3,
                          "className": "min-h-[240px] lg:min-h-[300px] min-w-0 p-4"
                        },
                        "children": [
                          {
                            "type": "Text",
                            "props": {
                              "variant": "title",
                              "className": "text-lg",
                              "children": "Pipeline"
                            }
                          },
                          {
                            "type": "Table",
                            "props": {
                              "columns": [
                                {
                                  "key": "id",
                                  "label": "ID",
                                  "sortable": true
                                },
                                {
                                  "key": "company",
                                  "label": "Company",
                                  "sortable": true
                                },
                                {
                                  "key": "stage",
                                  "label": "Stage",
                                  "sortable": true
                                },
                                {
                                  "key": "owner",
                                  "label": "Owner",
                                  "sortable": true
                                }
                              ],
                              "rows": "{{state.leads.rows}}",
                              "filterBind": "ui.leadFilter",
                              "className": "w-full min-w-0 text-sm"
                            }
                          },
                          {
                            "type": "Pagination",
                            "props": {
                              "page": "{{state.leads.page}}",
                              "totalPages": "{{state.leads.totalPages}}",
                              "onPageChangeAction": "leadsPage"
                            }
                          }
                        ]
                      },
                      {
                        "type": "Stack",
                        "props": {
                          "gap": 3,
                          "className": "min-h-[240px] lg:min-h-[300px] p-4 bg-slate-50/80 dark:bg-slate-800/40"
                        },
                        "children": [
                          {
                            "type": "Text",
                            "props": {
                              "variant": "title",
                              "className": "text-base",
                              "children": "Side insights"
                            }
                          },
                          {
                            "type": "Alert",
                            "props": {
                              "variant": "success",
                              "title": "Filter is bound",
                              "children": "`filterBind` syncs the table filter to `state` for client-side narrowing."
                            }
                          },
                          {
                            "type": "Row",
                            "props": {
                              "gap": 2,
                              "className": "items-center text-sm text-slate-600 dark:text-slate-300"
                            },
                            "children": [
                              {
                                "type": "Kbd",
                                "props": {
                                  "children": "⌘K"
                                }
                              },
                              {
                                "type": "Text",
                                "props": {
                                  "variant": "muted",
                                  "children": "Command palette placeholder"
                                }
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "Drawer",
        "props": {
          "isOpen": "{{state.ui.drawerOpen}}",
          "title": "Navigate",
          "placement": "right",
          "onCloseAction": "closeDrawer"
        },
        "children": [
          {
            "type": "Stack",
            "props": {
              "gap": 3,
              "className": "p-2"
            },
            "children": [
              {
                "type": "Button",
                "props": {
                  "variant": "ghost",
                  "className": "justify-start",
                  "onClickAction": "openDemo",
                  "children": "Book demo"
                }
              },
              {
                "type": "Button",
                "props": {
                  "variant": "ghost",
                  "className": "justify-start",
                  "onClickAction": "closeDrawer",
                  "children": "Close"
                }
              }
            ]
          }
        ]
      },
      {
        "type": "Modal",
        "props": {
          "isOpen": "{{state.ui.demoModal}}",
          "title": "Book a demo",
          "size": "md",
          "onCloseAction": "closeDemo"
        },
        "children": [
          {
            "type": "Stack",
            "props": {
              "gap": 4
            },
            "children": [
              {
                "type": "Text",
                "props": {
                  "variant": "body",
                  "children": "We’ll reach out at the email below. This modal uses `CHAIN` on close to reset the field."
                }
              },
              {
                "type": "Input",
                "props": {
                  "label": "Work email",
                  "type": "email",
                  "placeholder": "you@company.com",
                  "bind": "ui.leadEmail"
                }
              },
              {
                "type": "Row",
                "props": {
                  "gap": 2,
                  "className": "justify-end"
                },
                "children": [
                  {
                    "type": "Button",
                    "props": {
                      "variant": "secondary",
                      "onClickAction": "closeDemo",
                      "children": "Cancel"
                    }
                  },
                  {
                    "type": "Button",
                    "props": {
                      "variant": "primary",
                      "onClickAction": "closeDemo",
                      "children": "Submit"
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
```

### Simple marketing landing page

*File: `dsl-kb/examples/06-simple-landing.json` · Use for lightweight product/marketing sites: sticky nav, hero + code teaser, feature cards (Grid), pricing band, newsletter with ShowWhen success, footer; NAVIGATE anchors and CHAIN subscribe.*

```json
{
  "version": "1",
  "state": {
    "ui": {
      "email": "",
      "subscribed": false,
      "showForm": true
    }
  },
  "actions": {
    "goPricing": {
      "type": "NAVIGATE",
      "path": "#pricing"
    },
    "goFeatures": {
      "type": "NAVIGATE",
      "path": "#features"
    },
    "subscribe": {
      "type": "CHAIN",
      "chain": [
        {
          "type": "SET_STATE",
          "path": "ui.subscribed",
          "value": true
        },
        {
          "type": "SET_STATE",
          "path": "ui.showForm",
          "value": false
        },
        {
          "type": "SET_STATE",
          "path": "ui.email",
          "value": ""
        }
      ]
    }
  },
  "ui": {
    "type": "Page",
    "props": {
      "className": "min-h-screen w-full min-w-0 bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100"
    },
    "children": [
      {
        "type": "Box",
        "props": {
          "className": "sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80"
        },
        "children": [
          {
            "type": "Container",
            "props": {
              "maxWidth": "lg"
            },
            "children": [
              {
                "type": "Row",
                "props": {
                  "gap": 3,
                  "className": "min-h-14 w-full flex-wrap items-center justify-between gap-y-3 py-3"
                },
                "children": [
                  {
                    "type": "Row",
                    "props": {
                      "gap": 2,
                      "className": "items-center min-w-0"
                    },
                    "children": [
                      {
                        "type": "Box",
                        "props": {
                          "className": "flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-sm font-bold text-white shadow-sm"
                        },
                        "children": [
                          {
                            "type": "Text",
                            "props": {
                              "variant": "body",
                              "className": "text-sm font-bold text-white",
                              "children": "A"
                            }
                          }
                        ]
                      },
                      {
                        "type": "Text",
                        "props": {
                          "variant": "title",
                          "className": "text-lg font-semibold tracking-tight",
                          "children": "Aurora"
                        }
                      }
                    ]
                  },
                  {
                    "type": "Row",
                    "props": {
                      "gap": 2,
                      "className": "flex-wrap items-center justify-end"
                    },
                    "children": [
                      {
                        "type": "Button",
                        "props": {
                          "variant": "ghost",
                          "size": "sm",
                          "onClickAction": "goFeatures",
                          "className": "text-slate-600 dark:text-slate-300",
                          "children": "Features"
                        }
                      },
                      {
                        "type": "Button",
                        "props": {
                          "variant": "ghost",
                          "size": "sm",
                          "onClickAction": "goPricing",
                          "className": "text-slate-600 dark:text-slate-300",
                          "children": "Pricing"
                        }
                      },
                      {
                        "type": "Button",
                        "props": {
                          "variant": "primary",
                          "size": "sm",
                          "onClickAction": "goPricing",
                          "children": "Get started"
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "Container",
        "props": {
          "maxWidth": "lg",
          "className": "pt-12 pb-16 sm:pt-16 sm:pb-20"
        },
        "children": [
          {
            "type": "Stack",
            "props": {
              "gap": 8,
              "className": "w-full min-w-0 items-center text-center"
            },
            "children": [
              {
                "type": "Badge",
                "props": {
                  "variant": "primary",
                  "className": "px-3 py-1",
                  "children": "Generative UI · JSON first"
                }
              },
              {
                "type": "Stack",
                "props": {
                  "gap": 4,
                  "className": "w-full max-w-3xl min-w-0"
                },
                "children": [
                  {
                    "type": "Text",
                    "props": {
                      "variant": "title",
                      "className": "text-3xl font-bold leading-tight tracking-tight text-balance sm:text-5xl sm:leading-[1.1]",
                      "children": "Ship product UI from data, not boilerplate."
                    }
                  },
                  {
                    "type": "Text",
                    "props": {
                      "variant": "muted",
                      "className": "text-lg leading-relaxed sm:text-xl",
                      "children": "Describe screens in JSON, wire state and actions, and render with Aurora — responsive, accessible components out of the box."
                    }
                  }
                ]
              },
              {
                "type": "Row",
                "props": {
                  "gap": 3,
                  "className": "flex-wrap justify-center"
                },
                "children": [
                  {
                    "type": "Button",
                    "props": {
                      "variant": "primary",
                      "size": "lg",
                      "onClickAction": "goPricing",
                      "className": "min-w-[10rem]",
                      "children": "View pricing"
                    }
                  },
                  {
                    "type": "Button",
                    "props": {
                      "variant": "outline",
                      "size": "lg",
                      "onClickAction": "goFeatures",
                      "className": "min-w-[10rem]",
                      "children": "See features"
                    }
                  }
                ]
              },
              {
                "type": "Box",
                "props": {
                  "className": "mt-4 w-full max-w-4xl rounded-2xl border border-slate-200/80 bg-gradient-to-br from-primary-50/80 to-white p-1 shadow-lg shadow-primary-900/5 dark:border-slate-700 dark:from-primary-950/40 dark:to-slate-900"
                },
                "children": [
                  {
                    "type": "Box",
                    "props": {
                      "className": "rounded-xl bg-slate-900 px-4 py-3 text-left font-mono text-xs text-emerald-300/95 sm:text-sm"
                    },
                    "children": [
                      {
                        "type": "Text",
                        "props": {
                          "variant": "body",
                          "className": "font-mono text-xs leading-relaxed text-emerald-100/90 sm:text-sm",
                          "children": "{ \"type\": \"Stack\", \"props\": { \"className\": \"gap-4\" }, \"children\": [ … ] }"
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "Box",
        "props": {
          "id": "features",
          "className": "scroll-mt-24 border-y border-slate-200/80 bg-white/60 py-16 dark:border-slate-800 dark:bg-slate-900/40"
        },
        "children": [
          {
            "type": "Container",
            "props": {
              "maxWidth": "lg"
            },
            "children": [
              {
                "type": "Stack",
                "props": {
                  "gap": 10,
                  "className": "w-full min-w-0"
                },
                "children": [
                  {
                    "type": "Stack",
                    "props": {
                      "gap": 2,
                      "className": "text-center"
                    },
                    "children": [
                      {
                        "type": "Text",
                        "props": {
                          "variant": "title",
                          "className": "text-2xl font-bold sm:text-3xl",
                          "children": "Everything you need to compose UIs"
                        }
                      },
                      {
                        "type": "Text",
                        "props": {
                          "variant": "muted",
                          "className": "mx-auto max-w-2xl text-base",
                          "children": "Layout, forms, feedback, and data display — all driven from a single document shape."
                        }
                      }
                    ]
                  },
                  {
                    "type": "Grid",
                    "props": {
                      "columns": 1,
                      "gap": 6,
                      "className": "md:grid-cols-3"
                    },
                    "children": [
                      {
                        "type": "Card",
                        "props": {
                          "className": "h-full border-slate-200/90 shadow-sm dark:border-slate-700"
                        },
                        "children": [
                          {
                            "type": "CardBody",
                            "props": {
                              "className": "flex flex-col gap-3 p-6"
                            },
                            "children": [
                              {
                                "type": "Box",
                                "props": {
                                  "className": "flex h-11 w-11 items-center justify-center rounded-xl bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300"
                                },
                                "children": [
                                  {
                                    "type": "Icon",
                                    "props": {
                                      "name": "run",
                                      "size": 22
                                    }
                                  }
                                ]
                              },
                              {
                                "type": "Text",
                                "props": {
                                  "variant": "title",
                                  "className": "text-lg font-semibold",
                                  "children": "Declarative actions"
                                }
                              },
                              {
                                "type": "Text",
                                "props": {
                                  "variant": "muted",
                                  "className": "text-sm leading-relaxed",
                                  "children": "Chain SET_STATE, API_CALL, and NAVIGATE without shipping new React for every tweak."
                                }
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "type": "Card",
                        "props": {
                          "className": "h-full border-slate-200/90 shadow-sm dark:border-slate-700"
                        },
                        "children": [
                          {
                            "type": "CardBody",
                            "props": {
                              "className": "flex flex-col gap-3 p-6"
                            },
                            "children": [
                              {
                                "type": "Box",
                                "props": {
                                  "className": "flex h-11 w-11 items-center justify-center rounded-xl bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300"
                                },
                                "children": [
                                  {
                                    "type": "Icon",
                                    "props": {
                                      "name": "save",
                                      "size": 22
                                    }
                                  }
                                ]
                              },
                              {
                                "type": "Text",
                                "props": {
                                  "variant": "title",
                                  "className": "text-lg font-semibold",
                                  "children": "State-first"
                                }
                              },
                              {
                                "type": "Text",
                                "props": {
                                  "variant": "muted",
                                  "className": "text-sm leading-relaxed",
                                  "children": "Bind inputs, tabs, and filters to paths — expressions resolve from one serializable tree."
                                }
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "type": "Card",
                        "props": {
                          "className": "h-full border-slate-200/90 shadow-sm dark:border-slate-700"
                        },
                        "children": [
                          {
                            "type": "CardBody",
                            "props": {
                              "className": "flex flex-col gap-3 p-6"
                            },
                            "children": [
                              {
                                "type": "Box",
                                "props": {
                                  "className": "flex h-11 w-11 items-center justify-center rounded-xl bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300"
                                },
                                "children": [
                                  {
                                    "type": "Icon",
                                    "props": {
                                      "name": "settings",
                                      "size": 22
                                    }
                                  }
                                ]
                              },
                              {
                                "type": "Text",
                                "props": {
                                  "variant": "title",
                                  "className": "text-lg font-semibold",
                                  "children": "Responsive by default"
                                }
                              },
                              {
                                "type": "Text",
                                "props": {
                                  "variant": "muted",
                                  "className": "text-sm leading-relaxed",
                                  "children": "Use Stack, Grid, and Tailwind className strings to adapt from phones to desktops."
                                }
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "Box",
        "props": {
          "id": "pricing",
          "className": "scroll-mt-24 py-16 sm:py-20"
        },
        "children": [
          {
            "type": "Container",
            "props": {
              "maxWidth": "lg"
            },
            "children": [
              {
                "type": "Stack",
                "props": {
                  "gap": 8,
                  "className": "w-full min-w-0"
                },
                "children": [
                  {
                    "type": "Stack",
                    "props": {
                      "gap": 2,
                      "className": "text-center"
                    },
                    "children": [
                      {
                        "type": "Text",
                        "props": {
                          "variant": "title",
                          "className": "text-2xl font-bold sm:text-3xl",
                          "children": "Simple pricing"
                        }
                      },
                      {
                        "type": "Text",
                        "props": {
                          "variant": "muted",
                          "className": "text-base",
                          "children": "Placeholder tiers for the demo — hook your real plans to state when you integrate."
                        }
                      }
                    ]
                  },
                  {
                    "type": "Grid",
                    "props": {
                      "columns": 1,
                      "gap": 6,
                      "className": "lg:grid-cols-2"
                    },
                    "children": [
                      {
                        "type": "Card",
                        "props": {
                          "className": "border-slate-200 shadow-sm dark:border-slate-700"
                        },
                        "children": [
                          {
                            "type": "CardBody",
                            "props": {
                              "className": "flex flex-col gap-4 p-8"
                            },
                            "children": [
                              {
                                "type": "Text",
                                "props": {
                                  "variant": "title",
                                  "className": "text-xl",
                                  "children": "Starter"
                                }
                              },
                              {
                                "type": "Text",
                                "props": {
                                  "variant": "muted",
                                  "className": "text-sm",
                                  "children": "For prototypes and internal tools."
                                }
                              },
                              {
                                "type": "Text",
                                "props": {
                                  "variant": "title",
                                  "className": "text-3xl font-bold text-slate-900 dark:text-white",
                                  "children": "$0"
                                }
                              },
                              {
                                "type": "Button",
                                "props": {
                                  "variant": "outline",
                                  "className": "w-full",
                                  "onClickAction": "goFeatures",
                                  "children": "Start building"
                                }
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "type": "Card",
                        "props": {
                          "className": "border-2 border-primary-500 shadow-md shadow-primary-500/10 dark:border-primary-400"
                        },
                        "children": [
                          {
                            "type": "CardBody",
                            "props": {
                              "className": "flex flex-col gap-4 p-8"
                            },
                            "children": [
                              {
                                "type": "Row",
                                "props": {
                                  "gap": 2,
                                  "className": "items-center justify-between"
                                },
                                "children": [
                                  {
                                    "type": "Text",
                                    "props": {
                                      "variant": "title",
                                      "className": "text-xl",
                                      "children": "Team"
                                    }
                                  },
                                  {
                                    "type": "Badge",
                                    "props": {
                                      "variant": "primary",
                                      "children": "Popular"
                                    }
                                  }
                                ]
                              },
                              {
                                "type": "Text",
                                "props": {
                                  "variant": "muted",
                                  "className": "text-sm",
                                  "children": "Shared registry, CI lint, and design tokens."
                                }
                              },
                              {
                                "type": "Text",
                                "props": {
                                  "variant": "title",
                                  "className": "text-3xl font-bold text-slate-900 dark:text-white",
                                  "children": "$29"
                                }
                              },
                              {
                                "type": "Button",
                                "props": {
                                  "variant": "primary",
                                  "className": "w-full",
                                  "onClickAction": "subscribe",
                                  "children": "Join waitlist"
                                }
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "Box",
        "props": {
          "className": "border-t border-slate-200/80 bg-slate-50/90 py-14 dark:border-slate-800 dark:bg-slate-950/50"
        },
        "children": [
          {
            "type": "Container",
            "props": {
              "maxWidth": "lg"
            },
            "children": [
              {
                "type": "Stack",
                "props": {
                  "gap": 6,
                  "className": "w-full min-w-0 items-center text-center"
                },
                "children": [
                  {
                    "type": "Text",
                    "props": {
                      "variant": "title",
                      "className": "text-xl sm:text-2xl",
                      "children": "Get the weekly DSL notes"
                    }
                  },
                  {
                    "type": "ShowWhen",
                    "props": {
                      "when": "{{state.ui.subscribed}}"
                    },
                    "children": [
                      {
                        "type": "Alert",
                        "props": {
                          "variant": "success",
                          "title": "You’re on the list",
                          "className": "w-full max-w-md text-left",
                          "children": "Thanks — we’ll send patterns and schema tips to your inbox."
                        }
                      }
                    ]
                  },
                  {
                    "type": "ShowWhen",
                    "props": {
                      "when": "{{state.ui.showForm}}"
                    },
                    "children": [
                      {
                        "type": "Row",
                        "props": {
                          "gap": 2,
                          "className": "w-full max-w-md flex-col sm:flex-row sm:items-stretch"
                        },
                        "children": [
                          {
                            "type": "Input",
                            "props": {
                              "type": "email",
                              "placeholder": "you@company.com",
                              "bind": "ui.email",
                              "className": "w-full min-w-0 flex-1"
                            }
                          },
                          {
                            "type": "Button",
                            "props": {
                              "variant": "primary",
                              "onClickAction": "subscribe",
                              "className": "w-full shrink-0 sm:w-auto",
                              "children": "Subscribe"
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "Box",
        "props": {
          "className": "border-t border-slate-200/80 py-8 dark:border-slate-800"
        },
        "children": [
          {
            "type": "Container",
            "props": {
              "maxWidth": "lg"
            },
            "children": [
              {
                "type": "Row",
                "props": {
                  "gap": 4,
                  "className": "flex-col items-center justify-between gap-y-4 sm:flex-row"
                },
                "children": [
                  {
                    "type": "Text",
                    "props": {
                      "variant": "muted",
                      "className": "text-sm",
                      "children": "© 2026 Aurora UI · DSL example"
                    }
                  },
                  {
                    "type": "Row",
                    "props": {
                      "gap": 4,
                      "className": "text-sm"
                    },
                    "children": [
                      {
                        "type": "Link",
                        "props": {
                          "href": "#features",
                          "variant": "muted",
                          "children": "Features"
                        }
                      },
                      {
                        "type": "Link",
                        "props": {
                          "href": "#pricing",
                          "variant": "muted",
                          "children": "Pricing"
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
```

---

## 10. Machine-readable snapshot

See `dsl-kb/dsl-registry.snapshot.json` for the same registry metadata as structured JSON.
