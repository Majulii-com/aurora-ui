import { createContext, useContext } from 'react';

export const TablePlainContext = createContext(false);

export function useTablePlain() {
  return useContext(TablePlainContext);
}
