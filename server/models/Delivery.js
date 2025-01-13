const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  match_id: {
    type: String,
    required: true,
  },
  inning: Number,
  batting_team: String,
  bowling_team: String,
  batsman: String,
  bowler: String,
  batsman_runs: Number,
  total_runs: Number,
});

module.exports = mongoose.model("Delivery", deliverySchema);
