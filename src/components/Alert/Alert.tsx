import { forwardRef } from 'react';
import { cn } from '../../utils';
import { useAuroraSurface } from '../../theme/useAuroraSurface';
import type { AlertProps } from './Alert.types';

type VariantKey = NonNullable<AlertProps['variant']>;

type VariantStyle = {
  shell: string;
  iconWrap: string;
  iconClass: string;
  title: string;
  body: string;
  dismiss: string;
  leftBar: string;
};

/**
 * Enterprise alerts — left accent bar on clean white surface.
 * Pattern used by Linear, GitHub, Stripe. No gradient blobs, no rounded-2xl.
 */
const auroraStyles: Record<VariantKey, VariantStyle> = {
  info: {
    shell:
      'rounded-lg border border-zinc-200/80 dark:border-zinc-700/50 ' +
      'bg-white dark:bg-zinc-900/80 ' +
      'shadow-[0_1px_3px_rgba(0,0,0,0.04),0_0_0_1px_rgba(0,0,0,0.02)] ' +
      'p-4',
    iconWrap:
      'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ' +
      'bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400',
    iconClass: 'h-[18px] w-[18px]',
    title: 'text-[13.5px] font-semibold text-zinc-900 dark:text-zinc-100 tracking-[-0.006em]',
    body: 'text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400',
    dismiss: 'text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/[0.06] rounded-md transition-colors',
    leftBar: 'bg-sky-500 dark:bg-sky-400',
  },
  success: {
    shell:
      'rounded-lg border border-zinc-200/80 dark:border-zinc-700/50 ' +
      'bg-white dark:bg-zinc-900/80 ' +
      'shadow-[0_1px_3px_rgba(0,0,0,0.04),0_0_0_1px_rgba(0,0,0,0.02)] ' +
      'p-4',
    iconWrap:
      'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ' +
      'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400',
    iconClass: 'h-[18px] w-[18px]',
    title: 'text-[13.5px] font-semibold text-zinc-900 dark:text-zinc-100 tracking-[-0.006em]',
    body: 'text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400',
    dismiss: 'text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/[0.06] rounded-md transition-colors',
    leftBar: 'bg-emerald-500 dark:bg-emerald-400',
  },
  warning: {
    shell:
      'rounded-lg border border-zinc-200/80 dark:border-zinc-700/50 ' +
      'bg-white dark:bg-zinc-900/80 ' +
      'shadow-[0_1px_3px_rgba(0,0,0,0.04),0_0_0_1px_rgba(0,0,0,0.02)] ' +
      'p-4',
    iconWrap:
      'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ' +
      'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400',
    iconClass: 'h-[18px] w-[18px]',
    title: 'text-[13.5px] font-semibold text-zinc-900 dark:text-zinc-100 tracking-[-0.006em]',
    body: 'text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400',
    dismiss: 'text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/[0.06] rounded-md transition-colors',
    leftBar: 'bg-amber-500 dark:bg-amber-400',
  },
  danger: {
    shell:
      'rounded-lg border border-zinc-200/80 dark:border-zinc-700/50 ' +
      'bg-white dark:bg-zinc-900/80 ' +
      'shadow-[0_1px_3px_rgba(0,0,0,0.04),0_0_0_1px_rgba(0,0,0,0.02)] ' +
      'p-4',
    iconWrap:
      'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ' +
      'bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400',
    iconClass: 'h-[18px] w-[18px]',
    title: 'text-[13.5px] font-semibold text-zinc-900 dark:text-zinc-100 tracking-[-0.006em]',
    body: 'text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400',
    dismiss: 'text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/[0.06] rounded-md transition-colors',
    leftBar: 'bg-red-500 dark:bg-red-400',
  },
};

const plainStyles: Record<VariantKey, VariantStyle> = {
  info: {
    shell: 'rounded-lg border border-blue-200/90 bg-blue-50/90 p-4 dark:border-blue-800/60 dark:bg-blue-950/35',
    iconWrap: 'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100/90 text-blue-700 dark:bg-blue-900/55 dark:text-blue-200',
    iconClass: 'h-5 w-5',
    title: 'font-semibold text-blue-950 dark:text-blue-50',
    body: 'text-[14px] leading-relaxed text-blue-900/85 dark:text-blue-200/85',
    dismiss: 'text-blue-800/70 hover:bg-blue-950/10 dark:text-blue-200 dark:hover:bg-white/10',
    leftBar: 'bg-blue-500',
  },
  success: {
    shell: 'rounded-lg border border-green-200/90 bg-green-50/90 p-4 dark:border-green-800/55 dark:bg-green-950/35',
    iconWrap: 'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-100/90 text-green-700 dark:bg-green-900/55 dark:text-green-200',
    iconClass: 'h-5 w-5',
    title: 'font-semibold text-green-950 dark:text-green-50',
    body: 'text-[14px] leading-relaxed text-green-900/85 dark:text-green-200/85',
    dismiss: 'text-green-800/70 hover:bg-green-950/10 dark:text-green-200 dark:hover:bg-white/10',
    leftBar: 'bg-green-500',
  },
  warning: {
    shell: 'rounded-lg border border-amber-200/90 bg-amber-50/90 p-4 dark:border-amber-800/55 dark:bg-amber-950/35',
    iconWrap: 'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100/90 text-amber-800 dark:bg-amber-900/55 dark:text-amber-200',
    iconClass: 'h-5 w-5',
    title: 'font-semibold text-amber-950 dark:text-amber-50',
    body: 'text-[14px] leading-relaxed text-amber-950/85 dark:text-amber-200/85',
    dismiss: 'text-amber-900/70 hover:bg-amber-950/10 dark:text-amber-200 dark:hover:bg-white/10',
    leftBar: 'bg-amber-500',
  },
  danger: {
    shell: 'rounded-lg border border-red-200/90 bg-red-50/90 p-4 dark:border-red-800/55 dark:bg-red-950/35',
    iconWrap: 'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100/90 text-red-700 dark:bg-red-900/55 dark:text-red-200',
    iconClass: 'h-5 w-5',
    title: 'font-semibold text-red-950 dark:text-red-50',
    body: 'text-[14px] leading-relaxed text-red-900/85 dark:text-red-200/85',
    dismiss: 'text-red-800/70 hover:bg-red-950/10 dark:text-red-200 dark:hover:bg-white/10',
    leftBar: 'bg-red-500',
  },
};

function AlertGlyph({ variant, className }: { variant: VariantKey; className?: string }) {
  const stroke = 'stroke-[2] stroke-current';
  switch (variant) {
    case 'info':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path className={stroke} strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'success':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path className={stroke} strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'warning':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path className={stroke} strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      );
    case 'danger':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path className={stroke} strokeLinecap="round" strokeLinejoin="round" d="m15 9-6 6m0-6 6 6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      );
  }
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'info', title, onClose, className, children, plain, ...rest }, ref) => {
    const ent = useAuroraSurface(plain);
    const useAurora = ent.isAurora && !plain;
    const s = useAurora ? auroraStyles[variant] : plainStyles[variant];

    return (
      <div ref={ref} role="alert" className={cn('relative overflow-hidden', s.shell, className)} {...rest}>
        {/* Left accent bar — 3px solid, full height flush to left edge */}
        <span
          className={cn('pointer-events-none absolute inset-y-0 left-0 w-[3px]', s.leftBar)}
          aria-hidden
        />
        <div className="flex gap-3 pl-3">
          <div className={s.iconWrap}>
            <AlertGlyph variant={variant} className={s.iconClass} />
          </div>
          <div className="min-w-0 flex-1 py-0.5">
            {title && <p className={s.title}>{title}</p>}
            <div className={cn(s.body, title && 'mt-0.5')}>{children}</div>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className={cn(
                '-mr-1 -mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
                s.dismiss
              )}
              aria-label="Close alert"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';
