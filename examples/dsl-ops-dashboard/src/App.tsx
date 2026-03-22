import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ThemeProvider,
  GenUIProvider,
  GenUIRenderer,
  parseAndLintGenUIDocument,
  auroraGenUIRegistryTypes,
} from '@majulii/aurora-ui';
import type { GenUIDocument } from '@majulii/aurora-ui';
import enterpriseDashboardJson from './documents/enterprise-dashboard.json';

const doc = enterpriseDashboardJson as GenUIDocument;

export default function App() {
  const [navToast, setNavToast] = useState<string | null>(null);
  const [customToast, setCustomToast] = useState<string | null>(null);

  useEffect(() => {
    if (!navToast) return;
    const t = window.setTimeout(() => setNavToast(null), 4000);
    return () => window.clearTimeout(t);
  }, [navToast]);

  useEffect(() => {
    if (!customToast) return;
    const t = window.setTimeout(() => setCustomToast(null), 5000);
    return () => window.clearTimeout(t);
  }, [customToast]);

  const navigate = useCallback((path: string) => {
    setNavToast(`NAVIGATE → ${path} (wire to React Router / Next.js in production)`);
  }, []);

  const onCustom = useCallback((name: string, payload: unknown) => {
    setCustomToast(
      `CUSTOM “${name}” ${payload !== undefined ? JSON.stringify(payload) : ''} — handle exports, auth, etc. in the host`
    );
  }, []);

  const lint = useMemo(
    () => parseAndLintGenUIDocument(doc, { registryTypes: auroraGenUIRegistryTypes }),
    []
  );
  const lintIssues = lint.lint?.issues ?? [];
  const lintErrors = lintIssues.filter((i) => i.level === 'error');

  return (
    <ThemeProvider defaultAppearance="aurora" appearanceStorageKey="aurora-ops-dashboard-appearance">
      <div className="flex min-h-full flex-col bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <header className="shrink-0 border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto flex max-w-[1800px] flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-lg font-semibold">Enterprise ops dashboard (Gen DSL)</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                One <code className="rounded bg-slate-100 px-1 dark:bg-slate-800">GenUIDocument</code> —{' '}
                <code className="rounded bg-slate-100 px-1 dark:bg-slate-800">
                  examples/dsl-ops-dashboard/src/documents/enterprise-dashboard.json
                </code>
              </p>
            </div>
            <div className="text-right text-xs text-slate-500 dark:text-slate-400">
              Lint: {lintIssues.length} issue(s)
              {lintErrors.length > 0 && (
                <span className="ml-2 font-medium text-red-600 dark:text-red-400">
                  ({lintErrors.length} error)
                </span>
              )}
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

        <GenUIProvider document={doc} navigate={navigate} onCustom={onCustom}>
          <div className="mx-auto min-h-0 w-full max-w-[1800px] flex-1 overflow-auto">
            <GenUIRenderer root={doc.ui} />
          </div>
        </GenUIProvider>
      </div>
    </ThemeProvider>
  );
}
