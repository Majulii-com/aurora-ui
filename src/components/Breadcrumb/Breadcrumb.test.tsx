import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Breadcrumb, BreadcrumbItem } from './Breadcrumb';

describe('Breadcrumb', () => {
  it('renders with aria-label', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>Home</BreadcrumbItem>
      </Breadcrumb>
    );
    expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeInTheDocument();
  });

  it('renders items and separator', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="#">Home</BreadcrumbItem>
        <BreadcrumbItem current>Current</BreadcrumbItem>
      </Breadcrumb>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Current')).toBeInTheDocument();
  });

  it('marks current item with aria-current', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem current>Here</BreadcrumbItem>
      </Breadcrumb>
    );
    expect(screen.getByText('Here')).toHaveAttribute('aria-current', 'page');
  });
});

describe('BreadcrumbItem', () => {
  it('renders as link when href provided', () => {
    render(<BreadcrumbItem href="/path">Link</BreadcrumbItem>);
    const link = screen.getByRole('link', { name: 'Link' });
    expect(link).toHaveAttribute('href', '/path');
  });
});
