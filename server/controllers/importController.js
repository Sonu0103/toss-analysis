const csv = require("csvtojson");
const fs = require("fs");
const path = require("path");
const Match = require("../models/Match");
const Delivery = require("../models/Delivery");

exports.importData = async (req, res) => {
  try {
    const matchesPath = path.join(__dirname, "../uploads/matches.csv");
    const deliveriesPath = path.join(__dirname, "../uploads/deliveries.csv");

    // Check if files exist
    if (!fs.existsSync(matchesPath) || !fs.existsSync(deliveriesPath)) {
      return res.status(400).json({
        message:
          "Please ensure matches.csv and deliveries.csv are in the server/uploads folder",
      });
    }

    // Process matches CSV
    const matches = await csv().fromFile(matchesPath);

    // Log the first match to check the data structure
    console.log("Sample match data:", matches[0]);

    // Convert date strings to Date objects and numeric fields
    const processedMatches = matches.map((match) => {
      // Log any problematic records
      if (!match.season || isNaN(Number(match.season))) {
        console.log("Invalid season value:", match);
      }
      return {
        season: match.season ? Number(match.season) || 0 : 0,
        city: match.city || "",
        team1: match.team1 || "",
        team2: match.team2 || "",
        toss_winner: match.toss_winner || "",
        toss_decision: match.toss_decision || "",
        winner: match.winner || "",
        result: match.result || "",
        result_margin: match.result_margin
          ? Number(match.result_margin) || 0
          : 0,
        date: match.date ? new Date(match.date) : new Date(),
      };
    });

    // Process deliveries CSV
    const deliveries = await csv().fromFile(deliveriesPath);

    // Convert numeric fields
    const processedDeliveries = deliveries.map((delivery) => ({
      match_id: delivery.match_id ? delivery.match_id.toString() : "",
      inning: delivery.inning ? Number(delivery.inning) || 0 : 0,
      batting_team: delivery.batting_team || "",
      bowling_team: delivery.bowling_team || "",
      batsman: delivery.batsman || "",
      bowler: delivery.bowler || "",
      batsman_runs: delivery.batsman_runs
        ? Number(delivery.batsman_runs) || 0
        : 0,
      total_runs: delivery.total_runs ? Number(delivery.total_runs) || 0 : 0,
    }));

    // Clear existing data
    await Match.deleteMany({});
    await Delivery.deleteMany({});

    // Insert new data
    await Match.insertMany(processedMatches);
    await Delivery.insertMany(processedDeliveries);

    res.json({
      message: "Data imported successfully",
      matchesCount: processedMatches.length,
      deliveriesCount: processedDeliveries.length,
    });
  } catch (error) {
    console.error("Import error:", error);
    res.status(500).json({ message: error.message });
  }
};
