import { parseGenUIDocument } from '@majulii/aurora-ui';
import type { GenUIDocument } from '@majulii/aurora-ui';

import dashboardJson from './documents/dashboard.json';
import supportTicketsJson from './documents/support-tickets.json';
import marketingLandingJson from './documents/marketing-landing.json';
import apiTableJson from './documents/api-table.json';
import settingsTabsJson from './documents/settings-tabs.json';

function asDoc(raw: unknown, label: string): GenUIDocument {
  const r = parseGenUIDocument(raw);
  if (!r.success) {
    console.error(r.error);
    throw new Error(`Invalid GenUIDocument: ${label}`);
  }
  return r.data as GenUIDocument;
}

export type DslExampleMeta = {
  id: string;
  title: string;
  description: string;
  /** Tags for README / filtering */
  tags: string[];
  document: GenUIDocument;
};

/** Pre-validated DSL pages — same shape an AI or backend would return. */
export const DSL_EXAMPLES: readonly DslExampleMeta[] = [
  {
    id: 'dashboard',
    title: 'Ops dashboard',
    description: 'Metrics grid, dismissible alert, CUSTOM host hook.',
    tags: ['layout', 'ShowWhen', 'CUSTOM', 'Grid'],
    document: asDoc(dashboardJson, 'dashboard'),
  },
  {
    id: 'support',
    title: 'Support queue',
    description: 'Sortable, filterable table with rows in state (no repeat node).',
    tags: ['Table', 'state', 'sort'],
    document: asDoc(supportTicketsJson, 'support-tickets'),
  },
  {
    id: 'marketing',
    title: 'Marketing landing',
    description: 'NAVIGATE CTAs + feature grid — host handles routing UI.',
    tags: ['NAVIGATE', 'Container', 'Grid'],
    document: asDoc(marketingLandingJson, 'marketing-landing'),
  },
  {
    id: 'api-table',
    title: 'API → table',
    description: 'API_CALL loads JSONPlaceholder users; loading spinner via ShowWhen.',
    tags: ['API_CALL', 'Table', 'fetch'],
    document: asDoc(apiTableJson, 'api-table'),
  },
  {
    id: 'settings',
    title: 'Settings (tabs)',
    description: 'Tabs + bound inputs + SET_STATE action.',
    tags: ['Tabs', 'bind', 'forms'],
    document: asDoc(settingsTabsJson, 'settings-tabs'),
  },
];

export function getExampleById(id: string): DslExampleMeta | undefined {
  return DSL_EXAMPLES.find((e) => e.id === id);
}
