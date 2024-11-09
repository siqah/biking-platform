import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase-config';

const RaceMap = () => {
  const [positions, setPositions] = useState({});

  useEffect(() => {
    const raceRef = ref(database, 'race/users');
    onValue(raceRef, (snapshot) => {
      setPositions(snapshot.val() || {});
    });
  }, []);

  return (
    <div className="relative h-screen w-full">
      <MapContainer center={[51.505, -0.09]} zoom={13} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {Object.keys(positions).map((userId) => {
          const { position, raceNumber } = positions[userId];
          return position && position.lat && position.lng ? (
            <Marker key={userId} position={[position.lat, position.lng]}>
              <Popup>Rider #{raceNumber}</Popup>
            </Marker>
          ) : null;
        })}
      </MapContainer>
    </div>
  );
};

export default RaceMap;
