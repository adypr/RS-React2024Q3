import React, { useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchAstronomicalObjectsQuery } from '../../services/api';
import { RootState } from '../../store/store';
import { setPageData } from '../../store/slices/pageDataSlice';
import LeftSection from './LeftSection';
import RightSection from './RightSection';
import DownloadHandler from './DownloadHandler';

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
  const searchQuery = useSelector((state: RootState) => state.search.query);

  const {
    data,
    isLoading: isFetching,
    isError,
    error,
  } = useFetchAstronomicalObjectsQuery({
    currentPage,
    searchQuery,
  });

  useEffect(() => {
    if (data) {
      dispatch(setPageData(data));
    }
  }, [data, dispatch]);

  return (
    <div className="wrapper">
      <div className="content">
        <LeftSection
          isFetching={isFetching}
          isError={isError}
          error={error}
          storedData={data}
          currentPage={currentPage}
        />
        <RightSection query={query} navigate={navigate} />
      </div>
      <DownloadHandler />
    </div>
  );
};

export default AstronomicalObjectsPage;
