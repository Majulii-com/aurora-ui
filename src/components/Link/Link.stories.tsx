import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'primary', 'muted', 'underline'] },
  },
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: { href: '#', children: 'Default link' },
};

export const Primary: Story = {
  args: { href: '#', variant: 'primary', children: 'Primary link' },
};

export const External: Story = {
  args: { href: 'https://example.com', external: true, children: 'External link' },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Link href="#">Default</Link>
      <Link href="#" variant="primary">Primary</Link>
      <Link href="#" variant="muted">Muted</Link>
      <Link href="#" variant="underline">Underline</Link>
    </div>
  ),
};
