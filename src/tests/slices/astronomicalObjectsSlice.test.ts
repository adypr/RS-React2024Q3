import { expect, test } from 'vitest';
import reducer, {
  setData,
  selectItem,
  setRightSectionLoading,
  toggleItemCheck,
  clearSelectedItems,
  setDownloading,
  setDownloadProgress,
} from '../../store/slices/astronomicalObjectsSlice';
import { AstronomicalObject, mainData } from '../../models/data.interface';

const initialState = {
  data: null,
  loading: false,
  selectedItem: null,
  rightSectionLoading: false,
  selectedItems: [],
  isDownloading: false,
  downloadProgress: 0,
};

const data: mainData = {
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

const item: AstronomicalObject = {
  uid: '1',
  name: 'Object 1',
  astronomicalObjectType: 'Type 1',
  location: { uid: 'loc1', name: 'Location 1' },
};

test('should handle initial state', () => {
  expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
});

test('should handle setData', () => {
  const actual = reducer(initialState, setData(data));
  expect(actual.data).toEqual({
    ...data,
    astronomicalObjects: data.astronomicalObjects.map(
      (obj: AstronomicalObject) => ({ ...obj, isChecked: false })
    ),
  });
});

test('should handle selectItem', () => {
  const actual = reducer(initialState, selectItem(item));
  expect(actual.selectedItem).toEqual(item);
  expect(actual.rightSectionLoading).toEqual(true);
});

test('should handle setRightSectionLoading', () => {
  const actual = reducer(initialState, setRightSectionLoading(true));
  expect(actual.rightSectionLoading).toEqual(true);
});

test('should handle toggleItemCheck', () => {
  const stateWithData = reducer(initialState, setData(data));
  const actual = reducer(stateWithData, toggleItemCheck('1'));
  expect(actual.selectedItems.length).toEqual(1);
  expect(actual.selectedItems[0].uid).toEqual('1');
  expect(actual.data?.astronomicalObjects[0].isChecked).toEqual(true);
});

test('should handle clearSelectedItems', () => {
  const stateWithSelectedItems = {
    ...initialState,
    data: {
      ...data,
      astronomicalObjects: data.astronomicalObjects.map(
        (obj: AstronomicalObject) => ({ ...obj, isChecked: true })
      ),
    },
    selectedItems: data.astronomicalObjects.map((obj: AstronomicalObject) => ({
      ...obj,
      isChecked: true,
    })),
  };
  const actual = reducer(stateWithSelectedItems, clearSelectedItems());
  expect(actual.selectedItems.length).toEqual(0);
  if (actual.data) {
    actual.data.astronomicalObjects.forEach((obj: AstronomicalObject) => {
      expect(obj.isChecked).toEqual(false);
    });
  }
});

test('should handle setDownloading', () => {
  const actual = reducer(initialState, setDownloading(true));
  expect(actual.isDownloading).toEqual(true);
  expect(actual.downloadProgress).toEqual(0);
});

test('should handle setDownloadProgress', () => {
  const actual = reducer(initialState, setDownloadProgress(50));
  expect(actual.downloadProgress).toEqual(50);
});
