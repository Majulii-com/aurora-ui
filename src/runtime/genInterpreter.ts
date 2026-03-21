import type { ActionDef } from '../schema/genDocumentTypes';
import type { GenRuntimeStore } from './genStore';
import { resolveValue, resolveDeep, sanitizeForLog } from './expressions';
import type { ExpressionContext } from '../schema/genDocumentTypes';

export type NavigateHandler = (path: string) => void;
export type CustomHandler = (name: string, payload: unknown) => void;

export interface InterpreterOptions {
  store: GenRuntimeStore;
  actionsRegistry?: Record<string, ActionDef>;
  navigate?: NavigateHandler;
  onCustom?: CustomHandler;
  /** Resolved `document.bindings` for `{{bindings.*}}` inside actions */
  resolvedBindings?: Record<string, unknown>;
}

function buildCtx(
  store: GenRuntimeStore,
  extra?: Partial<ExpressionContext>,
  resolvedBindings?: Record<string, unknown>
): ExpressionContext {
  return {
    state: store.state,
    event: extra?.event,
    response: extra?.response,
    bindings: extra?.bindings ?? resolvedBindings,
  };
}

async function runOne(
  action: ActionDef,
  opts: InterpreterOptions,
  ctx: ExpressionContext
): Promise<void> {
  const { store, navigate, onCustom } = opts;

  switch (action.type) {
    case 'SET_STATE': {
      const path = resolveValue(action.path, ctx) as string;
      const value = resolveDeep(action.value, ctx);
      if (typeof path === 'string' && path.length > 0) {
        store.setState(path, value);
      }
      break;
    }
    case 'MERGE_STATE': {
      const patch = resolveDeep(action.patch, ctx) as Record<string, unknown>;
      store.mergeState(patch);
      break;
    }
    case 'API_CALL': {
      const loadingKey = action.id ?? `api_${sanitizeForLog(action.url)}`;
      store.setLoading(loadingKey, true);
      store.setLastError(null);
      try {
        const url = resolveValue(action.url, ctx) as string;
        const method = action.method ?? 'GET';
        const headers = action.headers
          ? (resolveDeep(action.headers, ctx) as Record<string, string>)
          : { 'Content-Type': 'application/json' };
        const body =
          action.body !== undefined ? resolveDeep(action.body, ctx) : undefined;

        const res = await fetch(url, {
          method,
          headers,
          body:
            body !== undefined && method !== 'GET'
              ? typeof body === 'string'
                ? body
                : JSON.stringify(body)
              : undefined,
        });

        const text = await res.text();
        let data: unknown;
        try {
          data = text ? JSON.parse(text) : null;
        } catch {
          data = text;
        }

        const responseCtx: ExpressionContext = {
          ...ctx,
          response: data,
        };

        if (!res.ok) {
          store.setLastError(`HTTP ${res.status}`);
          if (action.onError?.chain) {
            for (const step of action.onError.chain) {
              await runOne(step, opts, { ...responseCtx, response: { status: res.status, data } });
            }
          }
        } else if (action.onSuccess?.chain) {
          for (const step of action.onSuccess.chain) {
            await runOne(step, opts, responseCtx);
          }
        }
      } catch (e) {
        store.setLastError(e instanceof Error ? e.message : 'Network error');
        if (action.onError?.chain) {
          const errCtx = { ...ctx, response: { error: String(e) } };
          for (const step of action.onError.chain) {
            await runOne(step, opts, errCtx);
          }
        }
      } finally {
        store.setLoading(loadingKey, false);
      }
      break;
    }
    case 'NAVIGATE': {
      const path = resolveValue(action.path, ctx) as string;
      if (typeof path === 'string' && navigate) navigate(path);
      break;
    }
    case 'CUSTOM': {
      onCustom?.(action.name, resolveDeep(action.payload, ctx));
      break;
    }
    case 'CHAIN': {
      for (const step of action.chain) {
        await runOne(step, opts, ctx);
      }
      break;
    }
    default: {
      const _exhaustive: never = action;
      console.warn('Unknown action', _exhaustive);
    }
  }
}

export async function runAction(
  actionRef: string | ActionDef,
  opts: InterpreterOptions,
  eventCtx?: Record<string, unknown>
): Promise<void> {
  const { store, actionsRegistry } = opts;
  let def: ActionDef | undefined;
  if (typeof actionRef === 'string') {
    def = actionsRegistry?.[actionRef];
    if (!def) {
      console.warn(`Action not found: ${actionRef}`);
      return;
    }
  } else {
    def = actionRef;
  }

  const ctx = buildCtx(store, { event: eventCtx }, opts.resolvedBindings);
  await runOne(def, opts, ctx);
}

export async function runChain(
  chain: ActionDef[],
  opts: InterpreterOptions,
  eventCtx?: Record<string, unknown>
): Promise<void> {
  const ctx = buildCtx(opts.store, { event: eventCtx }, opts.resolvedBindings);
  for (const step of chain) {
    await runOne(step, opts, ctx);
  }
}
