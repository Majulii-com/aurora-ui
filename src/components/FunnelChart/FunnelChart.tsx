import { FunnelChart as RFunnelChart, Funnel, Tooltip, LabelList, Cell, ResponsiveContainer } from 'recharts';
import { cn } from '../../utils';
import { AuroraChartTooltipContent } from '../charts/AuroraChartTooltip';
import { chartColorAt } from '../charts/chartColors';
import type { FunnelChartProps } from './FunnelChart.types';

export function FunnelChart({
  data,
  height = 260,
  className,
  interactive = true,
  onDatumClick,
  onDatumHover,
  detailSlot,
}: FunnelChartProps) {
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

  const rows = data.map((d, i) => ({ ...d, fill: d.fill ?? chartColorAt(i) }));
  const tooltipEl = interactive ? <Tooltip content={<AuroraChartTooltipContent />} /> : null;

  return (
    <div className={cn('w-full min-w-0', className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RFunnelChart>
          <Funnel
            dataKey="value"
            data={rows}
            isAnimationActive={false}
            onClick={(d: unknown) => {
              const payload =
                d && typeof d === 'object' && 'payload' in d
                  ? (d as { payload?: Record<string, unknown> }).payload
                  : (d as Record<string, unknown>);
              if (payload && onDatumClick) onDatumClick(payload, { dataKey: 'value' });
            }}
            onMouseEnter={(d: unknown) => {
              const payload =
                d && typeof d === 'object' && 'payload' in d
                  ? (d as { payload?: Record<string, unknown> }).payload
                  : (d as Record<string, unknown> | null);
              onDatumHover?.(payload ?? null);
            }}
            onMouseLeave={() => onDatumHover?.(null)}
          >
            {rows.map((d, i) => (
              <Cell key={`${d.name}-${i}`} fill={d.fill} />
            ))}
            <LabelList position="right" fill="currentColor" className="text-xs text-gray-800 dark:text-gray-100" />
          </Funnel>
          {tooltipEl}
        </RFunnelChart>
      </ResponsiveContainer>
      {detailSlot != null && <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">{detailSlot}</div>}
    </div>
  );
}
