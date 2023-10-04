import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editShowing, fetchShowingDetails, selectCurrentShowing } from '../../store/showings'; // Adjust the import path
import './EditShowingForm.css';  // Add this import line for CSS

function EditShowingForm({ listingId, showingId }) {
  const dispatch = useDispatch();
  const [dateTime, setDateTime] = useState('');
  const currentShowing = useSelector(selectCurrentShowing);

  useEffect(() => {
    if (showingId) {
      dispatch(fetchShowingDetails({ listingId, showingId }));
    }
  }, [dispatch, listingId, showingId]);

  useEffect(() => {
    if (currentShowing) {
      setDateTime(currentShowing.time);
    }
  }, [currentShowing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedData = {
      time: dateTime,
    };
  
    try {
      const response = await dispatch(editShowing({ listingId, showingId, updatedData }));
      if (response.type === "showings/editShowing/fulfilled") {
        window.location.reload();
      } else {
        console.error('Showing edit not fulfilled:', response);
      }
    } catch (error) {
      console.error('Error editing showing:', error);
    }
  };
  
  return (
    <div className="tarkov-form-container">
      <form onSubmit={handleSubmit} className="tarkov-form">
        <div className="tarkov-form-item">
          <label className="tarkov-form-label">
            Select Date and Time:
            <input 
              type="datetime-local" 
              value={dateTime} 
              onChange={(e) => setDateTime(e.target.value)} 
              required 
              className="tarkov-form-input" 
            />
          </label>
        </div>
        <div className="tarkov-form-item">
          <button type="submit" className="tarkov-form-button">Update Showing</button>
        </div>
      </form>
    </div>
  );  
}

export default EditShowingForm;
