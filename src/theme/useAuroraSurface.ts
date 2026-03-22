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
 * Aurora **surface** tokens — Majulii “atelier” grade: layered light, jewel teal accent,
 * glass-adjacent controls, museum-canvas backgrounds. Feels expensive without loud gradients.
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
    /* Secondary actions — porcelain lift, soft contact shadow */
    button:
      'shadow-[0_1px_0_0_rgba(255,255,255,0.92)_inset,0_2px_4px_-1px_rgba(15,23,42,0.06),0_8px_24px_-8px_rgba(15,23,42,0.08)] hover:shadow-[0_1px_0_0_rgba(255,255,255,0.95)_inset,0_12px_32px_-6px_rgba(15,23,42,0.12)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_4px_16px_-4px_rgba(0,0,0,0.45)] dark:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_12px_40px_-8px_rgba(0,0,0,0.55)] active:translate-y-px active:shadow-sm transition-[box-shadow,transform] duration-300 ring-1 ring-white/40 dark:ring-white/[0.14]',
    /* Primary — one soft top gleam (blends into teal, not a white “seam”) + glow */
    buttonPrimary:
      'shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_2px_8px_-2px_rgba(13,148,136,0.3),0_8px_28px_-6px_rgba(13,148,136,0.28),0_0_0_1px_rgba(13,148,136,0.1)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_6px_20px_-4px_rgba(13,148,136,0.4),0_12px_40px_-8px_rgba(45,212,191,0.18)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_4px_16px_-4px_rgba(13,148,136,0.35),0_0_0_1px_rgba(45,212,191,0.12)] dark:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_8px_32px_-4px_rgba(45,212,191,0.3)] ring-1 ring-teal-400/20 dark:ring-teal-500/25',
    input:
      'rounded-xl border border-stone-200/90 dark:border-stone-600/50 bg-gradient-to-b from-white to-stone-50/80 dark:from-stone-900/90 dark:to-stone-950/80 shadow-[var(--aurora-shadow-control)] ring-1 ring-white/60 dark:ring-white/[0.07] transition-[box-shadow,ring-color] duration-200 focus:ring-2 focus:ring-primary-500/45 focus:border-primary-300/40 dark:focus:border-primary-600/40 backdrop-blur-sm',
    textarea:
      'rounded-xl border border-stone-200/90 dark:border-stone-600/50 bg-gradient-to-b from-white to-stone-50/80 dark:from-stone-900/90 dark:to-stone-950/80 shadow-[var(--aurora-shadow-control)] ring-1 ring-white/60 dark:ring-white/[0.07] transition-shadow focus:ring-2 focus:ring-primary-500/45 backdrop-blur-sm',
    select:
      'rounded-xl border border-stone-200/90 dark:border-stone-600/50 bg-gradient-to-b from-white to-stone-50/80 dark:from-stone-900/90 dark:to-stone-950/80 shadow-[var(--aurora-shadow-control)] ring-1 ring-white/60 dark:ring-white/[0.07] transition-shadow focus:ring-2 focus:ring-primary-500/45 backdrop-blur-sm',
    /* Cards — museum paper + glass edge */
    card:
      'rounded-[1.35rem] border border-stone-200/70 dark:border-teal-900/40 bg-gradient-to-br from-white via-teal-50/[0.35] to-cyan-50/30 dark:from-[#0c1419] dark:via-stone-950 dark:to-teal-950/40 ring-1 ring-white/70 dark:ring-teal-500/10 shadow-[var(--aurora-shadow-card)] [box-shadow:var(--aurora-shadow-card),0_0_0_1px_rgba(255,255,255,0.5)_inset] dark:[box-shadow:var(--aurora-shadow-card),inset_0_1px_0_rgba(255,255,255,0.06)]',
    cardHeader: 'px-5 py-4 border-b border-stone-200/60 dark:border-white/[0.06]',
    cardBody: 'p-5',
    modalPanel:
      'rounded-[1.35rem] border border-teal-200/50 dark:border-teal-800/30 bg-gradient-to-b from-white via-teal-50/30 to-emerald-50/25 dark:from-[#0f161c] dark:via-stone-950 dark:to-teal-950/50 ring-1 ring-white/80 dark:ring-teal-400/15 shadow-[var(--aurora-shadow-float)] backdrop-blur-xl dark:backdrop-blur-xl [box-shadow:var(--aurora-shadow-float),0_0_80px_-20px_rgba(13,148,136,0.15)]',
    alert:
      'rounded-2xl border border-stone-200/60 dark:border-stone-700/50 bg-white/80 dark:bg-stone-900/70 shadow-[var(--aurora-shadow-control)] ring-1 ring-stone-900/[0.03] dark:ring-white/[0.06] backdrop-blur-md',
    iconButton:
      'shadow-[0_2px_8px_rgba(15,23,42,0.06)] ring-1 ring-stone-900/[0.06] dark:ring-white/[0.12] dark:shadow-[0_4px_12px_rgba(0,0,0,0.35)] hover:shadow-md hover:ring-stone-900/10 dark:hover:ring-white/20 transition-all duration-200',
    badge:
      'shadow-[0_1px_0_0_rgba(255,255,255,0.5)_inset,0_2px_6px_rgba(15,23,42,0.06)] ring-1 ring-white/30 dark:ring-stone-800/50',
    label:
      'text-[13px] font-semibold tracking-[0.02em] text-teal-950/85 dark:text-teal-100/92 antialiased',
    tableScrollWrap:
      'rounded-xl border border-stone-200/70 dark:border-stone-700/45 bg-white/95 dark:bg-stone-950/60 shadow-[var(--aurora-shadow-control)] ring-1 ring-white/50 dark:ring-white/[0.05] backdrop-blur-sm overflow-hidden',
    tableSurface:
      'rounded-[1.25rem] border border-teal-200/45 dark:border-teal-800/25 bg-gradient-to-br from-white via-teal-50/40 to-sky-50/25 dark:from-stone-950/90 dark:via-teal-950/30 dark:to-[#0a1014] p-4 md:p-6 shadow-[var(--aurora-shadow-card)] ring-1 ring-teal-900/[0.04] dark:ring-teal-500/[0.08] [box-shadow:var(--aurora-shadow-card),0_0_60px_-24px_rgba(13,148,136,0.12)]',
    tableHead:
      'bg-gradient-to-b from-stone-100/95 via-teal-50/50 to-emerald-50/40 dark:from-stone-900 dark:via-teal-950/60 dark:to-stone-900/95 border-b border-stone-200/80 dark:border-white/[0.06]',
    tableRow:
      'border-stone-200/70 dark:border-stone-800/80 transition-colors duration-150 hover:bg-gradient-to-r hover:from-teal-50/50 hover:to-transparent dark:hover:from-teal-950/40 dark:hover:to-transparent',
    tableHeaderCell:
      'text-[#071822] dark:text-teal-50/95 font-semibold tracking-[0.01em] text-[13px] uppercase',
    tableCell: 'text-slate-700 dark:text-teal-50/88 text-[15px]',
    /* App canvas — warm ivory → cool mist (editorial) */
    playgroundPage:
      'bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(204,251,241,0.45),transparent)] bg-stone-50 dark:bg-[radial-gradient(ellipse_100%_60%_at_50%_0%,rgba(13,148,136,0.12),transparent)] dark:bg-slate-950',
    playgroundGenColumn:
      'border-r border-stone-200/80 dark:border-teal-900/30 bg-gradient-to-b from-white/90 via-teal-50/20 to-stone-100/40 dark:from-stone-950/98 dark:via-teal-950/25 dark:to-slate-950 backdrop-blur-md',
    playgroundGenPreview:
      'rounded-[1.25rem] border border-white/80 dark:border-teal-800/25 bg-white/95 dark:bg-[#0c1218]/95 shadow-[var(--aurora-shadow-float)] ring-1 ring-teal-900/[0.04] dark:ring-teal-400/10 backdrop-blur-[6px] [box-shadow:var(--aurora-shadow-float),0_0_100px_-30px_rgba(13,148,136,0.12)]',
    playgroundCanvasMain:
      'bg-gradient-to-b from-stone-100/30 via-transparent to-teal-50/20 dark:from-transparent dark:to-teal-950/15',
    playgroundCanvasDropzone:
      'rounded-[1.25rem] border-2 border-dashed border-stone-300/70 dark:border-teal-700/35 bg-gradient-to-b from-white/95 to-stone-50/80 dark:from-stone-900/60 dark:to-stone-950/80 shadow-[inset_0_2px_12px_rgba(15,23,42,0.04)] ring-1 ring-stone-900/[0.03]',
    tabsListLine: 'border-b border-stone-200/90 dark:border-stone-700/60',
    tabsListPills:
      'rounded-2xl bg-gradient-to-b from-stone-100/95 to-stone-200/40 dark:from-stone-900/90 dark:to-stone-950 p-1.5 shadow-[inset_0_2px_8px_rgba(15,23,42,0.06)] dark:shadow-[inset_0_2px_12px_rgba(0,0,0,0.4)] ring-1 ring-white/50 dark:ring-white/[0.06] gap-1',
    tabsListEnclosed:
      'rounded-t-2xl border border-b-0 border-stone-200/85 dark:border-stone-700/55 bg-stone-50/90 dark:bg-stone-900/50 backdrop-blur-sm',
    tabLine: 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors',
    tabPills: 'rounded-xl text-stone-600 dark:text-stone-400 transition-all duration-200',
    tabPillsActive:
      'bg-white dark:bg-teal-900/70 text-primary-800 dark:text-teal-100 shadow-[0_2px_12px_-2px_rgba(13,148,136,0.25),0_1px_0_0_rgba(255,255,255,0.9)_inset] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_16px_-4px_rgba(13,148,136,0.35)] ring-1 ring-teal-200/60 dark:ring-teal-600/30',
    tabPanel:
      'rounded-b-2xl border border-t-0 border-stone-200/85 dark:border-stone-700/55 bg-white/85 dark:bg-stone-950/50 p-5 md:p-6 shadow-[var(--aurora-shadow-control)] backdrop-blur-sm',
    genTextTitle:
      'text-2xl sm:text-[1.8rem] font-bold tracking-[-0.02em] text-[#061018] dark:text-[#ecfdf8] antialiased [text-wrap:balance] [text-shadow:0_1px_0_rgba(255,255,255,0.4)] dark:[text-shadow:0_1px_24px_rgba(45,212,191,0.12)]',
    genTextBody:
      'text-[15px] leading-[1.65] text-slate-600 dark:text-teal-100/82 antialiased font-[450]',
    genTextMuted:
      'text-sm text-slate-500 dark:text-teal-200/65 leading-relaxed antialiased tracking-[0.01em]',
    checkbox:
      'rounded-[0.4rem] border-stone-300/90 dark:border-stone-600 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset] dark:shadow-none ring-1 ring-stone-900/[0.04] focus:ring-2 focus:ring-primary-500/50',
    switchTrack:
      'shadow-[inset_0_2px_8px_rgba(15,23,42,0.12)] dark:shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] ring-1 ring-stone-900/[0.06] dark:ring-white/[0.08]',
    switchThumb:
      'shadow-[0_2px_8px_rgba(15,23,42,0.15),0_1px_0_rgba(255,255,255,0.95)_inset] ring-1 ring-white/90',
    spinner: 'ring-2 ring-primary-400/25 shadow-[0_0_14px_rgba(13,148,136,0.2)]',
  } as const;
}
