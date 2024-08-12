import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageData } from '../../store/slices/pageDataSlice';
import { setData } from '../../store/slices/astronomicalObjectsSlice';
import LeftSection from './LeftSection';
import RightSection from './RightSection';
import DownloadHandler from './DownloadHandler';
import { mainData } from '../../models/data.interface';
import { RootState } from '../../store/store';

interface AstronomicalObjectsPageProps {
  data: mainData;
  currentPage: number;
  searchQuery: string;
}

const AstronomicalObjectsPage: React.FC<AstronomicalObjectsPageProps> = ({ data, currentPage, searchQuery }) => {
  const dispatch = useDispatch();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    dispatch(setPageData(data));
    dispatch(setData(data));
    setIsInitialized(true);
  }, [data, dispatch]);

  const searchQueryState = useSelector((state: RootState) => state.search.query);

  if (!isInitialized) {
    return null;
  }

  return (
    <div className="wrapper">
      <div className="content">
        <LeftSection
          isFetching={false}
          isError={false}
          error={null}
          storedData={data}
          currentPage={currentPage}
        />
        <RightSection query={new URLSearchParams()} />
      </div>
      <DownloadHandler />
    </div>
  );
};

export default AstronomicalObjectsPage;
