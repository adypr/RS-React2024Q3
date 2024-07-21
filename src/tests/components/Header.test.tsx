import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../../components/Header';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useTheme from '../../hooks/useTheme';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useLocation: vi.fn(),
}));

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

vi.mock('../../hooks/useTheme', () => ({
  default: vi.fn(),
}));

describe('Header', () => {
  const mockNavigate = vi.fn();
  const mockDispatch = vi.fn();
  const mockToggleTheme = vi.fn();
  const mockOnEmulateError = vi.fn();

  beforeEach(() => {
    (useNavigate as unknown as jest.Mock).mockReturnValue(mockNavigate);
    (useLocation as unknown as jest.Mock).mockReturnValue({ search: '' });
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useTheme as unknown as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });
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
});
