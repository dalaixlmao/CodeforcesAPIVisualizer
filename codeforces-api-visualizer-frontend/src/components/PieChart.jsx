// src/components/ColumnChart.jsx

import React from 'react';
import { Chart } from 'react-google-charts';

function PieChart({ chartData, title }) {
  return (
    <div style={{color: "white"}}>
      <h2>{title}</h2>
      <Chart
        chartType="PieChart"
        width={'70vw'}
        height={'400px'}
        data={chartData}
        options={{
          is3D: false,
        }}/>
    </div>
  );
}

export default PieChart;
