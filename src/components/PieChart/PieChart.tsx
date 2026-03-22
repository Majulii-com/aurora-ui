import { useMemo, useState, useCallback } from 'react';
import { PieChart as RPieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { cn } from '../../utils';
import { AuroraChartTooltipContent } from '../charts/AuroraChartTooltip';
import { AURORA_CHART_COLORS, chartColorAt } from '../charts/chartColors';
import type { PieChartProps } from './PieChart.types';

const DEFAULT_COLORS = [...AURORA_CHART_COLORS];

export function PieChart({
  data,
  donut = false,
  colors = DEFAULT_COLORS,
  size = 200,
  showLabels = true,
  className,
  interactive = true,
  filterable = true,
  onDatumClick,
  onDatumHover,
  detailSlot,
}: PieChartProps) {
  const [hiddenLabels, setHiddenLabels] = useState<Set<string>>(() => new Set());

  const colorByLabel = useMemo(() => {
    const m = new Map<string, string>();
    data.forEach((d, i) => {
      m.set(d.label, chartColorAt(i, colors));
    });
    return m;
  }, [data, colors]);

  const visibleData = useMemo(
    () => data.filter((d) => !hiddenLabels.has(d.label)),
    [data, hiddenLabels]
  );

  const toggleLabel = useCallback(
    (label: string) => {
      if (!filterable || data.length < 2) return;
      setHiddenLabels((prev) => {
        const next = new Set(prev);
        if (next.has(label)) next.delete(label);
        else next.add(label);
        return next;
      });
    },
    [filterable, data.length]
  );

  if (data.length === 0) {
    return (
      <div
        className={cn(
          'flex items-center justify-center rounded-full bg-gray-50 dark:bg-gray-800/50',
          className
        )}
        style={{ width: size, height: size }}
      >
        <span className="text-sm text-gray-500">No data</span>
      </div>
    );
  }

  if (visibleData.length === 0) {
    return (
      <div
        className={cn('flex flex-col items-center gap-3 rounded-lg bg-gray-50 px-4 py-6 dark:bg-gray-800/50', className)}
        style={{ minHeight: size, width: '100%' }}
      >
        <span className="text-center text-sm text-gray-500">All segments hidden. Click a label to show it again.</span>
        {showLabels && (
          <div className="flex flex-wrap justify-center gap-2">
            {data.map((d) => (
              <button
                key={d.label}
                type="button"
                className="rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                onClick={() => toggleLabel(d.label)}
              >
                {d.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  const tooltipEl = interactive ? <Tooltip content={<AuroraChartTooltipContent />} /> : null;
  const legendInteractive = filterable && data.length > 1;

  return (
    <div className={cn('inline-flex w-full min-w-0 flex-col items-center', className)}>
      <ResponsiveContainer width="100%" height={size}>
        <RPieChart>
          <Pie
            data={visibleData}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy="50%"
            innerRadius={donut ? '45%' : 0}
            outerRadius="82%"
            paddingAngle={visibleData.length > 1 ? 1 : 0}
            onClick={(_, index) => {
              const row = visibleData[index];
              if (row && onDatumClick) onDatumClick({ ...row } as Record<string, unknown>, { dataKey: 'value' });
            }}
            onMouseEnter={(_, index) => {
              const row = visibleData[index];
              onDatumHover?.(row ? ({ ...row } as Record<string, unknown>) : null);
            }}
            onMouseLeave={() => onDatumHover?.(null)}
          >
            {visibleData.map((entry) => (
              <Cell key={entry.label} fill={colorByLabel.get(entry.label) ?? DEFAULT_COLORS[0]} stroke="transparent" />
            ))}
          </Pie>
          {tooltipEl}
          {showLabels && (
            <Legend
              wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
              payload={data.map((d) => ({
                value: d.label,
                id: d.label,
                type: 'circle' as const,
                color: colorByLabel.get(d.label) ?? DEFAULT_COLORS[0],
              }))}
              onClick={
                legendInteractive
                  ? (item) => {
                      const label = String(item.value ?? '');
                      if (label) toggleLabel(label);
                    }
                  : undefined
              }
              formatter={(value: string) => {
                const inactive = hiddenLabels.has(value);
                return <span style={{ opacity: legendInteractive && inactive ? 0.45 : 1 }}>{value}</span>;
              }}
            />
          )}
        </RPieChart>
      </ResponsiveContainer>
      {detailSlot != null && <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">{detailSlot}</div>}
    </div>
  );
}
