import React from "react";

const BatsmenAnalysis = ({ data, team1, team2 }) => {
  if (!data || data.length === 0) return null;

  // Separate and sort batsmen by team
  const team1Batsmen = data
    .filter((player) => player.battingTeam === team1)
    .sort((a, b) => b.totalRuns - a.totalRuns)
    .slice(0, 5);

  const team2Batsmen = data
    .filter((player) => player.battingTeam === team2)
    .sort((a, b) => b.totalRuns - a.totalRuns)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Team 1 Top Batsmen */}
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-green-800 mb-4">
            {team1} Top Batsmen
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-green-100">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Rank
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Batsman
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Runs
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    SR
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Avg
                  </th>
                </tr>
              </thead>
              <tbody>
                {team1Batsmen.map((player, index) => (
                  <tr key={player._id} className="hover:bg-green-100">
                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                      {player.batsman}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-bold">
                      {player.totalRuns}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                      {player.strikeRate.toFixed(1)}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                      {(player.totalRuns / player.matchesPlayed).toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Team 2 Top Batsmen */}
        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-purple-800 mb-4">
            {team2} Top Batsmen
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-purple-100">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Rank
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Batsman
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Runs
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    SR
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Avg
                  </th>
                </tr>
              </thead>
              <tbody>
                {team2Batsmen.map((player, index) => (
                  <tr key={player._id} className="hover:bg-purple-100">
                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                      {player.batsman}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-bold">
                      {player.totalRuns}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                      {player.strikeRate.toFixed(1)}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                      {(player.totalRuns / player.matchesPlayed).toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">Batting Comparison</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">
              {team1} Highest Score:{" "}
              <span className="font-bold text-green-700">
                {team1Batsmen[0]?.totalRuns || 0}
              </span>{" "}
              by{" "}
              <span className="font-medium">
                {team1Batsmen[0]?.batsman || "N/A"}
              </span>
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">
              {team2} Highest Score:{" "}
              <span className="font-bold text-purple-700">
                {team2Batsmen[0]?.totalRuns || 0}
              </span>{" "}
              by{" "}
              <span className="font-medium">
                {team2Batsmen[0]?.batsman || "N/A"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatsmenAnalysis;
