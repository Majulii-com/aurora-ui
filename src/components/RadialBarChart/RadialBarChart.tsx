import { RadialBarChart as RRadialBarChart, RadialBar, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '../../utils';
import { AuroraChartTooltipContent } from '../charts/AuroraChartTooltip';
import { chartColorAt } from '../charts/chartColors';
import type { RadialBarChartProps } from './RadialBarChart.types';

export function RadialBarChart({
  data,
  height = 260,
  className,
  interactive = true,
  onDatumClick,
  onDatumHover,
  detailSlot,
}: RadialBarChartProps) {
  const rows = data.map((d, i) => ({
    ...d,
    fill: d.fill ?? chartColorAt(i),
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

  const tooltipEl = interactive ? <Tooltip content={<AuroraChartTooltipContent />} /> : null;

  return (
    <div className={cn('w-full min-w-0', className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RRadialBarChart cx="50%" cy="50%" innerRadius="12%" outerRadius="100%" data={rows}>
          <RadialBar
            dataKey="value"
            cornerRadius={4}
            onClick={(e: unknown) => {
              const payload =
                e && typeof e === 'object' && 'payload' in e
                  ? (e as { payload?: Record<string, unknown> }).payload
                  : undefined;
              if (payload && onDatumClick) onDatumClick(payload, { dataKey: 'value' });
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
          {tooltipEl}
          <Legend wrapperStyle={{ fontSize: 12 }} iconSize={10} />
        </RRadialBarChart>
      </ResponsiveContainer>
      {detailSlot != null && <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">{detailSlot}</div>}
    </div>
  );
}
