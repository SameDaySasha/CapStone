import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'; // Import useHistory hook
import { deleteListing } from '../../store/listings'; // Adjust the path to your deleteListing thunk
import { fetchListings } from '../../store/listings'; // Adjust the path to your fetchListings thunk
import { selectUser } from '../../store/session'; // Adjust the path to your session slice

function DeleteButton({ listingId }) {
  const dispatch = useDispatch();
  const history = useHistory(); // Instantiate useHistory
  const sessionUser = useSelector(selectUser);

  const handleDelete = async () => {
    if (sessionUser && sessionUser.role === 'manager') {
      await dispatch(deleteListing(listingId)); // Dispatch the deleteListing thunk with the listingId
      dispatch(fetchListings()); // Dispatch fetchListings again to refresh the listings on the homepage
      history.push('/'); // Redirect the user back to the homepage
    }
  };

  if (sessionUser && sessionUser.role === 'manager') {
    return <button onClick={handleDelete}>Delete</button>;
  }

  return null;
}

export default DeleteButton;
