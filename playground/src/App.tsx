import { ThemeProvider } from '@majulii/aurora-ui';
import { Sidebar } from './Sidebar';
import { Canvas } from './Canvas';
import { SchemaPanel } from './SchemaPanel';
import { PlaygroundProvider } from './store';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <PlaygroundProvider>
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <Canvas />
            <SchemaPanel />
          </div>
        </div>
      </PlaygroundProvider>
    </ThemeProvider>
  );
}
