import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
import './Signup.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userRole, setUserRole] = useState('');
    const [errors, setErrors] = useState({});
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSignup = async (e) => {
        e.preventDefault()
        let validationErrors = {};

        if (!username) {
            validationErrors.username = 'User Name is required';
        }

        if (!email) {
            validationErrors.email = 'Email is required';
        } else if (!validateEmail(email)) {
            validationErrors.email = 'Please enter a valid email';
        }

        if (!mobileNumber) {
            validationErrors.mobileNumber = 'Mobile number is required';
        } 
        else if (!/^\d{10}$/.test(mobileNumber)) {
            validationErrors.mobileNumber = 'Mobile number must be exactly 10 digits and no special characters allowed';
        }
        

        if (!password) {
            validationErrors.password = 'Password is required';
        } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password)) {
            validationErrors.password = 'Password must be strong\n Password at least contain 1 lowercase letter\nPassword at least contain 1 uppercase letter\nPassword at least contain 1 Special character.\nPassword at least contain 1 number.';
        }
        

        if (!confirmPassword) {
            validationErrors.confirmPassword = 'Confirm Password is required';
        } else if (password !== confirmPassword) {
            validationErrors.confirmPassword = 'Passwords do not match';
        }

        if (!userRole) {
            validationErrors.userRole = 'User Role is required';
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.post(`${API_BASE_URL}/register`, {
                    username,
                    email,
                    mobileNumber,
                    password,
                    userRole
                });

                if (response.status === 201) {
                    setShowSuccessModal(true);
                } else {
                    setErrors({ form: response.data.Message });
                }
            } catch (err) {
                setErrors({ form: 'An error occurred. Please try again later.' });
            }
        }
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        navigate('/');
    };

    return (
        <div className="container-fluid signup-container">
            <div className="row justify-content-center">
                <div className="col-md-6 signup-box shadow-lg p-4 rounded">
                    <h3 className="text-center text-brown mb-4">Signup</h3>
                    <form>
                        <div className="form-group mb-3">
                            <label htmlFor="userName">User Name <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                id="userName"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter username"
                            />
                            {errors.username && <div className="text-danger">{errors.username}</div>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="email">Email <span className="text-danger">*</span></label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email"
                            />
                            {errors.email && <div className="text-danger">{errors.email}</div>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="mobileNumber">Mobile Number <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                id="mobileNumber"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                placeholder="Enter mobile number"
                            />
                            {errors.mobileNumber && <div className="text-danger">{errors.mobileNumber}</div>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password">Password <span className="text-danger">*</span></label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
{errors.password && (
  <div className="text-danger">
    {errors.password.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ))}
  </div>
)}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="confirmPassword">Confirm Password <span className="text-danger">*</span></label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password"
                            />
                            {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="userRole">User Role <span className="text-danger">*</span></label>
                            <select
                                className="form-control"
                                id="userRole"
                                value={userRole}
                                onChange={(e) => setUserRole(e.target.value)}
                            >
                                <option value="">Select Role</option>
                                <option value="Guide">Guide</option>
                                <option value="Traveller">Traveller</option>
                            </select>
                            {errors.userRole && <div className="text-danger">{errors.userRole}</div>}
                        </div>
                        <button type="button" className="btn-submit" onClick={handleSignup}>Submit</button>
                        {errors.form && <div className="text-danger mt-3">{errors.form}</div>}
                    </form>
                    <p className="mt-3 text-center text-bold">
                        Already have an account? <a href="/login" className="text-brown font-bold">Login</a>
                    </p>
                </div>
            </div>

            <Modal show={showSuccessModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>User Registration is Successful!</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Signup;