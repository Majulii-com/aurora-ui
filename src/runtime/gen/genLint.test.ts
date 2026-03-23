import { describe, it, expect } from 'vitest';
import { lintGenUIDocument, parseAndLintGenUIDocument } from './genLint';
import { auroraGenUIRegistryTypes } from './auroraGenRegistry';
import type { GenUIDocument } from '../../schema/genDocumentTypes';

const minimalDoc = (ui: GenUIDocument['ui']): GenUIDocument => ({
  state: {},
  ui,
  actions: { a: { type: 'SET_STATE', path: 'x', value: 1 } },
});

describe('lintGenUIDocument', () => {
  it('warns on unknown component types vs registry', () => {
    const doc = minimalDoc({
      type: 'TotallyFakeComponent',
      children: [{ type: 'Stack', props: {} }],
    });
    const { issues } = lintGenUIDocument(doc, { registryTypes: auroraGenUIRegistryTypes });
    const unk = issues.filter((i) => i.code === 'UNKNOWN_COMPONENT_TYPE');
    expect(unk.length).toBe(1);
    expect(unk[0].message).toContain('TotallyFakeComponent');
  });

  it('warns when onClickAction references missing action id', () => {
    const doc: GenUIDocument = {
      state: {},
      ui: { type: 'Button', props: { onClickAction: 'nope' } },
      actions: {},
    };
    const { issues } = lintGenUIDocument(doc);
    expect(issues.some((i) => i.code === 'MISSING_ACTION')).toBe(true);
  });

  it('warns when onMountAction references missing action id', () => {
    const doc: GenUIDocument = {
      state: {},
      ui: { type: 'Stack', props: {}, children: [] },
      actions: {},
      onMountAction: 'missingLoad',
    };
    const { issues } = lintGenUIDocument(doc);
    const m = issues.filter((i) => i.code === 'MISSING_ACTION');
    expect(m.some((i) => i.path === '/onMountAction')).toBe(true);
  });

  it('errors when tree depth exceeds limit', () => {
    let node: GenUIDocument['ui'] = { type: 'Text', props: { children: 'leaf' } };
    for (let i = 0; i < 70; i++) {
      node = { type: 'Stack', props: {}, children: [node] };
    }
    const doc = minimalDoc(node);
    const { issues } = lintGenUIDocument(doc, { limits: { maxDepth: 64, maxNodes: 2000 } });
    expect(issues.some((i) => i.code === 'DEPTH_EXCEEDED')).toBe(true);
  });
});

describe('parseAndLintGenUIDocument', () => {
  it('returns zod error for invalid json shape', () => {
    const r = parseAndLintGenUIDocument({ notaui: true });
    expect(r.ok).toBe(false);
    expect(r.zodError).toBeDefined();
  });

  it('parses valid minimal document', () => {
    const r = parseAndLintGenUIDocument(
      {
        state: {},
        ui: { type: 'Stack', props: { gap: 2 }, children: [] },
        actions: {},
      },
      { registryTypes: auroraGenUIRegistryTypes }
    );
    expect(r.document).toBeDefined();
    expect(r.lint?.stats.nodeCount).toBe(1);
  });
});
