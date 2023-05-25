const WarZone = require("../models/warZone");

// add war
exports.addWar = async (req, res) => {
  try {
    const war = await WarZone.create(req.body);
    res.status(200).json({
      status: true,
      msg: "War Created Successfully...",
      war: war,
    });
  } catch (error) {
    console.log(error);
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
