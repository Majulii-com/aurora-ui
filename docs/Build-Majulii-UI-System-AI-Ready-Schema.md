# Cursor Prompt — Build Majulii UI System with AI-Ready UI Schema

You are an expert **React, TypeScript, UI architecture, and design system engineer**.

Your task is to build a **complete UI system library** that will be published under the **Majulii organization**.

Package name:

```bash
@majulii/aurora-ui
```

This package must act as a **complete UI platform** that includes:

• UI Components
• UI Hooks
• Icons
• Theme System
• Utilities
• Storybook documentation
• Visual UI Playground Builder
• Object-based UI configuration system
• Renderer that converts UI configuration objects into real UI

This system must also be **future-ready for AI generated UI**.

---

# Core Vision

This UI system must allow developers to:

1. Build UI using **React components**
2. Build UI using a **visual drag-and-drop playground**
3. Build UI using a **JSON configuration object**
4. In the future, allow **AI/LLMs to generate UI by producing configuration objects**

The library must include a **UI Renderer** that reads a configuration object and renders the UI dynamically using existing components.

---

# Example Vision

A developer should be able to create a **complete enterprise dashboard UI** using:

• components
• configuration objects
• or the visual playground

Example dashboard:

• sidebar
• navbar
• cards
• charts
• tables
• filters
• modals

All built using existing components.

---

# Technology Stack

Use the following stack:

React 18+
TypeScript
TailwindCSS
Storybook
Vite (library mode)
Vitest or Jest
React Testing Library
ESLint
Prettier
pnpm

---

# Project Structure

```id="p1x0o0"
majulii-ui/

src/
  components/
  hooks/
  icons/
  theme/
  utils/
  renderer/
  schema/

.storybook/

playground/

tests/

.github/workflows/

package.json
tsconfig.json
vite.config.ts
tailwind.config.ts
README.md
```

---

# Component Library

All components must live inside:

```id="50ifm7"
src/components/
```

Each component must have its own folder.

Example:

```id="spn1c1"
src/components/Button/

Button.tsx
Button.types.ts
Button.stories.tsx
Button.test.tsx
index.ts
```

---

# Initial Components

Create a strong set of foundational UI components.

Examples:

Button
Input
Textarea
Checkbox
Radio
Select
Switch
Card
Modal
Tooltip
Dropdown
Tabs
Accordion
Badge
Avatar
Spinner
Alert
Table
Pagination
Sidebar
Navbar
Drawer
Breadcrumb
Form components

Each component must support:

• `variant`
• `size`
• `className` override
• event handlers
• composability

Example usage:

```tsx id="i6tx2p"
<Button
  variant="primary"
  size="lg"
  className="rounded-xl"
  onClick={() => console.log("clicked")}
>
Click Me
</Button>
```

---

# Hooks Library

Inside:

```id="h5o8ti"
src/hooks/
```

Examples:

useToggle
useDisclosure
useDebounce
useClipboard
useClickOutside
useLocalStorage
useMediaQuery

All hooks must be typed and tested.

---

# Icons System

Inside:

```id="1dj4sj"
src/icons/
```

Icons must be:

• SVG based
• React components
• customizable

Example:

```id="3klgrk"
<AddIcon size={20} color="red" />
```

---

# Theme System

Inside:

```id="v86h8y"
src/theme/
```

Include:

colors
spacing
typography
dark mode

Provide:

```tsx
<ThemeProvider>
```

---

# Utility Helpers

Inside:

```id="m2cl9e"
src/utils/
```

Examples:

cn (className merge)
variant helper
dom helpers

---

# UI Schema System (Very Important)

This UI system must support building UI using **configuration objects**.

Create a schema format describing UI structure.

Example UI Schema:

```ts id="wdehpc"
const dashboardUI = {
  type: "Page",
  children: [
    {
      type: "Navbar",
      props: {
        title: "Admin Dashboard"
      }
    },
    {
      type: "Grid",
      props: { columns: 3 },
      children: [
        {
          type: "Card",
          props: { title: "Revenue" }
        },
        {
          type: "Card",
          props: { title: "Users" }
        }
      ]
    }
  ]
}
```

This object represents the **entire UI structure**.

---

# UI Renderer

Create a renderer that converts configuration objects into real UI.

Location:

```id="l0otj5"
src/renderer/
```

Example renderer:

```tsx id="f5wdj7"
renderUI(schema)
```

The renderer must:

• read component type
• map to registered components
• pass props
• recursively render children

Example:

```tsx id="plrjod"
<UIRenderer schema={dashboardUI} />
```

---

# Component Registry

Create a component registry.

```id="x6q8sk"
src/renderer/ComponentRegistry.ts
```

Example:

```ts id="pnqib8"
export const registry = {
  Button,
  Card,
  Navbar,
  Sidebar
}
```

Renderer must use registry to map component names.

---

# Visual UI Playground

Create a **drag-and-drop playground** to build UI visually.

Location:

```id="caj1n1"
playground/
```

Purpose:

Allow developers to **build complete UI layouts visually**.

---

# Playground Layout

Left Sidebar:

List of components.

Example:

```id="n8zld8"
Button
Input
Card
Table
Modal
Tabs
Sidebar
Navbar
```

Right Side:

Canvas.

User can:

• drag components
• configure props
• build UI layouts
• nest components

---

# Playground Output

The playground must **generate a UI configuration object**.

Example output:

```ts id="lqv6cq"
{
  type: "Page",
  children: [
    {
      type: "Sidebar"
    },
    {
      type: "Navbar"
    },
    {
      type: "Grid",
      children: [
        { type: "Card" },
        { type: "Card" }
      ]
    }
  ]
}
```

The system must allow:

```ts
console.log(uiSchema)
```

---

# AI Future Integration

The UI schema format must be designed so that **AI models can generate UI**.

Example AI output:

```json
{
  "type": "Dashboard",
  "components": [...]
}
```

The **UI Renderer must interpret this object and render the UI**.

This allows:

• AI generated pages
• dynamic dashboards
• configurable applications

---

# Storybook

Setup Storybook to document components.

Location:

```id="rtayxt"
.storybook/
```

Each component must have:

```id="93baj3"
Component.stories.tsx
```

---

# Build System

Use **Vite library mode**.

Output:

```id="nl6zxr"
dist/
esm/
cjs/
types/
```

Must support:

• ESM
• CommonJS
• Tree shaking

---

# Testing

Use:

Vitest or Jest
React Testing Library

Every component must have tests.

---

# CI/CD Publishing

Create GitHub Actions workflow:

```id="icdu59"
.github/workflows/release.yml
```

When merged into **main branch**:

1 Install dependencies
2 Run lint
3 Run tests
4 Build package
5 Publish to npm

Use secret:

```
NPM_TOKEN
```

---

# NPM Package

Package must publish as:

```bash
@majulii/ui
```

Install example:

```bash
npm install @majulii/ui
```

---

# Expected Result

Generate a **complete UI system platform** including:

• React components
• Hooks library
• Icons
• Theme system
• Utility helpers
• UI schema format
• Dynamic UI renderer
• Visual drag-drop playground
• Storybook documentation
• Unit tests
• GitHub CI/CD pipeline
• NPM publishing workflow

The final system must allow:

1 Build UI using components
2 Build UI using drag-drop playground
3 Build UI using JSON schema
4 Future AI generated UI
