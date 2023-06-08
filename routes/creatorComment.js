const express = require("express");
const { add_creator_comment, get_all_single_content_creator_comment } = require("../controller/creatorCommentController");
const router = express.Router();


router.post("/user/add_creator_comment", add_creator_comment);
router.get("/user/get_all_single_content_creator_comment/:id", get_all_single_content_creator_comment);


module.exports = router;