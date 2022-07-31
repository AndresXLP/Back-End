import User from '../models/users.js'
import { StatusCodes } from 'http-status-codes'

//Creación de usuario

const userRegister = async (req, res) => {
  try {
    const newUser = req.body;
    await User.create(newUser);
    res.status(StatusCodes.CREATED).json({ msg: 'Success' });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: 'Already Exist' });
    } else {
      console.log(error);
    }
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      msg: 'Email y Contraseña son requeridos',
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        status: 'unregistered',
        msg: 'Email no esta registrado',
      });
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        status: 'wrong',
        msg: 'Email o Contraseña Invalidos',
      });
    }
    const token = user.createJWT(req.body);
    return res.status(StatusCodes.OK).json({
      status: 'logged',
      msg: 'Inicio de Session Correcto',
      user,
      token,
    });
  } catch (error) {}
};

export { userRegister, userLogin };
