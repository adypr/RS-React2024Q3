import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { RootState } from '../../../store/store';
import AstronomicalObjectsPage from '../../../components/AstronomicalObjects';
import { setPageData } from '../../../store/slices/pageDataSlice';
import { useRouter } from 'next/router';
import { vi } from 'vitest';
import { mainData } from '../../../models/data.interface';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

const mockStore = configureStore<RootState>([]);

describe('AstronomicalObjectsPage', () => {
  let store: MockStoreEnhanced<RootState>;

  beforeEach(() => {
    store = mockStore({
      pageData: {
        data: {
          astronomicalObjects: [],
          page: {
            firstPage: true,
            lastPage: true,
            numberOfElements: 0,
            pageNumber: 1,
            pageSize: 10,
            totalElements: 0,
            totalPages: 1,
          },
          sort: {
            clauses: [],
          },
        },
        selectedItems: [],
        isDownloading: false,
        downloadProgress: 0,
      },
      selectedItem: {
        item: null,
        loading: false,
      },
      search: {
        query: '',
      },
      api: {
        queries: {},
        mutations: {},
        provided: {},
        subscriptions: {},
        config: {
          refetchOnMountOrArgChange: false,
          refetchOnReconnect: false,
          refetchOnFocus: false,
          reducerPath: 'api',
          online: true,
          focused: true,
          middlewareRegistered: true,
          keepUnusedDataFor: 60,
          invalidationBehavior: 'delayed',
        },
      },
    });

    (useRouter as ReturnType<typeof vi.fn>).mockReturnValue({
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: vi.fn(),
      replace: vi.fn(),
      reload: vi.fn(),
      back: vi.fn(),
      prefetch: vi.fn(),
      beforePopState: vi.fn(),
      isFallback: false,
    });
  });

  it('should dispatch setPageData when data prop is provided', () => {
    const data: mainData = {
      astronomicalObjects: [
        {
          name: 'Earth',
          astronomicalObjectType: 'Planet',
          location: { name: 'Solar System', uid: 'loc1' },
          uid: '1',
        },
      ],
      page: {
        firstPage: true,
        lastPage: true,
        numberOfElements: 1,
        pageNumber: 1,
        pageSize: 10,
        totalElements: 1,
        totalPages: 1,
      },
      sort: {
        clauses: [],
      },
    };

    render(
      <Provider store={store}>
        <AstronomicalObjectsPage data={data} currentPage={1} searchQuery="" />
      </Provider>
    );

    const actions = store.getActions();
    expect(actions).toContainEqual(setPageData(data));
  });

  it('should render LeftSection and RightSection components', () => {
    const data: mainData = {
      astronomicalObjects: [
        {
          name: 'Earth',
          astronomicalObjectType: 'Planet',
          location: { name: 'Solar System', uid: 'loc1' },
          uid: '1',
        },
      ],
      page: {
        firstPage: true,
        lastPage: true,
        numberOfElements: 1,
        pageNumber: 1,
        pageSize: 10,
        totalElements: 1,
        totalPages: 1,
      },
      sort: {
        clauses: [],
      },
    };

    render(
      <Provider store={store}>
        <AstronomicalObjectsPage data={data} currentPage={1} searchQuery="" />
      </Provider>
    );

    expect(screen.getByText('Title: Earth')).toBeInTheDocument();
    expect(screen.getByText('Location: Solar System')).toBeInTheDocument();
  });

  it('should not render anything if no data is provided', () => {
    const emptyData: mainData = {
      astronomicalObjects: [],
      page: {
        firstPage: true,
        lastPage: true,
        numberOfElements: 0,
        pageNumber: 1,
        pageSize: 10,
        totalElements: 0,
        totalPages: 1,
      },
      sort: {
        clauses: [],
      },
    };

    render(
      <Provider store={store}>
        <AstronomicalObjectsPage data={emptyData} currentPage={1} searchQuery="" />
      </Provider>
    );

    expect(screen.queryByText('Title:')).not.toBeInTheDocument();
  });
});
