import React from "react";

const MatchSummary = ({ matches, team1, team2 }) => {
  if (!matches || matches.length === 0) return null;

  const totalMatches = matches.length;
  const team1Wins = matches.filter((match) => match.winner === team1).length;
  const team2Wins = matches.filter((match) => match.winner === team2).length;
  const noResults = matches.filter((match) => !match.winner).length;

  const winPercentage1 = ((team1Wins / totalMatches) * 100).toFixed(1);
  const winPercentage2 = ((team2Wins / totalMatches) * 100).toFixed(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-blue-50 p-4 rounded-lg text-center">
        <h3 className="text-lg font-semibold mb-2">Total Matches</h3>
        <p className="text-3xl font-bold text-blue-600">{totalMatches}</p>
      </div>
      <div className="bg-green-50 p-4 rounded-lg text-center">
        <h3 className="text-lg font-semibold mb-2">{team1}</h3>
        <p className="text-3xl font-bold text-green-600">
          {team1Wins} ({winPercentage1}%)
        </p>
      </div>
      <div className="bg-purple-50 p-4 rounded-lg text-center">
        <h3 className="text-lg font-semibold mb-2">{team2}</h3>
        <p className="text-3xl font-bold text-purple-600">
          {team2Wins} ({winPercentage2}%)
        </p>
      </div>
      {noResults > 0 && (
        <div className="col-span-full bg-gray-50 p-4 rounded-lg text-center">
          <p className="text-gray-600">
            No Result/Tie: <span className="font-bold">{noResults}</span>{" "}
            matches
          </p>
        </div>
      )}
    </div>
  );
};

export default MatchSummary;
