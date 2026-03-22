import { forwardRef, useState } from 'react';
import { cn } from '../../utils';
import { useAuroraSurface } from '../../theme/useAuroraSurface';
import type { AvatarProps } from './Avatar.types';

const sizeClasses = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-lg' };

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((s) => s[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, name, size = 'md', fallback, plain, className, ...rest }, ref) => {
    const ent = useAuroraSurface(plain);
    const [imgError, setImgError] = useState(false);
    const showImg = src && !imgError;
    const initials = name ? getInitials(name) : null;

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full font-medium overflow-hidden',
          ent.isAurora
            ? ent.avatar
            : 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300',
          sizeClasses[size],
          className
        )}
        role="img"
        aria-label={alt ?? name ?? 'Avatar'}
        {...rest}
      >
        {showImg ? (
          <img
            src={src}
            alt={alt ?? name ?? ''}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          fallback ?? (initials || '?')
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
