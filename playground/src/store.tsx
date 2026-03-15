import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { UINode } from '@majulii/aurora-ui';

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

export type PlaygroundEventAction = 'log' | 'toast' | 'alert';

export interface PlaygroundEvent {
  id: string;
  time: number;
  nodeId: string;
  componentType: string;
  eventName: string;
  action: PlaygroundEventAction;
  message?: string;
}

const MAX_EVENTS = 100;

export interface PlaygroundState {
  schema: UINode;
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
  emitPlaygroundEvent: (nodeId: string, componentType: string, eventName: string, action: PlaygroundEventAction, message?: string) => void;
  clearPlaygroundEvents: () => void;
  clearToast: () => void;
}

const PlaygroundContext = createContext<PlaygroundState | null>(null);

export function PlaygroundProvider({ children }: { children: ReactNode }) {
  const [schema, setSchemaState] = useState<UINode>(() => cloneNode(DEFAULT_ROOT));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [playgroundEvents, setPlaygroundEvents] = useState<PlaygroundEvent[]>([]);
  const [toast, setToast] = useState<string | null>(null);

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

  const emitPlaygroundEvent = useCallback(
    (nodeId: string, componentType: string, eventName: string, action: PlaygroundEventAction, message?: string) => {
      const entry: PlaygroundEvent = {
        id: genId(),
        time: Date.now(),
        nodeId,
        componentType,
        eventName,
        action,
        message,
      };
      setPlaygroundEvents((prev) => [...prev.slice(-(MAX_EVENTS - 1)), entry]);
      if (action === 'log') {
        console.log(`[Playground] ${componentType} ${eventName}`, message ?? '');
      } else if (action === 'toast') {
        setToast(message ?? `${componentType} ${eventName}`);
      } else if (action === 'alert') {
        window.alert(message ?? `${componentType} ${eventName}`);
      }
    },
    []
  );

  const clearPlaygroundEvents = useCallback(() => setPlaygroundEvents([]), []);
  const clearToast = useCallback(() => setToast(null), []);

  return (
    <PlaygroundContext.Provider
      value={{
        schema,
        selectedId,
        selectedNode,
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
