# DSL host example

Minimal **host application** inside the `aurora-ui` repo: it imports the library (via the same alias as the playground), loads **AI-shaped JSON** documents from `src/documents/`, and renders them with `GenUIProvider` + `GenUIRenderer`.

Use this to see how a real product would:

- Swap **pages** by swapping `GenUIDocument` JSON (same as an AI or API response).
- Handle **`navigate`** (toast simulates React Router / Next.js).
- Handle **`CUSTOM`** (toast simulates payments, auth, etc.).
- Inspect **lint** output for each document.

## Run

From the **package root** (`aurora-ui/`):

```bash
npm run example:dsl-host
```

Opens dev server on port **5175** (see `vite.config.ts`).

## What’s inside

| Folder / file | Role |
|---------------|------|
| `src/documents/*.json` | Full `GenUIDocument` samples — copy or generate from your AI. |
| `src/catalog.ts` | Validates JSON at startup (`parseGenUIDocument`) and lists examples. |
| `src/App.tsx` | `ThemeProvider`, page switcher, `GenUIProvider`, `GenUIRenderer`, host hooks. |

## Production app

Point your app at **published** `@majulii/aurora-ui` (not the alias). See `docs/AURORA_UI_BIBLE.md` §3–§7 (Gen DSL) and §9 (host patterns).
