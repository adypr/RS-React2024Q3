import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../../components/Header';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import useTheme from '../../hooks/useTheme';
import { setSearchQuery } from '../../store/slices/searchSlice';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

vi.mock('../../hooks/useTheme', () => ({
  default: vi.fn(),
}));

describe('Header', () => {
  const mockPush = vi.fn();
  const mockDispatch = vi.fn();
  const mockToggleTheme = vi.fn();
  const mockOnEmulateError = vi.fn();

  beforeEach(() => {
    (useRouter as unknown as jest.Mock).mockReturnValue({
      push: mockPush,
      replace: vi.fn(),
      asPath: '',
    });

    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useTheme as unknown as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    mockPush.mockClear();
    mockDispatch.mockClear();
    mockToggleTheme.mockClear();
    mockOnEmulateError.mockClear();
  });

  it('renders header with title, subtitle, and buttons', () => {
    render(<Header onEmulateError={mockOnEmulateError} />);

    expect(screen.getByText('Star Trek')).toBeInTheDocument();
    expect(screen.getByText('Astronomical Objects')).toBeInTheDocument();

    expect(screen.getByText('Emulate Error')).toBeInTheDocument();
    expect(screen.getByText('Dark Mode')).toBeInTheDocument();
  });

  it('calls onEmulateError when the emulate error button is clicked', () => {
    render(<Header onEmulateError={mockOnEmulateError} />);
    fireEvent.click(screen.getByText('Emulate Error'));
    expect(mockOnEmulateError).toHaveBeenCalled();
  });

  it('toggles theme when the theme button is clicked', () => {
    render(<Header onEmulateError={mockOnEmulateError} />);
    fireEvent.click(screen.getByText('Dark Mode'));
    expect(mockToggleTheme).toHaveBeenCalled();
  });

  it('submits search query when the search button is clicked', () => {
    render(<Header onEmulateError={mockOnEmulateError} />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Enterprise' },
    });
    fireEvent.click(screen.getByText('Search'));

    expect(mockDispatch).toHaveBeenCalledWith(setSearchQuery('Enterprise'));
    expect(mockPush).toHaveBeenCalledWith({
      search: 'page=1&name=Enterprise',
    });
  });

  it('loads initial search query from URL', () => {
    (useRouter as unknown as jest.Mock).mockReturnValue({
      asPath: '?name=Voyager',
      push: mockPush,
      replace: vi.fn(),
    });

    render(<Header onEmulateError={mockOnEmulateError} />);

    expect(screen.getByDisplayValue('Voyager')).toBeInTheDocument();
  });

  it('removes search query and local storage item when search is cleared', () => {
    (useRouter as unknown as jest.Mock).mockReturnValue({
      asPath: '?name=Voyager',
      push: mockPush,
      replace: vi.fn(),
    });

    render(<Header onEmulateError={mockOnEmulateError} />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '' },
    });
    fireEvent.click(screen.getByText('Search'));

    expect(mockDispatch).toHaveBeenCalledWith(setSearchQuery(''));
    expect(mockPush).toHaveBeenCalledWith({
      search: 'page=1',
    });
    expect(localStorage.getItem('searching')).toBeNull();
  });
});
