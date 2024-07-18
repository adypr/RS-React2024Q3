import { combineReducers } from '@reduxjs/toolkit';
import astronomicalObjectsReducer from '../slices/astronomicalObjectsSlice';
import searchReducer from '../slices/searchSlice';
import { api } from '../../services/api';

const rootReducer = combineReducers({
  astronomicalObjects: astronomicalObjectsReducer,
  search: searchReducer,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;
