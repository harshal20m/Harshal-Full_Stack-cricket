const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
	currentRuns: { type: Number, default: 0 },
	currentWickets: { type: Number, default: 0 },
	currentOver: { type: Number, default: 0 },
});

module.exports = mongoose.model("Match", matchSchema);
