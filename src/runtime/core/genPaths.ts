export function setAtPathImmutable(
  data: Record<string, unknown>,
  path: string,
  value: unknown
): Record<string, unknown> {
  const keys = path.split('.').filter(Boolean);
  if (keys.length === 0) return data;
  if (keys.length === 1) {
    return { ...data, [keys[0]]: value };
  }
  const [head, ...rest] = keys;
  const restPath = rest.join('.');
  const existing = data[head];
  const child =
    existing != null && typeof existing === 'object' && !Array.isArray(existing)
      ? setAtPathImmutable(existing as Record<string, unknown>, restPath, value)
      : setAtPathImmutable({}, restPath, value);
  return { ...data, [head]: child };
}
