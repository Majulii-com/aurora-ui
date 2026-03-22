import type { ActionDef } from '../../schema/genDocumentTypes';

/** Where in the action pipeline an error occurred (for logging / telemetry). */
export type EngineActionPhase = 'runOne' | 'runChain' | 'runAction';

/** Structured context passed to {@link EngineErrorHandler}. */
export type EngineActionContext = {
  phase: EngineActionPhase;
  /** When resolving a named action from `document.actions`. */
  actionId?: string;
  /** Discriminant of the action being executed, when known. */
  actionType?: ActionDef['type'];
};

/** Host hook for unexpected engine failures (bugs, bad DSL data, resolver throws). */
export type EngineErrorHandler = (error: Error, info: EngineActionContext) => void;
