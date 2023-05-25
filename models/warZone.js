const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const warSchema = new Schema(
  {
    resource1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "submitRsrc",
    },
    resource2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "submitRsrc",
    },
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "submitRsrc",
    },
    title: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Warzone", warSchema);
