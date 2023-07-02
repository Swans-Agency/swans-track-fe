import React from "react";
import {
  Chart,
  LinearScale,
  CategoryScale ,
  ArcElement,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
Chart.register(ArcElement,LinearScale,CategoryScale , Legend, Title, Tooltip);
import { Line } from "react-chartjs-2";


export default function LineChart({ expenseAlltime, incomeAlltime }) {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Expenses",
        data: expenseAlltime?.map((category) => category?.sum),
        borderColor: "#CC33FF",
        tension: 0.1,
        fill: false,
      },
      {
        label: "Income",
        data: incomeAlltime?.map((category) => category?.sum),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        fill: false,
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {
      responsive: true,
      // radius: '100%',
      plugins: {
        legend: {
          display: true,
          position: "bottom",
        },
        title: {
          display: false,
        },
      },
      tooltip: {
        enabled: true,
      },
      layout: {
        padding: {
          bottom: 20, // Add bottom padding for the legend
        },
      },
    },
  };

  return (
    <>
      <Line data={data} options={config.options} />
    </>
  );
}
