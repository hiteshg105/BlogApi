const CreatorWarZone = require("../models/ContentCreatorWarzone");
const Comment = require("../models/creatorComment");
var cron = require("node-cron");
const moment = require("moment");

// add war
exports.addCreatorWar = async (req, res) => {
  try {
    const war = await CreatorWarZone.create(req.body);
    res.status(200).json({
      status: true,
      msg: "Creator War Created Successfully...",
      data: war,
    });
  } catch (error) {
    console.log(error, "add warzone error");
    res.status(400).json({
      status: false,
      msg: "Something Went wrong",
    });
  }
};

// get war
exports.creator_warZone_list = async (req, res) => {
  try {
    let data = CreatorWarZone.find()
      .populate("resource1")
      .populate("resource2")
      .populate("category")
      .sort({ createdAt: -1 });
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * pageSize;
    const total = await CreatorWarZone.countDocuments();
    const totalPages = Math.ceil(total / pageSize);
    data = data.skip(skip).limit(pageSize);
    if (page > totalPages) {
      return res.status(201).json({
        success: false,
        massage: "No data found",
      });
    }
    const result = await data;
    const dataNew = JSON.parse(JSON.stringify(result));
    for (let i = 0; i < dataNew.length; i++) {
      const rsc1Comm = await Comment.find({
        creatorResrcId: dataNew[i].resource1._id,
      });
      const sumOfRatingsrsc1 = rsc1Comm.reduce((total, comment) => {
        return total + comment.rating;
      }, 0);
      const rsc1AvReview = sumOfRatingsrsc1 / rsc1Comm.length;
      dataNew[i].resource1.ava_rating = rsc1AvReview;

      const rsc2Comm = await Comment.find({
        creatorResrcId: dataNew[i].resource2._id,
      });
      const sumOfRatingsrsc2 = rsc2Comm.reduce((total, comment) => {
        return total + comment.rating;
      }, 0);
      const rsc2AvReview = sumOfRatingsrsc2 / rsc2Comm.length;
      dataNew[i].resource2.ava_rating = rsc2AvReview;
    }
    const categoryTitles = {};
    dataNew.forEach((item) => {
      const categoryTitle = item.category?.title;

      if (categoryTitles.hasOwnProperty(categoryTitle)) {
        categoryTitles[categoryTitle].push(item);
      } else {
        categoryTitles[categoryTitle] = [item];
      }
    });
    const result1 = Object.values(categoryTitles);
    res.status(200).send({
      success: true,
      message: "creator warzone listing successfully....",
      count: result1.length,
      page,
      totalPages,
      data: result1,
    });
  } catch (error) {
    console.log(error);
    res.send("error");
  }
};

//get home page war
exports.getAllCreatorWar = async (req, res) => {
  try {
    const data = await CreatorWarZone.find({
      isHomePage: true,
    })
      .populate("resource1")
      .populate("resource2")
      .populate("category")
      .populate({
        path: "resource1",
        populate: {
          path: "category",
          model: "category", // Assuming "User" is the model name for the user collection
        },
      })
      .populate({
        path: "resource1",
        populate: {
          path: "sub_category",
          model: "subcategory", // Assuming "User" is the model name for the user collection
        },
      })
      .populate({
        path: "resource2",
        populate: {
          path: "category",
          model: "category", // Assuming "User" is the model name for the user collection
        },
      })
      .populate({
        path: "resource2",
        populate: {
          path: "sub_category",
          model: "subcategory", // Assuming "User" is the model name for the user collection
        },
      })
      .sort({ createdAt: -1 });

    const dataNew = JSON.parse(JSON.stringify(data));
    for (let i = 0; i < dataNew.length; i++) {
      const rsc1Comm = await Comment.find({
        creatorResrcId: dataNew[i].resource1._id,
        createdAt: {
          $lte: dataNew[i].endDate,
          $gte: dataNew[i].startDate,
        },
      });
      const sumOfRatingsrsc1 = rsc1Comm.reduce((total, comment) => {
        return total + comment.rating;
      }, 0);
      const rsc1AvReview = sumOfRatingsrsc1 / rsc1Comm.length;
      dataNew[i].resource1.ava_rating = rsc1AvReview;

      const rsc2Comm = await Comment.find({
        creatorResrcId: dataNew[i].resource2._id,
        $lte: dataNew[i].endDate,
        $gte: dataNew[i].startDate,
      });
      const sumOfRatingsrsc2 = rsc2Comm.reduce((total, comment) => {
        return total + comment.rating;
      }, 0);
      const rsc2AvReview = sumOfRatingsrsc2 / rsc2Comm.length;
      dataNew[i].resource2.ava_rating = rsc2AvReview;
    }

    res.status(200).json({
      status: true,
      msg: "all creator war listing successfully.......",
      war: dataNew,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      msg: "Something Went wrong",
    });
  }
};

// get single war
exports.getCreatorWarDetail = async (req, res) => {
  try {
    const data = await CreatorWarZone.findById(req.params.id)
      .populate("resource1")
      .populate("resource2")
      .populate({
        path: "resource1",
        populate: {
          path: "userid",
          model: "user", // Assuming "User" is the model name for the user collection
        },
      })
      .populate({
        path: "resource2",
        populate: {
          path: "userid",
          model: "user", // Assuming "User" is the model name for the user collection
        },
      })
      .populate({
        path: "resource1",
        populate: {
          path: "category",
          model: "category", // Assuming "User" is the model name for the user collection
        },
      })
      .populate({
        path: "resource2",
        populate: {
          path: "category",
          model: "category", // Assuming "User" is the model name for the user collection
        },
      })
      .populate({
        path: "resource1",
        populate: {
          path: "language",
          model: "language", // Assuming "User" is the model name for the user collection
        },
      })
      .populate({
        path: "resource2",
        populate: {
          path: "language",
          model: "language", // Assuming "User" is the model name for the user collection
        },
      })
      .populate({
        path: "resource1",
        populate: {
          path: "relYear",
          model: "year", // Assuming "User" is the model name for the user collection
        },
      })
      .populate({
        path: "resource2",
        populate: {
          path: "relYear",
          model: "year", // Assuming "User" is the model name for the user collection
        },
      });
    res.status(200).json({
      status: true,
      msg: "creator war detail listing successfully.......",
      war: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      msg: "Something Went wrong",
    });
  }
};

// delete warZone
exports.deleteWarzone = async (req, res) => {
  try {
    await CreatorWarZone.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: true,
      msg: " war deleted successfully.......",
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      msg: "Something Went wrong",
    });
  }
};
