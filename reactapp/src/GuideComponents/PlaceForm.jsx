import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import GuideNavbar from './GuideNavbar';
import baseUrl from '../apiConfig';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Modal from '../ui/Modal';
import { joinLocation, splitLocation } from '../ui/utils';

const PlaceForm = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    Name: '',
    Category: '',
    BestTimeToVisit: '',
    Location: '',
    PlaceImage: '',
    Description: '',
  });
  const [country, setCountry] = useState('');
  const [stateName, setStateName] = useState('');
  const [attractions, setAttractions] = useState('');
  const [estimatedBudget, setEstimatedBudget] = useState('');
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
          const response = await axios.get(`${baseUrl}/api/Place/${id}`, {
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
            Description: placeData.Description || '',
          });
          const parsed = splitLocation(placeData.Location || '');
          setStateName(parsed.state);
          setCountry(parsed.country);
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
    if (!stateName || !country) newErrors.Location = 'State and country are required';
    if (!formData.PlaceImage) newErrors.PlaceImage = 'Place image is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  setLoading(true);
  setFormError('');

  try {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    const normalizedLocation = joinLocation(stateName, country);
    const enrichedDescription = [
      formData.Description,
      attractions ? `Attractions: ${attractions}` : '',
      estimatedBudget ? `Estimated Budget: ${estimatedBudget}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    const payload = {
      ...formData,
      Location: normalizedLocation,
      Description: enrichedDescription,
    };

    // ---------- ADD MODE VALIDATION ----------
    if (mode === 'add') {
      // Get all places
      const allPlacesResponse = await axios.get(`${baseUrl}/api/Place`, { headers });
      const allPlaces = allPlacesResponse.data;

      const newName = formData.Name.trim().toLowerCase();

      // Check for partial name match
      const duplicate = allPlaces.find(place => {
        const existingName = place.Name.trim().toLowerCase();
        return (
          existingName.includes(newName) ||
          newName.includes(existingName)
        );
      });

      if (duplicate) {
        setFormError(`Place "${duplicate.Name}" already exists.`);
        setLoading(false);
        return;
      }
    }

    // ---------- SAVE ----------
    if (mode === 'edit') {
      // Update without blocking any field
      await axios.put(`${baseUrl}/api/Place/${id}`, payload, { headers });
    } else {
      await axios.post(`${baseUrl}/api/Place`, payload, { headers });
    }

    setShowPopup(true);
  } catch (error) {
    console.error('Error saving place:', error);

    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      navigate('/');
    } else if (error.response && error.response.data?.message) {
      setFormError(error.response.data.message);
    } else {
      setFormError('Failed to save place. Please try again.');
    }
  } finally {
    setLoading(false);
  }
};


  const handlePopupClose = () => {
    setShowPopup(false);
    navigate('/viewplace');
  };

  const descriptionLength = (formData.Description || '').length;

  return (
    <div className="min-h-screen pb-16">
      <GuideNavbar username={username} role={role} />
      <main className="section-shell pt-32">
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-4xl">
          <Card className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-500">Destination studio</p>
                <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{mode === 'edit' ? 'Edit destination' : 'Create destination'}</h1>
              </div>
              <Badge variant="secondary">Guide role</Badge>
            </div>
            {formError ? <p className="mt-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600 dark:bg-rose-500/10 dark:text-rose-300">{formError}</p> : null}

            <form onSubmit={handleSubmit} className="mt-6 grid gap-5" noValidate>
              <div>
                <label htmlFor="Name" className="field-label">Place name</label>
                <input type="text" id="Name" name="Name" className="field-input" value={formData.Name} onChange={handleChange} maxLength={80} />
                <div className="mt-2 flex items-center justify-between text-xs text-slate-500"><span>{errors.Name || ''}</span><span>{formData.Name.length}/80</span></div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="Category" className="field-label">Category</label>
                  <select id="Category" name="Category" className="field-input" value={formData.Category} onChange={handleChange}>
                    <option value="">Select a category</option>
                    <option value="Beach">Beach</option>
                    <option value="Mountain">Mountain</option>
                    <option value="City">City</option>
                    <option value="Historical">Historical</option>
                  </select>
                  {errors.Category ? <p className="mt-2 text-xs text-rose-500">{errors.Category}</p> : null}
                </div>
                <div>
                  <label htmlFor="BestTimeToVisit" className="field-label">Best time to visit</label>
                  <input type="text" id="BestTimeToVisit" name="BestTimeToVisit" className="field-input" value={formData.BestTimeToVisit} onChange={handleChange} placeholder="Nov - Mar" />
                  {errors.BestTimeToVisit ? <p className="mt-2 text-xs text-rose-500">{errors.BestTimeToVisit}</p> : null}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="State" className="field-label">State</label>
                  <input id="State" className="field-input" value={stateName} onChange={(e) => setStateName(e.target.value)} placeholder="Kerala" />
                </div>
                <div>
                  <label htmlFor="Country" className="field-label">Country</label>
                  <input id="Country" className="field-input" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="India" />
                </div>
              </div>
              {errors.Location ? <p className="-mt-2 text-xs text-rose-500">{errors.Location}</p> : null}

              <div>
                <label htmlFor="Description" className="field-label">Description</label>
                <textarea id="Description" name="Description" className="field-textarea" value={formData.Description} onChange={handleChange} maxLength={320} placeholder="Describe the destination experience..." />
                <div className="mt-2 flex items-center justify-between text-xs text-slate-500"><span>Beautiful, concise copy converts better.</span><span>{descriptionLength}/320</span></div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="Attractions" className="field-label">Attractions</label>
                  <input id="Attractions" className="field-input" value={attractions} onChange={(e) => setAttractions(e.target.value)} placeholder="Beaches, cliff points" />
                </div>
                <div>
                  <label htmlFor="EstimatedBudget" className="field-label">Estimated budget</label>
                  <input id="EstimatedBudget" className="field-input" value={estimatedBudget} onChange={(e) => setEstimatedBudget(e.target.value)} placeholder="$120/day" />
                </div>
              </div>

              <div>
                <label htmlFor="PlaceImage" className="field-label">Image URL</label>
                <input type="url" id="PlaceImage" name="PlaceImage" className="field-input" value={formData.PlaceImage} onChange={handleChange} placeholder="https://images.unsplash.com/..." />
                {errors.PlaceImage ? <p className="mt-2 text-xs text-rose-500">{errors.PlaceImage}</p> : null}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>Back</Button>
                <Button type="submit" disabled={loading}>{loading ? 'Saving...' : mode === 'edit' ? 'Update destination' : 'Add destination'}</Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </main>

      <Modal open={showPopup} onOpenChange={setShowPopup} title="Success" description={mode === 'edit' ? 'Place updated successfully.' : 'Place added successfully.'}>
        <div className="flex justify-end">
          <Button onClick={handlePopupClose}>Close</Button>
        </div>
      </Modal>
    </div>
  );
};

export default PlaceForm;