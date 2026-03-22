import type { InteractiveChartProps } from '../charts/chartInteraction.types';

export interface RadialBarDatum {
  name: string;
  value: number;
  fill?: string;
}

export interface RadialBarChartProps extends InteractiveChartProps {
  data: RadialBarDatum[];
  /** Bar size in px (chart height). */
  height?: number;
  className?: string;
}
