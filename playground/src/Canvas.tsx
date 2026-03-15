import { useCallback } from 'react';
import { registry } from '../ComponentRegistry';
import { usePlayground } from './store';
import { Button, cn } from '@majulii/aurora-ui';

export function Canvas() {
  const { items, selectedId, select, removeItem, addItem } = usePlayground();

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const raw = e.dataTransfer.getData('application/aurora-component');
      if (!raw) return;
      try {
        const { type, defaultProps } = JSON.parse(raw);
        addItem({ type, props: { ...defaultProps } });
      } catch {
        // ignore
      }
    },
    [addItem]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  return (
    <main className="flex-1 overflow-auto p-6">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={cn(
          'min-h-[400px] rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600',
          'bg-white dark:bg-gray-800 p-4 flex flex-col gap-4'
        )}
      >
        {items.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
            Drop components here or pick from the sidebar
          </div>
        )}
        {items.map((item) => {
          const def = registry.find((r) => r.id === item.type);
          if (!def) return null;
          const Comp = def.component;
          const isSelected = selectedId === item.id;
          return (
            <div
              key={item.id}
              onClick={() => select(item.id)}
              className={cn(
                'relative rounded-lg p-2 -m-2',
                isSelected && 'ring-2 ring-primary-500'
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-gray-500">{def.name}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="!p-1 text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(item.id);
                  }}
                >
                  Remove
                </Button>
              </div>
              <Comp {...(item.props as Record<string, unknown>)} />
            </div>
          );
        })}
      </div>
    </main>
  );
}
