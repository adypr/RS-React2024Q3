import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AstronomicalObject, mainData } from '../../models/data.interface';
import { fetchData } from '../../services/api';

interface AstronomicalObjectsState {
  data: mainData | null;
  loading: boolean;
  selectedItem: AstronomicalObject | null;
  rightSectionLoading: boolean;
}

const initialState: AstronomicalObjectsState = {
  data: null,
  loading: false,
  selectedItem: null,
  rightSectionLoading: false,
};

export const fetchAstronomicalObjects = createAsyncThunk(
  'astronomicalObjects/fetch',
  async ({
    currentPage,
    searchQuery,
  }: {
    currentPage: number;
    searchQuery: string;
  }) => {
    const response = await fetchData(currentPage, searchQuery);
    return response;
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(fetchAstronomicalObjects.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAstronomicalObjects.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAstronomicalObjects.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { selectItem, setRightSectionLoading } =
  astronomicalObjectsSlice.actions;

export default astronomicalObjectsSlice.reducer;
