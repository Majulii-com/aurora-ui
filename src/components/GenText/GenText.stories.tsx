import type { Meta, StoryObj } from '@storybook/react';
import { GenText } from './GenText';

const meta: Meta<typeof GenText> = {
  title: 'Components/GenText',
  component: GenText,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['body', 'title', 'muted'] },
  },
};

export default meta;

type Story = StoryObj<typeof GenText>;

export const Body: Story = {
  args: {
    variant: 'body',
    children: 'Body copy for generative layouts. Supports Aurora surface tokens when wrapped in ThemeProvider.',
  },
};

export const Title: Story = {
  args: {
    variant: 'title',
    children: 'Section title',
  },
};

export const Muted: Story = {
  args: {
    variant: 'muted',
    children: 'Secondary or helper text',
  },
};
