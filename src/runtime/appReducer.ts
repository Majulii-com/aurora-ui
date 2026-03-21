/**
 * Serializable app state updates for schema-driven UIs (`__bind` + `setData`).
 * Host apps (and the schema playground) dispatch these actions; no custom reducer code required for basic path updates.
 */
import { setAtPath } from './bindings';

export type AppState = Record<string, unknown>;

export type AppAction =
  | { type: 'SET_PATH'; payload: { path: string; value: unknown } }
  | { type: 'REPLACE_STATE'; payload: Record<string, unknown> }
  | { type: string; payload?: unknown };

export function defaultAppReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_PATH':
      if (action.payload && typeof action.payload === 'object' && 'path' in action.payload) {
        const { path, value } = action.payload as { path: string; value: unknown };
        return setAtPath(state, path, value) as AppState;
      }
      return state;
    case 'REPLACE_STATE':
      if (action.payload != null && typeof action.payload === 'object') {
        return { ...(action.payload as Record<string, unknown>) };
      }
      return state;
    default:
      return state;
  }
}

export const INITIAL_APP_STATE: AppState = {};
