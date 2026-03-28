import { useAuroraSurface } from '../../theme/useAuroraSurface';
import { cn } from '../../utils';
import { useChatPlain } from './ChatPlainContext';
import type { ChatOptionCardProps } from './Chat.types';

export function ChatOptionCard({
  title,
  description,
  onClick,
  icon,
  className,
  children,
}: ChatOptionCardProps) {
  const plain = useChatPlain();
  const ent = useAuroraSurface(plain);
  const premium = ent.isAurora && !plain;

  const content = (
    <>
      {icon != null && <div className="shrink-0 mb-2">{icon}</div>}
      <div
        className={cn(
          'font-medium',
          premium ? 'text-[#0a1620] dark:text-teal-50' : 'text-gray-900 dark:text-gray-100'
        )}
      >
        {title}
      </div>
      {description != null && (
        <div
          className={cn(
            'mt-1 text-sm',
            premium ? 'text-slate-600 dark:text-teal-200/72' : 'text-gray-500 dark:text-gray-400'
          )}
        >
          {description}
        </div>
      )}
      {children}
    </>
  );

  const baseClasses = premium ?
      ent.chatOptionCard
    : 'block w-full text-left rounded-lg border border-gray-200 dark:border-gray-600 p-4 transition-colors hover:border-primary-500 hover:bg-primary-50/50 dark:hover:bg-primary-900/20';

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          baseClasses,
          'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950',
          className
        )}
      >
        {content}
      </button>
    );
  }

  return <div className={cn(baseClasses, className)}>{content}</div>;
}
