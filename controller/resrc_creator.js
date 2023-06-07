const { uploadBase64ImageFile } = require("../helpers/awsuploader");
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
    console.log(req.file.path, "first")
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
      message: "Content Crete Successfully.."
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
      .populate("language")

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 9;
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
    console.log(error)
    res.status(400).json({
      status: false,
      msg: "Something Went wrong",
    });
  }
}