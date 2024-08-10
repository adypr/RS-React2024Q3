import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Home from '../../pages';

vi.mock('../../pages/AstronomicalObjectsPage', () => ({
  default: () => <div>Astronomical Objects Page Mock</div>,
}));

describe('Home Page', () => {
  it('renders the AstronomicalObjectsPage component', () => {
    render(<Home />);

    expect(
      screen.getByText('Astronomical Objects Page Mock')
    ).toBeInTheDocument();
  });
});
