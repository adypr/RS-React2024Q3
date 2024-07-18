import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { clearSelection } from '../../store/slices/astronomicalObjectsSlice';

const FooterMenu: React.FC = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.astronomicalObjects.selectedItems
  );
  const [csvContent, setCsvContent] = useState('');
  const linkRef = useRef<HTMLAnchorElement | null>(null);

  const handleClearSelection = () => {
    dispatch(clearSelection());
  };

  const handleDownload = () => {
    const csvData = selectedItems.map((item) => ({
      name: item.name,
      description: item.astronomicalObjectType,
      location: item.location ? item.location.name : 'Unknown location',
      uid: item.uid,
    }));

    const csv = [
      ['name', 'description', 'location', 'uid'],
      ...csvData.map((e) => [e.name, e.description, e.location, e.uid]),
    ]
      .map((e) => e.join(','))
      .join('\n');

    setCsvContent(`data:text/csv;charset=utf-8,${csv}`);
  };

  useEffect(() => {
    if (csvContent && linkRef.current) {
      linkRef.current.click();
      setCsvContent('');
    }
  }, [csvContent]);

  return (
    <div className="footer-menu">
      <button onClick={handleClearSelection}>Отменить выбор всех</button>
      <button onClick={handleDownload}>Загрузить</button>
      <a
        ref={linkRef}
        href={csvContent}
        download={`${selectedItems.length}_astronomicalobjects.csv`}
        style={{ display: 'none' }}
      >
        Download
      </a>
    </div>
  );
};

export default FooterMenu;
