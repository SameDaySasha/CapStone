import React, { useState } from 'react';
import EditShowingForm from './EditShowingForm'; // Adjust the import path
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/session'; // Adjust the import path as necessary
import './EditShowingButton.css';  // Make sure this file is in the same directory as your component or update the path accordingly

function EditShowingButton({ listingId, showingId }) {
  const [showModal, setShowModal] = useState(false);
  const sessionUser = useSelector(selectUser); // Get the current user

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (sessionUser && sessionUser.role === 'manager') {
    return (
      <div>
        <button className="admin-orange-button" onClick={openModal}>Edit Showing</button>
  
        {showModal && (
          <div className="edit-modal">
            <div className="edit-modal-content">
              <span className="edit-close-button" onClick={closeModal}>&times;</span>
              <EditShowingForm listingId={listingId} showingId={showingId} />
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}

export default EditShowingButton;
