import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PageDataState, mainData } from '../../models/data.interface';

const initialState: PageDataState = {
  data: null,
  selectedItems: [],
  isDownloading: false,
  downloadProgress: 0,
};

const pageDataSlice = createSlice({
  name: 'pageData',
  initialState,
  reducers: {
    setPageData: (state, action: PayloadAction<mainData>) => {
      const updatedObjects = action.payload.astronomicalObjects.map((obj) => {
        const isChecked = state.selectedItems.some(
          (item) => item.uid === obj.uid
        );
        return { ...obj, isChecked };
      });
      state.data = { ...action.payload, astronomicalObjects: updatedObjects };
    },
    toggleItemCheck: (state, action: PayloadAction<string>) => {
      const item = state.data?.astronomicalObjects.find(
        (obj) => obj.uid === action.payload
      );
      if (item) {
        item.isChecked = !item.isChecked;
        if (item.isChecked) {
          state.selectedItems.push(item);
        } else {
          state.selectedItems = state.selectedItems.filter(
            (obj) => obj.uid !== action.payload
          );
        }
      }
    },
    clearSelectedItems: (state) => {
      state.selectedItems.forEach((item) => (item.isChecked = false));
      state.selectedItems = [];
    },
    setDownloading: (state, action: PayloadAction<boolean>) => {
      state.isDownloading = action.payload;
      state.downloadProgress = action.payload ? 0 : 100;
    },
    setDownloadProgress: (state, action: PayloadAction<number>) => {
      state.downloadProgress = action.payload;
    },
  },
});

export const {
  setPageData,
  toggleItemCheck,
  clearSelectedItems,
  setDownloading,
  setDownloadProgress,
} = pageDataSlice.actions;

export default pageDataSlice.reducer;
