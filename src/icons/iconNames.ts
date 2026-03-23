/** Explicit `.mjs` so Node/tsx can resolve the entry when running scripts (see `pnpm gen:dsl-kb`). */
import { iconNames } from 'lucide-react/dynamic.mjs';

/**
 * Every kebab-case icon name supported by Lucide (same as `lucide-react` dynamic imports).
 * Use for validation, docs, and AI tooling.
 */
export const LUCIDE_ICON_NAMES = iconNames as readonly string[];

/** O(1) lookup for {@link resolveIconName}. */
export const LUCIDE_ICON_NAME_SET = new Set(LUCIDE_ICON_NAMES);

/**
 * Back-compat names used in older Aurora examples / DSL before Lucide.
 * Values are Lucide `name` keys (kebab-case).
 */
export const LEGACY_ICON_ALIASES: Readonly<Record<string, string>> = {
  add: 'plus',
  search: 'search',
  close: 'x',
  run: 'play',
  save: 'save',
  export: 'upload',
  settings: 'settings',
  menu: 'menu',
  'chevron-down': 'chevron-down',
  'chevron-right': 'chevron-right',
  refresh: 'refresh-cw',
  maximize: 'maximize',
  more: 'more-vertical',
};

function toKebabCase(s: string): string {
  const t = s.trim();
  if (!t) return '';
  return t
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

/**
 * Resolves a user-facing icon string to a Lucide dynamic icon `name`, or `null` if unknown.
 * Accepts: kebab-case (`home`, `chevron-right`), PascalCase (`Home`, `ChevronRight`), and legacy aliases (`add` → `plus`).
 */
export function resolveIconName(input: string): string | null {
  const raw = input.trim();
  if (!raw) return null;

  const normalizedSpaces = raw.replace(/\s+/g, '-');
  const lower = normalizedSpaces.toLowerCase();
  const legacy = LEGACY_ICON_ALIASES[lower];
  if (legacy && LUCIDE_ICON_NAME_SET.has(legacy)) return legacy;

  const kebab = lower.includes('-') || lower === raw.toLowerCase() ? lower : toKebabCase(raw);
  if (LUCIDE_ICON_NAME_SET.has(kebab)) return kebab;
  if (LUCIDE_ICON_NAME_SET.has(lower)) return lower;

  return null;
}

export function isValidIconName(input: string): boolean {
  return resolveIconName(input) != null;
}
