const express = require("express");
const router = express.Router();
const { addCreatorWar, 
    creator_warZone_list, 
    getAllCreatorWar, 
    getCreatorWarDetail, 
    deleteCreatorWarzone, 
    updateCreatorWarzone, 
    creatoWarReview, 
    creatorWarRscsReview, 
    creatorWarRscsComment, 
    CreatorDeclareWinner, 
    creatorWarRscsReviewAll, 
    getAdminWarCreator,
    singleWarContentEdit
   } = require("../controller/creatroWarzoneController");


router.post("/add/creator_warzone", addCreatorWar);
router.get("/get/creator_warzone", creator_warZone_list);
router.get("/get/all/creator_warzone", getAllCreatorWar);
router.get("/get/single/creator_warzone/:id", getCreatorWarDetail);
router.delete("/delete/creator_warzone/:id", deleteCreatorWarzone);
router.put("/update/creator_warzone/:id", updateCreatorWarzone);
router.get("/get/review/creator_warzone/:id", creatoWarReview);
router.get("/get/allreview/creator_warzone/resource/:id", creatorWarRscsReview);
router.get("/get/comment/creator_warzone/:id", creatorWarRscsComment);
router.get("/creator_warzone/result/cron-job", CreatorDeclareWinner);
router.get("/get/all/resource/creator_warzone", creatorWarRscsReviewAll);
router.get("/creator_warzone/admin", getAdminWarCreator);
router.get("/creator_warzone/single/:id", singleWarContentEdit);




module.exports = router;