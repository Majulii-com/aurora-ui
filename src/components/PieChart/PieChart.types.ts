import type { InteractiveChartProps } from '../charts/chartInteraction.types';

export interface PieChartDatum {
  label: string;
  value: number;
}

export interface PieChartProps extends InteractiveChartProps {
  /** Segments: label + value (values will be normalized to 100%) */
  data: PieChartDatum[];
  /** Donut style (inner radius) when true */
  donut?: boolean;
  /** Optional colors per segment (cycle if fewer than data length) */
  colors?: string[];
  /** Size in px (default 200) */
  size?: number;
  /** Show segment labels in legend */
  showLabels?: boolean;
  className?: string;
}
