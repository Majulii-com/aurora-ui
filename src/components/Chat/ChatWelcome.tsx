import type { ReactNode } from 'react';
import { useAuroraSurface } from '../../theme/useAuroraSurface';
import { cn } from '../../utils';
import { useChatPlain } from './ChatPlainContext';

export interface ChatWelcomeProps {
  /** Initial prompt (e.g. "What would you like to explore?") */
  prompt?: ReactNode;
  /** Option cards or buttons below the prompt */
  children?: ReactNode;
  className?: string;
}

export function ChatWelcome({ prompt, children, className }: ChatWelcomeProps) {
  const plain = useChatPlain();
  const ent = useAuroraSurface(plain);
  const premium = ent.isAurora && !plain;
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {prompt != null && (
        <p className={cn(premium ? ent.chatWelcomePrompt : 'text-sm text-gray-600 dark:text-gray-400')}>
          {prompt}
        </p>
      )}
      {children != null && <div className="flex flex-col gap-3">{children}</div>}
    </div>
  );
}
