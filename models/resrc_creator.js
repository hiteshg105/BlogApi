const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
  {
    creatorName: {
      type: String,
    },
    link: {
      type: Array,
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    phoneNo: {
      type: String,
    },
    email: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    sub_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subcategory",
    },
    format: {
      type: String,
    },
    level: {
      type: String,
    },
    language: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "language",
      },
    ],
    topics: {
      type: String,
    },
    desc: {
      type: String,
    },
    img: {
      type: String,
    },
    status: {
      type: String,
      default: "Deactive",
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("rsrcCreator", thisSchema);
