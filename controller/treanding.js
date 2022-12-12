const Treanding = require("../models/treanding");
const resp = require("../helpers/apiResponse");

exports.addTrending  = async (req, res) => {
  const { submit_rsrcId} = req.body;

  const newTreanding = new Treanding({
    submit_rsrcId:submit_rsrcId,
   });
   
   newTreanding
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }



exports.getTrending = async (req, res) => {
    await Treanding.find().populate("submit_rsrcId")
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getoneTrending = async (req, res) => {
    await Treanding.findOne({ _id: req.params.id }).populate("submit_rsrcId")
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.editTrending = async (req, res) => {
    await Treanding.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.dltTrending = async (req, res) => {
    await Treanding.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  
  