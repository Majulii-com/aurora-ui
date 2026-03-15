import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export interface CanvasItem {
  id: string;
  type: string;
  props: Record<string, unknown>;
}

interface PlaygroundState {
  items: CanvasItem[];
  selectedId: string | null;
  addItem: (item: Omit<CanvasItem, 'id'>) => void;
  updateItem: (id: string, props: Record<string, unknown>) => void;
  removeItem: (id: string) => void;
  select: (id: string | null) => void;
}

const PlaygroundContext = createContext<PlaygroundState | null>(null);

export function PlaygroundProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CanvasItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const addItem = useCallback((item: Omit<CanvasItem, 'id'>) => {
    const id = `item-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    setItems((prev) => [...prev, { ...item, id }]);
    setSelectedId(id);
  }, []);

  const updateItem = useCallback((id: string, props: Record<string, unknown>) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, props } : i)));
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    setSelectedId((s) => (s === id ? null : s));
  }, []);

  return (
    <PlaygroundContext.Provider
      value={{
        items,
        selectedId,
        addItem,
        updateItem,
        removeItem,
        select: setSelectedId,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  );
}

export function usePlayground() {
  const ctx = useContext(PlaygroundContext);
  if (!ctx) throw new Error('usePlayground must be used within PlaygroundProvider');
  return ctx;
}
