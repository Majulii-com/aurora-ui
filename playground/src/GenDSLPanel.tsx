import { useCallback, useDeferredValue, useMemo, useState } from 'react';
import { useJsonPreviewPane } from '@majulii/aurora-ui';
import {
  parseAndLintGenUIDocument,
  GenUIProvider,
  GenUIRenderer,
  auroraGenUIRegistryTypes,
  cn,
  Button,
} from '@majulii/aurora-ui';
import { GEN_FORM_TABS_SAMPLE, GEN_MINIMAL_SAMPLE } from './genSamples';
import { GEN_API_TABLE_SAMPLE } from './genApiTableSample';
import { GenDSLChatPanel } from './GenDSLChatPanel';

function tryParseJson(text: string): unknown | null {
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

export function GenDSLPanel({ onBack }: { onBack: () => void }) {
  const [text, setText] = useState(GEN_MINIMAL_SAMPLE);
  const deferredText = useDeferredValue(text);
  const { jsonPaneWidth, onSeparatorPointerDown } = useJsonPreviewPane();

  const parsed = useMemo(() => {
    const raw = tryParseJson(deferredText);
    if (raw === null) {
      return { kind: 'invalidJson' as const, message: 'Invalid JSON — check commas and quotes.' };
    }
    return {
      kind: 'result' as const,
      ...parseAndLintGenUIDocument(raw, { registryTypes: auroraGenUIRegistryTypes }),
    };
  }, [deferredText]);

  const handleNav = useCallback((path: string) => {
    console.info('[Gen DSL demo] NAVIGATE', path);
  }, []);

  const handleCustom = useCallback((name: string, payload: unknown) => {
    console.info('[Gen DSL demo] CUSTOM', name, payload);
  }, []);

  const parseResult = parsed.kind === 'result' ? parsed : null;
  const zodError = parseResult?.zodError;
  const lint = parseResult?.lint;
  const doc = parseResult?.document;
  const canRender = Boolean(parseResult?.ok && doc);

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <header className="shrink-0 flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <Button type="button" variant="ghost" size="sm" onClick={onBack}>
          ← Schema playground
        </Button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Generative JSON DSL</h1>
        <span className="text-sm text-gray-500">parse → lint → GenUIProvider → GenUIRenderer</span>
        <div className="ml-auto flex gap-2">
          <Button type="button" size="sm" variant="outline" onClick={() => setText(GEN_MINIMAL_SAMPLE)}>
            Load minimal
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => setText(GEN_FORM_TABS_SAMPLE)}>
            Load tabs + form
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => setText(GEN_API_TABLE_SAMPLE)}>
            Load API + table
          </Button>
        </div>
      </header>

      <div className="flex-1 flex min-h-0 min-w-0">
        <div
          className="shrink-0 flex flex-col border-r border-gray-200 dark:border-gray-700"
          style={{ width: jsonPaneWidth }}
        >
          <label className="sr-only" htmlFor="gen-json">
            GenUIDocument JSON
          </label>
          <textarea
            id="gen-json"
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck={false}
            className={cn(
              'flex-1 min-h-0 w-full p-3 font-mono text-sm',
              'bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100',
              'border-0 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500'
            )}
          />
        </div>

        <div
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize JSON and preview panels"
          tabIndex={0}
          onPointerDown={onSeparatorPointerDown}
          className={cn(
            'w-1.5 shrink-0 cursor-col-resize select-none z-10 touch-none',
            'bg-gray-200 hover:bg-primary-400 dark:bg-gray-600 dark:hover:bg-primary-500',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset'
          )}
        />

        <div className="flex-1 min-w-0 min-h-0 flex flex-col bg-gray-50 dark:bg-gray-900/80 border-r border-gray-200 dark:border-gray-700">
          <div className="shrink-0 p-3 border-b border-gray-200 dark:border-gray-700 space-y-2 max-h-[40%] overflow-auto">
            {parsed.kind === 'invalidJson' && (
              <div className="text-sm text-amber-700 dark:text-amber-300">{parsed.message}</div>
            )}
            {zodError && (
              <div className="text-sm">
                <span className="font-semibold text-red-600 dark:text-red-400">Zod</span>
                <pre className="mt-1 whitespace-pre-wrap text-red-800 dark:text-red-200">{zodError}</pre>
              </div>
            )}
            {lint && (
              <div className="text-sm space-y-1">
                <div className="font-medium text-gray-700 dark:text-gray-300">
                  Lint — nodes: {lint.stats.nodeCount}, depth: {lint.stats.maxDepth}
                </div>
                {lint.issues.length === 0 ? (
                  <p className="text-green-700 dark:text-green-400">No issues.</p>
                ) : (
                  <ul className="list-outside list-disc space-y-0.5 pl-5">
                    {lint.issues.map((i, idx) => (
                      <li
                        key={`${i.code}-${i.path ?? 'root'}-${idx}`}
                        className={i.level === 'error' ? 'text-red-700 dark:text-red-300' : 'text-amber-800 dark:text-amber-200'}
                      >
                        [{i.code}] {i.message}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          <div className="flex-1 min-h-0 overflow-auto p-4">
            {canRender && doc ? (
              <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 min-w-0 overflow-x-auto shadow-sm">
                <GenUIProvider
                  key={deferredText.slice(0, 120)}
                  document={doc}
                  navigate={handleNav}
                  onCustom={handleCustom}
                >
                  <GenUIRenderer
                    root={doc.ui}
                    className="w-full min-w-0 max-w-3xl mx-auto space-y-6 p-4 sm:p-6"
                  />
                </GenUIProvider>
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                {doc && !parseResult?.ok
                  ? 'Fix lint errors (e.g. tree depth) to render preview.'
                  : 'Fix JSON / Zod errors to render preview.'}
              </p>
            )}
          </div>
        </div>

        <div className="w-72 shrink-0 min-w-[min(100%,18rem)] min-h-0 flex flex-col">
          <GenDSLChatPanel documentJson={text} />
        </div>
      </div>
    </div>
  );
}
