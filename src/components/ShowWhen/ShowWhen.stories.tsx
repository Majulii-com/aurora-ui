import type { Meta, StoryObj } from '@storybook/react';
import { ShowWhen } from './ShowWhen';

const meta: Meta<typeof ShowWhen> = {
  title: 'Components/ShowWhen',
  component: ShowWhen,
  tags: ['autodocs'],
  argTypes: {
    when: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof ShowWhen>;

export const Default: Story = {
  args: { when: true, children: 'This content is visible when when=true.' },
};

export const Hidden: Story = {
  args: { when: false, children: 'You should not see this.' },
};

export const VisibleBlock: Story = {
  render: () => (
    <div className="space-y-4">
      <ShowWhen when={true}>
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">Visible block (when=true)</div>
      </ShowWhen>
      <ShowWhen when={false}>
        <div className="p-4 bg-red-50 rounded-lg">Hidden block (when=false)</div>
      </ShowWhen>
    </div>
  ),
};
