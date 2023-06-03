const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
  add_feature_cnt,
  get_featured_cnt,
  getone_featurde,
  edit_featurde,
  dlt_featured,
  admin_featured_cnt,
} = require("../controller/featured_cnt");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //console.log(file);
    let path = `./uploads`;
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("jpeg") ||
    file.mimetype.includes("png") ||
    file.mimetype.includes("jpg") ||
    file.mimetype.includes("pdf")
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploads = multer({ storage: storage });

let multipleUpload = uploads.fields([
  { name: "thumbnail_img", maxCount: 1 },

  //   { name: "storepan_img", maxCount: 5 },
]);

router.post("/admin/add_feature_cnt", multipleUpload, add_feature_cnt);
router.get("/user/get_featured_cnt", get_featured_cnt);
router.get("/admin/admin_featured_cnt", admin_featured_cnt);

router.get("/admin/getone_featurde/:id", getone_featurde);
router.post("/admin/edit_featurde/:id", multipleUpload, edit_featurde);
router.get("/admin/dlt_featured/:id", dlt_featured);

module.exports = router;
