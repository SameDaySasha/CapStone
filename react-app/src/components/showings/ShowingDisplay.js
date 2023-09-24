import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllShowingsForListing, selectAllShowings } from '../../store/showings';
import EditShowingButton from './EditShowingButton'; // Adjust the import path
import CreateShowingButton from './CreateShowingButton'; // Import the CreateShowingButton
import DeleteShowingButton from './DeleteShowingButton'; // Import the DeleteShowingButton
import './ShowingDisplay.css';

function ShowingDisplay() {
  const { id: listingId } = useParams();
  const dispatch = useDispatch();
  const allShowings = useSelector(selectAllShowings);

  useEffect(() => {
    // Fetch all showings related to the current listing using the new thunk
    dispatch(fetchAllShowingsForListing(listingId));
  }, [dispatch, listingId]);

  const getShowingStatus = (showingTime) => {
    const currentTime = new Date();
    const showingStartTime = new Date(showingTime);
    const showingEndTime = new Date(showingTime);
    showingEndTime.setHours(showingEndTime.getHours() + 4); // 4 hours after the start time

    if (currentTime < showingStartTime) {
      return "Scheduled";
    } else if (currentTime >= showingStartTime && currentTime <= showingEndTime) {
      return `Open! Ends at ${showingEndTime.toLocaleTimeString()}`;
    } else {
      return "Closed";
    }
  };

  return (
    <div className="showing-display-container">
      <h2>Available Showings</h2>
      <CreateShowingButton listingId={listingId} /> {/* Render the CreateShowingButton here */}
      <div className="showings-list-container">
        {allShowings.length ? (
          allShowings.map((showing, index) => (
            <div key={index} className="showing-item">
              <p>
                {new Date(showing.time).toLocaleDateString()} - {getShowingStatus(showing.time)}
              </p>
              <EditShowingButton listingId={listingId} showingId={showing.id} />
              <DeleteShowingButton listingId={listingId} showingId={showing.id} /> {/* Render the DeleteShowingButton here */}
            </div>
          ))
        ) : (
          <p>No available showings for this listing.</p>
        )}
      </div>
    </div>
  );
}

export default ShowingDisplay;
