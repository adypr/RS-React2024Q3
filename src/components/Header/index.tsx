import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../store/slices/searchSlice';
import useTheme from '../../hooks/useTheme';
import Search from '../Search';

interface HeaderProps {
  onEmulateError: () => void;
}

const Header: React.FC<HeaderProps> = ({ onEmulateError }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();
  const [initialSearch, setInitialSearch] = useState<string>('');

  const query = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  useEffect(() => {
    const nameQuery = query.get('name');
    const savedSearch = localStorage.getItem('searching') || '';
    if (nameQuery) {
      dispatch(setSearchQuery(nameQuery));
      setInitialSearch(nameQuery);
    } else if (savedSearch) {
      dispatch(setSearchQuery(savedSearch));
      setInitialSearch(savedSearch);
    }
  }, [query, dispatch]);

  const handleSearchSubmit = (searchQuery: string) => {
    query.set('page', '1');
    if (searchQuery) {
      query.set('name', searchQuery);
    } else {
      query.delete('name');
      localStorage.removeItem('searching');
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
            onSearchSubmit={handleSearchSubmit}
            initialSearch={initialSearch}
          />
          <button className="button" onClick={onEmulateError}>
            Emulate Error
          </button>
          <button className="button" onClick={toggleTheme}>
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
