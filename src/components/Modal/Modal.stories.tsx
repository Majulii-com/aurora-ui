import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../Button';
import { useDisclosure } from '../../hooks';

function ModalDemo() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Open modal</Button>
      <Modal isOpen={isOpen} onClose={onClose} title="Modal title">
        <p>Modal body content.</p>
        <Button className="mt-4" onClick={onClose}>
          Close
        </Button>
      </Modal>
    </>
  );
}

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => <ModalDemo />,
};
