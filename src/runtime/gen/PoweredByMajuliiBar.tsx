import { cn } from '../../utils';
import majuliiLogo from '../../assets/majulii_logo.svg';

const MAJULII_URL = 'https://majulii.com';

export type PoweredByMajuliiBarProps = {
  className?: string;
  /** Defaults to `https://majulii.com`. */
  href?: string;
};

/**
 * Compact “Powered by majulii.com” branding for Generative JSON DSL previews.
 * Shipped with the library; used by {@link GenUIRenderer} unless opted out.
 */
export function PoweredByMajuliiBar({ className, href = MAJULII_URL }: PoweredByMajuliiBarProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Powered by Majulii — visit majulii.com"
      className={cn(
        'inline-flex max-w-full items-center gap-1.5 whitespace-nowrap rounded-md border border-slate-200/90 bg-white/95 px-2 py-1 text-[11px] leading-tight text-slate-600 shadow-sm backdrop-blur-sm transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800 dark:border-slate-600 dark:bg-slate-900/95 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-100',
        className
      )}
    >
      <img
        src={majuliiLogo}
        alt=""
        width={20}
        height={20}
        className="h-5 w-auto shrink-0 object-contain"
        decoding="async"
      />
      <span className="min-w-0 shrink truncate">
        <span className="text-slate-500 dark:text-slate-400">Powered by </span>
        <span className="font-semibold text-slate-700 dark:text-slate-200">majulii.com</span>
      </span>
    </a>
  );
}
