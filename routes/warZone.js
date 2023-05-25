const express = require("express");
const { addWar, warZone_list } = require("../controller/warZone");
const router = express.Router();

router.post("/add/warzone", addWar);
router.get("/get/warzone", warZone_list);

module.exports = router;
