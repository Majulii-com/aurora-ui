import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CopyButton } from './CopyButton';

describe('CopyButton', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders and copies text', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    render(<CopyButton textToCopy="abc">Copy</CopyButton>);
    fireEvent.click(screen.getByRole('button', { name: /copy/i }));
    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith('abc');
    });
    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveTextContent(/copied/i);
    });
  });
});
