const { isAuthenticated } = require('../middleware/authorization');
const express = require('express');
const router = express.Router();
const {
  createRaffleCardborad,
  getRaffleCardboard,
  getAllRaffleCardboard,
} = require('../controllers/raffle');

router
  .route('/create-raffle-cardboard')
  .post(isAuthenticated(), createRaffleCardborad);

router.route('/raffle/:id').get(getRaffleCardboard);
router.route('/allRaffles').get(getAllRaffleCardboard);

module.exports = router;
