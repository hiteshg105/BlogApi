const express = require("express");
const router = express.Router();
// const multer = require("multer");
// const fs = require("fs");
const { App_Creator_content, getAllContentCreator, getSingleContentCreatorData, search_topic_title_content_creator } = require("../controller/resrc_creator");

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
    if (!file.originalname.match(/\.(mp4|webp|webm|MPEG-4|mkv|mov|png|jpg|jpeg|pdf|doc|docx)$/)) {
      return cb(new Error("Please upload a image"));
    }
    cb(undefined, true);
  },
});





router.post(
  "/user/content/creator",
  upload.single("img"),
  App_Creator_content
);


router.get(
  "/get_all/content/creator",

  getAllContentCreator
);


router.get(
  "/content/creator/get_single_content_data/:id",
  getSingleContentCreatorData
);


router.get(
  "/content/search_topic_title_content_creator",
  search_topic_title_content_creator
);
module.exports = router;
