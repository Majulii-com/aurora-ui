import { registry } from '../ComponentRegistry';
import { usePlayground } from './store';
import { cn } from '@majulii/aurora-ui';

export function Sidebar() {
  const { addNode, selectedId } = usePlayground();

  const handleAdd = (type: string, defaultProps: Record<string, unknown>) => {
    addNode(selectedId ?? null, { type, props: { ...defaultProps } });
  };

  return (
    <aside className="w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="font-semibold text-gray-900 dark:text-gray-100">Components</h2>
        <p className="text-sm text-gray-500 mt-0.5">Drag or click to add</p>
      </div>
      <div className="flex-1 overflow-auto p-2">
        <div className="mb-2">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide px-2 py-1">Layout</p>
          <ul>
            {registry.filter((r) => r.category === 'layout').map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('application/aurora-component', JSON.stringify({ type: item.id, defaultProps: item.defaultProps }));
                  }}
                  onClick={() => handleAdd(item.id, item.defaultProps)}
                  className={cn(
                    'w-full text-left px-3 py-2 rounded-lg text-sm font-medium',
                    'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
                    'border border-transparent hover:border-gray-200 dark:hover:border-gray-600'
                  )}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide px-2 py-1">Content</p>
          <ul>
            {registry.filter((r) => r.category === 'content').map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('application/aurora-component', JSON.stringify({ type: item.id, defaultProps: item.defaultProps }));
                  }}
                  onClick={() => handleAdd(item.id, item.defaultProps)}
                  className={cn(
                    'w-full text-left px-3 py-2 rounded-lg text-sm font-medium',
                    'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
                    'border border-transparent hover:border-gray-200 dark:hover:border-gray-600'
                  )}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
