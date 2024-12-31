const Match = require("../models/matchModel");
const Over = require("../models/overModel");

// Fetch match state
exports.getMatchState = async (req, res) => {
	try {
		let match = await Match.findOne();
		if (!match) {
			match = await Match.create({}); // Initialize match if not found
		}
		res.json(match);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Update score
exports.updateScore = async (req, res) => {
	const { runs, isWicket } = req.body;
	try {
		const match = await Match.findOne();
		if (!match) {
			return res.status(404).json({ message: "Match not found" });
		}

		let over = await Over.findOne({ overNumber: match.currentOver });
		if (!over) {
			over = await Over.create({ overNumber: match.currentOver, balls: [] });
		}

		const ballResult = isWicket ? -1 : runs;
		over.balls.push(ballResult);
		await over.save();

		match.currentRuns += isWicket ? 0 : runs;
		match.currentWickets += isWicket ? 1 : 0;

		if (over.balls.length === 6) {
			match.currentOver += 1; // Start new over
		}

		await match.save();

		req.io.emit("scoreUpdate", {
			match: match, // Updated match data
			over: over, // Updated over data
			actionType: isWicket ? "wicket" : "runs",
			actionValue: isWicket ? null : runs,
		});

		res.json({ message: "Score updated", match, over });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Fetch overs
exports.getOvers = async (req, res) => {
	try {
		const overs = await Over.find().sort({ overNumber: 1 });
		res.json(overs);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
