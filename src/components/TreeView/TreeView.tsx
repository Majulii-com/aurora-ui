import { useState, useCallback } from 'react';
import { cn } from '../../utils';
import type { TreeViewProps, TreeNodeData } from './TreeView.types';

function TreeNodeInner({
  node,
  level,
  expandedIds,
  onToggle,
  selectedId,
  onSelect,
}: {
  node: TreeNodeData;
  level: number;
  expandedIds: Set<string>;
  onToggle: (id: string) => void;
  selectedId: string | null;
  onSelect: (id: string, node: TreeNodeData) => void;
}) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = hasChildren && expandedIds.has(node.id);
  const isSelected = selectedId === node.id;

  return (
    <div className="select-none">
      <div
        role="treeitem"
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-selected={isSelected}
        className={cn(
          'flex items-center gap-2 py-1.5 px-2 rounded-md cursor-pointer text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50',
          isSelected && 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
        )}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={() => onSelect(node.id, node)}
      >
        <button
          type="button"
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
          className={cn(
            'shrink-0 w-5 h-5 flex items-center justify-center rounded hover:bg-gray-200 dark:hover:bg-gray-600',
            !hasChildren && 'invisible'
          )}
          onClick={(e) => {
            e.stopPropagation();
            if (hasChildren) onToggle(node.id);
          }}
        >
          {hasChildren ? (
            <svg
              className={cn('w-4 h-4 transition-transform', isExpanded && 'rotate-90')}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          ) : (
            <span className="w-4" />
          )}
        </button>
        {node.icon != null && <span className="shrink-0 flex items-center">{node.icon}</span>}
        <span className="flex-1 truncate">{node.label}</span>
        {node.badge != null && <span className="shrink-0 text-xs text-gray-500">{node.badge}</span>}
      </div>
      {hasChildren && isExpanded && (
        <div role="group">
          {node.children!.map((child) => (
            <TreeNodeInner
              key={child.id}
              node={child}
              level={level + 1}
              expandedIds={expandedIds}
              onToggle={onToggle}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function TreeView({
  items,
  expandedIds: controlledExpanded,
  onExpandedChange,
  selectedId = null,
  onSelect,
  className,
}: TreeViewProps) {
  const [internalExpanded, setInternalExpanded] = useState<Set<string>>(new Set());
  const isControlled = controlledExpanded !== undefined;
  const expandedIds = isControlled ? controlledExpanded : internalExpanded;

  const onToggle = useCallback(
    (id: string) => {
      const next = new Set(expandedIds);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      if (!isControlled) setInternalExpanded(next);
      onExpandedChange?.(next);
    },
    [expandedIds, isControlled, onExpandedChange]
  );

  const handleSelect = useCallback(
    (id: string, node: TreeNodeData) => {
      onSelect?.(id, node);
    },
    [onSelect]
  );

  return (
    <div role="tree" className={cn('py-1', className)} aria-label="Tree">
      {items.map((node) => (
        <TreeNodeInner
          key={node.id}
          node={node}
          level={0}
          expandedIds={expandedIds}
          onToggle={onToggle}
          selectedId={selectedId ?? null}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
}
