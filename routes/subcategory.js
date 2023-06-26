const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
  addSubCategory,
  getallSubCategory,
  getoneSubCategory,
  editSubCategory,
  dltSubCategory,
  total_subcategory

} = require("../controller/subcategory");

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       //console.log(file);
//       let path = `./uploads`;
//       if (!fs.existsSync("uploads")) {
//         fs.mkdirSync("uploads");
//       }
//       cb(null, path);
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname);
//     },
//   });

//   const fileFilter = (req, file, cb) => {
//     if (
//       file.mimetype.includes("jpeg") ||
//       file.mimetype.includes("png") ||
//       file.mimetype.includes("jpg") ||
//        file.mimetype.includes("pdf")
//     ) {
//       cb(null, true);
//     } else {
//       cb(null, false);
//     }
//   };

//   let uploads = multer({ storage: storage });

//   let multipleUpload = uploads.fields([
//     { name: "Subcat_img", maxCount: 1 },

//     //   { name: "storepan_img", maxCount: 5 },

//   ]);

// const multer = require("multer");

const userdocstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const filefilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(mp4|webp|MPEG-4|mkv|mov|png|jpg|jpeg)$/)) {
    return cb(new Error("Please upload a image"));
  }
  cb(undefined, true);
};

const userdocupload = multer({
  storage: userdocstorage,
  limits: { fieldSize: 25 * 1024 * 1024 },
  fileFilter: filefilter,
});

router.post("/admin/addSubCategory", userdocupload.fields([{ name: "Subcat_img", maxCount: 1 }]), addSubCategory);
router.get("/admin/getallSubCategory", getallSubCategory);
router.get("/admin/getoneSubCategory/:id", getoneSubCategory);
router.put("/admin/editSubCategory/:id", userdocupload.fields([{ name: "Subcat_img", maxCount: 1 }]), editSubCategory);
router.get("/admin/dltSubCategory/:id", dltSubCategory);
router.get("/admin/total_subcategory", total_subcategory);

module.exports = router;

