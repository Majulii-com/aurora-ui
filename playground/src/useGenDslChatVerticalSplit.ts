import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';

const STORAGE_KEY = 'aurora-gen-dsl-chat-messages-share';
const DEFAULT = 0.68;
const MIN = 0.12;
const MAX = 0.92;

function readInitial(): number {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v == null) return DEFAULT;
    const n = Number.parseFloat(v);
    if (Number.isFinite(n)) return Math.min(MAX, Math.max(MIN, n));
  } catch {
    /* ignore */
  }
  return DEFAULT;
}

/**
 * Vertical split between chat messages (top) and input (bottom). Drag the separator to resize.
 * Persists the messages-area fraction to `localStorage`.
 */
export function useGenDslChatVerticalSplit() {
  const [messagesShare, setMessagesShare] = useState(readInitial);
  const bodyRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  function onSeparatorPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    e.preventDefault();
    draggingRef.current = true;
  }

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current || !bodyRef.current) return;
      const rect = bodyRef.current.getBoundingClientRect();
      const h = rect.height;
      if (h < 16) return;
      const y = e.clientY - rect.top;
      const share = y / h;
      setMessagesShare(Math.min(MAX, Math.max(MIN, share)));
    };

    const end = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      setMessagesShare((s) => {
        try {
          localStorage.setItem(STORAGE_KEY, String(s));
        } catch {
          /* ignore */
        }
        return s;
      });
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', end);
    window.addEventListener('pointercancel', end);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', end);
      window.removeEventListener('pointercancel', end);
    };
  }, []);

  const splitPct = Math.round(messagesShare * 100);

  return {
    bodyRef,
    messagesShare,
    splitPct,
    onSeparatorPointerDown,
  };
}
