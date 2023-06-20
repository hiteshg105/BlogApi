const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
  {
    
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    link: {
      type: Array,
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

    desc: {
      type: String,
    },
    img: {
      type: String,
    },
    creatorName: {
      type: String,
    },
    phoneNo: {
      type: String,
    },
    email: {
      type: String,
    },
    status: {
      type: String,
      default: "Active",
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("rsrcCreator", thisSchema);
