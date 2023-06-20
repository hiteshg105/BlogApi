const { uploadFile } = require("../helpers/awsuploader");
const Header = require("../models/headerModel");

exports.addHeader = async (req, res) => {
  try {
    const find = await Header.findOne({ count: req.body.count });
    if (find) {
      res.status(200).json({
        success: false,
        msg: "slider already Exist",
        data: data,
      });
    } else {
      let data = await Header.create(req.body);
      // console.log(req.file)
      if (req.file) {
        const geturl = await uploadFile(
          req.file.path,
          req.file.filename,
          req.file.mimetype
        );
        data.image = geturl.Location;
        await data.save();
      }
      // console.log(data)
      res.status(200).json({
        success: true,
        msg: "header create successfully",
        data: data,
      });
    }
  } catch (error) {
    // console.log(error)
    res.status(400).json({
      success: false,
      msg: "something went wrong",
    });
  }
};

exports.allHeader = async (req, res) => {
  try {
    let data = await Header.find({}).sort({ count: 1 });
    res.status(200).json({
      success: true,
      msg: "header listing successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: "something went wrong",
    });
  }
};

exports.deleteHeader = async (req, res) => {
  try {
    await Header.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      msg: "Header delete successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: "something went wrong",
    });
  }
};

exports.getSingleHeader = async (req, res) => {
  try {
    const data = await Header.findById(req.params.id);
    res.status(200).json({
      success: true,
      msg: "header listing successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: "something went wrong",
    });
  }
};

exports.updateHeader = async (req, res) => {
  try {
    let data = await Header.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      userFindAndModify: false,
    });
    // console.log(data);
    if (req.file) {
      data.image = req.file.path;
      await data.save();
    }
    res.status(200).json({
      success: true,
      msg: "header updated successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      msg: "something went wrong",
    });
  }
};
