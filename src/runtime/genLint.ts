import type { GenUINode, GenUIDocument } from '../schema/genDocumentTypes';
import { parseGenUIDocument } from '../schema/genDocumentSchema';
import type { GenDocumentLimits } from './genLimits';
import { DEFAULT_GEN_LIMITS } from './genLimits';

export type GenLintLevel = 'error' | 'warning';

export interface GenLintIssue {
  level: GenLintLevel;
  code: string;
  message: string;
  /** JSON pointer–style path when applicable */
  path?: string;
}

export interface GenLintResult {
  issues: GenLintIssue[];
  stats: {
    nodeCount: number;
    maxDepth: number;
  };
}

/**
 * Node `props` keys that reference `document.actions` ids — must match `GenUIRenderer` wiring
 * (see `docs/GENERATIVE_UI.md` §6). Document-level `onMountAction` is checked separately in
 * {@link lintGenUIDocument}.
 */
export const GEN_LINT_ACTION_PROP_KEYS = [
  'onClickAction',
  'onSortAction',
  'onChangeAction',
  'onCloseAction',
  'onPageChangeAction',
] as const;

const ACTION_PROP_KEYS = new Set<string>(GEN_LINT_ACTION_PROP_KEYS);

function walkUi(
  node: GenUINode,
  depth: number,
  acc: { nodeCount: number; maxDepth: number; types: string[]; actionRefs: string[] }
): void {
  acc.nodeCount += 1;
  acc.maxDepth = Math.max(acc.maxDepth, depth);
  acc.types.push(node.type);

  const props = node.props as Record<string, unknown> | undefined;
  if (props) {
    for (const [key, val] of Object.entries(props)) {
      if (ACTION_PROP_KEYS.has(key) && typeof val === 'string' && val.length > 0) {
        acc.actionRefs.push(val);
      }
    }
  }

  for (const child of node.children ?? []) {
    walkUi(child, depth + 1, acc);
  }
}

/**
 * Structural + semantic checks after Zod parse: registry types, action keys, size limits.
 * Unknown component types are **warnings** (host may supply an extended registry at runtime).
 */
export function lintGenUIDocument(
  doc: GenUIDocument,
  options?: {
    /** If provided, unknown `type` strings emit warnings. Omit to skip registry checks. */
    registryTypes?: Set<string>;
    limits?: Partial<GenDocumentLimits>;
  }
): GenLintResult {
  const limits: GenDocumentLimits = { ...DEFAULT_GEN_LIMITS, ...options?.limits };
  const issues: GenLintIssue[] = [];
  const acc = {
    nodeCount: 0,
    maxDepth: 0,
    types: [] as string[],
    actionRefs: [] as string[],
  };

  walkUi(doc.ui, 1, acc);

  if (acc.maxDepth > limits.maxDepth) {
    issues.push({
      level: 'error',
      code: 'DEPTH_EXCEEDED',
      message: `UI tree depth ${acc.maxDepth} exceeds limit ${limits.maxDepth}`,
      path: '/ui',
    });
  }

  if (acc.nodeCount > limits.maxNodes) {
    issues.push({
      level: 'error',
      code: 'NODE_COUNT_EXCEEDED',
      message: `UI node count ${acc.nodeCount} exceeds limit ${limits.maxNodes}`,
      path: '/ui',
    });
  }

  const actionKeys = new Set(Object.keys(doc.actions ?? {}));
  const missingRefs = [...new Set(acc.actionRefs)].filter((r) => !actionKeys.has(r));
  for (const ref of missingRefs) {
    issues.push({
      level: 'warning',
      code: 'MISSING_ACTION',
      message: `Referenced action "${ref}" is not defined in document.actions`,
      path: '/ui',
    });
  }

  const mountId =
    typeof doc.onMountAction === 'string' && doc.onMountAction.trim().length > 0
      ? doc.onMountAction.trim()
      : undefined;
  if (mountId && !actionKeys.has(mountId)) {
    issues.push({
      level: 'warning',
      code: 'MISSING_ACTION',
      message: `Referenced action "${mountId}" is not defined in document.actions`,
      path: '/onMountAction',
    });
  }

  if (options?.registryTypes && options.registryTypes.size > 0) {
    const reg = options.registryTypes;
    const unique = [...new Set(acc.types)];
    for (const t of unique) {
      if (!reg.has(t)) {
        issues.push({
          level: 'warning',
          code: 'UNKNOWN_COMPONENT_TYPE',
          message: `Component type "${t}" is not in the default registry (provide a custom registry at render time if intentional)`,
          path: '/ui',
        });
      }
    }
  }

  return {
    issues,
    stats: { nodeCount: acc.nodeCount, maxDepth: acc.maxDepth },
  };
}

export interface ParseAndLintResult {
  ok: boolean;
  /** Present when Zod parse succeeded (even if lint has errors). */
  document?: GenUIDocument;
  zodError?: string;
  lint?: GenLintResult;
}

/**
 * `parseGenUIDocument` (Zod), then {@link lintGenUIDocument}.
 */
export function parseAndLintGenUIDocument(
  json: unknown,
  lintOptions?: Parameters<typeof lintGenUIDocument>[1]
): ParseAndLintResult {
  const parsed = parseGenUIDocument(json);
  if (!parsed.success) {
    const z = parsed.error;
    return {
      ok: false,
      zodError:
        z.issues.map((e) => `${e.path.join('.')}: ${e.message}`).join('; ') || z.message,
    };
  }
  const document = parsed.data as GenUIDocument;
  const lint = lintGenUIDocument(document, lintOptions);
  const hasErrors = lint.issues.some((i) => i.level === 'error');
  return {
    ok: !hasErrors,
    document,
    lint,
  };
}
