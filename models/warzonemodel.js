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
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    title: {
      type: String,
    },
    isHomePage: {
      type: Boolean,
      default: false,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    isDeclare: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("warzone", warSchema);
