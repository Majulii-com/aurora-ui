import { useMemo } from 'react';
import { cn } from '../../utils';
import type { LineChartProps, LineChartDatum, LineChartSeries } from './LineChart.types';

const DEFAULT_COLORS = [
  'rgb(var(--color-primary-500) / 1)',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
];

function getSeriesList(data?: LineChartDatum[], series?: LineChartSeries[]): LineChartSeries[] {
  if (series && series.length > 0) return series;
  if (data && data.length > 0) return [{ data }];
  return [];
}

export function LineChart({
  data,
  series: seriesProp,
  showDots = true,
  height = 200,
  className,
}: LineChartProps) {
  const seriesList = useMemo(() => getSeriesList(data, seriesProp), [data, seriesProp]);

  const { allPoints, xLabels, minY, maxY } = useMemo(() => {
    let minY = 0;
    let maxY = 1;
    const xSet = new Set<string | number>();
    seriesList.forEach((s) => {
      s.data.forEach((d) => {
        xSet.add(d.x);
        if (d.y < minY) minY = d.y;
        if (d.y > maxY) maxY = d.y;
      });
    });
    const xLabels = Array.from(xSet);
    if (minY === maxY) maxY = minY + 1;
    return { allPoints: seriesList, xLabels, minY, maxY };
  }, [seriesList]);

  const padding = { left: 40, right: 16, top: 16, bottom: 28 };
  const chartWidth = 300;
  const chartHeight = height - padding.top - padding.bottom;

  if (seriesList.length === 0 || xLabels.length === 0) {
    return (
      <div className={cn('flex items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800/50', className)} style={{ height }}>
        <span className="text-sm text-gray-500">No data</span>
      </div>
    );
  }

  const xScale = (i: number) => padding.left + (i / Math.max(1, xLabels.length - 1)) * chartWidth;
  const yScale = (v: number) => padding.top + chartHeight - ((v - minY) / (maxY - minY)) * chartHeight;

  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${chartWidth + padding.left + padding.right} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Line chart"
      >
        {allPoints.map((s, seriesIndex) => {
          const color = s.color ?? DEFAULT_COLORS[seriesIndex % DEFAULT_COLORS.length];
          const points = s.data
            .map((d) => {
              const xi = xLabels.indexOf(d.x);
              if (xi === -1) return null;
              return `${xScale(xi)},${yScale(d.y)}`;
            })
            .filter(Boolean) as string[];
          const pathD = points.length > 0 ? `M ${points.join(' L ')}` : '';

          return (
            <g key={s.name ?? seriesIndex}>
              <path
                d={pathD}
                fill="none"
                stroke={color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-opacity"
              />
              {showDots &&
                s.data.map((d, i) => {
                  const xi = xLabels.indexOf(d.x);
                  if (xi === -1) return null;
                  return (
                    <circle
                      key={i}
                      cx={xScale(xi)}
                      cy={yScale(d.y)}
                      r={4}
                      fill={color}
                      className="transition-opacity"
                    />
                  );
                })}
            </g>
          );
        })}
        {xLabels.map((x, i) => (
          <text
            key={i}
            x={xScale(i)}
            y={height - 6}
            textAnchor="middle"
            className="fill-gray-600 dark:fill-gray-400 text-[10px]"
          >
            {String(x)}
          </text>
        ))}
      </svg>
    </div>
  );
}
