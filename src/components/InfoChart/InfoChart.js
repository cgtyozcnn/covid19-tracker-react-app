import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import "./InfoChart.scss";
const InfoChart = (props) => {
  let infoType = props.infoType.toLowerCase();
  const graphData = props.data[infoType];

  const infoTypeColors = {
    cases: {
      primary: "rgba(0, 0, 0, 0.5)",
      secondary: "rgba(0, 0, 0, 1)",
    },
    recovered: {
      primary: "rgba(61, 163, 35, 0.7)",
      secondary: "rgba(61, 163, 35, 1)",
    },
    deaths: {
      primary: "rgba(238, 80, 80, 0.7)",
      secondary: "rgba(238, 80, 80, 1)",
    },
  };
  const data = {
    labels: graphData && Object.keys(graphData),
    datasets: [
      {
        label: infoType,
        fill: true,
        lineTension: 0.1,
        backgroundColor:  infoTypeColors[infoType].primary,
        borderColor: infoTypeColors[infoType].secondary,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: infoTypeColors[infoType].secondary,
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: infoTypeColors[infoType].secondary,
        pointHoverBorderColor: infoTypeColors[infoType].secondary,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: graphData && Object.values(graphData),
      },
    ],
  };

  return (
    <div className="ChartContainer">
      <h2>{props.countryName}</h2>
      <Line data={data}  options={{ maintainAspectRatio: false }}/>
    </div>
  );
};

export default InfoChart;
