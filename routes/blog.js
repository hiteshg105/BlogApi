const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
  addBlog,
  getBlog,
  viewoneBlog,
  delBlog,
  editBlog,
  popularBlog,
  recomanded_Blog,
  activeBlog,
} = require("../controller/blog");

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
  { name: "blogImg", maxCount: 4 },
  //  { name: "posted_by_img", maxCount: 4 },

  { name: "posted_by_img", maxCount: 1 },
  //   { name: "tradelicence_img", maxCount: 5 },
  //   { name: "companypan_img", maxCount: 5 },
  //   { name: "address_proof_img", maxCount: 5 },
]);

// PATHS
router.post("/admin/addBlog", multipleUpload, addBlog);
router.get("/admin/getBlog", getBlog);
router.get("/user/popularBlog", popularBlog);
router.get("/user/recomanded_Blog", recomanded_Blog);

router.get("/admin/viewoneBlog/:id", viewoneBlog);
router.get("/user/activeBlog/:id", activeBlog);

router.get("/admin/delBlog/:id", delBlog);
router.post("/admin/editBlog/:id", multipleUpload, editBlog);

module.exports = router;
