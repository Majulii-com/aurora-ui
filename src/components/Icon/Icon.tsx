import { DynamicIcon } from 'lucide-react/dynamic.mjs';
import type { IconName as LucideDynamicIconName } from 'lucide-react/dynamic';
import { cn } from '../../utils';
import { resolveIconName } from '../../icons/iconNames';
import type { IconPropsWithName } from './Icon.types';

export function Icon({ name, size = 24, color, className, strokeWidth = 2 }: IconPropsWithName) {
  const resolved = resolveIconName(name);
  if (!resolved) {
    if (typeof console !== 'undefined' && console.warn) {
      console.warn(`[Icon] Unknown icon name: "${name}". Use a Lucide name (see LUCIDE_ICON_NAMES) or a legacy alias.`);
    }
    return null;
  }

  return (
    <DynamicIcon
      name={resolved as LucideDynamicIconName}
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={cn('shrink-0', className)}
      aria-hidden
    />
  );
}
