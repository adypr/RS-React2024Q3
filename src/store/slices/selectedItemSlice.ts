import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AstronomicalObject } from '../../models/data.interface';

interface SelectedItemState {
  item: AstronomicalObject | null;
  loading: boolean;
}

const initialState: SelectedItemState = {
  item: null,
  loading: false,
};

const selectedItemSlice = createSlice({
  name: 'selectedItem',
  initialState,
  reducers: {
    setSelectedItem: (
      state,
      action: PayloadAction<AstronomicalObject | null>
    ) => {
      state.item = action.payload;
      state.loading = action.payload !== null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setSelectedItem, setLoading } = selectedItemSlice.actions;

export default selectedItemSlice.reducer;
