import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Details from '../../Details';
import { RootState } from '../../../store/store';
import { setSelectedItem } from '../../../store/slices/selectedItemSlice';
import { RightSectionProps } from '../../../models/data.interface';
import { useRouter } from 'next/router';

const RightSection: React.FC<RightSectionProps> = ({ query }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const rightSectionRef = useRef<HTMLDivElement>(null);

  const selectedItem = useSelector(
    (state: RootState) => state.selectedItem.item
  );
  const rightSectionLoading = useSelector(
    (state: RootState) => state.selectedItem.loading
  );

  const closeDetails = useCallback(() => {
    dispatch(setSelectedItem(null));
    query.delete('details');
    router.push({ search: query.toString() }, undefined, { shallow: true });
  }, [router, query, dispatch]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        rightSectionRef.current &&
        !rightSectionRef.current.contains(event.target as Node)
      ) {
        closeDetails();
      }
    },
    [closeDetails, rightSectionRef]
  );

  useEffect(() => {
    const handleClick = (event: MouseEvent) => handleClickOutside(event);
    window.addEventListener('mousedown', handleClick);
    return () => {
      window.removeEventListener('mousedown', handleClick);
    };
  }, [handleClickOutside]);

  return (
    <div ref={rightSectionRef} className="right-section">
      {rightSectionLoading && <div className="loading">Loading...</div>}
      {!rightSectionLoading && selectedItem && (
        <Details item={selectedItem} onClose={closeDetails} />
      )}
    </div>
  );
};

export default RightSection;
