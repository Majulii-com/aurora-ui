import { useState, useCallback } from 'react';
import { usePlayground } from './store';
import { Button, cn } from '@majulii/aurora-ui';

export function SchemaPanel() {
  const { getSerializableSchema } = usePlayground();
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const schema = getSerializableSchema();
  const json = JSON.stringify(schema, null, 2);

  const copyToClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [json]);

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
        <span>UI Schema (AI-ready)</span>
        <span className="text-gray-500">{open ? '▼' : '▶'}</span>
      </button>
      {open && (
        <div className="p-4 pt-0">
          <div className="flex justify-end gap-2 mb-2">
            <Button size="sm" variant="outline" onClick={copyToClipboard}>
              {copied ? 'Copied!' : 'Copy JSON'}
            </Button>
          </div>
          <pre className="text-xs bg-gray-100 dark:bg-gray-900 rounded-lg p-4 overflow-auto max-h-[320px] text-gray-800 dark:text-gray-200 font-mono">
            {json}
          </pre>
          <p className="text-xs text-gray-500 mt-2">
            This schema is the single source of truth. Use it with UIRenderer or for AI generation.
          </p>
        </div>
      )}
    </div>
  );
}
