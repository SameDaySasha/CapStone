import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createShowing } from '../../store/showings';
import { selectUser } from '../../store/session';
import ShowingForm from './ShowingForm';
import './CreateShowingButton.css';  // Make sure this file is in the same directory as your component or update the path accordingly

const CreateShowingButton = ({ listingId }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const sessionUser = useSelector(selectUser);

  const handleCreateShowing = (newShowingData) => {
    dispatch(createShowing({ listingId, newShowingData }));
  };

  if (sessionUser && sessionUser.role === 'manager') {
    return (
      <>
        <button className="tarkov-create-button" onClick={() => setShowModal(true)}>
          Create Showing
        </button>

        {showModal && (
          <div className="create-modal">
            <div className="create-modal-content">
              <span className="create-close-button" onClick={() => setShowModal(false)}>&times;</span>
              <ShowingForm 
                listingId={listingId} 
                onSubmit={handleCreateShowing} 
                onClose={() => setShowModal(false)}
              />
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};

export default CreateShowingButton;
