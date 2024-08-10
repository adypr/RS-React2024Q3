import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import CardList from '../../components/CardList';
import { AstronomicalObject } from '../../models/data.interface';
import { RootState } from '../../store/store';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { toggleItemCheck } from '../../store/slices/pageDataSlice';

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

    const titleElement = screen.getByText(/Object 1/i);
    fireEvent.click(titleElement);

    expect(onItemClick).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'click' }),
      mockData[0]
    );
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

  it('renders checkboxes for each card', () => {
    render(
      <Provider store={store}>
        <CardList data={mockData} onItemClick={vi.fn()} />
      </Provider>
    );

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(mockData.length);

    checkboxes.forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
    });
  });

  it('toggles checkbox state when clicked', () => {
    render(
      <Provider store={store}>
        <CardList data={mockData} onItemClick={vi.fn()} />
      </Provider>
    );

    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);

    expect(store.getActions()).toContainEqual(toggleItemCheck(mockData[0].uid));
  });

  it('applies correct CSS classes to card elements', () => {
    render(
      <Provider store={store}>
        <CardList data={mockData} onItemClick={vi.fn()} />
      </Provider>
    );

    mockData.forEach((obj) => {
      const card = screen.getByText(`Title: ${obj.name}`).closest('.card');
      expect(card).toHaveClass('card');
    });
  });

  it('handles items without location gracefully', () => {
    const mockDataWithoutLocation: AstronomicalObject[] = [
      ...mockData,
      {
        uid: '3',
        name: 'Object 3',
        astronomicalObjectType: 'Type 3',
        location: { uid: null, name: null },
      },
    ];

    render(
      <Provider store={store}>
        <CardList data={mockDataWithoutLocation} onItemClick={vi.fn()} />
      </Provider>
    );

    const locationText = screen.getByText(
      (content, element) =>
        element?.tagName.toLowerCase() === 'p' &&
        content.startsWith('Location:') &&
        !content.includes('Location 1') &&
        !content.includes('Location 2')
    );

    expect(locationText).toBeInTheDocument();
    expect(locationText).toHaveTextContent('Location:');
  });

  it('renders checked checkboxes for selected items', () => {
    const selectedData: AstronomicalObject[] = [
      ...mockData,
      {
        uid: '3',
        name: 'Object 3',
        astronomicalObjectType: 'Type 3',
        location: { uid: null, name: null },
      },
    ];

    store = mockStore({
      pageData: {
        data: null,
        selectedItems: [selectedData[2]],
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

    render(
      <Provider store={store}>
        <CardList data={selectedData} onItemClick={vi.fn()} />
      </Provider>
    );

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(selectedData.length);

    checkboxes.forEach((checkbox, index) => {
      if (index === 2) {
        expect(checkbox).toBeChecked();
      } else {
        expect(checkbox).not.toBeChecked();
      }
    });
  });

  it('handles items with empty name or location gracefully', () => {
    const dataWithEmptyFields: AstronomicalObject[] = [
      {
        uid: '4',
        name: '',
        astronomicalObjectType: 'Type 4',
        location: { uid: '4', name: '' },
      },
    ];

    render(
      <Provider store={store}>
        <CardList data={dataWithEmptyFields} onItemClick={vi.fn()} />
      </Provider>
    );

    expect(screen.getByText(/Title:/i)).toBeInTheDocument();
    expect(screen.getByText(/Type: Type 4/i)).toBeInTheDocument();
    expect(screen.getByText(/Location:/i)).toBeInTheDocument();
  });
});
