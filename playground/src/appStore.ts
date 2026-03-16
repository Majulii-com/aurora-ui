/**
 * Reducer-based app store for AI-generated and complex UIs.
 * State is the single source of truth; only the reducer updates state.
 * See docs/REDUCER_STORE_ARCHITECTURE.md.
 */

import { setAtPath } from './bindings';

/** App state = one object driving all data-bound UI (visibility, form, modals, tables, etc.). */
export type AppState = Record<string, unknown>;

/** Serializable actions. Default reducer handles SET_PATH and REPLACE_STATE. */
export type AppAction =
  | { type: 'SET_PATH'; payload: { path: string; value: unknown } }
  | { type: 'REPLACE_STATE'; payload: Record<string, unknown> }
  | { type: string; payload?: unknown };

/**
 * Default app reducer: handles SET_PATH (generic update at path) and REPLACE_STATE (full replace).
 * Use this so AI/runtime only need to dispatch actions; no custom reducer code required.
 */
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

/** Initial empty app state. */
export const INITIAL_APP_STATE: AppState = {};
