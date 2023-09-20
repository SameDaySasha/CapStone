import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchListings, selectAllListings, selectStatus } from '../../store/listings'; 
import { selectUser } from '../../store/session'; // Adjust the path to your session slice
import './devstyles.css'

function ListingsPage() {
  const dispatch = useDispatch();
  const listings = useSelector(selectAllListings);
  const status = useSelector(selectStatus);
  const sessionUser = useSelector(selectUser); // Select the current session user

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchListings());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div className="item">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="item">Error loading listings</div>;
  }

  return (
    <div className="listingCard">
      {sessionUser && sessionUser.role === 'manager' && (
        <Link to="/create-listing">
          <button>Create a New Listing</button>
        </Link>
      )}
      {listings.map(listing => (
        <Link to={`/listings/${listing.id}`} key={listing.id} className="listing-link">
          <div className="item">
            <div className="image-container">
              <img src={listing.main_image} alt={`${listing.title} preview`} className="item-preview" />
            </div>
            <p className="price">{listing.price}</p>
            <div className="item-details">
              <p>{listing.title}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ListingsPage;
