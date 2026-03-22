import type { InteractiveChartProps } from '../charts/chartInteraction.types';

export interface ScatterChartPoint {
  x: number;
  y: number;
  /** Shown in tooltip / optional label */
  label?: string;
  /** Optional third dimension (size or category) */
  z?: number;
}

export interface ScatterChartProps extends InteractiveChartProps {
  data: ScatterChartPoint[];
  /** Point fill */
  color?: string;
  height?: number;
  className?: string;
}
