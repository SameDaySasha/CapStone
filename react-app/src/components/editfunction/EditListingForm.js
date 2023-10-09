
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchListingById, updateListing, selectCurrentListing } from '../../store/listings'; 
import '../ListingForm/listingform.css';

function EditListingForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const currentListing = useSelector(selectCurrentListing);
  const [errors, setErrors] = useState({});

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [price, setPrice] = useState('');
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    if (currentListing) {
      setTitle(currentListing.title);
      setDescription(currentListing.description);
      setAddress(currentListing.address);
      setCity(currentListing.city);
      setState(currentListing.state);
      setCountry(currentListing.country);
      setZipCode(currentListing.zip_code);
      setPrice(currentListing.price);
      setMainImage(currentListing.main_image);
    } else if (id) {
      dispatch(fetchListingById(id));
    }
  }, [dispatch, id, currentListing]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Initialize an empty errors object
    let newErrors = {};
  
    // Check if zipCode is longer than 10 characters
    if (zipCode.length > 10) {
      newErrors.zipCode = ["Zip code must be 10 or less characters long"];
    }
    if (state.length > 20) {
      newErrors.state = ["State must be 20 or less characters long"];
    }
    // If there are any errors, update the state and return early
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    const updatedData = {
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
      const response = await dispatch(updateListing({ id, updatedData }));
    
      if (response.type === "listings/update/fulfilled") {
        history.push(`/listings/${id}`); // Redirect to the edited listing page
      } else if (response.type === "listings/update/rejected") {
        const parsedErrors = JSON.parse(response.error.message); // Parsing the stringified errors object
        setErrors(parsedErrors);
      }
    } catch (error) {
      console.error('Error updating listing:', error);
    }  
  };

  return (
    <div className="listingForm-container">
      <form onSubmit={handleSubmit} className="listingForm-form">
        {errors.title && <div className="listingForm-error">{errors.title[0]}</div>}
        <div className="listingForm-item">
          <label className="listingForm-label">
            Title:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="listingForm-input" />
          </label>
        </div>
        {errors.description && <div className="listingForm-error">{errors.description[0]}</div>}
        <div className="listingForm-item">
          <label className="listingForm-label">
            Description:
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className="listingForm-textarea" />
          </label>
        </div>
        {errors.address && <div className="listingForm-error">{errors.address[0]}</div>}
        <div className="listingForm-item">
          <label className="listingForm-label">
            Address:
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required className="listingForm-input" />
          </label>
        </div>
        {errors.city && <div className="listingForm-error">{errors.city[0]}</div>}
        <div className="listingForm-item">
          <label className="listingForm-label">
            City:
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required className="listingForm-input" />
          </label>
        </div>
        {errors.state && <div className="listingForm-error">{errors.state[0]}</div>}
        <div className="listingForm-item">
          <label className="listingForm-label">
            State:
            <input type="text" value={state} onChange={(e) => setState(e.target.value)} required className="listingForm-input" />
          </label>
        </div>
        {errors.country && <div className="listingForm-error">{errors.country[0]}</div>}
        <div className="listingForm-item">
          <label className="listingForm-label">
            Country:
            <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required className="listingForm-input" />
          </label>
        </div>
        {errors.zipCode && <div className="listingForm-error">{errors.zipCode[0]}</div>}
        <div className="listingForm-item">
          <label className="listingForm-label">
            Zip Code:
            <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required className="listingForm-input" />
          </label>
        </div>
        {errors.price && <div className="listingForm-error">{errors.price[0]}</div>}
        <div className="listingForm-item">
          <label className="listingForm-label">
            Price:
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required className="listingForm-input" />
          </label>
        </div>
        {errors.mainImage && <div className="listingForm-error">{errors.mainImage[0]}</div>}
        <div className="listingForm-item">
          <label className="listingForm-label">
            Main Image URL:
            <input type="text" value={mainImage} onChange={(e) => setMainImage(e.target.value)} required className="listingForm-input" />
          </label>
        </div>
        <div className="listingForm-item">
          <button type="submit" className="listingForm-button">Update Listing</button>
        </div>
      </form>
    </div>
  );  
}

export default EditListingForm;