import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from '../Navigation/ProfileButton';
import './Banner.css';

const Banner = ({isLoaded}) => {
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const handleLogoClick = () => {
    history.push('/');
  };

  return (
    <div className="banner">
      <div className="banner-logo" onClick={handleLogoClick}>
        BlandWatch Land Auctions
      </div>
      <div>
        <ProfileButton user={user} /> 
      </div>
    </div>
  );
};

export default Banner;
