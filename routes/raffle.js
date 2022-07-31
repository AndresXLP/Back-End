import { isAuthenticated } from '../middleware/authorization.js'
import multer from 'multer';
import express from 'express'
const router = express.Router();
import {
  createRaffleCardborad,
  getRaffleCardboard,
  getAllRaffleCardboard,
  updateNumberRaffle,
  getRaffleCreatedBy,
  deleteRaffle,
} from '../controllers/raffle.js'
import { uploadSingleHandler }from'../utils/upload.js'

const upload = multer({ dest: './temp' });

router
  .route('/upload-image')
  .post(isAuthenticated(), upload.single('dataFile'), uploadSingleHandler);
router.route('/create-raffle').post(isAuthenticated(), createRaffleCardborad);
router.route('/raffle/createdBy').get(isAuthenticated(), getRaffleCreatedBy);
router.route('/allRaffles').get(getAllRaffleCardboard);
router.route('/raffle/updateNumber').put(updateNumberRaffle);
router.route('/raffle/:id').get(getRaffleCardboard);
router.route('/raffle/delete/:id').delete(isAuthenticated(), deleteRaffle);

export default router
