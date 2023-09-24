import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteShowing, fetchAllShowingsForListing } from '../../store/showings'; // Adjust import path

function DeleteShowingButton({ listingId, showingId }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    await dispatch(deleteShowing({ listingId, showingId }));
    dispatch(fetchAllShowingsForListing(listingId)); // Refresh the list
    setShowModal(false); // Close the modal
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Delete</button>
      {showModal && (
        <div className="delete-modal">
          <p>Are you sure? Please confirm.</p>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={() => setShowModal(false)}>No</button>
        </div>
      )}
    </div>
  );
}

export default DeleteShowingButton;
