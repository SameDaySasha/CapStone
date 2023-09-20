import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createListing, fetchListingById } from '../../store/listings'; // Adjust the import path to point to your listings slice
import './listingform.css'
function ListingForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [price, setPrice] = useState('');
  const [mainImage, setMainImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newListingData = {
      title,
      description,
      address,
      city,
      state,
      country,
      zip_code: zipCode,
      price,
      main_image: mainImage,
    };
  
    try {
      const response = await dispatch(createListing(newListingData));
      console.log('Response type:', response.type); // Log the response type
      console.log('Response payload:', response.payload); // Log the response payload
  
      if (response.type === "listings/createListing/fulfilled") {
        if (response.payload && response.payload.id) {
          const newListingId = response.payload.id; 
          await dispatch(fetchListingById(newListingId));
          history.push(`/listings/${newListingId}`); 
        } else {
          console.error('Unexpected payload structure:', response.payload);
        }
      } else {
        console.error('Listing creation not fulfilled:', response);
      }
    } catch (error) {
      console.error('Error creating new listing:', error);
    }
  };
  
  return (
    <div className="listingForm-container">
      <form onSubmit={handleSubmit} className="listingForm-form">
        <div className="listingForm-item">
          <label className="listingForm-label">
            Title:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="listingForm-input" />
          </label>
        </div>
        <div className="listingForm-item">
          <label className="listingForm-label">
            Description:
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className="listingForm-textarea" />
          </label>
        </div>
        <div className="listingForm-item">
          <label className="listingForm-label">
            Address:
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required className="listingForm-input" />
          </label>
        </div>
        <div className="listingForm-item">
          <label className="listingForm-label">
            City:
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required className="listingForm-input" />
          </label>
        </div>
        <div className="listingForm-item">
          <label className="listingForm-label">
            State:
            <input type="text" value={state} onChange={(e) => setState(e.target.value)} required className="listingForm-input" />
          </label>
        </div>
        <div className="listingForm-item">
          <label className="listingForm-label">
            Country:
            <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required className="listingForm-input" />
          </label>
        </div>
        <div className="listingForm-item">
          <label className="listingForm-label">
            Zip Code:
            <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required className="listingForm-input" />
          </label>
        </div>
        <div className="listingForm-item">
          <label className="listingForm-label">
            Price:
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required className="listingForm-input" />
          </label>
        </div>
        <div className="listingForm-item">
          <label className="listingForm-label">
            Main Image URL:
            <input type="text" value={mainImage} onChange={(e) => setMainImage(e.target.value)} required className="listingForm-input" />
          </label>
        </div>
        <div className="listingForm-item">
          <button type="submit" className="listingForm-button">Create Listing</button>
        </div>
      </form>
    </div>
  );  
}

export default ListingForm;
