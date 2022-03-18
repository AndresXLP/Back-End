const get = require('lodash/get');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const { emailExist } = require('../utils/emailCompare');
const { StatusCodes } = require('http-status-codes');
// const { BadRequestError, UnauthenticatedError } = require('../errors');
// const { sendEmailSendGrid } = require('../utils/send_email');
const crypto = require('crypto');

//Creación de usuario

const userRegister = async (req, res) => {
  const { email } = req.body;
  if (await emailExist(email)) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      msg: 'Already Exist',
    });
    return;
  }

  const newUser = req.body;
  await User.create(newUser);
  res.status(StatusCodes.CREATED).json({ msg: 'Success' });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      msg: 'Email y Contraseña son requeridos',
    });
    return;
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      status: 'unregistered',
      msg: 'Email no esta registrado',
    });
    return;
  }
  if (user) {
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        status: 'wrong',
        msg: 'Email o Contraseña Invalidos',
      });
      return;
    }
    const token = user.createJWT(req.body);
    res.status(StatusCodes.OK).json({
      status: 'logged',
      msg: 'Inicio de Session Correcto',
      user,
      token,
    });
    return;
  }
};
module.exports = {
  userRegister,
  userLogin,
};
