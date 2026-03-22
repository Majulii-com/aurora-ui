import type { ReactNode } from 'react';

/** Shared optional behavior for Aurora chart wrappers (tooltips, legend filter, callbacks). */
export interface InteractiveChartProps {
  /** Tooltips, cursor, pointer events (default true). */
  interactive?: boolean;
  /** Click legend entries to show/hide series when there are 2+ series (default true). */
  filterable?: boolean;
  /** Optional brush range on the category axis (cartesian charts). */
  brush?: boolean;
  /** Show cartesian grid (default true where applicable). */
  showGrid?: boolean;
  /** User clicked a shape / point (payload is Recharts active payload). */
  onDatumClick?: (payload: Record<string, unknown>, context: { dataKey?: string }) => void;
  /** Hover state for parent analytics / cross-highlighting. */
  onDatumHover?: (payload: Record<string, unknown> | null) => void;
  /** Extra content under the chart when you want inline “details” without wiring a modal. */
  detailSlot?: ReactNode;
}
