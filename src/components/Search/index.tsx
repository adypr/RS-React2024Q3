import React, { ChangeEvent } from 'react';
import './Search.scss';

interface SearchProps {
  searching: string;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: () => void;
}

const Search: React.FC<SearchProps> = ({
  searching,
  onSearchChange,
  onSearchSubmit,
}) => {
  const handleBlur = () => {
    if (!searching.trim()) {
      localStorage.removeItem('searching');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searching}
        onChange={onSearchChange}
        onBlur={handleBlur}
      />
      <button onClick={onSearchSubmit}>Search</button>
    </div>
  );
};

export default Search;
