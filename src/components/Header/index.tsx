import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Search from '../Search';

interface HeaderProps {
  searching: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEmulateError: () => void;
}

const Header: React.FC<HeaderProps> = ({
  searching,
  onSearchChange,
  onEmulateError,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);

  const handleSearchSubmit = () => {
    query.set('page', '1');
    if (searching) {
      query.set('name', searching);
    } else {
      query.delete('name');
      localStorage.removeItem('data');
    }
    navigate({ search: query.toString() });
  };

  return (
    <header className="header">
      <div className="wrapper">
        <h1>Star Trek</h1>
        <h2>Astronomical Objects</h2>
        <div className="buttons">
          <Search
            searching={searching}
            onSearchChange={onSearchChange}
            onSearchSubmit={handleSearchSubmit}
          />
          <button className="button" onClick={onEmulateError}>
            Emulate Error
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
