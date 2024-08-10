import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import CardList from '../../CardList';
import Pagination from '../../Pagination';
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
  const router = useRouter();
  const dispatch = useDispatch();

  const handlePageChange = (newPage: number) => {
    const query = new URLSearchParams(window.location.search);
    query.set('page', newPage.toString());
    router.push({ search: query.toString() });
  };

  const handleItemClick = (
    event: React.MouseEvent<Element, MouseEvent>,
    item: AstronomicalObject
  ) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(setSelectedItem(item));
    dispatch(setLoading(true));
    const query = new URLSearchParams(window.location.search);
    query.set('details', item.uid);
    router.push({ search: query.toString() }, undefined, { shallow: true });

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
