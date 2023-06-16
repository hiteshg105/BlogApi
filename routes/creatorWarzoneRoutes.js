const express = require("express");
const { addCreatorWar, creator_warZone_list, getAllCreatorWar, getCreatorWarDetail } = require("../controller/creatroWarzoneController");
const router = express.Router();

router.post("/add/creator_warzone", addCreatorWar);
router.get("/get/creator_warzone", creator_warZone_list);
router.get("/get/all/creator_warzone", getAllCreatorWar);
router.get("/get/single/creator_warzone/:id", getCreatorWarDetail);

module.exports = router;