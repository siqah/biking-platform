/* eslint-disable no-undef */
import { useEffect, useState } from "react";


const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
  
    useEffect(() => {
      const raceRef = ref(database, 'race/users');
      onValue(raceRef, (snapshot) => {
        const riders = snapshot.val() || {};
        const sortedRiders = Object.values(riders).sort((a, b) => a.distanceToFinish - b.distanceToFinish);
        setLeaderboard(sortedRiders);
      });
    }, []);
  
    return (
      <div className="leaderboard">
        <h3>Leaderboard</h3>
        <ul>
          {leaderboard.map((rider, index) => (
            <li key={index}>
              Rider #{rider.raceNumber} - Distance to Finish: {rider.distanceToFinish.toFixed(2)} km
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Leaderboard;
  