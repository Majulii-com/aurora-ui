import { useAuroraAppearance } from './theme-provider';

const OFF = {
  isAurora: false,
  button: '',
  buttonPrimary: '',
  input: '',
  textarea: '',
  select: '',
  card: '',
  cardHeader: '',
  cardBody: '',
  modalPanel: '',
  alert: '',
  iconButton: '',
  badge: '',
  label: '',
  tableScrollWrap: '',
  tableSurface: '',
  tableHead: '',
  tableRow: '',
  tableHeaderCell: '',
  tableCell: '',
  playgroundPage: '',
  playgroundGenColumn: '',
  playgroundGenPreview: '',
  playgroundCanvasMain: '',
  playgroundCanvasDropzone: '',
  tabsListLine: '',
  tabsListPills: '',
  tabsListEnclosed: '',
  tabLine: '',
  tabPills: '',
  tabPillsActive: '',
  tabPanel: '',
  genTextTitle: '',
  genTextBody: '',
  genTextMuted: '',
  checkbox: '',
  switchTrack: '',
  switchThumb: '',
  spinner: '',
} as const;

/**
 * Aurora **surface** tokens — Majulii brand: navy text, teal primary, mint canvas, amber/cyan accents.
 * Active when global `appearance` is `'aurora'` (default). Use `plain` on a component to opt out.
 * @see docs/THEME_APPEARANCE.md
 */
export function useAuroraSurface(componentPlain?: boolean) {
  const { isAurora } = useAuroraAppearance();
  const off = Boolean(componentPlain) || !isAurora;

  if (off) {
    return OFF;
  }

  return {
    isAurora: true as const,
    button:
      'shadow-[0_2px_10px_-2px_rgba(28,25,23,0.1),0_1px_3px_rgba(28,25,23,0.05)] hover:shadow-[0_8px_20px_-4px_rgba(28,25,23,0.12)] active:translate-y-px active:shadow-sm transition-[box-shadow,transform] duration-300 ring-1 ring-white/25 dark:ring-white/12',
    buttonPrimary:
      'shadow-[0_6px_22px_-4px_rgba(13,148,136,0.42),0_2px_8px_-2px_rgba(13,148,136,0.22),inset_0_1px_0_rgba(255,255,255,0.28)] hover:shadow-[0_10px_28px_-4px_rgba(13,148,136,0.5)] ring-1 ring-primary-400/40 dark:ring-primary-400/30',
    input:
      'rounded-xl border-stone-200/85 dark:border-stone-600/75 bg-white/98 dark:bg-stone-900/45 shadow-[var(--aurora-shadow-control)] ring-1 ring-stone-900/[0.04] dark:ring-white/[0.06] transition-shadow focus:ring-2 focus:ring-primary-500/35 backdrop-blur-[1px]',
    textarea:
      'rounded-xl border-stone-200/85 dark:border-stone-600/75 bg-white/98 dark:bg-stone-900/45 shadow-[var(--aurora-shadow-control)] ring-1 ring-stone-900/[0.04] dark:ring-white/[0.06] transition-shadow focus:ring-2 focus:ring-primary-500/35',
    select:
      'rounded-xl border-stone-200/85 dark:border-stone-600/75 bg-white/98 dark:bg-stone-900/45 shadow-[var(--aurora-shadow-control)] ring-1 ring-stone-900/[0.04] dark:ring-white/[0.06] transition-shadow focus:ring-2 focus:ring-primary-500/35',
    card:
      'rounded-2xl border border-teal-900/[0.06] dark:border-teal-500/15 bg-gradient-to-b from-white via-teal-50/20 to-emerald-50/35 dark:from-stone-900 dark:via-teal-950/25 dark:to-stone-950 ring-1 ring-teal-900/[0.04] dark:ring-teal-400/10 shadow-[var(--aurora-shadow-card),inset_0_1px_0_rgba(255,255,255,0.75)] dark:shadow-[var(--aurora-shadow-card),inset_0_1px_0_rgba(45,212,191,0.06)]',
    cardHeader: 'px-5 py-4',
    cardBody: 'p-5',
    modalPanel:
      'rounded-2xl border border-teal-100/80 dark:border-teal-800/40 bg-gradient-to-b from-white to-teal-50/40 dark:from-stone-900 dark:to-teal-950/30 shadow-[var(--aurora-shadow-float)] ring-1 ring-teal-900/[0.05] dark:ring-teal-400/15',
    alert:
      'rounded-2xl shadow-[var(--aurora-shadow-control)] ring-1 ring-stone-900/[0.04] dark:ring-white/[0.06]',
    iconButton:
      'shadow-[0_2px_8px_-2px_rgba(28,25,23,0.08)] ring-1 ring-stone-900/[0.07] dark:ring-white/[0.12] hover:shadow-md transition-shadow',
    badge:
      'shadow-[0_2px_8px_-2px_rgba(28,25,23,0.1)] ring-1 ring-white/25 dark:ring-stone-900/35',
    label: 'text-xs font-semibold tracking-wide text-teal-900/75 dark:text-teal-200/90 antialiased',
    tableScrollWrap:
      'rounded-xl border border-stone-200/65 dark:border-stone-700/55 bg-white dark:bg-stone-900/55 shadow-[var(--aurora-shadow-control)] ring-1 ring-stone-900/[0.04]',
    tableSurface:
      'rounded-2xl border border-teal-100/70 dark:border-teal-800/35 bg-gradient-to-b from-white via-teal-50/25 to-cyan-50/30 dark:from-stone-900/70 dark:via-teal-950/35 dark:to-stone-950/85 p-4 md:p-5 shadow-[var(--aurora-shadow-card)] ring-1 ring-teal-900/[0.05] dark:ring-teal-500/10',
    tableHead:
      'bg-gradient-to-b from-teal-50/90 via-emerald-50/50 to-stone-50/90 dark:from-teal-950/50 dark:via-stone-800 dark:to-stone-800/90',
    tableRow:
      'border-stone-200/80 dark:border-stone-700/65 transition-colors hover:bg-stone-50/98 dark:hover:bg-stone-800/50',
    tableHeaderCell: 'text-[#0b1f2a] dark:text-teal-50 font-semibold tracking-tight',
    tableCell: 'text-slate-700 dark:text-teal-100/90',
    playgroundPage:
      'bg-gradient-to-br from-teal-50/50 via-cyan-50/20 to-amber-50/35 dark:from-slate-950 dark:via-teal-950/40 dark:to-slate-950',
    playgroundGenColumn:
      'bg-gradient-to-b from-teal-50/30 to-emerald-50/25 dark:from-stone-900/95 dark:to-teal-950/50 border-teal-200/50 dark:border-teal-800/40',
    playgroundGenPreview:
      'rounded-2xl border border-teal-100/60 dark:border-teal-700/35 bg-white/[0.99] dark:bg-stone-900/80 shadow-[0_12px_44px_-14px_rgba(13,148,136,0.1),var(--aurora-shadow-card)] ring-1 ring-teal-900/[0.06] dark:ring-teal-400/12 backdrop-blur-[3px]',
    playgroundCanvasMain: 'bg-gradient-to-b from-transparent to-teal-50/25 dark:to-teal-950/20',
    playgroundCanvasDropzone:
      'rounded-2xl border-2 border-dashed border-stone-300/85 dark:border-stone-600/75 bg-white/92 dark:bg-stone-900/45 shadow-inner shadow-stone-900/6 ring-1 ring-stone-900/[0.04]',
    tabsListLine: 'border-b border-stone-200/88 dark:border-stone-700/78',
    tabsListPills:
      'rounded-xl bg-gradient-to-b from-teal-100/60 to-stone-100/90 p-1.5 shadow-inner shadow-teal-900/10 dark:from-teal-950/60 dark:to-stone-800/92 dark:shadow-black/25 gap-1',
    tabsListEnclosed: 'rounded-t-xl border border-stone-200/78 dark:border-stone-700/78 bg-stone-50/55 dark:bg-stone-900/35',
    tabLine: 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100',
    tabPills: 'rounded-lg text-stone-600 dark:text-stone-400 transition-all',
    tabPillsActive:
      'bg-white dark:bg-teal-900/80 text-primary-700 dark:text-primary-300 shadow-[0_4px_14px_-4px_rgba(13,148,136,0.18)] ring-1 ring-teal-500/20',
    tabPanel:
      'rounded-b-xl border border-t-0 border-stone-200/78 dark:border-stone-700/70 bg-white/65 dark:bg-stone-900/45 p-5 shadow-[var(--aurora-shadow-control)]',
    genTextTitle:
      'text-xl sm:text-2xl font-bold tracking-tight text-[#0b1f2a] dark:text-teal-50 antialiased [text-wrap:balance]',
    genTextBody: 'text-sm leading-relaxed text-slate-700 dark:text-teal-100/85 antialiased',
    genTextMuted: 'text-xs text-slate-500 dark:text-teal-300/70 leading-relaxed antialiased',
    checkbox:
      'rounded-md border-stone-300 dark:border-stone-500 shadow-sm ring-1 ring-stone-900/[0.05] focus:ring-2 focus:ring-primary-500/40',
    switchTrack:
      'shadow-inner shadow-stone-900/18 dark:shadow-black/45 ring-1 ring-stone-900/[0.07] dark:ring-white/[0.1]',
    switchThumb: 'shadow-lg shadow-stone-900/20 ring-1 ring-white/90',
    spinner: 'ring-2 ring-primary-500/25',
  } as const;
}
