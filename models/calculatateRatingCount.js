const mongoose = require("mongoose")
const Schema = mongoose.Schema


const calculateRating = new Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    comment: {
        type: Number,
    },
    rating: {
        type: Number,
    },
},
    { timestamps: true }
)
module.exports = mongoose.model("calculateRating", calculateRating)
