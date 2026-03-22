import React, { createContext, useContext, useEffect, useMemo, useRef } from 'react';
import type { GenUIDocument } from '../schema/genDocumentTypes';
import { createRuntimeStore, type GenRuntimeStore } from './genStore';
import type { InterpreterOptions } from './genInterpreter';
import { runAction } from './genInterpreter';
import type { ActionDef } from '../schema/genDocumentTypes';
import { resolveNamedBindingMap } from './expressions';
import type { EngineErrorHandler } from './core/engineTypes';

type GenUIContextValue = {
  document: GenUIDocument;
  storeApi: ReturnType<typeof createRuntimeStore>;
  getStore: () => GenRuntimeStore;
  actions: Record<string, ActionDef>;
  navigate?: (path: string) => void;
  onCustom?: (name: string, payload: unknown) => void;
  onEngineError?: EngineErrorHandler;
};

const Ctx = createContext<GenUIContextValue | null>(null);

export function GenUIProvider({
  document,
  children,
  navigate,
  onCustom,
  onEngineError,
}: {
  document: GenUIDocument;
  children: React.ReactNode;
  navigate?: (path: string) => void;
  onCustom?: (name: string, payload: unknown) => void;
  /** Forwarded into the Gen action interpreter (unexpected throws, invalid MERGE shapes, etc.). */
  onEngineError?: EngineErrorHandler;
}) {
  const storeApi = useMemo(() => createRuntimeStore(document.state ?? {}), [document]);

  const value = useMemo<GenUIContextValue>(
    () => ({
      document,
      storeApi,
      getStore: () => storeApi.getState(),
      actions: document.actions ?? {},
      navigate,
      onCustom,
      onEngineError,
    }),
    [document, storeApi, navigate, onCustom, onEngineError]
  );

  return (
    <Ctx.Provider value={value}>
      <GenDocumentMountAction onMountAction={document.onMountAction} />
      {children}
    </Ctx.Provider>
  );
}

/** Runs `document.onMountAction` once per mount / when the action id string changes. */
function GenDocumentMountAction({ onMountAction }: { onMountAction?: string }) {
  const run = useRunAction();
  const runRef = useRef(run);
  runRef.current = run;
  useEffect(() => {
    if (!onMountAction || typeof onMountAction !== 'string') return;
    void runRef.current(onMountAction);
  }, [onMountAction]);
  return null;
}

export function useGenUI() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useGenUI must be used under GenUIProvider');
  return v;
}

export function useGenUIDocument(): GenUIDocument {
  return useGenUI().document;
}

export function useGenUIState<T>(selector: (s: GenRuntimeStore) => T): T {
  const { storeApi } = useGenUI();
  return storeApi(selector);
}

export function useRunAction() {
  const { getStore, actions, navigate, onCustom, onEngineError, document } = useGenUI();
  const state = useGenUIState((s) => s.state);

  const resolvedBindings = useMemo(
    () =>
      resolveNamedBindingMap(document.bindings, {
        state,
        event: undefined,
        response: undefined,
      }),
    [document.bindings, state]
  );

  return useMemo(
    () =>
      async (ref: string | ActionDef, event?: Record<string, unknown>) => {
        const opts: InterpreterOptions = {
          store: getStore(),
          actionsRegistry: actions,
          navigate,
          onCustom,
          resolvedBindings,
          onEngineError,
        };
        await runAction(ref, opts, event);
      },
    [getStore, actions, navigate, onCustom, onEngineError, resolvedBindings]
  );
}
