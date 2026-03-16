import { cn } from '../../utils';
import type { ChatOptionCardProps } from './Chat.types';

export function ChatOptionCard({
  title,
  description,
  onClick,
  icon,
  className,
  children,
}: ChatOptionCardProps) {
  const content = (
    <>
      {icon != null && <div className="shrink-0 mb-2">{icon}</div>}
      <div className="font-medium text-gray-900 dark:text-gray-100">{title}</div>
      {description != null && (
        <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</div>
      )}
      {children}
    </>
  );

  const baseClasses =
    'block w-full text-left rounded-lg border border-gray-200 dark:border-gray-600 p-4 transition-colors hover:border-primary-500 hover:bg-primary-50/50 dark:hover:bg-primary-900/20';

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(baseClasses, 'cursor-pointer', className)}
      >
        {content}
      </button>
    );
  }

  return <div className={cn(baseClasses, className)}>{content}</div>;
}
