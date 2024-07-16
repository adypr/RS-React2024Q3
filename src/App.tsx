import React, {
  ChangeEvent,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Search from './components/Search';
import './App.scss';

import {
  mainData,
  AstronomicalObjects,
  AstronomicalObject,
} from './models/data.interface';

interface MainState {
  data: mainData | null;
  loading: boolean;
  emulateError: boolean;
  selectedItem: AstronomicalObject | null;
  rightSectionLoading: boolean;
}

const App: React.FC = () => {
  const [searching, setSearching] = useState<string>(
    localStorage.getItem('searching') || ''
  );
  const [state, setState] = useState<MainState>({
    data: null,
    loading: false,
    emulateError: false,
    selectedItem: null,
    rightSectionLoading: false,
  });

  const navigate = useNavigate();
  const location = useLocation();

  const query = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const currentPage = useMemo(
    () => parseInt(query.get('page') || '1', 10),
    [query]
  );
  const searchQuery = useMemo(() => query.get('name') || '', [query]);

  const fetchData = useCallback(() => {
    setState((prevState) => ({ ...prevState, loading: true }));

    let apiUrl = `https://stapi.co/api/v2/rest/astronomicalObject/search?pageNumber=${currentPage - 1}&pageSize=10`;
    if (searchQuery) {
      apiUrl += `&name=${searchQuery}`;
    }

    fetch(apiUrl, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          setState((prevState) => ({ ...prevState, data, loading: false }));
          localStorage.setItem('data', JSON.stringify(data));
        }, 500);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setState((prevState) => ({ ...prevState, loading: false }));
      });
  }, [searchQuery, currentPage]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearching(value);
  };

  const handleSearchSubmit = () => {
    localStorage.setItem('searching', searching);
    query.set('page', '1');
    if (searching) {
      query.set('name', searching);
    } else {
      query.delete('name');
      localStorage.removeItem('data');
    }
    navigate({ search: query.toString() });
  };

  const handleThrowError = () => {
    setState((prevState) => ({ ...prevState, emulateError: true }));
  };

  const handlePageChange = (newPage: number) => {
    query.set('page', newPage.toString());
    navigate({ search: query.toString() });
  };

  const handleItemClick = (item: AstronomicalObject) => {
    setState((prevState) => ({
      ...prevState,
      selectedItem: item,
      rightSectionLoading: true,
    }));
    query.set('details', item.uid);
    navigate({ search: query.toString() });

    setTimeout(() => {
      setState((prevState) => ({ ...prevState, rightSectionLoading: false }));
    }, 500);
  };

  const closeDetails = useCallback(() => {
    setState((prevState) => ({ ...prevState, selectedItem: null }));
    query.delete('details');
    navigate({ search: query.toString() });
  }, [navigate, query]);

  const renderList = (data: AstronomicalObjects) => {
    if (!data.length) return <h2 className="not-found">Nothing found</h2>;

    return data.map((obj) => (
      <div className="card" key={obj.uid} onClick={() => handleItemClick(obj)}>
        <h3 className="card__title">Title: {obj.name}</h3>
        <p className="card__type">Type: {obj.astronomicalObjectType}</p>
        <p className="card__location">
          Location: {obj.location ? obj.location.name : 'Unknown location'}
        </p>
      </div>
    ));
  };

  const renderPagination = () => {
    const totalPages = state.data ? state.data.page.totalPages : 1;
    const maxPagesToShow = 5;
    const pages = [];

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return (
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {pages.map((page, index) => (
          <button
            key={index}
            className={page === currentPage ? 'active' : ''}
            onClick={() => typeof page === 'number' && handlePageChange(page)}
            disabled={typeof page !== 'number'}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          &gt;
        </button>
      </div>
    );
  };

  useEffect(() => {
    const savedData = localStorage.getItem('data');
    if (savedData && searchQuery === '' && currentPage === 1) {
      setState((prevState) => ({ ...prevState, data: JSON.parse(savedData) }));
    } else {
      fetchData();
    }
  }, [fetchData, currentPage, searchQuery]);

  const { data, loading, emulateError, selectedItem, rightSectionLoading } =
    state;

  if (emulateError) {
    throw new Error('Emulate error!');
  }

  return (
    <>
      <header className="header">
        <div className="wrapper">
          <h1>Star Trek</h1>
          <h2>Astronomical Objects</h2>
          <div className="buttons">
            <Search
              searching={searching}
              onSearchChange={handleSearchChange}
              onSearchSubmit={handleSearchSubmit}
            />
            <button className="button" onClick={handleThrowError}>
              Emulate Error
            </button>
          </div>
        </div>
      </header>
      <main>
        <div className="wrapper">
          <div className="content">
            <div className="left-section">
              {loading && <div className="loading"></div>}
              {data && !loading && (
                <div className="card-list">
                  {renderList(data.astronomicalObjects)}
                </div>
              )}
              {renderPagination()}
            </div>
            <div className="right-section">
              {rightSectionLoading && <div className="loading"></div>}
              {!rightSectionLoading && selectedItem && (
                <div className="details">
                  <button onClick={closeDetails}>🗙</button>
                  <h3>{selectedItem.name}</h3>
                  <p>Type: {selectedItem.astronomicalObjectType}</p>
                  <p>
                    Location:{' '}
                    {selectedItem.location
                      ? selectedItem.location.name
                      : 'Unknown location'}
                  </p>
                  <img src="https://spaceholder.cc/i/800x600" alt="Star Trek" />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <footer className="footer">
        <div className="wrapper">The Rolling Scopes School, 2024</div>
      </footer>
    </>
  );
};

export default App;
