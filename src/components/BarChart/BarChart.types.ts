export interface BarChartDatum {
  label: string;
  value: number;
}

export type BarChartDirection = 'vertical' | 'horizontal';

export interface BarChartProps {
  /** Data points: label + value */
  data: BarChartDatum[];
  /** Bar direction */
  direction?: BarChartDirection;
  /** Optional bar color (CSS color or Tailwind class for fill) */
  color?: string;
  /** Show value labels on bars */
  showValues?: boolean;
  /** Height in px (default 200) */
  height?: number;
  className?: string;
}
