// ListingDetailPage.jsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListingById, selectCurrentListing } from '../../store/listings';
import './ListingDetailPage.css';
import EditButton from '../editfunction/editbutton';
import DeleteButton from '../DeleteFunction/deleteListingButton';
import ShowingDisplay from '../showings/ShowingDisplay';

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
      <div className="detail-item detail-item-title">
        <h1>{currentListing.title}</h1>
        <div className="control-buttons">
          <EditButton listingId={id} />
          <DeleteButton listingId={id} />
        </div>
      </div>
      <div className="detail-item">
        <h2 className="latest-bid">Latest Bid: {currentListing.price}</h2>
      </div>
      <div className="detail-item">
        <img src={currentListing.main_image} alt={`${currentListing.title} main image`} />
        <p className="detail-item-desc">{currentListing.description}</p>
      </div>
      <div className="detail-item">
        <ShowingDisplay listingId={id} />
      </div>
      <div className="detail-item address">
        <p>{currentListing.address}, {currentListing.city}, {currentListing.state}, {currentListing.zip_code}</p>
        <p>Country: {currentListing.country}</p>
      </div>
      <div className="detail-item metadata">
        <p>Created by: {currentListing.created_by}</p>
        <p>Created at: {new Date(currentListing.created_at).toLocaleDateString()}</p>
        <p>Updated at: {new Date(currentListing.updated_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default ListingDetailPage;
