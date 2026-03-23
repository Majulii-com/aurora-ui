import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';
import { LUCIDE_ICON_NAMES, LEGACY_ICON_ALIASES } from '../../icons/iconNames';

/** Small set for the controls dropdown (full list is ~1.9k names — see `LUCIDE_ICON_NAMES`). */
const STORYBOOK_ICON_OPTIONS = [
  ...Object.keys(LEGACY_ICON_ALIASES),
  'home',
  'settings',
  'user',
  'bell',
  'mail',
  'calendar',
  'trash-2',
  'rocket',
  'sparkles',
] as const;

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: STORYBOOK_ICON_OPTIONS,
      description: `Any Lucide kebab-case name (${LUCIDE_ICON_NAMES.length} total). Legacy aliases: ${Object.keys(LEGACY_ICON_ALIASES).join(', ')}.`,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: { name: 'search' },
};

export const LegacyAliases: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {Object.entries(LEGACY_ICON_ALIASES).map(([alias, lucide]) => (
        <div key={alias} className="flex flex-col items-center gap-1">
          <Icon name={alias} size={24} />
          <span className="text-xs text-gray-500">
            {alias} → {lucide}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const LucideSample: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {['home', 'settings', 'user-round', 'bell', 'mail', 'calendar-days', 'trash-2', 'rocket', 'sparkles', 'panel-left'].map((name) => (
        <div key={name} className="flex flex-col items-center gap-1">
          <Icon name={name} size={24} />
          <span className="text-xs text-gray-500">{name}</span>
        </div>
      ))}
    </div>
  ),
};
