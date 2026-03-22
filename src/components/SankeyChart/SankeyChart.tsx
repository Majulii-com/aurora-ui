import { Sankey, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '../../utils';
import { AuroraChartTooltipContent } from '../charts/AuroraChartTooltip';
import type { SankeyChartProps } from './SankeyChart.types';

export function SankeyChart({
  nodes,
  links,
  height = 280,
  className,
  interactive = true,
  onDatumClick,
  onDatumHover,
  detailSlot,
}: SankeyChartProps) {
  if (!nodes.length || !links.length) {
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
        <Sankey
          data={{ nodes, links }}
          nodePadding={24}
          linkCurvature={0.5}
          margin={{ top: 8, right: 16, bottom: 8, left: 16 }}
          onClick={(node: { name?: string; value?: number }) => {
            if (onDatumClick) onDatumClick(node as Record<string, unknown>, { dataKey: 'value' });
          }}
          onMouseEnter={(node: { name?: string }) => {
            onDatumHover?.((node as Record<string, unknown>) ?? null);
          }}
          onMouseLeave={() => onDatumHover?.(null)}
        >
          {tooltipEl}
        </Sankey>
      </ResponsiveContainer>
      {detailSlot != null && <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">{detailSlot}</div>}
    </div>
  );
}
