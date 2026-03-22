import {
  ScatterChart as RScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ZAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '../../utils';
import { AuroraChartTooltipContent } from '../charts/AuroraChartTooltip';
import type { ScatterChartProps } from './ScatterChart.types';

export function ScatterChart({
  data,
  color = '#3b82f6',
  height = 240,
  className,
  interactive = true,
  showGrid = true,
  onDatumClick,
  onDatumHover,
  detailSlot,
}: ScatterChartProps) {
  const rows = data.map((d, i) => ({
    x: d.x,
    y: d.y,
    z: d.z ?? 64,
    label: d.label ?? `P${i + 1}`,
  }));

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

  const tooltipEl = interactive ? (
    <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<AuroraChartTooltipContent />} />
  ) : null;

  return (
    <div className={cn('w-full min-w-0', className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RScatterChart
          margin={{ top: 8, right: 12, left: 4, bottom: 8 }}
          onMouseMove={(state: { activePayload?: Array<{ payload?: Record<string, unknown> }> }) => {
            if (!onDatumHover) return;
            const p = state?.activePayload?.[0]?.payload;
            onDatumHover(p ?? null);
          }}
          onMouseLeave={() => onDatumHover?.(null)}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />}
          <XAxis type="number" dataKey="x" name="x" tick={{ fontSize: 11 }} />
          <YAxis type="number" dataKey="y" name="y" tick={{ fontSize: 11 }} />
          <ZAxis type="number" dataKey="z" range={[40, 400]} name="z" />
          {tooltipEl}
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Scatter
            name="Points"
            data={rows}
            fill={color}
            onClick={(d: unknown) => {
              const payload =
                d && typeof d === 'object' && 'payload' in d
                  ? (d as { payload?: Record<string, unknown> }).payload
                  : (d as Record<string, unknown>);
              if (payload && onDatumClick) onDatumClick(payload, { dataKey: 'Points' });
            }}
            onMouseEnter={(d: unknown) => {
              const payload =
                d && typeof d === 'object' && 'payload' in d
                  ? (d as { payload?: Record<string, unknown> }).payload
                  : (d as Record<string, unknown> | null);
              onDatumHover?.(payload ?? null);
            }}
            onMouseLeave={() => onDatumHover?.(null)}
          />
        </RScatterChart>
      </ResponsiveContainer>
      {detailSlot != null && <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">{detailSlot}</div>}
    </div>
  );
}
