import { forwardRef } from 'react';
import { cn } from '../../utils';
import type {
  ChatProps,
  ChatHeaderProps,
  ChatMessagesProps,
  ChatMessageProps,
} from './Chat.types';

export const Chat = forwardRef<HTMLDivElement, ChatProps>(
  ({ variant = 'embedded', height = '400px', className, children }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden',
        variant === 'sidebar' && 'h-full min-h-0',
        variant === 'floating' && 'shadow-xl',
        className
      )}
      style={height ? { height: typeof height === 'number' ? `${height}px` : height } : undefined}
    >
      {children}
    </div>
  )
);
Chat.displayName = 'Chat';

export function ChatHeader({
  title,
  subtitle,
  logo,
  actions,
  className,
}: ChatHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700 shrink-0 bg-gray-50 dark:bg-gray-800/50',
        className
      )}
    >
      {logo != null && <div className="shrink-0">{logo}</div>}
      <div className="min-w-0 flex-1">
        {title != null && (
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
            {title}
          </h2>
        )}
        {subtitle != null && (
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{subtitle}</p>
        )}
      </div>
      {actions != null && <div className="shrink-0 flex items-center gap-1">{actions}</div>}
    </div>
  );
}

export function ChatMessage({ message, className }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  return (
    <div
      className={cn(
        'flex gap-2 px-4 py-2',
        isUser && 'flex-row-reverse',
        isSystem && 'justify-center',
        className
      )}
    >
      {!isSystem && message.avatar != null && (
        <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-sm">
          {message.avatar}
        </div>
      )}
      <div
        className={cn(
          'max-w-[85%] rounded-lg px-3 py-2 text-sm',
          isUser &&
            'bg-primary-500 text-white ml-auto',
          message.role === 'assistant' &&
            'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100',
          isSystem && 'bg-gray-100 dark:bg-gray-700/70 text-gray-600 dark:text-gray-400 text-xs'
        )}
      >
        <div className="break-words">{message.content}</div>
        {message.timestamp != null && (
          <div
            className={cn(
              'mt-1 text-[10px] opacity-80',
              isUser ? 'text-right' : 'text-left'
            )}
          >
            {typeof message.timestamp === 'string'
              ? message.timestamp
              : message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}
      </div>
    </div>
  );
}

export function ChatMessages({
  messages,
  loading = false,
  renderMessage,
  emptyContent,
  className,
}: ChatMessagesProps) {
  return (
    <div
      className={cn(
        'flex-1 overflow-y-auto min-h-0 flex flex-col',
        className
      )}
    >
      {messages.length === 0 && emptyContent != null ? (
        <div className="p-4 flex-1">{emptyContent}</div>
      ) : (
        <>
          {messages.map((msg) => (
            <div key={msg.id}>
              {renderMessage ? renderMessage(msg) : <ChatMessage message={msg} />}
            </div>
          ))}
          {loading && (
            <div className="flex gap-2 px-4 py-2">
              <div className="w-8 h-8 rounded-full shrink-0 bg-gray-200 dark:bg-gray-700" />
              <div className="flex gap-1 items-end px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
