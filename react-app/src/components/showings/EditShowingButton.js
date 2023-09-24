import React, { useState } from 'react';
import EditShowingForm from './EditShowingForm'; // Adjust the import path

function EditShowingButton({ listingId, showingId }) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

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

export default EditShowingButton;
