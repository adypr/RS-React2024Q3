import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import AstronomicalObjectsPage from '../../pages/AstronomicalObjectsPage';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import rootReducer from '../../store/reducers';
import { api } from '../../services/api';

describe('AstronomicalObjectsPage Component', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
      preloadedState: {
        pageData: {
          data: {
            astronomicalObjects: [
              {
                uid: '1',
                name: 'Object 1',
                astronomicalObjectType: 'Type 1',
                location: { uid: '1', name: 'Location 1' },
              },
            ],
            page: {
              firstPage: true,
              lastPage: false,
              numberOfElements: 1,
              pageNumber: 1,
              pageSize: 10,
              totalElements: 1,
              totalPages: 1,
            },
            sort: { clauses: [] },
          },
          selectedItems: [],
          isDownloading: false,
          downloadProgress: 0,
        },
        selectedItem: {
          item: null,
          loading: true,
        },
        search: {
          query: '',
        },
        [api.reducerPath]: {
          queries: {},
          mutations: {},
          provided: {},
          subscriptions: {},
          config: {
            reducerPath: 'api',
            online: true,
            focused: true,
            middlewareRegistered: true,
            refetchOnMountOrArgChange: false,
            refetchOnReconnect: false,
            refetchOnFocus: false,
            keepUnusedDataFor: 60,
            invalidationBehavior: 'immediately',
          },
        },
      },
    });

    vi.clearAllMocks();
  });

  it('displays a loading indicator while fetching data', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AstronomicalObjectsPage />
        </MemoryRouter>
      </Provider>
    );

    const loadingElements = screen.getAllByText(/Loading.../i);
    expect(loadingElements).toHaveLength(2);
  });
});
