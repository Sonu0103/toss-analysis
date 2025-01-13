const Match = require("../models/Match");

exports.getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find();
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMatchesByTeams = async (req, res) => {
  try {
    const { team1, team2 } = req.body;
    const matches = await Match.find({
      $or: [
        { team1: team1, team2: team2 },
        { team1: team2, team2: team1 },
      ],
    });
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTossAnalysis = async (req, res) => {
  try {
    const { team1, team2 } = req.query;

    // Build the filter condition for selected teams
    const teamFilter =
      team1 && team2
        ? {
            $or: [
              { team1: team1, team2: team2 },
              { team1: team2, team2: team1 },
            ],
          }
        : {};

    const tossStats = await Match.aggregate([
      // First match the selected teams if provided
      { $match: teamFilter },
      {
        $group: {
          _id: {
            winner: "$toss_winner",
            decision: "$toss_decision",
          },
          count: { $sum: 1 },
          matchesWon: {
            $sum: {
              $cond: [{ $eq: ["$toss_winner", "$winner"] }, 1, 0],
            },
          },
        },
      },
    ]);
    res.json(tossStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
