import React from "react";
import MatchStatsPopup from "./MatchStatsPopup";

const MatchTable = ({ matches }) => {
  const [selectedMatch, setSelectedMatch] = React.useState(null);

  const getWinnerStyle = (team, winner) => {
    return team === winner ? "font-semibold text-green-600" : "text-gray-600";
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Team 1
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Team 2
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Winner
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Result
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {matches.map((match, index) => (
              <tr key={index}>
                <td
                  className={`px-6 py-4 whitespace-nowrap ${getWinnerStyle(
                    match.team1,
                    match.winner
                  )}`}
                >
                  {match.team1}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap ${getWinnerStyle(
                    match.team2,
                    match.winner
                  )}`}
                >
                  {match.team2}
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap cursor-pointer hover:text-blue-600"
                  onClick={() => setSelectedMatch(match)}
                >
                  {match.winner}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {match.result_margin} {match.result}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(match.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <MatchStatsPopup
        match={selectedMatch}
        isOpen={!!selectedMatch}
        onClose={() => setSelectedMatch(null)}
      />
    </>
  );
};

export default MatchTable;
