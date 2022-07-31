import cloudinary from 'cloudinary'
import fs from 'fs'
import { StatusCodes } from 'http-status-codes';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

async function uploadSingleHandler(req, res) {
  const { file } = req;
  try {
    const result = await cloudinary.uploader.upload(file.path);
    res.status(StatusCodes.OK).json(result.public_id);
  } catch (e) {
    res.status(500).json(e);
  } finally {
    fs.unlinkSync(file.path);
  }
}

export {uploadSingleHandler} 
