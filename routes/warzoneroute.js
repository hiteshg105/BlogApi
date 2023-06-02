const express = require("express");
const {
  addWar,
  warZone_list,
  deleteWarzone,
  getWarDetail,
  getAllWar,
  updateWarzone,
  warReview,
  warRscsReview,
} = require("../controller/warzonecontroller");
const router = express.Router();

router.post("/add/warzone", addWar);
router.get("/get/warzone", warZone_list);
router.get("/get/all/warzone", getAllWar);
router.get("/get/review/warzone/:id", warReview);
router.get("/get/single/warzone/:id", getWarDetail);
router.get("/get/allreview/warzone/resource/:id", warRscsReview);
router.delete("/delete/warzone/:id", deleteWarzone);
router.put("/update/warzone/:id", updateWarzone);

module.exports = router;
