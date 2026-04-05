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
 * Aurora surface tokens — enterprise grade. Clean zinc-based surfaces, precise 1px borders,
 * architectural shadows, teal accent used only on interactive elements. Inspired by Linear,
 * Vercel, Stripe: 95% neutral, 5% color.
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
    /* Secondary / ghost / outline chrome — clean porcelain lift with inset highlight */
    button:
      'shadow-[0_1px_2px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.88)] ' +
      'dark:shadow-[0_1px_3px_rgba(0,0,0,0.40),0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.04)] ' +
      'hover:shadow-[0_2px_4px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.06)] ' +
      'dark:hover:shadow-[0_2px_6px_rgba(0,0,0,0.50),0_0_0_1px_rgba(255,255,255,0.09)] ' +
      'active:translate-y-px active:shadow-[0_0_0_1px_rgba(0,0,0,0.05),inset_0_1px_2px_rgba(0,0,0,0.05)] ' +
      'transition-all duration-150 ease-out',

    /* Primary — teal glow: focused bloom, not scattered */
    buttonPrimary:
      'shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_1px_2px_rgba(13,148,136,0.20),0_4px_12px_-2px_rgba(13,148,136,0.30),0_0_0_1px_rgba(13,148,136,0.16)] ' +
      'hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.20),0_2px_6px_rgba(13,148,136,0.24),0_8px_22px_-3px_rgba(13,148,136,0.36)] ' +
      'dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_2px_8px_rgba(20,184,166,0.30),0_0_0_1px_rgba(20,184,166,0.20)] ' +
      'dark:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_4px_16px_rgba(20,184,166,0.40)] ' +
      'active:translate-y-px ' +
      'ring-1 ring-teal-500/[0.18] dark:ring-teal-400/[0.22] ' +
      'transition-all duration-150 ease-out',

    /* ─── Form controls ─── */
    input:
      'rounded-lg border border-zinc-200 dark:border-zinc-700/70 ' +
      'bg-white dark:bg-zinc-900/80 ' +
      'shadow-[0_1px_2px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.90)] ' +
      'dark:shadow-[0_1px_3px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.03)] ' +
      'ring-1 ring-black/[0.04] dark:ring-white/[0.05] ' +
      'transition-[box-shadow,border-color] duration-150 ' +
      'focus:ring-2 focus:ring-teal-500/35 focus:border-teal-500/60 ' +
      'dark:focus:border-teal-400/50 dark:focus:ring-teal-400/25 ' +
      'placeholder:text-zinc-400 dark:placeholder:text-zinc-600',

    textarea:
      'rounded-lg border border-zinc-200 dark:border-zinc-700/70 ' +
      'bg-white dark:bg-zinc-900/80 ' +
      'shadow-[0_1px_2px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.90)] ' +
      'dark:shadow-[0_1px_3px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.03)] ' +
      'ring-1 ring-black/[0.04] dark:ring-white/[0.05] ' +
      'transition-[box-shadow,border-color] duration-150 ' +
      'focus:ring-2 focus:ring-teal-500/35 focus:border-teal-500/60 ' +
      'dark:focus:border-teal-400/50 dark:focus:ring-teal-400/25 ' +
      'placeholder:text-zinc-400 dark:placeholder:text-zinc-600',

    select:
      'rounded-lg border border-zinc-200 dark:border-zinc-700/70 ' +
      'bg-white dark:bg-zinc-900/80 ' +
      'shadow-[0_1px_2px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.90)] ' +
      'dark:shadow-[0_1px_3px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.03)] ' +
      'ring-1 ring-black/[0.04] dark:ring-white/[0.05] ' +
      'transition-[box-shadow,border-color] duration-150 ' +
      'focus:ring-2 focus:ring-teal-500/35 focus:border-teal-500/60 ' +
      'dark:focus:border-teal-400/50 dark:focus:ring-teal-400/25',

    /* ─── Card ─── */
    card:
      'rounded-xl border border-zinc-200/80 dark:border-white/[0.07] ' +
      'bg-white dark:bg-[#131720] ' +
      'shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_20px_-3px_rgba(0,0,0,0.07),0_0_0_1px_rgba(0,0,0,0.02)] ' +
      'dark:shadow-[0_1px_1px_rgba(0,0,0,0.20),0_6px_24px_rgba(0,0,0,0.30),0_0_0_1px_rgba(255,255,255,0.04)]',

    cardHeader:
      'px-5 py-4 border-b border-zinc-100 dark:border-white/[0.06]',

    cardBody: 'p-5',

    /* ─── Modal ─── */
    modalPanel:
      'rounded-2xl border border-zinc-200/70 dark:border-white/[0.08] ' +
      'bg-white dark:bg-[#131720] ' +
      'shadow-[0_4px_8px_rgba(0,0,0,0.06),0_16px_40px_-4px_rgba(0,0,0,0.12),0_32px_80px_-8px_rgba(0,0,0,0.10),0_0_0_1px_rgba(0,0,0,0.04)] ' +
      'dark:shadow-[0_8px_24px_rgba(0,0,0,0.50),0_24px_64px_rgba(0,0,0,0.40),0_0_0_1px_rgba(255,255,255,0.06)] ' +
      'backdrop-blur-xl',

    /* ─── Alert ─── */
    alert:
      'rounded-lg border border-zinc-200/80 dark:border-white/[0.07] ' +
      'bg-white dark:bg-zinc-900/80 ' +
      'shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_-2px_rgba(0,0,0,0.06)] ' +
      'dark:shadow-[0_4px_14px_rgba(0,0,0,0.28)]',

    /* ─── Icon button ─── */
    iconButton:
      'shadow-[0_1px_2px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.04)] ' +
      'dark:shadow-[0_1px_3px_rgba(0,0,0,0.40),0_0_0_1px_rgba(255,255,255,0.06)] ' +
      'hover:shadow-[0_2px_4px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.06)] ' +
      'dark:hover:shadow-[0_2px_6px_rgba(0,0,0,0.50),0_0_0_1px_rgba(255,255,255,0.09)] ' +
      'transition-all duration-150 ease-out',

    /* ─── Badge ─── */
    badge:
      'shadow-[0_1px_2px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.70)] ' +
      'ring-1 ring-black/[0.05] dark:ring-white/[0.08]',

    /* ─── Label ─── */
    label:
      'text-[12.5px] font-semibold tracking-[0.02em] text-zinc-700 dark:text-zinc-300 antialiased',

    /* ─── Table ─── */
    tableScrollWrap:
      'rounded-xl border border-zinc-200/80 dark:border-white/[0.07] ' +
      'bg-white dark:bg-[#131720] ' +
      'shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_16px_-2px_rgba(0,0,0,0.06)] ' +
      'overflow-hidden',

    tableSurface:
      'rounded-xl border border-zinc-200/70 dark:border-white/[0.07] ' +
      'bg-white dark:bg-[#131720] p-0',

    tableHead:
      'bg-zinc-50 dark:bg-zinc-900/60 ' +
      'border-b border-zinc-200/80 dark:border-white/[0.06]',

    tableRow:
      'border-zinc-100 dark:border-white/[0.04] ' +
      'transition-colors duration-100 ' +
      'hover:bg-zinc-50/80 dark:hover:bg-white/[0.025]',

    tableHeaderCell:
      'text-zinc-500 dark:text-zinc-400 font-semibold tracking-[0.04em] text-[11.5px] uppercase',

    tableCell: 'text-zinc-700 dark:text-zinc-300 text-[13.5px]',

    /* ─── Playground ─── */
    playgroundPage:
      'bg-zinc-50 dark:bg-[#0c0f14]',

    playgroundGenColumn:
      'border-r border-zinc-200/80 dark:border-white/[0.06] ' +
      'bg-white dark:bg-[#0f1318]',

    playgroundGenPreview:
      'rounded-xl border border-zinc-200/70 dark:border-white/[0.07] ' +
      'bg-white dark:bg-[#131720] ' +
      'shadow-[0_4px_16px_-2px_rgba(0,0,0,0.10),0_0_0_1px_rgba(0,0,0,0.03)] ' +
      'dark:shadow-[0_8px_32px_rgba(0,0,0,0.40),0_0_0_1px_rgba(255,255,255,0.05)]',

    playgroundCanvasMain:
      'bg-zinc-50/50 dark:bg-[#0a0d11]',

    playgroundCanvasDropzone:
      'rounded-xl border-2 border-dashed border-zinc-300/70 dark:border-zinc-700/50 ' +
      'bg-white/80 dark:bg-zinc-900/40 ' +
      'shadow-[inset_0_2px_12px_rgba(0,0,0,0.02)]',

    /* ─── Tabs ─── */
    tabsListLine:
      'border-b border-zinc-200/90 dark:border-white/[0.07]',

    tabsListPills:
      'rounded-lg bg-zinc-100/90 dark:bg-zinc-900/80 p-1 ' +
      'shadow-[inset_0_1px_3px_rgba(0,0,0,0.06),inset_0_0_0_1px_rgba(0,0,0,0.03)] ' +
      'dark:shadow-[inset_0_1px_4px_rgba(0,0,0,0.40),inset_0_0_0_1px_rgba(255,255,255,0.04)]',

    tabsListEnclosed:
      'rounded-t-lg border border-b-0 border-zinc-200/90 dark:border-white/[0.07] ' +
      'bg-zinc-50/90 dark:bg-zinc-900/60',

    tabLine:
      'text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 ' +
      'transition-colors duration-150',

    tabPills:
      'rounded-md text-zinc-600 dark:text-zinc-400 transition-all duration-150 ' +
      'hover:text-zinc-900 dark:hover:text-zinc-100',

    tabPillsActive:
      'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold ' +
      'shadow-[0_1px_3px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.90)] ' +
      'dark:shadow-[0_1px_3px_rgba(0,0,0,0.40),0_0_0_1px_rgba(255,255,255,0.07)]',

    tabPanel:
      'rounded-b-lg border border-t-0 border-zinc-200/80 dark:border-white/[0.06] ' +
      'bg-white dark:bg-[#131720] p-5 md:p-6',

    /* ─── Gen text ─── */
    genTextTitle:
      'font-bold tracking-[-0.03em] text-zinc-950 dark:text-zinc-50 antialiased [text-wrap:balance]',

    genTextBody:
      'text-[15px] leading-[1.68] text-zinc-600 dark:text-zinc-400 antialiased tracking-[0.004em]',

    genTextMuted:
      'text-[13px] text-zinc-400 dark:text-zinc-500 leading-relaxed antialiased tracking-[0.012em]',

    /* ─── Checkbox / Switch / Radio ─── */
    checkbox:
      'rounded-[0.3125rem] border-zinc-300 dark:border-zinc-600 ' +
      'shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] dark:shadow-none ' +
      'ring-1 ring-black/[0.04] focus:ring-2 focus:ring-teal-500/40',

    switchTrack:
      'shadow-[inset_0_1px_4px_rgba(0,0,0,0.12)] ' +
      'dark:shadow-[inset_0_2px_8px_rgba(0,0,0,0.50)] ' +
      'ring-1 ring-black/[0.05] dark:ring-white/[0.07]',

    switchThumb:
      'shadow-[0_1px_3px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.90)] ' +
      'ring-1 ring-white/80',

    /* ─── Spinner ─── */
    spinner:
      'ring-2 ring-teal-400/20 shadow-[0_0_14px_rgba(13,148,136,0.22)]',

    /* ─── Floating surfaces ─── */
    popover:
      'rounded-xl border border-zinc-200/80 dark:border-white/[0.08] ' +
      'bg-white dark:bg-[#141a22] ' +
      'shadow-[0_2px_4px_rgba(0,0,0,0.05),0_8px_24px_-3px_rgba(0,0,0,0.10),0_20px_48px_-6px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)] ' +
      'dark:shadow-[0_4px_12px_rgba(0,0,0,0.40),0_16px_40px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.07)] ' +
      'backdrop-blur-xl',

    dropdownMenu:
      'rounded-xl border border-zinc-200/80 dark:border-white/[0.08] py-1 ' +
      'bg-white dark:bg-[#141a22] ' +
      'shadow-[0_2px_4px_rgba(0,0,0,0.05),0_8px_24px_-3px_rgba(0,0,0,0.10),0_20px_48px_-6px_rgba(0,0,0,0.07)] ' +
      'dark:shadow-[0_4px_12px_rgba(0,0,0,0.40),0_16px_40px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.07)] ' +
      'backdrop-blur-xl min-w-[10rem]',

    dropdownItem:
      'text-[13px] text-zinc-700 dark:text-zinc-300 ' +
      'hover:bg-zinc-100/80 dark:hover:bg-white/[0.05] transition-colors duration-100',

    dropdownItemDestructive:
      'text-red-600 dark:text-red-400 hover:bg-red-50/80 dark:hover:bg-red-950/30',

    drawerPanel:
      'bg-white dark:bg-[#0f1318] ' +
      'shadow-[0_4px_8px_rgba(0,0,0,0.06),0_20px_60px_rgba(0,0,0,0.14),0_0_0_1px_rgba(0,0,0,0.04)] ' +
      'dark:shadow-[0_8px_32px_rgba(0,0,0,0.50),0_0_0_1px_rgba(255,255,255,0.07)] ' +
      'backdrop-blur-xl',

    /* ─── Tooltip ─── */
    tooltipBubble:
      'rounded-md px-2.5 py-1.5 text-[12px] font-medium tracking-[0.01em] text-white ' +
      'bg-zinc-950 dark:bg-zinc-800 ' +
      'shadow-[0_4px_10px_rgba(0,0,0,0.30),0_0_0_1px_rgba(255,255,255,0.07)] ' +
      'ring-1 ring-white/[0.07]',

    /* ─── Accordion ─── */
    accordionItemBordered:
      'border border-zinc-200/80 dark:border-white/[0.07] rounded-lg overflow-hidden ' +
      'bg-white dark:bg-zinc-900/50',

    accordionItemSeparated:
      'border border-zinc-200/80 dark:border-white/[0.07] rounded-lg ' +
      'bg-white dark:bg-zinc-900/50',

    accordionTrigger:
      'hover:bg-zinc-50/80 dark:hover:bg-white/[0.025] ' +
      'text-zinc-900 dark:text-zinc-100 ' +
      'focus:ring-2 focus:ring-inset focus:ring-teal-500/35 transition-colors duration-150',

    accordionContent:
      'text-zinc-600 dark:text-zinc-400 text-[14px] leading-relaxed',

    /* ─── Progress ─── */
    progressTrack:
      'rounded-full bg-zinc-100 dark:bg-zinc-800/80 ' +
      'ring-1 ring-black/[0.03] dark:ring-white/[0.05] ' +
      'shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)]',

    progressFillPrimary:
      'bg-gradient-to-r from-teal-600 to-teal-500 ' +
      'shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_0_12px_-2px_rgba(13,148,136,0.45)]',

    /* ─── Skeleton ─── */
    skeleton:
      'bg-gradient-to-r from-zinc-100 via-zinc-200/60 to-zinc-100 ' +
      'dark:from-zinc-800 dark:via-zinc-700/50 dark:to-zinc-800 ' +
      'bg-[length:300%_100%] animate-pulse',

    /* ─── Slider ─── */
    slider:
      'rounded-full appearance-none ' +
      'bg-zinc-200 dark:bg-zinc-700 ' +
      'accent-teal-500 cursor-pointer ' +
      'shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)] ' +
      '[&::-webkit-slider-thumb]:shadow-[0_1px_3px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.04)] ' +
      '[&::-moz-range-thumb]:shadow-[0_1px_3px_rgba(0,0,0,0.15)]',

    /* ─── Radio ─── */
    radio:
      'border-zinc-300 dark:border-zinc-600 text-teal-600 ' +
      'shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] dark:shadow-none ' +
      'focus:ring-teal-500/40 focus:ring-offset-0 ring-1 ring-black/[0.04]',

    /* ─── Avatar ─── */
    avatar:
      'ring-2 ring-white dark:ring-zinc-900 ' +
      'shadow-[0_1px_3px_rgba(0,0,0,0.10),0_4px_12px_-2px_rgba(0,0,0,0.08)] ' +
      'bg-zinc-100 dark:bg-zinc-800 ' +
      'text-zinc-600 dark:text-zinc-300',

    /* ─── Divider ─── */
    divider: 'border-zinc-200 dark:border-white/[0.07]',

    /* ─── Breadcrumb ─── */
    breadcrumbSeparator: 'text-zinc-300 dark:text-zinc-600',
    breadcrumbLink:
      'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 transition-colors duration-150',
    breadcrumbCurrent: 'font-medium text-zinc-900 dark:text-zinc-100',

    /* ─── Links ─── */
    linkDefault:
      'text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 ' +
      'underline-offset-4 decoration-teal-400/35 hover:decoration-teal-500/55 transition-colors duration-150',

    linkPrimary:
      'text-teal-700 dark:text-teal-400 font-medium hover:text-teal-900 dark:hover:text-teal-200 transition-colors duration-150',

    linkMuted:
      'text-zinc-500 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors duration-150',

    linkUnderline:
      'text-zinc-900 dark:text-zinc-100 underline decoration-zinc-300/60 hover:decoration-zinc-400/80 transition-colors duration-150',

    /* ─── Segmented control ─── */
    segmented:
      'rounded-lg bg-zinc-100/90 dark:bg-zinc-900/80 p-1 ' +
      'shadow-[inset_0_1px_3px_rgba(0,0,0,0.06),inset_0_0_0_1px_rgba(0,0,0,0.03)] ' +
      'dark:shadow-[inset_0_1px_4px_rgba(0,0,0,0.40),inset_0_0_0_1px_rgba(255,255,255,0.04)]',

    /* ─── Stepper ─── */
    stepperCircle:
      'border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 ' +
      'text-zinc-400 dark:text-zinc-500 ' +
      'shadow-[0_1px_2px_rgba(0,0,0,0.05)]',

    stepperCircleActive:
      'border-teal-600 bg-gradient-to-br from-teal-500 to-teal-700 text-white ' +
      'shadow-[0_2px_6px_-1px_rgba(13,148,136,0.38),0_0_0_1px_rgba(13,148,136,0.20)]',

    stepperCircleDone:
      'border-teal-500/60 bg-teal-500/10 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300',

    stepperConnector:
      'bg-zinc-200 dark:bg-zinc-700/60',

    stepperLabel: 'text-sm font-semibold text-zinc-900 dark:text-zinc-100',
    stepperDescription: 'text-xs text-zinc-500 dark:text-zinc-500',

    /* ─── File upload ─── */
    fileUpload:
      'rounded-xl border-2 border-dashed border-zinc-300/80 dark:border-zinc-700/60 ' +
      'bg-white/80 dark:bg-zinc-900/40 ' +
      'hover:border-teal-400/60 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/60 transition-colors duration-200',

    /* ─── Copy button ─── */
    copyButton:
      'rounded-md border border-zinc-200/80 dark:border-white/[0.07] ' +
      'bg-white dark:bg-zinc-900/80 ' +
      'shadow-[0_1px_2px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.85)] ' +
      'hover:shadow-[0_2px_6px_rgba(0,0,0,0.08)] transition-shadow duration-200',

    /* ─── Stat card ─── */
    statCard:
      'rounded-xl border border-zinc-200/80 dark:border-white/[0.07] ' +
      'bg-white dark:bg-[#131720] p-5 md:p-6 ' +
      'shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_20px_-3px_rgba(0,0,0,0.07)] ' +
      'dark:shadow-[0_4px_16px_rgba(0,0,0,0.28),0_0_0_1px_rgba(255,255,255,0.04)]',

    /* ─── Empty state ─── */
    emptyStateIcon:
      'rounded-xl p-4 bg-zinc-100/80 dark:bg-zinc-800/60 ' +
      'ring-1 ring-zinc-200/60 dark:ring-white/[0.06]',

    emptyStateTitle:
      'text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100',

    emptyStateBody: 'text-[13.5px] text-zinc-500 dark:text-zinc-500 max-w-sm leading-relaxed',

    /* ─── Chat ─── */
    chatShell:
      'flex flex-col rounded-xl border border-zinc-200/80 dark:border-white/[0.07] ' +
      'bg-white dark:bg-[#0f1318] overflow-hidden ' +
      'shadow-[0_2px_8px_rgba(0,0,0,0.05),0_8px_24px_-4px_rgba(0,0,0,0.08)]',

    chatHeaderBar:
      'flex items-center gap-3 px-4 py-3.5 border-b border-zinc-100 dark:border-white/[0.06] shrink-0 ' +
      'bg-zinc-50/80 dark:bg-zinc-900/50',

    chatTitle: 'text-[14.5px] font-semibold text-zinc-900 dark:text-zinc-100 truncate tracking-[-0.01em]',
    chatSubtitle: 'text-xs text-zinc-500 dark:text-zinc-500 truncate',

    chatBubbleUser:
      'max-w-[85%] rounded-2xl rounded-br-sm px-3.5 py-2.5 text-[13.5px] leading-relaxed ' +
      'bg-teal-600 text-white ' +
      'shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_1px_3px_rgba(13,148,136,0.25),0_4px_12px_-2px_rgba(13,148,136,0.20)]',

    chatBubbleAssistant:
      'max-w-[85%] rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-[13.5px] leading-relaxed ' +
      'bg-zinc-100/90 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 ' +
      'border border-zinc-200/60 dark:border-white/[0.06]',

    chatBubbleSystem:
      'rounded-lg px-3 py-2 text-[12px] text-zinc-500 dark:text-zinc-500 ' +
      'bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-white/[0.05]',

    chatAvatar:
      'shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ' +
      'ring-2 ring-white dark:ring-zinc-900 ' +
      'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300',

    chatTypingBubble:
      'flex gap-1 items-end px-3.5 py-2.5 rounded-2xl rounded-bl-sm ' +
      'bg-zinc-100/90 dark:bg-zinc-800/80 ' +
      'border border-zinc-200/60 dark:border-white/[0.06]',

    paginationNav:
      'flex items-center gap-1 p-1 rounded-lg ' +
      'bg-zinc-100/80 dark:bg-zinc-900/60 ' +
      'ring-1 ring-zinc-200/70 dark:ring-white/[0.06] ' +
      'shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]',

    chatOptionCard:
      'block w-full text-left rounded-xl border border-zinc-200/80 dark:border-white/[0.07] p-4 ' +
      'transition-all duration-150 ' +
      'bg-white dark:bg-zinc-900/60 ' +
      'hover:border-zinc-300 dark:hover:border-white/[0.12] hover:bg-zinc-50 dark:hover:bg-zinc-800/60 ' +
      'shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.07)]',

    chatSuggestionChip:
      'px-3.5 py-2 text-[13px] rounded-full ' +
      'border border-zinc-200/80 dark:border-white/[0.07] ' +
      'bg-white dark:bg-zinc-900/70 text-zinc-700 dark:text-zinc-300 ' +
      'hover:border-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 ' +
      'transition-all duration-150',

    chatWelcomePrompt: 'text-[13.5px] text-zinc-500 dark:text-zinc-500 leading-relaxed',
  } as const;
}
