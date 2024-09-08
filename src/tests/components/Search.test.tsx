import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import Search from '../../components/Search';
import { setSearchQuery } from '../../store/slices/searchSlice';
import { RootState } from '../../models/data.interface';

const mockStore = configureStore<RootState>();

describe('Search component', () => {
  let store: MockStoreEnhanced<RootState>;
  let setItemSpy: ReturnType<typeof vi.fn>;
  let getItemSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    store = mockStore({
      search: {
        query: '',
      },
    });

    setItemSpy = vi.fn();
    getItemSpy = vi.fn().mockReturnValue('mocked search value');

    Object.defineProperty(global, 'localStorage', {
      value: {
        setItem: setItemSpy,
        getItem: getItemSpy,
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('saves entered value to local storage when Search button is clicked', () => {
    render(
      <Provider store={store}>
        <Search onSearchSubmit={vi.fn()} initialSearch="" />
      </Provider>
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'new search value' } });
    fireEvent.click(button);

    expect(setItemSpy).toHaveBeenCalledWith('searching', 'new search value');

    const actions = store.getActions();
    expect(actions).toContainEqual(setSearchQuery('new search value'));
  });

  it('retrieves value from local storage upon mounting', () => {
    render(
      <Provider store={store}>
        <Search onSearchSubmit={vi.fn()} initialSearch="mocked search value" />
      </Provider>
    );

    const input = screen.getByRole('textbox');

    expect(input).toHaveValue('mocked search value');
  });
});
