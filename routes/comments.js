const express = require("express");
const router = express.Router();
//console

const {
  add_Comment,
  comment_list,
  admin_comment_list,
  getone_coment_list,
  admin_edit_coment,
  dlt_Coment,
  add_blog_Comment,
  userBlog_Cmntlist,
  adminBlog_Cmntlist,
  getoneBlog_Cmntlist,
  editBlog_Cmntlist,
  dltBlog_Cmntlist,
  filterByRating,
  average_rating,
  editCommentbyUser,
  crntMonth,
  userCalculate,
} = require("../controller/comments");

router.post("/user/add_Comment", add_Comment);
router.get("/user/comment_list/:id", comment_list);
router.get("/admin/admin_comment_list", admin_comment_list);
router.get("/admin/getone_coment_list/:id", getone_coment_list);
// router.get("/admin/getoneContactus/:id",     getoneContactus)
router.post("/admin/admin_edit_coment/:id", admin_edit_coment);
router.get("/admin/dlt_Coment/:id", dlt_Coment);

router.post("/user/add_blog_Comment", add_blog_Comment);
router.get("/user/userBlog_Cmntlist", userBlog_Cmntlist);
router.get("/admin/adminBlog_Cmntlist", adminBlog_Cmntlist);
router.get("/admin/getoneBlog_Cmntlist/:id", getoneBlog_Cmntlist);
// router.get("/admin/getoneContactus/:id",     getoneContactus)
router.post("/admin/editBlog_Cmntlist/:id", editBlog_Cmntlist);
router.get("/admin/dltBlog_Cmntlist/:id", dltBlog_Cmntlist);
router.get("/user/filterByRating/:id", filterByRating);
router.get("/user/average_rating/:id", average_rating);
router.post("/user/editCommentbyUser/:id", editCommentbyUser);
router.get("/user/crntMonth", crntMonth);
router.get("/user/user_calculate/:id", userCalculate);

module.exports = router;
