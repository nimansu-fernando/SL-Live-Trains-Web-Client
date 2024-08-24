import React, { useState } from 'react';
import trainIcon from '../assets/train.png';
import '../styles/trainCard.css';

const TrainCard = ({ train }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleStations = () => {
    setIsExpanded(!isExpanded);
  };

  const frequencyMap = {
    daily: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    holiday: ["Holiday"],
    weekday: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    weekend: ["Sat", "Sun"],
    special: ["Special"],
  };

  const handleFrequencies = (frequencies) => {
    const frequencyArray = frequencies.split(',').map(freq => freq.trim());
    const daysSet = new Set();
  
    frequencyArray.forEach((freq) => {
      if (frequencyMap[freq.toLowerCase()]) {
        frequencyMap[freq.toLowerCase()].forEach(day => daysSet.add(day));
      }
    });
  
    const today = new Date().toLocaleDateString('en-US', { weekday: 'short' }); // Get today's day (e.g., "Mon")

    // Convert the set to an array and map over it to highlight today's day
    const daysArray = Array.from(daysSet).map(day => 
      day === today ? `<span class="highlight">${day}</span>` : day
    );

    return daysArray.join(", ");
  };

  const convertTo12HourFormat = (time) => {
    const [hour, minute] = time.split(':');
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute} ${suffix}`;
  };

  const convertIsoTo12HourTime = (isoString) => {
    const date = new Date(isoString);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  const convertDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}H ${remainingMinutes}M`;
  };

  return (
    <div className="train-card">
      <div className="train-icon">
        <img src={trainIcon} alt="Train" />
      </div>
      <div className="train-info">
        <div className="train-header">
          <div className="train-time">
            <span className="start-time">{convertTo12HourFormat(train.start_time)}</span>
            <span className="route">{train.route_name}</span>
            <span className="train-name">({train.train_name})</span>
          </div>
        </div>
        <div className="train-details">
          <span className="days" dangerouslySetInnerHTML={{ __html: handleFrequencies(train.frequency) }} />
          <span className="days">{train.trip_number} - {train.type}</span>
        </div>
        <div className="train-details">
          <span className="train-start">{convertTo12HourFormat(train.start_time)}</span>
          <span className="train-lineBetween">
            <span className="line"></span>
          </span>              
          <span className="train-end">{convertTo12HourFormat(train.end_time)}</span>
        </div>
        <div className="train-details">
          <span className="train-startEnd">{train.start_station}</span>
          <span className="duration">{convertDuration(train.duration)}</span>
          <span className="train-startEnd">{train.end_station}</span>
        </div>
        <div className="train-details">
          <span className="duration"></span>
        </div>
        <div className="train-footer">
          <button onClick={toggleStations} className="stopping-stations-btn">
            Stopping Stations
          </button>
          <div className="last-update-box">
            <div className="last-update">
              <span className="update-label">Last Update:</span>
              <span className="update-value">{train.geoLocation}  |</span>
              <span className="update-value">{convertIsoTo12HourTime(train.timestamp)}</span>
            </div>
          </div>
        </div>
        {isExpanded && (
          <div className="stopping-stations">
            <ul>
              {train.stopping_stations.map((station, index) => (
                <li key={index}>
                  <strong>{station.station_name}</strong>
                  <br />
                  Arrival: {station.arrival_time}
                  <br />
                  Departure: {station.departure_time}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainCard;
