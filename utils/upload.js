const fs = require('fs');
const cloudinary = require('cloudinary');
const { StatusCodes } = require('http-status-codes');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

async function uploadSingleHandler(req, res) {
  const { file } = req;
  try {
    const result = await cloudinary.uploader.upload(file.path);
    console.log(
      `🤖 ~ file: upload.js ~ line 14 ~ uploadSingleHandler ~ result`,
      result.url
    );
    res.status(StatusCodes.OK).json(result.url);
  } catch (e) {
    res.status(500).json(e);
  } finally {
    fs.unlinkSync(file.path);
  }
}

module.exports = { uploadSingleHandler };
