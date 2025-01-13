import React from "react";
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Title, Tooltip, Legend);

const BatsmenChart = ({ data }) => {
  console.log("Batsmen Data:", data);

  const chartData = {
    labels: data.map((player) => player._id),
    datasets: [
      {
        label: "Total Runs",
        data: data.map((player) => player.totalRuns),
        backgroundColor: [
          "#60A5FA",
          "#34D399",
          "#F59E0B",
          "#EC4899",
          "#8B5CF6",
        ],
        borderColor: ["#2563EB", "#059669", "#D97706", "#DB2777", "#6D28D9"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Top 5 Batsmen Run Distribution",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const batsman = context.chart.data.labels[context.dataIndex];
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${batsman}: ${value} runs (${percentage}%)`;
          },
        },
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default BatsmenChart;
