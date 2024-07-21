import { renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import useSearchLs from '../../hooks/useSearchLs';

describe('useSearchLs', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with initial value and saves to localStorage', () => {
    const { result } = renderHook(() => useSearchLs('initial'));

    expect(result.current[0]).toBe('initial');
    expect(localStorage.getItem('searching')).toBe('initial');
  });

  it('updates the search value and saves to localStorage', () => {
    const { result } = renderHook(() => useSearchLs('initial'));

    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(localStorage.getItem('searching')).toBe('updated');
  });

  it('uses the saved value from localStorage if available', () => {
    localStorage.setItem('searching', 'savedValue');
    const { result } = renderHook(() => useSearchLs('initial'));

    expect(result.current[0]).toBe('savedValue');
  });
});
