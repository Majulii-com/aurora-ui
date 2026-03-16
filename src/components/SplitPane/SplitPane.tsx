import { useState, useCallback, useRef, useEffect } from 'react';
import { cn } from '../../utils';
import type { SplitPaneProps } from './SplitPane.types';

export function SplitPane({
  direction = 'horizontal',
  defaultSize = 0.5,
  minSize = 100,
  maxSize,
  className,
  children,
}: SplitPaneProps) {
  const [size, setSize] = useState(defaultSize);
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
      const pos = e[axis] - (direction === 'horizontal' ? rect.left : rect.top);
      let frac = pos / total;
      if (min !== undefined && total > 0) {
        const minFrac = min / total;
        frac = Math.max(frac, minFrac);
      }
      if (max !== undefined && total > 0) {
        const maxFrac = max / total;
        frac = Math.min(frac, maxFrac);
      }
      return Math.max(0, Math.min(1, frac));
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

  const isHorizontal = direction === 'horizontal';
  const firstSize = `${size * 100}%`;

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
        {children[0]}
      </div>
      <div
        role="separator"
        aria-valuenow={Math.round(size * 100)}
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
        {children[1]}
      </div>
    </div>
  );
}
