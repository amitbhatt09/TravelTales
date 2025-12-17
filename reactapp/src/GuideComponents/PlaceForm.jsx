import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './PlaceForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import GuideNavbar from './GuideNavbar';
import baseUrl from '../apiConfig';

const PlaceForm = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    Name: '',
    Category: '',
    BestTimeToVisit: '',
    Location: '',
    PlaceImage: null,
  });
  const [fileName, setFileName] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const username = localStorage.getItem('username') || 'Guide';
  const role = localStorage.getItem('role') || 'Traveller';

 
  useEffect(() => {
    const fetchPlaceData = async () => {
      if (mode === 'edit' && id) {
        setLoading(true);
        try {
          const response = await axios.get(`${baseUrl}/Place/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          const placeData = response.data;
          setFormData({
            Name: placeData.Name,
            Category: placeData.Category,
            BestTimeToVisit: placeData.BestTimeToVisit,
            Location: placeData.Location,
            PlaceImage: placeData.PlaceImage,
          });
        } catch (error) {
          setFormError('Error fetching place data');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchPlaceData();
  }, [mode, id]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.Name) newErrors.Name = 'Name is required';
    if (!formData.Category) newErrors.Category = 'Category is required';
    if (!formData.BestTimeToVisit) newErrors.BestTimeToVisit = 'Best Time to Visit is required';
    if (!formData.Location) newErrors.Location = 'Location is required';
    if (!formData.PlaceImage) newErrors.PlaceImage = 'Place image is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {

      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      if (mode === 'edit') {
        const currentResponse =await axios.get(`${baseUrl}/Place/${id}`, { headers });

        const currentCategory=currentResponse.data.Category;
        
        if(formData.Category === currentCategory){
          setFormError('Please choose a different category');
          setLoading(false);
          return;
        } 
        await axios.put(`${baseUrl}/Place/${id}`, formData, { headers });
        
      } else {
        await axios.post(`${baseUrl}/Place`, formData, { headers });
      }
      setLoading(false);
      setShowPopup(true);
    } catch (error) {
      setLoading(false);
      console.error('Error saving place:', error);
      if (error.response && error.response.status === 400) {
          const errorMessage = error.response.data.message || 'Category already exists. Cannot update the place.';
          setFormError(errorMessage);
          if (error.response && error.response.status === 400 && mode==="add") {
            const errorMessage = error.response.data.message || 'Name already exists. Cannot add the place.';
              setFormError(errorMessage);
          }
      } 
      else if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/');
      } 
      else {
          setFormError('An error occurred while saving the place. Please try again.');
      }
  }
};

  const handlePopupClose = () => {
    setShowPopup(false);
    navigate('/viewplace');
  };

  return (
    <div className='bColor'>
    <div className="placeform">
      <GuideNavbar username={username} role={role} />
      <div className="container place-form-container">
        <h2 className="form-title">{mode === 'edit' ? 'Edit Place' : 'Create New Place'}</h2>
        {formError && <p className="text-danger text-center">{formError}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="Name">Name <span className="text-danger">*</span></label>
            <input
              type="text"
              id="Name"
              name="Name"
              className="form-control"
              value={formData.Name}
              onChange={handleChange}
            />
            {errors.Name && <small className="text-danger">{errors.Name}</small>}
          </div>
          <div className="form-group">
            <label htmlFor="Category">Category <span className="text-danger">*</span></label>
            <select
              id="Category"
              name="Category"
              className="form-control"
              value={formData.Category}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              <option value="Beach">Beach</option>
              <option value="Mountain">Mountain</option>
              <option value="City">City</option>
              <option value="Historical">Historical</option>
            </select>
            {errors.Category && <small className="text-danger">{errors.Category}</small>}
          </div>
          <div className="form-group">
            <label htmlFor="BestTimeToVisit">Best Time to Visit <span className="text-danger">*</span></label>
            <input
              type="text"
              id="BestTimeToVisit"
              name="BestTimeToVisit"
              className="form-control"
              value={formData.BestTimeToVisit}
              onChange={handleChange}
            />
            {errors.BestTimeToVisit && <small className="text-danger">{errors.BestTimeToVisit}</small>}
          </div>
          <div className="form-group">
            <label htmlFor="Location">Location <span className="text-danger">*</span></label>
            <input
              type="text"
              id="Location"
              name="Location"
              className="form-control"
              value={formData.Location}
              onChange={handleChange}
            />
            {errors.Location && <small className="text-danger">{errors.Location}</small>}
          </div>
          <div className="form-group">
            <label htmlFor="PlaceImage">Place Image <span className="text-danger">*</span></label>
            <input
              type="file"
              id="PlaceImage"
              name="PlaceImage"
              className="form-control"
              onChange={handleChange}
            />
            {errors.PlaceImage && <small className="text-danger">{errors.PlaceImage}</small>}
          </div>
            {formData.PlaceImage && (
            <div className="text-center mb-4">
              <img
                src={formData.PlaceImage}
                alt="Place Preview"
                style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
              />
            </div>
          )}
         <div className="form-buttons">
    <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
    <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Loading...' : mode === 'edit' ? 'Update Place' : 'Add Place'}
    </button>
</div>
        </form>
      </div>
      {showPopup && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div>
                <h5>Success</h5>
              </div>
              <div className="modal-body text-center">
                <p>{mode === 'edit' ? 'Place updated successfully!' : 'Place added successfully!'}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-success" onClick={handlePopupClose}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default PlaceForm;