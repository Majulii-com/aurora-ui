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
  accent: string;
};

/** Aurora — layered surfaces aligned with Card / teal system. */
const auroraStyles: Record<VariantKey, VariantStyle> = {
  info: {
    shell:
      'rounded-2xl border border-cyan-200/55 dark:border-cyan-800/38 bg-gradient-to-br from-white via-cyan-50/[0.42] to-sky-50/28 dark:from-[#0b1218] dark:via-cyan-950/40 dark:to-slate-950/88 shadow-[var(--aurora-shadow-control)] ring-1 ring-cyan-900/[0.05] dark:ring-cyan-400/[0.09] [box-shadow:var(--aurora-shadow-control),0_0_0_1px_rgba(6,182,212,0.06)_inset] dark:[box-shadow:var(--aurora-shadow-control),inset_0_1px_0_rgba(34,211,238,0.06)] backdrop-blur-[2px] p-4 pl-[1.125rem]',
    iconWrap:
      'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-100/95 to-sky-100/80 text-cyan-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] ring-1 ring-cyan-300/45 dark:from-cyan-950/85 dark:to-sky-950/70 dark:text-cyan-200 dark:ring-cyan-700/35',
    iconClass: 'h-5 w-5',
    title: 'text-[15px] font-semibold tracking-[-0.015em] text-[#062a32] dark:text-cyan-50/95',
    body: 'text-[14px] leading-relaxed text-slate-600 dark:text-cyan-100/78',
    dismiss:
      'text-cyan-800/70 hover:bg-cyan-950/8 dark:text-cyan-200/75 dark:hover:bg-white/[0.07] focus-visible:ring-cyan-500/40',
    accent: 'from-cyan-400 to-sky-500 dark:from-cyan-500 dark:to-sky-400',
  },
  success: {
    shell:
      'rounded-2xl border border-emerald-200/55 dark:border-emerald-800/38 bg-gradient-to-br from-white via-emerald-50/[0.38] to-teal-50/24 dark:from-[#0b1214] dark:via-emerald-950/38 dark:to-stone-950/90 shadow-[var(--aurora-shadow-control)] ring-1 ring-emerald-900/[0.045] dark:ring-emerald-400/[0.08] [box-shadow:var(--aurora-shadow-control),0_0_0_1px_rgba(16,185,129,0.05)_inset] backdrop-blur-[2px] p-4 pl-[1.125rem]',
    iconWrap:
      'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100/95 to-teal-100/75 text-emerald-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] ring-1 ring-emerald-300/45 dark:from-emerald-950/80 dark:to-teal-950/65 dark:text-emerald-200 dark:ring-emerald-700/32',
    iconClass: 'h-5 w-5',
    title: 'text-[15px] font-semibold tracking-[-0.015em] text-[#052e1f] dark:text-emerald-50/95',
    body: 'text-[14px] leading-relaxed text-slate-600 dark:text-emerald-100/78',
    dismiss:
      'text-emerald-800/70 hover:bg-emerald-950/8 dark:text-emerald-200/75 dark:hover:bg-white/[0.07] focus-visible:ring-emerald-500/40',
    accent: 'from-emerald-400 to-teal-500 dark:from-emerald-500 dark:to-teal-400',
  },
  warning: {
    shell:
      'rounded-2xl border border-amber-200/60 dark:border-amber-800/42 bg-gradient-to-br from-white via-amber-50/[0.42] to-orange-50/22 dark:from-[#141008] dark:via-amber-950/42 dark:to-stone-950/88 shadow-[var(--aurora-shadow-control)] ring-1 ring-amber-900/[0.06] dark:ring-amber-500/[0.1] [box-shadow:var(--aurora-shadow-control),0_0_0_1px_rgba(245,158,11,0.06)_inset] backdrop-blur-[2px] p-4 pl-[1.125rem]',
    iconWrap:
      'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100/95 to-orange-100/72 text-amber-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] ring-1 ring-amber-300/50 dark:from-amber-950/82 dark:to-orange-950/58 dark:text-amber-200 dark:ring-amber-700/38',
    iconClass: 'h-5 w-5',
    title: 'text-[15px] font-semibold tracking-[-0.015em] text-[#3d2a06] dark:text-amber-50/95',
    body: 'text-[14px] leading-relaxed text-amber-950/75 dark:text-amber-100/76',
    dismiss:
      'text-amber-900/65 hover:bg-amber-950/10 dark:text-amber-200/75 dark:hover:bg-white/[0.07] focus-visible:ring-amber-500/45',
    accent: 'from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-400',
  },
  danger: {
    shell:
      'rounded-2xl border border-rose-200/58 dark:border-rose-900/45 bg-gradient-to-br from-white via-rose-50/[0.38] to-red-50/22 dark:from-[#140c0e] dark:via-rose-950/38 dark:to-stone-950/92 shadow-[var(--aurora-shadow-control)] ring-1 ring-rose-900/[0.06] dark:ring-rose-500/[0.1] [box-shadow:var(--aurora-shadow-control),0_0_0_1px_rgba(244,63,94,0.05)_inset] backdrop-blur-[2px] p-4 pl-[1.125rem]',
    iconWrap:
      'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-100/95 to-red-100/72 text-rose-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] ring-1 ring-rose-300/48 dark:from-rose-950/82 dark:to-red-950/58 dark:text-rose-200 dark:ring-rose-800/38',
    iconClass: 'h-5 w-5',
    title: 'text-[15px] font-semibold tracking-[-0.015em] text-[#3f0a14] dark:text-rose-50/95',
    body: 'text-[14px] leading-relaxed text-rose-950/78 dark:text-rose-100/76',
    dismiss:
      'text-rose-800/72 hover:bg-rose-950/10 dark:text-rose-200/75 dark:hover:bg-white/[0.07] focus-visible:ring-rose-500/45',
    accent: 'from-rose-500 to-red-600 dark:from-rose-500 dark:to-red-500',
  },
};

const plainStyles: Record<VariantKey, VariantStyle> = {
  info: {
    shell: 'rounded-lg border border-blue-200/90 bg-blue-50/90 p-4 pl-[1.125rem] dark:border-blue-800/60 dark:bg-blue-950/35',
    iconWrap:
      'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100/90 text-blue-700 dark:bg-blue-900/55 dark:text-blue-200',
    iconClass: 'h-5 w-5',
    title: 'font-semibold text-blue-950 dark:text-blue-50',
    body: 'text-[14px] leading-relaxed text-blue-900/85 dark:text-blue-200/85',
    dismiss: 'text-blue-800/70 hover:bg-blue-950/10 dark:text-blue-200 dark:hover:bg-white/10',
    accent: 'from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-400',
  },
  success: {
    shell: 'rounded-lg border border-green-200/90 bg-green-50/90 p-4 pl-[1.125rem] dark:border-green-800/55 dark:bg-green-950/35',
    iconWrap:
      'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100/90 text-green-700 dark:bg-green-900/55 dark:text-green-200',
    iconClass: 'h-5 w-5',
    title: 'font-semibold text-green-950 dark:text-green-50',
    body: 'text-[14px] leading-relaxed text-green-900/85 dark:text-green-200/85',
    dismiss: 'text-green-800/70 hover:bg-green-950/10 dark:text-green-200 dark:hover:bg-white/10',
    accent: 'from-green-400 to-green-600 dark:from-green-500 dark:to-green-400',
  },
  warning: {
    shell: 'rounded-lg border border-amber-200/90 bg-amber-50/90 p-4 pl-[1.125rem] dark:border-amber-800/55 dark:bg-amber-950/35',
    iconWrap:
      'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100/90 text-amber-800 dark:bg-amber-900/55 dark:text-amber-200',
    iconClass: 'h-5 w-5',
    title: 'font-semibold text-amber-950 dark:text-amber-50',
    body: 'text-[14px] leading-relaxed text-amber-950/85 dark:text-amber-200/85',
    dismiss: 'text-amber-900/70 hover:bg-amber-950/10 dark:text-amber-200 dark:hover:bg-white/10',
    accent: 'from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-400',
  },
  danger: {
    shell: 'rounded-lg border border-red-200/90 bg-red-50/90 p-4 pl-[1.125rem] dark:border-red-800/55 dark:bg-red-950/35',
    iconWrap:
      'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100/90 text-red-700 dark:bg-red-900/55 dark:text-red-200',
    iconClass: 'h-5 w-5',
    title: 'font-semibold text-red-950 dark:text-red-50',
    body: 'text-[14px] leading-relaxed text-red-900/85 dark:text-red-200/85',
    dismiss: 'text-red-800/70 hover:bg-red-950/10 dark:text-red-200 dark:hover:bg-white/10',
    accent: 'from-red-400 to-red-600 dark:from-red-500 dark:to-red-400',
  },
};

function AlertGlyph({ variant, className }: { variant: VariantKey; className?: string }) {
  const stroke = 'stroke-[2.25] stroke-current';
  switch (variant) {
    case 'info':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            className={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16v-4m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
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
          <path
            className={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
      );
    case 'danger':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            className={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m15 9-6 6m0-6 6 6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
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
        <span
          className={cn(
            'pointer-events-none absolute bottom-3 left-0 top-3 w-[3px] rounded-full bg-gradient-to-b',
            s.accent
          )}
          aria-hidden
        />
        <div className="flex gap-3.5 pl-2">
          <div className={s.iconWrap}>
            <AlertGlyph variant={variant} className={s.iconClass} />
          </div>
          <div className="min-w-0 flex-1 pt-0.5">
            {title && <p className={s.title}>{title}</p>}
            <div className={cn(s.body, title && 'mt-1')}>{children}</div>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className={cn(
                '-mr-1 -mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
                s.dismiss
              )}
              aria-label="Close alert"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
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
