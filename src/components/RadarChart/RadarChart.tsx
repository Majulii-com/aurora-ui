import { useMemo } from 'react';
import {
  RadarChart as RRadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '../../utils';
import { AuroraChartTooltipContent } from '../charts/AuroraChartTooltip';
import { useInactiveSeriesKeys } from '../charts/useInactiveSeriesKeys';
import type { RadarChartProps } from './RadarChart.types';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

function inferMetrics(rows: Record<string, string | number>[], subjectKey: string): string[] {
  if (rows.length === 0) return [];
  const keys = Object.keys(rows[0]).filter((k) => k !== subjectKey);
  return keys.filter((k) => typeof rows[0][k] === 'number');
}

export function RadarChart({
  data,
  subjectKey = 'subject',
  metricKeys: metricKeysProp,
  height = 280,
  className,
  interactive = true,
  filterable = true,
  onDatumClick,
  onDatumHover,
  detailSlot,
}: RadarChartProps) {
  const metricKeys = useMemo(() => {
    if (metricKeysProp && metricKeysProp.length > 0) return metricKeysProp;
    return inferMetrics(data as Record<string, string | number>[], subjectKey);
  }, [data, metricKeysProp, subjectKey]);

  const { toggleKey, isHidden } = useInactiveSeriesKeys(metricKeys, filterable);
  const legendFilter = filterable && metricKeys.length > 1;

  if (data.length === 0 || metricKeys.length === 0) {
    return (
      <div
        className={cn('flex items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800/50', className)}
        style={{ height }}
      >
        <span className="text-sm text-gray-500">No data</span>
      </div>
    );
  }

  const tooltipEl = interactive ? <Tooltip content={<AuroraChartTooltipContent />} /> : null;

  return (
    <div className={cn('w-full min-w-0', className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RRadarChart cx="50%" cy="50%" outerRadius="78%" data={data}>
          <PolarGrid className="stroke-gray-200 dark:stroke-gray-600" />
          <PolarAngleAxis dataKey={subjectKey} tick={{ fontSize: 11 }} />
          <PolarRadiusAxis tick={{ fontSize: 10 }} />
          {tooltipEl}
          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
            onClick={
              legendFilter ? (item) => toggleKey(String(item.dataKey ?? item.value)) : undefined
            }
          />
          {metricKeys.map((key, i) => (
            <Radar
              key={key}
              name={key}
              dataKey={key}
              stroke={COLORS[i % COLORS.length]}
              fill={COLORS[i % COLORS.length]}
              fillOpacity={0.35}
              hide={isHidden(key)}
              onClick={(e: unknown) => {
                const payload =
                  e && typeof e === 'object' && 'payload' in e
                    ? (e as { payload?: Record<string, unknown> }).payload
                    : undefined;
                if (payload && onDatumClick) onDatumClick(payload, { dataKey: key });
              }}
              onMouseEnter={(e: unknown) => {
                const payload =
                  e && typeof e === 'object' && 'payload' in e
                    ? (e as { payload?: Record<string, unknown> }).payload
                    : undefined;
                onDatumHover?.(payload ?? null);
              }}
              onMouseLeave={() => onDatumHover?.(null)}
            />
          ))}
        </RRadarChart>
      </ResponsiveContainer>
      {detailSlot != null && <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">{detailSlot}</div>}
    </div>
  );
}
