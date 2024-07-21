import React, { useEffect, useMemo, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CardList from '../../components/CardList';
import Pagination from '../../components/Pagination';
import Details from '../../components/Details';
import PopupMenu from '../../components/PopupMenu';
import { AstronomicalObject } from '../../models/data.interface';
import { useFetchAstronomicalObjectsQuery } from '../../services/api';
import { RootState } from '../../store/store';
import {
  setPageData,
  clearSelectedItems,
  setDownloading,
  setDownloadProgress,
} from '../../store/slices/pageDataSlice';
import {
  setSelectedItem,
  setLoading,
} from '../../store/slices/selectedItemSlice';

const AstronomicalObjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

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

  const storedData = useSelector((state: RootState) => state.pageData.data);
  const selectedItem = useSelector(
    (state: RootState) => state.selectedItem.item
  );
  const selectedItems = useSelector(
    (state: RootState) => state.pageData.selectedItems
  );
  const rightSectionLoading = useSelector(
    (state: RootState) => state.selectedItem.loading
  );
  const isDownloading = useSelector(
    (state: RootState) => state.pageData.isDownloading
  );
  const downloadProgress = useSelector(
    (state: RootState) => state.pageData.downloadProgress
  );

  useEffect(() => {
    if (data) {
      dispatch(setPageData(data));
    }
  }, [data, dispatch]);

  const handlePageChange = (newPage: number) => {
    query.set('page', newPage.toString());
    navigate({ search: query.toString() });
  };

  const handleItemClick = (item: AstronomicalObject) => {
    dispatch(setSelectedItem(item));
    dispatch(setLoading(true));
    query.set('details', item.uid);
    navigate({ search: query.toString() });

    setTimeout(() => {
      dispatch(setLoading(false));
    }, 500);
  };

  const closeDetails = useCallback(() => {
    dispatch(setSelectedItem(null));
    query.delete('details');
    navigate({ search: query.toString() });
  }, [navigate, query, dispatch]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        detailsRef.current &&
        !detailsRef.current.contains(event.target as Node)
      ) {
        closeDetails();
      }
    },
    [closeDetails]
  );

  useEffect(() => {
    const handleClick = (event: MouseEvent) => handleClickOutside(event);
    window.addEventListener('mousedown', handleClick);
    return () => {
      window.removeEventListener('mousedown', handleClick);
    };
  }, [handleClickOutside]);

  const handleUnselectAll = () => {
    dispatch(clearSelectedItems());
  };

  const handleDownload = async () => {
    dispatch(setDownloading(true));

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      dispatch(setDownloadProgress(progress));
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 200);

    const csvHeader = 'Name,Type,Location\n';
    const csvRows = selectedItems
      .map(
        (item) =>
          `${item.name},${item.astronomicalObjectType},${item.location?.name || 'Unknown location'}`
      )
      .join('\n');
    const csvString = csvHeader + csvRows;

    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    setTimeout(() => {
      if (downloadLinkRef.current) {
        downloadLinkRef.current.href = url;
        downloadLinkRef.current.download = `${selectedItems.length}_astronomicalobjects.csv`;
        downloadLinkRef.current.click();
        URL.revokeObjectURL(url);
      }
      dispatch(setDownloading(false));
      dispatch(setDownloadProgress(100));
    }, 2000);
  };

  return (
    <div className="wrapper">
      <div className="content">
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
                totalPages={storedData ? storedData.page.totalPages : 1}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
        <div className="right-section" ref={detailsRef}>
          {rightSectionLoading && <div className="loading">Loading...</div>}
          {!rightSectionLoading && selectedItem && (
            <Details item={selectedItem} onClose={closeDetails} />
          )}
        </div>
      </div>
      {selectedItems.length > 0 && (
        <PopupMenu
          selectedItems={selectedItems}
          onUnselectAll={handleUnselectAll}
          onDownload={handleDownload}
          isDownloading={isDownloading}
          downloadProgress={downloadProgress}
        />
      )}
      <a ref={downloadLinkRef} style={{ display: 'none' }}>
        Download
      </a>
    </div>
  );
};

export default AstronomicalObjectsPage;
