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

  /* 🔹 PAGINATION STATES */
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const username = localStorage.getItem('username') || 'Guest';
  const role = localStorage.getItem('role') || 'Traveller';

  /* 🔹 FETCH DATA */
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseUrl}/api/Place`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlaces(response.data);
      } catch (err) {
        setErrors('Failed to load places');
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, []);

  /* 🔹 WIKI LINK */
  const getWikiLink = (place) => {
    const text = place.Name || place.Location;
    const formatted = text.trim().replace(/\s+/g, "_");
    return `https://en.wikipedia.org/wiki/${formatted}`;
  };

  /* 🔹 SEARCH FILTER */
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

  /* 🔹 SMART PAGINATION (<< >> ...) */
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

  /* 🔹 ACTIONS */
  const handleEdit = (place) => navigate(`/editplace/${place.PlaceId}`);

  const openDeleteModal = (id) => {
    setselectedPlaceId(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setselectedPlaceId(null);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${baseUrl}/api/Place/${selectedID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlaces((prev) => prev.filter((p) => p.PlaceId !== selectedID));
    } catch {
      alert('Delete failed');
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

            <h2 className="subtitle">Discover places worth the journey</h2>

            {/* SEARCH */}
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


            {/* 🔹 PAGINATION TOP RIGHT */}
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
                  return (
                    <span key={index} className="page-dots">...</span>
                  );
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
                {currentRecords.length === 0 && !loading && (
                  <tr>
                    <td colSpan="6" className="text-muted">No Places Found</td>
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
                    <td>
                      <div className="action-buttons">
                        <button className="btn btn-edit" onClick={() => handleEdit(place)}>Edit</button>
                        <button className="btn btn-delete" onClick={() => openDeleteModal(place.PlaceId)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      </div>

      {/* DELETE MODAL */}
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
  );
};

export default ViewPlace;
