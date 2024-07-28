import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupMenu from '../../../components/PopupMenu';
import {
  clearSelectedItems,
  setDownloading,
  setDownloadProgress,
} from '../../../store/slices/pageDataSlice';
import { RootState } from '../../../store/store';

const DownloadHandler: React.FC = () => {
  const dispatch = useDispatch();
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  const selectedItems = useSelector(
    (state: RootState) => state.pageData.selectedItems
  );
  const isDownloading = useSelector(
    (state: RootState) => state.pageData.isDownloading
  );
  const downloadProgress = useSelector(
    (state: RootState) => state.pageData.downloadProgress
  );

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
    <>
      {selectedItems.length > 0 && (
        <>
          <PopupMenu
            selectedItems={selectedItems}
            onUnselectAll={handleUnselectAll}
            onDownload={handleDownload}
            isDownloading={isDownloading}
            downloadProgress={downloadProgress}
          />
          <a ref={downloadLinkRef} style={{ display: 'none' }}>
            Download
          </a>
        </>
      )}
    </>
  );
};

export default DownloadHandler;
