import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Details from '../../../components/Details';
import { RootState } from '../../../store/store';
import { setSelectedItem } from '../../../store/slices/selectedItemSlice';
import { RightSectionProps } from '../../../models/data.interface';

const RightSection: React.FC<RightSectionProps> = ({ query, navigate }) => {
  const dispatch = useDispatch();

  const selectedItem = useSelector(
    (state: RootState) => state.selectedItem.item
  );
  const rightSectionLoading = useSelector(
    (state: RootState) => state.selectedItem.loading
  );

  const closeDetails = useCallback(() => {
    dispatch(setSelectedItem(null));
    query.delete('details');
    navigate({ search: query.toString() });
  }, [navigate, query, dispatch]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('.right-section')) {
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

  return (
    <div className="right-section">
      {rightSectionLoading && <div className="loading">Loading...</div>}
      {!rightSectionLoading && selectedItem && (
        <Details item={selectedItem} onClose={closeDetails} />
      )}
    </div>
  );
};

export default RightSection;
