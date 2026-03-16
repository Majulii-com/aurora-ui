import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardBody, CardFooter } from './Card';
import { Button } from '../Button';

describe('Card', () => {
  it('renders Card with subcomponents', () => {
    render(
      <Card>
        <CardHeader>Title</CardHeader>
        <CardBody>Body content</CardBody>
        <CardFooter>
          <Button size="sm">Action</Button>
        </CardFooter>
      </Card>
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Body content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument();
  });

  it('renders with variant class when variant is outline', () => {
    const { container } = render(<Card variant="outline">Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('border-2');
  });
});
