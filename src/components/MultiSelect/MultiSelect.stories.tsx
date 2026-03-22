import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MultiSelect } from './MultiSelect';

const options = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
];

const meta: Meta<typeof MultiSelect> = {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;

type Story = StoryObj<typeof MultiSelect>;

export const Default: Story = {
  render: function DefaultMulti() {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div className="w-80">
        <MultiSelect
          options={options}
          value={value}
          onChange={setValue}
          placeholder="Select countries"
        />
      </div>
    );
  },
};

export const WithLabel: Story = {
  render: function LabeledMulti() {
    const [value, setValue] = useState<string[]>(['us', 'ca']);
    return (
      <div className="w-80">
        <MultiSelect
          label="Markets"
          options={options}
          value={value}
          onChange={setValue}
          placeholder="Choose…"
        />
      </div>
    );
  },
};

export const Searchable: Story = {
  render: function SearchMulti() {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div className="w-80">
        <MultiSelect
          options={options}
          value={value}
          onChange={setValue}
          searchable
          searchPlaceholder="Filter options…"
          placeholder="Pick regions"
        />
      </div>
    );
  },
};

export const WithError: Story = {
  render: function ErrorMulti() {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div className="w-80">
        <MultiSelect
          label="Required tags"
          options={options}
          value={value}
          onChange={setValue}
          error
          errorMessage="Select at least one option"
        />
      </div>
    );
  },
};
