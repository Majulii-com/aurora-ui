import type { AuroraSurfaceProps } from '../../types/auroraSurface';

export type StatCardTrend = 'up' | 'down' | 'neutral';

export interface StatCardProps extends AuroraSurfaceProps {
  /** Metric label (e.g. "Revenue", "Active users") */
  title: React.ReactNode;
  /** Main value to display */
  value: React.ReactNode;
  /** Optional trend indicator */
  trend?: StatCardTrend;
  /** Optional trend label (e.g. "+12% vs last month") */
  trendLabel?: React.ReactNode;
  /** Optional subtitle or description */
  subtitle?: React.ReactNode;
  /** Optional icon or badge */
  icon?: React.ReactNode;
  className?: string;
}
