import { useCallback } from 'react';
import { usePlayground } from './store';
import { EditableSchemaRenderer } from './EditableSchemaRenderer';
import { cn } from '@majulii/aurora-ui';

export function Canvas() {
  const { schema, selectedId, select, removeNode, addNode, moveNode, updateNode } = usePlayground();

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const raw = e.dataTransfer.getData('application/aurora-component');
      if (!raw) return;
      try {
        const { type, defaultProps } = JSON.parse(raw);
        addNode(null, { type, props: { ...defaultProps } });
      } catch {
        // ignore
      }
    },
    [addNode]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  const handleDropOnNode = useCallback(
    (parentId: string, type: string, defaultProps: Record<string, unknown>) => {
      addNode(parentId, { type, props: { ...defaultProps } });
    },
    [addNode]
  );

  const handleMoveNode = useCallback(
    (nodeId: string, targetParentId: string, index?: number) => {
      moveNode(nodeId, targetParentId, index);
    },
    [moveNode]
  );

  return (
    <main className="flex-1 overflow-auto p-6">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={cn(
          'min-h-[400px] rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600',
          'bg-white dark:bg-gray-800 p-4'
        )}
      >
        <EditableSchemaRenderer
          node={schema}
          selectedId={selectedId}
          onSelect={select}
          onRemove={removeNode}
          onDrop={handleDropOnNode}
          onMoveNode={handleMoveNode}
          onUpdateNode={updateNode}
        />
      </div>
    </main>
  );
}
