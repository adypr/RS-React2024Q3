import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CardList from '../../../components/CardList';
import Pagination from '../../../components/Pagination';
import {
  AstronomicalObject,
  LeftSectionProps,
} from '../../../models/data.interface';
import {
  setSelectedItem,
  setLoading,
} from '../../../store/slices/selectedItemSlice';

const LeftSection: React.FC<LeftSectionProps> = ({
  isFetching,
  isError,
  error,
  storedData,
  currentPage,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePageChange = (newPage: number) => {
    const query = new URLSearchParams(window.location.search);
    query.set('page', newPage.toString());
    navigate({ search: query.toString() });
  };

  const handleItemClick = (item: AstronomicalObject) => {
    dispatch(setSelectedItem(item));
    dispatch(setLoading(true));
    const query = new URLSearchParams(window.location.search);
    query.set('details', item.uid);
    navigate({ search: query.toString() });

    setTimeout(() => {
      dispatch(setLoading(false));
    }, 500);
  };

  return (
    <div className="left-section">
      {isFetching && <div className="loading">Loading...</div>}
      {isError && (
        <div className="error">
          Error:{' '}
          {error instanceof Error ? error.message : JSON.stringify(error)}
        </div>
      )}
      {storedData && !isFetching && !isError && (
        <>
          <CardList
            data={storedData.astronomicalObjects}
            onItemClick={handleItemClick}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={storedData.page.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default LeftSection;
