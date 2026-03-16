import type { Meta, StoryObj } from '@storybook/react';
import { CodeBlock } from './CodeBlock';

const sql = `SELECT campaignhistoryid, campaignid, channelmediumid
FROM campaign_history
WHERE pubsubsentat IS NOT NULL
ORDER BY notificationsentat DESC
LIMIT 20;`;

const meta: Meta<typeof CodeBlock> = {
  title: 'Components/CodeBlock',
  component: CodeBlock,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CodeBlock>;

export const Default: Story = {
  args: { code: sql, showLineNumbers: true },
};

export const NoLineNumbers: Story = {
  args: { code: 'const x = 1;', showLineNumbers: false },
};
