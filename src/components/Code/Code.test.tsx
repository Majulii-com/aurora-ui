import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Code } from './Code';

describe('Code', () => {
  it('renders inline code by default', () => {
    render(<Code>inline code</Code>);
    expect(screen.getByText('inline code')).toBeInTheDocument();
    expect(document.querySelector('code')).toBeInTheDocument();
    expect(document.querySelector('pre')).not.toBeInTheDocument();
  });

  it('renders block code when block is true', () => {
    render(<Code block>block code</Code>);
    expect(screen.getByText('block code')).toBeInTheDocument();
    expect(document.querySelector('pre')).toBeInTheDocument();
  });
});
