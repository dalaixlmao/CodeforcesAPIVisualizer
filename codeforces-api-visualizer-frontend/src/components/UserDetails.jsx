// src/components/UserDetails.jsx

import React from "react";

function UserDetails({ codeforcesData }) {
  const { handle, rating, maxRating } = codeforcesData;

  return (
    <div style={{ color: "white" }}>
      <h2 >User Details</h2>
      <p>Handle: <a href={`https://codeforces.com/profile/${handle}`}>{handle}</a></p>
      <p>Rating: {rating || "N/A"}</p>
      <p>Max Rating: {maxRating || "N/A"}</p>
    </div>
  );
}

export default UserDetails;
