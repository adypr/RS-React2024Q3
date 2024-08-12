import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
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
import { RootState } from '../../../store/store';
import { fetchAstronomicalObjects } from '../../../services/api';

const LeftSection: React.FC<LeftSectionProps> = ({
  isError,
  error,
  currentPage,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState<AstronomicalObject[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoadingState] = useState(true);
  const searchQueryState = useSelector((state: RootState) => state.search.query);

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

    const query = { ...router.query };

    delete query.details;

    router.push({ pathname: router.pathname, query }, undefined, { shallow: true });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoadingState(true);
      try {
        const searchQuery = localStorage.getItem('searching') || searchQueryState || '';
        const result = await fetchAstronomicalObjects({
          currentPage,
          searchQuery,
        });

        setFilteredData(result.astronomicalObjects);
        setTotalPages(result.page.totalPages);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoadingState(false);
      }
    };

    fetchData();
  }, [currentPage, searchQueryState]);

  return (
    <div className="left-section" onClick={handleLeftSectionClick}>
      {loading && <div className="loading">Loading...</div>}
      {!loading && !isError && (
        <>
          {filteredData.length > 0 ? (
            <>
              <CardList
                data={filteredData}
                onItemClick={handleItemClick}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <h2 className="not-found">Nothing found</h2>
          )}
        </>
      )}
      {isError && (
        <div className="error">
          Error:{' '}
          {error instanceof Error ? error.message : JSON.stringify(error)}
        </div>
      )}
    </div>
  );
};

export default LeftSection;
