import { cn } from '../../utils';
import type { ChatSuggestionsProps } from './Chat.types';

export function ChatSuggestions({
  items,
  onSelect,
  className,
}: ChatSuggestionsProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {items.map((item, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect?.(item.label, item.value)}
          className="px-3 py-1.5 text-sm rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
