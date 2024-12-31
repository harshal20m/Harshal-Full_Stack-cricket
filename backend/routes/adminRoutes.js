const express = require("express");
const { getMatchState, updateScore, getOvers } = require("../controllers/scoreController");
const router = express.Router();

router.get("/state", getMatchState);
router.post("/score", updateScore);
router.get("/overs", getOvers);

module.exports = router;
