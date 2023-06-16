const mongoose = require("mongoose")
const Schema = mongoose.Schema


const thisSchema = new Schema({

    submitresrcId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "submitRsrc"
    },
    
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    status:{
        type:String,
        default:"Active"
    },
    // desc:{
    //     type:String
    // },
    comment:{
        type:String
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
      },
     
   
     
},
    { timestamps: true }
)

module.exports = mongoose.model("comment", thisSchema)
