import type { InteractiveChartProps } from '../charts/chartInteraction.types';

export interface TreemapNode {
  name: string;
  /** Leaf magnitude */
  size?: number;
  children?: TreemapNode[];
}

export interface TreemapChartProps extends InteractiveChartProps {
  /** Hierarchical data (name + optional size + children). */
  data: TreemapNode;
  height?: number;
  className?: string;
}
