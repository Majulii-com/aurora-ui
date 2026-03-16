import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PieChart } from './PieChart';

const data = [
  { label: 'A', value: 50 },
  { label: 'B', value: 50 },
];

describe('PieChart', () => {
  it('renders chart with data', () => {
    const { container } = render(<PieChart data={data} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('shows no data message when empty', () => {
    render(<PieChart data={[]} />);
    expect(screen.getByText('No data')).toBeInTheDocument();
  });
});
