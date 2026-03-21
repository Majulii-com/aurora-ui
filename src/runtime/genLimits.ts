/** Guardrails for AI-generated documents (abuse / runaway trees). */

export interface GenDocumentLimits {
  /** Max nesting depth of `ui` tree (root = 1). */
  maxDepth: number;
  /** Max total nodes including root. */
  maxNodes: number;
}

export const DEFAULT_GEN_LIMITS: GenDocumentLimits = {
  maxDepth: 64,
  maxNodes: 2000,
};
