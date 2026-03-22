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
  popover: '',
  dropdownMenu: '',
  dropdownItem: '',
  dropdownItemDestructive: '',
  drawerPanel: '',
  tooltipBubble: '',
  accordionItemBordered: '',
  accordionItemSeparated: '',
  accordionTrigger: '',
  accordionContent: '',
  progressTrack: '',
  skeleton: '',
  slider: '',
  radio: '',
  avatar: '',
  divider: '',
  breadcrumbSeparator: '',
  breadcrumbLink: '',
  breadcrumbCurrent: '',
  linkDefault: '',
  linkPrimary: '',
  linkMuted: '',
  linkUnderline: '',
  segmented: '',
  stepperCircle: '',
  stepperCircleActive: '',
  stepperCircleDone: '',
  stepperConnector: '',
  stepperLabel: '',
  stepperDescription: '',
  fileUpload: '',
  copyButton: '',
} as const;

/**
 * Aurora **surface** tokens — “atelier” grade: layered light, jewel teal accent,
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
    /* Secondary — porcelain lift, contact shadow, hairline ring */
    button:
      'shadow-[0_1px_0_0_rgba(255,255,255,0.94)_inset,0_2px_6px_-1px_rgba(15,23,42,0.07),0_10px_28px_-10px_rgba(15,23,42,0.1)] hover:shadow-[0_1px_0_0_rgba(255,255,255,0.96)_inset,0_14px_36px_-8px_rgba(15,23,42,0.14)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_6px_20px_-6px_rgba(0,0,0,0.48)] dark:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.11),0_14px_44px_-8px_rgba(0,0,0,0.58)] active:translate-y-px active:shadow-sm transition-[box-shadow,transform] duration-300 ease-out ring-1 ring-white/45 dark:ring-white/[0.15]',
    /* Primary — soft gleam + teal bloom */
    buttonPrimary:
      'shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_3px_10px_-2px_rgba(13,148,136,0.32),0_10px_32px_-8px_rgba(13,148,136,0.3),0_0_0_1px_rgba(13,148,136,0.12)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_24px_-4px_rgba(13,148,136,0.42),0_16px_48px_-10px_rgba(45,212,191,0.22)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_6px_20px_-6px_rgba(13,148,136,0.38),0_0_0_1px_rgba(45,212,191,0.14)] dark:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.13),0_10px_36px_-6px_rgba(45,212,191,0.35)] ring-1 ring-teal-400/22 dark:ring-teal-500/28',
    input:
      'rounded-xl border border-stone-200/90 dark:border-stone-600/50 bg-gradient-to-b from-white to-stone-50/85 dark:from-stone-900/92 dark:to-stone-950/82 shadow-[var(--aurora-shadow-control)] ring-1 ring-white/65 dark:ring-white/[0.08] transition-[box-shadow,border-color,ring-color] duration-200 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-300/45 dark:focus:border-primary-600/45 backdrop-blur-[2px]',
    textarea:
      'rounded-xl border border-stone-200/90 dark:border-stone-600/50 bg-gradient-to-b from-white to-stone-50/85 dark:from-stone-900/92 dark:to-stone-950/82 shadow-[var(--aurora-shadow-control)] ring-1 ring-white/65 dark:ring-white/[0.08] transition-shadow focus:ring-2 focus:ring-primary-500/50 backdrop-blur-[2px]',
    select:
      'rounded-xl border border-stone-200/90 dark:border-stone-600/50 bg-gradient-to-b from-white to-stone-50/85 dark:from-stone-900/92 dark:to-stone-950/82 shadow-[var(--aurora-shadow-control)] ring-1 ring-white/65 dark:ring-white/[0.08] transition-shadow focus:ring-2 focus:ring-primary-500/50 backdrop-blur-[2px]',
    card:
      'rounded-[1.35rem] border border-stone-200/65 dark:border-teal-900/38 bg-gradient-to-br from-white via-teal-50/[0.38] to-cyan-50/32 dark:from-[#0b1318] dark:via-stone-950 dark:to-teal-950/42 ring-1 ring-white/75 dark:ring-teal-500/12 shadow-[var(--aurora-shadow-card),0_0_0_1px_rgba(255,255,255,0.55)_inset] dark:shadow-[var(--aurora-shadow-card),inset_0_1px_0_rgba(255,255,255,0.07)]',
    cardHeader: 'px-5 py-4 border-b border-stone-200/55 dark:border-white/[0.07]',
    cardBody: 'p-5',
    modalPanel:
      'rounded-[1.35rem] border border-teal-200/45 dark:border-teal-800/28 bg-gradient-to-b from-white via-teal-50/35 to-emerald-50/28 dark:from-[#0e151c] dark:via-stone-950 dark:to-teal-950/52 ring-1 ring-white/85 dark:ring-teal-400/16 shadow-[var(--aurora-shadow-float)] backdrop-blur-xl [box-shadow:var(--aurora-shadow-float),0_0_90px_-24px_rgba(13,148,136,0.18)]',
    alert:
      'rounded-2xl border border-stone-200/55 dark:border-stone-700/48 bg-white/88 dark:bg-stone-900/72 shadow-[var(--aurora-shadow-control)] ring-1 ring-stone-900/[0.035] dark:ring-white/[0.07] backdrop-blur-md',
    iconButton:
      'shadow-[0_2px_10px_rgba(15,23,42,0.07)] ring-1 ring-stone-900/[0.07] dark:ring-white/[0.14] dark:shadow-[0_6px_16px_rgba(0,0,0,0.38)] hover:shadow-lg hover:ring-stone-900/11 dark:hover:ring-white/22 transition-all duration-200 ease-out',
    badge:
      'shadow-[0_1px_0_0_rgba(255,255,255,0.55)_inset,0_2px_8px_rgba(15,23,42,0.07)] ring-1 ring-white/35 dark:ring-stone-800/55',
    label:
      'text-[13px] font-semibold tracking-[0.02em] text-teal-950/88 dark:text-teal-100/94 antialiased',
    tableScrollWrap:
      'rounded-xl border border-stone-200/65 dark:border-stone-700/42 bg-white/96 dark:bg-stone-950/62 shadow-[var(--aurora-shadow-control)] ring-1 ring-white/55 dark:ring-white/[0.06] backdrop-blur-sm overflow-hidden',
    tableSurface:
      'rounded-[1.25rem] border border-teal-200/42 dark:border-teal-800/28 bg-gradient-to-br from-white via-teal-50/42 to-sky-50/28 dark:from-stone-950/92 dark:via-teal-950/32 dark:to-[#0a1014] p-4 md:p-6 shadow-[var(--aurora-shadow-card)] ring-1 ring-teal-900/[0.045] dark:ring-teal-500/[0.09] [box-shadow:var(--aurora-shadow-card),0_0_64px_-26px_rgba(13,148,136,0.14)]',
    tableHead:
      'bg-gradient-to-b from-stone-100/96 via-teal-50/52 to-emerald-50/42 dark:from-stone-900 dark:via-teal-950/62 dark:to-stone-900/96 border-b border-stone-200/75 dark:border-white/[0.07]',
    tableRow:
      'border-stone-200/65 dark:border-stone-800/78 transition-colors duration-150 hover:bg-gradient-to-r hover:from-teal-50/55 hover:to-transparent dark:hover:from-teal-950/45 dark:hover:to-transparent',
    tableHeaderCell:
      'text-[#061018] dark:text-teal-50/96 font-semibold tracking-[0.012em] text-[13px] uppercase',
    tableCell: 'text-slate-700 dark:text-teal-50/90 text-[15px]',
    playgroundPage:
      'bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(204,251,241,0.48),transparent)] bg-stone-50 dark:bg-[radial-gradient(ellipse_100%_60%_at_50%_0%,rgba(13,148,136,0.14),transparent)] dark:bg-slate-950',
    playgroundGenColumn:
      'border-r border-stone-200/78 dark:border-teal-900/32 bg-gradient-to-b from-white/92 via-teal-50/22 to-stone-100/42 dark:from-stone-950/98 dark:via-teal-950/28 dark:to-slate-950 backdrop-blur-md',
    playgroundGenPreview:
      'rounded-[1.25rem] border border-white/82 dark:border-teal-800/28 bg-white/96 dark:bg-[#0c1218]/96 shadow-[var(--aurora-shadow-float)] ring-1 ring-teal-900/[0.045] dark:ring-teal-400/11 backdrop-blur-[8px] [box-shadow:var(--aurora-shadow-float),0_0_110px_-32px_rgba(13,148,136,0.14)]',
    playgroundCanvasMain:
      'bg-gradient-to-b from-stone-100/32 via-transparent to-teal-50/22 dark:from-transparent dark:to-teal-950/18',
    playgroundCanvasDropzone:
      'rounded-[1.25rem] border-2 border-dashed border-stone-300/72 dark:border-teal-700/38 bg-gradient-to-b from-white/96 to-stone-50/82 dark:from-stone-900/62 dark:to-stone-950/82 shadow-[inset_0_2px_14px_rgba(15,23,42,0.045)] ring-1 ring-stone-900/[0.035]',
    tabsListLine: 'border-b border-stone-200/88 dark:border-stone-700/58',
    tabsListPills:
      'rounded-2xl bg-gradient-to-b from-stone-100/96 to-stone-200/42 dark:from-stone-900/92 dark:to-stone-950 p-1.5 shadow-[inset_0_2px_10px_rgba(15,23,42,0.065)] dark:shadow-[inset_0_2px_14px_rgba(0,0,0,0.42)] ring-1 ring-white/52 dark:ring-white/[0.07] gap-1',
    tabsListEnclosed:
      'rounded-t-2xl border border-b-0 border-stone-200/82 dark:border-stone-700/52 bg-stone-50/92 dark:bg-stone-900/52 backdrop-blur-sm',
    tabLine: 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors duration-200',
    tabPills: 'rounded-xl text-stone-600 dark:text-stone-400 transition-all duration-200 ease-out',
    tabPillsActive:
      'bg-white dark:bg-teal-900/72 text-primary-800 dark:text-teal-100 shadow-[0_2px_14px_-2px_rgba(13,148,136,0.28),0_1px_0_0_rgba(255,255,255,0.92)_inset] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.11),0_6px_20px_-6px_rgba(13,148,136,0.38)] ring-1 ring-teal-200/62 dark:ring-teal-600/32',
    tabPanel:
      'rounded-b-2xl border border-t-0 border-stone-200/82 dark:border-stone-700/52 bg-white/88 dark:bg-stone-950/52 p-5 md:p-6 shadow-[var(--aurora-shadow-control)] backdrop-blur-sm',
    genTextTitle:
      'text-2xl sm:text-[1.85rem] font-bold tracking-[-0.022em] text-[#050f18] dark:text-[#ecfdf8] antialiased [text-wrap:balance] [text-shadow:0_1px_0_rgba(255,255,255,0.45)] dark:[text-shadow:0_1px_28px_rgba(45,212,191,0.14)]',
    genTextBody:
      'text-[15px] leading-[1.68] text-slate-600 dark:text-teal-100/84 antialiased font-[450]',
    genTextMuted:
      'text-sm text-slate-500 dark:text-teal-200/68 leading-relaxed antialiased tracking-[0.012em]',
    checkbox:
      'rounded-[0.4rem] border-stone-300/88 dark:border-stone-600 shadow-[0_1px_0_rgba(255,255,255,0.92)_inset] dark:shadow-none ring-1 ring-stone-900/[0.045] focus:ring-2 focus:ring-primary-500/52',
    switchTrack:
      'shadow-[inset_0_2px_10px_rgba(15,23,42,0.13)] dark:shadow-[inset_0_2px_12px_rgba(0,0,0,0.52)] ring-1 ring-stone-900/[0.07] dark:ring-white/[0.09]',
    switchThumb:
      'shadow-[0_2px_10px_rgba(15,23,42,0.16),0_1px_0_rgba(255,255,255,0.96)_inset] ring-1 ring-white/92',
    spinner: 'ring-2 ring-primary-400/28 shadow-[0_0_16px_rgba(13,148,136,0.24)]',
    /* Floating surfaces */
    popover:
      'rounded-2xl border border-stone-200/70 dark:border-teal-800/35 bg-gradient-to-b from-white via-teal-50/25 to-white dark:from-[#0f161c] dark:via-teal-950/35 dark:to-stone-950 shadow-[var(--aurora-shadow-float)] ring-1 ring-white/70 dark:ring-teal-500/12 backdrop-blur-xl',
    dropdownMenu:
      'rounded-2xl border border-stone-200/72 dark:border-teal-800/32 py-1.5 bg-gradient-to-b from-white/98 to-stone-50/90 dark:from-stone-900/98 dark:to-stone-950/95 shadow-[var(--aurora-shadow-float)] ring-1 ring-white/60 dark:ring-teal-900/25 backdrop-blur-xl min-w-[9rem]',
    dropdownItem:
      'text-[13px] text-stone-800 dark:text-teal-50/92 hover:bg-gradient-to-r hover:from-teal-50/80 hover:to-emerald-50/40 dark:hover:from-teal-950/55 dark:hover:to-transparent transition-colors duration-150',
    dropdownItemDestructive:
      'text-red-600 dark:text-red-400 hover:bg-red-50/90 dark:hover:bg-red-950/35',
    drawerPanel:
      'bg-gradient-to-b from-white via-teal-50/20 to-emerald-50/15 dark:from-[#0c1218] dark:via-teal-950/25 dark:to-stone-950 shadow-[var(--aurora-shadow-float)] ring-1 ring-teal-200/35 dark:ring-teal-800/25 backdrop-blur-xl',
    tooltipBubble:
      'rounded-lg px-2.5 py-1.5 text-[13px] font-medium tracking-wide text-white bg-gradient-to-b from-stone-900 to-stone-950 dark:from-stone-800 dark:to-stone-900 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.35)] ring-1 ring-white/10 backdrop-blur-sm',
    accordionItemBordered:
      'border border-stone-200/75 dark:border-teal-900/35 rounded-2xl overflow-hidden bg-white/40 dark:bg-stone-950/35 ring-1 ring-white/50 dark:ring-white/[0.05] shadow-sm',
    accordionItemSeparated:
      'border border-stone-200/75 dark:border-teal-900/35 rounded-2xl bg-white/50 dark:bg-stone-950/40 ring-1 ring-white/45 dark:ring-white/[0.05] shadow-sm',
    accordionTrigger:
      'hover:bg-gradient-to-r hover:from-teal-50/60 hover:to-transparent dark:hover:from-teal-950/45 dark:hover:to-transparent text-[#0a1620] dark:text-teal-50/95 focus:ring-2 focus:ring-inset focus:ring-primary-500/45 transition-colors duration-200',
    accordionContent: 'text-slate-600 dark:text-teal-100/78 text-[15px] leading-relaxed',
    progressTrack:
      'rounded-full bg-gradient-to-b from-stone-200/95 to-stone-100/80 dark:from-stone-800 dark:to-stone-900 ring-1 ring-stone-900/[0.04] dark:ring-white/[0.06] shadow-[inset_0_1px_3px_rgba(15,23,42,0.08)]',
    skeleton:
      'bg-gradient-to-r from-stone-200/90 via-teal-100/40 to-stone-200/90 dark:from-stone-800 dark:via-teal-950/50 dark:to-stone-800 animate-pulse',
    slider:
      'rounded-full appearance-none bg-gradient-to-b from-stone-200/95 to-stone-100/85 dark:from-stone-800 dark:to-stone-900 accent-primary-500 cursor-pointer ring-1 ring-stone-900/[0.05] dark:ring-white/[0.08] shadow-[inset_0_1px_4px_rgba(15,23,42,0.06)] [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(13,148,136,0.35)] [&::-moz-range-thumb]:shadow-[0_2px_8px_rgba(13,148,136,0.35)]',
    radio:
      'border-stone-300/90 dark:border-stone-600 text-primary-600 shadow-[0_1px_0_rgba(255,255,255,0.85)_inset] dark:shadow-none focus:ring-primary-500/55 focus:ring-offset-0 ring-1 ring-stone-900/[0.04]',
    avatar:
      'ring-2 ring-white/90 dark:ring-teal-500/20 shadow-[0_4px_14px_-4px_rgba(13,148,136,0.25)] bg-gradient-to-br from-primary-100 to-cyan-50 dark:from-primary-900/55 dark:to-teal-950/60 text-primary-800 dark:text-teal-100',
    divider: 'border-stone-200/80 dark:border-teal-900/35',
    breadcrumbSeparator: 'text-teal-300/80 dark:text-teal-600/80',
    breadcrumbLink:
      'text-teal-800/85 dark:text-teal-200/85 hover:text-teal-950 dark:hover:text-teal-50 transition-colors',
    breadcrumbCurrent: 'font-semibold text-[#061018] dark:text-teal-50',
    linkDefault: 'text-primary-700 dark:text-teal-300 hover:text-primary-800 dark:hover:text-teal-200 underline-offset-4 decoration-primary-400/35 hover:decoration-primary-500/55',
    linkPrimary: 'text-primary-700 dark:text-teal-300 font-semibold hover:text-primary-900 dark:hover:text-teal-100',
    linkMuted: 'text-slate-500 dark:text-teal-200/65 hover:text-slate-800 dark:hover:text-teal-100/90',
    linkUnderline: 'text-[#0a1620] dark:text-teal-50 underline decoration-teal-300/45 hover:decoration-teal-400/70',
    segmented:
      'rounded-2xl bg-gradient-to-b from-stone-100/95 to-stone-200/45 dark:from-stone-900/95 dark:to-stone-950 p-1 shadow-[inset_0_2px_10px_rgba(15,23,42,0.06)] dark:shadow-[inset_0_2px_12px_rgba(0,0,0,0.45)] ring-1 ring-white/55 dark:ring-white/[0.08]',
    stepperCircle:
      'border-2 border-stone-300/90 dark:border-teal-800/60 bg-white dark:bg-stone-950 text-stone-500 dark:text-teal-300/80 shadow-[0_2px_8px_rgba(15,23,42,0.06)] ring-1 ring-white/60 dark:ring-teal-900/30',
    stepperCircleActive:
      'border-primary-500 bg-gradient-to-br from-primary-500 to-teal-600 text-white shadow-[0_4px_16px_-2px_rgba(13,148,136,0.45)] ring-2 ring-primary-400/35',
    stepperCircleDone:
      'border-primary-400 bg-primary-500/15 dark:bg-teal-900/40 text-primary-700 dark:text-teal-200',
    stepperConnector: 'bg-gradient-to-r from-stone-200/90 via-teal-200/40 to-stone-200/90 dark:from-teal-900/50 dark:via-teal-700/40 dark:to-teal-900/50',
    stepperLabel: 'text-sm font-semibold text-[#0a1620] dark:text-teal-50/95',
    stepperDescription: 'text-xs text-slate-500 dark:text-teal-200/65',
    fileUpload:
      'rounded-2xl border-2 border-dashed border-stone-300/75 dark:border-teal-700/40 bg-gradient-to-b from-white/95 to-teal-50/25 dark:from-stone-900/70 dark:to-teal-950/30 shadow-[inset_0_2px_16px_rgba(15,23,42,0.04)] ring-1 ring-stone-900/[0.04] dark:ring-teal-800/20 hover:border-primary-400/55 hover:bg-teal-50/40 dark:hover:bg-teal-950/35 transition-colors duration-200',
    copyButton:
      'rounded-lg border border-stone-200/80 dark:border-teal-800/35 bg-white/90 dark:bg-stone-900/80 shadow-[var(--aurora-shadow-control)] hover:shadow-md ring-1 ring-white/50 dark:ring-white/[0.06]',
  } as const;
}
