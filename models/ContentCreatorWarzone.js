const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const warContentCreatorSchema = new Schema(
  {
    resource1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rsrcCreator",
    },
    resource2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rsrcCreator",
    },
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rsrcCreator",
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

module.exports = mongoose.model("CreatorWarzone", warContentCreatorSchema);
