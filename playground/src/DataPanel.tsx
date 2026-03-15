import { useState, useCallback, useEffect } from 'react';
import { usePlayground } from './store';
import { Button, cn } from '@majulii/aurora-ui';

/**
 * Panel to view and edit app data context (used by __bind and setData).
 * See docs/COMPLEX_COMPONENTS.md and docs/FULL_SITE_ARCHITECTURE.md.
 */
export function DataPanel() {
  const { appData, setAppData, routes, currentRoute, setRoute } = usePlayground();
  const [open, setOpen] = useState(false);
  const [rawJson, setRawJson] = useState('');
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setRawJson(JSON.stringify(appData, null, 2));
    setDirty(false);
  }, [appData]);

  const handleApply = useCallback(() => {
    try {
      const parsed = JSON.parse(rawJson || '{}');
      if (typeof parsed !== 'object' || parsed === null) return;
      setAppData(parsed);
      setDirty(false);
    } catch {
      // invalid json
    }
  }, [rawJson, setAppData]);

  const hasRoutes = Object.keys(routes).length > 0;

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
        <span>Data context (__bind)</span>
        <span className="text-gray-500">{open ? '▼' : '▶'}</span>
      </button>
      {open && (
        <div className="p-4 pt-0 space-y-3">
          {hasRoutes && (
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Route</label>
              <select
                value={currentRoute}
                onChange={(e) => setRoute(e.target.value)}
                className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1.5 text-sm"
              >
                {Object.keys(routes).map((path) => (
                  <option key={path} value={path}>{path}</option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">appData (for __bind)</label>
            <textarea
              value={rawJson}
              onChange={(e) => { setRawJson(e.target.value); setDirty(true); }}
              rows={8}
              className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1.5 text-xs font-mono"
            />
            {dirty && (
              <Button size="sm" variant="outline" className="mt-2" onClick={handleApply}>
                Apply JSON
              </Button>
            )}
          </div>
          <p className="text-xs text-gray-500">
            Use <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">__bind</code> in schema props to read from these paths. Use <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">__bindDir: &quot;twoWay&quot;</code> for inputs to write back.
          </p>
        </div>
      )}
    </div>
  );
}
