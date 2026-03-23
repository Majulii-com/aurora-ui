import { useCallback, useEffect, useState } from 'react';
import {
  ThemeProvider,
  GenUIProvider,
  GenUIRenderer,
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


  return (
    <ThemeProvider
      defaultAppearance="aurora"
      appearanceStorageKey="aurora-ops-dashboard-appearance"
    >
      <div className="flex min-h-full flex-col bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <GenUIProvider document={doc} navigate={navigate} onCustom={onCustom}>
          <GenUIRenderer root={doc.ui} />
        </GenUIProvider>
      </div>
    </ThemeProvider>
  );
}
