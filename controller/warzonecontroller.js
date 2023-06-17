const WarZone = require("../models/warzonemodel");
const Comment = require("../models/comments");
var cron = require("node-cron");
const moment = require("moment");

// add war
exports.addWar = async (req, res) => {
  try {
    const war = await WarZone.create(req.body);
    res.status(200).json({
      status: true,
      msg: "War Created Successfully...",
      war,
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
exports.warZone_list = async (req, res) => {
  try {
    let  data = await WarZone.find()
      .populate("resource1")
      .populate("resource2")
      .populate("category")
      .sort({ createdAt: -1 });
    // const page = parseInt(req.query.page) || 1;
    // const pageSize = parseInt(req.query.limit) || 20;
    // const skip = (page - 1) * pageSize;
    // const total = await WarZone.countDocuments();
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
      const rsc1Comm = await Comment.find({
        submitresrcId: dataNew[i].resource1._id,
      });
      const sumOfRatingsrsc1 = rsc1Comm.reduce((total, comment) => {
        return total + comment.rating;
      }, 0);
      const rsc1AvReview = sumOfRatingsrsc1 / rsc1Comm.length;
      dataNew[i].resource1.ava_rating = rsc1AvReview;

      const rsc2Comm = await Comment.find({
        submitresrcId: dataNew[i].resource2._id,
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
      message: "warzone listing successfully....",
     
      data: result1,
    });
  } catch (error) {
    console.log(error);
    res.send("error");
  }
};

//get home page war
exports.getAllWar = async (req, res) => {
  try {
    const data = await WarZone.find({
      isHomePage: true,
    })
      .populate("resource1")
      .populate("resource2")
      .populate("category")
      .sort({ createdAt: -1 });

    const dataNew = JSON.parse(JSON.stringify(data));
    for (let i = 0; i < dataNew.length; i++) {
      const rsc1Comm = await Comment.find({
        submitresrcId: dataNew[i].resource1._id,
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
        submitresrcId: dataNew[i].resource2._id,
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
      msg: "all war listing successfully.......",
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
exports.getWarDetail = async (req, res) => {
  try {
    const data = await WarZone.findById(req.params.id)
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
      msg: "war detail listing successfully.......",
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
    await WarZone.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: true,
      msg: "war deleted successfully.......",
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      msg: "Something Went wrong",
    });
  }
};

// update warZone
exports.updateWarzone = async (req, res) => {
  try {
    await WarZone.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      status: true,
      msg: "war updated successfully.......",
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      msg: "Something Went wrong",
    });
  }
};

exports.warReview = async (req, res) => {
  const war = await WarZone.findById(req.params.id);
  const rcs1Comment = await Comment.find({
    submitresrcId: war.resource1,
    createdAt: {
      $lte: war.endDate,
      $gte: war.startDate,
    },
  });
  const sumOfRatingsrsc1 = rcs1Comment.reduce((total, comment) => {
    return total + comment.rating;
  }, 0);
  const rsc1AvReview = sumOfRatingsrsc1 / rcs1Comment.length;
  const rcs2Comment = await Comment.find({
    submitresrcId: war.resource2,
    createdAt: {
      $lte: war.endDate,
      $gte: war.startDate,
    },
  });
  const sumOfRatingsrsc2 = rcs2Comment.reduce((total, comment) => {
    return total + comment.rating;
  }, 0);
  const rsc2AvReview = sumOfRatingsrsc2 / rcs2Comment.length;
  res.status(200).json({
    status: true,
    msg: "war updated successfully.......",
    rsc1AvReview,
    rsc2AvReview,
    toalRsc1: rcs1Comment.length,
    toalRsc2: rcs2Comment.length,
  });
};

exports.warRscsReview = async (req, res) => {
  const war = await WarZone.findById(req.params.id);
  const rcs1Comment = await Comment.find({
    submitresrcId: war.resource1,
  });
  const sumOfRatingsrsc1 = rcs1Comment.reduce((total, comment) => {
    return total + comment.rating;
  }, 0);
  const rsc1AvReview = sumOfRatingsrsc1 / rcs1Comment.length;

  const rcs2Comment = await Comment.find({
    submitresrcId: war.resource2,
  });
  const sumOfRatingsrsc2 = rcs2Comment.reduce((total, comment) => {
    return total + comment.rating;
  }, 0);

  const rsc2AvReview = sumOfRatingsrsc2 / rcs2Comment.length;

  res.status(200).json({
    status: true,
    msg: "war updated successfully.......",
    rsc1AvReview,
    rsc2AvReview,
    toalRsc1: rcs1Comment.length,
    toalRsc2: rcs2Comment.length,
    rsc1Comment: rcs1Comment,
    rsc2Comment: rcs2Comment,
  });
};

exports.warRscsComment = async (req, res) => {
  const war = await WarZone.findById(req.params.id);
  const rcs1Comment = await Comment.find({
    submitresrcId: war.resource1,
  }).populate("userid");
  const newData = JSON.parse(JSON.stringify(rcs1Comment));

  for (let i = 0; i < newData.length; i++) {
    const data = moment(newData[i].createdAt).fromNow();
    newData[i].timeLine = data;
  }

  const rcs2Comment = await Comment.find({
    submitresrcId: war.resource2,
  }).populate("userid");

  const newData2 = JSON.parse(JSON.stringify(rcs2Comment));

  for (let i = 0; i < newData2.length; i++) {
    const data = moment(newData2[i].createdAt).fromNow();
    newData2[i].timeLine = data;
  }

  res.status(200).json({
    status: true,
    msg: "war resources comment listing successfully.......",
    newData,
    newData2,
  });
};

// get winner
// cron.schedule("*/30 * * * *", async () => {
exports.declareWinner = async (req, res) => {
  try {
    // const date = new Date();
    // date.setUTCHours(0, 0, 0, 0);
    const data = await WarZone.find({
      endDate: { $lte: new Date() },
      isDeclare: false,
    });
    for (let i = 0; i < data.length; i++) {
      const rcs1Comment = await Comment.find({
        submitresrcId: data[i].resource1,
        createdAt: {
          $lte: data[i].endDate,
          $gte: data[i].startDate,
        },
      });
      const sumOfRatingsrsc1 = rcs1Comment.reduce((total, comment) => {
        return total + comment.rating;
      }, 0);
      console.log(sumOfRatingsrsc1, "rcs1Comment");
      const rcs2Comment = await Comment.find({
        submitresrcId: data[i].resource2,
        createdAt: {
          $lte: data[i].startDate,
          $gte: data[i].endDate,
        },
      });
      const sumOfRatingsrsc2 = rcs2Comment.reduce((total, comment) => {
        return total + comment.rating;
      }, 0);

      console.log(sumOfRatingsrsc2, "rcs1Comment");
      if (sumOfRatingsrsc1 > sumOfRatingsrsc2) {
        data[i].winner = rcs1Comment[0].submitresrcId;
        data[i].isDeclare = true;
        await data[i].save();
      } else if (sumOfRatingsrsc1 < sumOfRatingsrsc2) {
        data[i].winner = rcs2Comment[0].submitresrcId;
        data[i].isDeclare = true;
        await data[i].save();
      } else {
        data[i].winner = null;
        data[i].isDeclare = true;
        await data[i].save();
      }
    }
    res.status(200).send("Winner Declare successfully");
  } catch (error) {
    res.status(400).send("error");
  }
};

exports.warRscsReviewAll = async (req, res) => {
  const war = await WarZone.find({ isHomePage: true });

  for (let i = 0; i < war.length; i++) {
    const rcs1Comment = await Comment.find({
      submitresrcId: war[i].resource1,
    });
    const sumOfRatingsrsc1 = rcs1Comment.reduce((total, comment) => {
      return total + comment.rating;
    }, 0);
    const rsc1AvReview = sumOfRatingsrsc1 / rcs1Comment.length;

    const rcs2Comment = await Comment.find({
      submitresrcId: war[i].resource2,
    });
    const sumOfRatingsrsc2 = rcs2Comment.reduce((total, comment) => {
      return total + comment.rating;
    }, 0);

    const rsc2AvReview = sumOfRatingsrsc2 / rcs2Comment.length;
  }

  res.status(200).json({
    status: true,
    msg: "war updated successfully.......",
    rsc1AvReview,
    rsc2AvReview,
    toalRsc1: rcs1Comment.length,
    toalRsc2: rcs2Comment.length,
    rsc1Comment: rcs1Comment,
    rsc2Comment: rcs2Comment,
  });
};

// get all war for admin

exports.getAdminWar = async (req, res) => {
  try {
    const data = await WarZone.find()
      .populate("resource1")
      .populate("resource2")
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
      });

    res.status(200).json({
      status: true,
      msg: "war detail listing successfully.......",
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
