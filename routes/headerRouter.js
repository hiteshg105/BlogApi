const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const {
  addHeader,
  allHeader,
  deleteHeader,
  getSingleHeader,
  updateHeader,
} = require("../controller/headerController");

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

// let uploads = multer({ storage: storage });

router.post("/add/header", upload.single("image"), addHeader);
router.get("/get/all/header", allHeader);
router.delete("/delete/header/:id", deleteHeader);
router.get("/get/single/header/:id", getSingleHeader);
router.put("/update/single/header/:id", upload.single("image"), updateHeader);

module.exports = router;
