const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
  {
    title: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category"
    },
    desc: {
      type: String,
    },
    Subcat_img: {
      type: Array
    },
    conent_count: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model("subcategory", thisSchema);
