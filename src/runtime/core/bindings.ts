/**
 * Data binding utilities for schema-driven UIs (host app runtime).
 * Resolves __bind from app data and supports __eq for wizard/step visibility.
 * Use with SchemaRuntime or your own renderer.
 */

export function getAtPath(data: Record<string, unknown>, path: string): unknown {
  if (!path) return data;
  const keys = path.split('.');
  let current: unknown = data;
  for (const key of keys) {
    if (current == null || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}

export function setAtPath(
  data: Record<string, unknown>,
  path: string,
  value: unknown
): Record<string, unknown> {
  const keys = path.split('.');
  if (keys.length === 1) {
    return { ...data, [path]: value };
  }
  const [head, ...rest] = keys;
  const restPath = rest.join('.');
  const existing = (data[head] as Record<string, unknown>) ?? {};
  const child =
    typeof existing === 'object' && existing !== null && !Array.isArray(existing)
      ? setAtPath(existing as Record<string, unknown>, restPath, value)
      : setAtPath({}, restPath, value);
  return { ...data, [head]: child };
}

function isBindingObject(value: unknown): value is { __bind: string; __bindDir?: string } {
  return (
    typeof value === 'object' &&
    value !== null &&
    '__bind' in value &&
    typeof (value as { __bind: unknown }).__bind === 'string'
  );
}

export function isTwoWayBinding(value: unknown): boolean {
  return isBindingObject(value) && (value as { __bindDir?: string }).__bindDir === 'twoWay';
}

function isEqualityBinding(value: unknown): value is { __bind: string; __eq: unknown } {
  return (
    isBindingObject(value) &&
    '__eq' in value &&
    Object.prototype.hasOwnProperty.call(value, '__eq')
  );
}

export function resolveBindings(value: unknown, data: Record<string, unknown>): unknown {
  if (isEqualityBinding(value)) {
    const pathValue = getAtPath(data, value.__bind);
    return pathValue === value.__eq;
  }
  if (isBindingObject(value)) {
    return getAtPath(data, value.__bind);
  }
  if (Array.isArray(value)) {
    return value.map((item) => resolveBindings(item, data));
  }
  if (value !== null && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = resolveBindings(v, data);
    }
    return out;
  }
  return value;
}

export function collectTwoWayBindings(
  props: Record<string, unknown> | undefined
): Record<string, string> {
  if (!props) return {};
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(props)) {
    if (isTwoWayBinding(value)) {
      out[key] = (value as { __bind: string }).__bind;
    }
  }
  return out;
}

export const STATE_HANDLER_NAMES: Record<string, string> = {
  value: 'onChange',
  checked: 'onChange',
  page: 'onPageChange',
  pageSize: 'onPageSizeChange',
  sort: 'onSortChange',
  filter: 'onFilterChange',
  search: 'onSearchChange',
  selection: 'onSelectionChange',
  isOpen: 'onClose',
};

export function injectStateHandlers(
  resolvedProps: Record<string, unknown>,
  twoWayBindings: Record<string, string>,
  setData: (path: string, value: unknown) => void
): Record<string, unknown> {
  const out = { ...resolvedProps };
  for (const [propKey, path] of Object.entries(twoWayBindings)) {
    const handlerName =
      STATE_HANDLER_NAMES[propKey] ??
      `on${propKey.charAt(0).toUpperCase()}${propKey.slice(1)}Change`;
    if (propKey === 'value' || propKey === 'checked') {
      (out as Record<string, unknown>)[handlerName] = (
        e: { target: { value?: string; checked?: boolean } }
      ) => {
        const val = propKey === 'checked' ? e.target.checked : e.target.value;
        setData(path, val);
      };
    } else if (propKey === 'isOpen') {
      (out as Record<string, unknown>)[handlerName] = () => setData(path, false);
      (out as Record<string, unknown>)['onOpenChange'] = (v: boolean) => setData(path, v);
    } else {
      (out as Record<string, unknown>)[handlerName] = (newValue: unknown) => {
        setData(path, newValue);
      };
    }
  }
  return out;
}
