import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';

const STORAGE_KEY = 'aurora-gen-dsl-json-pane-px';
const MIN = 240;
const MAX = 900;
const DEFAULT = 420;

function readInitial(): number {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v == null) return DEFAULT;
    const n = Number.parseInt(v, 10);
    if (Number.isFinite(n)) return Math.min(MAX, Math.max(MIN, n));
  } catch {
    /* ignore */
  }
  return DEFAULT;
}

/** Resizable split: JSON editor width (px) vs preview (`flex-1`). Persists to `localStorage`. */
export function useJsonPreviewPane() {
  const [jsonPaneWidth, setJsonPaneWidth] = useState(readInitial);
  const dragRef = useRef<{ x: number; w: number } | null>(null);

  const onSeparatorPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      dragRef.current = { x: e.clientX, w: jsonPaneWidth };
    },
    [jsonPaneWidth]
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragRef.current) return;
      const { x, w } = dragRef.current;
      setJsonPaneWidth(Math.min(MAX, Math.max(MIN, w + (e.clientX - x))));
    };
    const onUp = () => {
      if (!dragRef.current) return;
      dragRef.current = null;
      setJsonPaneWidth((w) => {
        try {
          localStorage.setItem(STORAGE_KEY, String(w));
        } catch {
          /* ignore */
        }
        return w;
      });
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, []);

  return { jsonPaneWidth, onSeparatorPointerDown };
}
