const { randomUUID } = require('crypto');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const addWalliesToUser = require('../utils/addWalliesToUser');
const findUser = require('../utils/findUser');
const getFormattedScore = require('../utils/getFormattedScore');

exports.sendUserId = asyncHandler(async (req, res) => {
  const userId = randomUUID();

  // Add user to database
  try {
    let user = new User({
      userId,
    });

    user = addWalliesToUser(user);

    await user.save();
  } catch (error) {
    throw new Error('Unable to add new user to database');
  }
  return res.send({ userId });
});

exports.setUserName = asyncHandler(async (req, res) => {
  try {
    const user = await findUser(req.params.id);
    const { name } = req.body;

    user.name = name;
    user.save();

    return res.send({ name: user.name });
  } catch (err) {
    return res.status(500).send('Unable to update user name');
  }
});

exports.getUserScore = asyncHandler(async (req, res) => {
  try {
    const formattedScore = await getFormattedScore(req.params.id);
    return res.send({ formattedScore });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});
