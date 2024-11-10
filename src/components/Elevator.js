import React, { useState, useEffect } from "react";
import "../styles.scss";

const Elevator = () => {
  const [currentFloor, setCurrentFloor] = useState(1);
  const [queue, setQueue] = useState([]);
  const [waitingTime, setWaitingTime] = useState(0);
  const floors = [1, 2, 3, 4, 5]; // Example floors

  // Function to add a floor to the queue
  const requestFloor = (floor) => {
    setQueue((prevQueue) => [...prevQueue, floor].sort((a, b) => a - b));
    setWaitingTime((prevTime) => prevTime + 3); // Add 3 seconds for each floor
  };

  // Effect to process the queue
  useEffect(() => {
    if (queue.length > 0) {
      const nextFloor = queue[0];

      const interval = setInterval(() => {
        setWaitingTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            setQueue((prevQueue) => prevQueue.slice(1));
            setCurrentFloor(nextFloor);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [queue, currentFloor]);

  return (
    <div>
      <h1 className="centerTitle">Elevator</h1>
      <p className="centerMessage">{`Current Floor: ${currentFloor} `}</p>
      {waitingTime > 0 && (
        <p className="centerMessage">
          {`You must wait ${waitingTime} seconds for the elevator to arrive`}
        </p>
      )}
      <div className="centerMessage">
        {floors.map((floor) => (
          <button key={floor} onClick={() => requestFloor(floor)}>
            {`Request Floor ${floor} `}
          </button>
        ))}
      </div>
      <div className="centerContainer">
        <h2 className="centerTitle">Queue</h2>
        <ul className="centerList">
          {queue.map((floor, index) => (
            <li key={index}>{floor}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Elevator;
