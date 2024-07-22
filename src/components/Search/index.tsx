import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../store/slices/searchSlice';
import './Search.scss';
import { SearchProps } from '../../models/data.interface';

const Search: React.FC<SearchProps> = ({ onSearchSubmit, initialSearch }) => {
  const [localSearch, setLocalSearch] = useState<string>(initialSearch);
  const dispatch = useDispatch();

  useEffect(() => {
    setLocalSearch(initialSearch);
  }, [initialSearch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(event.target.value);
  };

  const handleSearchSubmit = () => {
    localStorage.setItem('searching', localSearch);
    dispatch(setSearchQuery(localSearch));
    onSearchSubmit(localSearch);
  };

  return (
    <div className="search">
      <input type="text" value={localSearch} onChange={handleSearchChange} />
      <button className="button search__button" onClick={handleSearchSubmit}>
        Search
      </button>
    </div>
  );
};

export default Search;
