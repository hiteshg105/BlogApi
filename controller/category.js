const Category = require("../models/category");
const resp = require("../helpers/apiResponse");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
exports.addCategory = async (req, res) => {
  const { title, desc, count, cat_img } = req.body;

  const newCategory = new Category({
    title: title,
    desc: desc,
    count: count,
  });
  const findexist = await Category.findOne({ title: title });
  if (findexist) {
    resp.alreadyr(res);
  } else {
    if (req.files) {
      if (req.files.cat_img[0].path) {
        alluploads = [];
        for (let i = 0; i < req.files.cat_img.length; i++) {
          const resp = await cloudinary.uploader.upload(
            req.files.cat_img[i].path,
            { use_filename: true, unique_filename: false }
          );
          fs.unlinkSync(req.files.cat_img[i].path);
          alluploads.push(resp.secure_url);
        }
        newCategory.cat_img = alluploads;
      }
    }
    newCategory
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
};

exports.getallCategory = async (req, res) => {
  await Category.find()
    .sort({ count: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getoneCategory = async (req, res) => {
  await Category.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.editCategory = async (req, res) => {
  const { title, desc, count, cat_img } = req.body;
  // console.log(count,"count")
  data = {};
  if (title) {
    data.title = title;
  }
  if (desc) {
    data.desc = desc;
  }
  if (count) {
    data.count = count;
  }

  if (req.files) {
    if (req.files.cat_img) {
      alluploads = [];
      for (let i = 0; i < req.files.cat_img.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(
          req.files.cat_img[i].path,
          {
            use_filename: true,
            unique_filename: false,
          }
        );
        fs.unlinkSync(req.files.cat_img[i].path);
        alluploads.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.cat_img = alluploads;
    }
  }

  await Category.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: data },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.dltCategory = async (req, res) => {
  await Category.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.total_category = async (req, res) => {
  await Category.countDocuments()
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
