import { useMemo } from 'react';
import {
  BarChart as RBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
  LabelList,
} from 'recharts';
import { cn } from '../../utils';
import { AuroraChartTooltipContent } from '../charts/AuroraChartTooltip';
import { chartColorAt } from '../charts/chartColors';
import { useInactiveSeriesKeys } from '../charts/useInactiveSeriesKeys';
import type { BarChartProps } from './BarChart.types';

const DEFAULT_COLOR = '#3b82f6';

function resolveSeriesKeys(seriesKeys: string[] | undefined): string[] {
  if (seriesKeys && seriesKeys.length > 0) return seriesKeys;
  return ['value'];
}

function getBarColor(color: string | undefined, colors: string[] | undefined, index: number): string {
  if (colors?.length) return chartColorAt(index, colors);
  if (color && (color.startsWith('#') || color.startsWith('rgb'))) return color;
  if (color) return color;
  return chartColorAt(index);
}

export function BarChart({
  data,
  direction = 'vertical',
  seriesKeys: seriesKeysProp,
  stacked = false,
  color,
  colors,
  showValues = true,
  height = 200,
  className,
  interactive = true,
  filterable = true,
  brush = false,
  showGrid = true,
  onDatumClick,
  onDatumHover,
  detailSlot,
}: BarChartProps) {
  const seriesKeys = useMemo(() => resolveSeriesKeys(seriesKeysProp), [seriesKeysProp]);
  const { toggleKey, isHidden } = useInactiveSeriesKeys(seriesKeys, filterable);

  const rows = useMemo(() => {
    return data.map((d) => {
      /** `name` is the category key for Recharts; `label` mirrors the public API for callbacks/tooltips. */
      const row: Record<string, string | number> = { name: d.label, label: d.label };
      for (const k of seriesKeys) {
        const raw = (d as Record<string, unknown>)[k];
        row[k] = typeof raw === 'number' && !Number.isNaN(raw) ? raw : 0;
      }
      return row;
    });
  }, [data, seriesKeys]);

  const legendFilter = filterable && seriesKeys.length > 1;

  if (data.length === 0) {
    return (
      <div
        className={cn('flex items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800/50', className)}
        style={{ height }}
      >
        <span className="text-sm text-gray-500">No data</span>
      </div>
    );
  }

  const isVertical = direction === 'vertical';
  const margin = { top: 8, right: 12, left: isVertical ? 4 : 8, bottom: legendFilter || brush ? 28 : 8 };

  const tooltipEl = interactive ? (
    <Tooltip cursor={{ fill: 'rgba(59, 130, 246, 0.08)' }} content={<AuroraChartTooltipContent />} />
  ) : null;

  return (
    <div className={cn('w-full min-w-0', className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RBarChart
          layout={isVertical ? 'vertical' : 'horizontal'}
          data={rows}
          margin={margin}
          onMouseMove={(state: {
            activePayload?: Array<{ payload?: Record<string, unknown> }>;
            activeTooltipIndex?: number;
          }) => {
            if (!onDatumHover) return;
            const fromPayload = state?.activePayload?.[0]?.payload;
            if (fromPayload) {
              onDatumHover(fromPayload);
              return;
            }
            const i = state?.activeTooltipIndex;
            if (typeof i === 'number' && i >= 0 && rows[i]) {
              onDatumHover(rows[i] as Record<string, unknown>);
              return;
            }
            onDatumHover(null);
          }}
          onMouseLeave={() => onDatumHover?.(null)}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />}
          {isVertical ? (
            <>
              <XAxis
                dataKey="name"
                type="category"
                interval={0}
                tick={{ fontSize: 11 }}
                className="text-gray-600 dark:text-gray-400"
              />
              <YAxis tick={{ fontSize: 11 }} className="text-gray-600 dark:text-gray-400" />
            </>
          ) : (
            <>
              <XAxis type="number" tick={{ fontSize: 11 }} className="text-gray-600 dark:text-gray-400" />
              <YAxis
                type="category"
                dataKey="name"
                width={72}
                interval={0}
                tick={{ fontSize: 11 }}
                className="text-gray-600 dark:text-gray-400"
              />
            </>
          )}
          {tooltipEl}
          {legendFilter && (
            <Legend
              wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
              onClick={(item) => {
                const key = item.dataKey != null ? String(item.dataKey) : String(item.value);
                toggleKey(key);
              }}
            />
          )}
          {seriesKeys.map((key, i) => (
            <Bar
              key={key}
              dataKey={key}
              name={key}
              fill={getBarColor(color, colors, i)}
              stackId={stacked ? 'stack' : undefined}
              hide={isHidden(key)}
              radius={[4, 4, 0, 0]}
              onClick={(barData: unknown) => {
                const payload =
                  barData && typeof barData === 'object' && 'payload' in barData
                    ? (barData as { payload?: Record<string, unknown> }).payload
                    : undefined;
                if (payload && onDatumClick) onDatumClick(payload, { dataKey: key });
              }}
            >
              {showValues && (
                <LabelList
                  dataKey={key}
                  position={isVertical ? 'top' : 'right'}
                  className="fill-gray-700 text-[10px] dark:fill-gray-200"
                  formatter={(v: number) => (typeof v === 'number' ? String(v) : '')}
                />
              )}
            </Bar>
          ))}
          {brush && isVertical && <Brush dataKey="name" height={22} stroke={DEFAULT_COLOR} />}
        </RBarChart>
      </ResponsiveContainer>
      {detailSlot != null && <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">{detailSlot}</div>}
    </div>
  );
}
