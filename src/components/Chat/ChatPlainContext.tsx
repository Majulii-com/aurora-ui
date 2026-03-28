import { createContext, useContext, type ReactNode } from 'react';

const ChatPlainContext = createContext<boolean | undefined>(undefined);

export function ChatPlainProvider({
  plain,
  children,
}: {
  plain?: boolean;
  children: ReactNode;
}) {
  return <ChatPlainContext.Provider value={plain}>{children}</ChatPlainContext.Provider>;
}

export function useChatPlain(): boolean | undefined {
  return useContext(ChatPlainContext);
}
