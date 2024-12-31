const express = require("express");
const { getMatchState } = require("../controllers/scoreController");
const router = express.Router();

router.get("/state", getMatchState);

module.exports = router;
