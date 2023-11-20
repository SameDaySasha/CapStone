import React, { useState } from 'react';

function BidInput({ latestBid, onBidSubmit }) {
  const [bid, setBid] = useState('');

  const handleSubmit = () => {
    const bidValue = parseFloat(bid);
    if (!isNaN(bidValue) && bidValue > latestBid) {
      onBidSubmit(bidValue);
      setBid(''); // Reset the input after submitting
    } else {
      alert("Your bid must be higher than the current bid.");
      // Additional error handling can go here
    }
  };

  return (
    <div className="bid-input-container">
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

export default BidInput;
