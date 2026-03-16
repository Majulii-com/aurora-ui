import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ShowWhen } from './ShowWhen';

describe('ShowWhen', () => {
  it('renders children when when is true', () => {
    render(<ShowWhen when={true}>Visible content</ShowWhen>);
    expect(screen.getByText('Visible content')).toBeInTheDocument();
  });

  it('renders nothing when when is false', () => {
    render(<ShowWhen when={false}>Hidden content</ShowWhen>);
    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
  });

  it('renders nothing when when is undefined', () => {
    render(<ShowWhen>Maybe visible</ShowWhen>);
    expect(screen.queryByText('Maybe visible')).not.toBeInTheDocument();
  });
});
