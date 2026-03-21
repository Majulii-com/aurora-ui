import React, { useState, useCallback } from 'react';
import {
  Chat,
  ChatHeader,
  ChatMessages,
  ChatInput,
  ChatOptionCard,
  ChatWelcome,
  IconButton,
  Icon,
} from '@majulii/aurora-ui';
import type { ChatMessageData } from '@majulii/aurora-ui';

const WELCOME_PROMPT = 'Use this chat to get help building your UI and interactions. Try an option below or type a message.';

const INITIAL_OPTIONS = [
  {
    title: 'Add a component',
    description: 'Get suggestions for which component to add next (e.g. Button, Table, Modal).',
  },
  {
    title: 'Wire up interactions',
    description: 'Learn how to add click actions, setData, and bindings to your schema.',
  },
  {
    title: 'Load a definition',
    description: 'Paste or generate a UI definition (schema + initialState) in the Data panel.',
  },
];

export function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessageData[]>([]);

  const handleSend = useCallback((text: string) => {
    const userMsg: ChatMessageData = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    // Placeholder reply (in a real app this would call an AI or help API)
    setTimeout(() => {
      const reply: ChatMessageData = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: 'In the playground you can drag components from the left sidebar onto the canvas, then select a node to edit its props and events in the right panel. Use the Data panel to load a full UI definition (schema + initialState).',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, reply]);
    }, 600);
  }, []);

  const handleOptionClick = useCallback(
    (title: string) => {
      handleSend(title);
    },
    [handleSend]
  );

  const emptyContent = (
    <ChatWelcome prompt={WELCOME_PROMPT}>
      {INITIAL_OPTIONS.map((opt) => (
        <ChatOptionCard
          key={opt.title}
          title={opt.title}
          description={opt.description}
          onClick={() => handleOptionClick(opt.title)}
        />
      ))}
    </ChatWelcome>
  );

  return (
    <div className="flex-1 min-h-0 flex flex-col h-full">
      <Chat variant="sidebar" height="100%" className="rounded-none border-0 bg-white dark:bg-gray-800 shadow-sm">
      <ChatHeader
        title="Build assistant"
        subtitle="UI & interactions help"
        actions={
          <IconButton aria-label="Minimize" size="sm">
            <Icon name="chevron-down" size={16} />
          </IconButton>
        }
      />
      <ChatMessages messages={messages} emptyContent={emptyContent} />
      <ChatInput placeholder="Ask about components, bindings, actions…" onSend={handleSend} />
    </Chat>
    </div>
  );
}
