import React, { useState } from 'react';
import './TravellerNavbar.css';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const TravellerNavbar = ({ username, role }) => {
    const [showLogoutModel, setShowLogoutModel] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        setShowLogoutModel(true);
    };

    const handleCloseModel = () => setShowLogoutModel(false);

    const handleLogout = () => {
        navigate('/login');
        setShowLogoutModel(false);
    };

    const handleCancel = () => setShowLogoutModel(false);

    return (
        <div className="nav-page">
            <nav className="navbar navbar-expand-lg custom-navbar">
                <div className="container-fluid">

                    {/* Brand (same as GuideNavbar) */}
                    <div
                        className="navbar-brand"
                        onClick={() => {
                            if (location.pathname === "/home") {
                                window.location.reload();   // refresh if already home
                            } else {
                                navigate("/home");          // go to home
                            }
                        }}
                    >
                        <i className="bi bi-suitcase2-fill me-2"></i>
                        TRAVEL TALES
                    </div>


                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto align-items-center">

                            {/* Place dropdown (Traveller can ONLY view) */}
                            <li className="nav-item dropdown me-3">
                                <select
                                    className="form-select place-dropdown"
                                    defaultValue=""
                                    onChange={(e) => {
                                        if (e.target.value) {
                                            navigate(`/${e.target.value}`);
                                        }
                                    }}
                                >
                                    <option value="" disabled hidden>Place</option>
                                    <option value="travellerviewplace">View Places</option>
                                </select>
                            </li>

                            {/* Username / Role (same style as GuideNavbar) */}
                            <li className="nav-item me-3">
                                <span className="user-label">
                                    {username} / {role}
                                </span>
                            </li>

                            {/* Logout */}
                            <li className="nav-item">
                                <button className="btn light-brown-btn" onClick={handleLogoutClick}>
                                    <i className="fas fa-sign-out-alt me-2"></i>Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Logout Modal */}
            <Modal
                show={showLogoutModel}
                onHide={handleCloseModel}
                centered
                dialogClassName="logout-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to logout?</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleLogout}>
                        Yes, Logout
                    </Button>
                    <Button variant="danger" onClick={handleCancel}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default TravellerNavbar;
