import React, { useState, useEffect } from 'react';
import GuideNavbar from '../GuideComponents/GuideNavbar';
import TravellerNavbar from '../TravellerComponents/TravellerNavbar';
import './HomePage.css';

const slides = [
  <>
    Welcome to <span>Travel Tales</span>, your gateway to exploring amazing
    travel destinations around the world.
  </>,
  <>
    Pick your <span>favourite places</span>, explore categories and know the
    <span> best time to visit</span>.
  </>,
  <>
    Discover, explore and plan your journeys with <span>Travel Tales</span>.
    Your travel companion for every adventure.
  </>
];

const HomePage = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setUsername(localStorage.getItem('username'));
    setRole(localStorage.getItem('role'));
  }, []);

  // Carousel auto change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 4000); // Changed to 4 seconds for better readability

    return () => clearInterval(interval);
  }, []);

  // Handle dot click
  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="home-page">

      {role === "Traveller"
        ? <TravellerNavbar username={username} role={role} hideHome />
        : <GuideNavbar username={username} role={role} hideHome />
      }

      <div className="welcome-box">

        <div className="carousel-wrapper">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <p>{slide}</p>
            </div>
          ))}
        </div>

        <div className="carousel-dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>

      </div>

      <footer className="footer">
        <div className="footer-center">
          <h4>Contact Us</h4>
          <p>
  📧{' '}
  <a
    href="mailto:TravelTales@gmail.com"
    className="email"
    title="Send us an email"
  >
    TravelTales@gmail.com
  </a>
</p>

          <p>📞 +91 98765 43210</p>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;