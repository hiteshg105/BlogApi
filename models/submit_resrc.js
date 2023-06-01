const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    link: {
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
    type: {
      type: String,
      //free , paid
    },
    format: {
      type: String,
    },
    language: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "language",
      },
    ],
    topics: [
      {
        type: String,
      },
    ],
    desc: {
      type: String,
    },

    img: {
      type: String,
    },
    resTitle: {
      type: String,
    },
    creatorName: {
      type: String,
    },
    relYear: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "year",
      },
    ],
    res_desc: {
      type: String,
    },
    comment: {
      type: String,
    },
    aprv_status: {
      type: String,
      default: "Deactive",
    },
    usertype: {
      type: String,
    },
    status: {
      type: String,
      default: "Deactive",
    },
    meteors: {
      type: Number,
      default: 0,
    },
    ava_rating: {
      type: Number,
      default: 0,
    },
    trendingPoint: {
      type: Number,
      default: 0,
    },
    youViews: {
      type: Number,
    },
    youSub: {
      type: Number,
    },
    youlike: {
      type: Number,
    },
    youDislike: {
      type: Number,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("submitRsrc", thisSchema);
