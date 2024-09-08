import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Custom404 from '../../pages/404';

vi.mock('../../components/NotFoundPage', () => ({
  __esModule: true,
  default: () => <div>Mocked NotFoundPage Component</div>,
}));

describe('Custom404 Page', () => {
  it('renders the NotFoundPage component', () => {
    render(<Custom404 />);

    expect(
      screen.getByText('Mocked NotFoundPage Component')
    ).toBeInTheDocument();
  });
});
