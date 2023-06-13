const Comment = require("../models/comments");
const resp = require("../helpers/apiResponse");
const User = require("../models/user");
var _ = require("lodash");
const Submit = require("../models/submit_resrc");
const calculateRating = require("../models/calculatateRatingCount");
const Blogcomment = require("../models/blog_comnt");
const CurrntMonth = require("../models/currentMonth");
const creatorComment = require("../models/creatorComment");

exports.add_creator_comment = async (req, res) => {
  try {
    const userFind = await creatorComment.findOne({
      userid: req.body.userid,
      creatorResrcId: req.body.creatorResrcId,
    });
    if (userFind) {
      res.status(200).json({
        status: false,
        msg: "comment already exists",
      });
    } else {
      const creatorCommentData = await creatorComment.create(req.body);
      res.status(200).json({
        status: true,
        msg: "comment create succesfully",
        data: creatorCommentData,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
};

exports.get_all_single_content_creator_comment = async (req, res) => {
  try {
    const id = req.params.id;
    const commentData = await creatorComment.find({ creatorResrcId: id });
    res.status(200).json({
      status: true,
      msg: "get all comment succesfully",
      data: commentData,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
};

exports.get_all_comment_admin = async (req, res) => {
  try {
    const commentData = await creatorComment.find().populate("userid");
    res.status(200).json({
      status: true,
      msg: "get all comment succesfully",
      data: commentData,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
};

exports.delete_comment_admin = async (req, res) => {
  try {
    const commentData = await creatorComment.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: true,
      msg: "comment delete successfully",
      // data: commentData,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
};
