/**
 * Generates AI-oriented knowledge base artifacts for GenUI / DSL JSON.
 * Run: npm run gen:dsl-kb
 *
 * Metadata (wiring, lint keys, taxonomy) lives under `src/runtime/dsl*.ts` and `genLint.ts`.
 */
import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { auroraGenUIRegistry } from '../src/runtime/auroraGenRegistry';
import { ACTION_TYPES } from '../src/schema/genDocumentTypes';
import { parseGenUIDocument } from '../src/schema/genDocumentSchema';
import { DEFAULT_GEN_LIMITS } from '../src/runtime/genLimits';
import { GEN_LINT_ACTION_PROP_KEYS } from '../src/runtime/genLint';
import { GEN_UI_DSL_WIRING_ROWS } from '../src/runtime/dslRendererWiring';
import {
  GEN_REGISTRY_COMPONENT_CATEGORY_ORDER,
  GEN_REGISTRY_TYPE_CATEGORY,
  getGenUIRegistryComponentCategory,
  type GenUIRegistryComponentCategory,
} from '../src/runtime/dslRegistryTaxonomy';

const __dirname = dirname(fileURLToPath(import.meta.url));
/** Top-level folder (not under `docs/`) so it’s easy to spot as AI / tooling output */
const OUT_DIR = join(__dirname, '..', 'dsl-kb');
const EXAMPLES_DIR = join(OUT_DIR, 'examples');

interface ExampleManifest {
  items: Array<{ file: string; title: string; intent: string }>;
}

function sanitize(value: unknown): unknown {
  if (typeof value === 'function') return '[function]';
  if (value === null || typeof value !== 'object') return value;
  if (Array.isArray(value)) return value.map(sanitize);
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(value)) {
    out[k] = sanitize(v);
  }
  return out;
}

function buildSnapshot() {
  const types = Object.keys(auroraGenUIRegistry).sort();
  const registry: Record<string, { defaultProps?: unknown }> = {};
  for (const t of types) {
    const entry = auroraGenUIRegistry[t];
    const dp = entry.defaultProps;
    registry[t] = {
      ...(dp ? { defaultProps: sanitize(dp) } : {}),
    };
  }

  const taxonomyMissingExplicit = types.filter((t) => !(t in GEN_REGISTRY_TYPE_CATEGORY));

  return {
    generatedAt: new Date().toISOString(),
    registryVersion: 'auroraGenUIRegistry',
    componentCount: types.length,
    types,
    registry,
    /** Registry types with no row in `GEN_REGISTRY_TYPE_CATEGORY` (they use fallback `layout` via `getGenUIRegistryComponentCategory`) */
    taxonomyMissingExplicit,
  };
}

function mdEscape(s: string): string {
  return s.replace(/\|/g, '\\|');
}

/** Embeds curated `dsl-kb/examples/*.json` (see `manifest.json`) into the knowledge base. */
function appendExamplesSection(lines: string[]): void {
  if (!existsSync(EXAMPLES_DIR)) return;

  const manifestPath = join(EXAMPLES_DIR, 'manifest.json');
  let entries: Array<{ file: string; title: string; intent: string }> = [];
  if (existsSync(manifestPath)) {
    const parsed = JSON.parse(readFileSync(manifestPath, 'utf8')) as ExampleManifest;
    entries = parsed.items ?? [];
  }
  if (entries.length === 0) return;

  lines.push('---');
  lines.push('');
  lines.push('## 9. Example full documents (target AI response shape)');
  lines.push('');
  lines.push(
    'When asked to **generate UI as JSON**, respond with **one** root object that matches `GenUIDocument`: at minimum `ui` + `state`; add `actions` when using `onClickAction`, `bind`, `tabBind`, `onMountAction`, etc. Do **not** output functions — only data. Below are **valid** examples (Zod-checked at generate time); source files live in `dsl-kb/examples/`.'
  );
  lines.push('');

  for (const ex of entries) {
    const fp = join(EXAMPLES_DIR, ex.file);
    if (!existsSync(fp)) {
      lines.push(`### Missing: \`${ex.file}\``);
      lines.push('');
      lines.push('*(File not found — fix `dsl-kb/examples/manifest.json`.)*');
      lines.push('');
      continue;
    }
    const raw = JSON.parse(readFileSync(fp, 'utf8')) as unknown;
    const check = parseGenUIDocument(raw);
    const valid = check.success;

    lines.push(`### ${ex.title}`);
    lines.push('');
    lines.push(`*File: \`dsl-kb/examples/${ex.file}\` · ${ex.intent}*`);
    if (!valid && !check.success) {
      lines.push('');
      lines.push(`**Invalid against schema:** ${check.error.message}`);
    }
    lines.push('');
    lines.push('```json');
    lines.push(JSON.stringify(raw, null, 2));
    lines.push('```');
    lines.push('');
  }
}

function buildMarkdown(snapshot: ReturnType<typeof buildSnapshot>): string {
  const lines: string[] = [];
  lines.push('# Aurora GenUI DSL — AI knowledge base (generated)');
  lines.push('');
  lines.push(`> **Auto-generated** — do not edit by hand. Run \`npm run gen:dsl-kb\` after registry or renderer changes.`);
  lines.push(`> **Generated at:** ${snapshot.generatedAt}`);
  lines.push('');
  lines.push('## Purpose');
  lines.push('');
  lines.push(
    'This file is optimized for **LLM context**: it describes **§1 — responsive layout rules** (required for any generated UI), the **JSON shape** (`GenUIDocument`), **expression strings**, **declarative actions**, **renderer wiring** (special prop names), **lint limits**, **every default registry component** with example `defaultProps`, and **§9 — full example documents** showing the response shape for interactive UIs.'
  );
  lines.push('');
  lines.push('Use it together with human docs: `docs/GENERATIVE_UI.md`, `docs/GENERATIVE_UI_DSL_PROPS.md`, `docs/COMPONENT_DSL_CONVENTIONS.md`.');
  lines.push('');
  lines.push('Wiring rows and taxonomy are maintained in `src/runtime/dslRendererWiring.ts` and `src/runtime/dslRegistryTaxonomy.ts`.');
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 1. Responsive layout (all viewports — required)');
  lines.push('');
  lines.push(
    '**Every** generated `GenUIDocument` must read and interact correctly on **phone, tablet, desktop, and large monitors** without horizontal page overflow, clipped controls, or unusably small tap targets. Prefer **fluid** layout; avoid fixed pixel widths for page shells and main columns.'
  );
  lines.push('');
  lines.push('### 1.1 Defaults you can rely on');
  lines.push('');
  lines.push(
    '- **`Stack`** (registry default) includes `w-full min-w-0`; **`Row`** wraps horizontal stacks with `w-full min-w-0` so flex children can shrink inside narrow parents.'
  );
  lines.push(
    '- **`Grid`** uses **mobile-first** column tracks (e.g. `columns: 3` → one column on small screens, up to three from `lg:`). Override with `props.className` if a design needs a different breakpoint ladder.'
  );
  lines.push(
    '- **`Page`**, **`Box`**, **`Card`**, **`StatCard`**, **`Table`** scroll wrappers include **`min-w-0`** (and width where needed) so nested flex/grid layouts don’t force horizontal overflow.'
  );
  lines.push(
    '- **Charts** use Recharts `ResponsiveContainer` where applicable; still set a sensible numeric `height` and put the chart in a parent with `className` containing `w-full min-w-0`.'
  );
  lines.push('');
  lines.push('### 1.2 What the model must do in JSON (`className` / structure)');
  lines.push('');
  lines.push(
    '- Use **Tailwind responsive prefixes** on layout and typography: `sm:`, `md:`, `lg:`, `xl:`, `2xl:` — e.g. `flex-col md:flex-row`, `gap-3 md:gap-6`, `text-sm md:text-base`, `p-4 lg:p-8`.'
  );
  lines.push(
    '- Prefer **`Container`** + **`Stack`** / **`Grid`** for dashboards; avoid `w-[420px]`-style fixed main widths. Use `max-w-*`, `w-full`, `flex-1`, `min-w-0`, and `overflow-x-auto` on inner scroll regions (e.g. wide **`GenDataTable`** / toolbars).'
  );
  lines.push(
    '- **`SplitPane`**: on small viewports side-by-side panes are often too narrow; prefer **`className`** patterns that stack or hide secondary content via **`ShowWhen`** + state, or host-specific layouts — document the intent in examples when using split layouts.'
  );
  lines.push(
    '- **Forms**: full-width inputs on mobile (`w-full`), adequate vertical spacing between fields, and **`Modal`** / **`Drawer`** sizes that fit small screens (`size` + `className`).'
  );
  lines.push(
    '- **Touch**: keep interactive controls at least ~44×44 CSS px where possible (padding on **`Button`**, **`IconButton`**, **`Tab`** targets).'
  );
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 2. Pipeline (mental model)');
  lines.push('');
  lines.push('```');
  lines.push('GenUIDocument JSON');
  lines.push('  → parseGenUIDocument (Zod)');
  lines.push('  → lintGenUIDocument / parseAndLintGenUIDocument');
  lines.push('  → GenUIProvider + Zustand state');
  lines.push('  → GenUIRenderer (resolve {{expressions}}, wire bind/tabBind/*Action)');
  lines.push('  → runAction → SET_STATE | API_CALL | CHAIN | …');
  lines.push('```');
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 3. Root document shape (`GenUIDocument`)');
  lines.push('');
  lines.push('| Field | Required | Role |');
  lines.push('|-------|----------|------|');
  lines.push('| `ui` | **yes** | Root `GenUINode` tree |');
  lines.push('| `state` | **yes** | Initial serializable object |');
  lines.push('| `actions` | no | `actionId` → `ActionDef` |');
  lines.push('| `bindings` | no | Named strings; use `{{bindings.name}}` in props |');
  lines.push('| `version` | no | Tooling only |');
  lines.push('| `onMountAction` | no | Action id run once on mount |');
  lines.push('');
  lines.push('### 3.1 `GenUINode`');
  lines.push('');
  lines.push('- `type` — string, must be a key in the host registry (default list: **§8**).');
  lines.push('- `props` — object; values may contain `{{state.path}}`, `{{bindings.x}}`, `{{response}}` after API calls, etc.');
  lines.push('- `children` — nested `GenUINode[]` for composition.');
  lines.push('- `id` — optional hint for React keys.');
  lines.push('');
  lines.push('**No functions in JSON.** Use `bind`, `*Action`, `tabBind`, etc., instead of inline handlers.');
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 4. Expression placeholders');
  lines.push('');
  lines.push('Strings in `props` are resolved with `resolveDeep`. Typical patterns:');
  lines.push('');
  lines.push('- `{{state.foo.bar}}` — read from global UI state.');
  lines.push('- `{{bindings.myExpr}}` — from `document.bindings` (pre-resolved).');
  lines.push('- After `API_CALL`, `{{response}}` may be used in chained actions / success handlers (see interpreter docs).');
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 5. Action types (`ActionDef`)');
  lines.push('');
  lines.push(`Allowed \`type\` discriminator values: **${ACTION_TYPES.join('**, **')}**.`);
  lines.push('');
  lines.push('| Type | Summary |');
  lines.push('|------|---------|');
  lines.push('| `SET_STATE` | Set `path` + `value` |');
  lines.push('| `MERGE_STATE` | Shallow merge `patch` into state |');
  lines.push('| `API_CALL` | HTTP call; optional `onSuccess` / `onError` chains |');
  lines.push('| `NAVIGATE` | Host navigation `path` |');
  lines.push('| `CUSTOM` | Delegates to host `onCustom(name, payload)` |');
  lines.push('| `CHAIN` | Run inner `chain` of actions in order |');
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 6. Renderer DSL wiring (special `props`)');
  lines.push('');
  lines.push('These props are interpreted by `GenUIRenderer` — they are **not** passed raw to React components.');
  lines.push('');
  lines.push('| Prop | Typical components | Description |');
  lines.push('|------|-------------------|-------------|');
  for (const row of GEN_UI_DSL_WIRING_ROWS) {
    lines.push(`| \`${row.prop}\` | ${mdEscape(row.components)} | ${mdEscape(row.description)} |`);
  }
  lines.push('');
  lines.push(
    `**Lint** also checks that string values on **${GEN_LINT_ACTION_PROP_KEYS.map((p) => `\`${p}\``).join(', ')}** reference existing keys in \`document.actions\`.`
  );
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 7. Document limits (lint)');
  lines.push('');
  lines.push('| Limit | Default |');
  lines.push('|-------|---------|');
  lines.push(`| maxDepth | ${DEFAULT_GEN_LIMITS.maxDepth} |`);
  lines.push(`| maxNodes | ${DEFAULT_GEN_LIMITS.maxNodes} |`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 8. Default registry components');
  lines.push('');
  lines.push(`**Count:** ${snapshot.componentCount} types.`);
  if (snapshot.taxonomyMissingExplicit.length > 0) {
    lines.push('');
    lines.push(
      `> **Taxonomy:** these types have no explicit row in \`GEN_REGISTRY_TYPE_CATEGORY\` (grouped as **layout** until added): \`${snapshot.taxonomyMissingExplicit.join('`, `')}\`.`
    );
  }
  lines.push('');
  lines.push('Grouped by category. **`defaultProps`** are copied from `auroraGenUIRegistry` (functions shown as `[function]`).');
  lines.push('');

  const byCat = new Map<GenUIRegistryComponentCategory, string[]>();
  for (const t of snapshot.types) {
    const cat = getGenUIRegistryComponentCategory(t);
    if (!byCat.has(cat)) byCat.set(cat, []);
    byCat.get(cat)!.push(t);
  }
  for (const cat of GEN_REGISTRY_COMPONENT_CATEGORY_ORDER) {
    const list = byCat.get(cat);
    if (!list?.length) continue;
    lines.push(`### ${cat}`);
    lines.push('');
    for (const type of list.sort()) {
      const props = snapshot.registry[type]?.defaultProps;
      lines.push(`#### \`${type}\``);
      lines.push('');
      if (props !== undefined) {
        lines.push('```json');
        lines.push(JSON.stringify(props, null, 2));
        lines.push('```');
      } else {
        lines.push('*(no defaultProps in registry)*');
      }
      lines.push('');
    }
  }

  appendExamplesSection(lines);

  lines.push('---');
  lines.push('');
  lines.push('## 10. Machine-readable snapshot');
  lines.push('');
  lines.push('See `dsl-kb/dsl-registry.snapshot.json` for the same registry metadata as structured JSON.');
  lines.push('');
  return lines.join('\n');
}

function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const snapshot = buildSnapshot();
  const jsonPath = join(OUT_DIR, 'dsl-registry.snapshot.json');
  const mdPath = join(OUT_DIR, 'DSL_AI_KNOWLEDGE_BASE.md');

  writeFileSync(jsonPath, JSON.stringify(snapshot, null, 2) + '\n', 'utf8');
  writeFileSync(mdPath, buildMarkdown(snapshot), 'utf8');

  console.log(`Wrote ${jsonPath}`);
  console.log(`Wrote ${mdPath}`);
  console.log(`Components: ${snapshot.componentCount}`);
  if (snapshot.taxonomyMissingExplicit.length > 0) {
    console.warn(
      `Taxonomy: ${snapshot.taxonomyMissingExplicit.length} registry type(s) missing from GEN_REGISTRY_TYPE_CATEGORY:`,
      snapshot.taxonomyMissingExplicit.join(', ')
    );
  }
}

main();
