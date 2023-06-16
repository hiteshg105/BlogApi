const express = require("express");
const { addCreatorWar } = require("../controller/creatroWarzoneController");
const router = express.Router();

router.post("/add/creator_warzone", addCreatorWar);

module.exports = router;