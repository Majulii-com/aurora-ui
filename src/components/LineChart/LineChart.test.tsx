import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LineChart } from './LineChart';

const data = [
  { x: 'Jan', y: 10 },
  { x: 'Feb', y: 20 },
];

describe('LineChart', () => {
  it('renders chart with data', () => {
    const { container } = render(<LineChart data={data} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('shows no data message when empty', () => {
    render(<LineChart data={[]} />);
    expect(screen.getByText('No data')).toBeInTheDocument();
  });
});
