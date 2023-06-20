const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    image: {
      type: String,
    },
    link: {
      type: String,
    },
    count: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("header", thisSchema);
