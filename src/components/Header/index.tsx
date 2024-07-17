import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Search from '../Search';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface HeaderProps {
  onEmulateError: () => void;
}

const Header: React.FC<HeaderProps> = ({ onEmulateError }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searching = useSelector((state: RootState) => state.search.query);

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
          <Search onSearchSubmit={handleSearchSubmit} />
          <button className="button" onClick={onEmulateError}>
            Emulate Error
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
