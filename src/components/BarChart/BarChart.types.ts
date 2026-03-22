import type { InteractiveChartProps } from '../charts/chartInteraction.types';

export interface BarChartDatum {
  label: string;
  value: number;
  [key: string]: string | number | undefined;
}

export type BarChartDirection = 'vertical' | 'horizontal';

export interface BarChartProps extends InteractiveChartProps {
  /** Data points: at minimum `label` + numeric series keys (default series key: `value`). */
  data: BarChartDatum[];
  /** Bar direction */
  direction?: BarChartDirection;
  /** Keys to plot as bars. Defaults to `['value']`. */
  seriesKeys?: string[];
  /** Stack bars with the same stack id (only meaningful with multiple series). */
  stacked?: boolean;
  /** Single color for one series, or use `colors` / per-series. */
  color?: string;
  /** One color per series key (cycles if shorter than series). */
  colors?: string[];
  /** Show value labels on bars */
  showValues?: boolean;
  /** Height in px (default 200) */
  height?: number;
  className?: string;
}
