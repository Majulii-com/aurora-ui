import React, { useMemo, useState, useEffect } from 'react';
import { usePlayground } from './store';
import { registry } from '../ComponentRegistry';
import { resolvePropFields } from './propSchema';
import type { PropFieldDef } from './propSchema';
import { Button, cn } from '@majulii/aurora-ui';

const WIDTH_OPTIONS = [
  { value: '', label: 'Default' },
  { value: 'w-full', label: 'Full width' },
  { value: 'w-1/2', label: 'Half' },
  { value: 'w-1/3', label: 'Third' },
  { value: 'w-64', label: '16rem' },
  { value: 'w-48', label: '12rem' },
  { value: 'max-w-md', label: 'Max medium' },
  { value: 'max-w-lg', label: 'Max large' },
];

const HEIGHT_OPTIONS = [
  { value: '', label: 'Default' },
  { value: 'h-8', label: '2rem' },
  { value: 'h-10', label: '2.5rem' },
  { value: 'h-12', label: '3rem' },
  { value: 'h-16', label: '4rem' },
  { value: 'h-24', label: '6rem' },
  { value: 'h-32', label: '8rem' },
  { value: 'min-h-screen', label: 'Full height' },
];

const MARGIN_OPTIONS = [
  { value: '', label: 'None' },
  { value: 'm-0', label: '0' },
  { value: 'm-1', label: '0.25rem' },
  { value: 'm-2', label: '0.5rem' },
  { value: 'm-3', label: '0.75rem' },
  { value: 'm-4', label: '1rem' },
  { value: 'm-5', label: '1.25rem' },
  { value: 'm-6', label: '1.5rem' },
  { value: 'm-8', label: '2rem' },
  { value: 'm-10', label: '2.5rem' },
  { value: 'm-auto', label: 'Auto' },
];

const PADDING_OPTIONS = [
  { value: '', label: 'None' },
  { value: 'p-0', label: '0' },
  { value: 'p-1', label: '0.25rem' },
  { value: 'p-2', label: '0.5rem' },
  { value: 'p-3', label: '0.75rem' },
  { value: 'p-4', label: '1rem' },
  { value: 'p-5', label: '1.25rem' },
  { value: 'p-6', label: '1.5rem' },
  { value: 'p-8', label: '2rem' },
  { value: 'p-10', label: '2.5rem' },
];

const ON_CLICK_ACTION_OPTIONS = [
  { value: '', label: 'None' },
  { value: 'log', label: 'Log to console' },
  { value: 'toast', label: 'Show toast' },
  { value: 'alert', label: 'Browser alert' },
  { value: 'updateNode', label: 'Update another component' },
  { value: 'sequence', label: 'Run multiple actions (sequence)' },
  { value: 'setData', label: 'Set data path (appData)' },
  { value: 'navigate', label: 'Navigate (route)' },
  { value: '__custom', label: 'Custom (any registered action)' },
];

function PropField({
  def,
  value,
  onChange,
}: {
  def: PropFieldDef;
  value: unknown;
  onChange: (key: string, value: unknown) => void;
}) {
  const current = value != null ? value : '';

  if (def.type === 'select') {
    return (
      <div className="space-y-1">
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">{def.label}</label>
        <select
          value={String(current)}
          onChange={(e) => {
            const v = e.target.value;
            const opt = def.options?.find((o) => String(o.value) === v);
            onChange(def.key, opt?.value ?? v);
          }}
          className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1.5 text-sm"
        >
          {def.options?.map((o) => (
            <option key={String(o.value)} value={String(o.value)}>{o.label}</option>
          ))}
        </select>
      </div>
    );
  }

  if (def.type === 'number') {
    return (
      <div className="space-y-1">
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">{def.label}</label>
        <input
          type="number"
          value={Number(current) || ''}
          onChange={(e) => onChange(def.key, e.target.value === '' ? undefined : Number(e.target.value))}
          className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1.5 text-sm"
        />
      </div>
    );
  }

  if (def.type === 'boolean') {
    return (
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={Boolean(current)}
          onChange={(e) => onChange(def.key, e.target.checked)}
          className="rounded"
        />
        <label className="text-xs font-medium text-gray-600 dark:text-gray-400">{def.label}</label>
      </div>
    );
  }

  if (def.type === 'json') {
    const raw = typeof current === 'string' ? current : JSON.stringify(current, null, 2);
    return (
      <div className="space-y-1">
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">{def.label}</label>
        <textarea
          value={raw}
          onChange={(e) => {
            const v = e.target.value;
            try {
              const parsed = JSON.parse(v || 'null');
              onChange(def.key, parsed);
            } catch {
              onChange(def.key, v);
            }
          }}
          rows={3}
          className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1.5 text-sm font-mono"
        />
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">{def.label}</label>
      <input
        type="text"
        value={String(current)}
        onChange={(e) => onChange(def.key, e.target.value)}
        className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1.5 text-sm"
      />
    </div>
  );
}

function collectNodeIds(
  node: { id?: string; type: string; children?: unknown[] },
  list: { id: string; type: string; label: string }[]
): void {
  if (node.id) list.push({ id: node.id, type: node.type, label: `${node.type} (${node.id})` });
  (node.children as { id?: string; type: string; children?: unknown[] }[] | undefined)?.forEach((c) => collectNodeIds(c, list));
}

export function PropertiesPanel() {
  const { schema, selectedId, selectedNode, updateNode, setNodeProps, select } = usePlayground();
  const [rawOpen, setRawOpen] = useState(false);
  const [updateNodePropsDraft, setUpdateNodePropsDraft] = useState('');
  const [sequenceStepsDraft, setSequenceStepsDraft] = useState('');
  const nodeIdOptions = useMemo(() => {
    const list: { id: string; type: string; label: string }[] = [];
    collectNodeIds(schema, list);
    return list.filter((n) => n.id !== selectedId);
  }, [schema, selectedId]);

  useEffect(() => {
    setUpdateNodePropsDraft('');
    setSequenceStepsDraft('');
  }, [selectedId]);

  const propDefs = useMemo(() => {
    if (!selectedNode) return [];
    const entry = registry.find((r) => r.id === selectedNode.type);
    return resolvePropFields(entry?.propSchema, entry?.defaultProps ?? {});
  }, [selectedNode?.type]);

  const props = selectedNode?.props ?? {};
  const payload = (props.onClickPayload as Record<string, unknown>) ?? {};
  const updateNodePayload = (props.onClickAction as string) === 'updateNode' ? payload : null;
  const sequencePayload = (props.onClickAction as string) === 'sequence' ? payload : null;
  const updateNodePropsJson = useMemo(
    () => (updateNodePayload?.props != null ? JSON.stringify(updateNodePayload.props, null, 2) : '{}'),
    [selectedId, updateNodePayload?.props]
  );
  const sequenceStepsJson = useMemo(
    () => (Array.isArray(sequencePayload?.steps) ? JSON.stringify(sequencePayload.steps, null, 2) : '[]'),
    [selectedId, sequencePayload?.steps]
  );

  const handlePropChange = (key: string, value: unknown) => {
    if (!selectedId) return;
    updateNode(selectedId, { [key]: value });
  };

  const isMarginClass = (c: string) => /^(m|mx|my|mt|mr|mb|ml)(-\S+)?$/.test(c);
  const isPaddingClass = (c: string) => /^(p|px|py|pt|pr|pb|pl)(-\S+)?$/.test(c);
  const classNameParts = (props.className as string)?.split(/\s+/) ?? [];
  const widthClass = classNameParts.find((c) => c.startsWith('w-') || c.startsWith('max-w')) ?? '';
  const heightClass = classNameParts.find((c) => c.startsWith('h-') || c.startsWith('min-h')) ?? '';
  const marginClass = classNameParts.find(isMarginClass) ?? '';
  const paddingClass = classNameParts.find(isPaddingClass) ?? '';
  const otherClass = classNameParts
    .filter(
      (c) =>
        !c.startsWith('w-') &&
        !c.startsWith('max-w') &&
        !c.startsWith('h-') &&
        !c.startsWith('min-h') &&
        !isMarginClass(c) &&
        !isPaddingClass(c)
    )
    .join(' ');

  const buildClassName = (overrides: { width?: string; height?: string; margin?: string; padding?: string; other?: string }) =>
    [
      overrides.width ?? widthClass,
      overrides.height ?? heightClass,
      overrides.margin ?? marginClass,
      overrides.padding ?? paddingClass,
      overrides.other ?? otherClass,
    ]
      .filter(Boolean)
      .join(' ') || undefined;

  const setWidth = (v: string) => handlePropChange('className', buildClassName({ width: v }));
  const setHeight = (v: string) => handlePropChange('className', buildClassName({ height: v }));
  const setMargin = (v: string) => handlePropChange('className', buildClassName({ margin: v }));
  const setPadding = (v: string) => handlePropChange('className', buildClassName({ padding: v }));
  const setCustomClass = (v: string) => handlePropChange('className', buildClassName({ other: v }));

  const setRawProps = (raw: string) => {
    if (!selectedId) return;
    try {
      const parsed = JSON.parse(raw || '{}');
      setNodeProps(selectedId, parsed);
    } catch {
      // invalid json, ignore
    }
  };

  if (!selectedId || !selectedNode) {
    return (
      <aside className="w-72 border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 text-sm p-4">
        Select a component to edit its props and design.
      </aside>
    );
  }

  return (
    <aside className="w-72 border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col overflow-hidden">
      <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{selectedNode.type}</h3>
        <Button size="sm" variant="ghost" className="!p-1" onClick={() => select(null)} aria-label="Close panel">
          ×
        </Button>
      </div>
      <div className="flex-1 overflow-auto p-3 space-y-4">
        {propDefs.length > 0 && (
          <section>
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Props</h4>
            <div className="space-y-2">
              {propDefs.map((def) => (
                <PropField
                  key={def.key}
                  def={def}
                  value={props[def.key]}
                  onChange={handlePropChange}
                />
              ))}
            </div>
          </section>
        )}

        <section>
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Size & layout</h4>
          <div className="space-y-2">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Width</label>
              <select
                value={widthClass}
                onChange={(e) => setWidth(e.target.value)}
                className={cn('w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1.5 text-sm')}
              >
                {WIDTH_OPTIONS.map((o) => (
                  <option key={o.value || 'default'} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Height</label>
              <select
                value={heightClass}
                onChange={(e) => setHeight(e.target.value)}
                className={cn('w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1.5 text-sm')}
              >
                {HEIGHT_OPTIONS.map((o) => (
                  <option key={o.value || 'default'} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Margin</label>
              <select
                value={marginClass || ''}
                onChange={(e) => setMargin(e.target.value)}
                className={cn('w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1.5 text-sm')}
              >
                {MARGIN_OPTIONS.map((o) => (
                  <option key={o.value || 'none'} value={o.value}>{o.label}</option>
                ))}
                {marginClass && !MARGIN_OPTIONS.some((o) => o.value === marginClass) && (
                  <option value={marginClass}>Custom ({marginClass})</option>
                )}
              </select>
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Padding</label>
              <select
                value={paddingClass || ''}
                onChange={(e) => setPadding(e.target.value)}
                className={cn('w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1.5 text-sm')}
              >
                {PADDING_OPTIONS.map((o) => (
                  <option key={o.value || 'none'} value={o.value}>{o.label}</option>
                ))}
                {paddingClass && !PADDING_OPTIONS.some((o) => o.value === paddingClass) && (
                  <option value={paddingClass}>Custom ({paddingClass})</option>
                )}
              </select>
            </div>
          </div>
        </section>

        <section>
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Events</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Configure what happens when the user interacts. Stored in schema as serializable action types (AI-friendly).</p>
          <div className="space-y-2">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">On click</label>
              <select
                value={ON_CLICK_ACTION_OPTIONS.some((o) => o.value && o.value !== '__custom' && o.value === (props.onClickAction as string))
                  ? (props.onClickAction as string)
                  : '__custom'}
                onChange={(e) => {
                  const v = e.target.value;
                  if (v === '__custom') {
                    handlePropChange('onClickAction', '__custom');
                    handlePropChange('onClickCustomAction', (props.onClickCustomAction as string) || 'submit');
                  } else {
                    handlePropChange('onClickAction', v || undefined);
                    handlePropChange('onClickCustomAction', undefined);
                  }
                }}
                className={cn('w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1.5 text-sm')}
              >
                {ON_CLICK_ACTION_OPTIONS.map((o) => (
                  <option key={o.value || 'none'} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            {(props.onClickAction as string) === '__custom' && (
              <>
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Custom action name</label>
                  <input
                    type="text"
                    value={(props.onClickCustomAction as string) ?? 'submit'}
                    onChange={(e) => {
                      const name = e.target.value;
                      handlePropChange('onClickCustomAction', name || undefined);
                      handlePropChange('onClickAction', name || undefined);
                    }}
                    placeholder="e.g. submit, fetch, openModal"
                    className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1.5 text-sm font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Payload (JSON)</label>
                  <textarea
                    value={typeof (props.onClickPayload as Record<string, unknown>) === 'object' && props.onClickPayload ? JSON.stringify(props.onClickPayload, null, 2) : '{}'}
                    onChange={(e) => {
                      try {
                        const payload = JSON.parse(e.target.value || '{}');
                        handlePropChange('onClickPayload', typeof payload === 'object' && payload !== null ? payload : {});
                      } catch {
                        // allow typing
                      }
                    }}
                    rows={3}
                    placeholder='{ "api": "/api/order", "method": "POST" }'
                    className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1.5 text-xs font-mono"
                  />
                </div>
              </>
            )}
            {(props.onClickAction as string) === 'updateNode' && (
              <>
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Target component</label>
                  <select
                    value={((props.onClickPayload as Record<string, unknown>)?.nodeId as string) ?? ''}
                    onChange={(e) => {
                      const nodeId = e.target.value;
                      const prev = (props.onClickPayload as Record<string, unknown>) ?? {};
                      handlePropChange('onClickPayload', { ...prev, nodeId, props: prev.props ?? {} });
                    }}
                    className={cn('w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1.5 text-sm')}
                  >
                    <option value="">Select node…</option>
                    {nodeIdOptions.map((o) => (
                      <option key={o.id} value={o.id}>{o.label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Props to set (JSON)</label>
                  <textarea
                    value={updateNodePropsDraft || updateNodePropsJson}
                    onChange={(e) => {
                      const v = e.target.value;
                      setUpdateNodePropsDraft(v);
                      try {
                        const propsToSet = JSON.parse(v || '{}');
                        const prev = (props.onClickPayload as Record<string, unknown>) ?? {};
                        handlePropChange('onClickPayload', { ...prev, props: propsToSet });
                      } catch {
                        // allow typing invalid JSON; draft stays
                      }
                    }}
                    onBlur={() => setUpdateNodePropsDraft('')}
                    rows={3}
                    placeholder='{ "children": "Done!", "disabled": true }'
                    className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1.5 text-xs font-mono"
                  />
                </div>
              </>
            )}
            {(props.onClickAction as string) === 'sequence' && (
              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Steps (JSON)</label>
                <textarea
                  value={sequenceStepsDraft || sequenceStepsJson}
                  onChange={(e) => {
                    const v = e.target.value;
                    setSequenceStepsDraft(v);
                    try {
                      const steps = JSON.parse(v || '[]');
                      handlePropChange('onClickPayload', { steps: Array.isArray(steps) ? steps : [] });
                    } catch {
                      // allow typing
                    }
                  }}
                  onBlur={() => setSequenceStepsDraft('')}
                  rows={6}
                  placeholder={JSON.stringify([
                    { action: 'updateNode', payload: { nodeId: '<id>', props: { children: 'Loading…' } } },
                    { action: 'toast', message: 'Done!' },
                  ], null, 2)}
                  className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1.5 text-xs font-mono"
                />
                <p className="text-xs text-gray-500">Each step: {"{ action: 'log'|'toast'|'alert'|'updateNode', message?, payload? }"}</p>
              </div>
            )}
            {['log', 'toast', 'alert'].includes((props.onClickAction as string) ?? '') && (
              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Message (toast / alert / log)</label>
                <input
                  type="text"
                  value={(props.onClickMessage as string) ?? ''}
                  onChange={(e) => handlePropChange('onClickMessage', e.target.value || undefined)}
                  placeholder="Optional message"
                  className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1.5 text-sm"
                />
              </div>
            )}
            {(props.onClickAction as string) === 'setData' && (
              <>
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Data path</label>
                  <input
                    type="text"
                    value={((props.onClickPayload as Record<string, unknown>)?.path as string) ?? ''}
                    onChange={(e) => {
                      const prev = (props.onClickPayload as Record<string, unknown>) ?? {};
                      handlePropChange('onClickPayload', { ...prev, path: e.target.value, value: prev.value });
                    }}
                    placeholder="e.g. table.page or form.email"
                    className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1.5 text-sm font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Value (JSON)</label>
                  <input
                    type="text"
                    value={typeof (props.onClickPayload as Record<string, unknown>)?.value === 'string' ? (props.onClickPayload as Record<string, unknown>).value as string : JSON.stringify((props.onClickPayload as Record<string, unknown>)?.value ?? '')}
                    onChange={(e) => {
                      const v = e.target.value;
                      const prev = (props.onClickPayload as Record<string, unknown>) ?? {};
                      try {
                        handlePropChange('onClickPayload', { ...prev, value: JSON.parse(v || 'null') });
                      } catch {
                        handlePropChange('onClickPayload', { ...prev, value: v });
                      }
                    }}
                    placeholder="e.g. 1 or &quot;hello&quot;"
                    className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1.5 text-sm font-mono"
                  />
                </div>
              </>
            )}
            {(props.onClickAction as string) === 'navigate' && (
              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Route path</label>
                <input
                  type="text"
                  value={((props.onClickPayload as Record<string, unknown>)?.path as string) ?? ''}
                  onChange={(e) => {
                    const prev = (props.onClickPayload as Record<string, unknown>) ?? {};
                    handlePropChange('onClickPayload', { ...prev, path: e.target.value });
                  }}
                  placeholder="e.g. / or /dashboard"
                  className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1.5 text-sm font-mono"
                />
              </div>
            )}
          </div>
        </section>

        <section>
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Design (Tailwind)</h4>
          <div className="space-y-1">
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">className</label>
            <input
              type="text"
              value={otherClass}
              onChange={(e) => setCustomClass(e.target.value)}
              placeholder="e.g. rounded-xl shadow-lg"
              className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1.5 text-sm font-mono"
            />
          </div>
        </section>

        <section>
          <button
            type="button"
            onClick={() => setRawOpen((o) => !o)}
            className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide hover:text-gray-700 dark:hover:text-gray-300"
          >
            {rawOpen ? '▼' : '▶'} Raw props (JSON)
          </button>
          {rawOpen && (
            <textarea
              value={JSON.stringify(props, null, 2)}
              onChange={(e) => setRawProps(e.target.value)}
              rows={8}
              className="mt-2 w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1.5 text-xs font-mono"
            />
          )}
        </section>
      </div>
    </aside>
  );
}
