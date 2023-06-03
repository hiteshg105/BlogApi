const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const { App_Creator_content } = require("../controller/resrc_creator");

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

router.post(
  "/user/content/creator",
  uploads.single("img"),
  App_Creator_content
);

module.exports = router;
