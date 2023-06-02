const Comment = require("../models/comments");
const resp = require("../helpers/apiResponse");
const User = require("../models/user");
var _ = require("lodash");
const Submit = require("../models/submit_resrc");

// const cloudinary = require("cloudinary").v2;
// const fs = require("fs");
const Blogcomment = require("../models/blog_comnt");
const CurrntMonth = require("../models/currentMonth");

exports.add_Comment = async (req, res) => {
  const { submitresrcId, userid, comment, rating, status } = req.body;

  const newComment = new Comment({
    submitresrcId: submitresrcId,
    userid: userid,
    //  desc:desc,
    comment: comment,
    rating: rating,
    status: "Deactive",
  });

  const getuserid = await Submit.findOne({ _id: req.body.submitresrcId });
  const getuserdetail = getuserid.userid;
  const findexist = await Comment.findOne({
    $and: [
      { submitresrcId: req.body.submitresrcId },
      { userid: req.body.userid },
    ],
  });

  //const findsts = findexist.status
  //console.log("FIND",findsts)

  //console.log("STRING",getuserid)
  if (getuserdetail == userid) {
    // const getuserdetail = getuserid.userid
    // console.log("user",getuserdetail)
    // const alreadyexist = await Comment.findOne({userid:getuserdetail})
    res.status(201).json({
      status: false,
      msg: "not able to comment",
    });
  } else if (findexist?.status == "Active") {
    resp.alreadyr(res);
  } else if (findexist?.status == "Deactive") {
    res.status(200).json({
      status: true,
      msg: "waiting for admin approvel",
    });
  } else {
    newComment
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
};

exports.editCommentbyUser = async (req, res) => {
  await Comment.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body, status: "Deactive" },
    { new: true }
  )
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.comment_list = async (req, res) => {
  await Comment.find({
    $and: [{ submitresrcId: req.params.id }, { status: "Active" }],
  })
    .populate("userid")
    .populate("submitresrcId")
    .populate({
      path: "submitresrcId",
      populate: {
        path: "category",
      },
    })
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.admin_comment_list = async (req, res) => {
  await Comment.find({ status: "Deactive" })
    .populate("userid")
    .populate("submitresrcId")
    .populate({
      path: "submitresrcId",
      populate: {
        path: "category",
      },
    })
    //  .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getone_coment_list = async (req, res) => {
  await Comment.findOne({ _id: req.params.id })
    .populate("userid")
    .populate("submitresrcId")
    .populate({
      path: "submitresrcId",
      populate: {
        path: "category",
      },
    })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

//   exports.admin_edit_coment = async (req, res) => {
//     const {userid,rating,comment} = req.body
//    const upateone= await Comment.findOneAndUpdate(
//       {
//         _id: req.params.id,
//       },
//       { $set: {status:"Active"}},
//       { new: true }
//     ).populate("userid")
//     if(upateone){
//     console.log("STATUS",upateone)
//     const getcommt = upateone.comment
//     const getrting = upateone.rating
//     const getuser =upateone.userid
//     const findmeteros =getuser.meteors
//     const rating_metors =getuser.rating_meteros
//     const reviwmtors =getuser.review_meteros

//     console.log("FINDUSER",getuser)
//     console.log("findmeteros",findmeteros)
//     console.log("GETCOMMENT",getcommt)

//     console.log("GETRATING",getrting)
//     console.log("RATING METORS",rating_metors)
//     console.log("RATING METORS",reviwmtors)

//     if(upateone?.status == "Active"){
// if(getuser && getcommt && getrting){
//   var total =parseInt (findmeteros) + parseInt(7)
//   console.log("TOTAL",total)

//   var ratingmetors= parseInt (rating_metors) + parseInt(2)
//   console.log("RATING MTRS TOTAL",ratingmetors)

//   var rviewmetors= parseInt (reviwmtors) + parseInt(5)
//   console.log("REVIEW MTRS TOTAL",rviewmetors)
//     let updateuser =  await User.findOneAndUpdate(
//       {
//         _id:getuser ,
//       },
//       { $set: {meteors:total,review_meteros:rviewmetors,rating_meteros:ratingmetors,}},
//       { new: true }

//     )
//   //  .then((data) => resp.successr(res, data))
//   //   .catch((error) => resp.errorr(res, error));
//   if(updateuser){
//     console.log("updateuser",updateuser)

//   }
// }
//      else if(getuser && getcommt){
//         var total =parseInt (findmeteros) + parseInt(5)
//         console.log("TOTAL",total)

//         var rviewmetors= parseInt (reviwmtors) + parseInt(5)
//         console.log("REVIEW MTRS TOTAL",rviewmetors)

//           let updateuser =  await User.findOneAndUpdate(
//             {
//               _id:getuser ,
//             },
//             { $set: {meteors:total,review_meteros:rviewmetors}},
//             { new: true }

//           )
//          .then((data) => resp.successr(res, data))
//           .catch((error) => resp.errorr(res, error));
//       }
//      else if(getuser && getrting){
//         var total =parseInt (findmeteros) + parseInt(2)
//         console.log("TOTAL",total)

//         var ratingmetors= parseInt (rating_metors) + parseInt(2)
//         console.log("RATING MTRS TOTAL",ratingmetors)

//           let updateuser =  await User.findOneAndUpdate(
//             {
//               _id:getuser ,
//             },
//             { $set: {meteors:total,rating_meteros:ratingmetors}},
//             { new: true }

//           )
//          .then((data) => resp.successr(res, data))
//           .catch((error) => resp.errorr(res, error));
//       }
//     }
//   }
//       else{
//         res.status(400).json({
//           status:false,
//           error:"error"
//         })
//       }

//       // .then((data) => resp.successr(res, data))
//       // .catch((error) => resp.errorr(res, error));
//   };

exports.admin_edit_coment = async (req, res) => {
  const { userid, rating, comment } = req.body;
  const upateone = await Comment.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: { status: "Active" } },
    { new: true }
  ).populate("userid");
  console.log("update", upateone);
  if (upateone?.status == "Active") {
    const getrating = upateone.rating;
    console.log("RATING", getrating);
    const getreview = upateone.comment;
    console.log("REVIEW", getreview);
    if (getrating && getreview) {
      console.log("STRING");
      const getuserid = upateone.userid;
      const getsubmit = upateone.submitresrcId;
      console.log("GETUSER", getuserid);
      const findmeteros = getuserid.meteors;
      console.log("METEROS", findmeteros);

      var total = parseInt(findmeteros) + parseInt(7);

      const updateuser = await User.findOneAndUpdate(
        {
          _id: getuserid,
        },
        { $set: { meteors: total } },
        { new: true }
      );

      var date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      console.log("FIRST", firstDay);
      console.log("lAST", lastDay);
      const getdatail = await CurrntMonth.find({
        $and: [
          { userid: getuserid },
          {
            createdAt: {
              $gte: new Date(firstDay),
              $lte: new Date(lastDay),
            },
          },
        ],
      }).populate("userid");

      var newarr1 = getdatail.map(function (value) {
        // return value+= value;
        return value.meteors;
      });

      console.log("New Array", newarr1);
      let ttl = _.sumBy([...newarr1]);
      console.log("rTotal", ttl);
      console.log("getdatail", getdatail);
      const getmeteros = getdatail.meteors;

      let ttlmetrs = ttl + 7;
      const newCurrntMonth = new CurrntMonth({
        submitresrcId: getsubmit,
        userid: getuserid,
        //  desc:desc,
        comment: getreview,
        rating: getrating,
        status: "Active",
        meteors: 7,
        crrntMonth: ttlmetrs,
      });
      newCurrntMonth
        .save()

        .then((data) => resp.successr(res, data));
      const updateuserr = await User.findOneAndUpdate(
        {
          _id: getuserid,
        },
        { $set: { crrntMonth: ttlmetrs } },
        { new: true }
      )
        //console.log("ff",updateuserr)
        .catch((error) => resp.errorr(res, error));
    } else if (getrating) {
      console.log("RATING 2");
      const getuserid = upateone.userid;
      console.log("GETUSER", getuserid);
      const getsubmit = upateone.submitresrcId;
      const findmeteros = getuserid.meteors;
      console.log("METEROS", findmeteros);

      var total = parseInt(findmeteros) + parseInt(2);

      const updateuser = await User.findOneAndUpdate(
        {
          _id: getuserid,
        },
        { $set: { meteors: total } },
        { new: true }
      );

      var date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      console.log("FIRST", firstDay);
      console.log("lAST", lastDay);
      const getdatail = await CurrntMonth.find({
        $and: [
          { userid: getuserid },
          {
            createdAt: {
              $gte: new Date(firstDay),
              $lte: new Date(lastDay),
            },
          },
        ],
      }).populate("userid");
      console.log("GETDETAIL", getdatail);
      var newarr1 = getdatail.map(function (value) {
        // return value+= value;
        return value.meteors;
      });

      console.log("New Array", newarr1);
      let ttl = _.sumBy([...newarr1]);
      console.log("rTotal", ttl);
      console.log("getdatail", getdatail);
      const getmeteros = getdatail.meteors;

      let ttlmetrs = ttl + 2;

      const newCurrntMonth = new CurrntMonth({
        submitresrcId: getsubmit,
        userid: getuserid,
        //  desc:desc,
        comment: getreview,
        rating: getrating,
        status: "Active",
        meteors: 2,
        crrntMonth: ttlmetrs,
      });
      console.log("newCurrntMonth", newCurrntMonth);
      newCurrntMonth.save().then((data) => resp.successr(res, data));
      const updateuserr = await User.findOneAndUpdate(
        {
          _id: getuserid,
        },
        { $set: { crrntMonth: ttlmetrs } },
        { new: true }
      )
        //console.log("ff",updateuserr)
        .catch((error) => resp.errorr(res, error));
    } else if (getreview) {
      console.log("REVIEW 5");
      const getuserid = upateone.userid;
      console.log("GETUSER", getuserid);
      const findmeteros = getuserid.meteors;
      console.log("METEROS", findmeteros);

      var total = parseInt(findmeteros) + parseInt(5);

      const updateuser = await User.findOneAndUpdate(
        {
          _id: getuserid,
        },
        { $set: { meteors: total } },
        { new: true }
      );

      var date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      console.log("FIRST", firstDay);
      console.log("lAST", lastDay);
      const getdatail = await CurrntMonth.find({
        $and: [
          { userid: getuserid },
          {
            createdAt: {
              $gte: new Date(firstDay),
              $lte: new Date(lastDay),
            },
          },
        ],
      }).populate("userid");

      console.log("GETDETAIL", getdatail);
      var newarr1 = getdatail.map(function (value) {
        // return value+= value;
        return value.meteors;
      });

      console.log("New Array", newarr1);
      let ttl = _.sumBy([...newarr1]);
      console.log("rTotal", ttl);
      console.log("getdatail", getdatail);
      const getmeteros = getdatail.meteors;

      let ttlmetrs = ttl + 5;
      const newCurrntMonth = new CurrntMonth({
        // submitresrcId:getsubmit,
        userid: getuserid,
        //  desc:desc,
        comment: getreview,
        rating: getrating,
        status: "Active",
        meteors: 5,
        crrntMonth: ttlmetrs,
      });
      newCurrntMonth.save().then((data) => resp.successr(res, data));
      const updateuserr = await User.findOneAndUpdate(
        {
          _id: getuserid,
        },
        { $set: { crrntMonth: ttlmetrs } },
        { new: true }
      ).catch((error) => resp.errorr(res, error));
    }
  } else {
    res.status(400).json({
      status: false,
      error: "error",
    });
  }
  // const getdata = await Comment.findOne({userid :req.body.userid}).populate("userid")
  // console.log("getdata",getdata)

  //  console.log("GETDATA",getdatail)

  // .then((data) => resp.successr(res, data))
  //        .catch((error) => resp.errorr(res, error));
};

exports.dlt_Coment = async (req, res) => {
  await Comment.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.add_blog_Comment = async (req, res) => {
  const { blogid, userid, desc, comment, rating, status } = req.body;

  const newBlogcomment = new Blogcomment({
    blogid: blogid,
    userid: userid,
    desc: desc,
    comment: comment,
    rating: rating,
    status: status,
  });
  const findexist = await Blogcomment.findOne({
    $and: [{ blogid: blogid }, { userid: userid }],
  });
  if (findexist?.status == "Active") {
    resp.alreadyr(res);
  } else if (findexist?.status == "Deactive") {
    res.status(200).json({
      status: true,
      msg: "waiting for admin approvel",
    });
  } else {
    newBlogcomment
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
};

exports.userBlog_Cmntlist = async (req, res) => {
  await Blogcomment.find({ status: "Active" })
    .populate("userid")
    .populate("blogid")

    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.adminBlog_Cmntlist = async (req, res) => {
  await Blogcomment.find()
    .populate("userid")
    .populate("blogid")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getoneBlog_Cmntlist = async (req, res) => {
  await Blogcomment.findOne({ _id: req.params.id })
    .populate("userid")
    .populate("blogid")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.editBlog_Cmntlist = async (req, res) => {
  await Blogcomment.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.dltBlog_Cmntlist = async (req, res) => {
  await Blogcomment.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.filterByRating = async (req, res) => {
  await Comment.find({ rating: req.params.id })
    .sort({ createdAt: -1 })
    .populate("userid")
    .populate("submitresrcId")
    .populate({
      path: "submitresrcId",
      populate: {
        path: "category",
      },
    })

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
// {"razorpay_payment_id": {$ne: ''  }},{"razorpay_payment_id":{ $ne: undefined }

// ({$and: [

//   {$and:[{"type": "Paid"}]},{$or:[{status :"Active"},{aprv_status: "Active"}]}
//       ]})

exports.average_rating = async (req, res) => {
  //  const getrating= await Comment.find({ $and: [{ submitresrcId: req.params.id }, { status: "Active" }]})

  const getrating = await Comment.find({
    $and: [
      { $and: [{ submitresrcId: req.params.id }, { status: "Active" }] },
      { $or: [{ rating: { $ne: "" } }, { rating: { $ne: undefined } }] },
    ],
  });
  if (getrating) {
    var newarr1 = getrating.map(function (value) {
      // return value+= value;
      return value.rating;
    });

    // let total = newarr1/

    console.log("New Array", newarr1);
    console.log(newarr1.length); // undefined
    var ttlr = newarr1.length;
    console.log("tt", ttlr);
    let ratingttl = _.sumBy([...newarr1]);
    console.log("rTotal", ratingttl);
    let average = (ratingttl / ttlr).toFixed(1);
    //ava_rating
    const getone = await Submit.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: { ava_rating: average } },
      { new: true }
    );
    //const getone = await Submit.findOne({_id:req.params.id})
    console.log("GETONE", getone);
    console.log("Avrage", average);
    if (getone) {
      res.status(200).json({
        status: "true",
        msg: "success",
        data: average,
        datas: getone,
        // avarageRating:getone.average
      });
    }
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

// for (let i = 0; i <= getr.length; i++) {
//   if (getr[i].rating == undefined) {
//   } else {
//     sum += getr[i].rating;
//     totalRating.push(getr[i].rating);
//   }
// }
// console.log("result",totalRating)

// let sumprofit1 = _.sumBy([...newarr1]);
// console.log("PROFIT11",sumprofit1)

exports.crntMonth = async (req, res) => {
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  console.log("FIRST", firstDay);
  console.log("lAST", lastDay);
  const getdatail = await CurrntMonth.find({
    $or: [
      { _id: req.params.id },
      {
        createdAt: {
          $gte: new Date(firstDay),
          $lte: new Date(lastDay),
        },
      },
    ],
  }).populate("userid");

  res.status(200).json({
    status: true,
    msg: "success",
    data: getdatail,
  });
};
