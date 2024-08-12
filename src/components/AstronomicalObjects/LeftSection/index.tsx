import React, { useEffect } from 'react';
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
    const query = { ...router.query };
    query.page = newPage.toString();
    router.push({ pathname: router.pathname, query });
  };

  const handleItemClick = (
    event: React.MouseEvent<Element, MouseEvent>,
    item: AstronomicalObject
  ) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(setSelectedItem(item));
    dispatch(setLoading(true));

    const query = { ...router.query };
    query.details = item.uid;
    router.push({ pathname: router.pathname, query }, undefined, {
      shallow: true,
    });

    setTimeout(() => {
      dispatch(setLoading(false));
    }, 500);
  };

  const handleLeftSectionClick = () => {
    dispatch(setSelectedItem(null));
  };

  useEffect(() => {
    if (!isFetching && storedData) {
      const timeoutId = setTimeout(() => {
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [isFetching, storedData]);

  return (
    <div className="left-section" onClick={handleLeftSectionClick}>
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
