const Delivery = require("../models/Delivery");

exports.getPlayerPerformance = async (req, res) => {
  try {
    const { team1, team2 } = req.query;

    // Build match filter for selected teams
    const matchFilter =
      team1 && team2
        ? {
            $or: [{ batting_team: team1 }, { batting_team: team2 }],
          }
        : {};

    const playerStats = await Delivery.aggregate([
      // First match deliveries for selected teams
      { $match: matchFilter },
      {
        $group: {
          _id: "$batsman",
          totalRuns: { $sum: "$batsman_runs" },
          ballsFaced: { $sum: 1 },
          matches: { $addToSet: "$match_id" },
          battingTeam: { $first: "$batting_team" },
        },
      },
      {
        $project: {
          batsman: "$_id",
          totalRuns: 1,
          ballsFaced: 1,
          matchesPlayed: { $size: "$matches" },
          battingTeam: 1,
          strikeRate: {
            $multiply: [{ $divide: ["$totalRuns", "$ballsFaced"] }, 100],
          },
        },
      },
    ]);
    res.json(playerStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
