const User = require('../models/User');
const bcrypt = require('bcrypt');

async function registerUser(username, password, role) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, role });
  return user.save();
}

async function findUserByUsername(username) {
  return User.findOne({ username });
}

module.exports = {
  registerUser,
  findUserByUsername,
};
