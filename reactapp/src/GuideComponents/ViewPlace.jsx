import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GuideNavbar from './GuideNavbar';
import baseUrl from '../apiConfig';
import 'bootstrap/dist/css/bootstrap.css';
import './ViewPlace.css';

const ViewPlace = () => {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedID, setselectedPlaceId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const username = localStorage.getItem('username') || 'Guest';
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
        setErrors('Failed to load places');
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, [navigate]);

  const filteredPlaces = places.filter((place) => {
    const q = searchQuery.toLowerCase();
    return (
      place.Name.toLowerCase().includes(q) ||
      place.Category.toLowerCase().includes(q) ||
      place.Location.toLowerCase().includes(q)
    );
  });

  const handleEdit = (myPlace) => {
    navigate(`/editplace/${myPlace.PlaceId}`);
  };

  const openDeleteModal = (placeId) => {
    setselectedPlaceId(placeId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setselectedPlaceId(null);
    setShowDeleteModal(false);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${baseUrl}/api/Place/${selectedID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlaces(prev => prev.filter(p => p.PlaceId !== selectedID));
    } catch (err) {
      alert('Failed to delete');
    } finally {
      closeDeleteModal();
    }
  };

  return (
    <div className="bColor">
      <GuideNavbar username={username} role={role} />
      <div className="form">
        <div className="container mt-5">
          <div className="table-container">

            <h2 className="text-center">Your next destination is awaiting you!!!</h2>

            {/* SEARCH BAR */}
            <div className="search-box text-center mb-4">
              <input
                type="text"
                placeholder="Search by name, category or location..."
                className="form-control search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredPlaces.length === 0 && !loading && (
                  <tr>
                    <td colSpan="6" className="text-muted text-center">
                      No Places Found
                    </td>
                  </tr>
                )}

                {filteredPlaces.map((myPlace) => (
                  <tr key={myPlace.PlaceId}>
                    <td>
                      <a
                        href="https://www.makemytrip.com/homestays/"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Click to explore stays"
                      >

                        <img
                          src={myPlace.PlaceImage || 'https://via.placeholder.com/150'}
                          alt={myPlace.Name}
                          style={{
                            width: '150px',
                            height: '150px',
                            objectFit: 'cover',
                            cursor: 'pointer',
                            borderRadius: '8px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                            transition: 'transform 0.3s'
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
                    <td>
                      <div className="action-buttons">
                        <button className="btn btn-edit" onClick={() => handleEdit(myPlace)}>Edit</button>
                        <button className="btn btn-delete" onClick={() => openDeleteModal(myPlace.PlaceId)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          {showDeleteModal && (
            <div className="modal fade show d-block">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title mx-auto">Are you sure?</h5>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-danger" onClick={confirmDelete}>Yes</button>
                    <button className="btn btn-secondary" onClick={closeDeleteModal}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ViewPlace;
