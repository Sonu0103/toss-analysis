import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";
import TeamSelector from "./TeamSelector";
import MatchTable from "./MatchTable";
import TossChart from "./TossChart";
import LoadingSpinner from "./LoadingSpinner";
import MatchSummary from "./MatchSummary";
import MatchPrediction from "./MatchPrediction";

const Dashboard = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState({ team1: "", team2: "" });
  const [matches, setMatches] = useState([]);
  const [tossData, setTossData] = useState([]);
  const [loading, setLoading] = useState({
    teams: true,
    matches: false,
    toss: true,
  });
  const [error, setError] = useState({
    teams: null,
    matches: null,
    toss: null,
  });

  const fetchTeams = async () => {
    try {
      setLoading((prev) => ({ ...prev, teams: true }));
      const response = await axios.get(`${API_URL}/matches`);
      const uniqueTeams = [
        ...new Set(
          response.data.flatMap((match) => [match.team1, match.team2])
        ),
      ].sort();
      setTeams(uniqueTeams);
      setError((prev) => ({ ...prev, teams: null }));
    } catch (error) {
      console.error("Error fetching teams:", error);
      setError((prev) => ({
        ...prev,
        teams: "Failed to load teams. Please try again.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, teams: false }));
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  // Fetch toss analysis when teams are selected
  useEffect(() => {
    if (selectedTeams.team1 && selectedTeams.team2) {
      fetchTossAnalysis();
    }
  }, [selectedTeams]);

  const fetchMatches = async () => {
    if (selectedTeams.team1 && selectedTeams.team2) {
      try {
        setLoading((prev) => ({ ...prev, matches: true }));
        setError((prev) => ({ ...prev, matches: null }));
        const response = await axios.post(
          `${API_URL}/matches/query`,
          selectedTeams
        );
        setMatches(response.data);
      } catch (error) {
        console.error("Error fetching matches:", error);
        setError((prev) => ({
          ...prev,
          matches: "Failed to load matches. Please try again.",
        }));
      } finally {
        setLoading((prev) => ({ ...prev, matches: false }));
      }
    }
  };

  const fetchTossAnalysis = async () => {
    try {
      setLoading((prev) => ({ ...prev, toss: true }));
      const response = await axios.get(
        "http://localhost:5000/api/toss-analysis",
        {
          params: {
            team1: selectedTeams.team1,
            team2: selectedTeams.team2,
          },
        }
      );
      setTossData(response.data);
      setError((prev) => ({ ...prev, toss: null }));
    } catch (error) {
      console.error("Error fetching toss analysis:", error);
      setError((prev) => ({
        ...prev,
        toss: "Failed to load toss analysis. Please try again.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, toss: false }));
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Team Analysis</h2>
        {error.teams ? (
          <div className="text-red-500 mb-4">{error.teams}</div>
        ) : loading.teams ? (
          <LoadingSpinner />
        ) : (
          <TeamSelector
            teams={teams}
            selectedTeams={selectedTeams}
            setSelectedTeams={setSelectedTeams}
            onSubmit={fetchMatches}
          />
        )}
      </div>

      {loading.matches ? (
        <div className="bg-white rounded-lg shadow p-6">
          <LoadingSpinner />
        </div>
      ) : error.matches ? (
        <div className="bg-white rounded-lg shadow p-6 text-red-500">
          {error.matches}
        </div>
      ) : matches.length > 0 ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Match Results</h2>
          <MatchSummary
            matches={matches}
            team1={selectedTeams.team1}
            team2={selectedTeams.team2}
          />
          <div className="mt-8">
            <MatchPrediction
              matches={matches}
              team1={selectedTeams.team1}
              team2={selectedTeams.team2}
            />
          </div>
          <MatchTable matches={matches} />
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Toss Analysis</h2>
          {error.toss ? (
            <div className="text-red-500">{error.toss}</div>
          ) : loading.toss ? (
            <LoadingSpinner />
          ) : (
            <TossChart data={tossData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
