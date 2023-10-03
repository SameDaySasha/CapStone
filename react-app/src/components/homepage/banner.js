import React from 'react';
import { useHistory } from 'react-router-dom';
import ProfileButton from '../Navigation/ProfileButton';
import './Banner.css';

const Banner = () => {
  const history = useHistory();

  const handleLogoClick = () => {
    history.push('/');
  };

  return (
    <div className="banner">
      <div className="banner-logo" onClick={handleLogoClick}>
        My Logo
      </div>
      <div className="banner-button-container">
        <ProfileButton />
      </div>
    </div>
  );
};

export default Banner;
