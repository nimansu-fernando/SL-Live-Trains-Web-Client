import React, { useEffect, useState } from 'react';
import '../styles/home.css';
import TrainCard from '../components/trainCard.js';

const Home = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const fetchTrainData = async () => {
      try {
        const response = await fetch('http://localhost:3000/location/api/locations');
        if (response.ok) {
          const data = await response.json();
          setTrains(data);
        } else {
          console.error('Failed to fetch train data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching train data:', error);
      }
    };

    fetchTrainData();
  }, []);

  return (
    <div className="home-page">
      <div className="container train-card-container">
        {trains.map((train, index) => (
          <TrainCard key={index} train={train} />
        ))}
      </div>
    </div>
  );
};

export default Home;
