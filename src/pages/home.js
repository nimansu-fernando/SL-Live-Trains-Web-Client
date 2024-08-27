import React, { useEffect, useState, useCallback } from 'react';
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
  const [publicToken, setPublicToken] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchParams, setSearchParams] = useState({ startStation: '', endStation: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10); 

  // Fetch current token
  const fetchToken = useCallback(async () => {
    try {
      const response = await fetch('https://sllivetrains.com/api/public-token');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setPublicToken(data.token);
    } catch (error) {
      console.error('Error fetching public token:', error.message);
    }
  }, []);

  // Fetch token refresh
  const fetchWithTokenRefresh = useCallback(async (url, options = {}) => {
    try {
      const response = await fetch(url, options);
      if (response.status === 401 || response.status === 403) {
        await fetchToken();
        options.headers['x-public-token'] = publicToken;
        const retryResponse = await fetch(url, options);
        if (!retryResponse.ok) {
          throw new Error(`HTTP error on retry! Status: ${retryResponse.status}`);
        }
        return retryResponse.json();
      }
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching data:', error.message);
      throw error;
    }
  }, [fetchToken, publicToken]);

  // Fetch train data
  const fetchTrainData = useCallback(async () => {
    try {
      if (!publicToken) return;
      const url = isSearching
        ? `https://sllivetrains.com/api/v1/location/train-locations/filter-trains?startStation=${encodeURIComponent(startStation)}&endStation=${encodeURIComponent(endStation)}`
        : `https://sllivetrains.com/api/v1/location/train-locations/data?page=${currentPage}&limit=${pageSize}`;

      const data = await fetchWithTokenRefresh(url, {
        headers: {
          'x-public-token': publicToken
        }
      });

      if (isSearching) {
        setSearchResults(data);
      } else {
        setTrains(data.data);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('Error fetching train data:', error.message);
    }
  }, [publicToken, fetchWithTokenRefresh, isSearching, startStation, endStation, currentPage, pageSize]);

  // Fetch station names
  const fetchStationNames = useCallback(async () => {
    try {
      if (!publicToken) return;
      const data = await fetchWithTokenRefresh('https://sllivetrains.com/api/railway-infrastructure/stations/names/order', {
        headers: {
          'x-public-token': publicToken
        }
      });
      setStations(data);
    } catch (error) {
      console.error('Error fetching station names:', error.message);
    }
  }, [publicToken, fetchWithTokenRefresh]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchToken();
      fetchTrainData();
      fetchStationNames();
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchTrainData();
    }, 30000);

    return () => clearInterval(intervalId);
  }, [fetchToken, fetchTrainData, fetchStationNames]);

  useEffect(() => {
    if (isSearching) {
      setTrains(searchResults);
    }
  }, [searchResults, isSearching]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleSearch = async () => {
    if (startStation && endStation) {
      setIsSearching(true);
      setSearchParams({ startStation, endStation });
      try {
        const data = await fetchWithTokenRefresh(
          `https://sllivetrains.com/api/v1/location/train-locations/filter-trains?startStation=${encodeURIComponent(startStation)}&endStation=${encodeURIComponent(endStation)}`,
          {
            headers: {
              'x-public-token': publicToken
            }
          }
        );
        setSearchResults(data);
        setCurrentPage(1); 
        setTotalPages(data.totalPages); 
      } catch (error) {
        console.error('Error fetching filtered trains:', error.message);
      }
    } else {
      alert('Please select both start and destination stations.');
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchTrainData(); 
    }
  };

  const renderPagination = () => {
    const pageButtons = [];
    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
        <Button
          key={i}
          variant={i === currentPage ? 'primary' : 'secondary'}
          onClick={() => handlePageChange(i)}
          className={`pagination-button ${i === currentPage ? 'active' : ''}`}
        >
          {i}
        </Button>
      );
    }

    return (
      <div className="pagination-controls">
        {currentPage > 1 && (
          <Button
            variant="secondary"
            onClick={() => handlePageChange(currentPage - 1)}
            className="pagination-button"
          >
            Previous
          </Button>
        )}
        {pageButtons}
        {currentPage < totalPages && (
          <Button
            variant="secondary"
            onClick={() => handlePageChange(currentPage + 1)}
            className="pagination-button"
          >
            Next
          </Button>
        )}
      </div>
    );
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
      {!isSearching && renderPagination()}
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
