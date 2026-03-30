import { createContext, useContext } from 'react';
import { cn } from '../../utils';
import { useAuroraSurface } from '../../theme/useAuroraSurface';
import type { TabsContextValue, TabsProps, TabListProps, TabProps, TabPanelProps } from './Tabs.types';

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs components must be used within Tabs');
  return ctx;
}

export function Tabs({ value, onChange, variant = 'line', className, children, ...rest }: TabsProps) {
  return (
    <TabsContext.Provider value={{ value, onChange, variant }}>
      <div className={cn('w-full', className)} data-tabs {...rest}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

const listVariants = {
  line: 'border-b border-gray-200 dark:border-gray-700',
  pills: 'gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg',
  enclosed: 'border border-b-0 border-gray-200 dark:border-gray-700 rounded-t-lg',
};

export function TabList({ className, ...rest }: TabListProps) {
  const { variant } = useTabs();
  const ent = useAuroraSurface();
  const auroraVariantCn = { line: ent.tabsListLine, pills: ent.tabsListPills, enclosed: ent.tabsListEnclosed }[variant];
  return (
    <div
      role="tablist"
      className={cn(
        'flex min-w-0 w-full flex-nowrap overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]',
        ent.isAurora ? auroraVariantCn : listVariants[variant],
        className
      )}
      {...rest}
    />
  );
}

export function Tab({ value, className, children, ...rest }: TabProps) {
  const { value: selected, onChange, variant } = useTabs();
  const ent = useAuroraSurface();
  const isSelected = selected === value;
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      aria-controls={`panel-${value}`}
      id={`tab-${value}`}
      tabIndex={isSelected ? 0 : -1}
      onClick={() => onChange(value)}
      className={cn(
        'shrink-0 px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 touch-manipulation',
        ent.isAurora && 'px-3.5 py-1.5 text-[13px]',
        variant === 'line' &&
          (ent.isAurora
            ? cn(
                ent.tabLine,
                isSelected && 'border-b-2 -mb-px border-primary-500 text-primary-700 dark:text-primary-400 font-semibold'
              )
            : cn(
                'border-b-2 -mb-px border-transparent text-gray-500 hover:text-gray-700',
                isSelected && 'border-primary-500 text-primary-600'
              )),
        variant === 'pills' &&
          (ent.isAurora
            ? cn(ent.tabPills, isSelected && cn('font-semibold', ent.tabPillsActive))
            : cn(
                'rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700',
                isSelected && 'bg-white dark:bg-gray-700 text-primary-600 shadow'
              )),
        variant === 'enclosed' &&
          (ent.isAurora
            ? cn(
                'rounded-t-xl border border-transparent border-b-0 -mb-px text-stone-500 dark:text-stone-400 transition-all duration-150',
                isSelected &&
                  'bg-white dark:bg-stone-900/70 border-stone-200/80 dark:border-stone-700/50 text-primary-700 dark:text-primary-300 font-semibold shadow-[0_2px_8px_rgba(15,23,42,0.06)]'
              )
            : cn(
                'rounded-t border border-transparent border-b-0 -mb-px bg-gray-50 dark:bg-gray-800 text-gray-500',
                isSelected && 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-primary-600'
              )),
        className
      )}
      data-selected={isSelected ? '' : undefined}
      {...rest}
    >
      {children}
    </button>
  );
}

export function TabPanel({ value, className, children, ...rest }: TabPanelProps) {
  const { value: selected } = useTabs();
  const ent = useAuroraSurface();
  if (selected !== value) return null;
  return (
    <div
      role="tabpanel"
      id={`panel-${value}`}
      aria-labelledby={`tab-${value}`}
      tabIndex={0}
      className={cn(
        ent.isAurora
          ? ent.tabPanel
          : 'p-4 border border-gray-200 dark:border-gray-700 border-t-0 rounded-b-lg',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
