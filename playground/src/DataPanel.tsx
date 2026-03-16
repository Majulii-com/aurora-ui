import { useState, useCallback, useEffect } from 'react';
import { usePlayground } from './store';
import { Button, cn } from '@majulii/aurora-ui';
import type { UINode } from '@majulii/aurora-ui';

/**
 * Panel to view and edit app data context (used by __bind and setData).
 * Supports loading full UI definition (schema + initialState) per docs.
 * See docs/COMPLEX_COMPONENTS.md, AI_UI_GENERATION_GUIDE.md, REAL_LIFE_SCENARIOS.md.
 */
export function DataPanel() {
  const { appData, setAppData, setSchema, routes, currentRoute, setRoute } = usePlayground();
  const [open, setOpen] = useState(false);
  const [definitionOpen, setDefinitionOpen] = useState(false);
  const [rawJson, setRawJson] = useState('');
  const [definitionJson, setDefinitionJson] = useState('');
  const [dirty, setDirty] = useState(false);
  const [definitionError, setDefinitionError] = useState<string | null>(null);

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

  const handleLoadDefinition = useCallback(() => {
    setDefinitionError(null);
    try {
      const parsed = JSON.parse(definitionJson || '{}');
      if (typeof parsed !== 'object' || parsed === null) return;
      if (parsed.schema != null) {
        const schema = parsed.schema as UINode;
        setSchema(schema.id ? schema : { ...schema, id: 'root' });
      }
      if (parsed.initialState != null && typeof parsed.initialState === 'object') {
        setAppData(parsed.initialState as Record<string, unknown>);
      }
      setDefinitionJson('');
    } catch (e) {
      setDefinitionError(e instanceof Error ? e.message : 'Invalid JSON');
    }
  }, [definitionJson, setSchema, setAppData]);

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

          <div className="border-t border-gray-200 dark:border-gray-600 pt-3 mt-3">
            <button
              type="button"
              onClick={() => setDefinitionOpen((o) => !o)}
              className={cn(
                'w-full flex items-center justify-between text-left text-sm font-medium',
                'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
              )}
            >
              <span>Load UI definition (schema + initialState)</span>
              <span className="text-gray-500">{definitionOpen ? '▼' : '▶'}</span>
            </button>
            {definitionOpen && (
              <div className="mt-2 space-y-2">
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">
                  Paste JSON: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">{'{"schema": {...}, "initialState": {...}}'}</code>
                </label>
                <textarea
                  value={definitionJson}
                  onChange={(e) => { setDefinitionJson(e.target.value); setDefinitionError(null); }}
                  placeholder='{"schema": {"type": "Page", "id": "root", "props": {}, "children": []}, "initialState": {"ui": {}}}'
                  rows={6}
                  className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1.5 text-xs font-mono"
                />
                {definitionError && <p className="text-xs text-red-600 dark:text-red-400">{definitionError}</p>}
                <Button size="sm" variant="primary" onClick={handleLoadDefinition}>
                  Load definition
                </Button>
                <p className="text-xs text-gray-500">
                  Sets schema and/or app state from one JSON. Use for AI-generated or saved UI definitions (see AI_UI_GENERATION_GUIDE.md, REAL_LIFE_SCENARIOS.md).
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
