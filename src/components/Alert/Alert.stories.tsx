import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'danger'] },
  },
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: { children: 'This is an informational message.' },
};

export const WithTitle: Story = {
  args: { title: 'Heads up', children: 'You can add a title and body content.' },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Alert variant="info" title="Info">Information message.</Alert>
      <Alert variant="success" title="Success">Operation completed.</Alert>
      <Alert variant="warning" title="Warning">Please review before continuing.</Alert>
      <Alert variant="danger" title="Error">Something went wrong.</Alert>
    </div>
  ),
};

export const Dismissible: Story = {
  args: { title: 'Dismissible', children: 'Click the X to close.', onClose: () => {} },
};
