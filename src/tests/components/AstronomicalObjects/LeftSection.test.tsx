import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import LeftSection from '../../../components/AstronomicalObjects/LeftSection';
import * as selectedItemActions from '../../../store/slices/selectedItemSlice';
import { vi } from 'vitest';
import { useRouter } from 'next/router';
import * as api from '../../../services/api';

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
                name: "'aucdet IX",
                astronomicalObjectType: 'PLANET',
                location: { uid: 'loc1', name: 'Alpha Quadrant' },
              },
              {
                uid: '2',
                name: "'etnap Nebula",
                astronomicalObjectType: 'NEBULA',
                location: { uid: 'loc2', name: 'Beta Quadrant' },
              },
              {
                uid: '3',
                name: '1 Centauri',
                astronomicalObjectType: 'STAR_SYSTEM',
                location: { uid: 'loc3', name: 'Beta Quadrant' },
              },
              {
                uid: '4',
                name: '11 Leonis Minoris',
                astronomicalObjectType: 'STAR_SYSTEM',
                location: { uid: 'loc4', name: 'Alpha Quadrant' },
              },
              {
                uid: '5',
                name: '1889 V',
                astronomicalObjectType: 'COMET',
                location: { uid: 'loc5', name: 'Earth' },
              },
            ],
            page: {
              totalPages: 1,
              pageNumber: 1,
              pageSize: 10,
              totalElements: 5,
              firstPage: true,
              lastPage: true,
              numberOfElements: 5,
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
      search: {
        query: '',
      },
    });

    (useRouter as unknown as jest.Mock).mockReturnValue({
      push: mockPush,
      pathname: '/',
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
        search: {
          query: '',
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

  test('should display list of astronomical objects', async () => {
    renderWithProviders(store, {
      isFetching: false,
      isError: false,
      error: null,
    });

    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
    });

    expect(screen.getByText("Title: 'aucdet IX")).toBeInTheDocument();
    expect(screen.getByText("Title: 'etnap Nebula")).toBeInTheDocument();
    expect(screen.getByText('Title: 1 Centauri')).toBeInTheDocument();
  });

  test('should handle item click', async () => {
    const mockSetSelectedItem = vi.spyOn(selectedItemActions, 'setSelectedItem');

    renderWithProviders(store, {
      isFetching: false,
      isError: false,
      error: null,
    });

    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
    });

    const targetElement = screen.getByText("Title: 'aucdet IX");
    fireEvent.click(targetElement);

    await waitFor(() => {
      expect(mockSetSelectedItem).toHaveBeenCalledWith({
        uid: 'ASMA0000015822',
        name: "'aucdet IX",
        astronomicalObjectType: 'PLANET',
        location: { uid: 'ASMA0000025892', name: 'Alpha Quadrant' },
      });
    });
  });


  test('should paginate correctly', async () => {
    renderWithProviders(store, {
      isFetching: false,
      isError: false,
      error: null,
      currentPage: 1,
      storedData: {
        astronomicalObjects: [
          {
            uid: '1',
            name: "'aucdet IX",
            astronomicalObjectType: 'PLANET',
            location: { uid: 'loc1', name: 'Alpha Quadrant' },
          },
          {
            uid: '2',
            name: "'etnap Nebula",
            astronomicalObjectType: 'NEBULA',
            location: { uid: 'loc2', name: 'Beta Quadrant' },
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
      },
    });

    await waitFor(() => expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument());

    const pageButton = screen.getByRole('button', { name: '2' });
    fireEvent.click(pageButton);

    expect(mockPush).toHaveBeenNthCalledWith(1, {
      pathname: '/',
      query: { page: '2' },
    });
  });

  test('should refetch data on search query change', async () => {
    const mockFetch = vi.spyOn(api, 'fetchAstronomicalObjects');
    renderWithProviders(store, {
      isFetching: false,
      isError: false,
      error: null,
    });

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith({
        currentPage: 1,
        searchQuery: '',
      });
    });
  });

  test('should find the outside element', async () => {
    renderWithProviders(store, {
      isFetching: false,
      isError: false,
      error: null,
    });

    await waitFor(() => {
      expect(screen.getByTestId('outside-element')).toBeInTheDocument();
      expect(screen.getByText('Outside Element')).toBeInTheDocument();
    });
  });
});
