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
    showingTimeDate.setHours(showingTimeDate.getHours() + 4); // Adjust time by 4 hours
    if (currentTime < showingTimeDate) {
      return "Scheduled";
    } else {
      return "Closed";
    }
  };

  // Check if allShowings is an array and sort it by time
  const sortedShowings = Array.isArray(allShowings) ? [...allShowings].sort((a, b) => new Date(a.time) - new Date(b.time)) : [];

  return (
    <div className="tarkov-showing-display">
      <h2 className="tarkov-title">Available Showings</h2>
      <CreateShowingButton listingId={listingId} />
      <div className="tarkov-showings-list">
        {sortedShowings.length ? (
          sortedShowings.map((showing, index) => {
            const adjustedTime = new Date(showing.time);
            adjustedTime.setHours(adjustedTime.getHours() + 4); // Adjust time by 4 hours
            return (
              <div key={index} className="tarkov-showing-item">
                <p>
                  {adjustedTime.toLocaleDateString()} at {adjustedTime.toLocaleTimeString()} - {getShowingStatus(showing.time)}
                </p>
                <EditShowingButton listingId={listingId} showingId={showing.id} />
                <DeleteShowingButton listingId={listingId} showingId={showing.id} />
              </div>
            );
          })
        ) : (
          <p className="tarkov-no-showings">No available showings for this listing.</p>
        )}
      </div>
    </div>
  );
}

export default ShowingDisplay;
