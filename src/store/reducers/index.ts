import { combineReducers } from '@reduxjs/toolkit';
import pageDataReducer from '../slices/pageDataSlice';
import selectedItemReducer from '../slices/selectedItemSlice';
import searchReducer from '../slices/searchSlice';
import {api} from '../../services/api';

const rootReducer = combineReducers({
  pageData: pageDataReducer,
  selectedItem: selectedItemReducer,
  search: searchReducer,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;
