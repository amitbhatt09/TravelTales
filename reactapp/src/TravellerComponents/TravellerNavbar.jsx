import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TravellerNavbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const TravellerNavbar = ({username,role}) => {
    const [showLogoutModel, setShowLogoutModel] = useState(false);
    const navigate=useNavigate();

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
    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        setShowLogoutModel(true);
    };
    return (
        <div className="nav-pagetraveller">
        <div className="travel-nav">
            <nav className="navbar navbar-expand-lg custom-navbar">
                <div className="container-fluid">
                    <Link className="navbar-brand"><i class="bi bi-suitcase2-fill"></i> TRAVEL TALES</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item"><Link className="nav-link" to="/home"> <i className="fas fa-home me-2"></i> Home</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/travellerviewplace"> <i class="bi bi-geo"></i> Place</Link></li>
                            <li className="nav-item"><p className="nav-link" >{username}/{role}</p></li>
                            <li className="nav-item">
                                <button className="btn light-brown-btn" onClick={handleLogoutClick}>
                                <i className="fas fa-sign-out-alt me-2"></i> Logout</button>
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
        </div>
    );
};

export default TravellerNavbar;
