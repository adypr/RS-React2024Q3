import React from 'react';
import {
  AstronomicalObjects,
  AstronomicalObject,
} from '../../models/data.interface';

interface CardListProps {
  data: AstronomicalObjects;
  onItemClick: (item: AstronomicalObject) => void;
}

const CardList: React.FC<CardListProps> = ({ data, onItemClick }) => {
  if (!data.length) return <h2 className="not-found">Nothing found</h2>;

  return (
    <div className="card-list">
      {data.map((obj) => (
        <div className="card" key={obj.uid} onClick={() => onItemClick(obj)}>
          <h3 className="card__title">Title: {obj.name}</h3>
          <p className="card__type">Type: {obj.astronomicalObjectType}</p>
          <p className="card__location">
            Location: {obj.location ? obj.location.name : 'Unknown location'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CardList;
