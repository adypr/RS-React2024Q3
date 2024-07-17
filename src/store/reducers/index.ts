import { combineReducers } from '@reduxjs/toolkit';
import astronomicalObjectsReducer from '../slices/astronomicalObjectsSlice';
import searchReducer from '../slices/searchSlice';

const rootReducer = combineReducers({
  astronomicalObjects: astronomicalObjectsReducer,
  search: searchReducer,
});

export default rootReducer;
