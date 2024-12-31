const mongoose = require("mongoose");

const overSchema = new mongoose.Schema({
	overNumber: { type: Number, required: true },
	balls: [{ type: Number, required: true }], // Runs or -1 for wickets
});

module.exports = mongoose.model("Over", overSchema);
