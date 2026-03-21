/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** POST endpoint for Generative JSON DSL chat (optional). Passed to `fetchGenDslChatReply` as `chatApiUrl`. */
  readonly VITE_GEN_DSL_CHAT_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
