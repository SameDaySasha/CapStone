import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllShowingsForListing, selectAllShowings } from '../../store/showings';
import EditShowingButton from './EditShowingButton';
import CreateShowingButton from './CreateShowingButton';
import DeleteShowingButton from './DeleteShowingButton';
import './ShowingDisplay.css'; // Make sure this file is in the same directory as your component or update the path accordingly

function ShowingDisplay() {
  const { id: listingId } = useParams();
  const dispatch = useDispatch();
  const allShowings = useSelector(selectAllShowings);

  useEffect(() => {
    dispatch(fetchAllShowingsForListing(listingId));
  }, [dispatch, listingId]);

  const getShowingStatus = (showingTime) => {
    const currentTime = new Date();
    const showingStartTime = new Date(showingTime);
    const showingEndTime = new Date(showingTime);
    showingStartTime.setHours(showingStartTime.getHours() + 4);
    showingEndTime.setHours(showingEndTime.getHours() + 8);
    if (currentTime < showingStartTime) {
      return "Scheduled";
    } else if (currentTime >= showingStartTime && currentTime <= showingEndTime) {
      return `Open! Ends at ${showingEndTime.toLocaleTimeString()}`;
    } else {
      return "Closed";
    }
  };

  return (
    <div className="tarkov-showing-display">
      <h2 className="tarkov-title">Available Showings</h2>
      <CreateShowingButton listingId={listingId} />
      <div className="tarkov-showings-list">
        {allShowings.length ? (
          allShowings.map((showing, index) => (
            <div key={index} className="tarkov-showing-item">
              <p>
                {new Date(showing.time).toLocaleDateString()} - {getShowingStatus(showing.time)}
              </p>
              <EditShowingButton listingId={listingId} showingId={showing.id} />
              <DeleteShowingButton listingId={listingId} showingId={showing.id} />
            </div>
          ))
        ) : (
          <p className="tarkov-no-showings">No available showings for this listing.</p>
        )}
      </div>
    </div>
  );
}

export default ShowingDisplay;
