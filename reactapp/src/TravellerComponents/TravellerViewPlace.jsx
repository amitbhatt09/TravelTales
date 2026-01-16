import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseUrl from '../apiConfig';
import TravellerNavbar from './TravellerNavbar';
import 'bootstrap/dist/css/bootstrap.css';
import './TravellerViewPlace.css';

const TravellerViewPlace = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  /* 🔹 PAGINATION */
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const username = localStorage.getItem('username') || 'Traveller';
  const role = localStorage.getItem('role') || 'Traveller';

  /* 🔹 FETCH PLACES */
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${baseUrl}/api/Place`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlaces(res.data);
      } catch (err) {
        setErrors('Failed to fetch places');
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, []);

  /* 🔹 WIKIPEDIA LINK */
  const getWikiLink = (place) => {
    const text = place.Name || place.Location;
    if (!text) return 'https://en.wikipedia.org';
    return `https://en.wikipedia.org/wiki/${text.trim().replace(/\s+/g, '_')}`;
  };

  /* 🔹 SEARCH (TRIM SAFE) */
  const filteredPlaces = places.filter((place) => {
    const q = searchQuery.trim().toLowerCase();
    return (
      place.Name.toLowerCase().includes(q) ||
      place.Category.toLowerCase().includes(q) ||
      place.Location.toLowerCase().includes(q)
    );
  });

  /* 🔹 PAGINATION LOGIC */
  const totalPages = Math.ceil(filteredPlaces.length / recordsPerPage);
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = filteredPlaces.slice(indexOfFirst, indexOfLast);

  /* 🔹 SMART PAGINATION */
  const getPaginationItems = () => {
    const items = [];

    if (currentPage > 1) items.push('prev');
    if (currentPage > 2) items.push('...');
    items.push(currentPage);
    if (currentPage + 1 <= totalPages) items.push(currentPage + 1);
    if (currentPage + 1 < totalPages) items.push('...');
    if (currentPage < totalPages) items.push('next');

    return items;
  };

  return (
    <div className="bColor">
      <TravellerNavbar username={username} role={role} />

      <div className="container mt-5">
        <div className="table-container">

          <h2 className="subtitle">Discover places worth the journey</h2>

          {/* 🔍 SEARCH */}
          <div className="search-wrapper">
            <div className="search-box-custom">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search destinations, category or location..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          {/* 🔢 PAGINATION (TOP RIGHT) */}
          <div className="pagination-top-right">
            {getPaginationItems().map((item, index) => {
              if (item === 'prev') {
                return (
                  <button
                    key={index}
                    className="page-btn"
                    onClick={() => setCurrentPage((p) => p - 1)}
                  >
                    &laquo;
                  </button>
                );
              }

              if (item === 'next') {
                return (
                  <button
                    key={index}
                    className="page-btn"
                    onClick={() => setCurrentPage((p) => p + 1)}
                  >
                    &raquo;
                  </button>
                );
              }

              if (item === '...') {
                return <span key={index} className="page-dots">...</span>;
              }

              return (
                <button
                  key={index}
                  className={`page-btn ${currentPage === item ? 'active' : ''}`}
                  onClick={() => setCurrentPage(item)}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {loading && <p className="text-center">Loading...</p>}
          {errors && <p className="text-danger text-center">{errors}</p>}

          {/* 📋 TABLE */}
          <table className="table table-bordered table-striped text-center">
            <thead>
              <tr>
                <th>Vista</th>
                <th>Name</th>
                <th>Category</th>
                <th>Location</th>
                <th>Best time to visit</th>
              </tr>
            </thead>

            <tbody>
              {currentRecords.length === 0 && !loading && (
                <tr>
                  <td colSpan="5" className="text-muted">No Places Found</td>
                </tr>
              )}

              {currentRecords.map((place) => (
                <tr key={place.PlaceId}>
                  <td>
                    <a
                      href={getWikiLink(place)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="image-hover-wrapper"
                    >
                      <img
                        src={place.PlaceImage || 'https://via.placeholder.com/150'}
                        alt={place.Name}
                        className="place-img"
                      />
                      <div className="image-hover-overlay">
                        <span>Click to know more</span>
                      </div>
                    </a>
                  </td>

                  <td>{place.Name}</td>
                  <td>{place.Category}</td>
                  <td>{place.Location}</td>
                  <td>{place.BestTimeToVisit}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};

export default TravellerViewPlace;
