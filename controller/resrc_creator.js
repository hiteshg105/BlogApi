const { uploadFile } = require("../helpers/awsuploader");
const creatorComment = require("../models/creatorComment");
const ResCreator = require("../models/resrc_creator");
const SubCategory = require("../models/subcategory");

// function detectMimeType(b64) {
//   for (var s in signatures) {
//     if (b64.indexOf(s) === 0) {
//       return signatures[s];
//     }
//   }
// }

exports.App_Creator_content = async (req, res) => {
  try {
    // const {
    //   userid,
    //   link,
    //   category,
    //   sub_category,
    //   type,
    //   format,
    //   topics,
    //   desc,
    //   resTitle,
    //   creatorName,
    //   relYear,
    //   res_desc,
    //   comment,
    //   language,
    // } = req.body;

    let linkFind = req.body.link;
    // console.log(linkFind, "linkFind");
    let foundDocuments;
    for (let i = 0; i < linkFind.length; i++) {
      console.log(linkFind[i].length !== 0);
      if (linkFind[i].length !== 0) {
        foundDocuments = await ResCreator.findOne({
          link: { $in: linkFind[i] },
        });
      }
    }

    // console.log(foundDocuments, "foundDocuments");
    if (foundDocuments) {
      res.status(200).json({
        success: false,
        // data: newSubmit,
        message: "content creator exists",
      });
    } else {
      let newSubmit = await ResCreator.create(req.body);
      if (req.file) newSubmit.img = req.file.path;
      newSubmit.status = "Deactive";
      await newSubmit.save();
      res.status(200).json({
        success: true,
        data: newSubmit,
        message: "Content Crete Successfully..",
      });
    }
    // console.log(foundDocuments,"foundDocuments")
  } catch (error) {
    res.status(400).send(error);
  }
};

//get All resouces Creator
exports.getAllContentCreator = async (req, res) => {
  try {
    let data = await ResCreator.find()
      .populate("userid")
      .populate("sub_category")
      .populate("category")
      .populate("language");

    // const page = parseInt(req.query.page) || 1;
    // const pageSize = parseInt(req.query.limit) || 20;
    // const skip = (page - 1) * pageSize;
    // const total = await ResCreator.countDocuments();
    // const totalPages = Math.ceil(total / pageSize);
    // data = data.skip(skip).limit(pageSize);
    // if (page > totalPages) {
    //   return res.status(201).json({
    //     success: false,
    //     massage: "No data found",
    //   });
    // }
    // const result = await data;
    const dataNew = JSON.parse(JSON.stringify(data));
    for (let i = 0; i < dataNew.length; i++) {
      const rsc1Comm = await creatorComment.find({
        creatorResrcId: dataNew[i]._id,
      });
      // console.log(rsc1Comm);
      const sumOfRatingsrsc1 = rsc1Comm.reduce((total, comment) => {
        return total + comment.rating;
      }, 0);
      const rsc1AvReview = sumOfRatingsrsc1 / rsc1Comm.length;
      dataNew[i].ava_rating = rsc1AvReview;
      dataNew[i].length = rsc1Comm.length;
    }

    res.status(200).send({
      success: true,
      message: "Content Creteor listing successfully....",
      // count: result.length,
      // page,
      // totalPages,
      data: dataNew,
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
      .populate("category");
    const commentData = await creatorComment
      .find({ creatorResrcId: id })
      .populate("userid");
    const sumOfRatings = commentData.reduce(
      (sum, item) => sum + item.rating,
      0
    );
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

exports.advanceContentfilterCategory = async (req, res) => {
  let query = {};
  let where = {};
  // if (req.query.sub_category) {
  //   query.sub_category = req.query.sub_category;
  // }
  if (req.query.format) {
    query.format = req.query.format;
  }
  if (req.query.language) {
    query.language = req.query.language;
  }

  let blogs = await ResCreator.find({
    status: "Active",
    category: req.body.category,
  })

    .find(query)
    .populate("sub_category")
    .populate("category")
    .populate("language")
    .populate("userid");
  const dataNew = JSON.parse(JSON.stringify(blogs));
  for (let i = 0; i < dataNew.length; i++) {
    const rsc1Comm = await creatorComment.find({
      creatorResrcId: dataNew[i]._id,
    });
    // console.log(rsc1Comm);
    const sumOfRatingsrsc1 = rsc1Comm.reduce((total, comment) => {
      return total + comment.rating;
    }, 0);
    const rsc1AvReview = sumOfRatingsrsc1 / rsc1Comm.length;

    dataNew[i].ava_rating = rsc1AvReview;
    dataNew[i].length = rsc1Comm.length;
  }
  // console.log(dataNew, "dataNew");
  const NewSortingData = dataNew.sort((a, b) => {
    if (isNaN(a.ava_rating)) return 1; // Move null values to the end
    if (isNaN(b.ava_rating)) return -1; // Move null values to the end
    return b.ava_rating - a.ava_rating; // Compare ratings in descending order
  });

  return res.status(200).json({
    message: "blog success",
    success: true,
    data: NewSortingData,
  });
};

exports.advanceContentfilter = async (req, res) => {
  let query = {};
  let where = {};
  if (req.query.sub_category) {
    query.sub_category = req.query.sub_category;
  }
  if (req.query.format) {
    query.format = req.query.format;
  }
  if (req.query.language) {
    query.language = req.query.language;
  }

  let blogs = await ResCreator.find({
    status: "Active",
  //  sub_category: req.body.sub_category,
  })

    .find(query)
    .populate("sub_category")
    .populate("category")
    .populate("language")
    .populate("userid");
  const dataNew = JSON.parse(JSON.stringify(blogs));
  for (let i = 0; i < dataNew.length; i++) {
    const rsc1Comm = await creatorComment.find({
      creatorResrcId: dataNew[i]._id,
    });
    // console.log(rsc1Comm);
    const sumOfRatingsrsc1 = rsc1Comm.reduce((total, comment) => {
      return total + comment.rating;
    }, 0);
    const rsc1AvReview = sumOfRatingsrsc1 / rsc1Comm.length;

    dataNew[i].ava_rating = rsc1AvReview;
    dataNew[i].length = rsc1Comm.length;
  }
  // console.log(dataNew, "dataNew");
  const NewSortingData = dataNew.sort((a, b) => {
    if (isNaN(a.ava_rating)) return 1; // Move null values to the end
    if (isNaN(b.ava_rating)) return -1; // Move null values to the end
    return b.ava_rating - a.ava_rating; // Compare ratings in descending order
  });

  return res.status(200).json({
    message: "blog success",
    success: true,
    data: NewSortingData,
  });
};

exports.listbysubcategoryCreator = async (req, res) => {
  const getone = await ResCreator.find({
    $and: [{ sub_category: req.params.id }, { status: "Active" }],
  })
    .populate("category")
    .populate("sub_category")
    .sort({ sortorder: 1 })
    .populate("language");

  if (getone) {
    const finddata = await SubCategory.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: { conent_count: getone.length } },
      { new: true }
    );
    // console.log("finddata", finddata);
    res.status(200).json({
      status: true,
      message: "success",
      count: getone.length,
      data: getone,
    });
  } else {
    res.status(400).json({
      status: false,
      message: "error",
      error: error,
    });
  }

  // .then((data) => resp.successr(res, data))
  // .catch((error) => resp.errorr(res, error));
};

exports.App_Creator_content_Test = async (req, res) => {
  try {
    let linkFind = req.body.link;
    let foundDocuments;
    for (let i = 0; i < linkFind.length; i++) {
      console.log(linkFind[i].length !== 0);
      if (linkFind[i].length !== 0) {
        foundDocuments = await ResCreator.findOne({
          link: { $in: linkFind[i] },
        });
      }
    }

    // console.log(foundDocuments, "foundDocuments");
    if (foundDocuments) {
      res.status(200).json({
        success: false,
        // data: newSubmit,
        message: "content creator exists",
      });
    } else {
      // console.log(req.file);
      let newSubmit = await ResCreator.create(req.body);
      if (req.file) {
        const geturl = await uploadFile(
          req.file.path,
          req.file.filename,
          req.file.mimetype
        );
        // console.log(geturl, "geturl");
        newSubmit.img = geturl.Location;
        await newSubmit.save();
      }
      newSubmit.status = "Deactive";
      await newSubmit.save();
      res.status(200).json({
        success: true,
        data: newSubmit,
        message: "Content Crete Successfully..",
      });
    }
    // console.log(foundDocuments,"foundDocuments")
  } catch (error) {
    res.status(400).send(error);
  }
};
