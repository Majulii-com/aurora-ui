import { createContext, useContext } from 'react';

export const CardPlainContext = createContext<boolean>(false);

export function useCardPlain() {
  return useContext(CardPlainContext);
}
