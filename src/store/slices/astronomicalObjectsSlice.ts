import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AstronomicalObject, mainData } from '../../models/data.interface';

interface AstronomicalObjectsState {
  data: mainData | null;
  loading: boolean;
  selectedItem: AstronomicalObject | null;
  rightSectionLoading: boolean;
  selectedItems: AstronomicalObject[];
}

const initialState: AstronomicalObjectsState = {
  data: null,
  loading: false,
  selectedItem: null,
  rightSectionLoading: false,
  selectedItems: [],
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
  },
});

export const { setData, selectItem, setRightSectionLoading, toggleItemCheck } =
  astronomicalObjectsSlice.actions;

export default astronomicalObjectsSlice.reducer;
