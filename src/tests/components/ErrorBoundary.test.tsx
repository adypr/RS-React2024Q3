import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from '../../components/ErrorBoundary';
import { describe, it, expect, vi } from 'vitest';

const ProblemChild = () => {
  throw new Error('Error thrown from problem child');
};

describe('ErrorBoundary', () => {
  it('renders error message when a child throws an error', () => {
    const originalConsoleError = console.error;
    console.error = vi.fn();

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(
      screen.getByText('Something went wrong. Please reload app.')
    ).toBeInTheDocument();

    console.error = originalConsoleError;
  });
});
