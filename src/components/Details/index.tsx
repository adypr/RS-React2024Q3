import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { AstronomicalObject } from '../../models/data.interface';

const Details: React.FC = () => {
  const location = useLocation();
  const { selectedItem } = location.state || {};
  const { uid } = useParams<{ uid: string }>();
  const [item, setItem] = useState<AstronomicalObject | null>(selectedItem || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedItem && uid) {
      // Fetch the details if selectedItem is not available in location.state
      fetch(`https://stapi.co/api/v1/rest/astronomicalObject?uid=${uid}`)
        .then((response) => response.json())
        .then((data) => setItem(data.astronomicalObject))
        .catch((error) => console.error('Error fetching details:', error));
    }
  }, [uid, selectedItem]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="details">
      <button onClick={() => navigate(-1)}>Close</button>
      <h3>{item.name}</h3>
      <p>Type: {item.astronomicalObjectType}</p>
      <p>Location: {item.location ? item.location.name : 'Unknown location'}</p>
    </div>
  );
};

export default Details;
