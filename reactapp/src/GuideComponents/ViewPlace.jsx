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
  const username = localStorage.getItem('username') || 'Guest';
  const role = localStorage.getItem('role') || 'Traveller';

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseUrl}/Place`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setPlaces(response.data);
      } catch (err) {
        console.error('Error fetching places:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, [navigate]);

  const handleEdit = (myPlace) => {
    if (!myPlace.PlaceId) {
      alert('Invalid place selected for editing');
      return;
    }
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
    if (!selectedID) {
      alert('Invalid place selected for deletion.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${baseUrl}/Place/${selectedID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlaces((prevPlaces) =>
        prevPlaces.filter((place) => place.PlaceId !== selectedID)
      );
    } catch (err) {
      console.error('Error deleting place:', err);
      if (err.response && err.response.status === 401) {
        alert('Unauthorized access. Please log in again.');
        localStorage.removeItem('token');
        navigate('/');
      } else {
        alert('Failed to delete the place. Please try again later.');
      }
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
            <div className="d-flex justify-content-center align-items-center mb-2 mt-4">
              <h2 className="text-center">Places</h2>
            </div>
            {errors && <p className="text-danger text-center">{errors}</p>}
            {loading && (
              <div className="text-center">
                <div
                  className="spinner-border text-primary mb-2"
                  role="status"
                  aria-hidden="true"
                ></div>
                <div className="mt-2">Loading...</div>
              </div>
            )}
            <table className="table table-bordered table-striped text-center">
              <thead className="thead-dark">
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
                {places.length === 0 && !loading && !errors && (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">
                      Oops!! No Places found.
                    </td>
                  </tr>
                )}
                {places.map((myPlace) => (
                  <tr key={myPlace.PlaceId}>
                    <td>
                      <img
                        src={myPlace.PlaceImage || 'https://via.placeholder.com/100'}
                        alt={myPlace.Name}
                        style={{ height: '50px', objectFit: 'cover' }}
                      />
                    </td>
                    <td>{myPlace.Name}</td>
                    <td>{myPlace.Category}</td>
                    <td>{myPlace.Location}</td>
                    <td>{myPlace.BestTimeToVisit}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn btn-edit"
                          onClick={() => handleEdit(myPlace)}
                          aria-label={`Edit ${myPlace.Name}`}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-delete"
                          onClick={() => openDeleteModal(myPlace.PlaceId)}
                          aria-label={`Delete ${myPlace.Name}`}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {showDeleteModal && (
            <div className="modal fade show d-block" tabIndex="-1" role="dialog">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title mx-auto">
                      Are you sure you want to delete this place?
                    </h5>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={confirmDelete}
                    >
                      Yes, Delete
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={closeDeleteModal}
                    >
                      Cancel
                    </button>
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