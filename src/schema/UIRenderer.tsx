import React from 'react';
import type { UINode, UIRegistry } from './types';

export interface UIRendererProps {
  /** Schema node to render (single node or root with children) */
  schema: UINode;
  /** Map of type -> component + defaultProps. Used to resolve each node's type. */
  registry: UIRegistry;
}

function renderNode(node: UINode, registry: UIRegistry): React.ReactNode {
  const entry = registry[node.type];
  if (!entry) {
    return (
      <div key={node.id} className="p-2 bg-red-100 dark:bg-red-900/30 text-red-700 rounded text-sm">
        Unknown component: {node.type}
      </div>
    );
  }

  const { component: Component, defaultProps = {} } = entry;
  const props = { ...defaultProps, ...node.props };

  const childNodes = node.children ?? [];
  const renderedChildren =
    childNodes.length > 0
      ? childNodes.map((child, i) => (
          <React.Fragment key={child.id ?? i}>{renderNode(child, registry)}</React.Fragment>
        ))
      : undefined;
  const { children: propsChildren, ...restProps } = props as Record<string, unknown> & { children?: React.ReactNode };
  const children = renderedChildren ?? propsChildren;

  return (
    <Component key={node.id} {...restProps}>
      {children}
    </Component>
  );
}

/**
 * Renders a UI schema tree using a component registry.
 * Each node's `type` is resolved to a component; `props` and `children` are applied.
 * Use with the same schema format produced by the Playground for AI-ready, serializable UI.
 */
export function UIRenderer({ schema, registry }: UIRendererProps): React.ReactElement {
  return <>{renderNode(schema, registry)}</>;
}
