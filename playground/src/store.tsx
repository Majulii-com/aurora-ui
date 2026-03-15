import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react';
import type { UINode } from '@majulii/aurora-ui';
import { setAtPath } from './bindings';

function genId(): string {
  return `n-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function cloneNode(node: UINode): UINode {
  return {
    ...node,
    props: node.props ? { ...node.props } : undefined,
    children: node.children?.map(cloneNode),
  };
}

function mutateAt(root: UINode, id: string, fn: (node: UINode) => UINode): UINode {
  if (root.id === id) return fn(cloneNode(root));
  return {
    ...root,
    children: root.children?.map((c) => mutateAt(c, id, fn)),
  };
}

function removeNodeFromTree(root: UINode, id: string): UINode {
  if (root.id === id) return root;
  return {
    ...root,
    children: root.children
      ?.filter((c) => c.id !== id)
      .map((c) => removeNodeFromTree(c, id)),
  };
}

export function findNode(root: UINode, id: string | null): UINode | null {
  if (!id) return null;
  if (root.id === id) return root;
  for (const child of root.children ?? []) {
    const found = findNode(child, id);
    if (found) return found;
  }
  return null;
}

/** Returns true if targetId is the same as node or a descendant of node */
function isDescendantOf(node: UINode, targetId: string): boolean {
  if (node.id === targetId) return true;
  for (const child of node.children ?? []) {
    if (isDescendantOf(child, targetId)) return true;
  }
  return false;
}

const DEFAULT_ROOT: UINode = {
  type: 'Page',
  id: 'root',
  props: {},
  children: [],
};

/** Built-in action types. Custom actions can be any string; register via customActionHandlers. */
export type PlaygroundEventAction = 'log' | 'toast' | 'alert' | 'updateNode' | 'sequence' | 'setData' | 'navigate';

/** Context passed to custom action handlers so they can read/write data and UI. */
export interface ActionContext {
  appData: Record<string, unknown>;
  setData: (path: string, value: unknown) => void;
  setRoute: (path: string) => void;
  updateNode: (id: string, props: Record<string, unknown>) => void;
  routes: Record<string, UINode>;
  currentRoute: string;
}

/** Custom action handler for any scenario (submit, fetch, openModal, etc.). */
export type CustomActionHandler = (payload: Record<string, unknown> | undefined, context: ActionContext) => void;

export interface PlaygroundEvent {
  id: string;
  time: number;
  nodeId: string;
  componentType: string;
  eventName: string;
  action: string;
  message?: string;
  payload?: Record<string, unknown>;
}

const MAX_EVENTS = 100;

export interface PlaygroundState {
  schema: UINode;
  /** Data context for __bind and setData (COMPLEX_COMPONENTS / FULL_SITE_ARCHITECTURE) */
  appData: Record<string, unknown>;
  setData: (path: string, value: unknown) => void;
  setAppData: (data: Record<string, unknown>) => void;
  /** When set, render routes[currentRoute] instead of schema (site schema mode) */
  routes: Record<string, UINode>;
  defaultRoute: string;
  currentRoute: string;
  setRoute: (path: string) => void;
  setRoutes: (routes: Record<string, UINode>, defaultRoute?: string) => void;
  /** Schema to render: single schema or routes[currentRoute] when routes are set */
  effectiveSchema: UINode;
  selectedId: string | null;
  selectedNode: UINode | null;
  playgroundEvents: PlaygroundEvent[];
  toast: string | null;
  addNode: (parentId: string | null, node: Omit<UINode, 'id'>) => void;
  moveNode: (nodeId: string, targetParentId: string, index?: number) => void;
  updateNode: (id: string, props: Record<string, unknown>) => void;
  setNodeProps: (id: string, props: Record<string, unknown>) => void;
  removeNode: (id: string) => void;
  select: (id: string | null) => void;
  setSchema: (schema: UINode) => void;
  getSerializableSchema: () => UINode;
  emitPlaygroundEvent: (nodeId: string, componentType: string, eventName: string, action: string, message?: string, payload?: Record<string, unknown>) => void;
  clearPlaygroundEvents: () => void;
  clearToast: () => void;
  /** Register a custom action handler (e.g. 'submit', 'fetch'). Enables any scenario without core changes. */
  registerAction: (action: string, handler: CustomActionHandler) => void;
  unregisterAction: (action: string) => void;
}

const PlaygroundContext = createContext<PlaygroundState | null>(null);

const BUILTIN_ACTIONS = new Set<string>(['log', 'toast', 'alert', 'updateNode', 'sequence', 'setData', 'navigate']);

export function PlaygroundProvider({
  children,
  customActionHandlers: initialHandlers,
}: {
  children: ReactNode;
  /** Optional custom action handlers for any scenario (submit, fetch, openModal, etc.). */
  customActionHandlers?: Record<string, CustomActionHandler>;
}) {
  const [schema, setSchemaState] = useState<UINode>(() => cloneNode(DEFAULT_ROOT));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [playgroundEvents, setPlaygroundEvents] = useState<PlaygroundEvent[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [appData, setAppDataState] = useState<Record<string, unknown>>(() => ({}));
  const [routes, setRoutesState] = useState<Record<string, UINode>>({});
  const [defaultRoute, setDefaultRouteState] = useState<string>('/');
  const [currentRoute, setCurrentRoute] = useState<string>('/');
  const [customHandlers, setCustomHandlers] = useState<Record<string, CustomActionHandler>>(() => ({ ...initialHandlers }));

  const setData = useCallback((path: string, value: unknown) => {
    setAppDataState((prev) => setAtPath(prev, path, value) as Record<string, unknown>);
  }, []);

  const setAppData = useCallback((data: Record<string, unknown>) => {
    setAppDataState(() => ({ ...data }));
  }, []);

  const setRoutes = useCallback((newRoutes: Record<string, UINode>, newDefaultRoute?: string) => {
    setRoutesState(newRoutes);
    if (newDefaultRoute != null) setDefaultRouteState(newDefaultRoute);
  }, []);

  const effectiveSchema = useMemo(() => {
    const routeKeys = Object.keys(routes);
    if (routeKeys.length === 0) return schema;
    const node = routes[currentRoute] ?? routes[defaultRoute];
    return node ?? schema;
  }, [routes, currentRoute, defaultRoute, schema]);

  const addNode = useCallback((parentId: string | null, node: Omit<UINode, 'id'>) => {
    const id = genId();
    const newNode: UINode = { ...node, id, children: node.children ?? [] };
    const targetId = parentId ?? schema.id ?? 'root';

    setSchemaState((prev) => {
      const root = cloneNode(prev);
      if (!root.children) root.children = [];
      const isAddingToRoot = targetId === root.id || targetId === 'root';

      // When adding Page to root that is already Page, replace root so we don't get Page > Page
      if (isAddingToRoot && root.type === 'Page' && node.type === 'Page') {
        return { ...newNode, id: root.id, children: root.children };
      }

      if (isAddingToRoot) {
        return { ...root, children: [...root.children, newNode] };
      }
      return mutateAt(root, targetId, (parent) => ({
        ...parent,
        children: [...(parent.children ?? []), newNode],
      }));
    });
    const isReplacingRoot = (targetId === schema.id || targetId === 'root') && schema.type === 'Page' && node.type === 'Page';
    setSelectedId(isReplacingRoot ? schema.id : id);
  }, [schema.id, schema.type]);

  const moveNode = useCallback((nodeId: string, targetParentId: string, index?: number) => {
    if (nodeId === targetParentId) return;
    setSchemaState((prev) => {
      if (prev.id === nodeId) return prev; // can't move root
      const nodeToMove = findNode(prev, nodeId);
      if (!nodeToMove) return prev;
      if (isDescendantOf(nodeToMove, targetParentId)) return prev; // can't drop into own descendant
      const rootWithoutNode = removeNodeFromTree(prev, nodeId);
      const targetParent = findNode(rootWithoutNode, targetParentId);
      if (!targetParent) return prev;
      return mutateAt(rootWithoutNode, targetParentId, (parent) => {
        const children = [...(parent.children ?? [])];
        const insertAt = index ?? children.length;
        children.splice(insertAt, 0, nodeToMove);
        return { ...parent, children };
      });
    });
  }, []);

  const updateNode = useCallback((id: string, props: Record<string, unknown>) => {
    setSchemaState((prev) => mutateAt(prev, id, (n) => ({ ...n, props: { ...n.props, ...props } })));
  }, []);

  const setNodeProps = useCallback((id: string, props: Record<string, unknown>) => {
    setSchemaState((prev) => mutateAt(prev, id, (n) => ({ ...n, props: { ...props } })));
  }, []);

  const removeNode = useCallback((id: string) => {
    setSchemaState((prev) => {
      if (id === prev.id) return cloneNode(DEFAULT_ROOT);
      return removeNodeFromTree(prev, id);
    });
    setSelectedId((s) => (s === id ? null : s));
  }, []);

  const setSchema = useCallback((newSchema: UINode) => {
    setSchemaState(newSchema.id ? newSchema : { ...newSchema, id: 'root' });
  }, []);

  const getSerializableSchema = useCallback(() => {
    function stripIds(n: UINode): UINode {
      const { id: _id, ...rest } = n;
      return { ...rest, children: n.children?.map(stripIds) };
    }
    return stripIds(cloneNode(schema));
  }, [schema]);

  const selectedNode = findNode(schema, selectedId);
  const selectedNodeFromEffective = findNode(effectiveSchema, selectedId);

  const runOneAction = useCallback(
    (action: PlaygroundEventAction, message?: string, payload?: Record<string, unknown>) => {
      if (action === 'log') {
        console.log('[Playground]', message ?? '');
      } else if (action === 'toast') {
        setToast(message ?? '');
      } else if (action === 'alert') {
        window.alert(message ?? '');
      } else if (action === 'updateNode' && payload?.nodeId != null && payload?.props != null && typeof payload.props === 'object') {
        setSchemaState((prev) => mutateAt(prev, String(payload.nodeId), (n) => ({ ...n, props: { ...n.props, ...(payload!.props as Record<string, unknown>) } })));
      } else if (action === 'setData' && payload?.path != null) {
        setAppDataState((prev) => setAtPath(prev, String(payload.path), payload.value) as Record<string, unknown>);
      } else if (action === 'navigate' && payload?.path != null) {
        setCurrentRoute(String(payload.path));
      }
    },
    []
  );

  const actionContext: ActionContext = useMemo(
    () => ({
      appData,
      setData,
      setRoute: setCurrentRoute,
      updateNode,
      routes,
      currentRoute,
    }),
    [appData, setData, updateNode, routes, currentRoute]
  );

  const emitPlaygroundEvent = useCallback(
    (nodeId: string, componentType: string, eventName: string, action: string, message?: string, payload?: Record<string, unknown>) => {
      const entry: PlaygroundEvent = {
        id: genId(),
        time: Date.now(),
        nodeId,
        componentType,
        eventName,
        action,
        message,
        payload,
      };
      setPlaygroundEvents((prev) => [...prev.slice(-(MAX_EVENTS - 1)), entry]);

      const custom = customHandlers[action];
      if (custom) {
        try {
          custom(payload, actionContext);
        } catch (err) {
          console.error('[Playground] custom action error:', action, err);
        }
        return;
      }

      if (action === 'sequence' && Array.isArray(payload?.steps)) {
        for (const step of payload.steps as Array<{ action: string; message?: string; payload?: Record<string, unknown> }>) {
          const a = step.action;
          if (customHandlers[a]) {
            try {
              customHandlers[a](step.payload, actionContext);
            } catch (e) {
              console.error('[Playground] custom action error:', a, e);
            }
          } else {
            runOneAction(a as PlaygroundEventAction, step.message, step.payload);
          }
        }
      } else if (BUILTIN_ACTIONS.has(action)) {
        if (action === 'updateNode' && payload?.nodeId != null && payload?.props != null && typeof payload.props === 'object') {
          runOneAction('updateNode', undefined, payload);
        } else if (action === 'setData' && payload?.path != null) {
          runOneAction('setData', undefined, payload);
        } else if (action === 'navigate' && payload?.path != null) {
          runOneAction('navigate', undefined, payload);
        } else {
          runOneAction(action as PlaygroundEventAction, message, payload);
        }
      }
    },
    [runOneAction, customHandlers, actionContext]
  );

  const registerAction = useCallback((action: string, handler: CustomActionHandler) => {
    setCustomHandlers((prev) => ({ ...prev, [action]: handler }));
  }, []);

  const unregisterAction = useCallback((action: string) => {
    setCustomHandlers((prev) => {
      const next = { ...prev };
      delete next[action];
      return next;
    });
  }, []);

  const clearPlaygroundEvents = useCallback(() => setPlaygroundEvents([]), []);
  const clearToast = useCallback(() => setToast(null), []);

  return (
    <PlaygroundContext.Provider
      value={{
        schema,
        appData,
        setData,
        setAppData,
        routes,
        defaultRoute,
        currentRoute,
        setRoute: setCurrentRoute,
        setRoutes,
        effectiveSchema,
        selectedId,
        selectedNode: selectedNodeFromEffective ?? selectedNode,
        playgroundEvents,
        toast,
        addNode,
        moveNode,
        updateNode,
        setNodeProps,
        removeNode,
        select: setSelectedId,
        setSchema,
        getSerializableSchema,
        emitPlaygroundEvent,
        clearPlaygroundEvents,
        clearToast,
        registerAction,
        unregisterAction,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  );
}

export function usePlayground() {
  const ctx = useContext(PlaygroundContext);
  if (!ctx) throw new Error('usePlayground must be used within PlaygroundProvider');
  return ctx;
}
