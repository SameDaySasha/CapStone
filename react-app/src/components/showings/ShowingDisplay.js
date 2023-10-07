import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllShowingsForListing, selectAllShowings } from '../../store/showings';
import EditShowingButton from './EditShowingButton';
import CreateShowingButton from './CreateShowingButton';
import DeleteShowingButton from './DeleteShowingButton';
import './ShowingDisplay.css';

function ShowingDisplay() {
  const { id: listingId } = useParams();
  const dispatch = useDispatch();
  const allShowings = useSelector(selectAllShowings);

  useEffect(() => {
    dispatch(fetchAllShowingsForListing(listingId));
  }, [dispatch, listingId]);

  const getShowingStatus = (showingTime) => {
    const currentTime = new Date();
    const showingTimeDate = new Date(showingTime);
    if (currentTime < showingTimeDate) {
      return "Scheduled";
    } else {
      return "Closed";
    }
  };

  // Sort the showings by time
  const sortedShowings = [...allShowings].sort((a, b) => new Date(a.time) - new Date(b.time));

  return (
    <div className="tarkov-showing-display">
      <h2 className="tarkov-title">Available Showings</h2>
      <CreateShowingButton listingId={listingId} />
      <div className="tarkov-showings-list">
        {sortedShowings.length ? (
          sortedShowings.map((showing, index) => (
            <div key={index} className="tarkov-showing-item">
              <p>
                {new Date(showing.time).toLocaleDateString()} at {new Date(showing.time).toLocaleTimeString()} - {getShowingStatus(showing.time)}
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
