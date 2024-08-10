import React from 'react';
import Image from 'next/image';
import { DetailsProps } from '../../models/data.interface';

const Details: React.FC<DetailsProps> = ({ item, onClose }) => (
  <div className="details">
    <button onClick={onClose}>🗙</button>
    <h3>{item.name}</h3>
    <p>Type: {item.astronomicalObjectType}</p>
    <p>Location: {item.location?.name || 'Unknown location'}</p>
    <Image
      src="https://spaceholder.cc/i/350x500"
      alt="Star Trek"
      width={350}
      height={500}
    />
  </div>
);

export default Details;
