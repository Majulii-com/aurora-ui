import React, { useMemo } from 'react';
import type { GenUINode } from '../../schema/genDocumentTypes';
import type { GenRegistryEntry } from './auroraGenRegistry';
import { auroraGenUIRegistry } from './auroraGenRegistry';
import { resolveDeep, resolveNamedBindingMap } from './expressions';
import { getAtPath } from '../core/bindings';
import type { ExpressionContext } from '../../schema/genDocumentTypes';
import { useGenUI, useGenUIState, useRunAction } from './GenUIProvider';
import { PoweredByMajuliiBar } from './PoweredByMajuliiBar';
import { cn } from '../../utils';
import { DEFAULT_MAX_UI_TREE_DEPTH, MAX_SCHEMA_NODE_ID_LENGTH } from '../../schema/schemaLimits';

function coerceBoolean(v: unknown): boolean {
  if (v === true || v === 'true') return true;
  if (v === false || v === 'false' || v === '' || v == null) return false;
  return Boolean(v);
}

const BOOL_BIND_TYPES = new Set(['Checkbox', 'Switch']);

/** Stable empty set for root `id` ancestry (never mutated). */
const ROOT_ANCESTOR_IDS = new Set<string>();

interface NodeRendererProps {
  node: GenUINode;
  registry: Record<string, GenRegistryEntry>;
  depth: number;
  maxDepth: number;
  ancestorIds: Set<string>;
}

export function GenUIRenderer({
  root,
  registry = auroraGenUIRegistry,
  /** Optional wrapper for host layout (e.g. preview padding). Does not affect the JSON tree. */
  className,
  /**
   * When true (default), shows a compact “Powered by majulii.com” strip at the top of the rendered output.
   * Set to false for white-label or fully custom chrome.
   */
  showMajuliiBranding = true,
  maxDepth = DEFAULT_MAX_UI_TREE_DEPTH,
}: {
  root: GenUINode;
  registry?: Record<string, GenRegistryEntry>;
  className?: string;
  showMajuliiBranding?: boolean;
  maxDepth?: number;
}) {
  const inner = (
    <NodeRenderer
      node={root}
      registry={registry}
      depth={1}
      maxDepth={maxDepth}
      ancestorIds={ROOT_ANCESTOR_IDS}
    />
  );
  const body = className ? <div className={className}>{inner}</div> : inner;

  if (!showMajuliiBranding) {
    return body;
  }

  return (
    <div className="relative flex min-w-0 flex-col">
      <div className="sticky top-0 z-30 flex min-h-0 shrink-0 justify-end bg-white/95 px-2 py-1.5 backdrop-blur dark:bg-gray-800/95">
        <PoweredByMajuliiBar />
      </div>
      {body}
    </div>
  );
}

function structuralErrorMessage(
  kind: 'depth' | 'cycle' | 'invalid',
  node: GenUINode
): React.ReactElement {
  const msg =
    kind === 'depth'
      ? 'Maximum UI tree depth exceeded.'
      : kind === 'cycle'
        ? `Duplicate node id in ancestor chain: "${node.id ?? ''}".`
        : 'Schema node has no valid component type.';
  return (
    <div
      className={cn(
        'rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/40 px-3 py-2 text-sm text-red-800 dark:text-red-200'
      )}
    >
      {msg}
    </div>
  );
}

function NodeRenderer({ node, registry, depth, maxDepth, ancestorIds }: NodeRendererProps) {
  const { getStore, document } = useGenUI();
  const state = useGenUIState((s) => s.state);
  const loadingMap = useGenUIState((s) => s.loading);
  const run = useRunAction();

  const trimmedType = typeof node.type === 'string' ? node.type.trim() : '';
  const idKey =
    typeof node.id === 'string' && node.id.length > 0 && node.id.length <= MAX_SCHEMA_NODE_ID_LENGTH
      ? node.id
      : undefined;
  const isOverDepth = depth > maxDepth;
  const isInvalidType = !trimmedType;
  const isCycle = Boolean(idKey && ancestorIds.has(idKey));
  const structuralFail = isOverDepth || isInvalidType || isCycle;

  const nextAncestors = useMemo(
    () => (idKey ? new Set([...ancestorIds, idKey]) : ancestorIds),
    [idKey, ancestorIds]
  );

  const resolvedBindings = useMemo(
    () =>
      resolveNamedBindingMap(document.bindings, {
        state,
        event: undefined,
        response: undefined,
      }),
    [document.bindings, state]
  );

  const ctx: ExpressionContext = useMemo(
    () => ({
      state,
      event: undefined,
      response: undefined,
      bindings: resolvedBindings,
    }),
    [state, resolvedBindings]
  );

  const entry = structuralFail ? undefined : registry[trimmedType];
  const defaultProps = entry?.defaultProps ?? {};
  const rawProps = { ...defaultProps, ...(node.props ?? {}) } as Record<string, unknown>;

  const resolved = structuralFail
    ? ({} as Record<string, unknown>)
    : (resolveDeep(rawProps, ctx) as Record<string, unknown>);

  const finalProps = useMemo(() => {
    if (structuralFail) return {};
    const p = { ...resolved };

    const bindPath = p.bind as string | undefined;
    if (bindPath && typeof bindPath === 'string') {
      delete p.bind;
      if (BOOL_BIND_TYPES.has(trimmedType)) {
        p.checked = Boolean(getAtPath(state as Record<string, unknown>, bindPath));
        p.onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          getStore().setState(bindPath, e.target.checked);
        };
      } else if (trimmedType === 'MultiSelect') {
        const raw = getAtPath(state as Record<string, unknown>, bindPath);
        p.value = Array.isArray(raw) ? raw.map(String) : [];
        p.onChange = (next: string[]) => {
          getStore().setState(bindPath, next);
        };
      } else {
        const raw = getAtPath(state as Record<string, unknown>, bindPath);
        p.value =
          raw == null || typeof raw === 'object' ? '' : String(raw as string | number | boolean);
        p.onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
          getStore().setState(bindPath, e.target.value);
        };
      }
    }

    const tabBind = p.tabBind as string | undefined;
    if (trimmedType === 'Tabs' && tabBind && typeof tabBind === 'string') {
      delete p.tabBind;
      const cur = getAtPath(state as Record<string, unknown>, tabBind);
      p.value = cur != null ? String(cur) : '';
      p.onChange = (next: string) => {
        getStore().setState(tabBind, next);
      };
    }

    const clickAction = p.onClickAction as string | undefined;
    if (clickAction && typeof clickAction === 'string') {
      delete p.onClickAction;
      p.onClick = () => {
        void run(clickAction);
      };
    }

    const sortAction = p.onSortAction as string | undefined;
    if (sortAction && typeof sortAction === 'string') {
      delete p.onSortAction;
      p.onSort = (key: string) => {
        void run(sortAction, { column: key });
      };
    }

    const pageChangeAction = p.onPageChangeAction as string | undefined;
    if (pageChangeAction && typeof pageChangeAction === 'string' && trimmedType === 'Pagination') {
      delete p.onPageChangeAction;
      p.onPageChange = (page: number) => {
        void run(pageChangeAction, { page });
      };
    }

    const filterBind = p.filterBind as string | undefined;
    if (filterBind && typeof filterBind === 'string') {
      delete p.filterBind;
      p.filter = (getAtPath(state as Record<string, unknown>, filterBind) as string) ?? '';
      p.onFilterChange = (v: string) => {
        getStore().setState(filterBind, v);
      };
    }

    const columnFiltersBind = p.columnFiltersBind as string | undefined;
    if (columnFiltersBind && typeof columnFiltersBind === 'string') {
      delete p.columnFiltersBind;
      const cur = getAtPath(state as Record<string, unknown>, columnFiltersBind);
      p.columnFilters =
        cur != null && typeof cur === 'object' && !Array.isArray(cur)
          ? (cur as Record<string, string>)
          : {};
      p.onColumnFilterChange = (columnKey: string, value: string) => {
        getStore().setState(`${columnFiltersBind}.${columnKey}`, value);
      };
    }

    const closeAction = p.onCloseAction as string | undefined;
    if (
      closeAction &&
      typeof closeAction === 'string' &&
      (trimmedType === 'Modal' || trimmedType === 'Drawer' || trimmedType === 'Alert')
    ) {
      delete p.onCloseAction;
      const prevClose = p.onClose as (() => void) | undefined;
      p.onClose = () => {
        if (typeof prevClose === 'function') prevClose();
        void run(closeAction);
      };
    }

    if (trimmedType === 'ShowWhen') {
      const lk = p.loadingKey as string | undefined;
      if (lk && typeof lk === 'string') {
        delete p.loadingKey;
        p.when = loadingMap[lk] === true;
      } else {
        p.when = coerceBoolean(p.when);
      }
    }

    const changeAction = p.onChangeAction as string | undefined;
    if (changeAction && typeof changeAction === 'string') {
      delete p.onChangeAction;
      const prevOnChange = p.onChange as ((arg: unknown) => void) | undefined;
      p.onChange = (first: unknown) => {
        if (typeof prevOnChange === 'function') {
          prevOnChange(first);
        }
        let eventPayload: Record<string, unknown> = {};
        if (first !== null && typeof first === 'object' && 'target' in (first as object)) {
          const t = (first as React.ChangeEvent<HTMLInputElement>).target;
          eventPayload = { value: t.value, checked: t.checked };
        } else {
          eventPayload = { value: first as string | boolean | number };
        }
        void run(changeAction, eventPayload);
      };
    }

    return p;
  }, [structuralFail, resolved, state, trimmedType, loadingMap, getStore, run]);

  if (isOverDepth) {
    return structuralErrorMessage('depth', node);
  }
  if (isInvalidType) {
    return structuralErrorMessage('invalid', node);
  }
  if (isCycle) {
    return structuralErrorMessage('cycle', node);
  }

  if (!entry) {
    return (
      <div
        className={cn(
          'rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/40 px-3 py-2 text-sm text-red-800 dark:text-red-200'
        )}
      >
        Unknown component: <code className="font-mono">{node.type}</code>
      </div>
    );
  }

  const { component: Component } = entry;

  const childNodes = node.children ?? [];

  /**
   * - Leaf nodes (e.g. Button) often use `props.children` as a string label from JSON.
   * - Container nodes use `children: GenUINode[]` for nested components.
   * - When **both** exist, merge: text/number from `props.children` first, then nested nodes
   *   so you can compose rich labels (e.g. icon + text) or add siblings under layout primitives.
   */
  if (childNodes.length > 0) {
    const { children: propChildren, ...restFinal } = finalProps;
    const fromPropsText =
      propChildren != null && (typeof propChildren === 'string' || typeof propChildren === 'number')
        ? String(propChildren)
        : null;
    return (
      <Component {...restFinal}>
        {fromPropsText}
        {childNodes.map((child, i) => (
          <NodeRenderer
            key={child.id ?? `${child.type}-${depth}-${i}`}
            node={child}
            registry={registry}
            depth={depth + 1}
            maxDepth={maxDepth}
            ancestorIds={nextAncestors}
          />
        ))}
      </Component>
    );
  }

  return <Component {...finalProps} />;
}
