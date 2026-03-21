import { create } from 'zustand';
import type { UIState } from '../schema/genDocumentTypes';
import { setAtPathImmutable } from './genPaths';

export interface GenRuntimeState {
  state: UIState;
  lastError: string | null;
  loading: Record<string, boolean>;
}

export interface GenRuntimeActions {
  setState: (path: string, value: unknown) => void;
  mergeState: (patch: Record<string, unknown>) => void;
  replaceState: (next: UIState) => void;
  setLoading: (key: string, value: boolean) => void;
  setLastError: (msg: string | null) => void;
}

export type GenRuntimeStore = GenRuntimeState & GenRuntimeActions;

/** Zustand store: global state + SET_STATE / MERGE_STATE semantics */
export function createRuntimeStore(initial: UIState) {
  return create<GenRuntimeStore>((set) => ({
    state: { ...initial },
    lastError: null,
    loading: {},

    setState: (path, value) =>
      set((s) => ({
        state: setAtPathImmutable(s.state, path, value),
      })),

    mergeState: (patch) =>
      set((s) => ({
        state: { ...s.state, ...patch },
      })),

    replaceState: (next) => set({ state: { ...next } }),

    setLoading: (key, value) =>
      set((s) => ({
        loading: { ...s.loading, [key]: value },
      })),

    setLastError: (msg) => set({ lastError: msg }),
  }));
}
