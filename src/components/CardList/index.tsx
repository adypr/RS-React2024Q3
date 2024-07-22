import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardListProps } from '../../models/data.interface';
import { toggleItemCheck } from '../../store/slices/pageDataSlice';
import { RootState } from '../../store/store';
import './CardList.scss';

const CardList: React.FC<CardListProps> = ({ data, onItemClick }) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.pageData.selectedItems
  );

  const handleCheckboxChange = (uid: string) => {
    dispatch(toggleItemCheck(uid));
  };

  if (!data.length) return <h2 className="not-found">Nothing found</h2>;

  return (
    <div className="card-list">
      {data.map((obj) => {
        const isChecked = selectedItems.some((item) => item.uid === obj.uid);
        return (
          <div className="card" key={obj.uid}>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => handleCheckboxChange(obj.uid)}
            />
            <h3 className="card__title" onClick={() => onItemClick(obj)}>
              Title: {obj.name}
            </h3>
            <p className="card__type">Type: {obj.astronomicalObjectType}</p>
            <p className="card__location">
              Location: {obj.location ? obj.location.name : 'Unknown location'}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default CardList;
