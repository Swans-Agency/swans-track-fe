import React from "react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import { Bar } from "react-chartjs-2";

export default function BarChart({ clientsCategory }) {
  const data = {
    labels: clientsCategory.map((category) => category.referralSource),
    datasets: [
      {
        label: "",
        data: clientsCategory.map((category) => category.count),
        backgroundColor: [
          "rgba(102, 255, 153, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(153, 51, 255, 0.2)",
          "rgba(51, 255, 153, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(102, 204, 204, 0.2)",
          "rgba(255, 255, 153, 0.2)",
          "rgba(204, 102, 153, 0.2)",
          "rgba(255, 153, 204, 0.2)",
          "rgba(102, 204, 51, 0.2)",
          "rgba(255, 153, 51, 0.2)",
          "rgba(204, 51, 255, 0.2)",
          "rgba(255, 51, 102, 0.2)",
          "rgba(51, 255, 204, 0.2)",
          "rgba(204, 204, 51, 0.2)",
          "rgba(153, 204, 255, 0.2)",
          "rgba(255, 102, 153, 0.2)",
          "rgba(51, 102, 255, 0.2)",
          "rgba(255, 153, 255, 0.2)",
          "rgba(102, 255, 51, 0.2)",
          "rgba(255, 204, 153, 0.2)",
          "rgba(153, 204, 51, 0.2)",
          "rgba(153, 51, 51, 0.2)",
          "rgba(51, 204, 204, 0.2)",
          "rgba(255, 102, 204, 0.2)",
          "rgba(255, 51, 51, 0.2)",
          "rgba(51, 255, 51, 0.2)",
          "rgba(102, 153, 255, 0.2)",
          "rgba(255, 204, 51, 0.2)",
          "rgba(255, 102, 51, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 204, 51, 0.2)",
        ],
        borderColor: [
          "#66FF99",
          "#FFCE56",
          "#9933FF",
          "#33FF99",
          "#9966FF",
          "#FF6384",
          "#66CCCC",
          "#FFFF99",
          "#CC6699",
          "#FF99CC",
          "#66CC33",
          "#FF9933",
          "#CC33FF",
          "#FF3366",
          "#33FFCC",
          "#CCCC33",
          "#99CCFF",
          "#FF6699",
          "#3366FF",
          "#FF99FF",
          "#66FF33",
          "#FFCC99",
          "#99CC33",
          "#993333",
          "#33CCCC",
          "#FF66CC",
          "#FF3333",
          "#33FF33",
          "#6699FF",
          "#FFCC33",
          "#FF6633",
          "#FFCE56",
          "#FFCC33",
        ],
        hoverOffset: 10,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      responsive: true,
      // radius: '100%',
      plugins: {
        legend: {
          display: false,
          position: "bottom",
        },
        title: {
          display: false,
        },
      },
      tooltip: {
        enabled: true,
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  return <Bar data={data} options={config.options} />;
}
