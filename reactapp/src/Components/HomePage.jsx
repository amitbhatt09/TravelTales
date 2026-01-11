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
        ? <TravellerNavbar username={username} role={role} />
        : <GuideNavbar username={username} role={role} />
      }

      <div>
        <p className="wel">
          Welcome to Travel Tales, your gateway to exploring amazing travel destinations around the world.
        </p>
      </div>

      <footer className="footer">
        <p>Email: TravelTales.com</p>
      </footer>
    </div>
  );
};

export default HomePage;
