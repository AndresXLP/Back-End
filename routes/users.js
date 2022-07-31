import express from 'express';
const router = express.Router();
import { userRegister, userLogin } from '../controllers/users.js';

router.route('/signUp').post(userRegister);
router.route('/signIn').post(userLogin);

export default router;
