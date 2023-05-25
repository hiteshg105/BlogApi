const Featured = require("../models/featured_cnt");
const resp = require("../helpers/apiResponse");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

exports.add_feature_cnt = async (req, res) => {
  const { thumbnail_img, video_link } = req.body;

  const newFeatured = new Featured({
    thumbnail_img: thumbnail_img,
    video_link: video_link,
  });

  if (req.files) {
    if (req.files.thumbnail_img) {
      alluploads = [];
      for (let i = 0; i < req.files.thumbnail_img.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.thumbnail_img[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.thumbnail_img[i].path);
        alluploads.push(resp.secure_url);
      }
      newFeatured.thumbnail_img = alluploads;
    }
  }
  newFeatured
    .save()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.get_featured_cnt = async (req, res) => {
  await Featured.find({ status: "Active" })
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.admin_featured_cnt = async (req, res) => {
  await Featured.find()
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getone_featurde = async (req, res) => {
  await Featured.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.edit_featurde = async (req, res) => {
  const { status } = req.body;

  //   if (req.files) {
  //     if (req.files.thumbnail_img) {
  //       alluploads = [];
  //       for (let i = 0; i < req.files.thumbnail_img.length; i++) {
  //         // console.log(i);
  //         const resp = await cloudinary.uploader.upload(req.files.thumbnail_img[i].path, {
  //           use_filename: true,
  //           unique_filename: false,
  //         });
  //         fs.unlinkSync(req.files.thumbnail_img[i].path);
  //         alluploads.push(resp.secure_url);
  //       }
  //       // newStore.storeImg = alluploads;
  //       data.thumbnail_img = alluploads;
  //     }
  //  }
  await Featured.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: { status: req.body.status } },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.dlt_featured = async (req, res) => {
  await Featured.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.listbysubCategory = async (req, res) => {
  await SubCategory.find({ category: req.params.id })
    .populate("category")
    .populate("relYear")
    .sort({ sortorder: 1 })

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
