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
  statCard: '',
  emptyStateIcon: '',
  emptyStateTitle: '',
  emptyStateBody: '',
  chatShell: '',
  chatHeaderBar: '',
  chatTitle: '',
  chatSubtitle: '',
  chatBubbleUser: '',
  chatBubbleAssistant: '',
  chatBubbleSystem: '',
  chatAvatar: '',
  chatTypingBubble: '',
  paginationNav: '',
  chatOptionCard: '',
  chatSuggestionChip: '',
  chatWelcomePrompt: '',
  progressFillPrimary: '',
} as const;

/**
 * Aurora **surface** tokens — "atelier" grade: layered light, jewel teal accent,
 * glass-adjacent controls, museum-canvas backgrounds. Feels expensive without loud gradients.
 * Active when global `appearance` is `'aurora'` (default). Use `plain` on a component to opt out.
 * @see docs/AURORA_UI_BIBLE.md §4 (theme & appearance)
 */
export function useAuroraSurface(componentPlain?: boolean) {
  const { isAurora } = useAuroraAppearance();
  const off = Boolean(componentPlain) || !isAurora;

  if (off) {
    return OFF;
  }

  return {
    isAurora: true as const,

    /* ─── Buttons ─── */
    /* Secondary — porcelain lift: white inset highlight, layered contact shadows, fine ring */
    button:
      'shadow-[inset_0_1px_0_rgba(255,255,255,0.96),0_1px_2px_rgba(15,23,42,0.05),0_3px_8px_-1px_rgba(15,23,42,0.08),0_8px_24px_-6px_rgba(15,23,42,0.07)] ' +
      'hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.98),0_2px_4px_rgba(15,23,42,0.06),0_10px_28px_-4px_rgba(15,23,42,0.12)] ' +
      'dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_4px_12px_-2px_rgba(0,0,0,0.44),0_12px_32px_-8px_rgba(0,0,0,0.36)] ' +
      'dark:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.13),0_6px_18px_-3px_rgba(0,0,0,0.52),0_16px_44px_-8px_rgba(0,0,0,0.42)] ' +
      'active:translate-y-px active:shadow-sm transition-[box-shadow,transform,background] duration-200 ease-out ' +
      'ring-1 ring-black/[0.055] dark:ring-white/[0.14]',

    /* Primary — teal bloom: deep glow layers + subtle white inset, lifts on hover */
    buttonPrimary:
      'shadow-[inset_0_1px_0_rgba(255,255,255,0.26),0_1px_3px_rgba(13,148,136,0.22),0_4px_14px_-2px_rgba(13,148,136,0.38),0_12px_36px_-6px_rgba(45,212,191,0.28),0_0_0_1px_rgba(13,148,136,0.20)] ' +
      'hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.32),0_2px_8px_rgba(45,212,191,0.28),0_10px_28px_-2px_rgba(13,148,136,0.48),0_22px_56px_-8px_rgba(45,212,191,0.36)] ' +
      'dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_4px_18px_-3px_rgba(45,212,191,0.44),0_0_0_1px_rgba(45,212,191,0.20)] ' +
      'dark:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_6px_28px_-4px_rgba(45,212,191,0.52),0_16px_52px_-8px_rgba(45,212,191,0.30)] ' +
      'ring-1 ring-teal-300/[0.36] dark:ring-teal-400/[0.40]',

    /* ─── Form controls ─── */
    input:
      'rounded-xl border border-stone-200/85 dark:border-stone-700/55 ' +
      'bg-gradient-to-b from-white to-stone-50/75 dark:from-stone-900/95 dark:to-stone-950/88 ' +
      'shadow-[0_1px_2px_rgba(15,23,42,0.04),0_2px_6px_rgba(15,23,42,0.05),inset_0_1px_0_rgba(255,255,255,0.92)] ' +
      'dark:shadow-[0_1px_3px_rgba(0,0,0,0.22),0_3px_8px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.04)] ' +
      'ring-1 ring-stone-900/[0.06] dark:ring-stone-600/30 ' +
      'transition-[box-shadow,border-color,outline-color] duration-150 ' +
      'focus:ring-2 focus:ring-primary-500/45 focus:border-primary-400/65 ' +
      'dark:focus:border-primary-500/55 dark:focus:ring-primary-400/32 ' +
      'placeholder:text-stone-400/80 dark:placeholder:text-stone-500/70',

    textarea:
      'rounded-xl border border-stone-200/85 dark:border-stone-700/55 ' +
      'bg-gradient-to-b from-white to-stone-50/75 dark:from-stone-900/95 dark:to-stone-950/88 ' +
      'shadow-[0_1px_2px_rgba(15,23,42,0.04),0_2px_6px_rgba(15,23,42,0.05),inset_0_1px_0_rgba(255,255,255,0.92)] ' +
      'dark:shadow-[0_1px_3px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.04)] ' +
      'ring-1 ring-stone-900/[0.06] dark:ring-stone-600/30 ' +
      'transition-[box-shadow,border-color] duration-150 ' +
      'focus:ring-2 focus:ring-primary-500/45 focus:border-primary-400/65 ' +
      'dark:focus:border-primary-500/55 dark:focus:ring-primary-400/32 ' +
      'placeholder:text-stone-400/80 dark:placeholder:text-stone-500/70',

    select:
      'rounded-xl border border-stone-200/85 dark:border-stone-700/55 ' +
      'bg-gradient-to-b from-white to-stone-50/75 dark:from-stone-900/95 dark:to-stone-950/88 ' +
      'shadow-[0_1px_2px_rgba(15,23,42,0.04),0_2px_6px_rgba(15,23,42,0.05),inset_0_1px_0_rgba(255,255,255,0.92)] ' +
      'dark:shadow-[0_1px_3px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.04)] ' +
      'ring-1 ring-stone-900/[0.06] dark:ring-stone-600/30 ' +
      'transition-[box-shadow,border-color] duration-150 ' +
      'focus:ring-2 focus:ring-primary-500/45 focus:border-primary-400/65 ' +
      'dark:focus:border-primary-500/55 dark:focus:ring-primary-400/32',

    /* ─── Card ─── */
    /* Multi-layer: inset top highlight + dimensional ambient + teal-tinted gradient bg */
    card:
      'rounded-[1.5rem] border border-stone-200/55 dark:border-teal-900/28 ' +
      'bg-gradient-to-br from-white via-teal-50/[0.28] to-cyan-50/[0.18] ' +
      'dark:from-[#090f16] dark:via-stone-950/98 dark:to-teal-950/35 ' +
      'ring-1 ring-white/88 dark:ring-teal-500/[0.08] ' +
      'shadow-[inset_0_1px_0_rgba(255,255,255,0.98),0_1px_2px_rgba(15,23,42,0.04),0_4px_12px_rgba(15,23,42,0.055),0_16px_40px_rgba(15,23,42,0.05),0_0_0_1px_rgba(15,23,42,0.03)] ' +
      'dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_4px_16px_rgba(0,0,0,0.26),0_16px_48px_rgba(0,0,0,0.22),0_0_0_1px_rgba(45,212,191,0.04)]',

    cardHeader:
      'px-5 py-4 border-b border-stone-200/50 dark:border-white/[0.065]',

    cardBody: 'p-5',

    /* ─── Modal ─── */
    /* True floating glass: deep multi-layer shadow + ambient teal bloom + strong backdrop blur */
    modalPanel:
      'rounded-[1.5rem] border border-teal-200/38 dark:border-teal-800/22 ' +
      'bg-gradient-to-b from-white/99 via-teal-50/28 to-emerald-50/18 ' +
      'dark:from-[#0c141c]/99 dark:via-teal-950/32 dark:to-stone-950/98 ' +
      'ring-1 ring-white/92 dark:ring-teal-400/12 backdrop-blur-2xl ' +
      'shadow-[0_2px_4px_rgba(15,23,42,0.04),0_8px_20px_rgba(15,23,42,0.08),0_24px_60px_rgba(15,23,42,0.10),0_60px_110px_rgba(15,23,42,0.07),0_0_0_1px_rgba(13,148,136,0.06),0_0_100px_-24px_rgba(13,148,136,0.22)]',

    /* ─── Alert ─── */
    alert:
      'rounded-2xl border border-stone-200/52 dark:border-stone-700/45 ' +
      'bg-white/90 dark:bg-stone-900/75 ' +
      'shadow-[0_1px_2px_rgba(15,23,42,0.04),0_4px_12px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85)] ' +
      'dark:shadow-[0_4px_14px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.04)] ' +
      'ring-1 ring-stone-900/[0.03] dark:ring-white/[0.06] backdrop-blur-md',

    /* ─── Icon button ─── */
    iconButton:
      'shadow-[0_1px_2px_rgba(15,23,42,0.05),0_3px_8px_rgba(15,23,42,0.07)] ' +
      'ring-1 ring-stone-900/[0.07] dark:ring-white/[0.13] ' +
      'dark:shadow-[0_2px_6px_rgba(0,0,0,0.32),0_8px_20px_rgba(0,0,0,0.26)] ' +
      'hover:shadow-[0_2px_4px_rgba(15,23,42,0.06),0_8px_20px_rgba(15,23,42,0.10)] ' +
      'hover:ring-stone-900/10 dark:hover:ring-white/20 ' +
      'transition-[box-shadow,ring-color] duration-200 ease-out',

    /* ─── Badge ─── */
    badge:
      'shadow-[inset_0_1px_0_rgba(255,255,255,0.62),0_1px_3px_rgba(15,23,42,0.07),0_2px_8px_rgba(15,23,42,0.04)] ' +
      'ring-1 ring-white/38 dark:ring-stone-700/52',

    /* ─── Label ─── */
    label:
      'text-[13px] font-semibold tracking-[0.025em] text-teal-950/88 dark:text-teal-100/92 antialiased',

    /* ─── Table ─── */
    tableScrollWrap:
      'rounded-2xl border border-stone-200/58 dark:border-stone-700/38 ' +
      'bg-white dark:bg-stone-950/68 ' +
      'shadow-[0_1px_2px_rgba(15,23,42,0.04),0_4px_12px_rgba(15,23,42,0.055),0_0_0_1px_rgba(15,23,42,0.032)] ' +
      'ring-1 ring-white/55 dark:ring-white/[0.04] overflow-hidden',

    tableSurface:
      'rounded-[1.375rem] border border-teal-200/36 dark:border-teal-800/22 ' +
      'bg-gradient-to-br from-white/99 via-teal-50/32 to-sky-50/18 ' +
      'dark:from-stone-950/96 dark:via-teal-950/26 dark:to-[#080d12] ' +
      'p-4 md:p-6 ' +
      'shadow-[inset_0_1px_0_rgba(255,255,255,0.98),0_4px_12px_rgba(15,23,42,0.055),0_16px_48px_rgba(15,23,42,0.055),0_0_60px_-24px_rgba(13,148,136,0.12)] ' +
      'ring-1 ring-teal-900/[0.038] dark:ring-teal-500/[0.07]',

    tableHead:
      'bg-gradient-to-b from-stone-50/99 via-teal-50/42 to-emerald-50/30 ' +
      'dark:from-stone-900/99 dark:via-teal-950/52 dark:to-stone-900/98 ' +
      'border-b border-stone-200/68 dark:border-white/[0.06]',

    tableRow:
      'border-stone-200/58 dark:border-stone-800/65 ' +
      'transition-colors duration-100 ' +
      'hover:bg-gradient-to-r hover:from-teal-50/65 hover:via-teal-50/28 hover:to-transparent ' +
      'dark:hover:from-teal-950/42 dark:hover:via-teal-950/18 dark:hover:to-transparent',

    tableHeaderCell:
      'text-[#050e16] dark:text-teal-50/96 font-semibold tracking-[0.018em] text-[12.5px] uppercase',

    tableCell: 'text-slate-700 dark:text-teal-50/88 text-[14.5px]',

    /* ─── Playground ─── */
    playgroundPage:
      'bg-[radial-gradient(ellipse_130%_80%_at_50%_-10%,rgba(204,251,241,0.52),transparent)] bg-stone-50 ' +
      'dark:bg-[radial-gradient(ellipse_100%_60%_at_50%_0%,rgba(13,148,136,0.15),transparent)] dark:bg-slate-950',

    playgroundGenColumn:
      'border-r border-stone-200/72 dark:border-teal-900/28 ' +
      'bg-gradient-to-b from-white/94 via-teal-50/18 to-stone-100/38 ' +
      'dark:from-stone-950/99 dark:via-teal-950/24 dark:to-slate-950 backdrop-blur-md',

    playgroundGenPreview:
      'rounded-[1.375rem] border border-white/80 dark:border-teal-800/24 ' +
      'bg-white/97 dark:bg-[#0b1118]/97 ' +
      'shadow-[var(--aurora-shadow-float)] ring-1 ring-teal-900/[0.04] dark:ring-teal-400/10 ' +
      'backdrop-blur-[10px] [box-shadow:var(--aurora-shadow-float),0_0_120px_-32px_rgba(13,148,136,0.16)]',

    playgroundCanvasMain:
      'bg-gradient-to-b from-stone-100/28 via-transparent to-teal-50/18 dark:from-transparent dark:to-teal-950/15',

    playgroundCanvasDropzone:
      'rounded-[1.25rem] border-2 border-dashed border-stone-300/68 dark:border-teal-700/35 ' +
      'bg-gradient-to-b from-white/97 to-stone-50/78 dark:from-stone-900/60 dark:to-stone-950/82 ' +
      'shadow-[inset_0_2px_14px_rgba(15,23,42,0.04)] ring-1 ring-stone-900/[0.032]',

    /* ─── Tabs ─── */
    tabsListLine:
      'border-b border-stone-200/85 dark:border-stone-700/55',

    tabsListPills:
      'rounded-2xl bg-gradient-to-b from-stone-100/98 to-stone-200/38 ' +
      'dark:from-stone-900/95 dark:to-stone-950/98 ' +
      'p-1.5 ' +
      'shadow-[inset_0_1px_4px_rgba(15,23,42,0.07),inset_0_2px_12px_rgba(15,23,42,0.055)] ' +
      'dark:shadow-[inset_0_2px_14px_rgba(0,0,0,0.44)] ' +
      'ring-1 ring-white/50 dark:ring-white/[0.06] gap-1',

    tabsListEnclosed:
      'rounded-t-2xl border border-b-0 border-stone-200/80 dark:border-stone-700/48 ' +
      'bg-stone-50/94 dark:bg-stone-900/55 backdrop-blur-sm',

    tabLine:
      'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 ' +
      'transition-colors duration-150',

    tabPills:
      'rounded-xl text-stone-600 dark:text-stone-400 transition-all duration-200 ease-out ' +
      'hover:text-stone-900 dark:hover:text-stone-100',

    tabPillsActive:
      'bg-white dark:bg-teal-900/65 text-primary-800 dark:text-teal-100 ' +
      'shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_2px_10px_-2px_rgba(13,148,136,0.24),0_6px_20px_-4px_rgba(13,148,136,0.18)] ' +
      'dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_4px_16px_-4px_rgba(13,148,136,0.42)] ' +
      'ring-1 ring-teal-200/65 dark:ring-teal-600/28',

    tabPanel:
      'rounded-b-2xl border border-t-0 border-stone-200/78 dark:border-stone-700/48 ' +
      'bg-white/90 dark:bg-stone-950/55 p-5 md:p-6 ' +
      'shadow-[0_2px_8px_rgba(15,23,42,0.04),0_6px_20px_rgba(15,23,42,0.04)] ' +
      'backdrop-blur-sm',

    /* ─── Gen text ─── */
    genTextTitle:
      'text-2xl sm:text-[1.875rem] font-bold tracking-[-0.032em] antialiased [text-wrap:balance] ' +
      'bg-gradient-to-br from-teal-900 via-primary-700 to-teal-800 ' +
      'dark:from-teal-100 dark:via-teal-200 dark:to-emerald-200 ' +
      'bg-clip-text text-transparent ' +
      'dark:[filter:drop-shadow(0_0_28px_rgba(45,212,191,0.20))]',

    genTextBody:
      'text-[15px] leading-[1.72] text-slate-700 dark:text-teal-50/88 antialiased font-[440] tracking-[0.006em]',

    genTextMuted:
      'text-[13.5px] text-slate-500/90 dark:text-teal-200/60 leading-relaxed antialiased tracking-[0.016em]',

    /* ─── Checkbox / Switch / Radio ─── */
    checkbox:
      'rounded-[0.4rem] border-stone-300/85 dark:border-stone-600 ' +
      'shadow-[inset_0_1px_0_rgba(255,255,255,0.90)] dark:shadow-none ' +
      'ring-1 ring-stone-900/[0.042] focus:ring-2 focus:ring-primary-500/50',

    switchTrack:
      'shadow-[inset_0_2px_8px_rgba(15,23,42,0.14),inset_0_1px_3px_rgba(15,23,42,0.08)] ' +
      'dark:shadow-[inset_0_2px_12px_rgba(0,0,0,0.55)] ' +
      'ring-1 ring-stone-900/[0.07] dark:ring-white/[0.08]',

    switchThumb:
      'shadow-[0_1px_3px_rgba(15,23,42,0.18),0_3px_10px_rgba(15,23,42,0.14),inset_0_1px_0_rgba(255,255,255,0.98)] ' +
      'ring-1 ring-white/90',

    /* ─── Spinner ─── */
    spinner:
      'ring-2 ring-primary-400/24 shadow-[0_0_20px_rgba(13,148,136,0.28),0_0_8px_rgba(13,148,136,0.16)]',

    /* ─── Floating surfaces ─── */
    popover:
      'rounded-2xl border border-stone-200/65 dark:border-teal-800/28 ' +
      'bg-gradient-to-b from-white/99 via-teal-50/20 to-white/96 ' +
      'dark:from-[#0e161e]/99 dark:via-teal-950/30 dark:to-stone-950/99 ' +
      'shadow-[0_2px_4px_rgba(15,23,42,0.04),0_8px_20px_rgba(15,23,42,0.08),0_24px_60px_rgba(15,23,42,0.09),0_0_0_1px_rgba(13,148,136,0.05)] ' +
      'ring-1 ring-white/72 dark:ring-teal-500/10 backdrop-blur-2xl',

    dropdownMenu:
      'rounded-2xl border border-stone-200/65 dark:border-teal-800/26 py-1.5 ' +
      'bg-gradient-to-b from-white/99 to-stone-50/96 dark:from-stone-900/99 dark:to-stone-950/98 ' +
      'shadow-[0_2px_4px_rgba(15,23,42,0.04),0_8px_20px_rgba(15,23,42,0.08),0_24px_60px_rgba(15,23,42,0.08)] ' +
      'ring-1 ring-white/62 dark:ring-teal-900/22 backdrop-blur-2xl min-w-[10rem]',

    dropdownItem:
      'text-[13px] text-stone-800 dark:text-teal-50/90 ' +
      'hover:bg-gradient-to-r hover:from-teal-50/85 hover:to-emerald-50/38 ' +
      'dark:hover:from-teal-950/52 dark:hover:to-transparent transition-colors duration-100',

    dropdownItemDestructive:
      'text-rose-600 dark:text-rose-400 hover:bg-rose-50/88 dark:hover:bg-rose-950/32',

    drawerPanel:
      'bg-gradient-to-b from-white/99 via-teal-50/16 to-white/98 ' +
      'dark:from-[#0b1218]/99 dark:via-teal-950/20 dark:to-stone-950/99 ' +
      'shadow-[0_4px_8px_rgba(15,23,42,0.06),0_20px_60px_rgba(15,23,42,0.14),0_60px_110px_rgba(15,23,42,0.10)] ' +
      'ring-1 ring-teal-200/28 dark:ring-teal-800/20 backdrop-blur-2xl',

    /* ─── Tooltip ─── */
    tooltipBubble:
      'rounded-lg px-2.5 py-1.5 text-[12.5px] font-medium tracking-[0.012em] text-white/96 ' +
      'bg-gradient-to-b from-[#0e1a26] to-[#09111c] dark:from-stone-800 dark:to-stone-900 ' +
      'shadow-[0_4px_10px_rgba(0,0,0,0.32),0_12px_28px_rgba(0,0,0,0.22),0_0_0_1px_rgba(255,255,255,0.06)] ' +
      'ring-1 ring-white/[0.08] backdrop-blur-sm',

    /* ─── Accordion ─── */
    accordionItemBordered:
      'border border-stone-200/72 dark:border-teal-900/30 rounded-2xl overflow-hidden ' +
      'bg-white/45 dark:bg-stone-950/32 ' +
      'ring-1 ring-white/52 dark:ring-white/[0.04] ' +
      'shadow-[0_1px_3px_rgba(15,23,42,0.04),0_2px_8px_rgba(15,23,42,0.03)]',

    accordionItemSeparated:
      'border border-stone-200/72 dark:border-teal-900/30 rounded-2xl ' +
      'bg-white/50 dark:bg-stone-950/38 ' +
      'ring-1 ring-white/48 dark:ring-white/[0.04] ' +
      'shadow-[0_1px_3px_rgba(15,23,42,0.04),0_2px_8px_rgba(15,23,42,0.03)]',

    accordionTrigger:
      'hover:bg-gradient-to-r hover:from-teal-50/65 hover:to-transparent ' +
      'dark:hover:from-teal-950/42 dark:hover:to-transparent ' +
      'text-[#08141e] dark:text-teal-50/95 ' +
      'focus:ring-2 focus:ring-inset focus:ring-primary-500/42 transition-colors duration-150',

    accordionContent:
      'text-slate-600 dark:text-teal-100/76 text-[14.5px] leading-relaxed',

    /* ─── Progress ─── */
    progressTrack:
      'rounded-full bg-gradient-to-b from-stone-200/92 to-stone-100/78 ' +
      'dark:from-stone-800 dark:to-stone-900/95 ' +
      'ring-1 ring-stone-900/[0.04] dark:ring-white/[0.055] ' +
      'shadow-[inset_0_1px_4px_rgba(15,23,42,0.08)]',

    progressFillPrimary:
      'bg-gradient-to-r from-primary-600 via-teal-500 to-primary-400 ' +
      'shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_0_18px_-2px_rgba(13,148,136,0.50),0_2px_8px_rgba(13,148,136,0.28)]',

    /* ─── Skeleton ─── */
    skeleton:
      'bg-[length:300%_100%] ' +
      'bg-gradient-to-r from-stone-200/92 via-teal-100/38 to-stone-200/92 ' +
      'dark:from-stone-800 dark:via-teal-950/48 dark:to-stone-800 ' +
      'animate-pulse',

    /* ─── Slider ─── */
    slider:
      'rounded-full appearance-none ' +
      'bg-gradient-to-b from-stone-200/92 to-stone-100/82 ' +
      'dark:from-stone-800 dark:to-stone-900 ' +
      'accent-primary-500 cursor-pointer ' +
      'ring-1 ring-stone-900/[0.05] dark:ring-white/[0.07] ' +
      'shadow-[inset_0_1px_4px_rgba(15,23,42,0.07)] ' +
      '[&::-webkit-slider-thumb]:shadow-[0_2px_10px_rgba(13,148,136,0.42),0_0_0_2px_rgba(13,148,136,0.18)] ' +
      '[&::-moz-range-thumb]:shadow-[0_2px_10px_rgba(13,148,136,0.42)]',

    /* ─── Radio ─── */
    radio:
      'border-stone-300/88 dark:border-stone-600 text-primary-600 ' +
      'shadow-[inset_0_1px_0_rgba(255,255,255,0.88)] dark:shadow-none ' +
      'focus:ring-primary-500/52 focus:ring-offset-0 ring-1 ring-stone-900/[0.04]',

    /* ─── Avatar ─── */
    avatar:
      'ring-2 ring-white/92 dark:ring-teal-500/22 ' +
      'shadow-[0_2px_6px_-1px_rgba(13,148,136,0.22),0_6px_18px_-4px_rgba(13,148,136,0.18)] ' +
      'bg-gradient-to-br from-primary-100 via-teal-50 to-cyan-50 ' +
      'dark:from-primary-900/55 dark:via-teal-950/60 dark:to-teal-900/40 ' +
      'text-primary-800 dark:text-teal-100',

    /* ─── Divider ─── */
    divider: 'border-stone-200/78 dark:border-teal-900/32',

    /* ─── Breadcrumb ─── */
    breadcrumbSeparator: 'text-teal-300/75 dark:text-teal-600/75',
    breadcrumbLink:
      'text-teal-800/82 dark:text-teal-200/82 hover:text-teal-950 dark:hover:text-teal-50 transition-colors duration-150',
    breadcrumbCurrent: 'font-semibold text-[#050e16] dark:text-teal-50',

    /* ─── Links ─── */
    linkDefault:
      'text-primary-700 dark:text-teal-300 hover:text-primary-800 dark:hover:text-teal-200 ' +
      'underline-offset-4 decoration-primary-400/32 hover:decoration-primary-500/55 transition-colors duration-150',

    linkPrimary:
      'text-primary-700 dark:text-teal-300 font-semibold hover:text-primary-900 dark:hover:text-teal-100 transition-colors duration-150',

    linkMuted:
      'text-slate-500 dark:text-teal-200/62 hover:text-slate-800 dark:hover:text-teal-100/90 transition-colors duration-150',

    linkUnderline:
      'text-[#08141e] dark:text-teal-50 underline decoration-teal-300/42 hover:decoration-teal-400/68 transition-colors duration-150',

    /* ─── Segmented control ─── */
    segmented:
      'rounded-2xl bg-gradient-to-b from-stone-100/96 to-stone-200/42 ' +
      'dark:from-stone-900/96 dark:to-stone-950/99 p-1 ' +
      'shadow-[inset_0_1px_4px_rgba(15,23,42,0.07),inset_0_2px_12px_rgba(15,23,42,0.05)] ' +
      'dark:shadow-[inset_0_2px_14px_rgba(0,0,0,0.48)] ' +
      'ring-1 ring-white/52 dark:ring-white/[0.07]',

    /* ─── Stepper ─── */
    stepperCircle:
      'border-2 border-stone-300/88 dark:border-teal-800/55 bg-white dark:bg-stone-950 ' +
      'text-stone-500 dark:text-teal-300/78 ' +
      'shadow-[0_1px_3px_rgba(15,23,42,0.06),0_3px_8px_rgba(15,23,42,0.04)] ' +
      'ring-1 ring-white/62 dark:ring-teal-900/28',

    stepperCircleActive:
      'border-primary-500 bg-gradient-to-br from-primary-400 to-teal-600 text-white ' +
      'shadow-[0_2px_6px_-1px_rgba(13,148,136,0.40),0_6px_22px_-4px_rgba(13,148,136,0.44),0_0_0_1px_rgba(13,148,136,0.22)] ' +
      'ring-2 ring-primary-400/32',

    stepperCircleDone:
      'border-primary-400/80 bg-primary-500/12 dark:bg-teal-900/38 text-primary-700 dark:text-teal-200',

    stepperConnector:
      'bg-gradient-to-r from-stone-200/88 via-teal-200/38 to-stone-200/88 ' +
      'dark:from-teal-900/48 dark:via-teal-700/38 dark:to-teal-900/48',

    stepperLabel: 'text-sm font-semibold text-[#08141e] dark:text-teal-50/95',
    stepperDescription: 'text-xs text-slate-500 dark:text-teal-200/62',

    /* ─── File upload ─── */
    fileUpload:
      'rounded-2xl border-2 border-dashed border-stone-300/72 dark:border-teal-700/38 ' +
      'bg-gradient-to-b from-white/96 to-teal-50/22 dark:from-stone-900/72 dark:to-teal-950/28 ' +
      'shadow-[inset_0_2px_16px_rgba(15,23,42,0.035)] ring-1 ring-stone-900/[0.035] dark:ring-teal-800/18 ' +
      'hover:border-primary-400/52 hover:bg-teal-50/42 dark:hover:bg-teal-950/32 transition-colors duration-200',

    /* ─── Copy button ─── */
    copyButton:
      'rounded-lg border border-stone-200/78 dark:border-teal-800/32 ' +
      'bg-white/92 dark:bg-stone-900/82 ' +
      'shadow-[0_1px_2px_rgba(15,23,42,0.05),0_3px_8px_rgba(15,23,42,0.05),inset_0_1px_0_rgba(255,255,255,0.88)] ' +
      'hover:shadow-[0_2px_6px_rgba(15,23,42,0.07),0_8px_20px_rgba(15,23,42,0.07)] ' +
      'ring-1 ring-white/48 dark:ring-white/[0.06] transition-shadow duration-200',

    /* ─── Stat card ─── */
    statCard:
      'rounded-2xl border border-stone-200/68 dark:border-teal-900/26 ' +
      'bg-gradient-to-br from-white via-white/98 to-teal-50/28 ' +
      'dark:from-stone-950 dark:via-stone-950/99 dark:to-teal-950/24 p-5 md:p-6 ' +
      'shadow-[inset_0_1px_0_rgba(255,255,255,0.98),0_2px_6px_rgba(15,23,42,0.05),0_8px_24px_rgba(15,23,42,0.055),0_0_52px_-20px_rgba(13,148,136,0.10)] ' +
      'ring-1 ring-white/80 dark:ring-teal-500/[0.07]',

    /* ─── Empty state ─── */
    emptyStateIcon:
      'rounded-2xl p-4 bg-gradient-to-br from-stone-100/96 to-teal-50/42 ' +
      'dark:from-stone-900/98 dark:to-teal-950/35 ' +
      'ring-1 ring-stone-200/52 dark:ring-teal-800/24 ' +
      'shadow-[0_1px_3px_rgba(15,23,42,0.05),0_4px_12px_rgba(15,23,42,0.04)]',

    emptyStateTitle:
      'text-lg font-semibold tracking-tight text-[#08141e] dark:text-teal-50 ' +
      '[text-shadow:0_1px_0_rgba(255,255,255,0.42)] dark:[text-shadow:none]',

    emptyStateBody: 'text-[13.5px] text-slate-600 dark:text-teal-200/76 max-w-sm leading-relaxed',

    /* ─── Chat ─── */
    chatShell:
      'flex flex-col rounded-2xl border border-stone-200/75 dark:border-teal-900/32 ' +
      'bg-gradient-to-b from-white via-teal-50/16 to-white/98 ' +
      'dark:from-[#0b1118] dark:via-stone-950 dark:to-teal-950/20 overflow-hidden ' +
      'shadow-[inset_0_1px_0_rgba(255,255,255,0.98),0_2px_8px_rgba(15,23,42,0.06),0_12px_32px_rgba(15,23,42,0.06)] ' +
      'ring-1 ring-white/68 dark:ring-teal-500/[0.08]',

    chatHeaderBar:
      'flex items-center gap-3 px-4 py-3.5 border-b border-stone-200/55 dark:border-white/[0.07] shrink-0 ' +
      'bg-gradient-to-r from-stone-50/99 via-teal-50/24 to-transparent ' +
      'dark:from-stone-900/99 dark:via-teal-950/28 dark:to-transparent backdrop-blur-sm',

    chatTitle: 'text-[15px] font-semibold text-[#08141e] dark:text-teal-50 truncate tracking-[-0.01em]',
    chatSubtitle: 'text-xs text-slate-500 dark:text-teal-200/62 truncate',

    chatBubbleUser:
      'max-w-[85%] rounded-2xl rounded-br-sm px-3.5 py-2.5 text-[13.5px] leading-relaxed ' +
      'bg-gradient-to-br from-primary-500 via-primary-600 to-teal-700 text-white ' +
      'shadow-[inset_0_1px_0_rgba(255,255,255,0.20),0_2px_8px_-2px_rgba(13,148,136,0.40),0_8px_24px_-6px_rgba(13,148,136,0.32)] ' +
      'ring-1 ring-white/14',

    chatBubbleAssistant:
      'max-w-[85%] rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-[13.5px] leading-relaxed ' +
      'bg-white/98 dark:bg-stone-900/92 text-slate-800 dark:text-teal-50/96 ' +
      'border border-stone-200/68 dark:border-teal-800/24 ' +
      'shadow-[0_1px_3px_rgba(15,23,42,0.05),0_4px_12px_rgba(15,23,42,0.04)] ' +
      'ring-1 ring-white/58 dark:ring-white/[0.04]',

    chatBubbleSystem:
      'rounded-xl px-3 py-2 text-[12px] text-slate-600 dark:text-teal-200/65 ' +
      'bg-stone-100/94 dark:bg-stone-900/65 border border-stone-200/62 dark:border-teal-900/26',

    chatAvatar:
      'shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ' +
      'ring-2 ring-white dark:ring-teal-500/20 ' +
      'shadow-[0_2px_6px_rgba(15,23,42,0.10)] ' +
      'bg-gradient-to-br from-stone-100 to-teal-50 dark:from-stone-800 dark:to-teal-950 ' +
      'text-slate-700 dark:text-teal-100',

    chatTypingBubble:
      'flex gap-1 items-end px-3.5 py-2.5 rounded-2xl rounded-bl-sm ' +
      'bg-white/97 dark:bg-stone-900/90 ' +
      'border border-stone-200/68 dark:border-teal-800/22 ' +
      'shadow-[0_1px_3px_rgba(15,23,42,0.05),0_4px_12px_rgba(15,23,42,0.04)] ' +
      'ring-1 ring-white/45 dark:ring-white/[0.04]',

    paginationNav:
      'flex items-center gap-1 p-1 rounded-2xl ' +
      'bg-stone-100/88 dark:bg-stone-900/58 ' +
      'ring-1 ring-stone-200/68 dark:ring-white/[0.065] ' +
      'shadow-[inset_0_1px_3px_rgba(15,23,42,0.05),0_1px_2px_rgba(15,23,42,0.04)]',

    chatOptionCard:
      'block w-full text-left rounded-2xl border border-stone-200/72 dark:border-teal-800/24 p-4 ' +
      'transition-all duration-200 ' +
      'bg-white/72 dark:bg-stone-950/45 ' +
      'hover:border-primary-400/48 hover:bg-gradient-to-br hover:from-teal-50/88 hover:to-white/96 ' +
      'dark:hover:from-teal-950/50 dark:hover:to-stone-950 ' +
      'shadow-[0_1px_3px_rgba(15,23,42,0.04),0_3px_10px_rgba(15,23,42,0.03)] ' +
      'hover:shadow-[0_3px_10px_rgba(15,23,42,0.07),0_10px_28px_rgba(15,23,42,0.05)] ' +
      'ring-1 ring-white/48 dark:ring-white/[0.04] hover:ring-teal-200/55',

    chatSuggestionChip:
      'px-3.5 py-2 text-[13px] rounded-full ' +
      'border border-stone-200/80 dark:border-teal-800/28 ' +
      'bg-white/94 dark:bg-stone-900/84 text-slate-700 dark:text-teal-100/88 ' +
      'hover:border-primary-400/52 hover:bg-teal-50/95 dark:hover:bg-teal-950/40 ' +
      'transition-all duration-150 ' +
      'shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:shadow-[0_2px_8px_rgba(15,23,42,0.06)]',

    chatWelcomePrompt: 'text-[13.5px] text-slate-600 dark:text-teal-200/72 leading-relaxed',
  } as const;
}
