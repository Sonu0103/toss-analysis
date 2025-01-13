import React from "react";

const TeamSelector = ({
  teams,
  selectedTeams,
  setSelectedTeams,
  onSubmit,
  loading,
}) => {
  const handleChange = (e) => {
    setSelectedTeams({ ...selectedTeams, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Team 1
          </label>
          <select
            name="team1"
            value={selectedTeams.team1}
            onChange={handleChange}
            disabled={loading}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select Team</option>
            {teams.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Team 2
          </label>
          <select
            name="team2"
            value={selectedTeams.team2}
            onChange={handleChange}
            disabled={loading}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select Team</option>
            {teams.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        onClick={onSubmit}
        disabled={!selectedTeams.team1 || !selectedTeams.team2 || loading}
        className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Loading..." : "Fetch Matches"}
      </button>
    </div>
  );
};

export default TeamSelector;
