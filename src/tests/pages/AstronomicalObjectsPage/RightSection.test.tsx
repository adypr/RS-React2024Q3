import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import RightSection from '../../../pages/AstronomicalObjectsPage/RightSection';
import { setSelectedItem } from '../../../store/slices/selectedItemSlice';
import { vi } from 'vitest';

const mockStore = configureStore([]);
const mockNavigate = vi.fn();

const renderWithProviders = (store: ReturnType<typeof mockStore>) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <div>
          <RightSection query={new URLSearchParams()} navigate={mockNavigate} />
          <div data-testid="outside-element">Outside Element</div>
        </div>
      </MemoryRouter>
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
    mockNavigate.mockClear();
  });

  test('renders loading state', () => {
    store = mockStore({
      selectedItem: {
        item: null,
        loading: true,
      },
    });
    renderWithProviders(store);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
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
  });

  test('closes Details on outside click', () => {
    renderWithProviders(store);
    const outsideElement = screen.getByTestId('outside-element');
    fireEvent.mouseDown(outsideElement);
    expect(store.getActions()).toContainEqual(setSelectedItem(null));
  });
});
