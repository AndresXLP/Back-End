const { isAuthenticated } = require('../middleware/authorization');
const multer = require('multer');
const express = require('express');
const router = express.Router();
const {
  createRaffleCardborad,
  getRaffleCardboard,
  getAllRaffleCardboard,
} = require('../controllers/raffle');
const { uploadSingleHandler } = require('../utils/upload');

const upload = multer({ dest: './temp' });

router
  .route('/file/raffle')
  .post(isAuthenticated(), upload.single('image'), uploadSingleHandler);
router
  .route('/create-raffle-cardboard')
  .post(isAuthenticated(), createRaffleCardborad);

router.route('/raffle/:id').get(getRaffleCardboard);
router.route('/allRaffles').get(getAllRaffleCardboard);

module.exports = router;
