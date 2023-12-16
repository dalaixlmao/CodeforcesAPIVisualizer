// CalendarChart.jsx

import React from 'react';
import { Chart } from 'react-google-charts';

function CalendarChart({ contestData, title }) {
  // Format contestData into the required format for Google Calendar Chart
  const formattedData = Object.entries(contestData).map(([dayKey, count]) => [
    new Date(dayKey),
    count,
  ]);

  return (
    <div style={{ color: 'white' }}>
      <h2>{title}</h2>
      <Chart
        chartType="Calendar"
        width={'70vw'}
        height={'50vh'}
        data={[['Date', 'Questions Solved']].concat(formattedData)}
        options={{
          title,
          calendar: {
            cellSize: calculateCellSize(), // Dynamically calculate cell size
            cellColor: { stroke: 'white', strokeOpacity: 0.5 },
          },
          colorAxis: {
            colors: ['#0074A5', '#0D98BA', '#F6FF92', '#FFC82F', '#F16A16', 'E7331A'],
            width: '50rem', // Adjust colors accordingly
          },
        }}
      />
    </div>
  );
}

// Function to calculate cell size dynamically based on screen width
function calculateCellSize() {
  const screenWidth = window.innerWidth || document.documentElement.clientWidth;
  const baseCellSize = 15; // Your base cell size

  // Adjust the factor as needed for responsiveness
  const factor = screenWidth < 768 ? 10 : screenWidth < 1200 ? 15 : 20;

  return factor;
}

export default CalendarChart;
