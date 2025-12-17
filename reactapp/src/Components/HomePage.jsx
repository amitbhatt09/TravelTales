import React, { useState, useEffect } from 'react';
import GuideNavbar from '../GuideComponents/GuideNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';
import axios from 'axios';
import baseUrl from '../apiConfig';
import TravellerNavbar from '../TravellerComponents/TravellerNavbar';

const HomePage = () => {
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [homePage, setHomePage] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorOccurred, setErrorOccurred] = useState(false);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username') || 'GuideUser';
        const storedRole = localStorage.getItem('role') || 'Traveller';
        setUsername(storedUsername);
        setRole(storedRole);
    }, []);

    const fetchHomePage = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${baseUrl}/home`);
            console.log('Response:', response.data);
            setHomePage(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching home page:', error);
            setErrorOccurred(true);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchHomePage();
    }, []);

    return (
        <div className="home-page">
            <span>
                {role === "Traveller" ? (
                    <TravellerNavbar username={username} role={role} />
                ) : (
                    <GuideNavbar username={username} role={role} />
                )}
            </span>
            <div>
                <p className="wel">
                    Welcome to Travel Tales, your gateway to exploring amazing travel destinations around the world. Discover curated itineraries and find your perfect getaway, and receive personalized recommendations tailored to your travel style and budget.
                </p>
            </div>
            <footer className="footer unique-padding">
                <div className="footer-center">
                    <p>Contact Us</p>
                    <p>Email: example@travelcorp.com</p>
                    <p>Phone: 012-345-6780</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;