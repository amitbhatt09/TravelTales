import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseUrl from '../apiConfig';
import 'bootstrap/dist/css/bootstrap.css';
import TravellerNavbar from './TravellerNavbar';
import './TravellerViewPlace.css';

const ViewPlace = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const username = localStorage.getItem('username') || 'Guide';
  const role = localStorage.getItem('role') || 'Traveller';

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseUrl}/api/Place`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlaces(response.data);
      } catch (err) {
        console.error('Error fetching places:', err);
        setErrors('Failed to fetch places. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, []);

 const filteredPlaces = places.filter((place) => {
  const query = searchQuery.toLowerCase();

  return (
    place.Name.toLowerCase().includes(query) ||
    place.Category.toLowerCase().includes(query) ||
    place.Location.toLowerCase().includes(query)
  );
});


  return (
    <div className="bColor">
      <TravellerNavbar username={username} role={role} />

      <div className="form">
        <div className="container mt-5">
          <div className="table-container">

            <h2 className="text-center">Your next destination is awaiting you!!!</h2>

            <div className="search-box text-center mb-4">
              <input
                type="text"
                placeholder="Search places..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control search-input"
              />
            </div>

            {errors && <p className="text-danger text-center">{errors}</p>}

            {loading && (
              <div className="text-center">
                <div className="spinner-border text-primary mb-2"></div>
                <div className="mt-2">Loading...</div>
              </div>
            )}

            <table className="table table-bordered table-striped text-center">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Best time to visit</th>
                </tr>
              </thead>

              <tbody>
                {filteredPlaces.length === 0 && !loading && !errors && (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">
                      No Places found.
                    </td>
                  </tr>
                )}

                {filteredPlaces.map((myPlace) => (
                  <tr key={myPlace.PlaceId}>

                    {/* CLICKABLE IMAGE (Same as Guide) */}
                    <td>
                      <a
                        href="https://www.makemytrip.com/homestays/"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Click to explore stays"
                      >
                        <img
                          src={myPlace.PlaceImage || 'https://via.placeholder.com/100'}
                          alt={myPlace.Name}
                          style={{
                            width: '120px',
                            height: '120px',
                            objectFit: 'cover',
                            cursor: 'pointer',
                            borderRadius: '5px',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                            transition: 'transform 0.3s ease'
                          }}
                          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        />
                      </a>
                    </td>

                    <td>{myPlace.Name}</td>
                    <td>{myPlace.Category}</td>
                    <td>{myPlace.Location}</td>
                    <td>{myPlace.BestTimeToVisit}</td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPlace;
