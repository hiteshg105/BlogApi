const { uploadBase64ImageFile } = require("../helpers/awsuploader");
const creatorComment = require("../models/creatorComment");
const ResCreator = require("../models/resrc_creator");

// function detectMimeType(b64) {
//   for (var s in signatures) {
//     if (b64.indexOf(s) === 0) {
//       return signatures[s];
//     }
//   }
// }

exports.App_Creator_content = async (req, res) => {
  try {
    console.log(req.body.link, "first")
    const {
      userid,
      link,
      category,
      sub_category,
      type,
      format,
      topics,
      desc,
      resTitle,
      creatorName,
      relYear,
      res_desc,
      comment,
      language,
    } = req.body;

    let newSubmit = await ResCreator.create({
      userid,
      link,
      category,
      sub_category,
      type,
      format,
      topics,
      desc,
      resTitle,
      creatorName,
      relYear,
      res_desc,
      comment,
      language,
    });
    if (req.file) newSubmit.img = req.file.path;
    await newSubmit.save();
    res.status(200).json({
      success: true,
      data: newSubmit,
      message: "Content Crete Successfully..",
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

//get All resouces Creator
exports.getAllContentCreator = async (req, res) => {
  try {
    let data = ResCreator.find()
      .populate("userid")
      .populate("sub_category")
      .populate("category")
      .populate("language");

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * pageSize;
    const total = await ResCreator.countDocuments();
    const totalPages = Math.ceil(total / pageSize);
    data = data.skip(skip).limit(pageSize);
    if (page > totalPages) {
      return res.status(201).json({
        success: false,
        massage: "No data found",
      });
    }
    const result = await data;
    // const dataNew = JSON.parse(JSON.stringify(result));
    // for (let i = 0; i < dataNew.length; i++) {
    //   const rsc1Comm = await Comment.find({
    //     submitresrcId: dataNew[i].resource1._id,
    //   });
    //   const sumOfRatingsrsc1 = rsc1Comm.reduce((total, comment) => {
    //     return total + comment.rating;
    //   }, 0);
    //   const rsc1AvReview = sumOfRatingsrsc1 / rsc1Comm.length;
    //   dataNew[i].resource1.ava_rating = rsc1AvReview;

    //   const rsc2Comm = await Comment.find({
    //     submitresrcId: dataNew[i].resource2._id,
    //   });
    //   const sumOfRatingsrsc2 = rsc2Comm.reduce((total, comment) => {
    //     return total + comment.rating;
    //   }, 0);
    //   const rsc2AvReview = sumOfRatingsrsc2 / rsc2Comm.length;
    //   dataNew[i].resource2.ava_rating = rsc2AvReview;
    // }
    // const categoryTitles = {};
    // dataNew.forEach((item) => {
    //   const categoryTitle = item.category.title;

    //   if (categoryTitles.hasOwnProperty(categoryTitle)) {
    //     categoryTitles[categoryTitle].push(item);
    //   } else {
    //     categoryTitles[categoryTitle] = [item];
    //   }
    // });
    // const result1 = Object.values(categoryTitles);
    res.status(200).send({
      success: true,
      message: "Content Creteor listing successfully....",
      count: result.length,
      page,
      totalPages,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      msg: "Something Went wrong",
    });
  }
};

exports.getSingleContentCreatorData = async (req, res) => {
  try {
    const id = req.params.id;
    const singleContentCreatorData = await ResCreator.findById(id)
      .populate("userid")
      .populate("language")
      .populate("sub_category")
      .populate("category")
    const commentData = await creatorComment.find({ creatorResrcId: id }).populate("userid")
    const sumOfRatings = commentData.reduce((sum, item) => sum + item.rating, 0);
    const averageRating = sumOfRatings / commentData.length;
    let newData = JSON.parse(JSON.stringify(singleContentCreatorData));
    newData.comment = commentData;
    newData.avarageRating = averageRating;
    res.status(200).send({
      success: true,
      message: "Content Creteor listing successfully....",
      data: newData,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      msg: "Something Went wrong",
    });
  }
};

exports.search_topic_title_content_creator = async (req, res) => {
  try {
    const { searchinput } = req.body;
    const data = await ResCreator.find({
      topics: { $regex: searchinput, $options: "i" },
    })
      .find({ status: "Active" })
      .populate("language");

    res.status(200).json({
      status: true,
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      msg: "error",
      error: error,
    });
  }
};

exports.keyword_search_filter = async (req, res) => {
  try {
    const { searchinput } = req.body;
    let query = {};
    if (req.body.type) {
      query.type = req.body.type;
      // where.push({type: req.query.type})
    }
    if (req.body.format) {
      query.format = req.body.format;
    }
    if (req.body.language) {
      query.language = req.body.language;
    }
    const data = await ResCreator.find({
      topics: { $regex: searchinput, $options: "i" },
    })
      .find({ status: "Active" })
      .find(query)
      .populate("category")
      .populate("sub_category")
      .populate("language");
    res.status(200).json({
      status: true,
      message: "find successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      msg: "error",
      error: error,
    });
  }
};

exports.updateContent = async (req, res) => {
  try {
    const data = await ResCreator.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      status: true,
      message: "update successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      msg: "error",
    });
  }
};

//delete content
exports.deleteContent = async (req, res) => {
  try {
    const data = await ResCreator.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: true,
      message: "delete successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      msg: "error",
    });
  }
};
