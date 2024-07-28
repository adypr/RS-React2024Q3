import React from 'react';
import { DetailsProps } from '../../models/data.interface';

const Details: React.FC<DetailsProps> = ({ item, onClose }) => (
  <div className="details">
    <button onClick={onClose}>🗙</button>
    <h3>{item.name}</h3>
    <p>Type: {item.astronomicalObjectType}</p>
    <p>Location: {item.location?.name || 'Unknown location'}</p>
    <img src="https://spaceholder.cc/i/800x600" alt="Star Trek" />
  </div>
);

export default Details;
