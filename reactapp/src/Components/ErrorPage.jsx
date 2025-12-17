import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/home'); // Redirects to the homepage
    };

    return (
        <div className="error-container">
            <div className="error-content">
                <div className="error-icon">⚠️</div>
                <h1>Oops! Something Went Wrong</h1>
                <p>Please try again later.</p>
                <button className="error-button" onClick={handleRedirect}>
                    Go to Homepage
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;