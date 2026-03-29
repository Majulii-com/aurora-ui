import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';
import type { ToastInput, ToastRecord } from './Toast.types';

type ToastContextValue = {
  push: (t: ToastInput) => string;
  dismiss: (id: string) => void;
  toasts: ToastRecord[];
};

const ToastContext = createContext<ToastContextValue | null>(null);

function makeId(): string {
  return `toast-${Math.random().toString(36).slice(2, 11)}`;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    const t = timers.current.get(id);
    if (t) clearTimeout(t);
    timers.current.delete(id);
    setToasts((s) => s.filter((x) => x.id !== id));
  }, []);

  const push = useCallback(
    (input: ToastInput) => {
      const id = makeId();
      const duration = input.duration ?? 5000;
      const record: ToastRecord = { ...input, id };
      setToasts((s) => [...s, record]);
      if (duration > 0) {
        const handle = setTimeout(() => dismiss(id), duration);
        timers.current.set(id, handle);
      }
      return id;
    },
    [dismiss]
  );

  const value = useMemo(() => ({ push, dismiss, toasts }), [push, dismiss, toasts]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return ctx;
}

export function useOptionalToast(): ToastContextValue | null {
  return useContext(ToastContext);
}
