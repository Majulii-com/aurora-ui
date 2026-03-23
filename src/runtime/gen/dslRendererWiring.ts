/**
 * Human-readable documentation of special JSON `props` interpreted by {@link GenUIRenderer}
 * (not passed verbatim to React). Keep in sync when adding wiring in `gen/GenUIRenderer.tsx`.
 */

export interface GenUIDslWiringRow {
  prop: string;
  /** Short note on which components use this */
  components: string;
  description: string;
}

export const GEN_UI_DSL_WIRING_ROWS: readonly GenUIDslWiringRow[] = [
  {
    prop: 'bind',
    components: 'Input, Textarea, Select, Checkbox, Switch, MultiSelect',
    description:
      'State path (no `state.` prefix). Two-way sync: text-like controls use `value` + change events; Checkbox/Switch use `checked`.',
  },
  {
    prop: 'tabBind',
    components: 'Tabs',
    description: 'State path for the active tab string; `Tab`/`TabPanel` use matching `value`.',
  },
  {
    prop: 'onClickAction',
    components: 'Button, IconButton, Link (etc. where supported), DropdownItem, …',
    description: 'Must match a key in `document.actions`. Runs `runAction(id)`.',
  },
  {
    prop: 'onSortAction',
    components: 'Table (GenDataTable)',
    description: 'Action id; payload includes `{ column }` from the runtime.',
  },
  {
    prop: 'onPageChangeAction',
    components: 'Pagination',
    description: 'Action id; payload includes `{ page }`.',
  },
  {
    prop: 'filterBind',
    components: 'Table',
    description: 'State path for global row filter string.',
  },
  {
    prop: 'columnFiltersBind',
    components: 'Table',
    description: 'State path for object of per-column filter strings (keys = column keys).',
  },
  {
    prop: 'onCloseAction',
    components: 'Modal, Drawer',
    description: 'Action id when overlay/drawer closes.',
  },
  {
    prop: 'loadingKey',
    components: 'ShowWhen',
    description:
      'If set, `when` is derived from loading state for that `API_CALL` id instead of `props.when`.',
  },
  {
    prop: 'onChangeAction',
    components: 'Form controls where implemented',
    description: 'Runs after native change; receives event payload for `runAction`.',
  },
  {
    prop: 'onMountAction',
    components: 'document root',
    description: 'Top-level field on `GenUIDocument`; runs once on mount (action id).',
  },
];
