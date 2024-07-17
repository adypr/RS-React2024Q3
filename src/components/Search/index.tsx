import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setSearchQuery } from '../../store/slices/searchSlice';
import './Search.scss';

interface SearchProps {
  onSearchSubmit: () => void;
}

const Search: React.FC<SearchProps> = ({ onSearchSubmit }) => {
  const dispatch = useDispatch();
  const searching = useSelector((state: RootState) => state.search.query);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  return (
    <div className="search">
      <input type="text" value={searching} onChange={handleSearchChange} />
      <button className="button search__button" onClick={onSearchSubmit}>
        Search
      </button>
    </div>
  );
};

export default Search;
