import compose from 'composable-middleware'
import jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes';
import User from '../models/users.js'


const getUserbyEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      return user;
    }
  } catch (error) {
    console.log(error);
  }
};
const isAuthenticated = (req, res, next) => {
  return compose().use(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    try {
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(500).json({ msg: 'No Token provided' });
      }
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await getUserbyEmail(decoded.email);
      if (!user) {
        return res.status(500).json({ msg: 'Not authorized' });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(StatusCodes.UNAUTHORIZED).json(error.message);
    }
  });
};

export { isAuthenticated, getUserbyEmail };
