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
}) => {
  return (
    <div>
      <input type="text" value={searching} onChange={onSearchChange} />
      <button className="button button_search" onClick={onSearchSubmit}>
        Search
      </button>
    </div>
  );
};

export default Search;
