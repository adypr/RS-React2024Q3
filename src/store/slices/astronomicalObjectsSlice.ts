import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AstronomicalObject, mainData } from '../../models/data.interface';

interface AstronomicalObjectsState {
  data: mainData | null;
  loading: boolean;
  selectedItem: AstronomicalObject | null;
  rightSectionLoading: boolean;
  selectedItems: AstronomicalObject[];
  isDownloading: boolean;
  downloadProgress: number;
}

const initialState: AstronomicalObjectsState = {
  data: null,
  loading: false,
  selectedItem: null,
  rightSectionLoading: false,
  selectedItems: [],
  isDownloading: false,
  downloadProgress: 0,
};

const astronomicalObjectsSlice = createSlice({
  name: 'astronomicalObjects',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<mainData>) => {
      const updatedObjects = action.payload.astronomicalObjects.map((obj) => {
        const isChecked = state.selectedItems.some(
          (item) => item.uid === obj.uid
        );
        return { ...obj, isChecked };
      });
      state.data = { ...action.payload, astronomicalObjects: updatedObjects };
    },
    selectItem: (state, action: PayloadAction<AstronomicalObject | null>) => {
      state.selectedItem = action.payload;
      state.rightSectionLoading = action.payload !== null;
    },
    setRightSectionLoading: (state, action: PayloadAction<boolean>) => {
      state.rightSectionLoading = action.payload;
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
      if (state.data) {
        state.data.astronomicalObjects.forEach((item) => {
          item.isChecked = false;
        });
      }
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
  setData,
  selectItem,
  setRightSectionLoading,
  toggleItemCheck,
  clearSelectedItems,
  setDownloading,
  setDownloadProgress,
} = astronomicalObjectsSlice.actions;

export default astronomicalObjectsSlice.reducer;
