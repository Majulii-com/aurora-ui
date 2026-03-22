import {
  ComposedChart as RComposedChart,
  Line,
  Bar,
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
import type { ComposedChartProps } from './ComposedChart.types';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export function ComposedChart({
  data,
  indexKey,
  series,
  height = 240,
  className,
  interactive = true,
  filterable = true,
  brush = false,
  showGrid = true,
  onDatumClick,
  onDatumHover,
  detailSlot,
}: ComposedChartProps) {
  const keys = series.map((s) => s.dataKey);
  const { toggleKey, isHidden } = useInactiveSeriesKeys(keys, filterable);
  const legendFilter = filterable && keys.length > 1;

  if (!data.length || !series.length) {
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
        <RComposedChart
          data={data}
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
            if (typeof i === 'number' && i >= 0 && data[i]) onDatumHover(data[i] as Record<string, unknown>);
            else onDatumHover(null);
          }}
          onMouseLeave={() => onDatumHover?.(null)}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />}
          <XAxis dataKey={indexKey} tick={{ fontSize: 11 }} />
          <YAxis yAxisId={0} tick={{ fontSize: 11 }} />
          {tooltipEl}
          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
            onClick={
              legendFilter ? (item) => toggleKey(String(item.dataKey ?? item.value)) : undefined
            }
          />
          {series.map((s, i) => {
            const stroke = s.color ?? COLORS[i % COLORS.length];
            const hidden = isHidden(s.dataKey);
            const yId = s.yAxisId ?? 0;
            const handleClick = (e: unknown) => {
              const payload =
                e && typeof e === 'object' && 'payload' in e
                  ? (e as { payload?: Record<string, unknown> }).payload
                  : undefined;
              if (payload && onDatumClick) onDatumClick(payload, { dataKey: s.dataKey });
            };
            if (s.type === 'line') {
              return (
                <Line
                  key={s.dataKey}
                  type="monotone"
                  dataKey={s.dataKey}
                  name={s.name ?? s.dataKey}
                  yAxisId={yId}
                  stroke={stroke}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  hide={hidden}
                  onClick={handleClick}
                />
              );
            }
            if (s.type === 'bar') {
              return (
                <Bar
                  key={s.dataKey}
                  dataKey={s.dataKey}
                  name={s.name ?? s.dataKey}
                  yAxisId={yId}
                  fill={stroke}
                  stackId={s.stackId}
                  radius={[2, 2, 0, 0]}
                  hide={hidden}
                  onClick={handleClick}
                />
              );
            }
            return (
              <Area
                key={s.dataKey}
                type="monotone"
                dataKey={s.dataKey}
                name={s.name ?? s.dataKey}
                yAxisId={yId}
                stroke={stroke}
                fill={stroke}
                fillOpacity={0.25}
                stackId={s.stackId}
                hide={hidden}
                onClick={handleClick}
              />
            );
          })}
          {brush && <Brush dataKey={indexKey} height={22} stroke="#3b82f6" />}
        </RComposedChart>
      </ResponsiveContainer>
      {detailSlot != null && <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">{detailSlot}</div>}
    </div>
  );
}
