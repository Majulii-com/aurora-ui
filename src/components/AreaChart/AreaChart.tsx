import { useMemo } from 'react';
import {
  AreaChart as RAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from 'recharts';
import { cn } from '../../utils';
import { AuroraChartTooltipContent } from '../charts/AuroraChartTooltip';
import { useInactiveSeriesKeys } from '../charts/useInactiveSeriesKeys';
import type { AreaChartProps, AreaChartDatum, AreaChartSeries } from './AreaChart.types';

const DEFAULT_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

function getSeriesList(data?: AreaChartDatum[], series?: AreaChartSeries[]): AreaChartSeries[] {
  if (series && series.length > 0) return series;
  if (data && data.length > 0) return [{ data }];
  return [];
}

function mergeSeries(seriesList: AreaChartSeries[]) {
  if (seriesList.length === 0) return { rows: [] as Record<string, string | number>[], keys: [] as string[] };
  const keys = seriesList.map((s, i) =>
    seriesList.length === 1 ? s.name ?? 'value' : s.name ?? `series${i}`
  );
  const byX = new Map<string, Record<string, string | number>>();
  const order: string[] = [];
  seriesList.forEach((s, si) => {
    const key = keys[si];
    s.data.forEach((d) => {
      const xk = String(d.x);
      if (!byX.has(xk)) {
        byX.set(xk, { x: d.x });
        order.push(xk);
      }
      byX.get(xk)![key] = d.y;
    });
  });
  return { rows: order.map((k) => byX.get(k)!), keys };
}

export function AreaChart({
  data,
  series: seriesProp,
  stacked = false,
  showDots = false,
  height = 200,
  className,
  interactive = true,
  filterable = true,
  brush = false,
  showGrid = true,
  onDatumClick,
  onDatumHover,
  detailSlot,
}: AreaChartProps) {
  const seriesList = useMemo(() => getSeriesList(data, seriesProp), [data, seriesProp]);
  const { rows, keys } = useMemo(() => mergeSeries(seriesList), [seriesList]);
  const { toggleKey, isHidden } = useInactiveSeriesKeys(keys, filterable);
  const legendFilter = filterable && keys.length > 1;

  const { minY, maxY } = useMemo(() => {
    let minY = 0;
    let maxY = 1;
    keys.forEach((k) => {
      rows.forEach((r) => {
        const v = r[k];
        if (typeof v === 'number') {
          if (v < minY) minY = v;
          if (v > maxY) maxY = v;
        }
      });
    });
    if (minY === maxY) maxY = minY + 1;
    return { minY, maxY };
  }, [rows, keys]);

  if (keys.length === 0 || rows.length === 0) {
    return (
      <div
        className={cn('flex items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800/50', className)}
        style={{ height }}
      >
        <span className="text-sm text-gray-500">No data</span>
      </div>
    );
  }

  const margin = { top: 8, right: 12, left: 4, bottom: legendFilter || brush ? 28 : 8 };
  const tooltipEl = interactive ? <Tooltip content={<AuroraChartTooltipContent />} /> : null;

  return (
    <div className={cn('w-full min-w-0', className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RAreaChart
          data={rows}
          margin={margin}
          onMouseMove={(state: {
            activePayload?: Array<{ payload?: Record<string, unknown> }>;
            activeTooltipIndex?: number;
          }) => {
            if (!onDatumHover) return;
            const p = state?.activePayload?.[0]?.payload;
            if (p) {
              onDatumHover(p);
              return;
            }
            const i = state?.activeTooltipIndex;
            if (typeof i === 'number' && i >= 0 && rows[i]) onDatumHover(rows[i] as Record<string, unknown>);
            else onDatumHover(null);
          }}
          onMouseLeave={() => onDatumHover?.(null)}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />}
          <XAxis dataKey="x" tick={{ fontSize: 11 }} />
          <YAxis domain={[minY, maxY]} tick={{ fontSize: 11 }} />
          {tooltipEl}
          {legendFilter && (
            <Legend
              wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
              onClick={(item) => toggleKey(String(item.dataKey ?? item.value))}
            />
          )}
          {keys.map((key, i) => {
            const strokeColor = seriesList[i]?.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length];
            return (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                name={key}
                stackId={stacked ? 'a' : undefined}
                stroke={strokeColor}
                fill={strokeColor}
                fillOpacity={0.35}
                hide={isHidden(key)}
                dot={showDots}
                activeDot={{ r: 5 }}
                onClick={(e: unknown) => {
                  const payload =
                    e && typeof e === 'object' && 'payload' in e
                      ? (e as { payload?: Record<string, unknown> }).payload
                      : undefined;
                  if (payload && onDatumClick) onDatumClick(payload, { dataKey: key });
                }}
              />
            );
          })}
          {brush && <Brush dataKey="x" height={22} stroke="#3b82f6" />}
        </RAreaChart>
      </ResponsiveContainer>
      {detailSlot != null && <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">{detailSlot}</div>}
    </div>
  );
}
