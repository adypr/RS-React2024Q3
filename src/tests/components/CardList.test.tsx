import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import CardList from '../../components/CardList';
import { AstronomicalObject } from '../../models/data.interface';
import { RootState } from '../../store/store';
import { describe, it, expect, beforeEach, vi } from 'vitest';

const mockStore = configureStore<RootState>();

const mockData: AstronomicalObject[] = [
  {
    uid: '1',
    name: 'Object 1',
    astronomicalObjectType: 'Type 1',
    location: { uid: '1', name: 'Location 1' },
  },
  {
    uid: '2',
    name: 'Object 2',
    astronomicalObjectType: 'Type 2',
    location: { uid: '2', name: 'Location 2' },
  },
];

describe('CardList Component', () => {
  let store: MockStoreEnhanced<RootState>;

  beforeEach(() => {
    store = mockStore({
      pageData: {
        data: null,
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
    });
    vi.clearAllMocks();
  });

  it('renders CardList component', () => {
    render(
      <Provider store={store}>
        <CardList data={mockData} onItemClick={vi.fn()} />
      </Provider>
    );

    expect(screen.getByText(/Object 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Object 2/i)).toBeInTheDocument();
  });

  it('calls onItemClick when card title is clicked', () => {
    const onItemClick = vi.fn();

    render(
      <Provider store={store}>
        <CardList data={mockData} onItemClick={onItemClick} />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Object 1/i));
    expect(onItemClick).toHaveBeenCalledWith(mockData[0]);
  });

  it('renders the specified number of cards', () => {
    render(
      <Provider store={store}>
        <CardList data={mockData} onItemClick={vi.fn()} />
      </Provider>
    );

    const cards = screen.getAllByRole('heading', { level: 3 });
    expect(cards).toHaveLength(mockData.length);
  });

  it('displays an appropriate message if no cards are present', () => {
    render(
      <Provider store={store}>
        <CardList data={[]} onItemClick={vi.fn()} />
      </Provider>
    );

    expect(screen.getByText(/Nothing found/i)).toBeInTheDocument();
  });

  it('renders the relevant card data', () => {
    render(
      <Provider store={store}>
        <CardList data={mockData} onItemClick={vi.fn()} />
      </Provider>
    );

    mockData.forEach((obj) => {
      expect(screen.getByText(`Title: ${obj.name}`)).toBeInTheDocument();
      expect(
        screen.getByText(`Type: ${obj.astronomicalObjectType}`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Location: ${obj.location.name}`)
      ).toBeInTheDocument();
    });
  });

  it('triggers onItemClick when card title is clicked', () => {
    const onItemClick = vi.fn();

    render(
      <Provider store={store}>
        <CardList data={mockData} onItemClick={onItemClick} />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Object 1/i));

    expect(onItemClick).toHaveBeenCalled();
  });
});
