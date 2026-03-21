import { useCallback, useState } from 'react';
import {
  Chat,
  ChatHeader,
  ChatMessages,
  ChatInput,
  ChatOptionCard,
  ChatWelcome,
} from '@majulii/aurora-ui';
import type { ChatMessageData } from '@majulii/aurora-ui';
import { fetchGenDslChatReply } from '@majulii/aurora-ui';
import { useGenDslChatVerticalSplit } from './useGenDslChatVerticalSplit';

const WELCOME =
  'Ask about **GenUIDocument** structure, registry `type`s, `className`, actions, or tables. Replies are mock until you set `VITE_GEN_DSL_CHAT_API_URL`.';

const OPTIONS = [
  {
    title: 'How do I style from JSON?',
    description: 'Tailwind on `className`, dynamic values, and layout primitives.',
  },
  {
    title: 'Wire API + table',
    description: 'API_CALL, SET_STATE rows, ShowWhen loading, sort/filter.',
  },
  {
    title: 'Tabs and forms',
    description: 'tabBind, bind on inputs, onChangeAction.',
  },
];

type GenDSLChatPanelProps = {
  /** Passed to the AI later as context (current JSON in the editor). */
  documentJson: string;
};

export function GenDSLChatPanel({ documentJson }: GenDSLChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [pending, setPending] = useState(false);
  const { bodyRef, messagesShare, splitPct, onSeparatorPointerDown } =
    useGenDslChatVerticalSplit();

  const handleSend = useCallback(
    async (text: string) => {
      const userMsg: ChatMessageData = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: text,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setPending(true);
      try {
        const replyText = await fetchGenDslChatReply(text, {
          documentJson,
          chatApiUrl:
            typeof import.meta.env.VITE_GEN_DSL_CHAT_API_URL === 'string'
              ? import.meta.env.VITE_GEN_DSL_CHAT_API_URL
              : undefined,
        });
        const reply: ChatMessageData = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: replyText,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, reply]);
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Chat request failed';
        const reply: ChatMessageData = {
          id: `assistant-err-${Date.now()}`,
          role: 'assistant',
          content: `Error: ${msg}`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, reply]);
      } finally {
        setPending(false);
      }
    },
    [documentJson]
  );

  const emptyContent = (
    <ChatWelcome prompt={WELCOME}>
      {OPTIONS.map((opt) => (
        <ChatOptionCard
          key={opt.title}
          title={opt.title}
          description={opt.description}
          onClick={() => {
            void handleSend(opt.title);
          }}
        />
      ))}
    </ChatWelcome>
  );

  const usingApi = Boolean(
    typeof import.meta.env.VITE_GEN_DSL_CHAT_API_URL === 'string' &&
      import.meta.env.VITE_GEN_DSL_CHAT_API_URL.length > 0
  ); // host supplies URL; lib stays env-agnostic

  return (
    <div className="flex flex-col h-full min-h-0 min-w-0 border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <Chat variant="sidebar" height="100%" className="rounded-none border-0 shadow-none min-h-0">
        <ChatHeader
          title="DSL assistant"
          subtitle={usingApi ? 'Connected to chat API' : 'Mock replies · set VITE_GEN_DSL_CHAT_API_URL for AI'}
        />
        <div
          ref={bodyRef}
          className="flex flex-col flex-1 min-h-0 min-w-0"
        >
          <div
            className="flex min-h-0 min-w-0 flex-col overflow-hidden"
            style={{ flex: `${messagesShare} 1 0%` }}
          >
            <ChatMessages
              messages={messages}
              emptyContent={emptyContent}
              className="min-h-0 flex-1"
            />
          </div>
          <div
            role="separator"
            aria-orientation="horizontal"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={splitPct}
            aria-label="Resize chat messages and input"
            className="group relative z-10 h-2 shrink-0 cursor-row-resize touch-none border-y border-transparent bg-gray-100/80 hover:bg-primary-200/40 dark:bg-gray-700/80 dark:hover:bg-primary-500/25"
            onPointerDown={onSeparatorPointerDown}
          >
            <span className="pointer-events-none absolute left-1/2 top-1/2 h-1 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-300 opacity-70 group-hover:bg-primary-500/60 dark:bg-gray-500 dark:group-hover:bg-primary-400/80" />
          </div>
          <div
            className="flex min-h-0 min-w-0 flex-col"
            style={{ flex: `${1 - messagesShare} 1 0%` }}
          >
            {/*
              Drag the separator above to grow/shrink this pane — the input should fill it.
              ChatInput defaults to items-end which keeps the textarea short; !items-stretch + h-full fixes that.
            */}
            <ChatInput
              className="h-full min-h-0 flex-1 border-t-0 !items-stretch"
              placeholder={pending ? 'Waiting…' : 'Ask about Gen JSON DSL…'}
              onSend={(t) => {
                void handleSend(t);
              }}
              disabled={pending}
              textareaClassName="min-h-[44px] h-full max-h-full self-stretch"
            />
          </div>
        </div>
      </Chat>
    </div>
  );
}
