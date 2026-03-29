import { Children, useState, useCallback, useRef, useEffect } from 'react';
import { cn } from '../../utils';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import type { SplitPaneProps } from './SplitPane.types';

function clampFraction(n: number, fallback: number): number {
  if (typeof n !== 'number' || !Number.isFinite(n)) return fallback;
  return Math.max(0, Math.min(1, n));
}

export function SplitPane({
  direction = 'horizontal',
  defaultSize = 0.5,
  minSize = 100,
  maxSize,
  className,
  children,
}: SplitPaneProps) {
  const initial = clampFraction(
    typeof defaultSize === 'number' ? defaultSize : 0.5,
    0.5
  );
  const [size, setSize] = useState(initial);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const min = typeof minSize === 'string' ? parseFloat(minSize) : minSize;
  const max = maxSize !== undefined ? (typeof maxSize === 'string' ? parseFloat(maxSize) : maxSize) : undefined;

  const handleMouseDown = useCallback(() => setIsDragging(true), []);

  useEffect(() => {
    if (!isDragging) return;
    const axis = direction === 'horizontal' ? 'clientX' : 'clientY';
    const getSize = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return size;
      const rect = el.getBoundingClientRect();
      const total = direction === 'horizontal' ? rect.width : rect.height;
      /** Avoid pos/0 → NaN / Infinity, which produced width "NaN%" and collapsed the first pane. */
      if (!(total > 0)) return size;
      const pos = e[axis] - (direction === 'horizontal' ? rect.left : rect.top);
      let frac = pos / total;
      if (min !== undefined) {
        const minFrac = min / total;
        frac = Math.max(frac, minFrac);
      }
      if (max !== undefined) {
        const maxFrac = max / total;
        frac = Math.min(frac, maxFrac);
      }
      const next = Math.max(0, Math.min(1, frac));
      return Number.isFinite(next) ? next : size;
    };
    const onMove = (e: MouseEvent) => setSize(getSize(e));
    const onUp = () => setIsDragging(false);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    document.body.style.cursor = direction === 'horizontal' ? 'col-resize' : 'row-resize';
    document.body.style.userSelect = 'none';
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, direction, size, min, max]);

  const safeSize = clampFraction(size, initial);
  const firstSize = `${safeSize * 100}%`;

  const panes = Children.toArray(children);
  const firstPane = panes[0];
  const secondPane = panes[1];

  const isDesktopSplit = useMediaQuery('(min-width: 1024px)');
  const isHorizontal = direction === 'horizontal';

  if (isHorizontal && !isDesktopSplit && firstPane != null && secondPane != null) {
    return (
      <div className={cn('flex w-full min-w-0 flex-col gap-4', className)}>
        <div className="min-h-0 min-w-0 w-full overflow-auto">{firstPane}</div>
        <div className="min-h-0 min-w-0 w-full flex-1 overflow-auto">{secondPane}</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'flex w-full h-full overflow-hidden',
        isHorizontal ? 'flex-row' : 'flex-col',
        className
      )}
    >
      <div
        className={cn('overflow-auto shrink-0', isHorizontal ? 'h-full' : 'w-full')}
        style={isHorizontal ? { width: firstSize } : { height: firstSize }}
      >
        {firstPane}
      </div>
      <div
        role="separator"
        aria-valuenow={Math.round(safeSize * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-orientation={isHorizontal ? 'vertical' : 'horizontal'}
        onMouseDown={handleMouseDown}
        className={cn(
          'shrink-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 hover:bg-primary-500/20 transition-colors',
          isHorizontal ? 'w-2 cursor-col-resize' : 'h-2 cursor-row-resize'
        )}
      >
        <div
          className={cn(
            'bg-gray-400 dark:bg-gray-500 rounded-full',
            isHorizontal ? 'w-1 h-8' : 'h-1 w-8'
          )}
        />
      </div>
      <div
        className={cn('overflow-auto flex-1 min-w-0 min-h-0', isHorizontal ? 'h-full' : 'w-full')}
        style={isHorizontal ? {} : {}}
      >
        {secondPane}
      </div>
    </div>
  );
}
