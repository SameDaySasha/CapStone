import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListingById, selectCurrentListing } from '../../store/listings'; // Adjust the path
import './ListingDetailPage.css'; // Import the CSS

function ListingDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentListing = useSelector(selectCurrentListing);

  useEffect(() => {
    if (id) {
      dispatch(fetchListingById(id));
    }
  }, [id, dispatch]);

  if (!currentListing) {
    return <div>Loading...</div>;
  }

  return (
    <div className="detail-container">
      <div className="detail-item">
        <h1 className="detail-item-title">{currentListing.title}</h1>
      </div>
      <div className="detail-item">
        <img src={currentListing.main_image} alt={`${currentListing.title} main image`} />
      </div>
      <div className="detail-item">
        <p className="detail-item-desc">Price: {currentListing.price}</p>
      </div>
      <div className="detail-item">
        <p className="detail-item-desc">Address: {currentListing.address}, {currentListing.city}, {currentListing.state}, {currentListing.zip_code}</p>
      </div>
      <div className="detail-item">
        <p className="detail-item-desc">Country: {currentListing.country}</p>
      </div>
      <div className="detail-item">
        <p className="detail-item-desc">Created by: {currentListing.created_by}</p>
      </div>
      <div className="detail-item">
        <p className="detail-item-desc">Description: {currentListing.description}</p>
      </div>
      <div className="detail-item">
        <p className="detail-item-desc">Created at: {new Date(currentListing.created_at).toLocaleDateString()}</p>
      </div>
      <div className="detail-item">
        <p className="detail-item-desc">Updated at: {new Date(currentListing.updated_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default ListingDetailPage;
