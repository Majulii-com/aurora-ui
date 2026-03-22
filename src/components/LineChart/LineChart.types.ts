import type { InteractiveChartProps } from '../charts/chartInteraction.types';

export interface LineChartDatum {
  x: string | number;
  y: number;
}

export interface LineChartSeries {
  name?: string;
  data: LineChartDatum[];
  color?: string;
}

export interface LineChartProps extends InteractiveChartProps {
  /** Single series: array of { x, y }. Or use `series` for multiple lines. */
  data?: LineChartDatum[];
  /** Multiple series (e.g. multiple lines) */
  series?: LineChartSeries[];
  /** Show dots at data points */
  showDots?: boolean;
  /** Height in px (default 200) */
  height?: number;
  className?: string;
}
