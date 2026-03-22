import { useState, useCallback } from 'react';
import { cn } from '../../utils';
import { useAuroraSurface } from '../../theme/useAuroraSurface';
import { Button } from '../Button';
import { Icon } from '../Icon';
import type { ChatInputProps } from './Chat.types';

export function ChatInput({
  value: controlledValue,
  onChange,
  onSend,
  placeholder = 'Type a message...',
  disabled = false,
  showSendButton = true,
  trailing,
  className,
  textareaClassName,
  plain,
}: ChatInputProps) {
  const ent = useAuroraSurface(plain);
  const [internalValue, setInternalValue] = useState('');
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const v = e.target.value;
      if (!isControlled) setInternalValue(v);
      onChange?.(v);
    },
    [isControlled, onChange]
  );

  const handleSubmit = useCallback(() => {
    const trimmed = value.trim();
    if (trimmed && onSend) {
      onSend(trimmed);
      if (!isControlled) setInternalValue('');
    }
  }, [value, onSend, isControlled]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  return (
    <div
      className={cn(
        'flex items-end gap-2 px-4 py-3 border-t border-gray-200 dark:border-gray-700 shrink-0 bg-white dark:bg-gray-800',
        className
      )}
    >
      {trailing != null && <div className="shrink-0">{trailing}</div>}
      <textarea
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        className={cn(
          'flex-1 min-h-[40px] max-h-[120px] resize-none rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50',
          ent.textarea,
          textareaClassName
        )}
      />
      {showSendButton && (
        <Button
          type="button"
          size="md"
          variant="primary"
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          className="shrink-0 self-end"
          aria-label="Send message"
        >
          <Icon name="chevron-right" size={18} />
        </Button>
      )}
    </div>
  );
}
