import React,{useState} from 'react';
import trainIcon from '../assets/train-icon.png';
import '../styles/trainCard.css'

const TrainCard = ({train}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleStations = () => {
    setIsExpanded(!isExpanded);
  };

  const convertTo12HourFormat = (time) => {
    const [hour, minute] = time.split(':');
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute} ${suffix}`;
  };

  return (
    <div className="train-card">
        <div className="train-icon">
            <img src={trainIcon} alt="Train" />
        </div>
        <div className="train-info">
            <div className="train-header">
                <div className="train-time">
                    <span className="start-time">{convertTo12HourFormat(train.startTime)}</span>
                    <span className="route">{train.route}</span>
                    <span className="train-name">({train.trainName})</span>
                </div>
            </div>
            <div className="train-details">
                <span className="days">{train.days}</span>
                <span className="days">{train.trainNo} - {train.type}</span>
            </div>
            <div className="train-details">
                <span className="train-start">{convertTo12HourFormat(train.startTime)}</span>
                <span className="train-lineBetween">
                    <span className="line"></span>
                </span>              
                <span className="train-end">{convertTo12HourFormat(train.endTime)}</span>
            </div>
            <div className="train-details">
                <span className="train-startEnd">{train.startStation}</span>
                <span className="duration">{train.duration}</span>
                <span className="train-startEnd">{train.endStation}</span>
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
                    <span className="update-value">{train.lastUpdateStation}</span>
                    <span className="update-value">{train.lastUpdateTime}</span>
                    </div>
                </div>
            </div>
            {isExpanded && (
            <div className="stopping-stations">
                <ul>
                {train.stoppingStations.map((station, index) => (
                    <li key={index}>{station}</li>
                ))}
                </ul>
            </div>
            )}
        </div>
    </div>
  );
};

export default TrainCard;