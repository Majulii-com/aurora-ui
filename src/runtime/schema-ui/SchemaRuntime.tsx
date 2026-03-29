import React, { useMemo, useRef } from 'react';
import type { UINode, UIRegistry } from '../../schema/types';
import type { UnknownComponentInfo } from '../../schema/UIRenderer';
import { DEFAULT_MAX_UI_TREE_DEPTH, MAX_SCHEMA_NODE_ID_LENGTH } from '../../schema/schemaLimits';
import {
  getAtPath,
  resolveBindings,
  collectTwoWayBindings,
  injectStateHandlers,
} from '../core/bindings';

const VALUE_TYPES = new Set(['Input', 'Textarea', 'Select', 'DateField']);
const CHECKED_TYPES = new Set(['Checkbox', 'Switch']);
const SLIDER_TYPES = new Set(['Slider']);
const MULTI_VALUE_TYPES = new Set(['MultiSelect']);
const SEGMENTED_VALUE_TYPES = new Set(['SegmentedControl']);

export interface SchemaRuntimeProps {
  /** Schema tree to render (e.g. current page from AI or backend). */
  schema: UINode;
  /** Map of type → component + defaultProps (Aurora + your custom components). */
  registry: UIRegistry;
  /** App state; used to resolve __bind and drive two-way bindings. */
  appData: Record<string, unknown>;
  /** Update state at path (e.g. dispatch SET_PATH or your store setter). */
  setData: (path: string, value: unknown) => void;
  /** Called when a node triggers an action (e.g. onClick with onClickAction). Implement setData, navigate, custom. */
  onAction: (
    nodeId: string,
    componentType: string,
    eventName: string,
    action: string,
    message?: string,
    payload?: Record<string, unknown>
  ) => void;
  /** Max nesting depth (root = 1). */
  maxDepth?: number;
  /** Same contract as {@link UIRendererProps.renderUnknown}. */
  renderUnknown?: (info: UnknownComponentInfo) => React.ReactNode;
}

function defaultRenderUnknown(info: UnknownComponentInfo): React.ReactElement {
  const detail =
    info.reason === 'max_depth'
      ? 'Maximum UI tree depth exceeded.'
      : info.reason === 'cycle'
        ? `Duplicate node id in ancestor chain: "${info.id ?? ''}".`
        : info.reason === 'invalid_type'
          ? 'Schema node has no valid component type.'
          : `Unknown component: ${info.type || '(empty)'}`;
  return (
    <div className="rounded border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/40 px-3 py-2 text-sm text-red-800 dark:text-red-200">
      {detail}
    </div>
  );
}

function SchemaRuntimeInner({
  node,
  registry,
  appData,
  setData,
  onAction,
  depth,
  maxDepth,
  ancestorIds,
  renderUnknown,
}: {
  node: UINode;
  registry: UIRegistry;
  appData: Record<string, unknown>;
  setData: (path: string, value: unknown) => void;
  onAction: SchemaRuntimeProps['onAction'];
  depth: number;
  maxDepth: number;
  ancestorIds: Set<string>;
  renderUnknown: (info: UnknownComponentInfo) => React.ReactNode;
}): React.ReactElement | null {
  const isOverDepth = depth > maxDepth;
  const trimmedType = typeof node.type === 'string' ? node.type.trim() : '';
  const isInvalidType = !trimmedType;
  const idKey =
    typeof node.id === 'string' && node.id.length > 0 && node.id.length <= MAX_SCHEMA_NODE_ID_LENGTH
      ? node.id
      : undefined;
  const isCycle = Boolean(idKey && ancestorIds.has(idKey));
  const skipRender = isOverDepth || isInvalidType || isCycle;

  const entry = skipRender ? undefined : registry[trimmedType];
  const defaultProps = entry?.defaultProps ?? {};
  const rawProps = { ...defaultProps, ...node.props } as Record<string, unknown>;

  const resolvedProps = useMemo(
    () => (skipRender ? {} : (resolveBindings(rawProps, appData) as Record<string, unknown>)),
    [skipRender, rawProps, appData]
  );
  const twoWayBindings = useMemo(
    () => (skipRender ? {} : collectTwoWayBindings(node.props as Record<string, unknown>)),
    [skipRender, node.props]
  );
  const propsWithHandlers = useMemo(
    () =>
      skipRender ? {} : injectStateHandlers(resolvedProps, twoWayBindings, setData),
    [skipRender, resolvedProps, twoWayBindings, setData]
  );

  const nextAncestors = useMemo(
    () => (idKey ? new Set([...ancestorIds, idKey]) : ancestorIds),
    [idKey, ancestorIds]
  );

  if (isOverDepth) {
    return (
      <React.Fragment key={node.id}>
        {renderUnknown({
          type: trimmedType,
          id: node.id,
          reason: 'max_depth',
        })}
      </React.Fragment>
    );
  }
  if (isInvalidType) {
    return (
      <React.Fragment key={node.id}>
        {renderUnknown({ type: '', id: node.id, reason: 'invalid_type' })}
      </React.Fragment>
    );
  }
  if (isCycle) {
    return (
      <React.Fragment key={node.id}>
        {renderUnknown({ type: trimmedType, id: idKey, reason: 'cycle' })}
      </React.Fragment>
    );
  }

  if (!entry) {
    return (
      <React.Fragment key={node.id}>
        {renderUnknown({ type: trimmedType, id: node.id, reason: 'missing' })}
      </React.Fragment>
    );
  }

  const { component: Component } = entry;

  const childNodes = node.children ?? [];
  const renderedChildren = childNodes.map((child, i) => (
    <SchemaRuntimeInner
      key={child.id ?? `${child.type}-${depth}-${i}`}
      node={child}
      registry={registry}
      appData={appData}
      setData={setData}
      onAction={onAction}
      depth={depth + 1}
      maxDepth={maxDepth}
      ancestorIds={nextAncestors}
      renderUnknown={renderUnknown}
    />
  ));

  const { children: _childrenFromRegistry, ...restProps } = propsWithHandlers;
  void _childrenFromRegistry;
  let finalProps = restProps as Record<string, unknown>;

  if (node.id && VALUE_TYPES.has(trimmedType) && !twoWayBindings.value) {
    const fallbackPath = `_input.${node.id}`;
    const value =
      (getAtPath(appData, fallbackPath) as string) ??
      (resolvedProps.value as string) ??
      '';
    const prev = finalProps.onChange as
      | ((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void)
      | undefined;
    finalProps = {
      ...finalProps,
      value,
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      ) => {
        setData(fallbackPath, e.target.value);
        prev?.(e);
      },
    };
  }
  if (node.id && MULTI_VALUE_TYPES.has(trimmedType) && !twoWayBindings.value) {
    const fallbackPath = `_input.${node.id}`;
    const raw = getAtPath(appData, fallbackPath);
    const value = Array.isArray(raw) ? raw.map(String) : [];
    const prev = finalProps.onChange as ((next: string[]) => void) | undefined;
    finalProps = {
      ...finalProps,
      value,
      onChange: (next: string[]) => {
        setData(fallbackPath, next);
        prev?.(next);
      },
    };
  }
  if (node.id && SEGMENTED_VALUE_TYPES.has(trimmedType) && !twoWayBindings.value) {
    const fallbackPath = `_input.${node.id}`;
    const raw = getAtPath(appData, fallbackPath);
    const value = raw != null && typeof raw !== 'object' ? String(raw as string | number | boolean) : '';
    const prev = finalProps.onChange as ((v: string) => void) | undefined;
    finalProps = {
      ...finalProps,
      value,
      onChange: (v: string) => {
        setData(fallbackPath, v);
        prev?.(v);
      },
    };
  }
  if (node.id && CHECKED_TYPES.has(trimmedType) && !twoWayBindings.checked) {
    const fallbackPath = `_input.${node.id}.checked`;
    const checked =
      (getAtPath(appData, fallbackPath) as boolean) ??
      (resolvedProps.checked as boolean) ??
      false;
    const prev = finalProps.onChange as ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
    finalProps = {
      ...finalProps,
      checked,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(fallbackPath, e.target.checked);
        prev?.(e);
      },
    };
  }
  if (node.id && SLIDER_TYPES.has(trimmedType) && !twoWayBindings.value) {
    const fallbackPath = `_input.${node.id}`;
    const num =
      (getAtPath(appData, fallbackPath) as number) ??
      (resolvedProps.value as number) ??
      (node.props?.min as number) ??
      0;
    const prev = finalProps.onChange as ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
    finalProps = {
      ...finalProps,
      value: num,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(fallbackPath, e.target.valueAsNumber ?? Number(e.target.value));
        prev?.(e);
      },
    };
  }

  const rawAction = node.props?.onClickAction as string | undefined;
  const onClickAction =
    (rawAction === '__custom'
      ? (node.props?.onClickCustomAction as string)
      : rawAction) ?? rawAction;
  if (node.id && onClickAction && typeof onClickAction === 'string') {
    const message = node.props?.onClickMessage as string | undefined;
    const payload = node.props?.onClickPayload as Record<string, unknown> | undefined;
    const existingOnClick = finalProps.onClick as ((e: React.MouseEvent) => void) | undefined;
    finalProps = {
      ...finalProps,
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        onAction(node.id!, trimmedType, 'onClick', onClickAction, message, payload);
        existingOnClick?.(e);
      },
    };
  }

  let children: React.ReactNode;
  if (renderedChildren.length > 0) {
    const fromProps = propsWithHandlers.children;
    const fromPropsText =
      fromProps != null && (typeof fromProps === 'string' || typeof fromProps === 'number')
        ? String(fromProps)
        : null;
    children = (
      <>
        {fromPropsText}
        {renderedChildren}
      </>
    );
  } else {
    children = propsWithHandlers.children as React.ReactNode;
  }

  return (
    <Component key={node.id} {...finalProps}>
      {children}
    </Component>
  );
}

/**
 * Renders a UI schema with __bind resolution, two-way bindings, and action wiring.
 * Use this in your host app so AI-generated schema + state + actions work end-to-end.
 * See docs/AURORA_UI_BIBLE.md §9 (bindings, reducer, host apps).
 */
export function SchemaRuntime({
  schema,
  registry,
  appData,
  setData,
  onAction,
  maxDepth = DEFAULT_MAX_UI_TREE_DEPTH,
  renderUnknown = defaultRenderUnknown,
}: SchemaRuntimeProps): React.ReactElement {
  const rootAncestorIdsRef = useRef<Set<string>>(new Set());
  return (
    <SchemaRuntimeInner
      node={schema}
      registry={registry}
      appData={appData}
      setData={setData}
      onAction={onAction}
      depth={1}
      maxDepth={maxDepth}
      ancestorIds={rootAncestorIdsRef.current}
      renderUnknown={renderUnknown}
    />
  );
}
