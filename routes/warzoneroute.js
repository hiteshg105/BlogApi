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
  warRscsComment,
  warRscsReviewAll,
  getAdminWar,
  declareWinner,
  getBothWarzoneCategoryWise,
  singleWarEdit,
} = require("../controller/warzonecontroller");
const router = express.Router();

router.post("/add/warzone", addWar);
router.get("/get/warzone", warZone_list);
router.get("/get/all/warzone", getAllWar);
router.get("/get/all/resource/warzone", warRscsReviewAll);
router.get("/get/review/warzone/:id", warReview);
router.get("/get/single/warzone/:id", getWarDetail);
router.get("/get/comment/warzone/:id", warRscsComment);
router.get("/get/allreview/warzone/resource/:id", warRscsReview);
router.delete("/delete/warzone/:id", deleteWarzone);
router.put("/update/warzone/:id", updateWarzone);
router.get("/update/warzone/admin", getAdminWar);
router.get("/warzone/result/cron-job", declareWinner);
router.get("/warzone/single/:id", singleWarEdit);

router.get("/get/both_warzone", getBothWarzoneCategoryWise);

module.exports = router;
