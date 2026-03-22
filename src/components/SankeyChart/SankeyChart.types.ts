import type { InteractiveChartProps } from '../charts/chartInteraction.types';

export interface SankeyNodeDatum {
  name: string;
}

export interface SankeyLinkDatum {
  source: number;
  target: number;
  value: number;
}

export interface SankeyChartProps extends InteractiveChartProps {
  nodes: SankeyNodeDatum[];
  links: SankeyLinkDatum[];
  height?: number;
  className?: string;
}
