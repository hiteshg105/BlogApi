const express = require("express");
const {
  addWar,
  warZone_list,
  deleteWarzone,
  getWarDetail,
  getAllWar,
  updateWarzone,
} = require("../controller/warzone");
const router = express.Router();

router.post("/add/warzone", addWar);
router.get("/get/warzone", warZone_list);
router.get("/get/all/warzone", getAllWar);
router.get("/get/single/warzone/:id", getWarDetail);
router.delete("/delete/warzone/:id", deleteWarzone);
router.put("/update/warzone/:id", updateWarzone);

module.exports = router;
