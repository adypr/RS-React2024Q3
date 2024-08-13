import React from 'react';
import { render, screen } from '@testing-library/react';
import Home, { getServerSideProps } from '../../pages/index';
import { HomeProps } from '../../models/data.interface';
import { fetchAstronomicalObjects } from '../../services/api';
import { mainData } from '../../models/data.interface';
import { GetServerSidePropsContext } from 'next';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { vi } from 'vitest';
import rootReducer from '../../store/reducers';
import * as apiModule from '../../services/api';
import { useRouter } from 'next/router';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('../../services/api', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof apiModule;
  return {
    ...actual,
    fetchAstronomicalObjects: vi.fn(),
    api: {
      reducerPath: 'api',
      reducer: (state = {}) => state,
    },
  };
});

describe('Home Page', () => {
  const mockData: mainData = {
    astronomicalObjects: [
      {
        astronomicalObjectType: 'Planet',
        location: {
          uid: 'loc1',
          name: 'Location 1',
        },
        name: 'Object 1',
        uid: 'obj1',
        isChecked: true,
      },
      {
        astronomicalObjectType: 'Star',
        location: {
          uid: 'loc2',
          name: 'Location 2',
        },
        name: 'Object 2',
        uid: 'obj2',
      },
    ],
    page: {
      firstPage: true,
      lastPage: false,
      numberOfElements: 2,
      pageNumber: 1,
      pageSize: 10,
      totalElements: 2,
      totalPages: 1,
    },
    sort: {
      clauses: [],
    },
  };

  const store = configureStore({
    reducer: rootReducer,
  });

  const mockPush = vi.fn();
  (useRouter as jest.Mock).mockReturnValue({
    push: mockPush,
    query: {},
    pathname: '/',
    asPath: '/',
    route: '/',
  });

  beforeEach(() => {
    (fetchAstronomicalObjects as jest.Mock).mockResolvedValue(mockData);
  });

  const renderWithProvider = (ui: React.ReactElement) => {
    return render(<Provider store={store}>{ui}</Provider>);
  };

  it('getServerSideProps fetches data and returns props', async () => {
    const context = {
      query: {
        page: '1',
        name: 'Object 1',
      },
    } as unknown as GetServerSidePropsContext;

    const result = await getServerSideProps(context);

    expect(result).toEqual({
      props: {
        data: mockData,
        currentPage: 1,
        searchQuery: 'Object 1',
      },
    });
    expect(fetchAstronomicalObjects).toHaveBeenCalledWith({ currentPage: 1, searchQuery: 'Object 1' });
  });

  it('handles pagination and search query correctly', async () => {
    const context = {
      query: {
        page: '2',
        name: 'Object 2',
      },
    } as unknown as GetServerSidePropsContext;

    const result = await getServerSideProps(context);

    expect(result).toEqual({
      props: {
        data: mockData,
        currentPage: 2,
        searchQuery: 'Object 2',
      },
    });
    expect(fetchAstronomicalObjects).toHaveBeenCalledWith({ currentPage: 2, searchQuery: 'Object 2' });
  });
});
