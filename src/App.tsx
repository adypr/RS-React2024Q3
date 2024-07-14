import React, { ChangeEvent, useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Search from './components/Search';
import './App.scss';

import { mainData, AstronomicalObjects, AstronomicalObject } from './models/data.interface';

interface MainState {
  data: mainData | null;
  loading: boolean;
  emulateError: boolean;
  selectedItem: AstronomicalObject | null;
  loadingRight: boolean;
}

const App: React.FC = () => {
  const [searching, setSearching] = useState<string>(localStorage.getItem('searching') || '');
  const [state, setState] = useState<MainState>({
    data: null,
    loading: false,
    emulateError: false,
    selectedItem: null,
    loadingRight: false,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get('page') || '1', 10);
  const searchQuery = query.get('name') || '';

  const fetchData = useCallback(() => {
    setState((prevState) => ({ ...prevState, loading: true }));

    const params = new URLSearchParams();
    params.append('pageNumber', (currentPage - 1).toString());
    params.append('pageSize', '10');
    if (searchQuery) {
      params.append('name', searchQuery);
    }

    fetch(`https://stapi.co/api/v2/rest/astronomicalObject/search?pageNumber=${currentPage - 1}&pageSize=10&name=${searchQuery}`, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      body: params.toString(),
    })
      .then((response) => response.json())
      .then((data) => {
        setState((prevState) => ({ ...prevState, data, loading: false }));
        localStorage.setItem('data', JSON.stringify(data));
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
    query.set('name', searching);
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
    setState((prevState) => ({ ...prevState, selectedItem: item, loadingRight: true }));
    query.set('details', item.uid);
    navigate({ search: query.toString() });

    setTimeout(() => {
      setState((prevState) => ({ ...prevState, loadingRight: false }));
    }, 1000);
  };

  const closeDetails = () => {
    setState((prevState) => ({ ...prevState, selectedItem: null }));
    query.delete('details');
    navigate({ search: query.toString() });
  };

  const renderList = (data: AstronomicalObjects) => {
    if (!data.length) return <div>Nothing found</div>;

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

  useEffect(() => {
    const savedData = localStorage.getItem('data');
    if (savedData && searchQuery === '' && currentPage === 1) {
      setState((prevState) => ({ ...prevState, data: JSON.parse(savedData) }));
    } else {
      fetchData();
    }
  }, [fetchData, currentPage, searchQuery]);

  const { data, loading, emulateError, selectedItem, loadingRight } = state;

  if (emulateError) {
    throw new Error('Emulate error!');
  }

  return (
    <>
      <header>
        <h1>Star Trek</h1>
        <h2>Astronomical Objects</h2>
        <div className="buttons">
          <Search
            searching={searching}
            onSearchChange={handleSearchChange}
            onSearchSubmit={handleSearchSubmit}
          />
          <button onClick={handleThrowError}>Emulate Error</button>
        </div>
      </header>
      <main>
        {loading && <div className='loading'></div>}
        <div className="content">
          <div className="left-section">
            {data && !loading && <div className="card-list">{renderList(data.astronomicalObjects)}</div>}
            <div className="pagination">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                Previous
              </button>
              <span>Page {currentPage}</span>
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={!data || currentPage >= data.page.totalPages}>
                Next
              </button>
            </div>
          </div>
          <div className="right-section">
            {loadingRight ? (
              <div className='loading'></div>
            ) : (
              selectedItem && (
                <div className="details">
                  <button onClick={closeDetails}>Close</button>
                  <h3>{selectedItem.name}</h3>
                  <p>Type: {selectedItem.astronomicalObjectType}</p>
                  <p>Location: {selectedItem.location ? selectedItem.location.name : 'Unknown location'}</p>
                </div>
              )
            )}
          </div>
        </div>
      </main>
      <footer className="footer">
        <div className='wrapper'>
          The Rolling Scopes School, 2024
        </div>
      </footer>
    </>
  );
};

export default App;
