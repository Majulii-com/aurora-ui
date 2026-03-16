import { forwardRef } from 'react';
import { cn } from '../../utils';
import type { SliderProps } from './Slider.types';

const sizeClasses = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      min = 0,
      max = 100,
      step = 1,
      value,
      size = 'md',
      label,
      showValue = false,
      className,
      id,
      ...rest
    },
    ref
  ) => {
    const displayValue = value ?? min;
    return (
      <div className={cn('w-full', className)}>
        {(label || showValue) && (
          <div className="flex justify-between items-center gap-2 mb-1">
            {label && (
              <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
              </label>
            )}
            {showValue && <span className="text-sm text-gray-500 dark:text-gray-400 tabular-nums">{displayValue}</span>}
          </div>
        )}
        <input
          ref={ref}
          type="range"
          id={id}
          min={min}
          max={max}
          step={step}
          value={value ?? min}
          className={cn(
            'w-full rounded-full appearance-none bg-gray-200 dark:bg-gray-700 accent-primary-500 cursor-pointer',
            sizeClasses[size],
            '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary-500 [&::-moz-range-thumb]:border-0'
          )}
          {...rest}
        />
      </div>
    );
  }
);

Slider.displayName = 'Slider';
