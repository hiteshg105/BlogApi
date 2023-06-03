const { uploadBase64ImageFile } = require("../helpers/awsuploader");
const ResCreator = require("../models/resrc_creator");

exports.App_Creator_content = async (req, res) => {
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

  const newSubmit = new ResCreator(req.body);

  if (img) {
    if (img) {
      const base64Data = new Buffer.from(
        img.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
      detectMimeType(base64Data);
      const type = detectMimeType(img);
      const geturl = await uploadBase64ImageFile(
        base64Data,
        newSubmit.id,
        type
      );
      console.log(geturl, "&&&&");
      if (geturl) {
        newSubmit.img = geturl.Location;
      }
    }

    newSubmit
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
};
