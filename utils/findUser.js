const User = require('../models/user');

async function findUser(userId) {
  let currentUser;
  try {
    currentUser = await User.findOne({ userId }).exec();
    if (!currentUser) throw new Error('Unable to find user in database');
    return currentUser;
  } catch (error) {
    throw new Error('Unable to find user in database');
  }
}

module.exports = findUser;
