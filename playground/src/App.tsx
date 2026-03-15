import { useEffect } from 'react';
import { ThemeProvider } from '@majulii/aurora-ui';
import { Sidebar } from './Sidebar';
import { Canvas } from './Canvas';
import { SchemaPanel } from './SchemaPanel';
import { EventLog } from './EventLog';
import { DataPanel } from './DataPanel';
import { PropertiesPanel } from './PropertiesPanel';
import { PlaygroundProvider, usePlayground } from './store';

function PlaygroundLayout() {
  const { toast, clearToast } = usePlayground();

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(clearToast, 3000);
    return () => clearTimeout(t);
  }, [toast, clearToast]);

  return (
    <>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
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
        <PropertiesPanel />
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
    <ThemeProvider defaultTheme="light">
      <PlaygroundProvider>
        <PlaygroundLayout />
      </PlaygroundProvider>
    </ThemeProvider>
  );
}
