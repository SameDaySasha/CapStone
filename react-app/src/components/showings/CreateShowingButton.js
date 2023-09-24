import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createShowing } from '../../store/showings'; // Adjust the path
import { selectUser } from '../../store/session'; // Adjust the path to your session slice
import ShowingForm from './ShowingForm'; // Adjust the path

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
        <button onClick={() => setShowModal(true)}>
          Create Showing
        </button>

        {showModal && (
          <div className="modal">
            <button onClick={() => setShowModal(false)}>Close</button>
            <ShowingForm 
              listingId={listingId} 
              onSubmit={handleCreateShowing} 
              onClose={() => setShowModal(false)}
            />
          </div>
        )}
      </>
    );
  }

  return null;
};

export default CreateShowingButton;
