export { UIRenderer } from './UIRenderer';
export type { UIRendererProps } from './UIRenderer';
export type { UINode, UISchema, UIRegistry, UIRegistryEntry } from './types';

/** Generative JSON DSL (Zod-validated; use with GenUIRenderer) */
export type {
  GenUINode,
  GenUIDocument,
  UIState,
  ActionDef,
  ActionChainDef,
  ActionType,
  ExpressionContext,
} from './genDocumentTypes';
export { ACTION_TYPES } from './genDocumentTypes';
export { GenUIDocumentSchema, parseGenUIDocument } from './genDocumentSchema';
export type { ValidatedGenDocument } from './genDocumentSchema';
