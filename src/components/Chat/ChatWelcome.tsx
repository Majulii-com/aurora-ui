import { cn } from '../../utils';

export interface ChatWelcomeProps {
  /** Initial prompt (e.g. "What would you like to explore?") */
  prompt?: React.ReactNode;
  /** Option cards or buttons below the prompt */
  children?: React.ReactNode;
  className?: string;
}

export function ChatWelcome({ prompt, children, className }: ChatWelcomeProps) {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {prompt != null && (
        <p className="text-sm text-gray-600 dark:text-gray-400">{prompt}</p>
      )}
      {children != null && <div className="flex flex-col gap-3">{children}</div>}
    </div>
  );
}
