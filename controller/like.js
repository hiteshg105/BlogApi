const like = require("../models/like");
const resp = require("../helpers/apiResponse");
// const cloudinary = require("cloudinary").v2;
// const fs = require("fs");

exports.add_like = async (req, res) => {
  const {submitresrcId,userid,status } = req.body;

  const newlike = new like({
    submitresrcId:submitresrcId,
    userid:userid,
    status:status,
    
  })
  const findexist = await like.findOne({
    $and: [{ submitresrcId: submitresrcId }, { userid: userid }] }
     )
     if (findexist) {
       resp.alreadyr(res);
     }else{
  newlike
       .save()
       .then((data) => resp.successr(res, data))
       .catch((error) => resp.errorr(res, error));
     }
 }
 

exports.my_likes = async (req, res) => {
    await like.find({
        $and: [{ status: "like" }, { userid: req.params.id }],
     } ).populate("userid").populate("submitresrcId")
      .sort({ createdAt: -1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getone_news_ltr = async (req, res) => {
    await NewsLLtr.findOne({ _id: req.params.id }).populate("category")
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.like_unlike = async (req, res) => {
    await like.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: {status:req.body.status} },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.dlt_news_ltr= async (req, res) => {
    await SubCategory.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  