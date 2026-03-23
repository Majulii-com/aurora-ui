/**
 * Optional client for **Generative JSON DSL** assistant chat (mock or HTTP).
 * Host supplies `chatApiUrl` (e.g. from `import.meta.env.VITE_GEN_DSL_CHAT_API_URL` in Vite).
 */

export type GenDslChatContext = {
  documentJson?: string;
  /** When set, POST JSON to this URL. Omit for mock replies. */
  chatApiUrl?: string;
};

function mockReply(userMessage: string): string {
  const q = userMessage.toLowerCase();
  if (q.includes('table') || q.includes('sort') || q.includes('filter')) {
    return 'For tables, use `type: "Table"` with `columns`, `rows` from state (e.g. `"rows": "{{state.table.rows}}"`), optional `filterBind`, `onSortAction`, and `*ClassName` props for layout. See docs/AURORA_UI_BIBLE.md §7 and §13.';
  }
  if (q.includes('tab') || q.includes('form')) {
    return 'Use `Tabs` + `tabBind` for the active tab id in state, then `TabList` / `Tab` / `TabPanel` children. Wire inputs with `bind` and actions with `onClickAction` / `onChangeAction`.';
  }
  if (q.includes('class') || q.includes('tailwind') || q.includes('style')) {
    return 'Pass Tailwind on `props.className` on any registry node. Values can be dynamic: `"className": "{{state.ui.cardClass}}"`. Use composition (`Stack`, `Box`, `Container`) for structure.';
  }
  if (q.includes('api') || q.includes('fetch') || q.includes('load')) {
    return 'Use an `actions` entry with `type: "API_CALL"`, `url`, `method`, and `onSuccess` chains with `SET_STATE` to store `{{response}}` in state. Pair with `ShowWhen` + `loadingKey` matching the action `id` for spinners.';
  }
  return 'I’m a placeholder assistant for **Generative JSON DSL**. Ask about layout (`Stack`, `Grid`), forms (`bind`), tables, tabs, actions, or styling. Pass `chatApiUrl` to call your AI backend.';
}

export async function fetchGenDslChatReply(
  message: string,
  context: GenDslChatContext = {}
): Promise<string> {
  const url = context.chatApiUrl;
  if (url && url.length > 0) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        context: {
          mode: 'aurora-gen-dsl',
          document: context.documentJson,
        },
      }),
    });
    if (!res.ok) {
      throw new Error(`Chat API returned ${res.status}`);
    }
    const data = (await res.json()) as { reply?: string; message?: string };
    const reply = data.reply ?? data.message;
    if (typeof reply === 'string' && reply.length > 0) return reply;
    throw new Error('Chat API response missing reply/message');
  }

  await new Promise((r) => setTimeout(r, 400 + Math.random() * 400));
  return mockReply(message);
}
