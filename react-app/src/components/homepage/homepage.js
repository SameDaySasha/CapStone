import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListings, selectAllListings, selectStatus } from '../../store/listings'; // Adjust the import path according to your project structure
import './devstyles.css'

function ListingsPage() {
  const dispatch = useDispatch();
  const listings = useSelector(selectAllListings);
  const status = useSelector(selectStatus);

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
    <div className="container">
      {listings.map(listing => (
        <div key={listing.id} className="item">
          <img src={listing.main_image} alt={`${listing.title} preview`} className="item-preview" />
          <h2>{listing.title}</h2>
          <p>{listing.address}, {listing.city}, {listing.state}, {listing.zip_code}</p>
        </div>
      ))}
    </div>
  );
}

export default ListingsPage;
