import React from "react";
import axios from "axios";
import { API_URL } from "../config";
import LoadingSpinner from "./LoadingSpinner";

const MatchStatsPopup = ({ match, onClose, isOpen }) => {
  const [loading, setLoading] = React.useState(true);
  const [matchStats, setMatchStats] = React.useState({
    battingStats: [],
    bowlingStats: [],
  });
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchMatchStats = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/match-stats`, {
          params: {
            matchId: match._id,
            team: match.winner,
          },
        });
        setMatchStats({
          battingStats: response.data.battingStats || [],
          bowlingStats: response.data.bowlingStats || [],
        });
      } catch (err) {
        console.error("Error fetching match stats:", err);
        setError("Failed to load match statistics");
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && match) {
      fetchMatchStats();
    }
  }, [isOpen, match]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-lg p-6 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {match.winner} - Match Statistics
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <div className="space-y-6">
            {/* Batting Stats */}
            {matchStats.battingStats && matchStats.battingStats.length > 0 ? (
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Batting Statistics
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Batsman
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Runs
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Balls
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          4s
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          6s
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          SR
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {matchStats.battingStats.map((batsman) => (
                        <tr key={batsman.batsman} className="hover:bg-gray-50">
                          <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                            {batsman.batsman}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">
                            {batsman.runs}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">
                            {batsman.balls}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">
                            {batsman.fours}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">
                            {batsman.sixes}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">
                            {batsman.strikeRate.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-gray-500 text-center">
                No batting statistics available
              </div>
            )}

            {/* Bowling Stats */}
            {matchStats.bowlingStats && matchStats.bowlingStats.length > 0 ? (
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Bowling Statistics
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Bowler
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Overs
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Maidens
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Runs
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Wickets
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Economy
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {matchStats.bowlingStats.map((bowler) => (
                        <tr key={bowler.bowler} className="hover:bg-gray-50">
                          <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                            {bowler.bowler}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">
                            {bowler.overs.toFixed(1)}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">
                            {bowler.maidens}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">
                            {bowler.runs}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">
                            {bowler.wickets}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">
                            {bowler.economy.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-gray-500 text-center">
                No bowling statistics available
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchStatsPopup;
