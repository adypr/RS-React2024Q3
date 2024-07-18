import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CardList from '../../components/CardList';
import Pagination from '../../components/Pagination';
import Details from '../../components/Details';
import { AstronomicalObject } from '../../models/data.interface';
import { useFetchAstronomicalObjectsQuery } from '../../services/api';

const AstronomicalObjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const query = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const currentPage = useMemo(
    () => parseInt(query.get('page') || '1', 10),
    [query]
  );
  const searchQuery = useMemo(() => query.get('name') || '', [query]);

  const { data, isLoading } = useFetchAstronomicalObjectsQuery({
    currentPage,
    searchQuery,
  });

  const [selectedItem, setSelectedItem] = useState<AstronomicalObject | null>(
    null
  );
  const [rightSectionLoading, setRightSectionLoading] = useState(false);

  const handlePageChange = (newPage: number) => {
    query.set('page', newPage.toString());
    navigate({ search: query.toString() });
  };

  const handleItemClick = (item: AstronomicalObject) => {
    setSelectedItem(item);
    setRightSectionLoading(true);
    query.set('details', item.uid);
    navigate({ search: query.toString() });

    setTimeout(() => {
      setRightSectionLoading(false);
    }, 500);
  };

  const closeDetails = useCallback(() => {
    setSelectedItem(null);
    query.delete('details');
    navigate({ search: query.toString() });
  }, [navigate, query]);

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
          {isLoading && <div className="loading"></div>}
          {data && !isLoading && (
            <CardList
              data={data.astronomicalObjects}
              onItemClick={handleItemClick}
            />
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={data ? data.page.totalPages : 1}
            onPageChange={handlePageChange}
          />
        </div>
        <div className="right-section">
          {rightSectionLoading && <div className="loading"></div>}
          {!rightSectionLoading && selectedItem && (
            <Details item={selectedItem} onClose={closeDetails} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AstronomicalObjectsPage;
