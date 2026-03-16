import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  Chat,
  ChatHeader,
  ChatMessages,
  ChatMessage,
  ChatInput,
  ChatOptionCard,
  ChatSuggestions,
  ChatWelcome,
} from './index';

describe('Chat', () => {
  it('renders children', () => {
    render(
      <Chat>
        <ChatHeader title="Support" />
      </Chat>
    );
    expect(screen.getByText('Support')).toBeInTheDocument();
  });
});

describe('ChatHeader', () => {
  it('renders title and subtitle', () => {
    render(<ChatHeader title="AI Assist" subtitle="Ask anything" />);
    expect(screen.getByText('AI Assist')).toBeInTheDocument();
    expect(screen.getByText('Ask anything')).toBeInTheDocument();
  });
});

describe('ChatMessages', () => {
  it('renders empty content when no messages', () => {
    render(
      <ChatMessages messages={[]} emptyContent={<p>No messages yet</p>} />
    );
    expect(screen.getByText('No messages yet')).toBeInTheDocument();
  });

  it('renders messages', () => {
    const messages = [
      { id: '1', role: 'user' as const, content: 'Hi' },
      { id: '2', role: 'assistant' as const, content: 'Hello!' },
    ];
    render(<ChatMessages messages={messages} />);
    expect(screen.getByText('Hi')).toBeInTheDocument();
    expect(screen.getByText('Hello!')).toBeInTheDocument();
  });
});

describe('ChatInput', () => {
  it('calls onSend when send is triggered', () => {
    const onSend = vi.fn();
    render(<ChatInput onSend={onSend} />);
    const input = screen.getByPlaceholderText(/type a message/i);
    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.keyDown(input, { key: 'Enter', shiftKey: false });
    expect(onSend).toHaveBeenCalledWith('Hello');
  });
});

describe('ChatOptionCard', () => {
  it('renders title and description', () => {
    render(<ChatOptionCard title="Option A" description="Description text" />);
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Description text')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<ChatOptionCard title="Click me" onClick={onClick} />);
    fireEvent.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('ChatSuggestions', () => {
  it('renders suggestion buttons', () => {
    const onSelect = vi.fn();
    render(
      <ChatSuggestions items={[{ label: 'Yes' }, { label: 'No' }]} onSelect={onSelect} />
    );
    expect(screen.getByText('Yes')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Yes'));
    expect(onSelect).toHaveBeenCalledWith('Yes', undefined);
  });
});

describe('ChatWelcome', () => {
  it('renders prompt and children', () => {
    render(
      <ChatWelcome prompt="What would you like?">
        <span>Option 1</span>
      </ChatWelcome>
    );
    expect(screen.getByText('What would you like?')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });
});
