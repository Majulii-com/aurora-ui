import type { InteractiveChartProps } from '../charts/chartInteraction.types';

export interface FunnelDatum {
  name: string;
  value: number;
  fill?: string;
}

export interface FunnelChartProps extends InteractiveChartProps {
  data: FunnelDatum[];
  height?: number;
  className?: string;
}
