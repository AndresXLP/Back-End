const fs = require('fs');
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

async function uploadSingleHandler(req, res) {
  const { file } = req;
  try {
    const result = await cloudinary.uploader.upload(file.path);
    req.image = result.url;
    res.status(200).json({ message: 'Imágen actualizada' });
  } catch (e) {
    res.status(500).json(e);
  } finally {
    fs.unlinkSync(file.path);
  }
}

module.exports = { uploadSingleHandler };
