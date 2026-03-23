# DSL knowledge base (generated)

This **`dsl-kb/`** folder at the package root holds **auto-generated** artifacts for AI and tooling (GenUI / JSON DSL). It lives outside `docs/` so it is easy to find.

Regenerate with:

```bash
npm run gen:dsl-kb
```

Update when:

- Adding or changing entries in `src/runtime/gen/auroraGenRegistry.tsx`
- Changing `GenUIRenderer` DSL wiring — keep `src/runtime/gen/dslRendererWiring.ts` in sync
- Changing lint action prop keys — `GEN_LINT_ACTION_PROP_KEYS` in `src/runtime/gen/genLint.ts`
- Changing component section groupings — `src/runtime/gen/dslRegistryTaxonomy.ts` (`GEN_REGISTRY_TYPE_CATEGORY`)
- Changing action types or document limits
- Adding or editing **full-document examples** — JSON under `examples/` plus `examples/manifest.json` (section 8 of the knowledge base is generated from these)

| File | Contents |
|------|----------|
| `DSL_AI_KNOWLEDGE_BASE.md` | LLM-oriented markdown: pipeline, document shape, wiring, limits, every registry type + `defaultProps`, and **section 8** — validated full `GenUIDocument` examples |
| `dsl-registry.snapshot.json` | Same registry metadata as JSON for tooling |
| `examples/*.json` | Human-authored example documents (forms/tabs, table/pagination, modal, charts, full-screen marketing dashboard); listed in `examples/manifest.json` |

Human-authored contracts live under `docs/` (e.g. `docs/GENERATIVE_UI.md`).
