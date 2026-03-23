import type { GenRuntimeStore } from '../gen/genStore';
import type { EngineActionContext, EngineErrorHandler } from './engineTypes';

type ReporterOpts = {
  store: GenRuntimeStore;
  onEngineError?: EngineErrorHandler;
};

/**
 * Central place for Gen DSL engine failures: updates store, optional host callback,
 * and a non-throwing dev console hint.
 */
export function reportEngineError(
  opts: ReporterOpts,
  error: unknown,
  info: EngineActionContext
): void {
  const message = error instanceof Error ? error.message : String(error);
  opts.store.setLastError(message);

  const err = error instanceof Error ? error : new Error(message);
  opts.onEngineError?.(err, info);

  if (!opts.onEngineError && typeof console !== 'undefined' && console.error) {
    console.error('[@majulii/aurora-ui Gen engine]', info.phase, info, err);
  }
}
