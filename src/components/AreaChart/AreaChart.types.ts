import type { InteractiveChartProps } from '../charts/chartInteraction.types';

export interface AreaChartDatum {
  x: string | number;
  y: number;
}

export interface AreaChartSeries {
  name?: string;
  data: AreaChartDatum[];
  color?: string;
}

export interface AreaChartProps extends InteractiveChartProps {
  data?: AreaChartDatum[];
  series?: AreaChartSeries[];
  stacked?: boolean;
  showDots?: boolean;
  height?: number;
  className?: string;
}
