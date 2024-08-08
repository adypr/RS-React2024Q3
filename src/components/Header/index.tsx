import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../store/slices/searchSlice';
import useTheme from '../../hooks/useTheme';
import Search from '../Search';
import { HeaderProps } from '../../models/data.interface';

const Header: React.FC<HeaderProps> = ({ onEmulateError }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();
  const [initialSearch, setInitialSearch] = useState<string>('');

  const query = useMemo(
    () => new URLSearchParams(router.asPath.split('?')[1]),
    [router.asPath]
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
    router.push({ search: query.toString() });
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
