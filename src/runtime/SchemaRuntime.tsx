import React, { useMemo } from 'react';
import type { UINode, UIRegistry } from '../schema/types';
import {
  getAtPath,
  resolveBindings,
  collectTwoWayBindings,
  injectStateHandlers,
} from './bindings';

const VALUE_TYPES = new Set(['Input', 'Textarea', 'Select']);
const CHECKED_TYPES = new Set(['Checkbox', 'Switch']);

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
}

function SchemaRuntimeInner({
  node,
  registry,
  appData,
  setData,
  onAction,
}: {
  node: UINode;
  registry: UIRegistry;
  appData: Record<string, unknown>;
  setData: (path: string, value: unknown) => void;
  onAction: SchemaRuntimeProps['onAction'];
}): React.ReactElement | null {
  const entry = registry[node.type];
  if (!entry) {
    return (
      <div
        key={node.id}
        className="p-2 bg-red-100 dark:bg-red-900/30 text-red-700 rounded text-sm"
      >
        Unknown component: {node.type}
      </div>
    );
  }

  const { component: Component, defaultProps = {} } = entry;
  const rawProps = { ...defaultProps, ...node.props } as Record<string, unknown>;

  const resolvedProps = useMemo(
    () => resolveBindings(rawProps, appData) as Record<string, unknown>,
    [rawProps, appData]
  );
  const twoWayBindings = useMemo(
    () => collectTwoWayBindings(node.props as Record<string, unknown>),
    [node.props]
  );
  const propsWithHandlers = useMemo(
    () => injectStateHandlers(resolvedProps, twoWayBindings, setData),
    [resolvedProps, twoWayBindings, setData]
  );

  const childNodes = node.children ?? [];
  const renderedChildren = childNodes.map((child) => (
    <SchemaRuntimeInner
      key={child.id ?? child.type}
      node={child}
      registry={registry}
      appData={appData}
      setData={setData}
      onAction={onAction}
    />
  ));

  const { children: _propChildren, ...restProps } = propsWithHandlers;
  let finalProps = restProps as Record<string, unknown>;

  if (node.id && VALUE_TYPES.has(node.type) && !twoWayBindings.value) {
    const fallbackPath = `_input.${node.id}`;
    const value =
      (getAtPath(appData, fallbackPath) as string) ??
      (resolvedProps.value as string) ??
      '';
    finalProps = {
      ...finalProps,
      value,
      onChange: (
        e: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      ) => {
        setData(fallbackPath, e.target.value);
      },
    };
  }
  if (node.id && CHECKED_TYPES.has(node.type) && !twoWayBindings.checked) {
    const fallbackPath = `_input.${node.id}.checked`;
    const checked =
      (getAtPath(appData, fallbackPath) as boolean) ??
      (resolvedProps.checked as boolean) ??
      false;
    finalProps = {
      ...finalProps,
      checked,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(fallbackPath, e.target.checked);
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
    const existingOnClick = finalProps.onClick as
      | ((e: React.MouseEvent) => void)
      | undefined;
    finalProps = {
      ...finalProps,
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        onAction(node.id!, node.type, 'onClick', onClickAction, message, payload);
        existingOnClick?.(e);
      },
    };
  }

  const children =
    renderedChildren.length > 0
      ? renderedChildren
      : (propsWithHandlers.children as React.ReactNode);

  return (
    <Component key={node.id} {...finalProps}>
      {children}
    </Component>
  );
}

/**
 * Renders a UI schema with __bind resolution, two-way bindings, and action wiring.
 * Use this in your host app so AI-generated schema + state + actions work end-to-end.
 * See docs/HOST_APP_INTEGRATION.md.
 */
export function SchemaRuntime({
  schema,
  registry,
  appData,
  setData,
  onAction,
}: SchemaRuntimeProps): React.ReactElement {
  return (
    <SchemaRuntimeInner
      node={schema}
      registry={registry}
      appData={appData}
      setData={setData}
      onAction={onAction}
    />
  );
}
