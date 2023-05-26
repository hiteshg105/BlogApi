const WarZone = require("../models/warzonemodel");
const Comment = require("../models/comments");
var cron = require("node-cron");

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
    console.log(error,"add warzone error");
    res.status(400).json({
      status: false,
      msg: "Something Went wrong",
    });
  }
};

// get war
exports.warZone_list = async (req, res) => {
  try {
    let data = WarZone.find()
      .populate("resource1")
      .populate("resource2")
      .sort({ createdAt: -1 });
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * pageSize;
    const total = await WarZone.countDocuments();
    const totalPages = Math.ceil(total / pageSize);
    data = data.skip(skip).limit(pageSize);

    if (page > totalPages) {
      return res.status(201).json({
        success: false,
        massage: "No data found",
      });
    }
    const result = await data;
    res.status(200).send({
      success: true,
      message: "warzone listing successfully....",
      count: result.length,
      page,
      totalPages,
      data: result,
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
      .sort({ createdAt: -1 });
    res.status(200).json({
      status: true,
      msg: "all war listing successfully.......",
      war: data,
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
      .populate("resource2");
    res.status(200).json({
      status: true,
      msg: "war detail listing successfully.......",
      war: data,
    });
  } catch (error) {
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

// get winner
cron.schedule("0 0 * * *", async () => {
  const date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  const data = await WarZone.find({
    endDate: date,
  });
  for (let i = 0; i < data.length; i++) {
    const rcs1Comment = await Comment.find({
      submitresrcId: data[i].resource1,
      createdAt: {
        $lte: data[i].endDate,
        $gte: data[i].startDate,
      },
    });
    // console.log(rcs1Comment, "rcs1Comment");
    const sumOfRatingsrsc1 = rcs1Comment.reduce((total, comment) => {
      return total + comment.rating;
    }, 0);
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

    if (sumOfRatingsrsc1 > sumOfRatingsrsc2) {
      data[i].winner = rcs1Comment[0].submitresrcId;
      await data[i].save();
    } else {
      data[i].winner = rcs2Comment[0].submitresrcId;
      await data[i].save();
    }
    // console.log(sumOfRatingsrsc1, "sumOfRatingsrsc1");
    // console.log(sumOfRatingsrsc2, "sumOfRatingsrsc2");
  }
});
