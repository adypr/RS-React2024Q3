import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../components/Search';

class LocalStorageMock {
  private store: { [key: string]: string };

  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = value;
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: new LocalStorageMock(),
    writable: true,
  });
});

test('clicking the Search button saves the entered value to local storage', () => {
  const onSearchChange = jest.fn();
  const onSearchSubmit = jest.fn(() => {
    localStorage.setItem('search', 'test value');
  });
  render(
    <Search
      searching="test value"
      onSearchChange={onSearchChange}
      onSearchSubmit={onSearchSubmit}
    />
  );

  fireEvent.click(screen.getByText('Search'));
  expect(localStorage.getItem('search')).toBe('test value');
});

test('component retrieves the value from local storage upon mounting', () => {
  localStorage.setItem('search', 'saved value');
  const onSearchChange = jest.fn();
  const onSearchSubmit = jest.fn();

  const { rerender } = render(
    <Search
      searching=""
      onSearchChange={onSearchChange}
      onSearchSubmit={onSearchSubmit}
    />
  );

  rerender(
    <Search
      searching={localStorage.getItem('search') || ''}
      onSearchChange={onSearchChange}
      onSearchSubmit={onSearchSubmit}
    />
  );

  expect(screen.getByDisplayValue('saved value')).toBeInTheDocument();
});
