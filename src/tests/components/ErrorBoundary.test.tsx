import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import ErrorBoundary from '../../components/ErrorBoundary';

describe('ErrorBoundary Component', () => {
  const ChildComponent = () => {
    throw new Error('Test error');
  };

  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => { });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should display error message when an error is thrown', () => {
    render(
      <ErrorBoundary>
        <ChildComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(
      screen.getByText(
        'An unexpected error occurred. Please reload this app or try again later.'
      )
    ).toBeInTheDocument();
  });

  it('should reload the page when the "Reload App" button is clicked', () => {
    const originalLocation = global.window.location;
    const mockReload = vi.fn();

    global.window.location = {
      ...global.window.location,
      reload: mockReload,
    };

    render(
      <ErrorBoundary>
        <ChildComponent />
      </ErrorBoundary>
    );

    const reloadButton = screen.getByText('Reload App');
    fireEvent.click(reloadButton);

    expect(mockReload).toHaveBeenCalled();

    global.window.location = originalLocation;
  });

  it('should render child components when no error is thrown', () => {
    render(
      <ErrorBoundary>
        <div>Child component</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Child component')).toBeInTheDocument();
  });
});
