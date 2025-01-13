import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TossChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No toss data available for selected teams
      </div>
    );
  }

  // Process data for visualization
  const batFirst = data.filter((d) => d._id.decision === "bat");
  const fieldFirst = data.filter((d) => d._id.decision === "field");

  const batWins = batFirst.reduce((acc, curr) => acc + curr.matchesWon, 0);
  const fieldWins = fieldFirst.reduce((acc, curr) => acc + curr.matchesWon, 0);
  const batLosses = batFirst.reduce(
    (acc, curr) => acc + curr.count - curr.matchesWon,
    0
  );
  const fieldLosses = fieldFirst.reduce(
    (acc, curr) => acc + curr.count - curr.matchesWon,
    0
  );

  const chartData = {
    labels: ["Batting First", "Fielding First"],
    datasets: [
      {
        label: "Matches Won",
        data: [batWins, fieldWins],
        backgroundColor: "#60A5FA",
      },
      {
        label: "Matches Lost",
        data: [batLosses, fieldLosses],
        backgroundColor: "#F87171",
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
        text: "Toss Decision Outcomes",
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Number of Matches",
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default TossChart;
