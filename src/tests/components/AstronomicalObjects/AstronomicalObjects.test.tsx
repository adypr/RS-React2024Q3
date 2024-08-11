import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AstronomicalObjectsPage from '../../../components/AstronomicalObjects';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import rootReducer from '../../../store/reducers';
import { api } from '../../../services/api';
import { useRouter } from 'next/router';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('AstronomicalObjectsPage Component', () => {
  let store: ReturnType<typeof configureStore>;
  const mockPush = vi.fn();

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

    (useRouter as unknown as jest.Mock).mockReturnValue({
      push: mockPush,
      asPath: '',
    });
  });

  it('displays a loading indicator while fetching data', () => {
    render(
      <Provider store={store}>
        <AstronomicalObjectsPage />
      </Provider>
    );

    const loadingElements = screen.getAllByText(/Loading.../i);
    expect(loadingElements).toHaveLength(1);
  });
});
