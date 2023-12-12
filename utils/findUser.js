const User = require('../models/user');

async function findUser(req) {
  const { userToken } = req.body;
  let currentUser;
  try {
    currentUser = await User.findOne({ userId: userToken }).exec();
    if (!currentUser) throw new Error('Unable to find user in database');
    return currentUser;
  } catch (error) {
    throw new Error('Unable to find user in database');
  }
}

module.exports = findUser;
