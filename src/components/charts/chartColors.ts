/** Default palette for Aurora data visualization (WCAG-friendly contrast on light/dark UI). */
export const AURORA_CHART_COLORS = [
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#ec4899',
  '#06b6d4',
  '#84cc16',
] as const;

export function chartColorAt(index: number, palette: readonly string[] = AURORA_CHART_COLORS): string {
  return palette[index % palette.length];
}
