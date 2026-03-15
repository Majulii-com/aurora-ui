import { useState } from 'react';
import { usePlayground } from './store';
import { Button, cn } from '@majulii/aurora-ui';

export function EventLog() {
  const { playgroundEvents, clearPlaygroundEvents } = usePlayground();
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'w-full flex items-center justify-between px-4 py-2 text-sm font-medium',
          'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
        )}
      >
        <span>Events</span>
        <span className="text-gray-500">
          {playgroundEvents.length > 0 ? `(${playgroundEvents.length})` : ''} {open ? '▼' : '▶'}
        </span>
      </button>
      {open && (
        <div className="p-4 pt-0">
          <div className="flex justify-end gap-2 mb-2">
            <Button size="sm" variant="outline" onClick={clearPlaygroundEvents} disabled={playgroundEvents.length === 0}>
              Clear
            </Button>
          </div>
          <ul className="text-xs bg-gray-100 dark:bg-gray-900 rounded-lg p-3 overflow-auto max-h-[240px] space-y-1.5 font-mono">
            {playgroundEvents.length === 0 ? (
              <li className="text-gray-500">No events yet. Set “On click” in the Properties panel and click a component.</li>
            ) : (
              [...playgroundEvents].reverse().map((ev) => (
                <li key={ev.id} className="text-gray-700 dark:text-gray-300 flex flex-wrap gap-x-2 gap-y-0.5">
                  <span className="text-gray-500 shrink-0">{new Date(ev.time).toLocaleTimeString()}</span>
                  <span className="font-medium">{ev.componentType}</span>
                  <span className="text-gray-500">{ev.eventName}</span>
                  <span className="text-primary-600 dark:text-primary-400">{ev.action}</span>
                  {ev.message != null && ev.message !== '' && (
                    <span className="text-gray-600 dark:text-gray-400">“{ev.message}”</span>
                  )}
                  {ev.action === 'updateNode' && ev.payload?.nodeId != null && (
                    <span className="text-gray-500">→ {String(ev.payload.nodeId)}</span>
                  )}
                  {ev.action === 'sequence' && Array.isArray(ev.payload?.steps) && (
                    <span className="text-gray-500">({(ev.payload.steps as unknown[]).length} steps)</span>
                  )}
                  {ev.action === 'setData' && ev.payload?.path != null && (
                    <span className="text-gray-500">→ {String(ev.payload.path)}</span>
                  )}
                  {ev.action === 'navigate' && ev.payload?.path != null && (
                    <span className="text-gray-500">→ {String(ev.payload.path)}</span>
                  )}
                </li>
              ))
            )}
          </ul>
          <p className="text-xs text-gray-500 mt-2">
            Callbacks are stored in the schema as action types (log, toast, alert). In your app, map these to real handlers.
          </p>
        </div>
      )}
    </div>
  );
}
