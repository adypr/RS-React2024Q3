import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import RightSection from '../../../components/AstronomicalObjects/RightSection';
import { setSelectedItem } from '../../../store/slices/selectedItemSlice';
import { vi } from 'vitest';
import { useRouter } from 'next/router';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

const mockStore = configureStore([]);
const mockPush = vi.fn();

const renderWithProviders = (store: ReturnType<typeof mockStore>) => {
  return render(
    <Provider store={store}>
      <div>
        <RightSection query={new URLSearchParams()} />
        <div data-testid="outside-element">Outside Element</div>
      </div>
    </Provider>
  );
};

describe('RightSection Component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      selectedItem: {
        item: {
          name: 'Earth',
          astronomicalObjectType: 'Planet',
          location: { name: 'Solar System' },
        },
        loading: false,
      },
    });
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      query: {},
    });
    mockPush.mockClear();
  });

  afterEach(() => {
    vi.resetAllMocks();
    store.clearActions();
  });

  test('renders Details component when an item is selected', () => {
    renderWithProviders(store);
    expect(screen.getByText('Earth')).toBeInTheDocument();
    expect(screen.getByText('Type: Planet')).toBeInTheDocument();
    expect(screen.getByText('Location: Solar System')).toBeInTheDocument();
  });

  test('closes Details on close button click', () => {
    renderWithProviders(store);
    fireEvent.click(screen.getByText('🗙'));
    expect(store.getActions()).toContainEqual(setSelectedItem(null));
    expect(mockPush).toHaveBeenCalled();
  });

  test('does not render when no item is selected', () => {
    store = mockStore({
      selectedItem: {
        item: null,
        loading: false,
      },
    });
    renderWithProviders(store);
    expect(screen.queryByText('Earth')).not.toBeInTheDocument();
  });

  test('renders loading indicator when loading is true', () => {
    store = mockStore({
      selectedItem: {
        item: {
          name: 'Earth',
          astronomicalObjectType: 'Planet',
          location: { name: 'Solar System' },
        },
        loading: true,
      },
    });
    renderWithProviders(store);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('does not render loading indicator when loading is false', () => {
    renderWithProviders(store);
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
});
