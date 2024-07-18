import React, { useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CardList from '../../components/CardList';
import Pagination from '../../components/Pagination';
import Details from '../../components/Details';
import FooterMenu from '../../components/FooterMenu';
import { AstronomicalObject } from '../../models/data.interface';
import { useFetchAstronomicalObjectsQuery } from '../../services/api';
import { RootState } from '../../store/store';
import {
  setData,
  selectItem,
  setRightSectionLoading,
} from '../../store/slices/astronomicalObjectsSlice';

const AstronomicalObjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const query = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const currentPage = useMemo(
    () => parseInt(query.get('page') || '1', 10),
    [query]
  );
  const searchQuery = useMemo(() => query.get('name') || '', [query]);

  const { data, isLoading, isFetching } = useFetchAstronomicalObjectsQuery({
    currentPage,
    searchQuery,
  });

  const storedData = useSelector(
    (state: RootState) => state.astronomicalObjects.data
  );
  const selectedItem = useSelector(
    (state: RootState) => state.astronomicalObjects.selectedItem
  );
  const rightSectionLoading = useSelector(
    (state: RootState) => state.astronomicalObjects.rightSectionLoading
  );
  const selectedItems = useSelector(
    (state: RootState) => state.astronomicalObjects.selectedItems
  );

  useEffect(() => {
    if (data) {
      dispatch(setData(data));
    }
  }, [data, dispatch]);

  const handlePageChange = (newPage: number) => {
    query.set('page', newPage.toString());
    navigate({ search: query.toString() });
  };

  const handleItemClick = (item: AstronomicalObject) => {
    dispatch(selectItem(item));
    dispatch(setRightSectionLoading(true));
    query.set('details', item.uid);
    navigate({ search: query.toString() });

    setTimeout(() => {
      dispatch(setRightSectionLoading(false));
    }, 500);
  };

  const closeDetails = useCallback(() => {
    dispatch(selectItem(null));
    query.delete('details');
    navigate({ search: query.toString() });
  }, [navigate, query, dispatch]);

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

  return (
    <div className="wrapper">
      <div className="content">
        <div className="left-section">
          {(isLoading || isFetching) && (
            <div className="loading">Loading...</div>
          )}
          {storedData && !isLoading && (
            <CardList
              data={storedData.astronomicalObjects}
              onItemClick={handleItemClick}
            />
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={storedData ? storedData.page.totalPages : 1}
            onPageChange={handlePageChange}
          />
        </div>
        <div className="right-section">
          {rightSectionLoading && <div className="loading">Loading...</div>}
          {!rightSectionLoading && selectedItem && (
            <Details item={selectedItem} onClose={closeDetails} />
          )}
        </div>
      </div>
      {selectedItems.length > 0 && <FooterMenu />}
    </div>
  );
};

export default AstronomicalObjectsPage;
