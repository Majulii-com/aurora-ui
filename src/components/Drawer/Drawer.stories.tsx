import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './Drawer';
import { Button } from '../Button';
import { useDisclosure } from '../../hooks';

function DrawerDemo({ placement }: { placement?: 'left' | 'right' | 'bottom' }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Open drawer</Button>
      <Drawer isOpen={isOpen} onClose={onClose} title="Drawer title" placement={placement}>
        <p>Drawer body content.</p>
        <Button className="mt-4" onClick={onClose}>
          Close
        </Button>
      </Drawer>
    </>
  );
}

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {
    placement: { control: 'select', options: ['left', 'right', 'bottom'] },
  },
};

export default meta;

type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: () => <DrawerDemo />,
};

export const Right: Story = {
  render: () => <DrawerDemo placement="right" />,
};

export const Left: Story = {
  render: () => <DrawerDemo placement="left" />,
};

export const Bottom: Story = {
  render: () => <DrawerDemo placement="bottom" />,
};

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: 'Open drawer',
    children: 'Content when open.',
  },
};
