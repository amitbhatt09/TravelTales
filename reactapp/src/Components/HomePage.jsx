import React, { useState, useEffect } from 'react';
import GuideNavbar from '../GuideComponents/GuideNavbar';
import TravellerNavbar from '../TravellerComponents/TravellerNavbar';
import './HomePage.css';

const HomePage = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    setUsername(localStorage.getItem('username'));
    setRole(localStorage.getItem('role'));
  }, []);

  return (
    <div className="home-page">

      {role === "Traveller"
        ? <TravellerNavbar username={username} role={role} hideHome />
        : <GuideNavbar username={username} role={role} hideHome />
      }

      <div className="welcome-box">
        <p>
          Welcome to <span>Travel Tales</span>, your gateway to exploring amazing
          travel destinations around the world.
        </p>
      </div>

      <footer className="footer">
        <div className="footer-center">
          <h4>Contact Us</h4>
          <p>📧 <span className="email">TravelTales@gmail.com</span></p>
          <p>📞 +91 98765 43210</p>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;
