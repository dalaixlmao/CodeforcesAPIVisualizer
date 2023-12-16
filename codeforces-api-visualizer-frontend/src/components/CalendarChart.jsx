// Update the CalendarChart.jsx component

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
        width={'100%'}
        height={400}
        data={[['Date', 'Questions Solved']].concat(formattedData)}
        options={{
          title,
          calendar: { cellSize: 15, cellColor: { stroke: 'white', strokeOpacity: 0.5 } },
          colorAxis: { colors: ['#0074A5', '#0D98BA', '#F6FF92', '#FFC82F','#F16A16', 'E7331A'], width: "50rem" }, // Adjust colors accordingly
        }}
      />
    </div>
  );
}

export default CalendarChart;
