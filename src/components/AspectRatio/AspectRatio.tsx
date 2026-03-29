import { cn } from '../../utils';
import type { AspectRatioProps } from './AspectRatio.types';

/**
 * Locks width:height for media, maps, or embeds. Place a single child (e.g. `Image` with `className="size-full object-cover"`).
 */
export function AspectRatio({ ratio = 16 / 9, className, style, children, ...rest }: AspectRatioProps) {
  return (
    <div
      className={cn('relative w-full overflow-hidden', className)}
      style={{ ...style, aspectRatio: ratio }}
      {...rest}
    >
      {children}
    </div>
  );
}
