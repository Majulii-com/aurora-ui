import { useMemo } from 'react';
import { cn } from '../../utils';
import type { BarChartProps } from './BarChart.types';

const DEFAULT_COLOR = '#3b82f6';

function getBarColor(color?: string): string {
  if (!color) return DEFAULT_COLOR;
  if (color.startsWith('#') || color.startsWith('rgb')) return color;
  return color;
}

export function BarChart({
  data,
  direction = 'vertical',
  color,
  showValues = true,
  height = 200,
  className,
}: BarChartProps) {
  const maxValue = useMemo(() => Math.max(...data.map((d) => d.value), 1), [data]);
  const barColor = getBarColor(color);

  if (data.length === 0) {
    return (
      <div className={cn('flex items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800/50', className)} style={{ height }}>
        <span className="text-sm text-gray-500">No data</span>
      </div>
    );
  }

  const isVertical = direction === 'vertical';
  const padding = { left: 40, right: 16, top: 8, bottom: 28 };
  const chartWidth = 300;
  const chartHeight = height - padding.top - padding.bottom;
  const n = data.length;
  const gap = 8;
  const barSize = isVertical
    ? (chartWidth - padding.left - padding.right - (n - 1) * gap) / n
    : Math.max(20, (chartHeight - (n - 1) * gap) / n);

  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${chartWidth + padding.left + padding.right} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Bar chart"
      >
        {data.map((d, i) => {
          const valuePct = maxValue > 0 ? d.value / maxValue : 0;
          if (isVertical) {
            const x = padding.left + i * (barSize + gap);
            const barH = Math.max(0, valuePct * chartHeight);
            const y = padding.top + chartHeight - barH;
            return (
              <g key={d.label}>
                <rect
                  x={x}
                  y={y}
                  width={barSize}
                  height={barH}
                  rx={4}
                  fill={barColor}
                  className="transition-all duration-300"
                />
                {showValues && barH > 18 && (
                  <text
                    x={x + barSize / 2}
                    y={y + barH / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-white text-[10px] font-medium"
                  >
                    {d.value}
                  </text>
                )}
                <text
                  x={x + barSize / 2}
                  y={height - 6}
                  textAnchor="middle"
                  className="fill-gray-600 dark:fill-gray-400 text-[11px]"
                >
                  {d.label}
                </text>
              </g>
            );
          } else {
            const y = padding.top + i * (barSize + gap);
            const barW = Math.max(0, valuePct * (chartWidth - padding.left));
            return (
              <g key={d.label}>
                <text
                  x={padding.left - 4}
                  y={y + barSize / 2}
                  textAnchor="end"
                  dominantBaseline="middle"
                  className="fill-gray-600 dark:fill-gray-400 text-[11px]"
                >
                  {d.label}
                </text>
                <rect
                  x={padding.left}
                  y={y}
                  width={barW}
                  height={barSize}
                  rx={4}
                  fill={barColor}
                  className="transition-all duration-300"
                />
                {showValues && barW > 24 && (
                  <text
                    x={padding.left + barW - 4}
                    y={y + barSize / 2}
                    textAnchor="end"
                    dominantBaseline="middle"
                    className="fill-white text-[10px] font-medium"
                  >
                    {d.value}
                  </text>
                )}
              </g>
            );
          }
        })}
      </svg>
    </div>
  );
}
