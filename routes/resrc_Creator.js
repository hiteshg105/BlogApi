const express = require("express");
const router = express.Router();
// const multer = require("multer");
// const fs = require("fs");
const {
  App_Creator_content,
  getAllContentCreator,
  getSingleContentCreatorData,
  search_topic_title_content_creator,
  updateContent,
  deleteContent,
  advanceContentfilter,
  advanceContentfilterNew,
  keyword_search_filter,
  listbysubcategoryCreator,
  App_Creator_content_Test,
  advanceContentfilterCategory,
  advanceContentfilterCategoryNew,
  getAllContentCreatorHome,
} = require("../controller/resrc_creator");

// if (!fs.existsSync("./uploads")) {
//   fs.mkdirSync("./uploads");
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });

// let uploads = multer({ storage: storage });

// let multipleUpload = uploads.fields([
//   { name: "img", maxCount: 1 },

//   //   { name: "storepan_img", maxCount: 5 },
// ]);

const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (
      !file.originalname.match(
        /\.(mp4|webp|webm|MPEG-4|mkv|mov|png|jpg|jpeg|pdf|doc|docx)$/
      )
    ) {
      return cb(new Error("Please upload a image"));
    }
    cb(undefined, true);
  },
});

router.post(
  "/user/content/creator",
  upload.single("img"),
  App_Creator_content_Test
);

router.get(
  "/get_all/content/creator",

  getAllContentCreator
);

router.get(
  "/content/creator/get_single_content_data/:id",
  getSingleContentCreatorData
);

router.get("/content/creator/get_content_data/home", getAllContentCreatorHome);

router.get(
  "/content/search_topic_title_content_creator",
  search_topic_title_content_creator
);

router.post("/content/keyword_search_filter", keyword_search_filter);

router.post("/content/advance_content_filter", advanceContentfilter);

router.post("/content/advance_content_filter_new", advanceContentfilterNew);

router.post(
  "/content/category/advance_content_filter",
  advanceContentfilterCategory
);

router.post(
  "/content/category/advance_content_filterNew",
  advanceContentfilterCategoryNew
);

router.put("/content/update/admin/:id", updateContent);

router.delete("/content/delete/admin/:id", deleteContent);

router.get("/admin/list_by_subcategory_creator/:id", listbysubcategoryCreator);
module.exports = router;
