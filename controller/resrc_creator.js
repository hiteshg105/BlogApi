const { uploadBase64ImageFile } = require("../helpers/awsuploader");
const ResCreator = require("../models/resrc_creator");

exports.App_Creator_content = async (req, res) => {


  try {
    console.log("hello")
    const newSubmit = await ResCreator.create(req.body);

    res.status(200).json({
      success: true,
      data: newSubmit
    })
  } catch (error) {
    console.log(error)
    res.status(400).send("error")
  }



















  // const {
  //   userid,
  //   link,
  //   category,
  //   sub_category,
  //   type,
  //   format,
  //   topics,
  //   desc,
  //   resTitle,
  //   creatorName,
  //   relYear,
  //   res_desc,
  //   comment,
  //   language,
  //   img,
  // } = req.body;

  // const newSubmit = await ResCreator.create(req.body);
  // console.log("hello")

  // if (img) {
  //   if (img) {
  //     const base64Data = new Buffer.from(
  //       img.replace(/^data:image\/\w+;base64,/, ""),
  //       "base64"
  //     );
  //     detectMimeType(base64Data);
  //     const type = detectMimeType(img);
  //     const geturl = await uploadBase64ImageFile(
  //       base64Data,
  //       newSubmit.id,
  //       type
  //     );
  //     console.log(geturl, "&&&&");
  //     if (geturl) {
  //       newSubmit.img = geturl.Location;
  //     }
  //   }

  // newSubmit
  //   .save()
  //   .then((data) => resp.successr(res, data))
  //   .catch((error) => resp.errorr(res, error));
}
// };
