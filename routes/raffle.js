const { isAuthenticated } = require('../middleware/authorization');
const express = require('express');
const router = express.Router();
const {
  createRaffleCardborad,
  getRaffleCardboard,
} = require('../controllers/raffle');

router
  .route('/create-raffle-cardboard')
  .post(isAuthenticated(), createRaffleCardborad);

router.route('/raffle/:id').get(getRaffleCardboard);

module.exports = router;
