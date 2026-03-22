/**
 * Generative JSON DSL — AI returns serializable structure (no functions).
 * Distinct from {@link UINode} / SchemaRuntime; use {@link GenUIRenderer} for this model.
 */

export interface GenUINode {
  type: string;
  props?: Record<string, unknown>;
  children?: GenUINode[];
  id?: string;
}

export type UIState = Record<string, unknown>;

export const ACTION_TYPES = [
  'SET_STATE',
  'MERGE_STATE',
  'API_CALL',
  'NAVIGATE',
  'CUSTOM',
  'CHAIN',
] as const;

export type ActionType = (typeof ACTION_TYPES)[number];

export interface ActionChainDef {
  chain: ActionDef[];
}

export type ActionDef =
  | { type: 'SET_STATE'; path: string; value: unknown }
  | { type: 'MERGE_STATE'; patch: Record<string, unknown> }
  | {
      type: 'API_CALL';
      id?: string;
      url: string;
      method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
      headers?: Record<string, string>;
      body?: unknown;
      onSuccess?: ActionChainDef;
      onError?: ActionChainDef;
    }
  | { type: 'NAVIGATE'; path: string }
  | { type: 'CUSTOM'; name: string; payload?: unknown }
  | { type: 'CHAIN'; chain: ActionDef[] };

/**
 * Root document: UI tree + initial state + declarative actions.
 * Optional `bindings`: named expression snippets (see docs) resolved before props.
 */
export interface GenUIDocument {
  version?: string;
  ui: GenUINode;
  state: UIState;
  /** Optional named bindings — string values use {{state.*}} / {{event.*}} / {{response.*}} */
  bindings?: Record<string, string>;
  actions?: Record<string, ActionDef>;
  /**
   * Runs once when `GenUIProvider` mounts (after store is ready). Value is an **`actions` id**
   * (same as `onClickAction`). Use for initial `API_CALL`, `SET_STATE`, or `CHAIN`.
   */
  onMountAction?: string;
}

export interface ExpressionContext {
  state: UIState;
  event?: Record<string, unknown>;
  response?: unknown;
  /** Resolved named bindings from document.bindings */
  bindings?: Record<string, unknown>;
}
