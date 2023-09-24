import React, { useState } from 'react';
import EditShowingForm from './EditShowingForm'; // Adjust the import path
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/session'; // Adjust the import path as necessary

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
        <button onClick={openModal}>Edit Showing</button>
  
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close-button" onClick={closeModal}>&times;</span>
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
