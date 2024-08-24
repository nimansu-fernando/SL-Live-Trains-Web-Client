import React, { useEffect, useState } from 'react';
import '../styles/home.css';
import TrainCard from '../components/trainCard.js';
import Modal from 'react-bootstrap/Modal';
import Map from '../components/map.js';
import Header from '../components/header.js'; 
import locationIcon from '../assets/location.png';

const Home = () => {
  const [trains, setTrains] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchTrainData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/location/train-locations/data');
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

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className="home-page">
      <Header />
      <button onClick={openModal} className="live-map-button">
        <img src={locationIcon} alt="Live Icon" className="icon-image" />
        Watch Live Map
      </button>
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
          <button onClick={closeModal} className="btn btn-secondary">
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
