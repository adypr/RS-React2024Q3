import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import DownloadHandler from '../../../components/AstronomicalObjects/DownloadHandler';
import { vi } from 'vitest';

global.URL.createObjectURL = vi.fn(() => 'mock-url');

const mockStore = configureStore([]);

describe('DownloadHandler', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      pageData: {
        selectedItems: [
          {
            uid: '1',
            name: 'Object 1',
            astronomicalObjectType: 'Star',
            location: { name: 'Location 1' },
          },
          {
            uid: '2',
            name: 'Object 2',
            astronomicalObjectType: 'Planet',
            location: { name: 'Location 2' },
          },
        ],
        isDownloading: false,
        downloadProgress: 0,
      },
    });

    store.dispatch = vi.fn();
  });

  test('renders with selected items and buttons', () => {
    render(
      <Provider store={store}>
        <DownloadHandler />
      </Provider>
    );

    expect(screen.getByText('Selected 2 items:')).toBeInTheDocument();
    expect(screen.getByText('Object 1')).toBeInTheDocument();
    expect(screen.getByText('Object 2')).toBeInTheDocument();
    expect(screen.getByText('Unselect all')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Download' })
    ).toBeInTheDocument();
  });

  test('handles download action', () => {
    render(
      <Provider store={store}>
        <DownloadHandler />
      </Provider>
    );

    const downloadButton = screen.getByRole('button', { name: 'Download' });
    fireEvent.click(downloadButton);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'pageData/setDownloading',
      payload: true,
    });
  });

  test('handles unselect all action', () => {
    render(
      <Provider store={store}>
        <DownloadHandler />
      </Provider>
    );

    const unselectAllButton = screen.getByText('Unselect all');
    fireEvent.click(unselectAllButton);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'pageData/clearSelectedItems',
    });
  });
});
