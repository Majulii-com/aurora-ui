import { useMemo } from 'react';
import { cn } from '../../utils';
import type { PieChartProps } from './PieChart.types';

const DEFAULT_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

function getSegmentColor(colors: string[], index: number): string {
  return colors[index % colors.length];
}

export function PieChart({
  data,
  donut = false,
  colors = DEFAULT_COLORS,
  size = 200,
  showLabels = true,
  className,
}: PieChartProps) {
  const total = useMemo(() => data.reduce((s, d) => s + d.value, 0), [data]);
  const segments = useMemo(() => {
    if (total === 0) return [];
    return data.map((d, i) => ({
      ...d,
      startAngle: 0,
      endAngle: 0,
      offset: 0,
      color: getSegmentColor(colors, i),
    }));
  }, [data, total, colors]);

  const withAngles = useMemo(() => {
    let acc = 0;
    const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;
    return segments.map((s) => {
      const pct = total > 0 ? s.value / total : 0;
      const startDeg = acc * 360;
      acc += pct;
      const endDeg = acc * 360;
      return { ...s, startAngle: toRad(startDeg), endAngle: toRad(endDeg), pct };
    });
  }, [segments, total]);

  if (data.length === 0) {
    return (
      <div className={cn('flex items-center justify-center rounded-full bg-gray-50 dark:bg-gray-800/50', className)} style={{ width: size, height: size }}>
        <span className="text-sm text-gray-500">No data</span>
      </div>
    );
  }

  const cx = size / 2;
  const cy = size / 2;
  const r = (size / 2) * 0.85;
  const ir = donut ? r * 0.5 : 0;

  const describeArc = (startRad: number, endRad: number, innerR: number) => {
    const start = { x: cx + r * Math.cos(startRad), y: cy - r * Math.sin(startRad) };
    const end = { x: cx + r * Math.cos(endRad), y: cy - r * Math.sin(endRad) };
    const large = endRad - startRad > Math.PI ? 1 : 0;
    if (innerR <= 0) {
      return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${large} 1 ${end.x} ${end.y} Z`;
    }
    const startInner = { x: cx + innerR * Math.cos(startRad), y: cy - innerR * Math.sin(startRad) };
    const endInner = { x: cx + innerR * Math.cos(endRad), y: cy - innerR * Math.sin(endRad) };
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 1 ${end.x} ${end.y} L ${endInner.x} ${endInner.y} A ${innerR} ${innerR} 0 ${large} 0 ${startInner.x} ${startInner.y} Z`;
  };

  return (
    <div className={cn('inline-flex flex-col items-center', className)}>
      <svg width={size} height={size} role="img" aria-label="Pie chart">
        {withAngles.map((seg, i) => (
          <path
            key={i}
            d={describeArc(seg.startAngle, seg.endAngle, ir)}
            fill={seg.color}
            className="transition-opacity"
          />
        ))}
      </svg>
      {showLabels && (
        <div className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs">
          {withAngles.map((seg, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
              <span className="text-gray-600 dark:text-gray-400">{seg.label}</span>
              <span className="text-gray-500 tabular-nums">({Math.round(seg.pct * 100)}%)</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
