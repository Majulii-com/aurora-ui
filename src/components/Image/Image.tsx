import { forwardRef, useState } from 'react';
import { cn } from '../../utils';
import type { ImageProps } from './Image.types';

const roundedClasses = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ src, alt = '', fallback, aspectRatio, rounded = 'md', className, style, onError, ...rest }, ref) => {
    const [errored, setErrored] = useState(false);

    const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      setErrored(true);
      onError?.(e);
    };

    if (errored && fallback !== undefined) {
      return (
        <div
          className={cn(
            'flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 overflow-hidden',
            aspectRatio && 'aspect-square',
            roundedClasses[rounded],
            className
          )}
          style={aspectRatio ? { aspectRatio, ...style } : style}
        >
          {fallback}
        </div>
      );
    }

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn(roundedClasses[rounded], 'object-cover max-w-full h-auto', className)}
        style={aspectRatio ? { aspectRatio, ...style } : style}
        onError={handleError}
        {...rest}
      />
    );
  }
);

Image.displayName = 'Image';
