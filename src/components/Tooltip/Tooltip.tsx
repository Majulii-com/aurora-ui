import { useState, useRef, cloneElement, isValidElement } from 'react';
import { cn } from '../../utils';
import type { TooltipProps } from './Tooltip.types';

const placementClasses: Record<TooltipProps['placement'] & string, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

export function Tooltip({
  content,
  placement = 'top',
  disabled,
  children,
  className,
  ...rest
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const handleMouseEnter = () => {
    if (disabled) return;
    setVisible(true);
  };

  const handleMouseLeave = () => setVisible(false);

  const child = isValidElement(children) ? children : <span>{children}</span>;
  const origRef = (child as { ref?: React.Ref<HTMLElement | null> }).ref;
  const trigger = cloneElement(child, {
    ref: (el: HTMLElement | null) => {
      (triggerRef as React.MutableRefObject<HTMLElement | null>).current = el;
      if (typeof origRef === 'function') origRef(el);
      else if (origRef && typeof origRef === 'object') (origRef as React.MutableRefObject<HTMLElement | null>).current = el;
    },
    onMouseEnter: (e: React.MouseEvent) => {
      handleMouseEnter();
      (child as React.ReactElement<{ onMouseEnter?: (e: React.MouseEvent) => void }>).props?.onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      handleMouseLeave();
      (child as React.ReactElement<{ onMouseLeave?: (e: React.MouseEvent) => void }>).props?.onMouseLeave?.(e);
    },
  });

  const tooltipEl = visible && !disabled && (
    <div
      role="tooltip"
      className={cn(
        'absolute z-50 px-2 py-1.5 text-sm text-white bg-gray-900 dark:bg-gray-700 rounded shadow-lg whitespace-nowrap',
        placementClasses[placement],
        className
      )}
      {...rest}
    >
      {content}
    </div>
  );

  return (
    <span className="relative inline-flex">
      {trigger}
      {tooltipEl}
    </span>
  );
}
