import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createShowing } from '../../store/showings';
import './ShowingForm.css';

function ShowingForm({ listingId, setShowModal }) {  // Receive setShowModal as a prop
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
      if (response.type === "showings/create/fulfilled") {
        setShowModal(false);  // Close the modal using passed setShowModal
        history.push(`/listings/${listingId}`);
      } else {
        console.error('Showing creation not fulfilled:', response);
      }
    } catch (error) {
      console.error('Error creating new showing:', error);
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
          <button type="submit" className="tarkov-form-button">Create Showing</button>
        </div>
      </form>
    </div>
  );  
}

export default ShowingForm;
