import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { Action } from 'redux';
import LeftSection from '../../../pages/AstronomicalObjectsPage/LeftSection';
import { LeftSectionProps } from '../../../models/data.interface';
import { RootState } from '../../../store/store';
import {
  setSelectedItem,
  setLoading,
} from '../../../store/slices/selectedItemSlice';

const mockStore = configureStore<RootState, Action>([]);

describe('LeftSection Component', () => {
  let store: MockStoreEnhanced<RootState, Action>;
  let props: LeftSectionProps;

  beforeEach(() => {
    store = mockStore({
      selectedItem: {
        item: null,
        loading: false,
      },
      pageData: {
        data: null,
        selectedItems: [],
        isDownloading: false,
        downloadProgress: 0,
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
          keepUnusedDataFor: 60,
          refetchOnFocus: false,
          refetchOnReconnect: false,
          refetchOnMountOrArgChange: false,
          online: true,
          focused: false,
          middlewareRegistered: false,
          invalidationBehavior: 'immediately',
        },
      },
    });

    props = {
      isFetching: false,
      isError: false,
      error: null,
      storedData: {
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
      },
      currentPage: 1,
    };
  });

  it('should display loading message when fetching', () => {
    render(
      <Provider store={store}>
        <Router>
          <LeftSection {...props} isFetching={true} />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('should display error message when error occurs', () => {
    props.isError = true;
    props.error = 'Network Error';

    render(
      <Provider store={store}>
        <Router>
          <LeftSection {...props} />
        </Router>
      </Provider>
    );

    const errorMessage = screen.getByText((_, element) => {
      const hasText = (node: HTMLElement) =>
        node.textContent === 'Error: "Network Error"';
      const nodeHasText = hasText(element as HTMLElement);
      const childrenDontHaveText = Array.from(element?.children || []).every(
        (child) => !hasText(child as HTMLElement)
      );
      return nodeHasText && childrenDontHaveText;
    });

    expect(errorMessage).toBeInTheDocument();
  });

  it('should display data when available', () => {
    render(
      <Provider store={store}>
        <Router>
          <LeftSection {...props} />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Object 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Object 2/i)).toBeInTheDocument();
  });

  it('should navigate to item details on click', () => {
    render(
      <Provider store={store}>
        <Router>
          <LeftSection {...props} />
        </Router>
      </Provider>
    );

    const object1 = screen.getByText(/Object 1/i);
    fireEvent.click(object1);

    const actions = store.getActions();
    const selectedItem = props.storedData?.astronomicalObjects[0];

    if (selectedItem) {
      expect(actions).toEqual([
        setSelectedItem(selectedItem),
        setLoading(true),
      ]);
    } else {
      throw new Error('Selected item should not be undefined');
    }
  });
});
