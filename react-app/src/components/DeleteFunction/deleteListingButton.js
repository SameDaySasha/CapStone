import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteListing, fetchListings } from '../../store/listings';
import { selectUser } from '../../store/session';
import './DeleteButton.css'; // Import the CSS file you'll create

function DeleteButton({ listingId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(selectUser);

  const handleDelete = async () => {
    if (sessionUser && sessionUser.role === 'manager') {
      await dispatch(deleteListing(listingId));
      dispatch(fetchListings());
      history.push('/');
    }
  };

  if (sessionUser && sessionUser.role === 'manager') {
    return <button onClick={handleDelete} className="tarkov-form__button--delete">Delete Listing</button>;
  }

  return null;
}

export default DeleteButton;
