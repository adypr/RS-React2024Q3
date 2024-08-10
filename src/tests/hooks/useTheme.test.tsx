import React from 'react';
import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import useTheme from '../../hooks/useTheme';
import { ThemeContext } from '../../context/ThemeContext';
import { ThemeContextType } from '../../models/data.interface';

describe('useTheme hook', () => {
  it('should return context when used within ThemeProvider', () => {
    const mockContextValue: ThemeContextType = {
      theme: 'light',
      toggleTheme: () => {},
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeContext.Provider value={mockContextValue}>
        {children}
      </ThemeContext.Provider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current).toBe(mockContextValue);
  });

  it('should throw an error when used outside of ThemeProvider', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => renderHook(() => useTheme())).toThrow(
      'useTheme must be used within a ThemeProvider'
    );

    consoleErrorSpy.mockRestore();
  });
});
