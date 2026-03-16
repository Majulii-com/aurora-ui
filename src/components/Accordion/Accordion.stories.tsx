import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'bordered', 'separated'] },
    allowMultiple: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion defaultValue="1">
      <AccordionItem value="1">
        <AccordionTrigger>Section 1</AccordionTrigger>
        <AccordionContent>Content for section 1.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="2">
        <AccordionTrigger>Section 2</AccordionTrigger>
        <AccordionContent>Content for section 2.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="3">
        <AccordionTrigger>Section 3</AccordionTrigger>
        <AccordionContent>Content for section 3.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Bordered: Story = {
  render: () => (
    <Accordion variant="bordered" defaultValue="1">
      <AccordionItem value="1">
        <AccordionTrigger>First</AccordionTrigger>
        <AccordionContent>First panel content.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="2">
        <AccordionTrigger>Second</AccordionTrigger>
        <AccordionContent>Second panel content.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const AllowMultiple: Story = {
  render: () => (
    <Accordion allowMultiple defaultValue={['1']}>
      <AccordionItem value="1">
        <AccordionTrigger>Item A</AccordionTrigger>
        <AccordionContent>Content A.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="2">
        <AccordionTrigger>Item B</AccordionTrigger>
        <AccordionContent>Content B.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
