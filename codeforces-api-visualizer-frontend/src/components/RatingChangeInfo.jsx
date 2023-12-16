// src/components/RatingChangeInfo.jsx

import React from 'react';

function RatingChangeInfo({ codeforcesData }) {
  const calculateHighestDrop = () => {
    if (codeforcesData && codeforcesData.ratingHistory) {
      const ratingHistory = codeforcesData.ratingHistory;
      let highestDrop = 0;

      for (let i = 1; i < ratingHistory.length; i++) {
        const drop = ratingHistory[i - 1] - ratingHistory[i];
        if (drop > highestDrop) {
          highestDrop = drop;
        }
      }

      return highestDrop;
    }

    return null;
  };

  const calculateHighestRaise = () => {
    if (codeforcesData && codeforcesData.ratingHistory) {
      const ratingHistory = codeforcesData.ratingHistory;
      let highestRaise = 0;

      for (let i = 1; i < ratingHistory.length; i++) {
        const raise = ratingHistory[i] - ratingHistory[i - 1];
        if (raise > highestRaise) {
          highestRaise = raise;
        }
      }

      return highestRaise;
    }

    return null;
  };

  const highestDrop = calculateHighestDrop();
  const highestRaise = calculateHighestRaise();

  return (
    <div>
      <h2>Rating Change Info</h2>
      <p>Highest Drop: {highestDrop !== null ? highestDrop : 'N/A'}</p>
      <p>Highest Raise: {highestRaise !== null ? highestRaise : 'N/A'}</p>
    </div>
  );
}

export default RatingChangeInfo;
