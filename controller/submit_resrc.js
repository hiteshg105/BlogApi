const Submit = require("../models/submit_resrc");
const User = require("../models/user");
const Category = require("../models/category");
const { Query } = require("mongo-filter-query");
var MongoQS = require('mongo-querystring');
const resp = require("../helpers/apiResponse");
const SubCategory = require("../models/subcategory");
const CurrntMonth = require("../models/currentMonth");

const cloudinary = require("cloudinary").v2;
const fs = require("fs");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//uploadFile
const { imageUpload } = require("../helpers/awsuploader");

const { uploadBase64ImageFile } = require("../helpers/awsuploader");
const { Console } = require("console");


var signatures = {
  JVBERi0: "application.pdf",
  R0lGODdh: "image.gif",
  R0lGODlh: "image.gif",
  iVBORw0KGgo: "image.png",
  "/9j/": "image.jpg"
};

function detectMimeType(b64) {
  for (var s in signatures) {
    if (b64.indexOf(s) === 0) {
      return signatures[s];
    }
  }
}


exports.addSub_resrc = async (req, res) => {
  const { userid, link, category, sub_category, type, format, topics, desc, resTitle, creatorName, relYear, res_desc, comment, img, language } = req.body;

  const newSubmit = new Submit({
    userid: userid,
    link: link,
    category: category,
    sub_category: sub_category,
    type: type,
    format: format,
    language: language,
    topics: topics,
    desc: desc,
    resTitle: resTitle,
    creatorName: creatorName,
    relYear: relYear,
    res_desc: res_desc,
    comment: comment,
    img: img,
    usertype: "user"
  });
  if (req.file) {
    const resp = await cloudinary.uploader.upload(req.file.path);
    // if (resp) {
    newSubmit.img = resp.secure_url;
    fs.unlinkSync(req.file.path);
  }


  // if (img) {
  //   if (img) {


  //     const base64Data = new Buffer.from(img.replace(/^data:image\/\w+;base64,/, ""), 'base64');
  //     detectMimeType(base64Data);
  //     const type = detectMimeType(img);
  //     // console.log(newCourse,"@@@@@");
  //     const geturl = await uploadBase64ImageFile(
  //       base64Data,
  //       newSubmit.id,
  //      type
  //     );
  //     console.log(geturl,"&&&&");
  //     if (geturl) {
  //       newSubmit.img = geturl.Location;

  //       //fs.unlinkSync(`../uploads/${req.files.img[0]?.filename}`);
  //     }
  //   }




  newSubmit
    .save()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
}



exports.App_Sub_resrc = async (req, res) => {
  const { userid, link, category, sub_category, type, format, topics, desc, resTitle, creatorName, relYear, res_desc, comment, language, img } = req.body;

  //  const coursedetail = await Submit.findOne({ topics:topics });
  // if (coursedetail) {
  //console.log(coursedetail.popularity)
  // let increment = coursedetail.trendingPoint + 1;
  //   await Submit.findOneAndUpdate(
  //     {
  //       userid: req.body.id,
  //     },
  //     { $set: { trendingPoint: increment } },
  //     { new: true }
  //   )
  // }


  const newSubmit = new Submit({
    userid: userid,
    link: link,
    category: category,
    sub_category: sub_category,
    type: type,
    format: format,
    topics: topics,
    desc: desc,
    resTitle: resTitle,
    creatorName: creatorName,
    relYear: relYear,
    res_desc: res_desc,
    comment: comment,
    language: language,
    img: img,
    usertype: "user",
    //  trendingPoint:increment
  });
  // if (req.files) {
  //   if (req.files.img) {
  //     alluploads = [];
  //     for (let i = 0; i < req.files.img.length; i++) {
  //       const resp = await cloudinary.uploader.upload(
  //         req.files.img[i].path,
  //         { use_filename: true, unique_filename: false }
  //       );
  //       fs.unlinkSync(req.files.img[i].path);
  //       alluploads.push(resp.secure_url);
  //     }
  //     newSubmit.img = alluploads;
  //   }
  // }

  //##############
  if (img) {
    if (img) {


      const base64Data = new Buffer.from(img.replace(/^data:image\/\w+;base64,/, ""), 'base64');
      detectMimeType(base64Data);
      const type = detectMimeType(img);
      // console.log(newCourse,"@@@@@");
      const geturl = await uploadBase64ImageFile(
        base64Data,
        newSubmit.id,
        type
      );
      console.log(geturl, "&&&&");
      if (geturl) {
        newSubmit.img = geturl.Location;

        //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
      }
    }

    //$$$$$$$$$$$
    // if (req.files) {
    //   if (req.files.img) {
    //     alluploads = [];
    //     for (let i = 0; i < req.files.img.length; i++) {
    //       const resp = await cloudinary.uploader.upload(
    //         req.files.img[i].path,
    //         { use_filename: true, unique_filename: false }
    //       );
    //       fs.unlinkSync(req.files.img[i].path);
    //       alluploads.push(resp.secure_url);
    //     }
    //     newSubmit.img = alluploads;
    //   }
    // }
    // if (req.files) {
    //   if (req.files.img) {
    //     alluploads = [];
    //     for (let i = 0; i < req.files.img.length; i++) {
    //       const resp = await cloudinary.uploader.upload(
    //         req.files.img[i].path,
    //         { use_filename: true, unique_filename: false }
    //       );
    //       fs.unlinkSync(req.files.img[i].path);
    //       alluploads.push(resp.secure_url);
    //     }
    //     newSubmit.img = alluploads;
    //   }
    // }



    // if (req.file) {
    //   const resp = await cloudinary.uploader.upload(req.file.path);
    //   // if (resp) {
    //     newSubmit.img = resp.secure_url;
    //   fs.unlinkSync(req.file.path);
    // }
    newSubmit
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
}

exports.admin_Sub_resrc = async (req, res) => {
  const { link, category, sub_category, type, format, language, topics, desc, resTitle, creatorName, relYear, res_desc, comment, img } = req.body;

  const newSubmit = new Submit({

    link: link,
    category: category,
    sub_category: sub_category,
    type: type,
    format: format,
    language: language,
    topics: topics,
    desc: desc,
    resTitle: resTitle,
    creatorName: creatorName,
    relYear: relYear,
    res_desc: res_desc,
    comment: comment,
    img: img,
    usertype: "admin"
  });
  if (req.file) {
    const resp = await cloudinary.uploader.upload(req.file.path);
    // if (resp) {
    newSubmit.img = resp.secure_url;
    fs.unlinkSync(req.file.path);
  }
  newSubmit
    .save()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
}



exports.user_sub_res_lsit = async (req, res) => {
  await Submit.find({ usertype: "user" }).populate("category").populate("language")
    .sort({ createdAt: -1 })

    .populate("category").populate("sub_category").populate("relYear").populate("userid")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};



exports.active_resrc_lsit = async (req, res) => {
  await Submit.find({ $and: [{ usertype: "user" }, { aprv_status: "Active" }] }).populate("category").populate("language")
    .sort({ createdAt: -1 })

    .populate("category").populate("sub_category").populate("relYear").populate("userid")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.admin_sub_res_lsit = async (req, res) => {
  await Submit.find({ usertype: "admin" }).populate("category")
    .sort({ createdAt: -1 })

    .populate("category").populate("sub_category").populate("relYear").populate("userid").populate("language")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.Promotions = async (req, res) => {
  await Submit.find({ $and: [{ usertype: "admin" }, { status: "Active" }] }).populate("category")
    .sort({ createdAt: -1 })

    .populate("category").populate("sub_category").populate("relYear").populate("userid").populate("language")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};



exports.getone_reslist = async (req, res) => {
  await Submit.findOne({ _id: req.params.id }).populate("category").populate("sub_category").populate("relYear").populate("userid").populate("language")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};



exports.edit_submit_rsrc = async (req, res) => {
  // const { link, category, sub_category, type, format, language, topics, desc, resTitle, creatorName, relYear, res_desc, comment } = req.body
  // data = {};
  // if (link) {
  //   data.link = link;
  // }
  // if (category) {
  //   data.category = category
  // } if (sub_category) {
  //   data.sub_category = sub_category
  // } if (type) {
  //   data.type = type
  // } if (format) {
  //   data.format = format
  // } if (language) {
  //   data.language = language
  // } if (topics) {
  //   data.topics = topics
  // } if (desc) {
  //   data.desc = desc
  // } if (resTitle) {
  //   data.resTitle = resTitle
  // } if (creatorName) {
  //   data.creatorName = creatorName
  // } if (relYear) {
  //   data.relYear = relYear
  // } if (res_desc) {
  //   data.res_desc = res_desc
  // } if (comment) {
  //   data.comment = comment
  // }

  // if (req.files) {
  //   if (req.files.img) {
  //     alluploads = [];
  //     for (let i = 0; i < req.files.img.length; i++) {
  //       // console.log(i);
  //       const resp = await cloudinary.uploader.upload(req.files.img[i].path, {
  //         use_filename: true,
  //         unique_filename: false,
  //       });
  //       fs.unlinkSync(req.files.img[i].path);
  //       alluploads.push(resp.secure_url);
  //     }
  //     // newStore.storeImg = alluploads;
  //     data.img = alluploads;
  //   }
  // }

  await Submit.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.dlt_subres_list = async (req, res) => {
  await Submit.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};





exports.listbycategory = async (req, res) => {
  const getone = await SubCategory.find({ category: req.params.id }).populate("category")
    .sort({ sortorder: 1 })
  console.log("getone", getone)

  if (getone) {
    //  var sublength = getone.length
    //  console.log("subcategoryLength",sublength)
    const finddata = await Category.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: { subCount: getone.length } },
      { new: true }

    )
    console.log("finddata", finddata)
    res.status(200).json({
      status: true,
      message: "success",
      count: getone.length,
      data: getone,
    })
  } else {
    res.status(400).json({
      status: false,
      message: "error",
      error: error,
    })
  }
  // .then((data) => resp.successr(res, data))
  // .catch((error) => resp.errorr(res, error));
};

exports.listbysubcategory = async (req, res) => {
  const getone = await Submit.find({ $and: [{ sub_category: req.params.id }, { aprv_status: "Active" }] }).populate("category").populate("sub_category").populate("relYear")
    .sort({ sortorder: 1 }).populate("language")

  if (getone) {

    const finddata = await SubCategory.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: { conent_count: getone.length } },
      { new: true }

    )
    console.log("finddata", finddata)
    res.status(200).json({
      status: true,
      message: "success",
      count: getone.length,
      data: getone,
    })
  } else {
    res.status(400).json({
      status: false,
      message: "error",
      error: error,
    })
  }


  // .then((data) => resp.successr(res, data))
  // .catch((error) => resp.errorr(res, error));
}



exports.total_sub_resrc = async (req, res) => {
  await Submit.countDocuments({ usertype: "user" }).populate("category")

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.total_paid_resrc = async (req, res) => {
  await Submit.countDocuments({ $and: [{ usertype: "user" }, { type: "Paid" }] }).populate("category")

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.total_free_resrc = async (req, res) => {
  await Submit.countDocuments({ $and: [{ usertype: "user" }, { type: "Free" }] }).populate("category")

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


//and: [{ status: "Active" }, { _id: req.params.id }]


exports.my_content_meteros = async (req, res) => {
  const getmeteros = await User.findOne({ _id: req.params.id })

  if (getmeteros) {
    res.status(200).json({
      status: true,
      msg: "success",
      meteors: getmeteros.meteors,
      rating_meteros: getmeteros.rating_meteros,
      review_meteros: getmeteros.review_meteros


    })
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
}

({ $and: [{ usertype: "user" }, { aprv_status: "Active" }] })

exports.filterbypaid_subresrc = async (req, res) => {
  const findall = await Submit.find({
    $and: [

      { $and: [{ "type": "Paid" }] }, { $or: [{ status: "Active" }, { aprv_status: "Active" }] }
    ]
  }).populate("category").populate("sub_category").populate("relYear").populate("language")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.filter_type = async (req, res) => {
  const findall = await Submit.find({
    $and: [

      { $and: [{ sub_category: req.params.sub_category }, { type: req.params.id }] }, { $and: [{ aprv_status: "Active" }] }
    ]
  }).populate("category").populate("sub_category").populate("relYear").populate("language")

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};



exports.filterbyFormat = async (req, res) => {
  const findall = await Submit.find({
    $and: [

      { $and: [{ sub_category: req.params.sub_category }, { format: req.params.id }] }, { $and: [{ aprv_status: "Active" }] }
    ]
  }).populate("category").populate("sub_category").populate("relYear").populate("language")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

// NO USE
exports.filterbytext = async (req, res) => {
  const findall = await Submit.find({
    $and: [

      { $and: [{ sub_category: req.params.sub_category }, { "format": "Text" }] }, { $and: [{ aprv_status: "Active" }] }
    ]
  }).populate("category").populate("sub_category").populate("relYear").populate("language")

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.searchinputproduct = async (req, res) => {
  const { oneinput } = req.body;
  await Product.find({ product_name: { $regex: oneinput, $options: "i" } })
    .then((data) => {
      res.status(200).json({
        status: true,
        data: data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: false,
        msg: "error",
        error: error,
      });
    });
};

exports.search_topic_title = async (req, res) => {
  const { searchinput } = req.body
  await Submit.find({
    $or: [{ resTitle: { $regex: searchinput, $options: "i" } },
    { topics: { $regex: searchinput, $options: "i" } }
    ]
  }).populate("language").populate("relYear")
    .then((data) => {
      res.status(200).json({
        status: true,
        data: data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: false,
        msg: "error",
        error: error,
      });
    });
}

exports.filterbyyear = async (req, res) => {


  const findall = await Submit.find({
    $and: [

      { $and: [{ sub_category: req.params.sub_category }, { relYear: req.params.id }] }, { $and: [{ aprv_status: "Active" }] }
    ]
  }).populate("category").populate("sub_category").populate("relYear").populate("language")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.filterbyLanguage = async (req, res) => {


  const findall = await Submit.find({
    $and: [

      { $and: [{ sub_category: req.params.sub_category }, { language: req.params.id }] }, { $and: [{ aprv_status: "Active" }] }
    ]
  }).populate("category").populate("sub_category").populate("relYear").populate("language")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};




exports.treding_topics = async (req, res) => {

  const getrating = await Submit.find({ status: "Active" })
  console.log("GETRATING", getrating)


  //   const getratingg = await Submit.find({status: "Active"}).distinct("topics") 
  //   console.log("GETRATING",getratingg)

  if (getrating) {
    var newarr1 = getrating.map(function (value) {
      // return value+= value;
      return value.topics
    });

    //    let uniq = [...new Set(getrating)]

    console.log("UNIQUE", newarr1)
  }
  //    const uniqueMembers = [...newarr1];
  //    console.log("sss",uniqueMembers);
  //    // let total = newarr1/

  //    console.log("New Array",newarr1)
  //   // let gettr = newarr1.#java
  //    console.log(newarr1.length); // undefined
  //     var ttlr = newarr1.length
  //     console.log("tt",ttlr)
  //   }


  // let  a = [newarr1]
  // let b = uniqBy(a, JSON.stringify)
  //   console.log("B",b) 


  const getratingg = await Submit.find({ status: "Active" }).distinct("topics")
  console.log("GETRATING", getratingg)

  if (getratingg) {
    var newarr1 = getratingg.map(function (value) {
      // return value+= value;
      return value.topics
    });
  }

  let uniq = [...new Set(getratingg)]

  console.log("UNIQUE", uniq)


}

exports.filterbyHashTag = async (req, res) => {


  await Submit.find({
    // $and: [{ topics: req.params.id }, { $and: [{ aprv_status: "Active" }] }
    // ]
    $and: [

      { $and: [{ sub_category: req.params.sub_category }, { topics: req.params.id }] }, { $and: [{ aprv_status: "Active" }] }
    ]
  }
  )
  .populate("category").populate("sub_category").populate("relYear").populate("language")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};



exports.approve_submit_resrc = async (req, res) => {


  const upateone =  await Submit.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: {aprv_status:req.body.aprv_status,status:req.body.status} },
      { new: true }
    )

    if(upateone.aprv_status == "Active"){
    //   const getpoint = upateone.meteors
    //   console.log("getpoint",getpoint)

    //  const totalmetors = parseInt(getpoint)+ parseInt(10)
    const getdata = await Submit.findOne({_id :req.params.id}).populate("userid")
    console.log("STRING",getdata)
    const getuser = (getdata.userid)
    console.log("getuser",getuser)
    const findmeteros =getuser.meteors 
    console.log("METEROS",findmeteros)

    const smetors =getdata.meteors
    console.log("submit Metores",smetors)

    var total =parseInt (findmeteros) + parseInt(10)

    const updateuser =  await User.findOneAndUpdate(
      {
        _id:getuser ,
      },
      { $set: {meteors:total} },
      { new: true }

    )

   // const getdatail = await Submit.findOne({_id :req.params.id}).populate("userid")



    var date = new Date();
var firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
console.log("FIRST",firstDay)
console.log("lAST",lastDay)
const getdatail = await Submit.findOne({ $and: [
  {_id :req.params.id },
  {
    createdAt: {
      $gte: new Date(firstDay),
      $lte: new Date(lastDay)
    }
  }
]
}).populate("userid")

console.log("GETDATA",getdatail)


const getUsers = getdatail.userid
console.log("USER",getUsers)
const getmetors = getdatail.meteors
console.log("GET METORES",getmetors)
var sttl = parseInt (getmetors) + parseInt(10)


    const updatecontent =  await Submit.findOneAndUpdate(
      {
        userid:getUsers ,
      },
      { $set: {meteors:sttl} },
      { new: true }

    )

    console.log("AAAA",updatecontent)
 // const getmet  = updateuser.meteors
  console.log("SSSS",updateuser)
    res.status(200).json({
      status: true,
      status: "success",
      data: upateone,
      meteors:updateuser.meteors,
      metorss:updatecontent.meteors,
      dataSS: updatecontent,
    });

    const newCurrntMonth = new CurrntMonth({
      userid: getUsers,
      link: getdatail.link,
      category: getdatail.category,
      sub_category: getdatail.sub_category,
      type: getdatail.type,
      format: getdatail.format,
      language: getdatail.language,
      topics: getdatail.topics,
      desc: getdatail.desc,
      resTitle: getdatail.resTitle,
      creatorName: getdatail.creatorName,
      relYear: getdatail.relYear,
      res_desc: getdatail.res_desc,
      
      img: getdatail.img,
      usertype: "user",
      meteors:10
    })
    newCurrntMonth.save()


    }
    // if (upateone) {
    //   res.status(200).json({
    //     status: true,
    //     msg: "success",
    //     data: upateone,
    //   });
     else {
      res.status(200).json({
        status: true,
        status: "success",
        data: upateone,
        datas:updatecontent
      });
    }
    // .then((data) => resp.successr(res, data))
    // .catch((error) => resp.errorr(res, error))
  };




const Planet = require("../models/planet_position.js");

// exports.approve_submit_resrc = async (req, res) => {
//   //const upateone =
//    await Submit.findOneAndUpdate(
//     {
//       _id: req.params.id,
//     },
//     { $set: { aprv_status: req.body.aprv_status, status: req.body.status } },
//     { new: true }
//   )
//   .populate("userid")
//   .then((data) => resp.successr(res, data))
//   .catch((error) => resp.errorr(res, error));

// //   const getsubmitmtrs = upateone.meteors
// //   console.log("SUBMIT METORES", getsubmitmtrs)
// //   const uderdet = upateone.userid
// //   console.log("USER", uderdet)
// //   const getonemetrs = uderdet.meteors
// //   console.log("GET ONE METROES", getonemetrs)

// //   if (upateone.aprv_status == "Active") {
// //     var date = new Date();
// //     var firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
// //     var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
// //     console.log("FIRST", firstDay)
// //     console.log("lAST", lastDay)
// //     const findexist = await Submit.findOne({
// //       $and: [
// //         { userid: uderdet },
// //         {
// //           createdAt: {
// //             $gte: new Date(firstDay),
// //             $lte: new Date(lastDay)
// //           }
// //         }
// //       ]
// //     })
// //     if (findexist) {
// //       const existuser = findexist.userid
// //       console.log("USER", existuser)
// //       const existmetores = findexist.meteors
// //       console.log("GETMETORES", existmetores)
// //       const sttl = parseInt(existmetores) + parseInt(10)
// //       //  console.log("GET METORES",sttl)
// //       console.log("STTL", sttl)

// //       const updatecontent = await Submit.findOneAndUpdate(
// //         {
// //           userid: existuser,
// //         },
// //         { $set: { meteors: sttl } },
// //         { new: true }

// //       )

// //       var total = parseInt(getonemetrs) + parseInt(10)
// //       console.log("TOTAL", total)

// //       const updateuser = await User.findOneAndUpdate(
// //         {
// //           _id: existuser,
// //         },
// //         { $set: { meteors: total } },
// //         { new: true }

// //       )
// //       console.log("UPDATEW", updatecontent)
// //       console.log("UPDATTTTTTTTTEEEEE", updateuser)
// //       res.status(200).json({
// //         status: true,
// //         status: "success",
// //         data: updatecontent,
// //         // meteors:updatecontent.meteors,
// //         update: updateuser.meteors,
// //         // updatemetores:updateuser.meteors

// //       });
// //     }
// //     else {
// //       console.log("ELSE")

// //       var total = parseInt(getsubmitmtrs) + parseInt(10)

// //       const updateuser = await Submit.findOneAndUpdate(
// //         {
// //           _id: req.params.id,
// //         },
// //         { $set: { meteors: total } },
// //         { new: true }
// //       )
// //       //  var total =parseInt (findmetors) + parseInt(10)
// //       const usermtrs = getonemetrs + parseInt(10)
// //       const updatmetores = await User.findOneAndUpdate(
// //         {
// //           _id: uderdet,
// //         },
// //         { $set: { meteors: usermtrs } },
// //         { new: true }

// //       )
// //       console.log("UPpppp", updateuser)
// //       console.log("UDDDD USER", updatmetores)
// //       res.status(200).json({
// //         status: true,
// //         status: "success",
// //         data: updateuser,
// //         meteors: updatmetores.meteors,


// //       });
// //     }
// //   }
// //   const getcredited = await Submit.findOne({_id: req.params.id}).populate("userid")
// //   var getuserid = getcredited.userid
// //   var getmetores = getuserid.meteors
// //   console.log("USER",getuserid)
// //   var amt =getuserid.creaditedAmt
// //   console.log("AMT",amt)
  
// //   var getplanet =  await Planet.find()
// //   let string = getplanet.point_range
// //   var get1stplanet = await Planet.findOne({_id:"638b3fe9670f7c03afc178e1"})
// //   console.log("1ST PLANET",get1stplanet)
// //   var str1 =get1stplanet.point_range
// //   console.log("p1st point",str1)
// //   var rupees1 = get1stplanet.doller_rupees
// //   console.log("RANGE1",rupees1)
// //   const beforevalue1 = str1.split(/-(.*)/)[0]
// //   console.log("BEFORE VALUE 1",beforevalue1)
// //   const aftervalue1 = str1.split(/-(.*)/)[1]

// //   console.log("AFTER VALUE 1",aftervalue1)

// //   //2nd planet 
// //   var get2stplanet = await Planet.findOne({_id:"638b4027670f7c03afc178e5"})
// //   var str2 =get2stplanet.point_range
// //   console.log("p1st point",str2)
// //   var rupees2 = get2stplanet.doller_rupees
// //   console.log("RANGE2",rupees2)

// //   const beforevalue2 = str2.split(/-(.*)/)[0]
// //   const aftervalue2 = str2.split(/-(.*)/)[1]
// //  // var string = "sometext-20202";
// // //console.log( "AFTER",get2stplanet)

// // //console.log(planet1st);

// // // 3rd planet
// //  var get3stplanet = await Planet.findOne({_id:"638b405a670f7c03afc178e7"})
// // var str3 =get3stplanet.point_range
// // console.log("p3st point",str3)
// // var rupees3 = get3stplanet.doller_rupees
// // console.log("RANGE2",rupees3)

// // const beforevalue3 = str3.split(/-(.*)/)[0]
// // console.log("3RD",beforevalue3)
// // const aftervalue3 = str3.split(/-(.*)/)[1]
// // console.log("3RD",aftervalue3)

// // // 4th planet
// // var get4stplanet = await Planet.findOne({_id:"638b407f670f7c03afc178e9"})
// // var str4 =get4stplanet.point_range
// // console.log("p4st point",str4)
// // var rupees4 = get4stplanet.doller_rupees
// // console.log("RANGE4",rupees4)

// // const beforevalue4 = str4.split(/-(.*)/)[0]
// // console.log("4RD",beforevalue4)
// // const aftervalue4 = str4.split(/-(.*)/)[1]
// // console.log("4RD",aftervalue4)

// // // 5TH PLANET
// // var get5stplanet = await Planet.findOne({_id:"638b40b5670f7c03afc178eb"})
// // var str5 =get5stplanet.point_range
// // console.log("p5st point",str5)
// // var rupees5 = get5stplanet.doller_rupees
// // console.log("RANGE5",rupees5)

// // const beforevalue5 = str5.split(/-(.*)/)[0]
// // console.log("5RD",beforevalue5)
// // const aftervalue5 = str5.split(/-(.*)/)[1]
// // console.log("5RD",aftervalue5)

// // //6th planet 
// // var get6stplanet = await Planet.findOne({_id:"638b40d9670f7c03afc178ed"})
// // var str6 =get6stplanet.point_range
// // console.log("6st point",str6)
// // var rupees6 = get6stplanet.doller_rupees
// // console.log("RANGE6",rupees6)

// // const beforevalue6 = str6.split(/-(.*)/)[0]
// // console.log("6RD",beforevalue6)
// // const aftervalue6 = str6.split(/-(.*)/)[1]
// // console.log("6RD",aftervalue6)

// //   //console.log("METEORS",getmetores)
// //   // 7th planet
// //   var get7stplanet = await Planet.findOne({_id:"638b40f5670f7c03afc178ef"})
// //   var str7 =get7stplanet.point_range
// //   console.log("7st point",str7)
// //   var rupees7 = get7stplanet.doller_rupees
// //   console.log("RANGE6",rupees7)
  
// //   const beforevalue7 = str7.split(/-(.*)/)[0]
// //   console.log("7RD",beforevalue7)
// //   const aftervalue7 = str7.split(/-(.*)/)[1]
// //   console.log("7RD",aftervalue7)

// //   // 8th planet
// //   var get8stplanet = await Planet.findOne({_id:"638b4117670f7c03afc178f1"})
// //   var str8 =get8stplanet.point_range
// //   console.log("8st point",str8)
// //   var rupees8 = get8stplanet.doller_rupees
// //   console.log("RANGE8",rupees8)
  
// //   const beforevalue8 = str8.split(/-(.*)/)[0]
// //   console.log("8RD",beforevalue8)
// //   const aftervalue8 = str8.split(/-(.*)/)[1]
// //   console.log("8RD",aftervalue8)


// //   // 9th
// //   var get9stplanet = await Planet.findOne({_id:"638b4138670f7c03afc178f3"})
// //   var str9 =get9stplanet.point_range
// //   console.log("9st point",str9)
// //   var rupees9 = get9stplanet.doller_rupees
// //   console.log("RANGE9",rupees9)
  
// //    const beforevalue9 = str9.replace('+','');

// //    console.log("9RDdd",beforevalue9)
// //   // const aftervalue9 = str9.split(/-(.*)/)[1]
// //   // console.log("9RD",aftervalue9)
// //   if(getmetores >beforevalue1 &&getmetores <aftervalue1 ){
// //     var totlamt = amt+rupees1
   
// //    console.log("ttttt",totlamt)
// //     const updateAmtt = await User.findOneAndUpdate(
// //       {
// //         _id: getuserid,
// //       },
// //       { $set: { creaditedAmt:totlamt ,remaining:rupees1} },
// //       { new: true }

// //     )
// //     console.log("IF")
// //     console.log("updateAmt",updateAmtt)
// //     // res.status(200).json({
// //     //   status: true,
// //     //   status: "success",
// //     //   data: updateAmt
// //     //   // meteors:updatecontent.meteors,
// //     // //  update: updateAmt
// //     // })
// //   }else if(getmetores >beforevalue2 && getmetores< aftervalue2){
// //     console.log("2nd")
// //     var totlamt2 = amt+rupees2
   
// //     const updateAmt = await User.findOneAndUpdate(
// //       {
// //         _id: getuserid,
// //       },
// //       { $set: { creaditedAmt:totlamt2 } },
// //       { new: true }

// //     )
// //    // console.log("updateAmt",updateAmt)

// //   }else if(getmetores>beforevalue3 && getmetores<aftervalue3 ){
// //     console.log("3nd")
// //     var totlamt3 = amt+rupees3
   
// //     const updateAmt3 = await User.findOneAndUpdate(
// //       {
// //         _id: getuserid,
// //       },
// //       { $set: { creaditedAmt:totlamt3 } },
// //       { new: true }

// //     )
// //   //  console.log("updateAmt",updateAmt3)
// //   }else if(getmetores>beforevalue4 && getmetores<aftervalue4){
// //     console.log("4nd")
// //     var totlamt4 = amt+rupees4
   
// //     const updateAmt4 = await User.findOneAndUpdate(
// //       {
// //         _id: getuserid,
// //       },
// //       { $set: { creaditedAmt:totlamt4 } },
// //       { new: true }

// //     )
// //     console.log("updateAmt",updateAmt4)
// //   }else if(getmetores>beforevalue5 && getmetores<aftervalue5){
// //   console.log("5nd")
// //     var totlamt5 = amt+rupees5
   
// //     const updateAmt5 = await User.findOneAndUpdate(
// //       {
// //         _id: getuserid,
// //       },
// //       { $set: { creaditedAmt:totlamt5 } },
// //       { new: true }

// //     )
// //     //console.log("updateAmt",updateAmt5)
// // }else if(getmetores>beforevalue6 && getmetores<aftervalue6){
// //   console.log("6nd")
// //   var totlamt6 = amt+rupees6
 
// //   const updateAmt6 = await User.findOneAndUpdate(
// //     {
// //       _id: getuserid,
// //     },
// //     { $set: { creaditedAmt:totlamt6 } },
// //     { new: true }

// //   )
// //  // console.log("updateAmt6",updateAmt6)
// // }else if(getmetores>beforevalue7 && getmetores<aftervalue7){
// //   console.log("7nd")
// //   var totlamt7 = amt+rupees7
 
// //   const updateAmt7 = await User.findOneAndUpdate(
// //     {
// //       _id: getuserid,
// //     },
// //     { $set: { creaditedAmt:totlamt7 } },
// //     { new: true }

// //   )
// // //  console.log("updateAmt7",updateAmt7)
// // }else if(getmetores>beforevalue8 && getmetores<aftervalue8){
// //   console.log("8nd")
// //   var totlamt8 = amt+rupees8
 
// //   const updateAmt8 = await User.findOneAndUpdate(
// //     {
// //       _id: getuserid,
// //     },
// //     { $set: { creaditedAmt:totlamt8 } },
// //     { new: true }

// //   )
// //   console.log("updateAmt8",updateAmt8)
// // }else if ( getmetores>beforevalue9){
// //   console.log("9nd")
// //   var totlamt9 = amt+rupees9
 
// //   const updateAmt9 = await User.findOneAndUpdate(
// //     {
// //       _id: getuserid,
// //     },
// //     { $set: { creaditedAmt:totlamt9 } },
// //     { new: true }

// //   )
// //   console.log("updateAmt9",updateAmt9)
// // }
// }



exports.posted_by_me = async (req, res) => {
  //   await Submit.find({$and :[{userid:req.params.id},{aprv_status:"Active"}]})
  //  .sort({meteors:-1}).limit(6).populate("userid")
  // .sort({ createdAt: -1 }).limit(6)

  await Submit.find({
    $and: [

      { $and: [{ userid: req.params.id }, { aprv_status: "Active" }] }, { $and: [{ format: "Video" }] }
    ]
  }).populate("userid").populate("relYear").populate("language")

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));

}


exports.edit_promotion = async (req, res) => {
  await Submit.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.filterbyid = async (req, res) => {
  await Submit.find({
    // $and: [
       sub_category: req.params.sub_category , aprv_status: "Active" ,type: req.params.type,format:req.params.format
       
  },
  // { type: req.params.type  },
  ).populate("category").populate("sub_category").populate("relYear").populate("language")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));

  //  ,{type:req.params.type}
};



exports.advancefilter = async (req, res) => {
 let query ={}
  
 if(req.query.sub_category){
  query.sub_category = req.query.sub_category
 }
 
 if(req.query.type){
  query.type = req.query.type
 // where.push({type: req.query.type})
 }
 if(req.query.format){
    query.format = req.query.format
 }
 if(req.query.language){
  query.language = req.query.language
 }
 if(req.query.relYear){
  query.relYear =req.query.relYear
 }

 let blogs = await Submit.find(query)
 .populate("relYear")
 .populate("language") 
 console.log("BLOG",blogs)
 //console.log("blogs",req.query.topics)
 return res.status(200).json({
  message:"blog success",
  count:blogs.length,
  data :blogs
 })
};

 

// exports.advancefilter = async (req, res) => {
// function createFiltersArray(req) {

//   let filters = [];
  
//   if (req.query.type !== undefined){
  
//   filters.push({type: req.query.type})
  
//   }
  
//   if (req.query.format){
  
//   filters.push({format: req.query.format})
  
//   }
  
//   if (req.query.language !== undefined){
  
//   filters.push({language: req.query.language})
  
//   }
  
//   if (req.query.relYear !== undefined){
  
//   filters.push({relYear: req.query.relYear})
  
//   }
  
//   if (req.query.topics !== undefined){
  
//   filters.push({topics: req.query.topics})
  
//   }
  
//   }
  
//    //app.get("/retrieve", (req, res) => {
  
//   console.log("QUERY",req.query);
  
//   const filters = createFiltersArray(req)
//   console.log("FILTER",filters)
  
//   Submit.find(filters)
  
//   .then(users => {
  
//   //console.log(users)
  
//   res.send({count:users.length,"data":users});
  
//   })
  
//   .catch(error => {
  
//   console.error(error);
  
//   res.send({ error: 'Request failed' });
  
//   });
  
//  // });

// }
//{topics : { $regex : req.query.topics }}










//&&&&&&&&&&&&&&&&&&
//  if(req.query.topics){
//   query.topics =req.query.topics
//  }
 //console.log("query",req.query.topics)

 
//where =({$and:[{"topics": req.query.topics}]})

// if (req.query.topics) {
//   where[req.query.topics] = { $regex: req.query.topics };
// }
  
 // format : req.query.format, type : req.query.type,language : req.query.language,relYear : req.query.relYear, }
 
 
//console.log("where",where)


exports.hashfilter = async (req, res) => {
  let query ={}
  if(req.query.type){
   query.type = req.query.type
  // where.push({type: req.query.type})
  }
  if(req.query.format){
     query.format = req.query.format
  }
  if(req.query.language){
   query.language = req.query.language
  }
  if(req.query.relYear){
   query.relYear =req.query.relYear
  }
 
  let blogs = await Submit.find(query)
  .populate("relYear")
  .populate("language") 
  console.log("BLOG",blogs)
  //console.log("blogs",req.query.topics)
 // return 
  res.status(200).json({
   message:"blog success",
   count:blogs.length,
   data :blogs
  })
 };


//  exports.hashfilter = async (req, res) => {
//   const {
//     sub_category,
//     type,
//     format


//   } = req.body;
//   console.log(req.body);

//   const query = new Query();
//   // if (sub_category) {
//   //   query.addEqualsFilter("SUBCATEGORY", sub_category);
//   // }
//   if (type && type.length !== 0) {
//     query.type = req.query.type
//   }
//   if (format && format.length !== 0) {
//     query.format = req.query.format
//   }
//   console.log("QUERY",query)
//   const queryStr = query.toQueryString();
//   // var queryStr = query.ToQueryString();
//   console.log("SUCCESS",query.toQueryString());
//   // console.log(JSON.parse(queryStr));
//  const getval = await Submit.find(JSON.parse(queryStr))
//  console.log("get",getval)
//  // .populate("category").populate("sub_category").populate("relYear").populate("language")
    
//    // .sort({ createdAt: -1 })
//     .then((result) => {
//       res.status(200).json({
//         status: true,
//         msg: "success",
//         data: result,
//       });
//     })
//     .catch((err) => {
//       res.status(200).json({
//         status: false,
//         msg: "error",
//         data: err,
//       });
//     });
// };

 
