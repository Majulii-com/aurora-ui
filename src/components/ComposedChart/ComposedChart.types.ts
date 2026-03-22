import type { InteractiveChartProps } from '../charts/chartInteraction.types';

export type ComposedSeriesType = 'line' | 'bar' | 'area';

export interface ComposedSeriesConfig {
  type: ComposedSeriesType;
  dataKey: string;
  name?: string;
  color?: string;
  /** Stack group for bar/area */
  stackId?: string;
  yAxisId?: number | string;
}

export interface ComposedChartProps extends InteractiveChartProps {
  /** Tabular rows */
  data: Record<string, string | number>[];
  /** Dimension for X axis (categories or time) */
  indexKey: string;
  series: ComposedSeriesConfig[];
  height?: number;
  className?: string;
}
