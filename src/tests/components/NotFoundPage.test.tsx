import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFoundPage from '../../components/NotFoundPage';
import { describe, it, expect } from 'vitest';

describe('NotFoundPage', () => {
  it('renders 404 message', () => {
    render(<NotFoundPage />);

    expect(screen.getByText('404 - Not Found')).toBeInTheDocument();
    expect(
      screen.getByText('Sorry, the page you are looking for does not exist.')
    ).toBeInTheDocument();
  });
});
