import React from "react";

const MatchPrediction = ({ matches, team1, team2 }) => {
  if (!matches || matches.length === 0) return null;

  // Calculate toss-based statistics
  const tossWins = {
    [team1]: matches.filter((m) => m.toss_winner === team1).length,
    [team2]: matches.filter((m) => m.toss_winner === team2).length,
  };

  // Calculate batting first statistics
  const battingFirstWins = {
    [team1]: matches.filter(
      (m) =>
        ((m.toss_winner === team1 && m.toss_decision === "bat") ||
          (m.toss_winner === team2 && m.toss_decision === "field")) &&
        m.winner === team1
    ).length,
    [team2]: matches.filter(
      (m) =>
        ((m.toss_winner === team2 && m.toss_decision === "bat") ||
          (m.toss_winner === team1 && m.toss_decision === "field")) &&
        m.winner === team2
    ).length,
  };

  // Calculate fielding first statistics
  const fieldingFirstWins = {
    [team1]: matches.filter(
      (m) =>
        ((m.toss_winner === team1 && m.toss_decision === "field") ||
          (m.toss_winner === team2 && m.toss_decision === "bat")) &&
        m.winner === team1
    ).length,
    [team2]: matches.filter(
      (m) =>
        ((m.toss_winner === team2 && m.toss_decision === "field") ||
          (m.toss_winner === team1 && m.toss_decision === "bat")) &&
        m.winner === team2
    ).length,
  };

  // Calculate win percentages
  const calculatePercentage = (wins, total) =>
    total > 0 ? ((wins / total) * 100).toFixed(1) : 0;

  const battingFirstPercentage = {
    [team1]: calculatePercentage(
      battingFirstWins[team1],
      matches.filter(
        (m) =>
          (m.toss_winner === team1 && m.toss_decision === "bat") ||
          (m.toss_winner === team2 && m.toss_decision === "field")
      ).length
    ),
    [team2]: calculatePercentage(
      battingFirstWins[team2],
      matches.filter(
        (m) =>
          (m.toss_winner === team2 && m.toss_decision === "bat") ||
          (m.toss_winner === team1 && m.toss_decision === "field")
      ).length
    ),
  };

  const fieldingFirstPercentage = {
    [team1]: calculatePercentage(
      fieldingFirstWins[team1],
      matches.filter(
        (m) =>
          (m.toss_winner === team1 && m.toss_decision === "field") ||
          (m.toss_winner === team2 && m.toss_decision === "bat")
      ).length
    ),
    [team2]: calculatePercentage(
      fieldingFirstWins[team2],
      matches.filter(
        (m) =>
          (m.toss_winner === team2 && m.toss_decision === "field") ||
          (m.toss_winner === team1 && m.toss_decision === "bat")
      ).length
    ),
  };

  // Determine best strategy for each team
  const getBestStrategy = (team) => {
    const battingWinRate = parseFloat(battingFirstPercentage[team]);
    const fieldingWinRate = parseFloat(fieldingFirstPercentage[team]);
    return battingWinRate > fieldingWinRate ? "batting" : "fielding";
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800">
        Match Prediction Analysis
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Team 1 Analysis */}
        <div className="bg-green-50 p-6 rounded-lg">
          <h4 className="text-lg font-semibold text-green-800 mb-4">{team1}</h4>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Win rate when batting first:{" "}
              <span className="font-bold text-green-700">
                {battingFirstPercentage[team1]}%
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Win rate when fielding first:{" "}
              <span className="font-bold text-green-700">
                {fieldingFirstPercentage[team1]}%
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Best strategy:{" "}
              <span className="font-bold text-green-700 uppercase">
                {getBestStrategy(team1)} first
              </span>
            </p>
          </div>
        </div>

        {/* Team 2 Analysis */}
        <div className="bg-purple-50 p-6 rounded-lg">
          <h4 className="text-lg font-semibold text-purple-800 mb-4">
            {team2}
          </h4>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Win rate when batting first:{" "}
              <span className="font-bold text-purple-700">
                {battingFirstPercentage[team2]}%
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Win rate when fielding first:{" "}
              <span className="font-bold text-purple-700">
                {fieldingFirstPercentage[team2]}%
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Best strategy:{" "}
              <span className="font-bold text-purple-700 uppercase">
                {getBestStrategy(team2)} first
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Prediction Summary */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h4 className="text-lg font-semibold text-blue-800 mb-4">
          Match Prediction
        </h4>
        <div className="space-y-3">
          {team1 &&
            team2 &&
            (() => {
              const team1BestRate = Math.max(
                parseFloat(battingFirstPercentage[team1]),
                parseFloat(fieldingFirstPercentage[team1])
              );
              const team2BestRate = Math.max(
                parseFloat(battingFirstPercentage[team2]),
                parseFloat(fieldingFirstPercentage[team2])
              );
              const favoredTeam = team1BestRate > team2BestRate ? team1 : team2;
              const winningChance =
                favoredTeam === team1 ? team1BestRate : team2BestRate;
              return (
                <div>
                  <p className="text-gray-600">
                    Based on historical performance,{" "}
                    <span className="font-bold text-blue-700">
                      {favoredTeam}
                    </span>{" "}
                    has a higher chance of winning with approximately{" "}
                    <span className="font-bold text-blue-700">
                      {winningChance}%
                    </span>{" "}
                    win rate when following their optimal strategy of{" "}
                    <span className="font-bold text-blue-700 uppercase">
                      {getBestStrategy(favoredTeam)} first
                    </span>
                    .
                  </p>
                </div>
              );
            })()}
        </div>
      </div>
    </div>
  );
};

export default MatchPrediction;
