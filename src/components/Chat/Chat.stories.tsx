import type { Meta, StoryObj } from '@storybook/react';
import {
  Chat,
  ChatHeader,
  ChatMessages,
  ChatInput,
  ChatOptionCard,
  ChatSuggestions,
  ChatWelcome,
} from './index';
import { IconButton } from '../IconButton';
import { Icon } from '../Icon';

const sampleMessages = [
  { id: '1', role: 'user' as const, content: 'What would you like to explore?', timestamp: '10:00' },
  {
    id: '2',
    role: 'assistant' as const,
    content: "I can help you re-engineer this role or pivot to a new direction. Which option interests you?",
    timestamp: '10:01',
  },
  { id: '3', role: 'user' as const, content: 'Re-engineer the role', timestamp: '10:02' },
];

const meta: Meta<typeof Chat> = {
  title: 'Components/Chat',
  component: Chat,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['sidebar', 'embedded', 'floating'] },
  },
};

export default meta;

type Story = StoryObj<typeof Chat>;

export const Default: Story = {
  render: () => (
    <Chat height={420}>
      <ChatHeader
        title="AI Assist"
        subtitle="Ask anything"
        actions={
          <>
            <IconButton aria-label="Minimize">
              <Icon name="chevron-down" size={16} />
            </IconButton>
            <IconButton aria-label="Close">
              <Icon name="close" size={16} />
            </IconButton>
          </>
        }
      />
      <ChatMessages
        messages={[]}
        emptyContent={
          <ChatWelcome prompt="What would you like to explore for this role?">
            <ChatOptionCard
              title="Re-engineer the role"
              description="Transform this role for the future - add emerging skills, consolidate tasks, and repurpose freed up capacity."
              onClick={() => {}}
            />
            <ChatOptionCard
              title="Pivot the role"
              description="Transition this role into a new direction - explore alternative roles and skills when demand is declining."
              onClick={() => {}}
            />
          </ChatWelcome>
        }
      />
      <ChatInput placeholder="Type a message..." onSend={() => {}} />
    </Chat>
  ),
};

export const WithMessages: Story = {
  render: () => (
    <Chat height={420}>
      <ChatHeader title="AI Assist" />
      <ChatMessages messages={sampleMessages} />
      <ChatInput onSend={() => {}} />
    </Chat>
  ),
};

export const WithSuggestions: Story = {
  render: () => (
    <Chat height={380}>
      <ChatHeader title="Support" />
      <ChatMessages
        messages={[{ id: '1', role: 'assistant', content: 'How can I help you today?' }]}
      />
      <div className="px-4 pb-2">
        <ChatSuggestions
          items={[{ label: 'Get started' }, { label: 'Pricing' }, { label: 'Contact' }]}
          onSelect={() => {}}
        />
      </div>
      <ChatInput onSend={() => {}} />
    </Chat>
  ),
};

export const Loading: Story = {
  render: () => (
    <Chat height={320}>
      <ChatHeader title="Chat" />
      <ChatMessages
        messages={[{ id: '1', role: 'user', content: 'Tell me more' }]}
        loading
      />
      <ChatInput disabled />
    </Chat>
  ),
};
