import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import { useMemo } from 'react';
import { cn } from '../../utils';
import { AuroraChartTooltipContent } from '../charts/AuroraChartTooltip';
import type { TreemapChartProps } from './TreemapChart.types';

export function TreemapChart({
  data,
  height = 260,
  className,
  interactive = true,
  onDatumClick,
  onDatumHover,
  detailSlot,
}: TreemapChartProps) {
  const roots = useMemo(() => {
    if (data.children && data.children.length > 0) return [data];
    if (data.size != null && data.size > 0) {
      return [{ name: 'root', children: [{ name: data.name, size: data.size }] }];
    }
    return [];
  }, [data]);

  if (roots.length === 0) {
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
        <Treemap
          data={roots}
          dataKey="size"
          type="nest"
          aspectRatio={4 / 3}
          stroke="#fff"
          fill="#3b82f6"
          isAnimationActive={false}
          onClick={(node: { name?: string; size?: number }) => {
            if (node && onDatumClick) onDatumClick(node as Record<string, unknown>, { dataKey: 'size' });
          }}
          onMouseEnter={(node: { name?: string }) => {
            onDatumHover?.((node as Record<string, unknown>) ?? null);
          }}
          onMouseLeave={() => onDatumHover?.(null)}
        >
          {tooltipEl}
        </Treemap>
      </ResponsiveContainer>
      {detailSlot != null && <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">{detailSlot}</div>}
    </div>
  );
}
