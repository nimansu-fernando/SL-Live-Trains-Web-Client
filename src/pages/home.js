import React from 'react';
import '../styles/home.css';
import TrainCard from '../components/trainCard.js';

const Home = () => {

  const trains = [
    {
      route: 'Batticaloa - Colombo Fort',
      trainNo: '6012',
      trainName:'Udaya Devi',
      type: 'Express',
      days: 'Mon, Tue, Wed, Thu, Fri, Sat, Sun, Poya, Holi',
      startTime: '6:10:00',
      endTime: '3:05:00',
      startStation: 'Batticaloa',
      endStation: 'Colombo Fort',
      duration: '8 h 55 m',
      lastUpdateStation: 'Konwewa',
      lastUpdateTime: '12:33 PM',
      stoppingStations: ['Station 1', 'Station 2', 'Station 3', 'Station 4'],
    },
  ];

  return (
    <div>
      <div className="container train-card-container">
        {trains.map((train, index) => (
          <TrainCard key={index} train={train} />
        ))}
      </div>
    </div>
  );
};

export default Home;
