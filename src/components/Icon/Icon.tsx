import React from 'react';
import { AddIcon, SearchIcon, CloseIcon } from '../../icons';
import { cn } from '../../utils';
import type { IconName, IconPropsWithName } from './Icon.types';

const runSvg = (
  <path fill="currentColor" d="M8 5v14l11-7L8 5z" />
);
function wrapSvgFill(children: React.ReactNode, size: number | string = 24, className?: string) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      {children}
    </svg>
  );
}
const saveSvg = (
  <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2zM17 21v-8H7v8M7 3v5h8" />
);
const exportSvg = (
  <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
);
const settingsSvg = (
  <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" />
);
const menuSvg = (
  <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" d="M4 6h16M4 12h16M4 18h16" />
);
const chevronDownSvg = (
  <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" d="M19 9l-7 7-7-7" />
);
const chevronRightSvg = (
  <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" d="M9 5l7 7-7 7" />
);
const refreshSvg = (
  <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
);
const maximizeSvg = (
  <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
);
const moreSvg = (
  <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" d="M12 5v.01M12 12v.01M12 19v.01" />
);

function wrapSvg(children: React.ReactNode, size: number | string = 24, className?: string) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

const iconMap: Record<
  IconName,
  React.ComponentType<{ size?: number | string; color?: string; className?: string }>
> = {
  add: AddIcon,
  search: SearchIcon,
  close: CloseIcon,
  run: ({ size, className }) => <>{wrapSvgFill(runSvg, size, className)}</>,
  save: ({ size, className }) => <>{wrapSvg(saveSvg, size, className)}</>,
  export: ({ size, className }) => <>{wrapSvg(exportSvg, size, className)}</>,
  settings: ({ size, className }) => <>{wrapSvg(settingsSvg, size, className)}</>,
  menu: ({ size, className }) => <>{wrapSvg(menuSvg, size, className)}</>,
  'chevron-down': ({ size, className }) => <>{wrapSvg(chevronDownSvg, size, className)}</>,
  'chevron-right': ({ size, className }) => <>{wrapSvg(chevronRightSvg, size, className)}</>,
  refresh: ({ size, className }) => <>{wrapSvg(refreshSvg, size, className)}</>,
  maximize: ({ size, className }) => <>{wrapSvg(maximizeSvg, size, className)}</>,
  more: ({ size, className }) => <>{wrapSvg(moreSvg, size, className)}</>,
};

export function Icon({ name, size = 24, color, className }: IconPropsWithName) {
  const Comp = iconMap[name];
  if (!Comp) return null;
  return <Comp size={size} color={color} className={cn(className)} />;
}
