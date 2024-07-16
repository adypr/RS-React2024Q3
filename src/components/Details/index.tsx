import React from 'react';
import { AstronomicalObject } from '../../models/data.interface';

interface DetailsProps {
  item: AstronomicalObject;
  onClose: () => void;
}

const Details: React.FC<DetailsProps> = ({ item, onClose }) => (
  <div className="details">
    <button onClick={onClose}>🗙</button>
    <h3>{item.name}</h3>
    <p>Type: {item.astronomicalObjectType}</p>
    <p>Location: {item.location ? item.location.name : 'Unknown location'}</p>
    <img src="https://spaceholder.cc/i/800x600" alt="Star Trek" />
  </div>
);

export default Details;
