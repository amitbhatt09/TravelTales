import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './GuideNavbar.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const GuideNavbar = ({ username, role }) => {
    const [showLogoutModel, setShowLogoutModel] = useState(false);
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        setShowLogoutModel(true);
    };

    const handleCloseModel = () => {
        setShowLogoutModel(false);
    };

    const handleLogout = () => {
        navigate('/login');
        setShowLogoutModel(false);
    };

    const handleCancel = () => {
        setShowLogoutModel(false);
    };
    console.log("user:",username);
    console.log("role:",role);

    return (
        <div className="nav-page">
            <nav className="navbar navbar-expand-lg custom-navbar">
                <div className="container-fluid">
                    <Link className="navbar-brand"><i class="bi bi-suitcase2-fill"></i> TRAVEL TALES</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/home">
                                    <i className="fas fa-home me-2"></i>Home
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <select
                                    className="form-select"
                                    onChange={(e) => {
                                        if (e.target.value) {
                                            navigate(`/${e.target.value}`);
                                        }
                                    }}
                                >
                                    <option value="">Place</option>
                                    <option value="placeform">Add Place</option>
                                    <option value="viewplace">View Place</option>
                                </select>
                            </li>
                            <li className="nav-item">
                                <p className="nav-link" to="/profile">{username}/{role}</p>
                            </li>
                            <li className="nav-item">
                                <button className="btn light-brown-btn" onClick={handleLogoutClick}>
                                    <i className="fas fa-sign-out-alt me-2"></i>Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Modal show={showLogoutModel} onHide={handleCloseModel}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to logout?</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleLogout}>Yes, Logout</Button>
                    <Button variant="danger" onClick={handleCancel}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default GuideNavbar;