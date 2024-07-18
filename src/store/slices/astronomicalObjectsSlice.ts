import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AstronomicalObject } from '../../models/data.interface';

interface AstronomicalObjectsState {
  selectedItem: AstronomicalObject | null;
  rightSectionLoading: boolean;
}

const initialState: AstronomicalObjectsState = {
  selectedItem: null,
  rightSectionLoading: false,
};

const astronomicalObjectsSlice = createSlice({
  name: 'astronomicalObjects',
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<AstronomicalObject | null>) => {
      state.selectedItem = action.payload;
      state.rightSectionLoading = action.payload !== null;
    },
    setRightSectionLoading: (state, action: PayloadAction<boolean>) => {
      state.rightSectionLoading = action.payload;
    },
  },
});

export const { selectItem, setRightSectionLoading } =
  astronomicalObjectsSlice.actions;

export default astronomicalObjectsSlice.reducer;
