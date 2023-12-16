// src/components/LineChart.jsx

import React from 'react';
import { Chart } from 'react-google-charts';

function LineChart({ ratingData, title }) {
  // Format ratingData into the required format for Google Line Chart
  const formattedData = ratingData.map(({ contestId, contestName, rank, oldRating, newRating, contestStartTimeSeconds }) => [
    new Date(contestStartTimeSeconds * 1000),
    newRating,
  ]);

  return (
    <div>
      <h2>{title}</h2>
      <Chart
        chartType="LineChart"
        width={'100%'}
        height={400}
        data={[['Contest Date', 'Rating']].concat(formattedData)}
        options={{
          title,
          hAxis: { title: 'Contest Date' },
          vAxis: { title: 'Rating' },
          legend: 'none',
        }}
      />
    </div>
  );
}

export default LineChart;
