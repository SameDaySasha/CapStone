import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editShowing, fetchShowingDetails, selectCurrentShowing } from '../../store/showings'; // Adjust the import path

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
      // Add other fields here if needed
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
    <div className="showingForm-container">
      <form onSubmit={handleSubmit} className="showingForm-form">
        <div className="showingForm-item">
          <label className="showingForm-label">
            Select Date and Time:
            <input 
              type="datetime-local" 
              value={dateTime} 
              onChange={(e) => setDateTime(e.target.value)} 
              required 
              className="showingForm-input" 
            />
          </label>
        </div>
        <div className="showingForm-item">
          <button type="submit" className="showingForm-button">Update Showing</button>
        </div>
      </form>
    </div>
  );  
}

export default EditShowingForm;
