const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
  addSub_resrc,
  admin_Sub_resrc,
  user_sub_res_lsit,
  admin_sub_res_lsit,
  getone_reslist,
  edit_submit_rsrc,
  dlt_subres_list,
  approve_submit_resrc,
  listbycategory,
  listbysubcategory,
  Promotions,
  total_sub_resrc,
  total_paid_resrc,
  total_free_resrc,
  getone_submitresrc_list,
  my_content_meteros,
  App_Sub_resrc,
  filter_type,
  filterbypaid_subresrc,
  filterbyFormat,
  search_topic_title,
  filterbyyear,
  filterbyLanguage,
  treding_topics,
  filterbyHashTag,
  posted_by_me,
  edit_promotion,
  filterbyid,
  advancefilter,
  advancefilterNew,
  hashfilter,
  filter,
  regidnamemobemail,
  promotion_filter,
  search_promotion,
  search_filter,
  keyword_search_filter,
  promotion_search_filter,
  active_resrc_lsit,
  advancefilterCategory,
} = require("../controller/submit_resrc");

if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

let uploads = multer({ storage: storage });

let multipleUpload = uploads.fields([
  { name: "img", maxCount: 1 },

  //   { name: "storepan_img", maxCount: 5 },
]);

router.post("/user/addSub_resrc", uploads.single("img"), addSub_resrc);
router.post("/user/App_Sub_resrc", uploads.single("img"), App_Sub_resrc);

router.post("/admin/admin_Sub_resrc", uploads.single("img"), admin_Sub_resrc);

router.get("/user/user_sub_res_lsit", user_sub_res_lsit);
router.get("/admin/admin_sub_res_lsit", admin_sub_res_lsit);

router.get("/admin/getone_reslist/:id", getone_reslist);
router.post("/admin/edit_submit_rsrc/:id", multipleUpload, edit_submit_rsrc);
router.get("/admin/dlt_subres_list/:id", dlt_subres_list);
router.post("/admin/approve_submit_resrc/:id", approve_submit_resrc);
router.get("/admin/listbycategory/:id", listbycategory);
router.get("/admin/listbysubcategory/:id", listbysubcategory);
router.get("/user/Promotions", Promotions);
router.get("/admin/total_sub_resrc", total_sub_resrc);
router.get("/admin/total_paid_resrc", total_paid_resrc);

router.get("/admin/total_free_resrc", total_free_resrc);
// router.get("/user/getone_submitresrc_list", getone_submitresrc_list);
router.get("/user/my_content_meteros/:id", my_content_meteros);
router.get("/user/filter_type/:sub_category/:id", filter_type);
router.get("/user/filterbyFormat/:sub_category/:id", filterbyFormat);

router.post("/user/search_topic_title", search_topic_title);
router.get("/user/filterbyyear/:sub_category/:id", filterbyyear);

router.get("/user/filterbyLanguage/:sub_category/:id", filterbyLanguage);

router.get("/user/treding_topics", treding_topics);
router.get("/user/filterbyHashTag/:sub_category/:id", filterbyHashTag);
router.get("/user/posted_by_me/:id", posted_by_me);
router.post("/admin/edit_promotion/:id", edit_promotion);

router.get("/user/filterbyid/:sub_category/:?type/:format", filterbyid);
// :id?type/:id?format?/:id?relYear?
router.post("/user/advancefilter", advancefilter);
router.post("/user/advancefilterNew", advancefilterNew);
router.post("/user/advancefilter/category", advancefilterCategory);
router.post("/user/hashfilter", hashfilter);
router.post("/user/filter", filter);
router.post("/user/regidname", regidnamemobemail);

router.post("/user/promotion_filter", promotion_filter);
router.post("/user/search_promotion", search_promotion);
router.post("/user/search_filter", search_filter);
router.post("/user/keyword_search_filter", keyword_search_filter);
router.post("/user/promotion_search_filter", promotion_search_filter);

router.get("/user/get_all_active_resrc_lsit", active_resrc_lsit);

//advancefilterRR
module.exports = router;
