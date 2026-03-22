import type { InteractiveChartProps } from '../charts/chartInteraction.types';

/** Each row: category label + numeric values per series key. */
export type RadarChartRow = Record<string, string | number>;

export interface RadarChartProps extends InteractiveChartProps {
  /** Rows with `subjectKey` column (default `subject`) and one column per radar axis metric. */
  data: RadarChartRow[];
  /** Field name for the angle labels (default `subject`). */
  subjectKey?: string;
  /** Numeric columns to draw as overlaid radars (defaults to all number keys except subject). */
  metricKeys?: string[];
  height?: number;
  className?: string;
}
