import { useEffect, useState } from 'react';
import { ThemeProvider, cn, useAuroraSurface } from '@majulii/aurora-ui';
import { Sidebar } from './Sidebar';
import { Canvas } from './Canvas';
import { SchemaPanel } from './SchemaPanel';
import { EventLog } from './EventLog';
import { DataPanel } from './DataPanel';
import { PropertiesPanel } from './PropertiesPanel';
import { ChatPanel } from './ChatPanel';
import { GenDSLPanel } from './GenDSLPanel';
import { PlaygroundProvider, usePlayground } from '@majulii/aurora-ui';

function PlaygroundLayout() {
  const ent = useAuroraSurface();
  const [mode, setMode] = useState<'canvas' | 'gen'>(() => {
    try {
      const v = localStorage.getItem('aurora-playground-mode');
      return v === 'gen' ? 'gen' : 'canvas';
    } catch {
      return 'canvas';
    }
  });

  const { toast, clearToast } = usePlayground();

  useEffect(() => {
    try {
      localStorage.setItem('aurora-playground-mode', mode);
    } catch {
      /* ignore */
    }
  }, [mode]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(clearToast, 3000);
    return () => clearTimeout(t);
  }, [toast, clearToast]);

  if (mode === 'gen') {
    return <GenDSLPanel onBack={() => setMode('canvas')} />;
  }

  return (
    <>
      <div className={cn('relative flex h-screen bg-gray-100 dark:bg-gray-900', ent.playgroundPage)}>
        <div className="absolute top-2 right-2 z-50 flex gap-2">
          <button
            type="button"
            onClick={() => setMode('gen')}
            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-primary-600 text-white hover:bg-primary-700 shadow"
          >
            Generative JSON DSL
          </button>
        </div>
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Canvas />
          <div className="flex flex-col sm:flex-row border-t border-gray-200 dark:border-gray-700 max-h-[320px] overflow-hidden">
            <div className="flex-1 min-w-0 overflow-auto">
              <SchemaPanel />
            </div>
            <div className="flex-1 min-w-0 border-t sm:border-t-0 sm:border-l border-gray-200 dark:border-gray-700 overflow-auto">
              <EventLog />
            </div>
            <div className="flex-1 min-w-0 border-t sm:border-t-0 sm:border-l border-gray-200 dark:border-gray-700 overflow-auto">
              <DataPanel />
            </div>
          </div>
        </div>
        <aside className="w-[420px] flex flex-col border-l border-gray-200 dark:border-gray-700 shrink-0 bg-gray-50 dark:bg-gray-900/50">
          <div className="min-h-0 shrink-0 flex flex-col" style={{ maxHeight: '45%' }}>
            <ChatPanel />
          </div>
          <div className="flex-1 min-h-[240px] flex flex-col border-t border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800">
            <PropertiesPanel />
          </div>
        </aside>
      </div>
      {toast && (
        <div
          role="status"
          className="fixed bottom-4 right-4 z-50 max-w-sm rounded-lg bg-gray-800 dark:bg-gray-700 text-white px-4 py-3 shadow-lg border border-gray-700"
          onClick={clearToast}
        >
          {toast}
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider
      defaultTheme="light"
      defaultAppearance="aurora"
      appearanceStorageKey="aurora-playground-appearance"
    >
      <PlaygroundProvider>
        <PlaygroundLayout />
      </PlaygroundProvider>
    </ThemeProvider>
  );
}
