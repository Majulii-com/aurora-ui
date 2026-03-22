import { useCallback, useDeferredValue, useMemo, useState } from 'react';
import { useJsonPreviewPane } from '@majulii/aurora-ui';
import {
  parseAndLintGenUIDocument,
  GenUIProvider,
  GenUIRenderer,
  auroraGenUIRegistryTypes,
  cn,
  Button,
  useAuroraSurface,
} from '@majulii/aurora-ui';
import { GEN_FORM_TABS_SAMPLE, GEN_MINIMAL_SAMPLE } from './genSamples';
import { GEN_API_TABLE_SAMPLE } from './genApiTableSample';
import { GEN_MULTI_TREE_SAMPLE } from './genMultiTreeSample';
import { GenDSLChatPanel } from './GenDSLChatPanel';

/** Preview widths for responsive testing (CSS px). `full` = use entire preview column. */
const VIEWPORT_PRESETS = [
  { id: 'full' as const, label: 'Full', title: 'Use full preview column width' },
  { id: 320, label: '320', title: '320px — small phone' },
  { id: 375, label: '375', title: '375px — typical phone' },
  { id: 428, label: '428', title: '428px — large phone' },
  { id: 768, label: '768', title: '768px — tablet portrait' },
  { id: 1024, label: '1024', title: '1024px — tablet landscape / small laptop' },
  { id: 1280, label: '1280', title: '1280px — desktop' },
] as const;

type ViewportPresetId = (typeof VIEWPORT_PRESETS)[number]['id'];

function presetToSelectValue(id: ViewportPresetId): string {
  return id === 'full' ? 'full' : String(id);
}

function selectValueToPreset(value: string): ViewportPresetId {
  if (value === 'full') return 'full';
  const n = Number(value);
  const found = VIEWPORT_PRESETS.find((p) => p.id === n);
  return (found?.id ?? 'full') as ViewportPresetId;
}

function tryParseJson(text: string): unknown | null {
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

export function GenDSLPanel({ onBack }: { onBack: () => void }) {
  const [text, setText] = useState(GEN_MINIMAL_SAMPLE);
  const [viewportPreset, setViewportPreset] = useState<ViewportPresetId>('full');
  const deferredText = useDeferredValue(text);
  const { jsonPaneWidth, onSeparatorPointerDown } = useJsonPreviewPane();
  const ent = useAuroraSurface();

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
    <div className={cn('flex flex-col h-screen bg-gray-100 dark:bg-gray-900', ent.playgroundPage)}>
      <header
        className={cn(
          'shrink-0 flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800',
          ent.isAurora &&
            'border-slate-200/80 dark:border-slate-700/80 bg-white/90 dark:bg-slate-900/85 backdrop-blur-sm shadow-[var(--aurora-shadow-control)]'
        )}
      >
        <Button type="button" variant="ghost" size="sm" onClick={onBack}>
          ← Schema playground
        </Button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Generative JSON DSL</h1>
        <span className="text-sm text-gray-500">parse → lint → GenUIProvider → GenUIRenderer</span>
        <div className="flex items-center gap-2 min-w-0">
          <label htmlFor="gen-preview-viewport" className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap shrink-0">
            Preview width
          </label>
          <select
            id="gen-preview-viewport"
            value={presetToSelectValue(viewportPreset)}
            onChange={(e) => setViewportPreset(selectValueToPreset(e.target.value))}
            title="Constrains preview content width. Tailwind sm:/md: breakpoints still follow the browser viewport."
            className={cn(
              'max-w-[min(100vw-12rem,14rem)] text-sm rounded-md border border-gray-300 dark:border-gray-600',
              'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 pl-2 pr-8 py-1.5',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-0 dark:focus:ring-offset-gray-800'
            )}
          >
            {VIEWPORT_PRESETS.map((p) => (
              <option key={p.id === 'full' ? 'full' : p.id} value={presetToSelectValue(p.id)}>
                {p.id === 'full' ? 'Full — preview column' : `${p.label}px — ${p.title.replace(/^\d+px — /, '')}`}
              </option>
            ))}
          </select>
        </div>
        <div className="ml-auto flex flex-wrap gap-2">
          <Button type="button" size="sm" variant="outline" onClick={() => setText(GEN_MINIMAL_SAMPLE)}>
            Load minimal
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => setText(GEN_FORM_TABS_SAMPLE)}>
            Load tabs + form
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => setText(GEN_API_TABLE_SAMPLE)}>
            Load API + table
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => setText(GEN_MULTI_TREE_SAMPLE)}>
            Load multi + tree
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

        <div
          className={cn(
            'flex-1 min-w-0 min-h-0 flex flex-col bg-gray-50 dark:bg-gray-900/80 border-r border-gray-200 dark:border-gray-700',
            ent.playgroundGenColumn
          )}
        >
          <div
            className={cn(
              'shrink-0 p-3 border-b border-gray-200 dark:border-gray-700 space-y-2 max-h-[40%] overflow-auto',
              ent.isAurora && 'border-slate-200/80 dark:border-slate-700/80 bg-white/40 dark:bg-slate-900/20'
            )}
          >
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

          <div className={cn('flex-1 min-h-0 flex flex-col min-w-0', ent.playgroundCanvasMain)}>
            <div className="flex-1 min-h-0 overflow-auto p-4">
              {canRender && doc ? (
                <div
                  className={cn(
                    'flex justify-center min-h-full min-w-0',
                    viewportPreset !== 'full' && 'bg-[repeating-linear-gradient(90deg,transparent,transparent_8px,rgba(100,116,139,0.06)_8px,rgba(100,116,139,0.06)_9px)] dark:bg-[repeating-linear-gradient(90deg,transparent,transparent_8px,rgba(148,163,184,0.08)_8px,rgba(148,163,184,0.08)_9px)]'
                  )}
                >
                  <div
                    className={cn(
                      'rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 min-w-0 overflow-x-hidden overflow-y-visible shadow-sm transition-[width] duration-200 ease-out',
                      ent.playgroundGenPreview,
                      viewportPreset !== 'full' && 'ring-1 ring-gray-300/80 dark:ring-gray-600'
                    )}
                    style={
                      viewportPreset === 'full'
                        ? { width: '100%', maxWidth: '100%' }
                        : { width: `min(100%, ${viewportPreset}px)`, maxWidth: '100%' }
                    }
                  >
                    <GenUIProvider
                      key={deferredText.slice(0, 120)}
                      document={doc}
                      navigate={handleNav}
                      onCustom={handleCustom}
                    >
                      <GenUIRenderer
                        root={doc.ui}
                        className="w-full min-w-0 space-y-6 p-4 sm:p-6"
                      />
                    </GenUIProvider>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500 p-4">
                  {doc && !parseResult?.ok
                    ? 'Fix lint errors (e.g. tree depth) to render preview.'
                    : 'Fix JSON / Zod errors to render preview.'}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="w-72 shrink-0 min-w-[min(100%,18rem)] min-h-0 flex flex-col">
          <GenDSLChatPanel documentJson={text} />
        </div>
      </div>
    </div>
  );
}
