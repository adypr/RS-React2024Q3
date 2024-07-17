import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CardList from '../../components/CardList';
import Pagination from '../../components/Pagination';
import Details from '../../components/Details';
import { AstronomicalObject, mainData } from '../../models/data.interface';
import { fetchData } from '../../services/api';

const AstronomicalObjectsPage: React.FC = () => {
  const [state, setState] = useState<{
    data: mainData | null;
    loading: boolean;
    selectedItem: AstronomicalObject | null;
    rightSectionLoading: boolean;
  }>({
    data: null,
    loading: false,
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

  const fetchDataCallback = useCallback(() => {
    setState((prevState) => ({ ...prevState, loading: true }));

    fetchData(currentPage, searchQuery)
      .then((data: mainData) => {
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

  useEffect(() => {
    if (currentPage === 1) {
      localStorage.removeItem('data');
      fetchDataCallback();
    } else {
      const savedData = localStorage.getItem('data');
      if (savedData && searchQuery === '' && currentPage === 1) {
        setState((prevState) => ({
          ...prevState,
          data: JSON.parse(savedData),
        }));
      } else {
        fetchDataCallback();
      }
    }
  }, [fetchDataCallback, currentPage, searchQuery]);

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

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.details')) {
        closeDetails();
      }
    },
    [closeDetails]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const { data, loading, selectedItem, rightSectionLoading } = state;

  return (
    <div className="wrapper">
      <div className="content">
        <div className="left-section">
          {loading && <div className="loading"></div>}
          {data && !loading && (
            <CardList
              data={data.astronomicalObjects}
              onItemClick={handleItemClick}
            />
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={data ? data.page.totalPages : 1}
            onPageChange={handlePageChange}
          />
        </div>
        <div className="right-section">
          {rightSectionLoading && <div className="loading"></div>}
          {!rightSectionLoading && selectedItem && (
            <Details item={selectedItem} onClose={closeDetails} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AstronomicalObjectsPage;
