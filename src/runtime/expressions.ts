/**
 * Safe expression resolver — no eval().
 * Supports: {{state.path}}, {{event.path}}, {{response.path}}, {{bindings.key}}
 */

import type { ExpressionContext } from '../schema/genDocumentTypes';
import { getAtPath } from './bindings';

const EXPR_PATTERN = /\{\{\s*([^}]+?)\s*\}\}/g;

const ALLOWED_ROOTS = new Set(['state', 'event', 'response', 'bindings']);

function resolveSingleExpression(inner: string, ctx: ExpressionContext): unknown {
  const trimmed = inner.trim();
  const parts = trimmed.split('.');
  const rootName = parts[0];
  if (!rootName || !ALLOWED_ROOTS.has(rootName)) {
    return undefined;
  }
  const rest = parts.slice(1).join('.');
  if (rootName === 'state') {
    return rest ? getAtPath(ctx.state as Record<string, unknown>, rest) : ctx.state;
  }
  if (rootName === 'event') {
    return ctx.event && rest ? getAtPath(ctx.event as Record<string, unknown>, rest) : ctx.event;
  }
  if (rootName === 'response') {
    return ctx.response != null && rest
      ? getAtPath(ctx.response as unknown as Record<string, unknown>, rest)
      : ctx.response;
  }
  if (rootName === 'bindings' && ctx.bindings) {
    return rest ? getAtPath(ctx.bindings as Record<string, unknown>, rest) : ctx.bindings;
  }
  return undefined;
}

export function resolveValue(value: unknown, ctx: ExpressionContext): unknown {
  if (typeof value !== 'string') return value;

  const fullMatch = value.match(/^\{\{\s*([^}]+)\s*\}\}$/);
  if (fullMatch) {
    return resolveSingleExpression(fullMatch[1], ctx);
  }

  return value.replace(EXPR_PATTERN, (_, inner: string) => {
    const resolved = resolveSingleExpression(inner, ctx);
    if (resolved === undefined || resolved === null) return '';
    if (typeof resolved === 'object') return JSON.stringify(resolved);
    return String(resolved);
  });
}

export function resolveDeep<T>(input: T, ctx: ExpressionContext): T {
  if (input === null || input === undefined) return input;
  if (typeof input === 'string') return resolveValue(input, ctx) as T;
  if (Array.isArray(input)) {
    return input.map((item) => resolveDeep(item, ctx)) as T;
  }
  if (typeof input === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(input as Record<string, unknown>)) {
      out[k] = resolveDeep(v, ctx);
    }
    return out as T;
  }
  return input;
}

export function sanitizeForLog(value: string): string {
  return value.replace(EXPR_PATTERN, '[expr]');
}

/**
 * Resolve document.bindings in key order; later entries may use {{bindings.earlier}}.
 */
export function resolveNamedBindingMap(
  raw: Record<string, string> | undefined,
  base: Pick<ExpressionContext, 'state' | 'event' | 'response'>
): Record<string, unknown> {
  if (!raw) return {};
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(raw)) {
    const ctx: ExpressionContext = { ...base, bindings: out };
    out[k] = resolveValue(v, ctx);
  }
  return out;
}
