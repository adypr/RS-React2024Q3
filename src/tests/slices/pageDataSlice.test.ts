import pageDataReducer, {
  setPageData,
  toggleItemCheck,
  clearSelectedItems,
  setDownloading,
  setDownloadProgress,
} from '../../store/slices/pageDataSlice';
import { mainData } from '../../models/data.interface';

const initialState = {
  data: null,
  selectedItems: [],
  isDownloading: false,
  downloadProgress: 0,
};

const mockData: mainData = {
  astronomicalObjects: [
    {
      uid: '1',
      name: 'Object 1',
      astronomicalObjectType: 'Type 1',
      location: { uid: '1', name: 'Location 1' },
      isChecked: false,
    },
    {
      uid: '2',
      name: 'Object 2',
      astronomicalObjectType: 'Type 2',
      location: { uid: '2', name: 'Location 2' },
      isChecked: false,
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

describe('pageDataSlice', () => {
  test('should return the initial state', () => {
    expect(pageDataReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  test('should handle setPageData', () => {
    const newState = pageDataReducer(initialState, setPageData(mockData));
    const expectedState = {
      ...mockData,
      astronomicalObjects: mockData.astronomicalObjects.map((obj) => ({
        ...obj,
        isChecked: false,
      })),
    };
    expect(newState.data).toEqual(expectedState);
  });

  test('should handle toggleItemCheck', () => {
    const initialStateWithData = {
      ...initialState,
      data: mockData,
    };
    const newState = pageDataReducer(
      initialStateWithData,
      toggleItemCheck('1')
    );
    expect(newState.selectedItems).toHaveLength(1);
    expect(newState.selectedItems[0].uid).toBe('1');
  });

  test('should handle clearSelectedItems', () => {
    const initialStateWithSelected = {
      ...initialState,
      selectedItems: [{ ...mockData.astronomicalObjects[0], isChecked: true }],
    };
    const newState = pageDataReducer(
      initialStateWithSelected,
      clearSelectedItems()
    );
    expect(newState.selectedItems).toHaveLength(0);
  });

  test('should handle setDownloading', () => {
    const newState = pageDataReducer(initialState, setDownloading(true));
    expect(newState.isDownloading).toBe(true);
  });

  test('should handle setDownloadProgress', () => {
    const newState = pageDataReducer(initialState, setDownloadProgress(50));
    expect(newState.downloadProgress).toBe(50);
  });
});
