import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser } from '../../store/session';
import './EditButton.css'; // Assuming you create a new CSS file for EditButton

function EditButton({ listingId }) {
  const sessionUser = useSelector(selectUser);

  if (sessionUser && sessionUser.role === 'manager') {
    return (
      <Link to={`/listings/edit/${listingId}`}>
        <button className="tarkov-form__button--edit">Edit Listing</button> {/* <-- Changed this line */}
      </Link>
    );
  }

  return null;
}

export default EditButton;
