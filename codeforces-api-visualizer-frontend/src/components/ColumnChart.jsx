// src/components/ColumnChart.jsx
import React from "react";
import { Chart } from "react-google-charts";

function ColumnChart({ chartData, title }) {
  return (
    <div 
    style={{color: "white"}}>
      <h2>{title}</h2>
      <div className="chart-container">
        <Chart
          className="columnchart"
          chartType="ColumnChart"
          width={"64.75rem"}
          height={"37.125rem"}
          data={chartData}
          options={{
            hAxis: { title: "Number of Questions Solved", minValue: 0 },
            vAxis: { title: "Tag", textPosition: "out" },
            legend: "none",
            colors: ["#4285f4", "#34a853", "#fbbc05", "#ea4335"],
            background: "rgba(255, 255, 255, 0.1)",
            chartArea: {
              background: "background as rgba(255, 255, 255, 0.1)",
              borderRadius: "0.25rem",
              border: "3px solid #f6ff92",
            }, // Add border radius to chart area
          }}
        />
      </div>
    </div>
  );
}

export default ColumnChart;
