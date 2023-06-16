const express = require("express");
const { addCreatorWar, creator_warZone_list, getAllCreatorWar, getCreatorWarDetail, deleteCreatorWarzone, updateCreatorWarzone, creatoWarReview } = require("../controller/creatroWarzoneController");
const router = express.Router();

router.post("/add/creator_warzone", addCreatorWar);
router.get("/get/creator_warzone", creator_warZone_list);
router.get("/get/all/creator_warzone", getAllCreatorWar);
router.get("/get/single/creator_warzone/:id", getCreatorWarDetail);
router.delete("/delete/creator_warzone/:id", deleteCreatorWarzone);
router.put("/update/creator_warzone/:id", updateCreatorWarzone);
router.get("/get/review/creator_warzone/:id", creatoWarReview);



module.exports = router;