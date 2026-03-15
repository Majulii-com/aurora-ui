import React, { useCallback } from 'react';
import type { UINode } from '@majulii/aurora-ui';
import { uiRegistry } from '../ComponentRegistry';
import { Button, cn } from '@majulii/aurora-ui';

interface EditableSchemaRendererProps {
  node: UINode;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onDrop: (parentId: string, type: string, defaultProps: Record<string, unknown>) => void;
}

const LAYOUT_TYPES = new Set(['Page', 'Box', 'Stack', 'Grid', 'Container']);

export function EditableSchemaRenderer({
  node,
  selectedId,
  onSelect,
  onRemove,
  onDrop,
}: EditableSchemaRendererProps) {
  const isSelected = selectedId === node.id;
  const isLayout = LAYOUT_TYPES.has(node.type);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const raw = e.dataTransfer.getData('application/aurora-component');
      if (!raw || !node.id) return;
      try {
        const { type, defaultProps } = JSON.parse(raw);
        onDrop(node.id, type, defaultProps ?? {});
      } catch {
        // ignore
      }
    },
    [node.id, onDrop]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  const entry = uiRegistry[node.type];
  if (!entry) {
    return (
      <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-700 rounded text-sm">
        Unknown component: {node.type}
      </div>
    );
  }

  const { component: Component, defaultProps = {} } = entry;
  const props = { ...defaultProps, ...node.props } as Record<string, unknown>;
  const childNodes = node.children ?? [];

  const renderedChildren = childNodes.map((child) => (
    <EditableSchemaRenderer
      key={child.id}
      node={child}
      selectedId={selectedId}
      onSelect={onSelect}
      onRemove={onRemove}
      onDrop={onDrop}
    />
  ));

  const { children: _propChildren, ...restProps } = props;
  const children = renderedChildren.length > 0 ? renderedChildren : (props.children as React.ReactNode);

  if (isLayout && childNodes.length === 0) {
    return (
      <div
        className={cn(
          'relative rounded-lg -m-1 p-1 min-h-[48px] border border-dashed border-gray-300 dark:border-gray-600',
          isSelected && 'ring-2 ring-primary-500 ring-offset-1'
        )}
        onClick={(e) => { e.stopPropagation(); if (node.id) onSelect(node.id); }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="flex items-center gap-1 mb-0.5 opacity-0 hover:opacity-100">
          <span className="text-xs font-medium text-gray-500">{node.type}</span>
          {node.id && node.id !== 'root' && (
            <Button size="sm" variant="ghost" className="!p-0.5 min-w-0 h-6 text-red-500" onClick={(e) => { e.stopPropagation(); onRemove(node.id!); }}>Remove</Button>
          )}
        </div>
        <div className="text-xs text-gray-400 text-center py-6 rounded">Drop components here</div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative rounded-lg -m-1 p-1',
        isLayout && 'border border-dashed border-transparent hover:border-gray-300 dark:hover:border-gray-600',
        isSelected && 'ring-2 ring-primary-500 ring-offset-1'
      )}
      onClick={(e) => { e.stopPropagation(); if (node.id) onSelect(node.id); }}
      onDrop={isLayout ? handleDrop : undefined}
      onDragOver={isLayout ? handleDragOver : undefined}
    >
      <div className="flex items-center gap-1 mb-0.5 opacity-0 hover:opacity-100 focus-within:opacity-100 group">
        <span className="text-xs font-medium text-gray-500 truncate">{node.type}</span>
        {node.id && node.id !== 'root' && (
          <Button
            size="sm"
            variant="ghost"
            className="!p-0.5 min-w-0 h-6 text-red-500 hover:text-red-600"
            onClick={(e) => { e.stopPropagation(); onRemove(node.id!); }}
          >
            Remove
          </Button>
        )}
      </div>
      <div className="rounded">
        <Component {...restProps}>
          {children}
        </Component>
      </div>
    </div>
  );
}
