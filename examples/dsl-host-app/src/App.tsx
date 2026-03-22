import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ThemeProvider,
  GenUIProvider,
  GenUIRenderer,
  parseAndLintGenUIDocument,
  auroraGenUIRegistryTypes,
  cn,
} from '@majulii/aurora-ui';
import { DSL_EXAMPLES, getExampleById, type DslExampleMeta } from './catalog';

const STORAGE_KEY = 'aurora-dsl-host-example';

function readInitialId(): string {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v && getExampleById(v)) return v;
  } catch {
    /* ignore */
  }
  return DSL_EXAMPLES[0]?.id ?? 'dashboard';
}

export default function App() {
  const [selectedId, setSelectedId] = useState(readInitialId);
  const [navToast, setNavToast] = useState<string | null>(null);
  const [customToast, setCustomToast] = useState<string | null>(null);

  const selected: DslExampleMeta | undefined = useMemo(
    () => getExampleById(selectedId),
    [selectedId]
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, selectedId);
    } catch {
      /* ignore */
    }
  }, [selectedId]);

  useEffect(() => {
    if (!navToast) return;
    const t = window.setTimeout(() => setNavToast(null), 4000);
    return () => window.clearTimeout(t);
  }, [navToast]);

  useEffect(() => {
    if (!customToast) return;
    const t = window.setTimeout(() => setCustomToast(null), 4000);
    return () => window.clearTimeout(t);
  }, [customToast]);

  const navigate = useCallback((path: string) => {
    setNavToast(`NAVIGATE → ${path} (wire to React Router / Next.js in your app)`);
  }, []);

  const onCustom = useCallback((name: string, payload: unknown) => {
    setCustomToast(`CUSTOM “${name}” ${payload !== undefined ? JSON.stringify(payload) : ''}`);
  }, []);

  const doc = selected?.document;

  const lintPanel = useMemo(() => {
    if (!doc) return null;
    return parseAndLintGenUIDocument(doc, { registryTypes: auroraGenUIRegistryTypes });
  }, [doc]);

  const lintIssues =
    lintPanel && 'lint' in lintPanel && lintPanel.lint ? lintPanel.lint.issues : [];
  const lintErrors = lintIssues.filter((i) => i.level === 'error');

  return (
    <ThemeProvider
      defaultAppearance="aurora"
      appearanceStorageKey="aurora-dsl-host-appearance"
    >
      <div className="flex h-screen min-h-0 flex-col bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <header className="shrink-0 border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-3">
            <div>
              <h1 className="text-lg font-semibold">DSL host example</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Same integration as a production app: AI/backend supplies JSON →{' '}
                <code className="rounded bg-slate-100 px-1 dark:bg-slate-800">GenUIProvider</code> +{' '}
                <code className="rounded bg-slate-100 px-1 dark:bg-slate-800">GenUIRenderer</code>
              </p>
            </div>
            <div className="ml-auto flex flex-wrap gap-2">
              {DSL_EXAMPLES.map((ex) => (
                <button
                  key={ex.id}
                  type="button"
                  onClick={() => setSelectedId(ex.id)}
                  className={cn(
                    'rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors',
                    selectedId === ex.id
                      ? 'border-primary-600 bg-primary-600 text-white'
                      : 'border-slate-300 bg-white hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700'
                  )}
                >
                  {ex.title}
                </button>
              ))}
            </div>
          </div>
        </header>

        {(navToast || customToast) && (
          <div
            className="shrink-0 border-b border-primary-200 bg-primary-50 px-4 py-2 text-sm text-primary-900 dark:border-primary-900 dark:bg-primary-950/80 dark:text-primary-100"
            role="status"
          >
            {navToast ?? customToast}
          </div>
        )}

        <div className="mx-auto flex min-h-0 w-full max-w-[1600px] flex-1 flex-col gap-3 p-4 md:flex-row">
          <aside className="shrink-0 md:w-72">
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm dark:border-slate-700 dark:bg-slate-900">
              <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                {selected?.title ?? '—'}
              </h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">{selected?.description}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {selected?.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs text-slate-500 dark:text-slate-500">
                JSON lives in <code className="text-[11px]">examples/dsl-host-app/src/documents/</code>.
              </p>
            </div>
          </aside>

          <main className="min-h-0 min-w-0 flex-1 overflow-auto rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
            {doc ? (
              <>
                {lintErrors.length > 0 && (
                  <div className="border-b border-red-200 bg-red-50 px-4 py-2 text-sm text-red-900 dark:border-red-900 dark:bg-red-950/50 dark:text-red-100">
                    {lintErrors.length} lint error(s) — fix JSON or registry before shipping.
                  </div>
                )}
                <GenUIProvider
                  key={selectedId}
                  document={doc}
                  navigate={navigate}
                  onCustom={onCustom}
                >
                  <div className="p-4 md:p-6">
                    <GenUIRenderer root={doc.ui} />
                  </div>
                </GenUIProvider>
              </>
            ) : (
              <div className="p-6 text-red-700 dark:text-red-300">
                <p className="font-medium">Unknown example.</p>
              </div>
            )}
          </main>

          <aside className="shrink-0 md:w-80">
            <div className="rounded-xl border border-slate-200 bg-white p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900">
              <div className="mb-2 font-sans text-sm font-semibold text-slate-700 dark:text-slate-200">
                Lint ({lintIssues.length} issues)
              </div>
              {lintIssues.length === 0 ? (
                <p className="text-green-700 dark:text-green-400">No issues for default registry.</p>
              ) : (
                <ul className="max-h-48 list-outside list-disc space-y-1 pl-4 text-amber-900 dark:text-amber-200">
                  {lintIssues.slice(0, 12).map((issue, idx) => (
                    <li key={`${issue.code}-${idx}`}>
                      [{issue.code}] {issue.message}
                    </li>
                  ))}
                  {lintIssues.length > 12 && (
                    <li className="list-none pl-0 text-slate-500">…</li>
                  )}
                </ul>
              )}
            </div>
          </aside>
        </div>
      </div>
    </ThemeProvider>
  );
}
