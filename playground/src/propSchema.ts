/**
 * Dynamic prop schema for the Properties panel.
 * Components can declare this in the registry; otherwise fields are inferred from defaultProps.
 */

export type PropEditorType = 'text' | 'number' | 'select' | 'boolean' | 'json';

export interface PropFieldDef {
  key: string;
  label: string;
  type: PropEditorType;
  options?: { value: string | number; label: string }[];
  /** If true, hide from the main form (e.g. handled by Design section or internal) */
  hidden?: boolean;
}

const SKIP_KEYS = new Set([
  'onClick', 'onChange', 'onPageChange', 'onClose', 'onOpenChange', 'ref', 'key',
  'className', 'style', // Handled by Design section in PropertiesPanel
  'onClickAction', 'onClickMessage', 'onClickPayload', // Handled by Events section in PropertiesPanel
]);

function isSelectOptionsArray(value: unknown): value is Array<{ value: string | number; label: string }> {
  return Array.isArray(value) && value.length > 0 && typeof value[0] === 'object' && value[0] !== null && 'value' in value[0] && 'label' in value[0];
}

function keyToLabel(key: string): string {
  if (key === 'children') return 'Label / Content';
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase()).trim();
}

/**
 * Infer prop field definitions from a component's defaultProps.
 * Enables zero-config props panel for new components.
 */
export function inferPropFields(defaultProps: Record<string, unknown>): PropFieldDef[] {
  const fields: PropFieldDef[] = [];
  for (const [key, value] of Object.entries(defaultProps)) {
    if (SKIP_KEYS.has(key)) continue;
    if (typeof value === 'function') continue;

    const label = keyToLabel(key);

    if (typeof value === 'number') {
      fields.push({ key, label, type: 'number' });
    } else if (typeof value === 'boolean') {
      fields.push({ key, label, type: 'boolean' });
    } else if (isSelectOptionsArray(value)) {
      fields.push({ key, label, type: 'select', options: value });
    } else if (Array.isArray(value)) {
      fields.push({ key, label, type: 'json' });
    } else if (value !== null && typeof value === 'object') {
      fields.push({ key, label, type: 'json' });
    } else {
      fields.push({ key, label, type: 'text' });
    }
  }
  return fields;
}

/**
 * Merge registry propSchema (explicit) with inferred fields from defaultProps.
 * Explicit schema takes precedence; any key not in propSchema is inferred and appended.
 */
export function resolvePropFields(
  propSchema: PropFieldDef[] | undefined,
  defaultProps: Record<string, unknown>
): PropFieldDef[] {
  if (propSchema && propSchema.length > 0) {
    const explicitKeys = new Set(propSchema.map((p) => p.key));
    const inferred = inferPropFields(defaultProps).filter((p) => !explicitKeys.has(p.key));
    return [...propSchema.filter((p) => !p.hidden), ...inferred];
  }
  return inferPropFields(defaultProps);
}
