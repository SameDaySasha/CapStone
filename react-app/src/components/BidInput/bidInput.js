import React, { useState } from 'react';
import './bidInput.css';
import onBidSubmit from '../../store/listings';
function BidInput({ latestBid, onBidSubmit, sessionUser }) {
  const [bid, setBid] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    const bidValue = parseFloat(bid);
    if (!isNaN(bidValue) && bidValue > latestBid) {
     
      try {
        await onBidSubmit(bidValue);
        setBid('');
        setErrorMessage('');
        window.location.reload();
      }catch (error) {
        setErrorMessage('Failed to submit bid. Please try again.');
      }
    } else {
      setErrorMessage("Your bid must be higher than the current bid.");
    }
  };

  if (sessionUser && sessionUser.role === 'customer') {
    return (
      <div className="bid-input-container">
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <input
          type="number"
          value={bid}
          onChange={(e) => setBid(e.target.value)}
          placeholder="Enter your bid"
        />
        <button onClick={handleSubmit}>Bid Now</button>
      </div>
    );
  }

  return null;
}

export default BidInput;
