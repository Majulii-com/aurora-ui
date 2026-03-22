# @majulii/aurora-ui

**Majulii Aurora UI** is a production-ready React component system built with **TypeScript** and **TailwindCSS**. It serves as the core UI foundation for the Majulii ecosystem.

## Installation

```bash
npm install @majulii/aurora-ui
# or
pnpm add @majulii/aurora-ui
# or
yarn add @majulii/aurora-ui
```

### Peer dependencies

- `react` >= 18
- `react-dom` >= 18

### TailwindCSS

Your app must use TailwindCSS and include the library’s content in `tailwind.config.js`:

```js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@majulii/aurora-ui/dist/**/*.js',
  ],
  // ...
};
```

Import the base styles once (e.g. in your root layout or `App.tsx`):

```ts
import '@majulii/aurora-ui/styles.css';
```

## Usage

### Theme provider (optional)

Wrap your app with `ThemeProvider` for theming, dark mode, and **default Aurora styling** (soft radii, subtle shadows). Use `defaultAppearance="plain"` for a denser, flatter look, or pass `plain` on individual components to opt out.

```tsx
import { ThemeProvider } from '@majulii/aurora-ui';

<ThemeProvider defaultTheme="light" defaultAppearance="aurora">
  <App />
</ThemeProvider>
```

See **`docs/THEME_APPEARANCE.md`** for `appearance`, `useAuroraAppearance`, and per-component `plain`.

### Components

```tsx
import { Button, Input, Card, Modal } from '@majulii/aurora-ui';

<Button variant="primary" size="lg" onClick={() => console.log('clicked')}>
  Click Me
</Button>

<Input label="Email" placeholder="you@example.com" />

<Card variant="elevated">
  <CardHeader>Title</CardHeader>
  <CardBody>Content</CardBody>
</Card>
```

### Customization

- **Variants**: Use the `variant` prop (e.g. `primary`, `secondary`, `ghost`, `outline`, `danger`).
- **Size**: Use the `size` prop (`sm`, `md`, `lg` where supported).
- **Overrides**: Use the `className` prop to add or override styles.

```tsx
<Button variant="primary" className="rounded-xl shadow-lg">
  Custom style
</Button>
```

### Hooks

```tsx
import {
  useToggle,
  useDisclosure,
  useClipboard,
  useDebounce,
  useClickOutside,
  useLocalStorage,
  useMediaQuery,
} from '@majulii/aurora-ui';
```

### Icons

```tsx
import { AddIcon, SearchIcon, CloseIcon } from '@majulii/aurora-ui';

<AddIcon size={20} className="text-primary-500" />
```

### Utilities

```tsx
import { cn, variant, createVariant } from '@majulii/aurora-ui';

const merged = cn('base', condition && 'optional');
```

### UI Schema & UIRenderer (AI-ready)

The UI can be described by a **serializable schema object** and rendered with `UIRenderer`. This supports the Playground builder and future AI-generated UIs.

```tsx
import { UIRenderer } from '@majulii/aurora-ui';
import type { UINode, UIRegistry } from '@majulii/aurora-ui';

const schema: UINode = {
  type: 'Page',
  children: [
    {
      type: 'Grid',
      props: { columns: 3, gap: 4 },
      children: [
        { type: 'Card', props: { title: 'Revenue' }, children: [] },
        { type: 'Card', props: { title: 'Users' }, children: [] },
      ],
    },
  ],
};

const registry: UIRegistry = {
  Page: { component: Page, defaultProps: {} },
  Grid: { component: Grid, defaultProps: {} },
  Card: { component: Card, defaultProps: {} },
  // ... map each schema type to a component
};

<UIRenderer schema={schema} registry={registry} />
```

The schema is **deterministic**, **JSON-serializable**, and **composable**. The Playground builds this schema visually; the same format can be produced by tools or AI.

## Components

| Component   | Description                |
|------------|----------------------------|
| **Layout** | |
| Page       | Full-height page wrapper   |
| Box        | Generic div wrapper        |
| Stack      | Flex column/row with gap   |
| Grid       | CSS Grid (columns, gap)    |
| Container  | Max-width centered wrapper |
| **Content** | |
| Button     | Buttons with variants/sizes |
| Input      | Text input with label/error |
| Textarea   | Multi-line text input      |
| Checkbox   | Checkbox with label        |
| Radio      | Radio button               |
| Select     | Select dropdown            |
| Switch     | Toggle switch              |
| Card       | Card with header/body/footer |
| Modal      | Dialog / modal             |
| Tooltip    | Hover tooltip              |
| Dropdown   | Dropdown menu              |
| Tabs       | Tab list and panels        |
| Accordion  | Expandable sections        |
| Badge      | Label / tag                |
| Avatar     | User avatar                |
| Spinner    | Loading spinner            |
| Alert      | Alert message              |
| Table      | Table primitives           |
| Pagination | Page navigation            |

## Scripts

| Command           | Description              |
|-------------------|--------------------------|
| `pnpm dev`        | Run Vite dev server      |
| `pnpm build`      | Build library (ESM + CJS + types) |
| `pnpm test`       | Run Vitest               |
| `pnpm storybook`  | Start Storybook          |
| `pnpm playground` | Start drag-and-drop playground |
| `pnpm example:dsl-host` | **Generative JSON DSL** host example (multi-page AI-shaped JSON) |
| `pnpm lint`       | Run ESLint               |
| `pnpm format`     | Format with Prettier     |
| `pnpm release`    | Build and publish to npm |

## Project structure

```
aurora-ui/
├── src/
│   ├── components/   # UI components (including Page, Box, Stack, Grid, Container)
│   ├── schema/       # UINode types, UIRenderer (AI-ready)
│   ├── hooks/        # React hooks
│   ├── icons/        # Icon components
│   ├── theme/        # Theme provider and tokens
│   ├── utils/        # cn, variant, dom helpers
│   ├── styles.css    # Tailwind base
│   └── index.ts      # Public API
├── .storybook/      # Storybook config
├── playground/      # Drag-and-drop UI builder
├── examples/dsl-host-app/  # Example host app: `GenUIDocument` JSON pages + GenUIRenderer
├── tests/           # Test setup
└── .github/workflows/release.yml  # CI/CD
```

## License

MIT © Majulii
