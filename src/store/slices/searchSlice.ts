import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchState } from '../../models/data.interface';

const initialState: SearchState = {
  query: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      localStorage.setItem('searching', action.payload);
    },
  },
});

export const { setSearchQuery } = searchSlice.actions;

export default searchSlice.reducer;
