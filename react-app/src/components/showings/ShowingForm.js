import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createShowing } from '../../store/showings'; // Adjust the import path to point to your showings slice

function ShowingForm({ listingId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [dateTime, setDateTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newShowingData = {
      time: dateTime,
      status: "Open"
    };
  
    try {
      const response = await dispatch(createShowing({ listingId, newShowingData }));
      if (response.type === "showings/createShowing/fulfilled") {
        if (response.payload && response.payload.id) {
          const newShowingId = response.payload.id;
          history.push(`/showings/${newShowingId}`);
          window.location.reload(); 
        } else {
          console.error('Unexpected payload structure:', response.payload);
        }
      } else {
        console.error('Showing creation not fulfilled:', response);
      }
    } catch (error) {
      console.error('Error creating new showing:', error);
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
          <button type="submit" className="showingForm-button">Create Showing</button>
        </div>
      </form>
    </div>
  );  
}

export default ShowingForm;
