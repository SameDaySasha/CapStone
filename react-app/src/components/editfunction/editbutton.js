import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser } from '../../store/session'; // Adjust the path as necessary

function EditButton({ listingId }) {
  const sessionUser = useSelector(selectUser);

  if (sessionUser && sessionUser.role === 'manager') {
    return (
      <Link to={`/listings/edit/${listingId}`}>
        <button>Edit</button>
      </Link>
    );
  }

  return null;
}

export default EditButton;
