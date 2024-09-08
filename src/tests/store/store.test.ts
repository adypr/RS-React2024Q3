import { configureStore } from '@reduxjs/toolkit';
import { expect, test } from 'vitest';
import rootReducer from '../../store/reducers';
import { api } from '../../services/api';
import {
  setPageData,
  toggleItemCheck,
  clearSelectedItems,
} from '../../store/slices/pageDataSlice';
import { setSelectedItem } from '../../store/slices/selectedItemSlice';
import { setSearchQuery } from '../../store/slices/searchSlice';
import { mainData } from '../../models/data.interface';

const createTestStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });

const data: mainData = {
  astronomicalObjects: [
    {
      uid: '1',
      name: 'Object 1',
      astronomicalObjectType: 'Type 1',
      location: { uid: 'loc1', name: 'Location 1' },
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
  sort: { clauses: [] },
};

const dataWithCheckedItem: mainData = {
  ...data,
  astronomicalObjects: [{ ...data.astronomicalObjects[0], isChecked: true }],
};

test('should handle setting page data', () => {
  const store = createTestStore();
  store.dispatch(setPageData(data));
  const state = store.getState().pageData;
  expect(state.data).toEqual({
    ...data,
    astronomicalObjects: data.astronomicalObjects.map((obj) => ({
      ...obj,
      isChecked: false,
    })),
  });
});

test('should handle toggling item check', () => {
  const store = createTestStore();
  store.dispatch(setPageData(data));
  store.dispatch(toggleItemCheck('1'));

  const state = store.getState().pageData;
  expect(state.selectedItems.length).toBe(1);
  expect(state.selectedItems[0].uid).toBe('1');
});

test('should handle clearing selected items', () => {
  const store = createTestStore();
  store.dispatch(setPageData(dataWithCheckedItem));
  store.dispatch(clearSelectedItems());

  const state = store.getState().pageData;
  expect(state.selectedItems.length).toBe(0);
  expect(state.data?.astronomicalObjects[0].isChecked).toBe(false);
});

test('should handle setting selected item', () => {
  const store = createTestStore();
  const item = {
    uid: '1',
    name: 'Object 1',
    astronomicalObjectType: 'Type 1',
    location: { uid: 'loc1', name: 'Location 1' },
  };

  store.dispatch(setSelectedItem(item));
  const state = store.getState().selectedItem;
  expect(state.item).toEqual(item);
  expect(state.loading).toBe(true);
});

test('should handle setting search query', () => {
  const store = createTestStore();

  store.dispatch(setSearchQuery('new query'));
  const state = store.getState().search;
  expect(state.query).toBe('new query');
});
