import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import LeftSection from '../../../components/AstronomicalObjects/LeftSection';
import {
  setSelectedItem,
  setLoading,
} from '../../../store/slices/selectedItemSlice';
import { vi } from 'vitest';
import { useRouter } from 'next/router';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

const mockStore = configureStore([]);
const mockPush = vi.fn();

const renderWithProviders = (
  store: ReturnType<typeof mockStore>,
  props: Partial<React.ComponentProps<typeof LeftSection>> = {}
) => {
  return render(
    <Provider store={store}>
      <div>
        <LeftSection
          isFetching={false}
          isError={false}
          error={null}
          storedData={{
            astronomicalObjects: [
              {
                uid: '1',
                name: 'Object 1',
                astronomicalObjectType: 'Type 1',
                location: { uid: 'loc1', name: 'Location 1' },
              },
              {
                uid: '2',
                name: 'Object 2',
                astronomicalObjectType: 'Type 2',
                location: { uid: 'loc2', name: 'Location 2' },
              },
            ],
            page: {
              totalPages: 2,
              pageNumber: 1,
              pageSize: 10,
              totalElements: 20,
              firstPage: true,
              lastPage: false,
              numberOfElements: 2,
            },
            sort: {
              clauses: [],
            },
          }}
          currentPage={1}
          {...props}
        />
        <div data-testid="outside-element">Outside Element</div>
      </div>
    </Provider>
  );
};

describe('LeftSection Component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      selectedItem: {
        item: null,
        loading: false,
      },
      pageData: {
        selectedItems: [],
        data: null,
        isDownloading: false,
        downloadProgress: 0,
      },
    });

    (useRouter as unknown as jest.Mock).mockReturnValue({
      push: mockPush,
      query: {},
    });
    mockPush.mockClear();
  });

  test('should display loading message when fetching', () => {
    renderWithProviders(
      mockStore({
        selectedItem: {
          item: null,
          loading: true,
        },
        pageData: {
          selectedItems: [],
        },
      }),
      { isFetching: true }
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('should display error message when error occurs', () => {
    renderWithProviders(store, {
      isError: true,
      error: 'Network Error',
    });

    expect(screen.getByText('Error: "Network Error"')).toBeInTheDocument();
  });

  test('should display data when available', () => {
    renderWithProviders(store);
    expect(screen.getByText(/Object 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Object 2/i)).toBeInTheDocument();
  });

  test('should navigate to item details on click', () => {
    renderWithProviders(store);

    const object1 = screen.getByText(/Object 1/i);
    fireEvent.click(object1);

    const actions = store.getActions();
    const selectedItem = {
      uid: '1',
      name: 'Object 1',
      astronomicalObjectType: 'Type 1',
      location: { uid: 'loc1', name: 'Location 1' },
    };

    expect(actions).toEqual([setSelectedItem(selectedItem), setLoading(true)]);
    expect(mockPush).toHaveBeenCalled();
  });
});
