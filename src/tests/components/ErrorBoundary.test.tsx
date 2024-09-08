import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import ErrorBoundary from '../../components/ErrorBoundary';
import EmulateErrorComponent from '../../components/EmulateErrorComponent';

describe('ErrorBoundary Component', () => {
  it('should render children without error', () => {
    render(
      <ErrorBoundary>
        <div>Safe Component</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Safe Component')).toBeInTheDocument();
  });

  it('should display error message when an error is thrown', () => {
    const originalError = console.error;
    console.error = vi.fn();

    render(
      <ErrorBoundary>
        <EmulateErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(screen.getByText('An unexpected error occurred. Please try reloading this component.')).toBeInTheDocument();

    console.error = originalError;
  });
});
