import React from 'react';
import './Search.scss';

interface SearchProps {
  searching: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: () => void;
}

const Search: React.FC<SearchProps> = ({
  searching,
  onSearchChange,
  onSearchSubmit,
}) => (
  <div className="search">
    <input type="text" value={searching} onChange={onSearchChange} />
    <button className="button search__button" onClick={onSearchSubmit}>
      Search
    </button>
  </div>
);

export default Search;
