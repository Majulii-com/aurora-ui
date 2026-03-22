import type { AuroraSurfaceProps } from '../../types/auroraSurface';

export type ChatMessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessageData {
  id: string;
  role: ChatMessageRole;
  content: React.ReactNode;
  timestamp?: Date | string;
  /** Optional avatar (e.g. Icon or initial) */
  avatar?: React.ReactNode;
}

export interface ChatProps {
  /** Layout variant */
  variant?: 'sidebar' | 'embedded' | 'floating';
  /** Fixed height (e.g. '400px', '100%') */
  height?: string | number;
  className?: string;
  children?: React.ReactNode;
}

export interface ChatHeaderProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  logo?: React.ReactNode;
  /** Trailing actions (e.g. minimize, maximize, close) */
  actions?: React.ReactNode;
  className?: string;
}

export interface ChatMessagesProps {
  messages: ChatMessageData[];
  /** Show typing indicator when true */
  loading?: boolean;
  /** Custom render for a message */
  renderMessage?: (message: ChatMessageData) => React.ReactNode;
  /** Content when no messages (e.g. welcome + option cards) */
  emptyContent?: React.ReactNode;
  className?: string;
}

export interface ChatMessageProps {
  message: ChatMessageData;
  className?: string;
}

export interface ChatInputProps extends AuroraSurfaceProps {
  value?: string;
  onChange?: (value: string) => void;
  onSend?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  /** Show send button */
  showSendButton?: boolean;
  /** Trailing slot (e.g. attach button) */
  trailing?: React.ReactNode;
  className?: string;
  /** Classes for the inner `<textarea>` (e.g. `resize-y min-h-[48px] max-h-[min(40vh,320px)]`). */
  textareaClassName?: string;
}

export interface ChatOptionCardProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  onClick?: () => void;
  /** Optional icon or badge */
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export interface ChatSuggestionsProps {
  /** Quick reply labels (or { label, value } for onSelect payload) */
  items: Array<{ label: React.ReactNode; value?: string }>;
  onSelect?: (label: React.ReactNode, value?: string) => void;
  className?: string;
}
