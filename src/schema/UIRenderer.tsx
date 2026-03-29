import React from 'react';
import type { UINode, UIRegistry } from './types';
import { DEFAULT_MAX_UI_TREE_DEPTH, MAX_SCHEMA_NODE_ID_LENGTH } from './schemaLimits';

export type SchemaUnknownReason = 'missing' | 'max_depth' | 'cycle' | 'invalid_type';

export interface UnknownComponentInfo {
  type: string;
  id?: string;
  reason: SchemaUnknownReason;
}

export interface UIRendererProps {
  /** Schema node to render (single node or root with children) */
  schema: UINode;
  /** Map of type -> component + defaultProps. Used to resolve each node's type. */
  registry: UIRegistry;
  /** Max nesting depth (root = 1). Prevents runaway / malicious trees. */
  maxDepth?: number;
  /** Override default inline fallback for unknown types, depth, cycles, or empty `type`. */
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

function renderNode(
  node: UINode,
  registry: UIRegistry,
  depth: number,
  maxDepth: number,
  ancestorIds: Set<string>,
  renderUnknown: (info: UnknownComponentInfo) => React.ReactNode
): React.ReactNode {
  if (depth > maxDepth) {
    return renderUnknown({
      type: typeof node.type === 'string' ? node.type : '',
      id: node.id,
      reason: 'max_depth',
    });
  }

  const typeRaw = node.type;
  const type = typeof typeRaw === 'string' ? typeRaw.trim() : '';
  if (!type) {
    return renderUnknown({ type: '', id: node.id, reason: 'invalid_type' });
  }

  const idKey =
    typeof node.id === 'string' && node.id.length > 0 && node.id.length <= MAX_SCHEMA_NODE_ID_LENGTH
      ? node.id
      : undefined;
  if (idKey) {
    if (ancestorIds.has(idKey)) {
      return renderUnknown({ type, id: idKey, reason: 'cycle' });
    }
  }

  const nextAncestors = idKey ? new Set([...ancestorIds, idKey]) : ancestorIds;

  const entry = registry[type];
  if (!entry) {
    return renderUnknown({ type, id: node.id, reason: 'missing' });
  }

  const { component: Component, defaultProps = {} } = entry;
  const props = { ...defaultProps, ...node.props } as Record<string, unknown>;

  const childNodes = node.children ?? [];
  const renderedChildren =
    childNodes.length > 0
      ? childNodes.map((child, i) => (
          <React.Fragment key={child.id ?? `${child.type}-${depth}-${i}`}>
            {renderNode(child, registry, depth + 1, maxDepth, nextAncestors, renderUnknown)}
          </React.Fragment>
        ))
      : undefined;

  const { children: propsChildren, ...restProps } = props as Record<string, unknown> & {
    children?: React.ReactNode;
  };

  let children: React.ReactNode;
  if (renderedChildren != null && renderedChildren.length > 0) {
    const fromPropsText =
      propsChildren != null && (typeof propsChildren === 'string' || typeof propsChildren === 'number')
        ? String(propsChildren)
        : null;
    children = (
      <>
        {fromPropsText}
        {renderedChildren}
      </>
    );
  } else {
    children = propsChildren;
  }

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
export function UIRenderer({
  schema,
  registry,
  maxDepth = DEFAULT_MAX_UI_TREE_DEPTH,
  renderUnknown = defaultRenderUnknown,
}: UIRendererProps): React.ReactElement {
  return <>{renderNode(schema, registry, 1, maxDepth, new Set(), renderUnknown)}</>;
}
