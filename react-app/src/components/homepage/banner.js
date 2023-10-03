import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Add this import
import ProfileButton from '../Navigation/ProfileButton';
import './Banner.css';

const Banner = ({isLoaded}) => {
  const history = useHistory();
  const user = useSelector((state) => state.session.user); // Add this line to get current user

  const handleLogoClick = () => {
    history.push('/');
  };

  return (
    <div className="banner">
      <div className="banner-logo" onClick={handleLogoClick}>
        My Logo
      </div>
      <div>
        <ProfileButton user={user} /> 
      </div>
    </div>
  );
};

export default Banner;
