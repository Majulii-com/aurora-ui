import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardBody, CardFooter } from './Card';
import { Button } from '../Button';
import { RippleButton } from '../RippleButton';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['elevated', 'outline', 'filled', 'glass'] },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>Card title</CardHeader>
      <CardBody>Card content goes here.</CardBody>
      <CardFooter>
        <Button size="sm">Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const Outline: Story = {
  render: () => (
    <Card variant="outline" className="w-80">
      <CardBody>Outline card content.</CardBody>
    </Card>
  ),
};

/** Frosted surface — Uiverse / glassmorphism-style panel for dashboards */
export const Glass: Story = {
  render: () => (
    <div className="rounded-2xl bg-gradient-to-br from-primary-100/80 to-stone-200/90 p-8 dark:from-stone-900 dark:to-stone-800">
      <Card variant="glass" className="w-80">
        <CardHeader>Glass panel</CardHeader>
        <CardBody>Backdrop blur + translucent fill for enterprise dashboards.</CardBody>
        <CardFooter>
          <RippleButton size="sm">Action</RippleButton>
        </CardFooter>
      </Card>
    </div>
  ),
};
