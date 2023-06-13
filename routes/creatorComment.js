const express = require("express");
const {
  add_creator_comment,
  get_all_single_content_creator_comment,
  get_all_comment_admin,
  delete_comment_admin,
} = require("../controller/creatorCommentController");
const router = express.Router();

router.post("/user/add_creator_comment", add_creator_comment);
router.get(
  "/user/get_all_single_content_creator_comment/:id",
  get_all_single_content_creator_comment
);
router.get("/user/get_all_comment", get_all_comment_admin);
router.delete("/delete/get_all_comment/:id", delete_comment_admin);

module.exports = router;
