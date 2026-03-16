import type { Meta, StoryObj } from '@storybook/react';
import { Code } from './Code';

const meta: Meta<typeof Code> = {
  title: 'Components/Code',
  component: Code,
  tags: ['autodocs'],
  argTypes: {
    block: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Code>;

export const Inline: Story = {
  args: { children: 'const x = 1' },
};

export const Block: Story = {
  args: {
    block: true,
    children: `function hello() {\n  console.log('Hello');\n}`,
  },
};
