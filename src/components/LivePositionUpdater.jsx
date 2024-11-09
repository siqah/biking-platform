import { useEffect } from 'react';
import { ref, set } from 'firebase/database';
import { database } from '../firebase-config';
import { useAuth } from "../context/AuthContext";

const LivePositionUpdater = () => {
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const userRef = ref(database, `race/users/${currentUser.uid}/position`);
        set(userRef, {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => console.error("Error in fetching location:", error),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [currentUser]);

  return (
    <div className="p-4 bg-blue-100 text-blue-800">
      <p>Updating live position...</p>
    </div>
  );
};

export default LivePositionUpdater;
