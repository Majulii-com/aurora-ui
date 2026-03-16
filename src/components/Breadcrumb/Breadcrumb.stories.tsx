import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb, BreadcrumbItem } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem href="#">Home</BreadcrumbItem>
      <BreadcrumbItem href="#">Section</BreadcrumbItem>
      <BreadcrumbItem current>Current page</BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const CustomSeparator: Story = {
  render: () => (
    <Breadcrumb separator="›">
      <BreadcrumbItem href="#">Home</BreadcrumbItem>
      <BreadcrumbItem href="#">Docs</BreadcrumbItem>
      <BreadcrumbItem current>Page</BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const SingleItem: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem current>Home</BreadcrumbItem>
    </Breadcrumb>
  ),
};
