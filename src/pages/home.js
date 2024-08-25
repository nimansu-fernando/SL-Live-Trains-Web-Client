import React, { useEffect, useState } from 'react';
import '../styles/home.css';
import TrainCard from '../components/trainCard.js';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Map from '../components/map.js';
import Header from '../components/header.js';
import locationIcon from '../assets/location.png';

const Home = () => {
  const [trains, setTrains] = useState([]);
  const [stations, setStations] = useState([]);
  const [startStation, setStartStation] = useState('');
  const [endStation, setEndStation] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Function to fetch train data
  const fetchTrainData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/location/train-locations/data');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setTrains(data);
    } catch (error) {
      console.error('Error fetching train data:', error.message);
    }
  };
  

  // Function to fetch station names
  const fetchStationNames = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/railway-infrastructure/stations/names/order');
      if (response.ok) {
        const data = await response.json();
        setStations(data);
      } else {
        console.error('Failed to fetch station names:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching station names:', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchTrainData();
    fetchStationNames();

    // Set up interval to update train data every 30 seconds
    const intervalId = setInterval(fetchTrainData, 30000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleSearch = async () => {
    if (startStation && endStation) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/location/train-locations/filter-trains?startStation=${encodeURIComponent(startStation)}&endStation=${encodeURIComponent(endStation)}`
        );
        if (response.ok) {
          const data = await response.json();
          setTrains(data);
        } else {
          console.error('Failed to fetch filtered trains:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching filtered trains:', error);
      }
    } else {
      alert('Please select both start and destination stations.');
    }
  };

  return (
    <div className="home-page">
      <Header />
      <div className='container'>
        <div className="top-bar">
          <button onClick={openModal} className="live-map-button">
            <img src={locationIcon} alt="Live Icon" className="icon-image" />
            Watch Live Map
          </button>
          <div className="station-selection">
            <Form.Group controlId="startStation">
              <Form.Control
                as="select"
                value={startStation}
                onChange={(e) => setStartStation(e.target.value)}
                placeholder="Select Start Station"
              >
                <option value="">Select Start Station</option>
                {stations.map((station, index) => (
                  <option key={index} value={station.name}>
                    {station.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="endStation">
              <Form.Control
                as="select"
                value={endStation}
                onChange={(e) => setEndStation(e.target.value)}
                placeholder="Select Destination Station"
              >
                <option value="">Select Destination Station</option>
                {stations.map((station, index) => (
                  <option key={index} value={station.name}>
                    {station.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" className="search-button" onClick={handleSearch}>
              Search Trains
            </Button>
          </div>
        </div>
      </div>
      <div className="container train-card-container">
        {trains.map((train, index) => (
          <TrainCard key={index} train={train} />
        ))}
      </div>
      <Modal show={modalIsOpen} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Current Train Locations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Map trains={trains} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;