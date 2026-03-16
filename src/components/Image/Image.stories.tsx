import type { Meta, StoryObj } from '@storybook/react';
import { Image } from './Image';

const meta: Meta<typeof Image> = {
  title: 'Components/Image',
  component: Image,
  tags: ['autodocs'],
  argTypes: {
    rounded: { control: 'select', options: ['none', 'sm', 'md', 'lg', 'full'] },
  },
};

export default meta;

type Story = StoryObj<typeof Image>;

export const Default: Story = {
  args: {
    src: 'https://picsum.photos/400/200',
    alt: 'Placeholder',
  },
};

export const Rounded: Story = {
  args: {
    src: 'https://picsum.photos/200/200',
    alt: 'Square',
    rounded: 'lg',
  },
};

export const WithAspectRatio: Story = {
  args: {
    src: 'https://picsum.photos/800/450',
    alt: '16:9',
    aspectRatio: '16/9',
    rounded: 'md',
  },
};

export const WithFallback: Story = {
  args: {
    src: 'https://invalid-url-that-will-fail/image.jpg',
    alt: 'Broken',
    fallback: <span>Failed to load image</span>,
  },
};
