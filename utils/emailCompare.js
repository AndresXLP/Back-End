const User = require('../models/users');

const emailExist = async (email) => {
  const emailUser = await User.findOne({ email });
  if (emailUser) {
    return true;
  }
  return false;
};

module.exports = { emailExist };
