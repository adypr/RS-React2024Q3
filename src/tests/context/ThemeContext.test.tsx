import React from 'react';
import { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import { ThemeProvider, ThemeContext } from '../../context/ThemeContext';

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const TestComponent = () => {
    const context = useContext(ThemeContext);

    if (!context) {
      return null;
    }

    const { theme, toggleTheme } = context;

    return (
      <div>
        <span>Current theme: {theme}</span>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
    );
  };

  it('provides the default theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText('Current theme: light')).toBeInTheDocument();
  });

  it('toggles the theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(screen.getByText('Current theme: dark')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(screen.getByText('Current theme: light')).toBeInTheDocument();
  });

  it('saves the theme to localStorage', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(localStorage.getItem('theme')).toBe('dark');

    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('uses the saved theme from localStorage', () => {
    localStorage.setItem('theme', 'dark');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText('Current theme: dark')).toBeInTheDocument();
  });
});
